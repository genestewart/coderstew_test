import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'

describe('HomePage.vue', () => {
  it('renders the homepage structure', () => {
    const wrapper = mount(HomePage)
    
    const page = wrapper.find('.homepage')
    expect(page.exists()).toBe(true)
  })

  it('includes hero section', () => {
    const wrapper = mount(HomePage)
    
    const heroSection = wrapper.find('.hero-section')
    expect(heroSection.exists()).toBe(true)
  })

  it('has proper responsive grid layout', () => {
    const wrapper = mount(HomePage)
    
    const heroSection = wrapper.find('.hero-section')
    
    // Check for responsive grid classes
    expect(heroSection.classes()).toContain('grid')
    expect(heroSection.classes()).toContain('grid-cols-1')
    expect(heroSection.classes()).toContain('lg:grid-cols-2')
  })

  it('applies brand colors correctly', () => {
    const wrapper = mount(HomePage)
    
    // Check that brand colors are used in the design
    const heroContent = wrapper.find('.hero-content')
    expect(heroContent.exists()).toBe(true)
  })

  it('uses proper typography classes', () => {
    const wrapper = mount(HomePage)
    
    const heroTitle = wrapper.find('h1')
    const heroSubtitle = wrapper.find('.hero-subtitle')
    
    expect(heroTitle.exists()).toBe(true)
    expect(heroTitle.classes()).toContain('font-heading')
    
    expect(heroSubtitle.exists()).toBe(true)
    expect(heroSubtitle.classes()).toContain('font-body')
  })

  it('is mobile responsive with proper spacing', () => {
    const wrapper = mount(HomePage)
    
    const heroSection = wrapper.find('.hero-section')
    
    // Check for mobile-first responsive spacing
    expect(heroSection.classes()).toContain('py-12')
    expect(heroSection.classes()).toContain('md:py-16')
    expect(heroSection.classes()).toContain('lg:py-20')
  })

  it('includes call-to-action elements', () => {
    const wrapper = mount(HomePage)
    
    const ctaButton = wrapper.find('.cta-button')
    expect(ctaButton.exists()).toBe(true)
    expect(ctaButton.classes()).toContain('bg-primary-orange')
  })

  it('has proper semantic structure', () => {
    const wrapper = mount(HomePage)
    
    const main = wrapper.find('[role="main"]')
    const heroHeading = wrapper.find('h1')
    
    expect(main.exists()).toBe(true)
    expect(heroHeading.exists()).toBe(true)
  })

  it('includes services section integration', () => {
    const wrapper = mount(HomePage)
    
    const servicesSection = wrapper.findComponent({ name: 'ServicesSection' })
    expect(servicesSection.exists()).toBe(true)
  })

  it('displays services section after hero section', () => {
    const wrapper = mount(HomePage)
    
    const heroSection = wrapper.find('.hero-section')
    const servicesSection = wrapper.findComponent({ name: 'ServicesSection' })
    
    expect(heroSection.exists()).toBe(true)
    expect(servicesSection.exists()).toBe(true)
  })

  it('services section shows all service categories', () => {
    const wrapper = mount(HomePage)
    
    const servicesSection = wrapper.findComponent({ name: 'ServicesSection' })
    expect(servicesSection.exists()).toBe(true)
    
    // Check that the services section contains the expected service types
    const text = wrapper.text()
    expect(text).toContain('Web Development')
    expect(text).toContain('Mobile Development')
    expect(text).toContain('Custom Software')
    expect(text).toContain('IT Consulting')
    expect(text).toContain('System Administration')
    expect(text).toContain('Technical Support')
  })

  it('maintains responsive behavior with services integration', () => {
    const wrapper = mount(HomePage)
    
    const homepage = wrapper.find('.homepage')
    expect(homepage.exists()).toBe(true)
    
    // Ensure the overall page structure remains responsive
    const heroSection = wrapper.find('.hero-section')
    expect(heroSection.classes()).toContain('grid')
    expect(heroSection.classes()).toContain('lg:grid-cols-2')
  })

  it('services section call-to-action is integrated properly', () => {
    const wrapper = mount(HomePage)
    
    const servicesSection = wrapper.findComponent({ name: 'ServicesSection' })
    expect(servicesSection.exists()).toBe(true)
    
    // Check for call-to-action text in services section
    const text = wrapper.text()
    expect(text).toContain('Ready to get started')
    expect(text).toContain('Contact us today')
  })
})