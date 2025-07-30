import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfessionalValues from '@/components/about/ProfessionalValues.vue'

describe('ProfessionalValues.vue', () => {
	const defaultProps = {
		values: [
			{
				title: 'Quality-Focused Development',
				description: 'I prioritize writing clean, maintainable code that stands the test of time.',
				icon: 'Award'
			},
			{
				title: 'Client Communication',
				description: 'Clear, transparent communication throughout every project phase.',
				icon: 'MessageCircle'
			},
			{
				title: 'Continuous Learning',
				description: 'Staying current with the latest technologies and best practices.',
				icon: 'BookOpen'
			},
			{
				title: 'Reliable Delivery',
				description: 'Meeting deadlines and delivering projects on time, every time.',
				icon: 'Clock'
			}
		]
	}

	it('renders without errors', () => {
		const wrapper = mount(ProfessionalValues, {
			props: defaultProps
		})
		
		expect(wrapper.exists()).toBe(true)
	})

	it('displays all provided values', () => {
		const wrapper = mount(ProfessionalValues, {
			props: defaultProps
		})
		
		defaultProps.values.forEach(value => {
			expect(wrapper.text()).toContain(value.title)
			expect(wrapper.text()).toContain(value.description)
		})
	})

	it('displays section heading', () => {
		const wrapper = mount(ProfessionalValues, {
			props: defaultProps
		})
		
		expect(wrapper.text()).toContain('Professional Values')
	})

	it('applies proper CSS classes for styling', () => {
		const wrapper = mount(ProfessionalValues, {
			props: defaultProps
		})
		
		// Check for main container classes
		const container = wrapper.find('.professional-values')
		expect(container.exists()).toBe(true)
	})

	it('has proper semantic structure', () => {
		const wrapper = mount(ProfessionalValues, {
			props: defaultProps
		})
		
		// Check for proper heading structure
		const mainHeading = wrapper.find('h3')
		expect(mainHeading.exists()).toBe(true)
		expect(mainHeading.text()).toBe('Professional Values')
		
		// Check for value item headings
		const valueHeadings = wrapper.findAll('h4')
		expect(valueHeadings.length).toBe(defaultProps.values.length)
	})

	it('handles empty values array gracefully', () => {
		const wrapper = mount(ProfessionalValues, {
			props: {
				values: []
			}
		})
		
		expect(wrapper.exists()).toBe(true)
		expect(wrapper.text()).toContain('Professional Values')
	})

	it('displays icons with proper integration', () => {
		const wrapper = mount(ProfessionalValues, {
			props: defaultProps
		})
		
		// Check for icon elements
		const iconElements = wrapper.findAll('.value-icon')
		expect(iconElements.length).toBe(defaultProps.values.length)
	})

	it('applies consistent typography and spacing', () => {
		const wrapper = mount(ProfessionalValues, {
			props: defaultProps
		})
		
		// Check for proper spacing classes
		const valueItems = wrapper.findAll('.value-item')
		expect(valueItems.length).toBe(defaultProps.values.length)
		
		// Check heading typography
		const mainHeading = wrapper.find('h3')
		expect(mainHeading.classes()).toContain('text-2xl')
		expect(mainHeading.classes()).toContain('font-semibold')
	})

	it('renders value items with proper structure', () => {
		const wrapper = mount(ProfessionalValues, {
			props: defaultProps
		})
		
		defaultProps.values.forEach((value, index) => {
			const valueItem = wrapper.findAll('.value-item')[index]
			expect(valueItem.text()).toContain(value.title)
			expect(valueItem.text()).toContain(value.description)
		})
	})

	it('applies responsive design classes', () => {
		const wrapper = mount(ProfessionalValues, {
			props: defaultProps
		})
		
		// Check for responsive grid or layout classes
		const valuesContainer = wrapper.find('.values-container')
		expect(valuesContainer.exists()).toBe(true)
	})

	it('handles different numbers of values', () => {
		const singleValue = {
			values: [
				{
					title: 'Single Value',
					description: 'This is a single value test.',
					icon: 'Star'
				}
			]
		}
		
		const wrapper = mount(ProfessionalValues, {
			props: singleValue
		})
		
		expect(wrapper.text()).toContain('Single Value')
		expect(wrapper.text()).toContain('This is a single value test.')
	})

	it('maintains consistent visual hierarchy', () => {
		const wrapper = mount(ProfessionalValues, {
			props: defaultProps
		})
		
		// Check that all value titles have consistent styling
		const valueTitles = wrapper.findAll('.value-title')
		expect(valueTitles.length).toBe(defaultProps.values.length)
		
		valueTitles.forEach(title => {
			expect(title.classes()).toContain('font-medium')
		})
	})
})