<template>
    <div>
        <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
            <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
                <li>
                    <a class="text-500 no-underline line-height-3 cursor-pointer">Home</a>
                </li>
                <li class="px-2">
                    <i class="pi pi-angle-right text-500 line-height-3"></i>
                </li>
                <li>
                    <span class="text-900 line-height-3">Iperc</span>
                </li>
            </ul>
            <div class="text-700 text-center">
                <div class="text-blue-600 font-bold mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-topology-star-ring-3" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 19a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                        <path d="M18 5a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                        <path d="M10 5a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                        <path d="M6 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                        <path d="M18 19a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                        <path d="M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                        <path d="M22 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                        <path d="M6 12h4" />
                        <path d="M14 12h4" />
                        <path d="M15 7l-2 3" />
                        <path d="M9 7l2 3" />
                        <path d="M11 14l-2 3" />
                        <path d="M13 14l2 3" />
                        <path d="M10 5h4" />
                        <path d="M10 19h4" />
                        <path d="M17 17l2 -3" />
                        <path d="M19 10l-2 -3" />
                        <path d="M7 7l-2 3" />
                        <path d="M5 14l2 3" />
                    </svg>
                </div>
                <div class="text-900 font-bold text-5xl mb-3">IPERC con IA</div>
                <div class="text-700 text-2xl mb-5" v-if="!work"> {{ work.title }} </div>
                <div class="card flex justify-content-center" v-if="!work">
                    <form @submit="onSubmit" class="flex flex-column gap-2">
                        <span class="p-float-label">
                            <Textarea id="value" v-model="title" :class="{ 'p-invalid': errorMessage }" rows="3" cols="100" aria-describedby="text-error" />
                            <label for="value">Description</label>
                        </span>
                        <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
                        <Button type="submit" label="Ingresar" @click.prevent="createWork"/>
                    </form>
                </div>
                <div class="text-700 text-2xl mb-5" v-if="work"> Trabajo: {{ work.title }} </div>

                <Divider></Divider>

                <DataTable :value="tasks" editMode="cell" @cell-edit-complete="onCellEditComplete" rowGroupMode="rowspan" groupRowsBy="description" sortMode="single" sortField="id" :sortOrder="1" tableStyle="min-width: 50rem">
                    <Column header="#" headerStyle="width:3rem">
                        <template #body="slotProps">
                            {{ slotProps.index + 1 }}
                        </template>
                    </Column>
                    <Column field="description" header="Pasos de la tarea" style="min-width: 200px">
                        <template #body="slotProps">
                            <div class="flex align-items-center gap-2">
                                <span>{{ slotProps.data.description }}</span>
                            </div>
                        </template>
                        <template #editor="slotProps">
                            <Textarea v-model="slotProps.data.description" rows="2" cols="50" />
                        </template>
                    </Column>
                    <!-- include a column with a button -->
                    <Column field="routine" header="Rutinario" style="min-width: 50px">
                        <template #body="slotProps">
                            <div class="flex align-items-center gap-2">
                                <span>{{ slotProps.data.routine }}</span>
                            </div>
                        </template>
                        <template #editor="slotProps">
                            <Textarea v-model="slotProps.data.routine" rows="1" cols="1" />
                        </template>
                    </Column>
                    <Column field="danger" header="Peligros" style="min-width: 200px"></Column>
                    <Column field="risk" header="Riesgos" style="min-width: 200px"></Column>
                    <Column field="control" header="Controles" style="min-width: 200px"></Column>
                    <!-- <Column field="point" header="Calificacion" style="min-width: 200px"></Column> -->
                    <Column header="Acciones" headerStyle="width:3rem">
                        <template #body="slotProps">
                            <Button text icon="pi pi-ellipsis-v" @click="toggle(slotProps.data, $event)" aria-haspopup="true" aria-controls="overlay_menu" />
                            <Menu :ref="`menu`" id="overlay_menu" :model="items" :popup="true" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const work = computed(() => store.state.work)
const tasks = computed(() => store.getters.getTasks)
const title = ref('')
const errorMessage = ref('')
// const work = ref(null)
const task = ref({})
const menu = ref()
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'IPERC AI',
                icon: 'pi pi-refresh',
                command: async () => {
                    await createIperc(task.value)
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-delete-left',
                command: async () => {
                    await deleteTask(task.value)
                    await getWorkById(work.value.id)
                }
            }
        ]
    }
])
const toggle = (t, e) => {
    task.value = t
    menu.value.toggle(e)
}
const createWork = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/work`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzRmMDQ5ZWJiZDFmNmUwMmM0MTlhOCIsImlhdCI6MTcwMjE2OTIwOCwiZXhwIjoxNzMzMjczMjA4fQ.P4kv73SgBrqMgZYwZT-XzjSpSyWVu0dnbHpQN4CycMw'
        },
        body: JSON.stringify({ title: title.value })
    })
    const data = await response.json()
    work.value = data.newWork
    const tasks = data.tasks
    tasks.task.forEach(async (task) => {
        await createTask(task, work.value._id)
    })
    await getWorkById(work.value._id)
}

const onCellEditComplete = async (e) => {
    let { newData, newValue, field } = e
    await updateTask(newData)
    // const oldTask = { ...e.data }
    // const newTask = { ...e.data, [field]: newValue }
    // const index = tasks.value.findIndex((task) => task.description === oldTask.description)
    // tasks.value[index] = newTask
    // falta actualizar en la BD
}

const createIperc = async (task) => {
    const response = await fetch(`${import.meta.env.VITE_URL}/iperc`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzRmMDQ5ZWJiZDFmNmUwMmM0MTlhOCIsImlhdCI6MTcwMjE2OTIwOCwiZXhwIjoxNzMzMjczMjA4fQ.P4kv73SgBrqMgZYwZT-XzjSpSyWVu0dnbHpQN4CycMw'
        },
        body: JSON.stringify({ task })
    })
    const data = await response.json()
    await getWorkById(work.value._id)
}
const getWorkById = async (workId) => {
    const response = await fetch(`${import.meta.env.VITE_URL}/work/${workId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzRmMDQ5ZWJiZDFmNmUwMmM0MTlhOCIsImlhdCI6MTcwMjE2OTIwOCwiZXhwIjoxNzMzMjczMjA4fQ.P4kv73SgBrqMgZYwZT-XzjSpSyWVu0dnbHpQN4CycMw'
        }
    })
    const data = await response.json()
    // setWorks in commit
    store.commit('setWorks', data.work)
    // tasks.value = data.work.tasks
    // tasks.value = newTasks.map((task) => {
    //     if (task.iperc.length > 0) {
    //         return task.iperc.map((iperc) => {
    //             return {
    //                 ...iperc,
    //                 description: task.description,
    //                 routine: task.routine,
    //                 _id: task._id,
    //             }
    //         })
    //     } else {
    //         return { ...task }
    //     }
    // }).flat()
}
const deleteTask = async (task) => {
    const response = await fetch(`${import.meta.env.VITE_URL}/task/${task._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzRmMDQ5ZWJiZDFmNmUwMmM0MTlhOCIsImlhdCI6MTcwMjE2OTIwOCwiZXhwIjoxNzMzMjczMjA4fQ.P4kv73SgBrqMgZYwZT-XzjSpSyWVu0dnbHpQN4CycMw'
        }
    })
    const data = await response.json()
    await getWorks()
}
const createTask = async (task, workId) => {
    const response = await fetch(`${import.meta.env.VITE_URL}/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzRmMDQ5ZWJiZDFmNmUwMmM0MTlhOCIsImlhdCI6MTcwMjE2OTIwOCwiZXhwIjoxNzMzMjczMjA4fQ.P4kv73SgBrqMgZYwZT-XzjSpSyWVu0dnbHpQN4CycMw'
        },
        body: JSON.stringify({task, workId})
    })
    const data = await response.json()
}
const updateTask = async (task) => {
    const response = await fetch(`${import.meta.env.VITE_URL}/task/${task._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzRmMDQ5ZWJiZDFmNmUwMmM0MTlhOCIsImlhdCI6MTcwMjE2OTIwOCwiZXhwIjoxNzMzMjczMjA4fQ.P4kv73SgBrqMgZYwZT-XzjSpSyWVu0dnbHpQN4CycMw',
        },
        body: JSON.stringify({ task })
    })
    const data = await response.json()
}

</script>