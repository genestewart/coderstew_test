<template>
	<footer 
		class="bg-dark-gray text-white py-12 px-4
		       md:py-16 md:px-6
		       lg:py-20 lg:px-8"
		role="contentinfo"
	>
		<div class="container mx-auto">
			<div class="grid grid-cols-1 gap-8
			            md:grid-cols-3 md:gap-12">
				
				<!-- Brand Section -->
				<div class="space-y-4" data-testid="brand-section">
					<h2 class="text-2xl font-bold text-primary-orange
					           md:text-3xl">
						CoderStew LLC
					</h2>
					<p class="text-gray-300 text-lg
					          md:text-xl" 
					   data-testid="tagline">
						Programming & IT Solutions
					</p>
					<p class="text-gray-400 leading-relaxed
					          md:text-lg">
						Professional freelance programming and IT services for businesses, entrepreneurs, and organizations.
					</p>
				</div>

				<!-- Contact Section -->
				<div class="space-y-4" data-testid="contact-section">
					<h3 class="text-xl font-semibold text-golden-yellow
					           md:text-2xl">
						Get In Touch
					</h3>
					<div class="space-y-3">
						<a 
							href="mailto:hello@coderstew.com"
							class="flex items-center space-x-3 text-gray-300 hover:text-primary-orange transition-colors duration-200
							       md:text-lg"
							data-testid="email-link"
						>
							<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
								<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
							</svg>
							<span>hello@coderstew.com</span>
						</a>
						<p class="text-gray-400 text-sm
						          md:text-base">
							Ready to discuss your next project? Send us an email and we'll get back to you within 24 hours.
						</p>
					</div>
				</div>

				<!-- Social & Links Section -->
				<div class="space-y-4" data-testid="social-section">
					<h3 class="text-xl font-semibold text-sky-blue
					           md:text-2xl">
						Connect
					</h3>
					<div class="space-y-3">
						<p class="text-gray-400 text-sm
						          md:text-base">
							Follow our work and stay updated with the latest in web development and IT solutions.
						</p>
						<div class="flex space-x-4">
							<!-- GitHub Link (placeholder) -->
							<a 
								href="#" 
								class="text-gray-400 hover:text-bright-green transition-colors duration-200" 
								aria-label="GitHub Profile"
							>
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
								</svg>
							</a>
							<!-- LinkedIn Link (placeholder) -->
							<a 
								href="#" 
								class="text-gray-400 hover:text-sky-blue transition-colors duration-200" 
								aria-label="LinkedIn Profile"
							>
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Copyright Section -->
			<div class="border-t border-gray-700 mt-12 pt-8
			            md:mt-16 md:pt-12">
				<div class="flex flex-col items-center space-y-4
				            md:flex-row md:justify-between md:space-y-0">
					<p class="text-gray-400 text-sm text-center
					          md:text-left md:text-base" 
					   data-testid="copyright">
						© {{ currentYear }} CoderStew LLC. All rights reserved.
					</p>
					<p class="text-gray-500 text-xs text-center
					          md:text-right md:text-sm">
						Crafted with care for your digital success
					</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>
import { computed } from 'vue'

// Get current year for copyright
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* Custom color utilities for the brand colors */
.text-primary-orange {
	color: #FF9410;
}

.text-golden-yellow {
	color: #E6C417;
}

.text-bright-green {
	color: #70E000;
}

.text-sky-blue {
	color: #63B1C7;
}

.bg-dark-gray {
	background-color: #171717;
}

.hover\:text-primary-orange:hover {
	color: #FF9410;
}

.hover\:text-bright-green:hover {
	color: #70E000;
}

.hover\:text-sky-blue:hover {
	color: #63B1C7;
}
</style>