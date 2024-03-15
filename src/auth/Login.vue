<template>
    <div class="h-screen flex justify-content-center align-items-center">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-3">
            <div class="text-center mb-5">
                <!-- <img src="/images/blocks/logos/hyper.svg" alt="Image" height="50" class="mb-3" /> -->
                <div class="text-900 text-3xl font-medium mb-3">Safety AI</div>
                <span class="text-600 font-medium line-height-3">No tienes una cuenta?</span>
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click.prevent="register">Registrarse!</a>
            </div>
    
            <div>
                <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                <InputText id="email1" type="text" class="w-full mb-3" v-model="form.email" />
    
                <label for="password1" class="block text-900 font-medium mb-2">Password</label>
                <InputText id="password1" type="password" class="w-full mb-3" v-model="form.password" />
    
                <div class="flex align-items-center justify-content-between mb-6">
                    <div class="flex align-items-center">
                        <Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
                        <label for="rememberme1">Recuerdame</label>
                    </div>
                    <!-- <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a> -->
                </div>
                <Button label="Sign In" icon="pi pi-user" class="w-full" @click.prevent="login"></Button>
            </div>
            <Message severity="error" v-if="errorMessage"> {{ errorMessage }} </Message>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({
    email: '',
    password: ''
})
const checked = ref(false)
const errorMessage = ref(null)
const message = ref('')
const status = ref(false)
const login = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/auth/${import.meta.env.VITE_VERSION}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.value)
    })
    const data = await response.json()
    if (response.status === 200) {
        message.value = data.message
        // localStorage.setItem('token', data.token)
        // localStorage.setItem('user', JSON.stringify(data.user))
        // router.push('/')
    } else {
        errorMessage.value = data.message
    }
    console.log(data)
}
const register = () => {
    router.push('/register')
}
</script>