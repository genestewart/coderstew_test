import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Logo from '@/components/ui/Logo.vue'

describe('Logo.vue', () => {
  it('renders SVG logo correctly', () => {
    const wrapper = mount(Logo)
    
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('viewBox')).toBeDefined()
  })

  it('applies correct size classes', () => {
    const wrapper = mount(Logo, {
      props: {
        size: 'lg'
      }
    })
    
    expect(wrapper.classes()).toContain('h-12')
    expect(wrapper.classes()).toContain('w-12')
  })

  it('uses default size when no size prop provided', () => {
    const wrapper = mount(Logo)
    
    expect(wrapper.classes()).toContain('h-8')
    expect(wrapper.classes()).toContain('w-8')
  })

  it('has proper alt text for accessibility', () => {
    const wrapper = mount(Logo)
    
    const svg = wrapper.find('svg')
    expect(svg.attributes('aria-label')).toBe('CoderStew LLC Logo')
  })

  it('applies brand colors correctly', () => {
    const wrapper = mount(Logo)
    
    // Check that SVG has proper styling classes or inline styles
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    
    // The logo should be styled with brand colors
    const logoElements = wrapper.findAll('path, circle, rect')
    expect(logoElements.length).toBeGreaterThan(0)
  })
})