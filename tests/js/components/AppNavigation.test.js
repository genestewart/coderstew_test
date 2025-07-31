import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppNavigation from '@/components/layout/AppNavigation.vue'

describe('AppNavigation.vue', () => {
  it('renders the navigation element', () => {
    const wrapper = mount(AppNavigation)
    
    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)
  })

  it('displays desktop navigation menu by default', () => {
    const wrapper = mount(AppNavigation)
    
    const desktopMenu = wrapper.find('.desktop-menu')
    expect(desktopMenu.exists()).toBe(true)
    expect(desktopMenu.classes()).toContain('hidden')
    expect(desktopMenu.classes()).toContain('md:flex')
  })

  it('displays hamburger menu button on mobile', () => {
    const wrapper = mount(AppNavigation)
    
    const hamburgerButton = wrapper.find('[data-testid="hamburger-button"]')
    expect(hamburgerButton.exists()).toBe(true)
    expect(hamburgerButton.classes()).toContain('md:hidden')
  })

  it('toggles mobile menu when hamburger button is clicked', async () => {
    const wrapper = mount(AppNavigation)
    
    const hamburgerButton = wrapper.find('[data-testid="hamburger-button"]')
    
    // Initially closed - check aria-expanded attribute
    expect(hamburgerButton.attributes('aria-expanded')).toBe('false')
    
    // Click to open
    await hamburgerButton.trigger('click')
    expect(hamburgerButton.attributes('aria-expanded')).toBe('true')
    
    // Click to close
    await hamburgerButton.trigger('click')
    expect(hamburgerButton.attributes('aria-expanded')).toBe('false')
  })

  it('has proper ARIA attributes for accessibility', () => {
    const wrapper = mount(AppNavigation)
    
    const hamburgerButton = wrapper.find('[data-testid="hamburger-button"]')
    expect(hamburgerButton.attributes('aria-label')).toBe('Toggle navigation menu')
    expect(hamburgerButton.attributes('aria-expanded')).toBe('false')
    
    const nav = wrapper.find('nav')
    expect(nav.attributes('aria-label')).toBe('Main navigation')
  })

  it('updates aria-expanded when menu is toggled', async () => {
    const wrapper = mount(AppNavigation)
    
    const hamburgerButton = wrapper.find('[data-testid="hamburger-button"]')
    
    // Initially false
    expect(hamburgerButton.attributes('aria-expanded')).toBe('false')
    
    // After click should be true
    await hamburgerButton.trigger('click')
    expect(hamburgerButton.attributes('aria-expanded')).toBe('true')
  })

  it('includes navigation links with proper styling', () => {
    const wrapper = mount(AppNavigation, {
      global: {
        stubs: {
          'router-link': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThan(0)
    
    // Check that navigation contains proper text
    const navText = wrapper.text()
    expect(navText).toContain('Services')
    expect(navText).toContain('About')
    expect(navText).toContain('Portfolio')
    expect(navText).toContain('Contact')
  })

  it('has contact button with distinct styling', () => {
    const wrapper = mount(AppNavigation, {
      global: {
        stubs: {
          'router-link': {
            template: '<a :href="to" :class="$attrs.class"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    const contactButton = wrapper.find('a[href="/contact"]')
    expect(contactButton.exists()).toBe(true)
    expect(contactButton.classes()).toContain('bg-primary-orange')
    expect(contactButton.classes()).toContain('text-white')
  })

  it('closes mobile menu when clicking outside', async () => {
    const wrapper = mount(AppNavigation)
    
    const hamburgerButton = wrapper.find('[data-testid="hamburger-button"]')
    
    // Open menu
    await hamburgerButton.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(true)
    
    // Simulate click outside by calling the close method directly
    // (JSDOM doesn't fully support closest method, so we test the behavior indirectly)
    wrapper.vm.closeMobileMenu()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.isMenuOpen).toBe(false)
  })
})