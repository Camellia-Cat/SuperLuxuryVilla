<script setup>
import { onMounted } from 'vue';
import { Briefcase, ArrowRight } from 'lucide-vue-next';
import gsap from 'gsap';

// GSAP animations
onMounted(() => {
  // 贡献榜单部分入口动画
  gsap.from('.hero-content', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
  });
});
</script>

<template>
  <!-- 英雄区域 - 使用主题强调色作为背景 -->
  <section class="hero-section bg-accent p-8 md:p-16 rounded-b-3xl shadow-lg">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl md:text-6xl font-bold text-accent-foreground mb-4 hero-content">
        MQ空间欢迎你🎉
      </h1>
      <p class="text-xl md:text-2xl text-accent-foreground/80 max-w-2xl mb-8 hero-content">
        欢迎来到我的个人空间，这里展示我的项目、技能和最新动态
      </p>
      <div class="flex flex-wrap gap-4 hero-content">
        <button class="btn-primary">
          查看项目
          <Briefcase class="w-4 h-4 ml-2" />
        </button>
        <button class="btn-secondary">
          联系我
          <ArrowRight class="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 按钮样式 */
.btn-primary {
  @apply flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground 
         rounded-lg font-medium shadow-sm hover:opacity-90 transition-all;
}

.btn-secondary {
  @apply flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground 
         rounded-lg font-medium shadow-sm hover:bg-secondary/80 transition-all;
}
</style>