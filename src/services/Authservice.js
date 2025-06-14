import { auth } from '../firebaseconfig';
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
} from 'firebase/auth';

import { writeUserData } from './DatabaseService.js';

// ✅ SIGNUP: Auto-writes user to Firebase Realtime DB
export const signup = async (email, password) => {
const userCredential = await createUserWithEmailAndPassword(auth, email, password);

await writeUserData({
role: 'betatester',
joined: new Date().toISOString(),
xp: 0,
level: 1,
});

return userCredential;
};

// ✅ LOGIN: You can uncomment auto-save for missing data
export const login = async (email, password) => {
const userCredential = await signInWithEmailAndPassword(auth, email, password);

// Optional auto-write during login (disabled unless user wants re-sync)
// await writeUserData({
// lastlogin: new Date().toISOString(),
// });

return userCredential;
};

// ✅ LOGOUT
export const logout = () => {
return signOut(auth);
};

// ✅ AUTO-TRIGGER (optional example to test it runs automatically)
(async () => {
const email = 'testuser@example.com';
const password = 'testpassword';

try {
// Runs on load: signup and create user
await signup(email, password);

// Immediately log them in
await login(email, password);

console.log('User signed up and logged in automatically!');
} catch (error) {
console.error('Auto-auth error:', error.message);
}
})();