<script setup>
// Import all section components
import HeroSection from '@/components/home/HeroSection.vue';
import ProjectsSection from '@/components/home/ProjectsSection.vue';
import SkillsSection from '@/components/home/SkillsSection.vue';
import ModelsSection from '@/components/home/ModelsSection.vue';
import ContributorsSection from '@/components/home/ContributorsSection.vue';
import ContactSection from '@/components/home/ContactSection.vue';
import FooterSection from '@/components/home/FooterSection.vue';
</script>

<template>
  <!-- 主内容区域 - 使用主题背景色 -->
  <main class="min-h-screen bg-background">
    <HeroSection />
    <ProjectsSection />
    <SkillsSection />
    <ModelsSection />
    <ContributorsSection />
    <ContactSection />
    <FooterSection />
  </main>
</template>

