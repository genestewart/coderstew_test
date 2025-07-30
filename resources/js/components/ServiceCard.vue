<template>
	<div class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100">
		<div class="flex flex-col items-center text-center space-y-4">
			<!-- Icon -->
			<div class="flex items-center justify-center w-16 h-16 rounded-full"
				 :class="iconBackgroundClass">
				<component :is="iconComponent"
						   :size="32"
						   :class="iconColorClass" />
			</div>
			
			<!-- Title -->
			<h3 class="text-xl font-semibold text-gray-900">
				{{ title }}
			</h3>
			
			<!-- Description -->
			<p class="text-gray-600 leading-relaxed">
				{{ description }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import {
	Globe,
	Smartphone,
	Code,
	Users,
	Server,
	HeadphonesIcon
} from 'lucide-vue-next'

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	icon: {
		type: String,
		required: true
	},
	color: {
		type: String,
		default: 'primary'
	}
})

// Icon component mapping
const iconComponents = {
	Globe,
	Smartphone,
	Code,
	Users,
	Server,
	HeadphonesIcon
}

const iconComponent = computed(() => {
	return iconComponents[props.icon] || Globe
})

// Color classes based on brand colors
const colorClasses = {
	primary: {
		background: 'bg-orange-100',
		icon: 'text-orange-600'
	},
	secondary: {
		background: 'bg-yellow-100',
		icon: 'text-yellow-600'
	},
	accent: {
		background: 'bg-green-100',
		icon: 'text-green-600'
	},
	info: {
		background: 'bg-blue-100',
		icon: 'text-blue-600'
	},
	neutral: {
		background: 'bg-gray-100',
		icon: 'text-gray-600'
	}
}

const iconBackgroundClass = computed(() => {
	return colorClasses[props.color]?.background || colorClasses.primary.background
})

const iconColorClass = computed(() => {
	return colorClasses[props.color]?.icon || colorClasses.primary.icon
})
</script>