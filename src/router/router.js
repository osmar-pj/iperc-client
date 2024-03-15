import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('../auth/Login.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('../auth/Register.vue')
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue')
        },
        {
            path: '/work',
            name: 'Work',
            component: () => import('../views/Work.vue')
        },
        {
            path: '/updateWork',
            name: 'UpdateWork',
            component: () => import('../views/UpdateWork.vue')
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     const publicPages = ['/login', '/register']
//     const authRequired = !publicPages.includes(to.path)
//     const loggedIn = localStorage.getItem('user')

//     if (authRequired && !loggedIn) {
//         return next('/login')
//     }

//     next()
// })

export default router