<script setup>
import { ref, onMounted } from 'vue';
import { Code, Cpu, Laptop, Globe, Layers, Github } from 'lucide-vue-next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 技能数据
const skills = ref([
  { icon: Code, name: '前端开发' },
  { icon: Cpu, name: '后端开发' },
  { icon: Laptop, name: 'UI/UX设计' },
  { icon: Globe, name: 'Web应用' },
  { icon: Layers, name: '数据库' },
  { icon: Github, name: '版本控制' }
]);

// GSAP animations
onMounted(() => {
  // 技能部分滚动动画
  gsap.from('.skill-card', {
    scrollTrigger: {
      trigger: '.skills-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.6,
    scale: 0.8,
    opacity: 0,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  });
});
</script>

<template>
  <!-- 技能区域 - 使用主题次要背景色 -->
  <section class="skills-section py-16 px-4 md:px-8 bg-secondary">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title text-secondary-foreground">偏好技术</h2>
      <p class="section-description text-secondary-foreground/80">
        掌握和理解这些技术，会有用！
      </p>

      <!-- 技能网格 -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-8">
        <div 
          v-for="(skill, index) in skills" 
          :key="index" 
          class="skill-card"
        >
          <component 
            :is="skill.icon" 
            class="w-8 h-8 text-primary mb-2"
          />
          <h3 class="text-secondary-foreground font-medium">{{ skill.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 标题样式 */
.section-title {
  @apply text-3xl font-bold text-foreground mb-2;
}
.section-description {
  @apply text-lg text-foreground/70 max-w-2xl mb-6;
}

/* 卡片样式 */
.skill-card {
  @apply flex flex-col items-center justify-center p-6 bg-background rounded-lg 
         border border-border text-center shadow-sm;
}
</style>