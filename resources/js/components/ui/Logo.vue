<template>
	<img 
		:class="sizeClasses"
		src="/assets/CoderStew_Logo.svg"
		alt="CoderStew LLC Logo"
	/>
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
</script>