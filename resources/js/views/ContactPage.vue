<template>
	<div class="contact-page py-16 px-4 bg-gray-50 min-h-screen">
		<div class="max-w-7xl mx-auto">
			<!-- Page Header -->
			<div class="text-center mb-16">
				<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
					Contact CoderStew LLC
				</h1>
				<p 
					class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
					data-testid="page-description"
				>
					Ready to bring your technical vision to life? Let's discuss your project requirements and explore how our expertise can deliver the perfect solution for your business needs.
				</p>
			</div>

			<!-- Main Content Grid -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16" data-testid="contact-grid">
				<!-- Contact Form Section -->
				<div data-testid="main-content">
					<ContactForm />
				</div>

				<!-- Contact Information Sidebar -->
				<div class="space-y-8" data-testid="contact-sidebar">
					<!-- Contact Information -->
					<div class="bg-white rounded-xl p-8 shadow-lg" data-testid="contact-info">
						<h2 class="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
						
						<div class="space-y-6">
							<div class="flex items-start space-x-4">
								<Mail class="text-primary-orange mt-1" :size="24" />
								<div>
									<h3 class="font-semibold text-gray-900 mb-1">Email Us</h3>
									<p class="text-gray-600">contact@coderstew.com</p>
									<p class="text-sm text-gray-500 mt-1">We respond within 24-48 hours</p>
								</div>
							</div>

							<div class="flex items-start space-x-4">
								<Phone class="text-primary-orange mt-1" :size="24" />
								<div>
									<h3 class="font-semibold text-gray-900 mb-1">Schedule a Call</h3>
									<p class="text-gray-600">Available upon request</p>
									<p class="text-sm text-gray-500 mt-1">For detailed project discussions</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Response Time Information -->
					<div class="bg-bright-green/10 border border-bright-green/20 rounded-xl p-8" data-testid="response-info">
						<div class="flex items-start space-x-4">
							<Clock class="text-bright-green mt-1" :size="24" />
							<div>
								<h3 class="font-semibold text-green-800 mb-2">Quick Response Guarantee</h3>
								<p class="text-green-700 mb-3">
									We respond to all inquiries within 24-48 hours, typically much sooner during business hours.
								</p>
								<div class="text-sm text-green-600" data-testid="service-hours">
									<p><strong>Business Hours:</strong></p>
									<p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
									<p>Weekend: Emergency projects only</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Free Consultation -->
					<div class="bg-primary-orange/10 border border-primary-orange/20 rounded-xl p-8" data-testid="consultation-info">
						<div class="flex items-start space-x-4">
							<MessageSquare class="text-primary-orange mt-1" :size="24" />
							<div>
								<h3 class="font-semibold text-orange-800 mb-2">Free Initial Consultation</h3>
								<p class="text-orange-700 mb-3">
									Every project starts with a complimentary consultation to understand your needs and provide expert guidance.
								</p>
								<ul class="text-sm text-orange-600 space-y-1">
									<li>• Project scope assessment</li>
									<li>• Technology recommendations</li>
									<li>• Timeline and budget estimates</li>
									<li>• No obligation or pressure</li>
								</ul>
							</div>
						</div>
					</div>

					<!-- Contact Methods -->
					<div class="bg-white rounded-xl p-8 shadow-lg" data-testid="contact-methods">
						<h2 class="text-2xl font-bold text-gray-900 mb-6">How We Work</h2>
						
						<div class="space-y-4">
							<div class="flex items-center space-x-3">
								<div class="w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
								<div>
									<h4 class="font-semibold text-gray-900">Initial Contact</h4>
									<p class="text-gray-600 text-sm">Submit your inquiry through our form</p>
								</div>
							</div>
							
							<div class="flex items-center space-x-3">
								<div class="w-8 h-8 bg-golden-yellow rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
								<div>
									<h4 class="font-semibold text-gray-900">Discovery Call</h4>
									<p class="text-gray-600 text-sm">Free consultation to discuss your needs</p>
								</div>
							</div>
							
							<div class="flex items-center space-x-3">
								<div class="w-8 h-8 bg-bright-green rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
								<div>
									<h4 class="font-semibold text-gray-900">Proposal & Planning</h4>
									<p class="text-gray-600 text-sm">Detailed project plan and timeline</p>
								</div>
							</div>
							
							<div class="flex items-center space-x-3">
								<div class="w-8 h-8 bg-sky-blue rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
								<div>
									<h4 class="font-semibold text-gray-900">Development & Delivery</h4>
									<p class="text-gray-600 text-sm">Agile development with regular updates</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Value Proposition -->
					<div class="bg-gray-900 text-white rounded-xl p-8" data-testid="value-proposition">
						<h2 class="text-2xl font-bold mb-4">Why Choose CoderStew LLC?</h2>
						<div class="space-y-3 text-gray-300">
							<div class="flex items-start space-x-3">
								<CheckCircle class="text-bright-green mt-0.5 flex-shrink-0" :size="20" />
								<p>Expert developers with proven track record</p>
							</div>
							<div class="flex items-start space-x-3">
								<CheckCircle class="text-bright-green mt-0.5 flex-shrink-0" :size="20" />
								<p>Clear communication throughout the project</p>
							</div>
							<div class="flex items-start space-x-3">
								<CheckCircle class="text-bright-green mt-0.5 flex-shrink-0" :size="20" />
								<p>Transparent pricing with no hidden costs</p>
							</div>
							<div class="flex items-start space-x-3">
								<CheckCircle class="text-bright-green mt-0.5 flex-shrink-0" :size="20" />
								<p>Ongoing support and maintenance available</p>
							</div>
						</div>
					</div>

					<!-- Call to Action -->
					<div class="text-center bg-white rounded-xl p-8 shadow-lg" data-testid="contact-cta">
						<h3 class="text-xl font-bold text-gray-900 mb-3">Ready to Get Started?</h3>
						<p class="text-gray-600 mb-6">
							Let's discuss your project and explore how we can bring your technical vision to life.
						</p>
						<div class="flex flex-col sm:flex-row gap-4 justify-center">
							<a 
								href="#contact-form"
								class="bg-primary-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-golden-yellow transition-colors duration-200 text-center"
								@click="scrollToForm"
							>
								Fill Out Form Above
							</a>
							<a 
								href="mailto:contact@coderstew.com"
								class="border-2 border-primary-orange text-primary-orange px-6 py-3 rounded-lg font-semibold hover:bg-primary-orange hover:text-white transition-colors duration-200 text-center"
							>
								Email Directly
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import ContactForm from '@/components/ContactForm.vue'
import { Mail, Phone, Clock, MessageSquare, CheckCircle } from 'lucide-vue-next'

const scrollToForm = () => {
	const formElement = document.querySelector('.contact-form-wrapper')
	if (formElement) {
		formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}
}
</script>