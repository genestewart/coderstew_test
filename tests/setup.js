// Test setup file for global mocks and configuration

import { config } from '@vue/test-utils'

// Mock analytics service for all tests
const mockAnalytics = {
  init: vi.fn(),
  trackPageView: vi.fn(),
  trackEvent: vi.fn(),
  trackContactFormSubmission: vi.fn(),
  trackContactFormStart: vi.fn(),
  trackNavigation: vi.fn(),
  trackCTAClick: vi.fn(),
  trackServiceInterest: vi.fn(),
  trackScrollDepth: vi.fn(),
  trackDownload: vi.fn(),
  trackOutboundClick: vi.fn(),
  setUserProperties: vi.fn(),
  trackConversion: vi.fn(),
}

// Configure global mocks for Vue components
config.global = {
  ...config.global,
  provide: {
    analytics: mockAnalytics,
  },
  stubs: {
    'router-link': {
      template: '<a><slot /></a>',
      props: ['to'],
    },
    'router-view': {
      template: '<div><slot /></div>',
    },
  },
  mocks: {
    $analytics: mockAnalytics,
  },
}

// Export mock for individual test use
export { mockAnalytics }