import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactForm from '@/components/ContactForm.vue'

describe('ContactForm.vue', () => {
	let wrapper

	beforeEach(() => {
		// Mock fetch for form submissions
		global.fetch = vi.fn()
		wrapper = mount(ContactForm)
	})

	it('renders the contact form', () => {
		expect(wrapper.exists()).toBe(true)
		expect(wrapper.find('form').exists()).toBe(true)
	})

	it('displays all required form fields', () => {
		// Contact Information Fields
		expect(wrapper.find('input[name="name"]').exists()).toBe(true)
		expect(wrapper.find('input[name="email"]').exists()).toBe(true)
		expect(wrapper.find('input[name="company"]').exists()).toBe(true)
		expect(wrapper.find('input[name="phone"]').exists()).toBe(true)

		// Project Details Fields
		expect(wrapper.find('select[name="project_type"]').exists()).toBe(true)
		expect(wrapper.find('select[name="budget_range"]').exists()).toBe(true)
		expect(wrapper.find('select[name="timeline"]').exists()).toBe(true)
		expect(wrapper.find('textarea[name="message"]').exists()).toBe(true)
		expect(wrapper.find('select[name="preferred_contact"]').exists()).toBe(true)
	})

	it('has proper form labels and accessibility attributes', () => {
		const nameInput = wrapper.find('input[name="name"]')
		expect(nameInput.attributes('required')).toBeDefined()
		expect(nameInput.attributes('aria-label')).toBeDefined()

		const emailInput = wrapper.find('input[name="email"]')
		expect(emailInput.attributes('required')).toBeDefined()
		expect(emailInput.attributes('type')).toBe('email')

		const messageTextarea = wrapper.find('textarea[name="message"]')
		expect(messageTextarea.attributes('required')).toBeDefined()
	})

	it('validates required fields on blur', async () => {
		const nameInput = wrapper.find('input[name="name"]')
		
		await nameInput.trigger('blur')
		await wrapper.vm.$nextTick()
		
		const errorMessage = wrapper.find('[data-testid="name-error"]')
		expect(errorMessage.exists()).toBe(true)
		expect(errorMessage.text()).toContain('required')
	})

	it('validates email format', async () => {
		const emailInput = wrapper.find('input[name="email"]')
		
		await emailInput.setValue('invalid-email')
		await emailInput.trigger('blur')
		await wrapper.vm.$nextTick()
		
		const errorMessage = wrapper.find('[data-testid="email-error"]')
		expect(errorMessage.exists()).toBe(true)
		expect(errorMessage.text()).toContain('valid email')
	})

	it('clears validation errors when valid input is provided', async () => {
		const nameInput = wrapper.find('input[name="name"]')
		
		// Trigger validation error
		await nameInput.trigger('blur')
		await wrapper.vm.$nextTick()
		expect(wrapper.find('[data-testid="name-error"]').exists()).toBe(true)
		
		// Provide valid input
		await nameInput.setValue('John Doe')
		await nameInput.trigger('blur')
		await wrapper.vm.$nextTick()
		
		expect(wrapper.find('[data-testid="name-error"]').exists()).toBe(false)
	})

	it('displays project type options', () => {
		const projectTypeSelect = wrapper.find('select[name="project_type"]')
		const options = projectTypeSelect.findAll('option')
		
		expect(options.length).toBeGreaterThan(1)
		expect(options.some(option => option.text().includes('Web Application'))).toBe(true)
		expect(options.some(option => option.text().includes('Mobile App'))).toBe(true)
		expect(options.some(option => option.text().includes('IT Support'))).toBe(true)
	})

	it('displays budget range options', () => {
		const budgetSelect = wrapper.find('select[name="budget_range"]')
		const options = budgetSelect.findAll('option')
		
		expect(options.length).toBeGreaterThan(1)
		expect(options.some(option => option.text().includes('$5,000'))).toBe(true)
		expect(options.some(option => option.text().includes('$10,000'))).toBe(true)
	})

	it('displays timeline options', () => {
		const timelineSelect = wrapper.find('select[name="timeline"]')
		const options = timelineSelect.findAll('option')
		
		expect(options.length).toBeGreaterThan(1)
		expect(options.some(option => option.text().includes('ASAP'))).toBe(true)
		expect(options.some(option => option.text().includes('3-6 months'))).toBe(true)
	})

	it('shows loading state during form submission', async () => {
		// Mock successful response with delay to catch loading state
		global.fetch.mockImplementationOnce(() => 
			new Promise(resolve => {
				setTimeout(() => {
					resolve({
						ok: true,
						json: async () => ({ success: true })
					})
				}, 100)
			})
		)

		// Fill out required fields
		await wrapper.find('input[name="name"]').setValue('John Doe')
		await wrapper.find('input[name="email"]').setValue('john@example.com')
		await wrapper.find('select[name="project_type"]').setValue('web_application')
		await wrapper.find('textarea[name="message"]').setValue('Test message that is long enough to pass validation')

		const submitButton = wrapper.find('button[type="submit"]')
		
		// Submit form
		wrapper.find('form').trigger('submit.prevent')
		await wrapper.vm.$nextTick()
		
		expect(submitButton.text()).toContain('Sending')
		expect(submitButton.attributes('disabled')).toBeDefined()
	})

	it('shows success message after successful submission', async () => {
		// Mock successful response
		global.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ success: true, message: 'Thank you for your inquiry!' })
		})

		// Fill out required fields
		await wrapper.find('input[name="name"]').setValue('John Doe')
		await wrapper.find('input[name="email"]').setValue('john@example.com')
		await wrapper.find('select[name="project_type"]').setValue('web_application')
		await wrapper.find('textarea[name="message"]').setValue('Test message that is long enough to pass validation')

		// Submit form
		await wrapper.find('form').trigger('submit.prevent')
		
		// Wait for async operations
		await new Promise(resolve => setTimeout(resolve, 50))
		await wrapper.vm.$nextTick()
		
		const successMessage = wrapper.find('[data-testid="success-message"]')
		expect(successMessage.exists()).toBe(true)
		expect(successMessage.text()).toContain('Thank You')
	})

	it('shows error message on submission failure', async () => {
		// Mock error response
		global.fetch.mockRejectedValueOnce(new Error('Network error'))

		// Fill out required fields
		await wrapper.find('input[name="name"]').setValue('John Doe')
		await wrapper.find('input[name="email"]').setValue('john@example.com')
		await wrapper.find('select[name="project_type"]').setValue('web_application')
		await wrapper.find('textarea[name="message"]').setValue('Test message that is long enough to pass validation')

		// Submit form
		await wrapper.find('form').trigger('submit.prevent')
		
		// Wait for async operations
		await new Promise(resolve => setTimeout(resolve, 50))
		await wrapper.vm.$nextTick()
		
		const errorMessage = wrapper.find('[data-testid="submission-error"]')
		expect(errorMessage.exists()).toBe(true)
		expect(errorMessage.text()).toContain('error')
	})

	it('resets form after successful submission', async () => {
		// Mock successful response
		global.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ success: true })
		})

		// Fill out form
		await wrapper.find('input[name="name"]').setValue('John Doe')
		await wrapper.find('input[name="email"]').setValue('john@example.com')
		await wrapper.find('select[name="project_type"]').setValue('web_application')
		await wrapper.find('textarea[name="message"]').setValue('Test message that is long enough to pass validation')

		// Submit form
		await wrapper.find('form').trigger('submit.prevent')
		
		// Wait for async operations
		await new Promise(resolve => setTimeout(resolve, 50))
		await wrapper.vm.$nextTick()
		
		// Check that form reactive data is reset
		expect(wrapper.vm.form.name).toBe('')
		expect(wrapper.vm.form.email).toBe('')
		expect(wrapper.vm.form.message).toBe('')
	})

	it('prevents submission with invalid data', async () => {
		const submitButton = wrapper.find('button[type="submit"]')
		
		// Try to submit without filling required fields
		await wrapper.find('form').trigger('submit.prevent')
		await wrapper.vm.$nextTick()
		
		// Form should not be submitted
		expect(global.fetch).not.toHaveBeenCalled()
		
		// Should show validation errors
		expect(wrapper.find('[data-testid="name-error"]').exists()).toBe(true)
		expect(wrapper.find('[data-testid="email-error"]').exists()).toBe(true)
	})

	it('applies proper brand styling', () => {
		const form = wrapper.find('form')
		expect(form.classes()).toContain('bg-white')
		
		const submitButton = wrapper.find('button[type="submit"]')
		expect(submitButton.classes()).toContain('bg-primary-orange')
	})

	it('has responsive design classes', () => {
		const formContainer = wrapper.find('[data-testid="form-container"]')
		expect(formContainer.exists()).toBe(true)
		
		// Check for responsive classes in child div
		const maxWidthContainer = wrapper.find('.max-w-2xl')
		expect(maxWidthContainer.exists()).toBe(true)
		expect(maxWidthContainer.classes()).toContain('mx-auto')
		
		const fieldsGrid = wrapper.find('[data-testid="form-grid"]')
		expect(fieldsGrid.classes()).toContain('grid')
		expect(fieldsGrid.classes()).toContain('md:grid-cols-2')
	})

	it('handles phone number formatting', async () => {
		const phoneInput = wrapper.find('input[name="phone"]')
		
		await phoneInput.setValue('1234567890')
		await phoneInput.trigger('blur')
		await wrapper.vm.$nextTick()
		
		// Should format or validate phone number
		expect(phoneInput.element.value.length).toBeGreaterThan(10)
	})

	it('validates message length', async () => {
		const messageInput = wrapper.find('textarea[name="message"]')
		
		// Test minimum length
		await messageInput.setValue('Hi')
		await messageInput.trigger('blur')
		await wrapper.vm.$nextTick()
		
		const errorMessage = wrapper.find('[data-testid="message-error"]')
		expect(errorMessage.exists()).toBe(true)
		expect(errorMessage.text()).toContain('least')
	})
})