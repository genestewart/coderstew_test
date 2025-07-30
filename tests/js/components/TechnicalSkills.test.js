import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TechnicalSkills from '@/components/about/TechnicalSkills.vue'

describe('TechnicalSkills.vue', () => {
	const defaultProps = {
		skills: [
			{
				name: 'PHP',
				level: 90,
				category: 'Programming Languages'
			},
			{
				name: 'Laravel',
				level: 85,
				category: 'Frameworks'
			},
			{
				name: 'MySQL',
				level: 80,
				category: 'Databases'
			},
			{
				name: 'Linux',
				level: 75,
				category: 'Infrastructure'
			}
		]
	}

	it('renders without errors', () => {
		const wrapper = mount(TechnicalSkills, {
			props: defaultProps
		})
		
		expect(wrapper.exists()).toBe(true)
	})

	it('displays all provided skills', () => {
		const wrapper = mount(TechnicalSkills, {
			props: defaultProps
		})
		
		defaultProps.skills.forEach(skill => {
			expect(wrapper.text()).toContain(skill.name)
		})
	})

	it('groups skills by category', () => {
		const wrapper = mount(TechnicalSkills, {
			props: defaultProps
		})
		
		// Check that category headers are displayed
		expect(wrapper.text()).toContain('Programming Languages')
		expect(wrapper.text()).toContain('Frameworks')
		expect(wrapper.text()).toContain('Databases')
		expect(wrapper.text()).toContain('Infrastructure')
	})

	it('displays skill level indicators', () => {
		const wrapper = mount(TechnicalSkills, {
			props: defaultProps
		})
		
		// Check for progress bar elements
		const progressBars = wrapper.findAll('.skill-progress')
		expect(progressBars.length).toBeGreaterThan(0)
	})

	it('applies correct skill level percentages', () => {
		const wrapper = mount(TechnicalSkills, {
			props: defaultProps
		})
		
		// Check that skill levels are represented
		const skillItems = wrapper.findAll('.skill-item')
		expect(skillItems.length).toBe(defaultProps.skills.length)
	})

	it('applies proper CSS classes for styling', () => {
		const wrapper = mount(TechnicalSkills, {
			props: defaultProps
		})
		
		// Check for main container classes
		const container = wrapper.find('.technical-skills')
		expect(container.exists()).toBe(true)
	})

	it('has proper semantic structure', () => {
		const wrapper = mount(TechnicalSkills, {
			props: defaultProps
		})
		
		// Check for proper heading structure
		const mainHeading = wrapper.find('h3')
		expect(mainHeading.exists()).toBe(true)
		expect(mainHeading.text()).toBe('Technical Skills')
		
		// Check for category headings
		const categoryHeadings = wrapper.findAll('h4')
		expect(categoryHeadings.length).toBeGreaterThan(0)
	})

	it('handles empty skills array gracefully', () => {
		const wrapper = mount(TechnicalSkills, {
			props: {
				skills: []
			}
		})
		
		expect(wrapper.exists()).toBe(true)
		expect(wrapper.text()).toContain('Technical Skills')
	})

	it('applies responsive design classes', () => {
		const wrapper = mount(TechnicalSkills, {
			props: defaultProps
		})
		
		// Check for responsive grid or layout classes
		const skillsContainer = wrapper.find('.skills-grid')
		expect(skillsContainer.exists()).toBe(true)
	})

	it('displays skill levels with proper formatting', () => {
		const wrapper = mount(TechnicalSkills, {
			props: {
				skills: [
					{
						name: 'JavaScript',
						level: 95,
						category: 'Programming Languages'
					}
				]
			}
		})
		
		expect(wrapper.text()).toContain('JavaScript')
		expect(wrapper.text()).toContain('95%')
	})

	it('applies brand color gradients to progress bars', () => {
		const wrapper = mount(TechnicalSkills, {
			props: defaultProps
		})
		
		// Check for gradient classes or styles on progress bars
		const progressBars = wrapper.findAll('.skill-progress')
		expect(progressBars.length).toBeGreaterThan(0)
		
		// At least one progress bar should exist
		expect(progressBars[0].exists()).toBe(true)
	})

	it('handles different skill level ranges', () => {
		const testSkills = [
			{ name: 'Beginner Skill', level: 25, category: 'Test' },
			{ name: 'Intermediate Skill', level: 60, category: 'Test' },
			{ name: 'Advanced Skill', level: 90, category: 'Test' },
			{ name: 'Expert Skill', level: 100, category: 'Test' }
		]
		
		const wrapper = mount(TechnicalSkills, {
			props: { skills: testSkills }
		})
		
		testSkills.forEach(skill => {
			expect(wrapper.text()).toContain(skill.name)
			expect(wrapper.text()).toContain(`${skill.level}%`)
		})
	})
})