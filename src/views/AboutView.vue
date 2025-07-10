<script setup>
import { Book, Code, Palette } from 'lucide-vue-next';
</script>

<template>
  <main class="min-h-screen bg-background py-16 px-4 md:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 - 使用主题前景色 -->
      <h1 class="text-3xl md:text-4xl font-bold text-foreground mb-6">关于超级豪华别墅</h1>

      <!-- 介绍卡片 - 使用主题卡片背景 -->
      <div class="bg-card rounded-lg border border-border p-6 shadow-md mb-8">
        <p class="text-card-foreground text-lg mb-4">
          这是一个使用 Vue 3 和 Vite 创建的项目，展示了现代前端开发实践和主题系统的应用。
        </p>
        <p class="text-card-foreground text-lg">
          本项目采用了完整的主题系统，支持多种颜色主题和深色/浅色模式切换，为用户提供个性化的视觉体验。
        </p>
      </div>

      <!-- 特性列表 - 使用主题强调色背景 -->
      <div class="bg-accent rounded-lg border border-border p-6 shadow-md mb-8">
        <h2 class="text-2xl font-bold text-accent-foreground mb-4">项目特性</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 特性卡片 - 使用主题背景色 -->
          <div class="bg-background rounded-lg border border-border p-4 flex flex-col items-center text-center">
            <Code class="w-8 h-8 text-primary mb-2" />
            <h3 class="text-lg font-medium text-foreground mb-2">现代技术栈</h3>
            <p class="text-muted-foreground">
              Vue 3 组合式 API、Vue Router、Vite 构建工具
            </p>
          </div>

          <div class="bg-background rounded-lg border border-border p-4 flex flex-col items-center text-center">
            <Palette class="w-8 h-8 text-primary mb-2" />
            <h3 class="text-lg font-medium text-foreground mb-2">主题系统</h3>
            <p class="text-muted-foreground">
              完整的主题切换功能，支持多种颜色方案和深色模式
            </p>
          </div>

          <div class="bg-background rounded-lg border border-border p-4 flex flex-col items-center text-center">
            <Book class="w-8 h-8 text-primary mb-2" />
            <h3 class="text-lg font-medium text-foreground mb-2">最佳实践</h3>
            <p class="text-muted-foreground">
              组件化设计、响应式布局、可访问性优化
            </p>
          </div>
        </div>
      </div>

      <!-- 技术说明 - 使用主题次要背景色 -->
      <div class="bg-secondary rounded-lg border border-border p-6 shadow-md">
        <h2 class="text-2xl font-bold text-secondary-foreground mb-4">技术说明</h2>
        <p class="text-secondary-foreground/80 mb-4">
          本项目使用了以下技术和工具：
        </p>
        <ul class="list-disc pl-6 space-y-2 text-secondary-foreground/80">
          <li>Vue 3 组合式 API</li>
          <li>Vue Router 进行路由管理</li>
          <li>Vite 用于快速开发和构建</li>
          <li>Tailwind CSS 进行样式设计</li>
          <li>Lucide 图标库</li>
          <li>CSS 变量实现的主题系统</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* 
 * 这个页面展示了如何在不同的组件中一致地应用主题变量
 * 所有颜色都使用主题变量，确保在切换主题时UI能够自适应变化
 */
</style>
