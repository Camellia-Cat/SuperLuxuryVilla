<script setup>
import { ref, onMounted, Suspense } from 'vue';
import { useRouter } from 'vue-router';
import { Box } from 'lucide-vue-next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { OrbitControls, GLTFModel as TresGLTF } from '@tresjs/cientos';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

// 3D模型数据
const models = ref([
  // { id: 'antonius', name: 'Antonius', path: '/res/antonius/scene.gltf' },
  { id: 'basketball', name: 'Basketball', path: '/res/basketball/scene.gltf' },
  { id: 'buddha', name: 'Buddha', path: '/res/buddha/scene.gltf' },
  // { id: 'decoratedcup', name: 'Decorated Cup', path: '/res/decoratedcup/scene.gltf' },
  { id: 'kookpot', name: 'Kookpot', path: '/res/kookpot/scene.gltf' }
]);

// 处理模型点击
const handleModelClick = (modelId) => {
  router.push({ name: 'model-detail', params: { id: modelId } });
};

// GSAP animations
onMounted(() => {
  // 3D模型部分动画
  gsap.from('.models-section .section-title, .models-section .section-description, .models-carousel', {
    scrollTrigger: {
      trigger: '.models-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
  });
});
</script>

<template>
  <!-- 3D模型展示区域 -->
  <section class="models-section py-16 px-4 md:px-8">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title">3D 模型展示</h2>
      <p class="section-description">浏览我们的3D模型集合，点击查看详情并下载</p>

      <!-- 3D模型横向滑动列表 -->
      <div class="models-carousel overflow-x-auto py-4">
        <div class="flex space-x-6">
          <div 
            v-for="model in models" 
            :key="model.id" 
            class="model-card cursor-pointer"
            @click="handleModelClick(model.id)"
          >
            <div class="model-viewer">
              <Suspense>
                <template #default>
                  <TresCanvas :window-size="false" alpha>
                    <TresGLTF 
                      :path="model.path" 
                      :scale="[1, 1, 1]" 
                      :rotation="[0, Math.PI / 4, 0]" 
                      :disable-textures="true"
                      :material-props="{ map: null }" 
                      :material-type="'MeshBasicMaterial'"
                    />
                    <OrbitControls 
                      :enable-zoom="false" 
                      :enable-pan="false"
                      :auto-rotate="true"
                      :auto-rotate-speed="1"
                    />
                  </TresCanvas>
                </template>
                <template #fallback>
                  <div class="flex items-center justify-center h-full w-full bg-background">
                    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                </template>
              </Suspense>
            </div>
            <h3 class="model-name">{{ model.name }}</h3>
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

/* 模型卡片样式 */
.model-card {
  @apply flex flex-col items-center bg-background rounded-lg border border-border 
         shadow-sm transition-all hover:shadow-md hover:border-primary/50 p-4;
  min-width: 250px;
  width: 250px;
}

.model-viewer {
  @apply w-full h-48 mb-4 rounded-md overflow-hidden;
}

.model-name {
  @apply text-lg font-medium text-foreground text-center;
}

/* 滚动条样式 */
.models-carousel::-webkit-scrollbar {
  @apply h-2;
}

.models-carousel::-webkit-scrollbar-track {
  @apply bg-muted rounded-full;
}

.models-carousel::-webkit-scrollbar-thumb {
  @apply bg-primary/50 rounded-full;
}

.models-carousel::-webkit-scrollbar-thumb:hover {
  @apply bg-primary;
}
</style>
