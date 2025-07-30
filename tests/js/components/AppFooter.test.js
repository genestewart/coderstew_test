import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from '@/components/layout/AppFooter.vue'

describe('AppFooter.vue', () => {
	it('renders the footer element', () => {
		const wrapper = mount(AppFooter)
		
		const footer = wrapper.find('footer')
		expect(footer.exists()).toBe(true)
	})

	it('displays company branding section', () => {
		const wrapper = mount(AppFooter)
		
		const brandSection = wrapper.find('[data-testid="brand-section"]')
		expect(brandSection.exists()).toBe(true)
		expect(brandSection.text()).toContain('CoderStew LLC')
	})

	it('shows professional tagline', () => {
		const wrapper = mount(AppFooter)
		
		const tagline = wrapper.find('[data-testid="tagline"]')
		expect(tagline.exists()).toBe(true)
		expect(tagline.text()).toContain('Programming & IT Solutions')
	})

	it('includes contact information section', () => {
		const wrapper = mount(AppFooter)
		
		const contactSection = wrapper.find('[data-testid="contact-section"]')
		expect(contactSection.exists()).toBe(true)
	})

	it('displays email contact link', () => {
		const wrapper = mount(AppFooter)
		
		const emailLink = wrapper.find('[data-testid="email-link"]')
		expect(emailLink.exists()).toBe(true)
		expect(emailLink.attributes('href')).toBe('mailto:hello@coderstew.com')
	})

	it('shows social media links section', () => {
		const wrapper = mount(AppFooter)
		
		const socialSection = wrapper.find('[data-testid="social-section"]')
		expect(socialSection.exists()).toBe(true)
	})

	it('has proper responsive design classes', () => {
		const wrapper = mount(AppFooter)
		
		const footer = wrapper.find('footer')
		const container = wrapper.find('.container')
		
		expect(footer.classes()).toContain('bg-dark-gray')
		expect(footer.classes()).toContain('text-white')
		expect(container.classes()).toContain('mx-auto')
	})

	it('includes current year in copyright notice', () => {
		const wrapper = mount(AppFooter)
		
		const copyright = wrapper.find('[data-testid="copyright"]')
		const currentYear = new Date().getFullYear()
		
		expect(copyright.exists()).toBe(true)
		expect(copyright.text()).toContain(currentYear.toString())
	})

	it('has proper semantic structure for accessibility', () => {
		const wrapper = mount(AppFooter)
		
		const footer = wrapper.find('footer')
		const contentInfo = wrapper.find('[role="contentinfo"]')
		
		expect(footer.exists()).toBe(true)
		expect(contentInfo.exists() || footer.attributes('role') === 'contentinfo').toBe(true)
	})

	it('applies proper spacing and typography classes', () => {
		const wrapper = mount(AppFooter)
		
		const footer = wrapper.find('footer')
		expect(footer.classes()).toContain('py-12')
		expect(footer.classes()).toContain('px-4')
	})
})