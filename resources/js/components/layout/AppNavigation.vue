<template>
	<nav aria-label="Main navigation">
		<!-- Desktop Navigation -->
		<ul class="desktop-menu hidden md:flex items-center space-x-6">
			<li>
				<a 
					href="#services" 
					class="text-dark-gray hover:text-primary-orange transition-colors duration-200"
				>
					Services
				</a>
			</li>
			<li>
				<a 
					href="#about" 
					class="text-dark-gray hover:text-primary-orange transition-colors duration-200"
				>
					About
				</a>
			</li>
			<li>
				<a 
					href="#contact" 
					class="bg-primary-orange text-white px-4 py-2 rounded-md hover:bg-golden-yellow transition-colors duration-200"
				>
					Contact
				</a>
			</li>
		</ul>

		<!-- Mobile Hamburger Button -->
		<button
			@click="toggleMobileMenu"
			:aria-expanded="isMenuOpen"
			aria-label="Toggle navigation menu"
			data-testid="hamburger-button"
			class="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors duration-200"
		>
			<Menu v-if="!isMenuOpen" class="h-6 w-6 text-dark-gray" />
			<X v-else class="h-6 w-6 text-dark-gray" />
		</button>

		<!-- Mobile Navigation Menu -->
		<div 
			v-show="isMenuOpen"
			data-testid="mobile-menu"
			:class="[
				'md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50',
				{ 'hidden': !isMenuOpen }
			]"
		>
			<ul class="flex flex-col py-4">
				<li>
					<a 
						href="#services" 
						@click="closeMobileMenu"
						class="block px-6 py-3 text-dark-gray hover:text-primary-orange hover:bg-gray-50 transition-colors duration-200"
					>
						Services
					</a>
				</li>
				<li>
					<a 
						href="#about" 
						@click="closeMobileMenu"
						class="block px-6 py-3 text-dark-gray hover:text-primary-orange hover:bg-gray-50 transition-colors duration-200"
					>
						About
					</a>
				</li>
				<li class="px-6 py-3">
					<a 
						href="#contact" 
						@click="closeMobileMenu"
						class="block w-full text-center bg-primary-orange text-white px-4 py-2 rounded-md hover:bg-golden-yellow transition-colors duration-200"
					>
						Contact
					</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const toggleMobileMenu = () => {
	isMenuOpen.value = !isMenuOpen.value
}

const closeMobileMenu = () => {
	isMenuOpen.value = false
}

const handleClickOutside = (event) => {
	// Check if the click is outside the navigation component
	if (event.target && event.target.closest && !event.target.closest('nav')) {
		closeMobileMenu()
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>