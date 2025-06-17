<template>
<div class="auth-container">
<form @submit.prevent="handleSubmit">
<input type="email" v-model="email" placeholder="Email" required />
<input type="password" v-model="password" placeholder="Password" required />
<button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
</form>

<p @click="toggleMode">
{{ isLogin ? "Don't have an account? Register here" : "Already have an account? Login here" }}
</p>

<p class="error" v-if="error">{{ error }}</p>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebaseconfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const isLogin = ref(true)
const error = ref('')

onMounted(() => {
if (auth.currentUser) {
router.push('/dashboard')
}
})

const toggleMode = () => {
isLogin.value = !isLogin.value
error.value = ''
}

const handleSubmit = async () => {
error.value = ''
try {
if (isLogin.value) {
await signInWithEmailAndPassword(auth, email.value, password.value)
toast.success('Login successful!')
} else {
await createUserWithEmailAndPassword(auth, email.value, password.value)
toast.success('Account created successfully!')
}
router.push('/dashboard')
} catch (err) {
error.value = err.message
toast.error('Authentication failed: ' + err.message)
}
}
</script>

<style scoped>
.auth-container {
max-width: 400px;
margin: 80px auto;
padding: 20px;
border-radius: 8px;
background: #111;
color: #fff;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

input {
display: block;
width: 100%;
margin-bottom: 12px;
padding: 12px;
border-radius: 4px;
border: 1px solid #ccc;
}

button {
padding: 10px;
background: #000084;
color: #fff;
font-weight: bold;
border: none;
border-radius: 4px;
width: 100%;
cursor: pointer;
margin-bottom: 20px;
}

button:hover {
background: #2c2ce0;
}

p {
cursor: pointer;
color: #00ffff;
margin-top: 10px;
}

.error {
color: red;
margin-top: 10px;
}
</style>