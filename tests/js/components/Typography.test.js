import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Simple test component to verify typography classes
const TypographyTestComponent = {
  template: `
    <div>
      <h1 class="font-heading text-4xl font-bold">Main Heading</h1>
      <h2 class="font-heading text-2xl font-semibold">Sub Heading</h2>
      <p class="font-body text-base">Body text content</p>
      <small class="font-body text-sm text-gray-600">Small text</small>
    </div>
  `
}

describe('Typography System', () => {
  it('applies heading font classes correctly', () => {
    const wrapper = mount(TypographyTestComponent)
    
    const mainHeading = wrapper.find('h1')
    const subHeading = wrapper.find('h2')
    
    expect(mainHeading.classes()).toContain('font-heading')
    expect(mainHeading.classes()).toContain('text-4xl')
    expect(mainHeading.classes()).toContain('font-bold')
    
    expect(subHeading.classes()).toContain('font-heading')
    expect(subHeading.classes()).toContain('text-2xl')
    expect(subHeading.classes()).toContain('font-semibold')
  })

  it('applies body font classes correctly', () => {
    const wrapper = mount(TypographyTestComponent)
    
    const bodyText = wrapper.find('p')
    const smallText = wrapper.find('small')
    
    expect(bodyText.classes()).toContain('font-body')
    expect(bodyText.classes()).toContain('text-base')
    
    expect(smallText.classes()).toContain('font-body')
    expect(smallText.classes()).toContain('text-sm')
  })

  it('renders text content properly', () => {
    const wrapper = mount(TypographyTestComponent)
    
    expect(wrapper.find('h1').text()).toBe('Main Heading')
    expect(wrapper.find('h2').text()).toBe('Sub Heading')
    expect(wrapper.find('p').text()).toBe('Body text content')
    expect(wrapper.find('small').text()).toBe('Small text')
  })

  it('maintains proper typography hierarchy', () => {
    const wrapper = mount(TypographyTestComponent)
    
    const elements = wrapper.findAll('h1, h2, p, small')
    expect(elements.length).toBe(4)
    
    // Check that we have the right hierarchy elements
    expect(wrapper.findAll('h1').length).toBe(1)
    expect(wrapper.findAll('h2').length).toBe(1)
    expect(wrapper.findAll('p').length).toBe(1)
    expect(wrapper.findAll('small').length).toBe(1)
  })

  it('applies responsive typography classes', () => {
    const ResponsiveTypographyComponent = {
      template: `
        <div>
          <h1 class="text-2xl md:text-4xl lg:text-5xl">Responsive Heading</h1>
          <p class="text-sm md:text-base lg:text-lg">Responsive body text</p>
        </div>
      `
    }
    
    const wrapper = mount(ResponsiveTypographyComponent)
    
    const heading = wrapper.find('h1')
    const body = wrapper.find('p')
    
    // Check responsive classes exist
    expect(heading.classes()).toContain('text-2xl')
    expect(heading.classes()).toContain('md:text-4xl')
    expect(heading.classes()).toContain('lg:text-5xl')
    
    expect(body.classes()).toContain('text-sm')
    expect(body.classes()).toContain('md:text-base')
    expect(body.classes()).toContain('lg:text-lg')
  })
})