import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactPage from '@/views/ContactPage.vue'

describe('ContactPage.vue', () => {
	it('renders the contact page', () => {
		const wrapper = mount(ContactPage)
		
		expect(wrapper.exists()).toBe(true)
		expect(wrapper.find('.contact-page').exists()).toBe(true)
	})

	it('displays page header with title and description', () => {
		const wrapper = mount(ContactPage)
		
		const pageTitle = wrapper.find('h1')
		expect(pageTitle.exists()).toBe(true)
		expect(pageTitle.text()).toContain('Contact')
		
		const description = wrapper.find('[data-testid="page-description"]')
		expect(description.exists()).toBe(true)
		expect(description.text().length).toBeGreaterThan(50)
	})

	it('includes ContactForm component', () => {
		const wrapper = mount(ContactPage)
		
		const contactForm = wrapper.findComponent({ name: 'ContactForm' })
		expect(contactForm.exists()).toBe(true)
	})

	it('displays contact information section', () => {
		const wrapper = mount(ContactPage)
		
		const contactInfo = wrapper.find('[data-testid="contact-info"]')
		expect(contactInfo.exists()).toBe(true)
		
		// Should include email and response time info
		const text = contactInfo.text()
		expect(text).toContain('contact@coderstew.com')
		expect(text).toContain('24-48 hours')
	})

	it('has proper page structure and layout', () => {
		const wrapper = mount(ContactPage)
		
		const container = wrapper.find('.max-w-7xl')
		expect(container.exists()).toBe(true)
		
		const grid = wrapper.find('[data-testid="contact-grid"]')
		expect(grid.exists()).toBe(true)
		expect(grid.classes()).toContain('grid')
		expect(grid.classes()).toContain('lg:grid-cols-2')
	})

	it('displays professional service hours', () => {
		const wrapper = mount(ContactPage)
		
		const serviceHours = wrapper.find('[data-testid="service-hours"]')
		expect(serviceHours.exists()).toBe(true)
		expect(serviceHours.text()).toContain('Monday')
		expect(serviceHours.text()).toContain('Friday')
	})

	it('includes consultation information', () => {
		const wrapper = mount(ContactPage)
		
		const consultationInfo = wrapper.find('[data-testid="consultation-info"]')
		expect(consultationInfo.exists()).toBe(true)
		expect(consultationInfo.text()).toContain('consultation')
		expect(consultationInfo.text().toLowerCase()).toContain('free')
	})

	it('has proper SEO and accessibility structure', () => {
		const wrapper = mount(ContactPage)
		
		// Should have proper heading hierarchy
		const h1 = wrapper.find('h1')
		expect(h1.exists()).toBe(true)
		
		const h2Elements = wrapper.findAll('h2')
		expect(h2Elements.length).toBeGreaterThan(0)
	})

	it('displays response time expectations', () => {
		const wrapper = mount(ContactPage)
		
		const responseInfo = wrapper.find('[data-testid="response-info"]')
		expect(responseInfo.exists()).toBe(true)
		expect(responseInfo.text()).toContain('respond')
		expect(responseInfo.text()).toContain('24-48 hours')
	})

	it('includes professional contact methods', () => {
		const wrapper = mount(ContactPage)
		
		const contactMethods = wrapper.find('[data-testid="contact-methods"]')
		expect(contactMethods.exists()).toBe(true)
		
		const text = contactMethods.text()
		expect(text).toContain('Contact')
		expect(text).toContain('Call')
	})

	it('has responsive design classes', () => {
		const wrapper = mount(ContactPage)
		
		const page = wrapper.find('.contact-page')
		expect(page.classes()).toContain('py-16')
		expect(page.classes()).toContain('px-4')
		
		const grid = wrapper.find('[data-testid="contact-grid"]')
		expect(grid.classes()).toContain('gap-16')
		expect(grid.classes()).toContain('lg:grid-cols-2')
	})

	it('applies brand styling consistently', () => {
		const wrapper = mount(ContactPage)
		
		const page = wrapper.find('.contact-page')
		expect(page.exists()).toBe(true)
		
		// Check for brand color usage
		const accentElements = wrapper.findAll('.text-primary-orange')
		expect(accentElements.length).toBeGreaterThan(0)
	})

	it('includes call-to-action elements', () => {
		const wrapper = mount(ContactPage)
		
		const ctaSection = wrapper.find('[data-testid="contact-cta"]')
		expect(ctaSection.exists()).toBe(true)
		expect(ctaSection.text()).toContain('discuss')
		expect(ctaSection.text()).toContain('project')
	})

	it('maintains proper spacing and typography', () => {
		const wrapper = mount(ContactPage)
		
		const pageTitle = wrapper.find('h1')
		expect(pageTitle.classes()).toContain('text-4xl')
		expect(pageTitle.classes()).toContain('font-bold')
		
		const description = wrapper.find('[data-testid="page-description"]')
		expect(description.classes()).toContain('text-xl')
		expect(description.classes()).toContain('text-gray-600')
	})

	it('provides clear value proposition', () => {
		const wrapper = mount(ContactPage)
		
		const valueProps = wrapper.find('[data-testid="value-proposition"]')
		expect(valueProps.exists()).toBe(true)
		
		const text = valueProps.text()
		expect(text.toLowerCase()).toContain('expert')
		expect(text).toContain('Choose')
	})

	it('has proper meta information structure', () => {
		const wrapper = mount(ContactPage)
		
		// Should have structured content for SEO
		const mainContent = wrapper.find('[data-testid="main-content"]')
		expect(mainContent.exists()).toBe(true)
		
		const sidebar = wrapper.find('[data-testid="contact-sidebar"]')
		expect(sidebar.exists()).toBe(true)
	})
})