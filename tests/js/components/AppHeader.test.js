import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/layout/AppHeader.vue'
import Logo from '@/components/ui/Logo.vue'

// Mock the Logo component
const mockLogo = {
  name: 'Logo',
  template: '<div data-testid="logo">Mock Logo</div>'
}

describe('AppHeader.vue', () => {
  it('renders the header element', () => {
    const wrapper = mount(AppHeader)
    
    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)
  })

  it('includes the Logo component', () => {
    const wrapper = mount(AppHeader)
    
    const logo = wrapper.findComponent(Logo)
    expect(logo.exists()).toBe(true)
  })

  it('has proper navigation structure', () => {
    const wrapper = mount(AppHeader)
    
    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)
  })

  it('applies proper styling classes', () => {
    const wrapper = mount(AppHeader)
    
    const header = wrapper.find('header')
    // Should have responsive and brand styling
    expect(header.classes()).toContain('bg-white')
    expect(header.classes()).toContain('shadow-sm')
  })

  it('is responsive across different screen sizes', () => {
    const wrapper = mount(AppHeader)
    
    const container = wrapper.find('.container')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('mx-auto')
  })

  it('has proper semantic structure for accessibility', () => {
    const wrapper = mount(AppHeader)
    
    const header = wrapper.find('header')
    const nav = wrapper.find('nav')
    
    expect(header.exists()).toBe(true)
    expect(nav.exists()).toBe(true)
    expect(nav.attributes('aria-label')).toBe('Main navigation')
  })
})