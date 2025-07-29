<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Skip Link for Accessibility -->
		<a 
			href="#main-content" 
			class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-orange text-white px-4 py-2 rounded-md z-50"
		>
			Skip to main content
		</a>

		<!-- Header -->
		<AppHeader />

		<!-- Main Layout Grid -->
		<main id="app" role="main" class="layout-grid grid grid-cols-1">
			<div class="content-area px-4 md:px-6 lg:px-8" id="main-content">
				<div class="container mx-auto">
					<slot />
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<style scoped>
/* Additional responsive utilities if needed */
.layout-grid {
	min-height: calc(100vh - theme('spacing.20')); /* Account for header height */
}

@media (max-width: 640px) {
	.content-area {
		padding-top: theme('spacing.8');
		padding-bottom: theme('spacing.8');
	}
}

@media (min-width: 768px) {
	.content-area {
		padding-top: theme('spacing.12');
		padding-bottom: theme('spacing.12');
	}
}

@media (min-width: 1024px) {
	.content-area {
		padding-top: theme('spacing.16');
		padding-bottom: theme('spacing.16');
	}
}
</style>