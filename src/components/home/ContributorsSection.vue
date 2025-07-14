<script setup>
import { ref, onMounted } from 'vue';
import { Github } from 'lucide-vue-next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaQing from '/src/assets/img/avatar/MaQing.jpg';
import YangChunXing from '/src/assets/img/avatar/YangChunXing.jpg';
import GuoYongZhi from '/src/assets/img/avatar/GuoYongZhi.jpg';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 贡献者数据
const contributors = ref([
  {
    name: '马庆',
    role: '前端开发、UI/UX设计、交互算法设计',
    avatar: `${MaQing}`,
    github: 'https://github.com/MaQing377025773/SuperLuxuryVilla'
  },
  {
    name: '杨春兴',
    role: '后端开发、数据库优化、API开发',
    avatar: `${YangChunXing}`,
    github: 'https://github.com/MaQing377025773/SuperLuxuryVilla'
  },
  {
    name: '郭永智',
    role: '后端开发、产品设计、后台系统开发',
    avatar: `${GuoYongZhi}`,
    github: 'https://github.com/MaQing377025773/SuperLuxuryVilla'
  }
]);

// GSAP animations
onMounted(() => {
  // 贡献者部分动画
  gsap.from('.contributor-card', {
    scrollTrigger: {
      trigger: '.contributors-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.15,
    ease: 'power3.out'
  });
});
</script>

<template>
  <!-- 贡献者英雄榜 -->
  <section class="contributors-section py-16 px-4 md:px-8 bg-accent">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title text-accent-foreground">贡献者😎</h2>
      <p class="section-description text-accent-foreground/80">
        排名不分先后，欢迎大家加入！
      </p>

      <!-- 贡献者卡片网格 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <div 
          v-for="(contributor, index) in contributors" 
          :key="index" 
          class="contributor-card bg-background rounded-lg p-6 text-center shadow-sm border border-border"
        >
          <img 
            :src="contributor.avatar" 
            :alt="contributor.name" 
            class="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 class="text-lg font-bold text-foreground mb-1">{{ contributor.name }}</h3>
          <p class="text-muted-foreground mb-3">{{ contributor.role }}</p>
          <a :href="contributor.github" target="_blank" class="inline-flex items-center text-primary hover:underline">
            <Github class="w-4 h-4 mr-1" />
            GitHub
          </a>
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
.contributor-card {
  @apply bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow;
}
</style>