// Google Analytics 4 (GA4) integration for CoderStew LLC

class Analytics {
    constructor() {
        this.gtmId = 'G-XXXXXXXXXX' // To be replaced with actual GA4 Measurement ID
        this.isInitialized = false
        this.isDevelopment = import.meta.env.DEV
    }

    /**
     * Initialize Google Analytics
     */
    init() {
        if (this.isInitialized || this.isDevelopment) {
            console.log('Analytics: Skipping initialization (dev mode or already initialized)')
            return
        }

        try {
            // Load gtag script
            const script = document.createElement('script')
            script.async = true
            script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gtmId}`
            document.head.appendChild(script)

            // Initialize gtag
            window.dataLayer = window.dataLayer || []
            function gtag() {
                dataLayer.push(arguments)
            }
            window.gtag = gtag

            gtag('js', new Date())
            gtag('config', this.gtmId, {
                // Enhanced ecommerce and privacy settings
                anonymize_ip: true,
                allow_google_signals: false,
                cookie_expires: 63072000, // 2 years in seconds
                cookie_flags: 'SameSite=None;Secure',
            })

            this.isInitialized = true
            console.log('Analytics: Initialized successfully')
        } catch (error) {
            console.error('Analytics: Initialization failed', error)
        }
    }

    /**
     * Track page views
     */
    trackPageView(pagePath, pageTitle = null) {
        if (!this.isInitialized || this.isDevelopment) return

        try {
            gtag('event', 'page_view', {
                page_path: pagePath,
                page_title: pageTitle || document.title,
                page_location: window.location.href
            })
            console.log('Analytics: Page view tracked', pagePath)
        } catch (error) {
            console.error('Analytics: Page view tracking failed', error)
        }
    }

    /**
     * Track custom events
     */
    trackEvent(eventName, parameters = {}) {
        if (!this.isInitialized || this.isDevelopment) {
            console.log('Analytics: Event would be tracked', eventName, parameters)
            return
        }

        try {
            gtag('event', eventName, parameters)
            console.log('Analytics: Event tracked', eventName, parameters)
        } catch (error) {
            console.error('Analytics: Event tracking failed', error)
        }
    }

    /**
     * Track contact form submissions
     */
    trackContactFormSubmission(projectType, source = 'contact_form') {
        this.trackEvent('contact_form_submit', {
            event_category: 'engagement',
            event_label: projectType,
            source: source,
            value: 1
        })
    }

    /**
     * Track contact form starts (when user focuses first field)
     */
    trackContactFormStart() {
        this.trackEvent('contact_form_start', {
            event_category: 'engagement',
            event_label: 'form_interaction'
        })
    }

    /**
     * Track navigation clicks
     */
    trackNavigation(destination, source = 'main_nav') {
        this.trackEvent('navigation_click', {
            event_category: 'navigation',
            event_label: destination,
            source: source
        })
    }

    /**
     * Track CTA button clicks
     */
    trackCTAClick(buttonText, location) {
        this.trackEvent('cta_click', {
            event_category: 'engagement',
            event_label: buttonText,
            location: location
        })
    }

    /**
     * Track service interest
     */
    trackServiceInterest(serviceName, action = 'view') {
        this.trackEvent('service_interest', {
            event_category: 'services',
            event_label: serviceName,
            action: action
        })
    }

    /**
     * Track scroll depth
     */
    trackScrollDepth(percentage) {
        if (percentage % 25 === 0) { // Track at 25%, 50%, 75%, 100%
            this.trackEvent('scroll_depth', {
                event_category: 'engagement',
                event_label: `${percentage}%`,
                value: percentage
            })
        }
    }

    /**
     * Track file downloads
     */
    trackDownload(fileName, fileType) {
        this.trackEvent('file_download', {
            event_category: 'downloads',
            event_label: fileName,
            file_type: fileType
        })
    }

    /**
     * Track outbound link clicks
     */
    trackOutboundClick(url, linkText) {
        this.trackEvent('outbound_click', {
            event_category: 'outbound',
            event_label: url,
            link_text: linkText
        })
    }

    /**
     * Set user properties (for better audience segmentation)
     */
    setUserProperties(properties) {
        if (!this.isInitialized || this.isDevelopment) return

        try {
            gtag('config', this.gtmId, {
                custom_map: properties
            })
        } catch (error) {
            console.error('Analytics: User properties setting failed', error)
        }
    }

    /**
     * Track conversion events
     */
    trackConversion(conversionName, value = 1) {
        this.trackEvent('conversion', {
            event_category: 'conversions',
            event_label: conversionName,
            value: value
        })
    }
}

// Create and export a singleton instance
const analytics = new Analytics()

export default analytics

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
    // Initialize after a short delay to ensure DOM is ready
    setTimeout(() => analytics.init(), 100)
}