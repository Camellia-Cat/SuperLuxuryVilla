<script setup>
import { ref, onMounted, computed, Suspense } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { OrbitControls, GLTFModel } from '@tresjs/cientos';

const route = useRoute();
const router = useRouter();
const modelId = computed(() => route.params.id);

// 模型数据
const models = ref([
  // { id: 'antonius', name: 'Antonius', path: '/res/antonius/scene.gltf', description: '古典风格的装饰品，展现精湛的工艺和历史韵味。' },
  { id: 'basketball', name: 'Basketball', path: '/res/basketball/scene.gltf', description: '高精度篮球3D模型，适用于体育游戏和虚拟现实应用。' },
  { id: 'buddha', name: 'Buddha', path: '/res/buddha/scene.gltf', description: '精致的佛像模型，展现东方艺术的神秘与庄严。' },
  // { id: 'decoratedcup', name: 'Decorated Cup', path: '/res/decoratedcup/scene.gltf', description: '精美装饰的杯子，适合用于室内场景和产品展示。' },
  { id: 'kookpot', name: 'Kookpot', path: '/res/kookpot/scene.gltf', description: '精致的厨房用具模型，展现现代家居的实用与美观。' }
]);

// 获取当前模型
const currentModel = computed(() => {
  return models.value.find(model => model.id === modelId.value) || null;
});

// 返回列表页
const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="model-detail-view py-16 px-4 md:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- 返回按钮 -->
      <button 
        @click="goBack" 
        class="mb-6 flex items-center text-primary hover:text-primary/80 transition-colors"
      >
        <span class="mr-2">←</span> 返回列表
      </button>

      <div v-if="currentModel" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 3D模型展示 -->
        <div class="model-viewer rounded-lg overflow-hidden border border-border h-[500px]">
          <TresCanvas shadows alpha>
            <TresPerspectiveCamera :position="[0, 0, 0.5]" />
            <OrbitControls />
            <Suspense>
              <GLTFModel :path="currentModel.path" draco />
            </Suspense>
            <TresDirectionalLight :position="[-4, 8, 4]" :intensity="4" cast-shadow />
          </TresCanvas>
        </div>

        <!-- 模型详情 -->
        <div class="model-info">
          <h1 class="text-3xl font-bold mb-4">{{ currentModel.name }}</h1>
          <p class="text-foreground/70 mb-6">{{ currentModel.description }}</p>

          <div class="specs mb-8">
            <h2 class="text-xl font-semibold mb-3">模型规格</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="spec-item">
                <span class="block text-sm text-foreground/60">文件格式</span>
                <span class="font-medium">GLTF/GLB</span>
              </div>
              <div class="spec-item">
                <span class="block text-sm text-foreground/60">多边形数量</span>
                <span class="font-medium">约 10,000</span>
              </div>
              <div class="spec-item">
                <span class="block text-sm text-foreground/60">纹理</span>
                <span class="font-medium">4K PBR</span>
              </div>
              <div class="spec-item">
                <span class="block text-sm text-foreground/60">动画</span>
                <span class="font-medium">无</span>
              </div>
            </div>
          </div>

          <div class="actions">
            <button class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full md:w-auto">
              下载模型
            </button>
          </div>
        </div>
      </div>

      <!-- 模型不存在的提示 -->
      <div v-else class="text-center py-16">
        <h2 class="text-2xl font-bold mb-4">模型不存在</h2>
        <p class="text-foreground/70 mb-6">抱歉，您请求的模型不存在或已被移除。</p>
        <button 
          @click="goBack" 
          class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          返回列表
        </button>
      </div>

      <!-- 相关模型 -->
      <div v-if="currentModel" class="related-models mt-16">
        <h2 class="text-2xl font-bold mb-6">相关模型</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div 
            v-for="model in models.filter(m => m.id !== modelId)" 
            :key="model.id" 
            class="related-model-card cursor-pointer"
            @click="router.push({ name: 'model-detail', params: { id: model.id } })"
          >
            <div class="model-thumbnail h-40 bg-muted rounded-lg mb-3 overflow-hidden">
              <TresCanvas shadows alpha>
                <TresPerspectiveCamera :position="[0.2, 0.1, 0.1]" />
                <OrbitControls enableDamping={false} enableZoom={false} enablePan={false} />
                <Suspense>
                  <GLTFModel :path="model.path" draco />
                </Suspense>
                <TresDirectionalLight :position="[-4, 8, 4]" :intensity="4" cast-shadow />
              </TresCanvas>
            </div>
            <h3 class="font-medium">{{ model.name }}</h3>
            <p class="text-sm text-foreground/70 line-clamp-1">{{ model.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.model-info {
  @apply p-4;
}

.spec-item {
  @apply p-3 bg-muted rounded-md;
}

.actions {
  @apply flex flex-col md:flex-row gap-4;
}

.related-model-card {
  @apply bg-background rounded-lg border border-border p-4 transition-all
         hover:shadow-md hover:border-primary/50;
}
</style>
