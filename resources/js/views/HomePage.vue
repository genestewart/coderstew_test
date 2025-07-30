<template>
	<div class="homepage" role="main">
		<!-- Hero Section -->
		<section class="hero-section grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 md:py-16 lg:py-20">
			<!-- Hero Content -->
			<div class="hero-content flex flex-col justify-center space-y-6">
				<h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark-gray leading-tight">
					Professional Programming & IT Services
				</h1>
				
				<p class="hero-subtitle font-body text-lg md:text-xl text-gray-600 leading-relaxed">
					Expert freelance development and IT solutions for your business needs. 
					From custom software to system administration, we deliver quality results on time.
				</p>

				<div class="flex flex-col sm:flex-row gap-4">
					<a 
						href="#contact" 
						class="cta-button font-body bg-primary-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-golden-yellow transition-colors duration-200 text-center"
					>
						Get Started Today
					</a>
					
					<a 
						href="#services" 
						class="font-body border-2 border-primary-orange text-primary-orange px-8 py-4 rounded-lg font-semibold hover:bg-primary-orange hover:text-white transition-colors duration-200 text-center"
					>
						View Services
					</a>
				</div>
			</div>

			<!-- Hero Visual -->
			<div class="hero-visual flex items-center justify-center">
				<div class="bg-gradient-to-br from-primary-orange to-golden-yellow rounded-2xl p-8 w-full max-w-md">
					<div class="bg-white rounded-xl p-6 shadow-lg">
						<div class="space-y-4">
							<div class="flex items-center space-x-3">
								<div class="w-3 h-3 bg-bright-green rounded-full"></div>
								<div class="w-3 h-3 bg-golden-yellow rounded-full"></div>
								<div class="w-3 h-3 bg-primary-orange rounded-full"></div>
							</div>
							<div class="space-y-2">
								<div class="h-2 bg-gray-200 rounded w-3/4"></div>
								<div class="h-2 bg-gray-200 rounded w-1/2"></div>
								<div class="h-2 bg-primary-orange rounded w-2/3"></div>
							</div>
							<div class="text-center pt-4">
								<div class="font-heading text-dark-gray font-bold">
									&lt;CoderStew /&gt;
								</div>
								<div class="font-body text-sm text-gray-600">
									Clean Code. Reliable Solutions.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Services Section -->
		<div id="services">
			<ServicesSection />
		</div>

		<!-- About & Expertise Section -->
		<div id="about">
			<AboutExpertiseSection />
		</div>

		<!-- Contact Section (Placeholder) -->
		<div id="contact">
			<section class="py-16 px-4 bg-gray-50">
				<div class="max-w-7xl mx-auto text-center">
					<h2 class="text-4xl font-bold text-gray-900 mb-4">
						Contact Us
					</h2>
					<p class="text-xl text-gray-600 mb-8">
						Ready to discuss your project? Get in touch with us today.
					</p>
					<div class="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto">
						<p class="text-gray-700 mb-4">
							Contact form functionality will be implemented in Phase 3.
						</p>
						<p class="text-gray-600">
							For now, you can reach us at: <strong>contact@coderstew.com</strong>
						</p>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
import ServicesSection from '@/components/ServicesSection.vue'
import AboutExpertiseSection from '@/components/AboutExpertiseSection.vue'
</script>