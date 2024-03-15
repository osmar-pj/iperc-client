<template>
    <div class="h-screen flex justify-content-center align-items-center">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
            <div class="text-center mb-5">
                <!-- <img src="/images/blocks/logos/hyper.svg" alt="Image" height="50" class="mb-3" /> -->
                <div class="text-900 text-3xl font-medium mb-3">Safety AI</div>
                <span class="text-600 font-medium line-height-3">Lista de espera!</span>
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click.prevent="login">regresar!</a>
            </div>
    
            <div>
                <div class="flex justify-content-between">
                    <div>
                        <label for="name" class="text-900 font-medium mb-2">Nombres</label>
                        <InputText id="name" type="text" class="w-full mb-3" v-model="form.name" />
                    </div>
                    <div class="ml-2">
                        <label for="lastname" class="text-900 font-medium mb-2">Apellidos</label>
                        <InputText id="lastname" type="text" class="w-full mb-3" v-model="form.lastname" />
                    </div>
                </div>

                <label for="email1" class="text-900 font-medium mb-2">Email</label>
                <InputText id="email1" type="email" class="w-full mb-3" v-model="form.email" />
    
                <!-- <label for="password1" class="text-900 font-medium mb-2">Password</label>
                <InputText id="password1" type="password" class="w-full mb-3" v-model="form.password" /> -->
    
                <Button label="Listar" icon="pi pi-user" class="w-full" @click.prevent="register"></Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({
    name: '',
    lastname: '',
    email: ''
})
const errorMessage = ref(null)
const message = ref('')
const register = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/auth/${import.meta.env.VITE_VERSION}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.value)
    })
    const data = await response.json()
    console.log(data)
    if (response.status === 200) {
        router.push('/login')
    } else {
        errorMessage.value = data.message
    }
}
const login = () => {
    router.push('/login')
}
</script>