<template>
<div class="dashboard">
<h1>Dashboard</h1>

<!-- 🔒 Logout Button -->
<button @click="handleLogout">Logout</button>

<!-- 📝 Submit New Data -->
<form @submit.prevent="handleSubmit">
<input v-model="newData" placeholder="Enter something to save..." required />
<button type="submit">Save</button>
</form>

<!-- 📊 Data Display -->
<div v-if="loading">Loading data...</div>
<div v-else-if="Object.keys(data).length === 0">No data available</div>
<div v-else>
<ul>
<li v-for="(item, key) in data" :key="key">
<strong>{{ key }}:</strong> {{ item }}
</li>
</ul>
</div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebaseconfig'
import { getDatabase, ref as dbRef, onValue, push, set } from 'firebase/database'
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseconfig'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const data = ref({})
const newData = ref('')
const loading = ref(true)

const handleLogout = async () => {
try {
await signOut(auth)
router.push('/login')
toast.info('Logged out successfully.')
} catch (err) {
toast.error('Logout failed: ' + err.message)
}
}

const handleSubmit = async () => {
try {
if (!newData.value) return
const dataRef = dbRef(db, 'dashboardData')
await set(push(dataRef), newData.value)
newData.value = ''
toast.success('Data submitted successfully!')
} catch (err) {
toast.error('Failed to submit: ' + err.message)
}
}

onMounted(() => {
const firebasePath = dbRef(db, 'dashboardData')
onValue(firebasePath, (snapshot) => {
const val = snapshot.val()
data.value = val || {}
loading.value = false
})
})
</script>

<style scoped>
.dashboard {
max-width: 600px;
margin: 40px auto;
background: #f0f9f9;
padding: 30px;
border-radius: 12px;
box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

h1 {
color: #000084;
margin-bottom: 20px;
}

ul {
list-style-type: none;
}

li {
background: #fff;
padding: 10px;
margin-bottom: 10px;
border-radius: 5px;
box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
}

form {
margin-bottom: 20px;
display: flex;
gap: 10px;
}

input {
padding: 10px;
flex: 1;
border-radius: 4px;
border: 1px solid #ccc;
}

button {
background: #c0392b;
color: white;
padding: 10px 20px;
font-weight: bold;
border: none;
border-radius: 4px;
cursor: pointer;
}

button:hover {
background: #e74c3c;
}
</style>
