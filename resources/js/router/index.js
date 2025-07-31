import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ContactPage from '@/views/ContactPage.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage
	},
	{
		path: '/contact',
		name: 'Contact',
		component: ContactPage
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else if (to.hash) {
			return {
				el: to.hash,
				behavior: 'smooth'
			}
		} else {
			return { top: 0 }
		}
	}
})

export default router