<template>
	<div class="professional-background">
		<!-- Experience Highlight -->
		<div class="experience-highlight mb-8">
			<div class="years-experience inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full mb-4">
				<div class="text-center">
					<div class="text-2xl font-bold text-white">{{ yearsExperience }}</div>
					<div class="text-xs text-white/90">{{ yearsExperience === 1 ? 'Year' : 'Years' }}</div>
				</div>
			</div>
			<p class="text-gray-600 text-sm">of professional experience</p>
		</div>

		<!-- Professional Background Content -->
		<div class="background-content mb-8">
			<h3 class="text-2xl font-semibold text-gray-900 mb-4">
				Professional Background
			</h3>
			<p class="text-gray-700 leading-relaxed mb-6">
				{{ backgroundText }}
			</p>
		</div>

		<!-- Key Achievements -->
		<div v-if="achievements && achievements.length > 0" class="achievements-section">
			<h4 class="text-lg font-semibold text-gray-900 mb-4">
				Key Achievements
			</h4>
			<ul class="space-y-3">
				<li 
					v-for="(achievement, index) in achievements"
					:key="index"
					class="flex items-start space-x-3"
				>
					<div class="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
					<span class="text-gray-700 leading-relaxed">{{ achievement }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	yearsExperience: {
		type: Number,
		required: true
	},
	backgroundText: {
		type: String,
		required: true
	},
	achievements: {
		type: Array,
		default: () => []
	}
})
</script>