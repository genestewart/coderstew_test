import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'

describe('ProjectCard.vue', () => {
	const mockProject = {
		title: 'E-commerce Platform',
		description: 'Full-stack web application with payment processing and inventory management',
		image: '/images/projects/ecommerce-mockup.jpg',
		technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe API'],
		type: 'Web Application',
		highlights: ['99.9% uptime', '50% faster checkout process']
	}

	it('renders the component', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		expect(wrapper.exists()).toBe(true)
	})

	it('displays project title correctly', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		const title = wrapper.find('h3')
		expect(title.exists()).toBe(true)
		expect(title.text()).toBe('E-commerce Platform')
	})

	it('displays project description', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		const description = wrapper.find('[data-testid="project-description"]')
		expect(description.exists()).toBe(true)
		expect(description.text()).toBe('Full-stack web application with payment processing and inventory management')
	})

	it('displays project type badge', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		const typeBadge = wrapper.find('[data-testid="project-type"]')
		expect(typeBadge.exists()).toBe(true)
		expect(typeBadge.text()).toBe('Web Application')
	})

	it('renders all technology tags', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		const techTags = wrapper.findAll('[data-testid="tech-tag"]')
		expect(techTags).toHaveLength(4)
		expect(techTags[0].text()).toBe('Laravel')
		expect(techTags[1].text()).toBe('Vue.js')
		expect(techTags[2].text()).toBe('MySQL')
		expect(techTags[3].text()).toBe('Stripe API')
	})

	it('applies hover effects class', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		const cardElement = wrapper.find('[data-testid="project-card"]')
		expect(cardElement.classes()).toContain('hover:shadow-lg')
		expect(cardElement.classes()).toContain('transition-shadow')
	})

	it('displays project highlights when provided', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		const highlights = wrapper.findAll('[data-testid="project-highlight"]')
		expect(highlights).toHaveLength(2)
		expect(highlights[0].text()).toBe('99.9% uptime')
		expect(highlights[1].text()).toBe('50% faster checkout process')
	})

	it('handles missing image gracefully', () => {
		const projectWithoutImage = { ...mockProject, image: undefined }
		const wrapper = mount(ProjectCard, {
			props: { project: projectWithoutImage }
		})
		
		const imageContainer = wrapper.find('[data-testid="project-image"]')
		expect(imageContainer.exists()).toBe(true)
		// Should show placeholder or default styling
	})

	it('handles empty technologies array', () => {
		const projectWithoutTech = { ...mockProject, technologies: [] }
		const wrapper = mount(ProjectCard, {
			props: { project: projectWithoutTech }
		})
		
		const techTags = wrapper.findAll('[data-testid="tech-tag"]')
		expect(techTags).toHaveLength(0)
	})

	it('handles missing highlights gracefully', () => {
		const projectWithoutHighlights = { ...mockProject, highlights: undefined }
		const wrapper = mount(ProjectCard, {
			props: { project: projectWithoutHighlights }
		})
		
		const highlights = wrapper.findAll('[data-testid="project-highlight"]')
		expect(highlights).toHaveLength(0)
	})

	it('applies responsive classes', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		const cardElement = wrapper.find('[data-testid="project-card"]')
		expect(cardElement.classes()).toContain('rounded-lg')
		expect(cardElement.classes()).toContain('bg-white')
	})

	it('has proper semantic structure', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		// Should have heading for title
		const title = wrapper.find('h3')
		expect(title.exists()).toBe(true)
		
		// Should have proper article or section structure
		const cardElement = wrapper.find('[data-testid="project-card"]')
		expect(cardElement.exists()).toBe(true)
	})

	it('validates required project prop structure', () => {
		const minimalProject = {
			title: 'Test Project',
			description: 'Test description',
			technologies: ['React'],
			type: 'Web App'
		}
		
		const wrapper = mount(ProjectCard, {
			props: { project: minimalProject }
		})
		
		expect(wrapper.exists()).toBe(true)
		expect(wrapper.find('h3').text()).toBe('Test Project')
	})

	it('applies brand colors to technology tags', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		const techTags = wrapper.findAll('[data-testid="tech-tag"]')
		// Check that at least one tech tag has brand color classes
		const hasColorClasses = techTags.some(tag => {
			const classes = tag.classes()
			return classes.some(cls => 
				cls.includes('orange') || 
				cls.includes('yellow') || 
				cls.includes('green') || 
				cls.includes('blue')
			)
		})
		expect(hasColorClasses).toBe(true)
	})

	it('maintains consistent spacing and layout', () => {
		const wrapper = mount(ProjectCard, {
			props: { project: mockProject }
		})
		
		const cardElement = wrapper.find('[data-testid="project-card"]')
		expect(cardElement.classes()).toContain('p-6')
		expect(cardElement.classes()).toContain('shadow-md')
	})
})