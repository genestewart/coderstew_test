<template>
	<header class="bg-white shadow-sm">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<Logo size="lg" />
					<div class="hidden md:block">
						<h1 class="text-xl font-bold text-dark-gray">CoderStew LLC</h1>
						<p class="text-sm text-gray-600">Programming & IT Services</p>
					</div>
				</div>
				
				<nav aria-label="Main navigation">
					<ul class="flex items-center space-x-6">
						<li>
							<a 
								href="#services" 
								class="text-dark-gray hover:text-primary-orange transition-colors duration-200"
							>
								Services
							</a>
						</li>
						<li>
							<a 
								href="#about" 
								class="text-dark-gray hover:text-primary-orange transition-colors duration-200"
							>
								About
							</a>
						</li>
						<li>
							<a 
								href="#contact" 
								class="bg-primary-orange text-white px-4 py-2 rounded-md hover:bg-golden-yellow transition-colors duration-200"
							>
								Contact
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
</template>

<script setup>
import Logo from '@/components/ui/Logo.vue'
</script>