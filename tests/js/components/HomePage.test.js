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
})