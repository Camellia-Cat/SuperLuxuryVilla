<script setup>
import { ref, onMounted, Suspense, shallowRef, unref, watch } from 'vue';
import { useRouter } from 'vue-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);
const router = useRouter();
// 3D模型数据
const models = ref([
  // { id: 'antonius', name: 'Antonius', path: '/res/antonius/scene.gltf', description: '古典风格的装饰品，展现精湛的工艺和历史韵味。' },
  { id: 'basketball', name: 'Basketball', path: '/res/basketball/scene.gltf', description: '高精度篮球3D模型，适用于体育游戏和虚拟现实应用。' },
  { id: 'buddha', name: 'Buddha', path: '/res/buddha/scene.gltf', description: '精致的佛像模型，展现东方艺术的神秘与庄严。' },
  // { id: 'decoratedcup', name: 'Decorated Cup', path: '/res/decoratedcup/scene.gltf', description: '精美装饰的杯子，适合用于室内场景和产品展示。' },
  { id: 'kookpot', name: 'Kookpot', path: '/res/kookpot/scene.gltf', description: '精致的厨房用具模型，展现现代家居的实用与美观。' }
]);

// 使用TresJS的useLoader钩子加载模型
// const { nodes } = await useGLTF('/res/kookpot/scene.gltf', { draco: true })

// 处理模型点击事件，导航到详情页
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

      <!-- Kookpot 3D模型展示 -->
      <div class="kookpot-model-container mb-8">
        <h3 class="text-xl font-semibold mb-4">Kookpot 3D模型</h3>
        <div class="model-viewer  rounded-lg overflow-hidden border border-border">
          <TresCanvas  shadows alpha>
            <TresPerspectiveCamera :position="[0.2, 0.1, 0.1]" />
            <OrbitControls />
            <Suspense>
              <GLTFModel path="/res/kookpot/scene.gltf" draco />
            </Suspense>
            <TresDirectionalLight :position="[-4, 8, 4]" :intensity="4" cast-shadow />
          </TresCanvas>
        </div>
        <div class="mt-4 flex justify-center">
          <button 
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            @click="handleModelClick('kookpot')"
          >
            查看详情
          </button>
        </div>
      </div>

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
              <TresCanvas shadows alpha>
                <TresPerspectiveCamera :position="[0.3, 0.5, 0.3]" />
                <OrbitControls enableDamping={false} enableZoom={false} enablePan={false} />
                <Suspense>
                  <GLTFModel :path="model.path" draco />
                </Suspense>
                <TresDirectionalLight :position="[-4, 8, 4]" :intensity="4" cast-shadow />
              </TresCanvas>
            </div>
            <h3 class="model-name">{{ model.name }}</h3>
            <p class="model-description">{{ model.description.substring(0, 30) }}...</p>
            <button 
              class="mt-2 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full"
              @click.stop="handleModelClick(model.id)"
            >
              查看详情
            </button>
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
  @apply w-full h-64 mb-4 rounded-md overflow-hidden;
}

.model-name {
  @apply text-lg font-medium text-foreground text-center;
}

.model-description {
  @apply text-sm text-foreground/70 text-center mb-2 line-clamp-2;
  height: 2.5rem;
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
