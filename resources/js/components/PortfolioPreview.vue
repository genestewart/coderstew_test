<template>
	<section 
		class="py-16 px-4 bg-white"
		aria-labelledby="portfolio-heading"
	>
		<div class="max-w-7xl mx-auto">
			<!-- Section Header -->
			<div class="text-center mb-16">
				<h2 
					id="portfolio-heading"
					class="text-4xl font-bold text-gray-900 mb-4"
				>
					Featured Projects
				</h2>
				<p 
					class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
					data-testid="section-subtitle"
				>
					Here's a sample of our recent work showcasing the quality and variety of solutions we've delivered for our clients across different industries and technologies.
				</p>
			</div>

			<!-- Projects Grid -->
			<div 
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
				data-testid="projects-grid"
			>
				<ProjectCard 
					v-for="project in projects" 
					:key="project.id"
					:project="project"
				/>
			</div>

			<!-- Call-to-Action Section -->
			<div 
				class="bg-gray-50 rounded-2xl p-8 md:p-12 text-center"
				data-testid="portfolio-cta"
			>
				<h3 class="text-2xl font-bold text-gray-900 mb-4">
					Ready to Start Your Project?
				</h3>
				<p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
					Whether you need a custom web application, mobile solution, or IT infrastructure support, we're here to bring your vision to life with professional expertise and proven results.
				</p>
				<a 
					href="#contact"
					class="inline-block bg-primary-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-golden-yellow transition-colors duration-200"
					data-testid="contact-cta-button"
				>
					Discuss Your Project
				</a>
			</div>
		</div>
	</section>
</template>

<script setup>
import ProjectCard from '@/components/portfolio/ProjectCard.vue'

const projects = [
	{
		id: 1,
		title: 'E-commerce Platform',
		description: 'Full-stack web application with payment processing, inventory management, and customer portal. Built for a growing retail business needing scalable online presence.',
		image: '/images/projects/placeholder.svg',
		technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe API', 'Redis'],
		type: 'Web Application',
		highlights: ['99.9% uptime achieved', '50% faster checkout process', 'Mobile-responsive design']
	},
	{
		id: 2,
		title: 'Business Management System',
		description: 'Custom CRM and workflow automation platform designed for a mid-size consulting firm to streamline client relationships and project management.',
		image: '/images/projects/placeholder.svg',
		technologies: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Chart.js'],
		type: 'Business Software',
		highlights: ['30% efficiency increase', 'Automated reporting system', 'Role-based access control']
	},
	{
		id: 3,
		title: 'Professional Services Website',
		description: 'Modern, mobile-responsive website for a legal practice featuring appointment booking, client portal, and content management capabilities.',
		image: '/images/projects/placeholder.svg',
		technologies: ['Laravel', 'Tailwind CSS', 'Alpine.js', 'SQLite'],
		type: 'Professional Website',
		highlights: ['SEO optimized', 'GDPR compliant', 'Fast loading times']
	},
	{
		id: 4,
		title: 'API Integration Service',
		description: 'Backend service connecting multiple third-party APIs for data synchronization and automated workflows in a logistics management system.',
		image: '/images/projects/placeholder.svg',
		technologies: ['Laravel', 'REST APIs', 'Queue System', 'Docker'],
		type: 'Backend Service',
		highlights: ['Real-time data sync', 'Error handling & logging', 'Scalable architecture']
	}
]
</script>