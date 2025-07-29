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

		<!-- Services Preview Section -->
		<section class="services-preview py-16 bg-white">
			<div class="text-center mb-12">
				<h2 class="font-heading text-3xl md:text-4xl font-bold text-dark-gray mb-4">
					What We Do
				</h2>
				<p class="font-body text-lg text-gray-600 max-w-2xl mx-auto">
					Comprehensive programming and IT services tailored to your business requirements
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<!-- Service Card 1 -->
				<div class="service-card bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
					<div class="w-12 h-12 bg-primary-orange rounded-lg flex items-center justify-center mb-4">
						<span class="text-white font-bold">&lt;/&gt;</span>
					</div>
					<h3 class="font-heading text-xl font-semibold text-dark-gray mb-3">
						Web Development
					</h3>
					<p class="font-body text-gray-600">
						Custom web applications, responsive websites, and modern frontend solutions
					</p>
				</div>

				<!-- Service Card 2 -->
				<div class="service-card bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
					<div class="w-12 h-12 bg-sky-blue rounded-lg flex items-center justify-center mb-4">
						<span class="text-white font-bold">⚙</span>
					</div>
					<h3 class="font-heading text-xl font-semibold text-dark-gray mb-3">
						System Administration
					</h3>
					<p class="font-body text-gray-600">
						Server management, cloud infrastructure, and IT system optimization
					</p>
				</div>

				<!-- Service Card 3 -->
				<div class="service-card bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
					<div class="w-12 h-12 bg-bright-green rounded-lg flex items-center justify-center mb-4">
						<span class="text-white font-bold">📱</span>
					</div>
					<h3 class="font-heading text-xl font-semibold text-dark-gray mb-3">
						IT Consulting
					</h3>
					<p class="font-body text-gray-600">
						Technical guidance, project planning, and technology strategy consulting
					</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
// Homepage component logic
</script>