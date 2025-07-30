import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutExpertiseSection from '@/components/AboutExpertiseSection.vue'

describe('AboutExpertiseSection.vue', () => {
	it('renders without errors', () => {
		const wrapper = mount(AboutExpertiseSection)
		expect(wrapper.exists()).toBe(true)
	})

	it('displays section header and introduction', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		expect(wrapper.text()).toContain('About & Expertise')
		expect(wrapper.text()).toContain('professional background')
	})

	it('includes all sub-components', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		// Check for ProfessionalBackground component
		const professionalBackground = wrapper.findComponent({ name: 'ProfessionalBackground' })
		expect(professionalBackground.exists()).toBe(true)
		
		// Check for TechnicalSkills component
		const technicalSkills = wrapper.findComponent({ name: 'TechnicalSkills' })
		expect(technicalSkills.exists()).toBe(true)
		
		// Check for ProfessionalValues component
		const professionalValues = wrapper.findComponent({ name: 'ProfessionalValues' })
		expect(professionalValues.exists()).toBe(true)
	})

	it('applies proper responsive layout classes', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		// Check for responsive grid container
		const layoutContainer = wrapper.find('.about-layout')
		expect(layoutContainer.exists()).toBe(true)
		expect(layoutContainer.classes()).toContain('grid')
		expect(layoutContainer.classes()).toContain('lg:grid-cols-2')
	})

	it('has proper semantic structure', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		// Check for section element
		const section = wrapper.find('section')
		expect(section.exists()).toBe(true)
		
		// Check for main heading
		const mainHeading = wrapper.find('h2')
		expect(mainHeading.exists()).toBe(true)
		expect(mainHeading.text()).toBe('About & Expertise')
	})

	it('applies proper spacing and container classes', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		const section = wrapper.find('section')
		expect(section.classes()).toContain('py-16')
		expect(section.classes()).toContain('px-4')
		
		const container = wrapper.find('.max-w-7xl')
		expect(container.exists()).toBe(true)
		expect(container.classes()).toContain('mx-auto')
	})

	it('passes correct props to ProfessionalBackground component', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		const professionalBackground = wrapper.findComponent({ name: 'ProfessionalBackground' })
		const props = professionalBackground.props()
		
		expect(props.yearsExperience).toBeDefined()
		expect(props.backgroundText).toBeDefined()
		expect(props.achievements).toBeDefined()
		expect(Array.isArray(props.achievements)).toBe(true)
	})

	it('passes correct props to TechnicalSkills component', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		const technicalSkills = wrapper.findComponent({ name: 'TechnicalSkills' })
		const props = technicalSkills.props()
		
		expect(props.skills).toBeDefined()
		expect(Array.isArray(props.skills)).toBe(true)
		expect(props.skills.length).toBeGreaterThan(0)
	})

	it('passes correct props to ProfessionalValues component', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		const professionalValues = wrapper.findComponent({ name: 'ProfessionalValues' })
		const props = professionalValues.props()
		
		expect(props.values).toBeDefined()
		expect(Array.isArray(props.values)).toBe(true)
		expect(props.values.length).toBeGreaterThan(0)
	})

	it('maintains proper visual hierarchy', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		// Check main heading styling
		const mainHeading = wrapper.find('h2')
		expect(mainHeading.classes()).toContain('text-4xl')
		expect(mainHeading.classes()).toContain('font-bold')
		
		// Check introduction text styling
		const intro = wrapper.find('.section-intro')
		expect(intro.exists()).toBe(true)
	})

	it('applies consistent brand styling', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		// Check for background color class
		const section = wrapper.find('section')
		expect(section.classes()).toContain('bg-white')
	})

	it('organizes content in proper layout structure', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		// Should have header section
		const header = wrapper.find('.section-header')
		expect(header.exists()).toBe(true)
		
		// Should have layout container
		const layout = wrapper.find('.about-layout')
		expect(layout.exists()).toBe(true)
	})

	it('displays professional content prominently', () => {
		const wrapper = mount(AboutExpertiseSection)
		
		// Check that professional background is in left column
		const leftColumn = wrapper.find('.left-column')
		expect(leftColumn.exists()).toBe(true)
		
		// Check that skills and values are in right column
		const rightColumn = wrapper.find('.right-column')
		expect(rightColumn.exists()).toBe(true)
	})
})