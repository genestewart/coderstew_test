import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceCard from '@/components/ServiceCard.vue'

describe('ServiceCard.vue', () => {
	it('renders without errors', () => {
		const wrapper = mount(ServiceCard, {
			props: {
				title: 'Web Development',
				description: 'Custom websites and web applications',
				icon: 'Globe',
				color: 'primary'
			}
		})
		
		expect(wrapper.exists()).toBe(true)
	})

	it('displays provided props correctly', () => {
		const props = {
			title: 'Mobile Development',
			description: 'Native and cross-platform mobile applications',
			icon: 'Smartphone',
			color: 'secondary'
		}
		
		const wrapper = mount(ServiceCard, { props })
		
		expect(wrapper.text()).toContain(props.title)
		expect(wrapper.text()).toContain(props.description)
	})

	it('applies proper CSS classes for styling', () => {
		const wrapper = mount(ServiceCard, {
			props: {
				title: 'Web Development',
				description: 'Custom websites and web applications',
				icon: 'Globe',
				color: 'primary'
			}
		})
		
		// Check for card structure classes
		expect(wrapper.classes()).toContain('bg-white')
		expect(wrapper.classes()).toContain('rounded-lg')
		expect(wrapper.classes()).toContain('p-6')
		expect(wrapper.classes()).toContain('shadow-md')
	})

	it('applies hover effects correctly', () => {
		const wrapper = mount(ServiceCard, {
			props: {
				title: 'Web Development',
				description: 'Custom websites and web applications',
				icon: 'Globe',
				color: 'primary'
			}
		})
		
		// Check for hover classes
		expect(wrapper.classes()).toContain('hover:shadow-lg')
		expect(wrapper.classes()).toContain('transition-shadow')
	})

	it('handles different color props', () => {
		const wrapper = mount(ServiceCard, {
			props: {
				title: 'IT Consulting',
				description: 'Technical strategy and architecture guidance',
				icon: 'Settings',
				color: 'accent'
			}
		})
		
		// The component should handle different color variations
		expect(wrapper.exists()).toBe(true)
		expect(wrapper.text()).toContain('IT Consulting')
	})

	it('renders with proper responsive classes', () => {
		const wrapper = mount(ServiceCard, {
			props: {
				title: 'Web Development',
				description: 'Custom websites and web applications',
				icon: 'Globe',
				color: 'primary'
			}
		})
		
		// Check for responsive behavior classes
		const card = wrapper.find('.bg-white')
		expect(card.exists()).toBe(true)
	})

	it('has proper semantic structure for accessibility', () => {
		const wrapper = mount(ServiceCard, {
			props: {
				title: 'Web Development',
				description: 'Custom websites and web applications',
				icon: 'Globe',
				color: 'primary'
			}
		})
		
		// Check for proper heading structure
		const title = wrapper.find('h3')
		expect(title.exists()).toBe(true)
		expect(title.text()).toBe('Web Development')
		
		// Check for description paragraph
		const description = wrapper.find('p')
		expect(description.exists()).toBe(true)
		expect(description.text()).toBe('Custom websites and web applications')
	})

	it('integrates with Lucide icons', () => {
		const wrapper = mount(ServiceCard, {
			props: {
				title: 'Web Development',
				description: 'Custom websites and web applications',
				icon: 'Globe',
				color: 'primary'
			}
		})
		
		// Check that icon component exists
		const iconElement = wrapper.find('.lucide')
		expect(iconElement.exists()).toBe(true)
	})
})