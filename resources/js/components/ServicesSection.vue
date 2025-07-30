<template>
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-7xl mx-auto">
			<!-- Section Header -->
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold text-gray-900 mb-4">
					Our Services
				</h2>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto">
					We provide comprehensive programming and IT solutions to help your business thrive in the digital world. 
					From custom software development to ongoing technical support, we've got you covered.
				</p>
			</div>

			<!-- Programming Services Section -->
			<div class="mb-16">
				<h3 class="text-2xl font-semibold text-gray-900 mb-8 text-center">
					Programming Services
				</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<ServiceCard
						v-for="service in programmingServices"
						:key="service.title"
						:title="service.title"
						:description="service.description"
						:icon="service.icon"
						:color="service.color"
					/>
				</div>
			</div>

			<!-- IT Services Section -->
			<div class="mb-16">
				<h3 class="text-2xl font-semibold text-gray-900 mb-8 text-center">
					IT Services
				</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<ServiceCard
						v-for="service in itServices"
						:key="service.title"
						:title="service.title"
						:description="service.description"
						:icon="service.icon"
						:color="service.color"
					/>
				</div>
			</div>

			<!-- Call to Action -->
			<div class="text-center bg-white rounded-xl p-8 shadow-md">
				<h3 class="text-2xl font-semibold text-gray-900 mb-4">
					Ready to get started?
				</h3>
				<p class="text-gray-600 mb-6 max-w-2xl mx-auto">
					Contact us today to discuss your project needs and discover how we can help bring your vision to life 
					with our expert programming and IT services.
				</p>
				<button class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center space-x-2">
					<span>Contact Us Today</span>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</button>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import ServiceCard from './ServiceCard.vue'

// Programming Services Data
const programmingServices = ref([
	{
		title: 'Web Development',
		description: 'Custom websites and web applications using modern frameworks like Laravel, Vue.js, and React. Responsive, fast, and optimized for search engines.',
		icon: 'Globe',
		color: 'primary'
	},
	{
		title: 'Mobile Development',
		description: 'Native and cross-platform mobile applications for iOS and Android. User-friendly interfaces with robust backend integration.',
		icon: 'Smartphone',
		color: 'secondary'
	},
	{
		title: 'Custom Software',
		description: 'Tailored software solutions designed specifically for your business needs. From automation tools to complex enterprise systems.',
		icon: 'Code',
		color: 'accent'
	}
])

// IT Services Data
const itServices = ref([
	{
		title: 'IT Consulting',
		description: 'Technical strategy and architecture guidance to help you make informed technology decisions and optimize your IT infrastructure.',
		icon: 'Users',
		color: 'info'
	},
	{
		title: 'System Administration',
		description: 'Server setup, maintenance, and optimization. Cloud deployment, database management, and security implementation.',
		icon: 'Server',
		color: 'neutral'
	},
	{
		title: 'Technical Support',
		description: 'Ongoing technical assistance and troubleshooting. Quick response times and reliable solutions to keep your systems running smoothly.',
		icon: 'HeadphonesIcon',
		color: 'primary'
	}
])
</script>