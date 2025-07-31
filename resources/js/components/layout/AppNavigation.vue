<template>
	<nav aria-label="Main navigation">
		<!-- Desktop Navigation -->
		<ul class="desktop-menu hidden md:flex items-center space-x-6">
			<li>
				<router-link 
					to="/#services" 
					class="font-body text-dark-gray hover:text-primary-orange transition-colors duration-200"
				>
					Services
				</router-link>
			</li>
			<li>
				<router-link 
					to="/#about" 
					class="font-body text-dark-gray hover:text-primary-orange transition-colors duration-200"
				>
					About
				</router-link>
			</li>
			<li>
				<router-link 
					to="/#portfolio" 
					class="font-body text-dark-gray hover:text-primary-orange transition-colors duration-200"
				>
					Portfolio
				</router-link>
			</li>
			<li>
				<router-link 
					to="/contact" 
					class="font-body bg-primary-orange text-white px-4 py-2 rounded-md hover:bg-golden-yellow transition-colors duration-200"
				>
					Contact
				</router-link>
			</li>
		</ul>

		<!-- Mobile Hamburger Button -->
		<button
			@click.stop="toggleMobileMenu"
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
			class="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50"
		>
			<ul class="flex flex-col py-4">
				<li>
					<router-link 
						to="/#services" 
						@click="closeMobileMenu"
						class="font-body block px-6 py-3 text-dark-gray hover:text-primary-orange hover:bg-gray-50 transition-colors duration-200"
					>
						Services
					</router-link>
				</li>
				<li>
					<router-link 
						to="/#about" 
						@click="closeMobileMenu"
						class="font-body block px-6 py-3 text-dark-gray hover:text-primary-orange hover:bg-gray-50 transition-colors duration-200"
					>
						About
					</router-link>
				</li>
				<li>
					<router-link 
						to="/#portfolio" 
						@click="closeMobileMenu"
						class="font-body block px-6 py-3 text-dark-gray hover:text-primary-orange hover:bg-gray-50 transition-colors duration-200"
					>
						Portfolio
					</router-link>
				</li>
				<li class="px-6 py-3">
					<router-link 
						to="/contact" 
						@click="closeMobileMenu"
						class="font-body block w-full text-center bg-primary-orange text-white px-4 py-2 rounded-md hover:bg-golden-yellow transition-colors duration-200"
					>
						Contact
					</router-link>
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
	if (isMenuOpen.value && !event.target.closest('nav')) {
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