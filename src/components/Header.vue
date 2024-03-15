<template>
    <Menubar :model="items" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref([
    {
        label: 'Iperc',
        icon: 'pi pi-fw pi-home',
        command: () => {
            router.push({ name: 'Home' })
        }
    },
    {
        label: 'Registros',
        icon: 'pi pi-fw pi-calendar',
        command: () => {
            router.push({ name: 'Register' })
        }
    }
])
</script>