<template>
	<div class="technical-skills">
		<h3 class="text-2xl font-semibold text-gray-900 mb-6">
			Technical Skills
		</h3>

		<div class="skills-grid grid grid-cols-1 md:grid-cols-2 gap-8">
			<div 
				v-for="category in skillCategories" 
				:key="category.name"
				class="skill-category-section"
			>
				<h4 class="text-lg font-medium text-gray-800 mb-4 border-l-4 border-orange-500 pl-3">
					{{ category.name }}
				</h4>
				
				<div class="space-y-4">
					<div 
						v-for="skill in category.skills"
						:key="skill.name"
						class="skill-item"
					>
						<!-- Skill Name and Percentage -->
						<div class="flex justify-between items-center mb-2">
							<span class="text-gray-700 font-medium">{{ skill.name }}</span>
							<span class="text-sm text-gray-600">{{ skill.level }}%</span>
						</div>
						
						<!-- Progress Bar -->
						<div class="skill-progress w-full bg-gray-200 rounded-full h-2.5">
							<div 
								class="h-2.5 rounded-full transition-all duration-1000 ease-out"
								:class="getProgressBarClass(skill.level)"
								:style="{ width: `${skill.level}%` }"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	skills: {
		type: Array,
		default: () => []
	}
})

// Group skills by category
const skillCategories = computed(() => {
	const categories = {}
	
	props.skills.forEach(skill => {
		if (!categories[skill.category]) {
			categories[skill.category] = {
				name: skill.category,
				skills: []
			}
		}
		categories[skill.category].skills.push(skill)
	})
	
	// Sort categories by predefined order
	const categoryOrder = [
		'Programming Languages',
		'Frameworks',
		'Infrastructure',
		'Databases'
	]
	
	return categoryOrder
		.filter(categoryName => categories[categoryName])
		.map(categoryName => categories[categoryName])
		.concat(
			Object.values(categories).filter(
				category => !categoryOrder.includes(category.name)
			)
		)
})

// Get progress bar class based on skill level for brand color gradients
const getProgressBarClass = (level) => {
	if (level >= 90) {
		return 'bg-gradient-to-r from-orange-500 to-yellow-500' // Expert - Primary brand colors
	} else if (level >= 75) {
		return 'bg-gradient-to-r from-green-500 to-orange-400' // Advanced - Green to orange
	} else if (level >= 60) {
		return 'bg-gradient-to-r from-blue-500 to-green-500' // Intermediate - Blue to green
	} else {
		return 'bg-gradient-to-r from-gray-400 to-blue-500' // Beginner - Gray to blue
	}
}
</script>