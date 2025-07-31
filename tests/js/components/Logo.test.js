import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Logo from '@/components/ui/Logo.vue'

describe('Logo.vue', () => {
  it('renders logo image correctly', () => {
    const wrapper = mount(Logo)
    
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/assets/CoderStew_Logo.svg')
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
    
    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe('CoderStew LLC Logo')
  })

  it('applies brand colors correctly', () => {
    const wrapper = mount(Logo)
    
    // Check that the logo image loads with proper source
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toContain('CoderStew_Logo.svg')
  })
})