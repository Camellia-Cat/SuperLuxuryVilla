<script setup>
import { ref, onMounted } from 'vue';
import { Star, Heart } from 'lucide-vue-next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import model3D from '/src/assets/img/projectImg/Tmodel.png';
import bigData from '/src/assets/img/projectImg/bigData.png';
import projectXM from '/src/assets/img/projectImg/project.png';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// Projects data
const projects = ref([
  {
    id: 1,
    title: '基于WebGL的3D模型展示器',
    description: '一个基于WebGL的3D模型展示器，支持3D模型的加载、渲染、动画、交互等功能',
    rating: 4.9,
    image: `${model3D}`
  },
  {
    id: 2,
    title: '基于WebGL的工业数字孪生化生产系统',
    description: '基于WebGL的工业数字孪生化生产系统，支持生产线、工艺、设备、生产数据等功能',
    rating: 4.7,
    image: `${bigData}`
  },
  {
    id: 3,
    title: 'Vue3 + TypeScript + Vite2 + TailwindCSS + VitePress2 项目模板',
    description: 'Vue3 + TypeScript + Vite2 + TailwindCSS + VitePress2 项目模板，用于快速搭建 Vue3 + TypeScript + Vite2 + TailwindCSS + VitePress2 项目',
    rating: 4.5,
    image: `${projectXM}`
  }
]);

// GSAP animations
onMounted(() => {
  // Projects 部分滚动动画
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.projects-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
  });
});
</script>

<template>
  <!-- 项目展示区域 -->
  <section class="projects-section py-16 px-4 md:px-8">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title">一些有趣的项目🥳</h2>
      <p class="section-description">
        所展示项目均为个人/团队开源项目，你可以在下方浏览并进入查看和下载它们😎
      </p>
      <!-- 项目卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div 
          v-for="project in projects" 
          :key="project.id" 
          class="project-card"
        >
          <div class="relative h-48 rounded-t-lg overflow-hidden">
            <img 
              :src="project.image" 
              :alt="project.title" 
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-card-foreground mb-2 line-clamp-1">{{ project.title }}</h3>
            <p class="text-muted-foreground mb-4 line-clamp-2">{{ project.description }}</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <Star class="w-5 h-5 text-primary fill-primary" />
                <span class="ml-1 text-card-foreground font-medium">{{ project.rating }}</span>
              </div>
              <button class="icon-btn">
                <Heart class="w-5 h-5" />
              </button>
            </div>
          </div>
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

/* 按钮样式 */
.icon-btn {
  @apply p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors;
}

/* 卡片样式 */
.project-card {
  @apply bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow;
}
</style>