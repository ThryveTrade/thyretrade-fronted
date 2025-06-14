import { getDatabase, ref, set, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseconfig';
// ✅ Wait for auth before DB writes
export function waitForAuth() {
return new Promise((resolve) => {
const unsubscribe = onAuthStateChanged(auth, (user) => {
if (user) {
unsubscribe();
resolve(user);
}
});
});
}

// ✅ Write user data to Firebase Realtime DB
export async function writeUserData(additionalData = {}) {
try {
const user = await waitForAuth();
const db = getDatabase();
const userRef = ref(db, `users/${user.uid}`);

await set(userRef, {
uid: user.uid,
email: user.email,
createdAt: new Date().toISOString(),
...additionalData,
});

console.log('✅ Data written to Realtime DB!');
} catch (error) {
console.error('❌ Failed to write user data:', error.message);
}
}

// ✅ Read user data by UID
export async function readUserData(uid) {
try {
const db = getDatabase();
const userRef = ref(db, `users/${uid}`);
const snapshot = await get(userRef);

if (snapshot.exists()) {
console.log('📥 User data loaded:', snapshot.val());
return snapshot.val();
} else {
console.warn('⚠️ No user data found for UID:', uid);
return null;
}
} catch (error) {
console.error('❌ Failed to read user data:', error.message);
return null;
}
}

// 🚀 VELOCE™: Verify-Load-Or-Create Entry
export async function veloceUserData(fallbackData = {}) {
try {
const user = await waitForAuth();
const existingData = await readUserData(user.uid);

if (existingData) {
console.log('🟢 User data exists. Loading...');
return existingData;
} else {
console.log('🟡 No data found. Creating user entry...');
await writeUserData(fallbackData);
const freshData = await readUserData(user.uid);
return freshData;
}
} catch (err) {
console.error('🔥 VELOCE error:', err.message);
return null;
}
}
