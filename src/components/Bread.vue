<template>
    <div>
        <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
            <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                <li>
                    <a class="text-500 no-underline line-height-3 cursor-pointer">Home</a>
                </li>
                <li class="px-2">
                    <i class="pi pi-angle-right text-500 line-height-3"></i>
                </li>
                <!-- <li>
                    <span class="text-900 line-height-3">Analytics</span>
                </li> -->
            </ul>
            <div class="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
                <div>
                    <div class="font-medium text-3xl text-900">Trabajos registrados</div>
                    <div class="flex align-items-center text-700 flex-wrap">
                        <div class="mr-5 flex align-items-center mt-3">
                            <i class="pi pi-file mr-2"></i>
                            <span>{{ works.length }} Iperc</span>
                        </div>
                        <!-- <div class="mr-5 flex align-items-center mt-3">
                            <i class="pi pi-globe mr-2"></i>
                            <span>9402 Sessions</span>
                        </div>
                        <div class="flex align-items-center mt-3">
                            <i class="pi pi-clock mr-2"></i>
                            <span>2.32m Avg. Duration</span>
                        </div> -->
                    </div>
                </div>
                <div class="mt-3 lg:mt-0">
                    <Button label="Agregar" class="p-button mr-2" icon="pi pi-plus" @click.prevent="add"></Button>
                    <!-- <Button label="Save" icon="pi pi-check"></Button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const works = ref([])
onMounted(async () => {
    await getWorks()
})
const add = () => {
    router.push({ name: 'Work' })
}
const getWorks = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_VERSION}/work`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzRmMDQ5ZWJiZDFmNmUwMmM0MTlhOCIsImlhdCI6MTcwMjE2OTIwOCwiZXhwIjoxNzMzMjczMjA4fQ.P4kv73SgBrqMgZYwZT-XzjSpSyWVu0dnbHpQN4CycMw'
        }
    })
    const data = await response.json()
    works.value = data.works
}
</script>