import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import Router from './router/router'
import Store from './store/store'

import './style.css'
import "primevue/resources/themes/lara-light-indigo/theme.css"
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import DataView from 'primevue/dataview'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import Sidebar from 'primevue/sidebar'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import Menu from 'primevue/menu'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'

const app = createApp(App)

app.use(PrimeVue, { ripple: true })
app.use(Router)
app.use(Store)

app.component('Button', Button)
app.component('Menubar', Menubar)
app.component('DataView', DataView)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Card', Card)
app.component('Avatar', Avatar)
app.component('Sidebar', Sidebar)
app.component('Textarea', Textarea)
app.component('Toast', Toast)
app.component('Divider', Divider)
app.component('InputText', InputText)
app.component('Tag', Tag)
app.component('Menu', Menu)
app.component('Checkbox', Checkbox)
app.component('Message', Message)

app.mount('#app')