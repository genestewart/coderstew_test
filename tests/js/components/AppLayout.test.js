import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLayout from '@/components/layout/AppLayout.vue'
import AppHeader from '@/components/layout/AppHeader.vue'

describe('AppLayout.vue', () => {
  it('renders the main layout structure', () => {
    const wrapper = mount(AppLayout)
    
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
    expect(main.attributes('id')).toBe('app')
  })

  it('includes the AppHeader component', () => {
    const wrapper = mount(AppLayout)
    
    const header = wrapper.findComponent(AppHeader)
    expect(header.exists()).toBe(true)
  })

  it('has proper responsive container classes', () => {
    const wrapper = mount(AppLayout)
    
    const container = wrapper.find('.container')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('mx-auto')
  })

  it('applies mobile-first responsive design', () => {
    const wrapper = mount(AppLayout)
    
    const layoutContainer = wrapper.find('.min-h-screen')
    
    // Check for mobile-first responsive classes
    expect(layoutContainer.exists()).toBe(true)
    expect(layoutContainer.classes()).toContain('min-h-screen')
  })

  it('has proper semantic HTML structure', () => {
    const wrapper = mount(AppLayout)
    
    // Check for proper semantic elements
    const main = wrapper.find('main')
    const contentArea = wrapper.find('[role="main"]')
    
    expect(main.exists()).toBe(true)
    expect(contentArea.exists()).toBe(true)
  })

  it('provides slot for page content', () => {
    const TestComponent = {
      template: `
        <AppLayout>
          <div data-testid="slot-content">Test Content</div>
        </AppLayout>
      `,
      components: { AppLayout }
    }
    
    const wrapper = mount(TestComponent)
    
    const slotContent = wrapper.find('[data-testid="slot-content"]')
    expect(slotContent.exists()).toBe(true)
    expect(slotContent.text()).toBe('Test Content')
  })

  it('applies correct spacing and layout grid', () => {
    const wrapper = mount(AppLayout)
    
    const layoutGrid = wrapper.find('.layout-grid')
    expect(layoutGrid.exists()).toBe(true)
    
    // Check for responsive grid classes
    expect(layoutGrid.classes()).toContain('grid')
    expect(layoutGrid.classes()).toContain('grid-cols-1')
  })

  it('handles responsive breakpoints correctly', () => {
    const wrapper = mount(AppLayout)
    
    const contentArea = wrapper.find('.content-area')
    expect(contentArea.exists()).toBe(true)
    
    // Check for responsive padding and margins
    expect(contentArea.classes()).toContain('px-4')
    expect(contentArea.classes()).toContain('md:px-6')
    expect(contentArea.classes()).toContain('lg:px-8')
  })

  it('maintains proper accessibility structure', () => {
    const wrapper = mount(AppLayout)
    
    const main = wrapper.find('main')
    expect(main.attributes('role')).toBe('main')
    
    // Check for skip link support
    const skipLink = wrapper.find('a[href="#main-content"]')
    expect(skipLink.exists()).toBe(true)
  })
})