import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServicesSection from '@/components/ServicesSection.vue'

describe('ServicesSection.vue', () => {
	it('renders without errors', () => {
		const wrapper = mount(ServicesSection)
		expect(wrapper.exists()).toBe(true)
	})

	it('displays section title and description', () => {
		const wrapper = mount(ServicesSection)
		
		expect(wrapper.text()).toContain('Our Services')
		expect(wrapper.text()).toContain('comprehensive programming and IT solutions')
	})

	it('renders correct number of service cards', () => {
		const wrapper = mount(ServicesSection)
		
		// Should render 6 service cards (3 programming + 3 IT services)
		const serviceCards = wrapper.findAllComponents({ name: 'ServiceCard' })
		expect(serviceCards).toHaveLength(6)
	})

	it('displays programming services correctly', () => {
		const wrapper = mount(ServicesSection)
		
		expect(wrapper.text()).toContain('Web Development')
		expect(wrapper.text()).toContain('Mobile Development')
		expect(wrapper.text()).toContain('Custom Software')
	})

	it('displays IT services correctly', () => {
		const wrapper = mount(ServicesSection)
		
		expect(wrapper.text()).toContain('IT Consulting')
		expect(wrapper.text()).toContain('System Administration')
		expect(wrapper.text()).toContain('Technical Support')
	})

	it('applies responsive grid layout classes', () => {
		const wrapper = mount(ServicesSection)
		
		const gridContainer = wrapper.find('.grid')
		expect(gridContainer.exists()).toBe(true)
		
		// Check for responsive grid classes
		expect(gridContainer.classes()).toContain('grid-cols-1')
		expect(gridContainer.classes()).toContain('md:grid-cols-2')
		expect(gridContainer.classes()).toContain('lg:grid-cols-3')
	})

	it('includes call-to-action elements', () => {
		const wrapper = mount(ServicesSection)
		
		const ctaText = wrapper.text()
		expect(ctaText).toContain('Ready to get started')
		expect(ctaText).toContain('Contact us today')
	})

	it('has proper section structure with semantic HTML', () => {
		const wrapper = mount(ServicesSection)
		
		// Check for section element
		const section = wrapper.find('section')
		expect(section.exists()).toBe(true)
		
		// Check for heading structure
		const mainHeading = wrapper.find('h2')
		expect(mainHeading.exists()).toBe(true)
		expect(mainHeading.text()).toBe('Our Services')
	})

	it('applies proper spacing and layout classes', () => {
		const wrapper = mount(ServicesSection)
		
		const section = wrapper.find('section')
		expect(section.classes()).toContain('py-16')
		expect(section.classes()).toContain('px-4')
	})

	it('centers content appropriately', () => {
		const wrapper = mount(ServicesSection)
		
		const container = wrapper.find('.max-w-7xl')
		expect(container.exists()).toBe(true)
		expect(container.classes()).toContain('mx-auto')
	})

	it('groups services with appropriate section headings', () => {
		const wrapper = mount(ServicesSection)
		
		expect(wrapper.text()).toContain('Programming Services')
		expect(wrapper.text()).toContain('IT Services')
	})
})