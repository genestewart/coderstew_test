<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<!-- SEO Meta Tags -->
	<title>{{ $seoData['title'] ?? 'CoderStew LLC - Professional Programming & IT Services' }}</title>
	<meta name="description" content="{{ $seoData['description'] ?? 'Expert freelance programming and IT services.' }}">
	<meta name="keywords" content="{{ $seoData['keywords'] ?? 'freelance developer, programming services, web development, Laravel, Vue.js, IT consulting' }}">
	<meta name="author" content="{{ $seoData['author'] ?? 'CoderStew LLC' }}">
	<meta name="robots" content="{{ $seoData['robots'] ?? 'index, follow' }}">
	<link rel="canonical" href="{{ $seoData['url'] ?? request()->url() }}">
	
	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content="{{ $seoData['og:title'] ?? $seoData['title'] ?? 'CoderStew LLC' }}">
	<meta property="og:description" content="{{ $seoData['og:description'] ?? $seoData['description'] ?? 'Expert freelance programming and IT services.' }}">
	<meta property="og:image" content="{{ $seoData['og:image'] ?? asset('assets/CoderStew_Logo.svg') }}">
	<meta property="og:url" content="{{ $seoData['og:url'] ?? request()->url() }}">
	<meta property="og:type" content="{{ $seoData['og:type'] ?? 'website' }}">
	<meta property="og:site_name" content="CoderStew LLC">
	<meta property="og:locale" content="en_US">
	
	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="{{ $seoData['twitter:title'] ?? $seoData['title'] ?? 'CoderStew LLC' }}">
	<meta name="twitter:description" content="{{ $seoData['twitter:description'] ?? $seoData['description'] ?? 'Expert freelance programming and IT services.' }}">
	<meta name="twitter:image" content="{{ $seoData['twitter:image'] ?? asset('assets/CoderStew_Logo.svg') }}">
	
	<!-- Additional Meta Tags -->
	<meta name="theme-color" content="#FF9410">
	<meta name="msapplication-TileColor" content="#FF9410">
	
	<!-- Performance optimizations -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="dns-prefetch" href="//fonts.googleapis.com">
	<link rel="dns-prefetch" href="//fonts.gstatic.com">
	
	<!-- Fonts with display=swap for better performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
	
	<!-- Preload critical resources -->
	<link rel="preload" href="/assets/CoderStew_Logo.svg" as="image" type="image/svg+xml">
	
	<!-- Favicon and app icons -->
	<link rel="icon" type="image/x-icon" href="/favicon.ico">
	<link rel="apple-touch-icon" href="/assets/CoderStew_Logo.svg">
	
	<!-- Structured Data (JSON-LD) -->
	<script type="application/ld+json">
		{!! json_encode($structuredData ?? [], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
	</script>
	
	@vite(['resources/css/app.css', 'resources/js/app.js'])
	
	<!-- Service Worker Registration -->
	<script>
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', function() {
				navigator.serviceWorker.register('/sw.js')
					.then(function(registration) {
						console.log('ServiceWorker registration successful');
					})
					.catch(function(error) {
						console.log('ServiceWorker registration failed: ', error);
					});
			});
		}
	</script>
</head>
<body class="font-body text-dark-gray bg-white">
	<div id="app"></div>
</body>
</html>