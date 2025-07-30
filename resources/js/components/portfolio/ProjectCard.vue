<template>
	<div 
		class="project-card bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
		data-testid="project-card"
	>
		<!-- Project Image -->
		<div 
			class="project-image mb-4 h-48 bg-gray-100 rounded-lg overflow-hidden"
			data-testid="project-image"
		>
			<img 
				v-if="project.image" 
				:src="project.image" 
				:alt="`Screenshot of ${project.title}`"
				class="w-full h-full object-cover"
				@error="handleImageError"
			/>
			<div v-else class="w-full h-full flex items-center justify-center text-gray-400">
				<Monitor :size="48" />
			</div>
		</div>

		<!-- Project Type Badge -->
		<div class="mb-3">
			<span 
				class="project-type inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-orange text-white"
				data-testid="project-type"
			>
				{{ project.type }}
			</span>
		</div>

		<!-- Project Title -->
		<h3 class="text-xl font-bold text-gray-900 mb-3">
			{{ project.title }}
		</h3>

		<!-- Project Description -->
		<p 
			class="text-gray-600 mb-4 leading-relaxed"
			data-testid="project-description"
		>
			{{ project.description }}
		</p>

		<!-- Project Highlights -->
		<div v-if="project.highlights && project.highlights.length > 0" class="mb-4">
			<ul class="text-sm text-gray-700 space-y-1">
				<li 
					v-for="highlight in project.highlights" 
					:key="highlight"
					class="flex items-center space-x-2"
					data-testid="project-highlight"
				>
					<CheckCircle :size="16" class="text-bright-green flex-shrink-0" />
					<span>{{ highlight }}</span>
				</li>
			</ul>
		</div>

		<!-- Technology Tags -->
		<div v-if="project.technologies && project.technologies.length > 0" class="flex flex-wrap gap-2">
			<span 
				v-for="(tech, index) in project.technologies" 
				:key="tech"
				:class="getTechTagClass(index)"
				class="px-3 py-1 text-xs font-medium rounded-full"
				data-testid="tech-tag"
			>
				{{ tech }}
			</span>
		</div>
	</div>
</template>

<script setup>
import { Monitor, CheckCircle } from 'lucide-vue-next'

const props = defineProps({
	project: {
		type: Object,
		required: true,
		validator(value) {
			return (
				typeof value.title === 'string' &&
				typeof value.description === 'string' &&
				typeof value.type === 'string' &&
				Array.isArray(value.technologies)
			)
		}
	}
})

const handleImageError = (event) => {
	event.target.style.display = 'none'
}

const getTechTagClass = (index) => {
	const colorClasses = [
		'bg-primary-orange/10 text-primary-orange border border-primary-orange/20',
		'bg-golden-yellow/10 text-yellow-700 border border-golden-yellow/20',
		'bg-bright-green/10 text-green-700 border border-bright-green/20',
		'bg-sky-blue/10 text-blue-700 border border-sky-blue/20'
	]
	return colorClasses[index % colorClasses.length]
}
</script>

<style scoped>
.project-card:hover .project-image img {
	transform: scale(1.05);
	transition: transform 0.3s ease;
}

.project-image img {
	transition: transform 0.3s ease;
}
</style>