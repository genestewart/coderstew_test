<template>
	<header class="bg-white shadow-sm">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between relative">
				<div class="flex items-center space-x-4">
					<Logo size="lg" />
					<div class="hidden md:block">
						<h1 class="font-heading text-xl font-bold text-dark-gray">CoderStew LLC</h1>
						<p class="font-body text-sm text-gray-600">Programming & IT Services</p>
					</div>
				</div>
				
				<AppNavigation />
			</div>
		</div>
	</header>
</template>

<script setup>
import Logo from '@/components/ui/Logo.vue'
import AppNavigation from '@/components/layout/AppNavigation.vue'
</script>