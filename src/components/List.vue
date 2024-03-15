<template>
    <div>
        <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-3" v-for="(work, index) in works" :key="work.id">
                    <div class="p-3 h-full">
                        <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                            <div class="text-900 font-medium text-xl mb-2 flex justify-content-between"> 
                                <span> {{ index + 1 }}. {{ work.title }} </span>
                                <div>
                                    <Button text icon="pi pi-ellipsis-v" @click="toggle(work, $event)" aria-haspopup="true" aria-controls="overlay_menu" />
                                    <Menu :ref="`menu`" id="overlay_menu" :model="items" :popup="true" />
                                </div>
                            </div>
                            <div class="text-600">Area:</div>
                            <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                            <div class="flex align-items-center">
                                <span class="font-bold text-2xl text-900"> <Tag :value="point(work)" :severity="color(work)"></Tag> </span>
                                <span class="ml-2 font-medium text-600"> Alto Riesgo </span>
                            </div>
                            <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                            <ul class="list-none p-0 m-0 flex-grow-1">
                                <li class="flex align-items-center mb-3" v-for="(task) in work.tasks.slice(0,3)" :key="task.id">
                                    <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>{{ task.description }}</span>
                                </li>
                            </ul>
                            <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                            <div class="text-400"> {{ new Date(work.createdAt).toLocaleString() }} </div>
                            <!-- <Button label="Buy Now" class="p-3 w-full mt-auto"></Button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const works = ref([])
const work = ref({})
onMounted(async () => {
    await getWorks()
})
const menu = ref()
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    store.commit('setWorks', work.value)
                    router.push({ name: 'UpdateWork' })
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-delete-left',
                command: () => {
                    deleteWork()
                }
            }
        ]
    }
])

const toggle = (w, e) => {
    work.value = w
    menu.value[0].toggle(e)
}

const color = (w) => {
    const points = w.tasks.map(i => i.iperc.map(j => j.point)).flat()
    const max = Math.max(...points)
    if (max >= 1 && max <= 8) {
        return 'danger'
    } else if (max >= 9 && max <= 15) {
        return 'warning'
    } else if (max >= 16 && max <= 25) {
        return 'success'
    } else {
        return 'info'
    }
}

const point = (w) => {
    const points = w.tasks.map(i => i.iperc.map(j => j.point)).flat()
    const max = Math.max(...points)
    return points.length > 0 ? max : 'Sin calificar'
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
const deleteWork = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_VERSION}/work/${work.value._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzRmMDQ5ZWJiZDFmNmUwMmM0MTlhOCIsImlhdCI6MTcwMjE2OTIwOCwiZXhwIjoxNzMzMjczMjA4fQ.P4kv73SgBrqMgZYwZT-XzjSpSyWVu0dnbHpQN4CycMw'
        }
    })
    const data = await response.json()
    await getWorks()
}
</script>