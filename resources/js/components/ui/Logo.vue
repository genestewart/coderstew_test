<template>
	<svg 
		:class="sizeClasses"
		viewBox="0 0 400 400"
		aria-label="CoderStew LLC Logo"
		xmlns="http://www.w3.org/2000/svg"
	>
		<!-- Simplified logo representation for component -->
		<circle cx="200" cy="200" r="180" :fill="primaryColor" opacity="0.1" />
		<text 
			x="200" 
			y="180" 
			text-anchor="middle" 
			:fill="primaryColor"
			font-family="Arial, sans-serif" 
			font-size="48" 
			font-weight="bold"
		>
			CS
		</text>
		<text 
			x="200" 
			y="220" 
			text-anchor="middle" 
			:fill="darkColor"
			font-family="Arial, sans-serif" 
			font-size="24"
		>
			LLC
		</text>
	</svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	size: {
		type: String,
		default: 'md',
		validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
	}
})

const sizeClasses = computed(() => {
	const sizes = {
		sm: 'h-6 w-6',
		md: 'h-8 w-8',
		lg: 'h-12 w-12',
		xl: 'h-16 w-16'
	}
	return sizes[props.size]
})

const primaryColor = '#FF9410' // primary-orange from brand colors
const darkColor = '#171717' // dark-gray from brand colors
</script>