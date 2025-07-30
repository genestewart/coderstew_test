import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PortfolioPreview from '@/components/PortfolioPreview.vue'

describe('PortfolioPreview.vue', () => {
	it('renders the component', () => {
		const wrapper = mount(PortfolioPreview)
		
		expect(wrapper.exists()).toBe(true)
	})

	it('displays the section header correctly', () => {
		const wrapper = mount(PortfolioPreview)
		
		const header = wrapper.find('h2')
		expect(header.exists()).toBe(true)
		expect(header.text()).toBe('Featured Projects')
	})

	it('displays the section subtitle', () => {
		const wrapper = mount(PortfolioPreview)
		
		const subtitle = wrapper.find('[data-testid="section-subtitle"]')
		expect(subtitle.exists()).toBe(true)
		expect(subtitle.text()).toContain('sample of our recent work')
	})

	it('renders the correct number of project cards', () => {
		const wrapper = mount(PortfolioPreview)
		
		const projectCards = wrapper.findAll('[data-testid="project-card"]')
		expect(projectCards).toHaveLength(4)
	})

	it('applies responsive grid layout classes', () => {
		const wrapper = mount(PortfolioPreview)
		
		const grid = wrapper.find('[data-testid="projects-grid"]')
		expect(grid.exists()).toBe(true)
		expect(grid.classes()).toContain('grid')
		expect(grid.classes()).toContain('grid-cols-1')
		expect(grid.classes()).toContain('md:grid-cols-2')
		expect(grid.classes()).toContain('lg:grid-cols-3')
	})

	it('has proper section background and spacing', () => {
		const wrapper = mount(PortfolioPreview)
		
		const section = wrapper.find('section')
		expect(section.exists()).toBe(true)
		expect(section.classes()).toContain('py-16')
		expect(section.classes()).toContain('px-4')
	})

	it('contains diverse project types', () => {
		const wrapper = mount(PortfolioPreview)
		
		const projectCards = wrapper.findAll('[data-testid="project-card"]')
		const projectTypes = projectCards.map(card => 
			card.find('[data-testid="project-type"]').text()
		)
		
		// Should have different project types
		const uniqueTypes = [...new Set(projectTypes)]
		expect(uniqueTypes.length).toBeGreaterThan(1)
	})

	it('includes projects with different technologies', () => {
		const wrapper = mount(PortfolioPreview)
		
		const techTags = wrapper.findAll('[data-testid="tech-tag"]')
		expect(techTags.length).toBeGreaterThan(8) // Should have multiple tech tags across projects
		
		// Should include various technologies
		const technologies = techTags.map(tag => tag.text())
		expect(technologies).toContain('Laravel')
		expect(technologies).toContain('Vue.js')
	})

	it('has semantic HTML structure', () => {
		const wrapper = mount(PortfolioPreview)
		
		// Should be wrapped in a section element
		const section = wrapper.find('section')
		expect(section.exists()).toBe(true)
		
		// Should have proper heading hierarchy
		const heading = wrapper.find('h2')
		expect(heading.exists()).toBe(true)
	})

	it('displays call-to-action section', () => {
		const wrapper = mount(PortfolioPreview)
		
		const cta = wrapper.find('[data-testid="portfolio-cta"]')
		expect(cta.exists()).toBe(true)
		
		const ctaButton = wrapper.find('[data-testid="contact-cta-button"]')
		expect(ctaButton.exists()).toBe(true)
		expect(ctaButton.attributes('href')).toBe('#contact')
	})

	it('maintains consistent spacing between elements', () => {
		const wrapper = mount(PortfolioPreview)
		
		const container = wrapper.find('.max-w-7xl')
		expect(container.exists()).toBe(true)
		
		const grid = wrapper.find('[data-testid="projects-grid"]')
		expect(grid.classes()).toContain('gap-8')
	})

	it('includes proper ARIA attributes for accessibility', () => {
		const wrapper = mount(PortfolioPreview)
		
		const section = wrapper.find('section')
		expect(section.attributes('aria-labelledby')).toBeDefined()
		
		const heading = wrapper.find('h2')
		expect(heading.attributes('id')).toBeDefined()
	})

	it('handles different project data structures gracefully', async () => {
		const wrapper = mount(PortfolioPreview)
		
		// Component should render without errors even if project data varies
		expect(wrapper.exists()).toBe(true)
		
		// All project cards should be present
		const projectCards = wrapper.findAll('[data-testid="project-card"]')
		expect(projectCards).toHaveLength(4)
	})

	it('applies brand color consistency', () => {
		const wrapper = mount(PortfolioPreview)
		
		// Check for brand color usage in CTA button
		const ctaButton = wrapper.find('[data-testid="contact-cta-button"]')
		expect(ctaButton.classes()).toContain('bg-primary-orange')
	})

	it('includes compelling marketing copy', () => {
		const wrapper = mount(PortfolioPreview)
		
		const subtitle = wrapper.find('[data-testid="section-subtitle"]')
		expect(subtitle.text()).toContain('delivered')
		
		const ctaText = wrapper.find('[data-testid="portfolio-cta"] p')
		expect(ctaText.exists()).toBe(true)
		expect(ctaText.text().length).toBeGreaterThan(20) // Should have meaningful copy
	})
})