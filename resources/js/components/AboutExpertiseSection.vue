<template>
	<section class="py-16 px-4 bg-white">
		<div class="max-w-7xl mx-auto">
			<!-- Section Header -->
			<div class="section-header text-center mb-16">
				<h2 class="text-4xl font-bold text-gray-900 mb-4">
					About & Expertise
				</h2>
				<p class="section-intro text-xl text-gray-600 max-w-3xl mx-auto">
					Get to know the professional background, technical skills, and values that drive quality software development and reliable IT solutions.
				</p>
			</div>

			<!-- Main Content Layout -->
			<div class="about-layout grid grid-cols-1 lg:grid-cols-2 gap-12">
				<!-- Left Column: Professional Background -->
				<div class="left-column">
					<ProfessionalBackground
						:years-experience="professionalData.yearsExperience"
						:background-text="professionalData.backgroundText"
						:achievements="professionalData.achievements"
					/>
				</div>

				<!-- Right Column: Skills and Values -->
				<div class="right-column space-y-12">
					<TechnicalSkills :skills="technicalSkillsData" />
					<ProfessionalValues :values="professionalValuesData" />
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import ProfessionalBackground from './about/ProfessionalBackground.vue'
import TechnicalSkills from './about/TechnicalSkills.vue'
import ProfessionalValues from './about/ProfessionalValues.vue'

// Professional Background Data
const professionalData = ref({
	yearsExperience: 8,
	backgroundText: 'Experienced full-stack developer and IT professional with a passion for creating robust, scalable solutions. Specializing in web applications, system architecture, and providing comprehensive technical support to businesses of all sizes.',
	achievements: [
		'Successfully delivered 50+ client projects across various industries',
		'Architected and implemented enterprise-level applications',
		'Certified in multiple programming languages and frameworks',
		'Maintained 99.9% uptime for critical business systems',
		'Led technical teams and mentored junior developers'
	]
})

// Technical Skills Data
const technicalSkillsData = ref([
	// Programming Languages
	{ name: 'PHP', level: 95, category: 'Programming Languages' },
	{ name: 'JavaScript', level: 90, category: 'Programming Languages' },
	{ name: 'Python', level: 80, category: 'Programming Languages' },
	{ name: 'HTML/CSS', level: 95, category: 'Programming Languages' },
	
	// Frameworks & Libraries
	{ name: 'Laravel', level: 95, category: 'Frameworks' },
	{ name: 'Vue.js', level: 90, category: 'Frameworks' },
	{ name: 'React', level: 80, category: 'Frameworks' },
	{ name: 'Node.js', level: 75, category: 'Frameworks' },
	
	// Infrastructure & Tools
	{ name: 'Linux Administration', level: 85, category: 'Infrastructure' },
	{ name: 'Docker', level: 80, category: 'Infrastructure' },
	{ name: 'Git Version Control', level: 90, category: 'Infrastructure' },
	{ name: 'Cloud Platforms', level: 75, category: 'Infrastructure' },
	
	// Databases
	{ name: 'MySQL', level: 90, category: 'Databases' },
	{ name: 'PostgreSQL', level: 80, category: 'Databases' },
	{ name: 'SQLite', level: 85, category: 'Databases' },
	{ name: 'Redis', level: 70, category: 'Databases' }
])

// Professional Values Data
const professionalValuesData = ref([
	{
		title: 'Quality-Focused Development',
		description: 'I prioritize writing clean, maintainable code that stands the test of time and scales with your business needs.',
		icon: 'Award'
	},
	{
		title: 'Clear Communication',
		description: 'Transparent, jargon-free communication throughout every project phase, keeping you informed and involved.',
		icon: 'MessageCircle'
	},
	{
		title: 'Continuous Learning',
		description: 'Staying current with the latest technologies and best practices to deliver modern, efficient solutions.',
		icon: 'BookOpen'
	},
	{
		title: 'Reliable Delivery',
		description: 'Meeting deadlines and delivering projects on time, every time, with comprehensive testing and documentation.',
		icon: 'Clock'
	}
])
</script>