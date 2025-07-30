import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfessionalBackground from '@/components/about/ProfessionalBackground.vue'

describe('ProfessionalBackground.vue', () => {
	const defaultProps = {
		yearsExperience: 8,
		backgroundText: 'Experienced software developer specializing in web applications and system architecture.',
		achievements: [
			'Led development of enterprise-level applications',
			'Certified in multiple programming languages',
			'Successfully delivered 50+ client projects'
		]
	}

	it('renders without errors', () => {
		const wrapper = mount(ProfessionalBackground, {
			props: defaultProps
		})
		
		expect(wrapper.exists()).toBe(true)
	})

	it('displays years of experience correctly', () => {
		const wrapper = mount(ProfessionalBackground, {
			props: defaultProps
		})
		
		expect(wrapper.text()).toContain('8')
		expect(wrapper.text()).toContain('Years')
	})

	it('shows background text content', () => {
		const wrapper = mount(ProfessionalBackground, {
			props: defaultProps
		})
		
		expect(wrapper.text()).toContain(defaultProps.backgroundText)
	})

	it('displays all achievements', () => {
		const wrapper = mount(ProfessionalBackground, {
			props: defaultProps
		})
		
		defaultProps.achievements.forEach(achievement => {
			expect(wrapper.text()).toContain(achievement)
		})
	})

	it('applies proper CSS classes for styling', () => {
		const wrapper = mount(ProfessionalBackground, {
			props: defaultProps
		})
		
		// Check for main container classes
		const container = wrapper.find('.professional-background')
		expect(container.exists()).toBe(true)
	})

	it('has proper semantic structure', () => {
		const wrapper = mount(ProfessionalBackground, {
			props: defaultProps
		})
		
		// Check for proper heading structure
		const heading = wrapper.find('h3')
		expect(heading.exists()).toBe(true)
		
		// Check for achievements list
		const achievementsList = wrapper.find('ul')
		expect(achievementsList.exists()).toBe(true)
	})

	it('handles missing achievements gracefully', () => {
		const propsWithoutAchievements = {
			...defaultProps,
			achievements: []
		}
		
		const wrapper = mount(ProfessionalBackground, {
			props: propsWithoutAchievements
		})
		
		expect(wrapper.exists()).toBe(true)
		expect(wrapper.text()).toContain(defaultProps.backgroundText)
	})

	it('applies responsive typography classes', () => {
		const wrapper = mount(ProfessionalBackground, {
			props: defaultProps
		})
		
		const heading = wrapper.find('h3')
		expect(heading.classes()).toContain('text-2xl')
		expect(heading.classes()).toContain('font-semibold')
	})

	it('displays experience with proper formatting', () => {
		const wrapper = mount(ProfessionalBackground, {
			props: {
				...defaultProps,
				yearsExperience: 10
			}
		})
		
		// Should show years of experience prominently
		const experienceElement = wrapper.find('.years-experience')
		expect(experienceElement.exists()).toBe(true)
		expect(wrapper.text()).toContain('10')
	})

	it('handles different years experience values', () => {
		const wrapper = mount(ProfessionalBackground, {
			props: {
				...defaultProps,
				yearsExperience: 1
			}
		})
		
		expect(wrapper.text()).toContain('1')
		expect(wrapper.exists()).toBe(true)
	})
})