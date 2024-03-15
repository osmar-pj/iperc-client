import { createStore } from 'vuex'

const store = createStore({
    state: {
        work: "",
        tasks: []
    },
    getters: {
        getTasks(state) {
            const tasks = state.work.tasks.map(task => {
                if (task.iperc.length > 0) {
                    return task.iperc.map(iperc => {
                        return {
                            ...iperc,
                            description: task.description,
                            taskId: task._id,
                            routine: task.routine,
                        }
                    })
                } else {
                    return {
                        ...task
                    }
                }
            }).flat()
            return tasks
        }
    },
    mutations: {
        setWorks(state, work) {
            state.work = work
        }
    },
    actions: {},
    modules: {}
})

export default store