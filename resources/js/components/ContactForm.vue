<template>
	<div class="contact-form-wrapper" data-testid="form-container">
		<div class="max-w-2xl mx-auto">
			<!-- Success Message -->
			<div 
				v-if="showSuccessMessage" 
				class="mb-8 p-6 bg-bright-green/10 border border-bright-green/20 rounded-lg"
				data-testid="success-message"
			>
				<div class="flex items-center space-x-3">
					<CheckCircle class="text-bright-green" :size="24" />
					<div>
						<h3 class="text-lg font-semibold text-green-800">Thank You!</h3>
						<p class="text-green-700">
							{{ successMessage || 'Your inquiry has been received. We\'ll get back to you within 24-48 hours.' }}
						</p>
					</div>
				</div>
			</div>

			<!-- Error Message -->
			<div 
				v-if="submissionError" 
				class="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg"
				data-testid="submission-error"
			>
				<div class="flex items-center space-x-3">
					<AlertCircle class="text-red-500" :size="24" />
					<div>
						<h3 class="text-lg font-semibold text-red-800">Submission Error</h3>
						<p class="text-red-700">
							{{ submissionError }}
						</p>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<form 
				v-if="!showSuccessMessage"
				@submit.prevent="handleSubmit" 
				class="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
				novalidate
			>
				<div class="mb-8">
					<h2 class="text-3xl font-bold text-gray-900 mb-4">Let's Discuss Your Project</h2>
					<p class="text-lg text-gray-600">
						Tell us about your technical needs and we'll provide expert guidance and solutions.
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" data-testid="form-grid">
					<!-- Name Field -->
					<div class="form-field">
						<label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
							Full Name *
						</label>
						<input
							id="name"
							name="name"
							type="text"
							v-model="form.name"
							@focus="trackFormStart"
							@blur="validateField('name')"
							@input="clearFieldError('name')"
							:class="getFieldClasses('name')"
							class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-colors duration-200"
							placeholder="Enter your full name"
							required
							aria-label="Full Name"
						/>
						<div 
							v-if="errors.name" 
							class="mt-2 text-sm text-red-600"
							data-testid="name-error"
						>
							{{ errors.name }}
						</div>
					</div>

					<!-- Email Field -->
					<div class="form-field">
						<label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
							Email Address *
						</label>
						<input
							id="email"
							name="email"
							type="email"
							v-model="form.email"
							@blur="validateField('email')"
							@input="clearFieldError('email')"
							:class="getFieldClasses('email')"
							class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-colors duration-200"
							placeholder="your@email.com"
							required
							aria-label="Email Address"
						/>
						<div 
							v-if="errors.email" 
							class="mt-2 text-sm text-red-600"
							data-testid="email-error"
						>
							{{ errors.email }}
						</div>
					</div>

					<!-- Company Field -->
					<div class="form-field">
						<label for="company" class="block text-sm font-semibold text-gray-700 mb-2">
							Company/Organization
						</label>
						<input
							id="company"
							name="company"
							type="text"
							v-model="form.company"
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-colors duration-200"
							placeholder="Your company name"
							aria-label="Company or Organization"
						/>
					</div>

					<!-- Phone Field -->
					<div class="form-field">
						<label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
							Phone Number
						</label>
						<input
							id="phone"
							name="phone"
							type="tel"
							v-model="form.phone"
							@input="formatPhoneNumber"
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-colors duration-200"
							placeholder="(555) 123-4567"
							aria-label="Phone Number"
						/>
					</div>

					<!-- Project Type Field -->
					<div class="form-field">
						<label for="project_type" class="block text-sm font-semibold text-gray-700 mb-2">
							Project Type *
						</label>
						<select
							id="project_type"
							name="project_type"
							v-model="form.project_type"
							@blur="validateField('project_type')"
							@change="clearFieldError('project_type')"
							:class="getFieldClasses('project_type')"
							class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-colors duration-200"
							required
							aria-label="Project Type"
						>
							<option value="">Select project type</option>
							<option value="web_application">Web Application</option>
							<option value="mobile_app">Mobile App</option>
							<option value="website">Business Website</option>
							<option value="api_development">API Development</option>
							<option value="it_support">IT Support & Consultation</option>
							<option value="system_integration">System Integration</option>
							<option value="other">Other</option>
						</select>
						<div 
							v-if="errors.project_type" 
							class="mt-2 text-sm text-red-600"
							data-testid="project-type-error"
						>
							{{ errors.project_type }}
						</div>
					</div>

					<!-- Budget Range Field -->
					<div class="form-field">
						<label for="budget_range" class="block text-sm font-semibold text-gray-700 mb-2">
							Budget Range
						</label>
						<select
							id="budget_range"
							name="budget_range"
							v-model="form.budget_range"
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-colors duration-200"
							aria-label="Budget Range"
						>
							<option value="">Select budget range</option>
							<option value="under_5k">Under $5,000</option>
							<option value="5k_10k">$5,000 - $10,000</option>
							<option value="10k_25k">$10,000 - $25,000</option>
							<option value="25k_50k">$25,000 - $50,000</option>
							<option value="50k_plus">$50,000+</option>
							<option value="discuss">Let's discuss</option>
						</select>
					</div>

					<!-- Timeline Field -->
					<div class="form-field">
						<label for="timeline" class="block text-sm font-semibold text-gray-700 mb-2">
							Timeline
						</label>
						<select
							id="timeline"
							name="timeline"
							v-model="form.timeline"
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-colors duration-200"
							aria-label="Project Timeline"
						>
							<option value="">Select timeline</option>
							<option value="asap">ASAP (Rush job)</option>
							<option value="1_month">Within 1 month</option>
							<option value="1_3_months">1-3 months</option>
							<option value="3_6_months">3-6 months</option>
							<option value="6_plus_months">6+ months</option>
							<option value="flexible">Flexible</option>
						</select>
					</div>

					<!-- Preferred Contact Method -->
					<div class="form-field">
						<label for="preferred_contact" class="block text-sm font-semibold text-gray-700 mb-2">
							Preferred Contact Method
						</label>
						<select
							id="preferred_contact"
							name="preferred_contact"
							v-model="form.preferred_contact"
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-colors duration-200"
							aria-label="Preferred Contact Method"
						>
							<option value="email">Email</option>
							<option value="phone">Phone</option>
							<option value="either">Either</option>
						</select>
					</div>
				</div>

				<!-- Message Field -->
				<div class="form-field mb-8">
					<label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
						Project Description *
					</label>
					<textarea
						id="message"
						name="message"
						v-model="form.message"
						@blur="validateField('message')"
						@input="clearFieldError('message')"
						:class="getFieldClasses('message')"
						class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange transition-colors duration-200 resize-vertical"
						rows="6"
						placeholder="Please describe your project, technical requirements, and any specific challenges you're facing..."
						required
						aria-label="Project Description"
					></textarea>
					<div 
						v-if="errors.message" 
						class="mt-2 text-sm text-red-600"
						data-testid="message-error"
					>
						{{ errors.message }}
					</div>
					<div class="mt-2 text-sm text-gray-500">
						{{ form.message.length }}/1000 characters
					</div>
				</div>

				<!-- Submit Button -->
				<div class="text-center">
					<button
						type="submit"
						:disabled="isSubmitting"
						class="bg-primary-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-golden-yellow transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
					>
						<span v-if="isSubmitting" class="flex items-center justify-center space-x-2">
							<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
							<span>Sending...</span>
						</span>
						<span v-else>Send Inquiry</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { CheckCircle, AlertCircle } from 'lucide-vue-next'

// Inject analytics service
const analytics = inject('analytics')

// Form data
const form = reactive({
	name: '',
	email: '',
	company: '',
	phone: '',
	project_type: '',
	budget_range: '',
	timeline: '',
	preferred_contact: 'email',
	message: ''
})

// Form state
const errors = ref({})
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)
const successMessage = ref('')
const submissionError = ref('')
const hasStartedForm = ref(false)

// Track when user first interacts with form
const trackFormStart = () => {
	if (!hasStartedForm.value) {
		hasStartedForm.value = true
		analytics?.trackContactFormStart()
	}
}

// Validation rules
const validationRules = {
	name: {
		required: true,
		minLength: 2,
		message: 'Full name is required (minimum 2 characters)'
	},
	email: {
		required: true,
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		message: 'Please enter a valid email address'
	},
	project_type: {
		required: true,
		message: 'Please select a project type'
	},
	message: {
		required: true,
		minLength: 20,
		maxLength: 1000,
		message: 'Please provide at least 20 characters describing your project'
	}
}

// Validation functions
const validateField = (fieldName) => {
	const value = form[fieldName]
	const rules = validationRules[fieldName]
	
	if (!rules) return true
	
	// Required validation
	if (rules.required && (!value || value.trim() === '')) {
		errors.value[fieldName] = rules.message
		return false
	}
	
	// Email pattern validation
	if (fieldName === 'email' && value && !rules.pattern.test(value)) {
		errors.value[fieldName] = 'Please enter a valid email address'
		return false
	}
	
	// Length validation
	if (rules.minLength && value && value.trim().length < rules.minLength) {
		errors.value[fieldName] = rules.message
		return false
	}
	
	if (rules.maxLength && value && value.length > rules.maxLength) {
		errors.value[fieldName] = `Maximum ${rules.maxLength} characters allowed`
		return false
	}
	
	// Clear error if validation passes
	delete errors.value[fieldName]
	return true
}

const validateAllFields = () => {
	let isValid = true
	
	Object.keys(validationRules).forEach(fieldName => {
		if (!validateField(fieldName)) {
			isValid = false
		}
	})
	
	return isValid
}

const clearFieldError = (fieldName) => {
	if (errors.value[fieldName]) {
		delete errors.value[fieldName]
	}
}

const getFieldClasses = (fieldName) => {
	const baseClasses = 'border-gray-300'
	const errorClasses = 'border-red-500 bg-red-50'
	
	return errors.value[fieldName] ? errorClasses : baseClasses
}

// Phone number formatting
const formatPhoneNumber = (event) => {
	let value = event.target.value.replace(/\D/g, '')
	
	if (value.length >= 6) {
		value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`
	} else if (value.length >= 3) {
		value = `(${value.slice(0, 3)}) ${value.slice(3)}`
	}
	
	form.phone = value
}

// Form submission
const handleSubmit = async () => {
	// Clear previous messages
	submissionError.value = ''
	showSuccessMessage.value = false
	
	// Validate all fields
	if (!validateAllFields()) {
		return
	}
	
	isSubmitting.value = true
	
	try {
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-Requested-With': 'XMLHttpRequest'
			},
			body: JSON.stringify(form)
		})
		
		const data = await response.json()
		
		if (response.ok && data.success) {
			// Track successful form submission
			analytics?.trackContactFormSubmission(form.project_type, 'contact_page')
			analytics?.trackConversion('contact_form_submit')
			
			showSuccessMessage.value = true
			successMessage.value = data.message
			resetForm()
		} else {
			// Track form submission error
			analytics?.trackEvent('contact_form_error', {
				event_category: 'form_errors',
				event_label: data.message || 'submission_error'
			})
			
			submissionError.value = data.message || 'There was an error submitting your inquiry. Please try again.'
		}
	} catch (error) {
		console.error('Form submission error:', error)
		submissionError.value = 'There was a network error. Please check your connection and try again.'
	} finally {
		isSubmitting.value = false
	}
}

const resetForm = () => {
	Object.keys(form).forEach(key => {
		if (key === 'preferred_contact') {
			form[key] = 'email'
		} else {
			form[key] = ''
		}
	})
	errors.value = {}
}
</script>

<style scoped>
.form-field {
	position: relative;
}

.animate-spin {
	animation: spin 1s linear infinite;
}

@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>