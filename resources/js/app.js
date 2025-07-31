import './bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import analytics from './services/analytics';

const app = createApp(App);

// Make analytics available globally
app.config.globalProperties.$analytics = analytics;
app.provide('analytics', analytics);

app.use(router);

// Track router navigation
router.afterEach((to, from) => {
    // Track page views after navigation
    setTimeout(() => {
        analytics.trackPageView(to.path, to.meta?.title || document.title);
    }, 100);
});

app.mount('#app');
