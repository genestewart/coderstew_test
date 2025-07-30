<template>
	<div class="professional-values">
		<h3 class="text-2xl font-semibold text-gray-900 mb-6">
			Professional Values
		</h3>

		<div class="values-container grid grid-cols-1 md:grid-cols-2 gap-6">
			<div 
				v-for="(value, index) in values"
				:key="index"
				class="value-item bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
			>
				<!-- Icon and Title -->
				<div class="flex items-start space-x-4 mb-3">
					<div class="value-icon flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
						<component 
							:is="getIconComponent(value.icon)"
							:size="24"
							class="text-white"
						/>
					</div>
					<h4 class="value-title text-lg font-medium text-gray-900 leading-tight">
						{{ value.title }}
					</h4>
				</div>

				<!-- Description -->
				<p class="text-gray-700 leading-relaxed ml-16">
					{{ value.description }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import {
	Award,
	MessageCircle,
	BookOpen,
	Clock,
	Shield,
	Target,
	Users,
	Star
} from 'lucide-vue-next'

const props = defineProps({
	values: {
		type: Array,
		default: () => []
	}
})

// Icon component mapping
const iconComponents = {
	Award,
	MessageCircle,
	BookOpen,
	Clock,
	Shield,
	Target,
	Users,
	Star
}

const getIconComponent = (iconName) => {
	return iconComponents[iconName] || Award
}
</script>