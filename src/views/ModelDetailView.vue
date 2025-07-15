<script setup>
import { ref, onMounted, computed, Suspense } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { OrbitControls, GLTFModel } from '@tresjs/cientos';
import {TresCanvas} from "@tresjs/core";

const route = useRoute();
const router = useRouter();
const modelId = computed(() => route.params.id);

// 模型数据
const models = ref([
  {
    id: 'su7',
    name: '小米Su7',
    path: '/res/su7/scene.gltf',
    description: '小米su7',
    cameraPosition: [7, 6, 4],
    detailCameraPosition: [3, 1.5, 2]
  },
  {
    id: 'basketball',
    name: '坤哥の篮球',
    path: '/res/basketball/scene.gltf',
    description: '高精度篮球3D模型，适用于体育游戏和虚拟现实应用。',
    cameraPosition: [0.3, 0.3, 0.3], // 小型物体需要较近距离
    detailCameraPosition: [0.5, 0.5, 0.5]
  },
  {
    id: 'kookpot',
    name: '盆',
    path: '/res/kookpot/scene.gltf',
    description: '展现古代家居的实用与美观。',
    cameraPosition: [0.2, 0.1, 0.1], // 小型厨具保持原有距离
    detailCameraPosition: [0.3, 0.2, 0.2]
  },
  {
    id: 'chineseRose',
    name: '牡丹',
    path: '/res/chineseRose/scene.gltf',
    description: '牡丹，是一种植物，是一种花朵，是一种花卉。',
    cameraPosition: [4, 3, 6], // 小型花瓶
    detailCameraPosition: [0, 0.1, 0]
  },
  {
    id: 'chineseVintageIronCup',
    name: '奋斗青年杯',
    path: '/res/chineseVintageIronCup/scene.gltf',
    description: '共产主义好',
    cameraPosition: [0.3, 0.2, 0.3], // 小型茶杯
    detailCameraPosition: [0.4, 0.3, 0.4]
  },
  {
    id: 'thunderclapTemple',
    name: '黑神话：悟空-雷音寺',
    path: '/res/thunderclapTemple/scene.gltf',
    description: '雷音寺，是一座古典建筑，是一座古典建筑，是一座古典建筑。',
    cameraPosition: [40, 39, 40], // 大型建筑需要很远距离
    detailCameraPosition: [4, 3, 4]
  },
  {
    id: 'kidRoom',
    name: '梦想中的房子',
    path: '/res/kidRoom/scene.gltf',
    description: '舒适卧室的室内环境，充满童趣和想象力。',
    cameraPosition: [5, 3, 6],
    detailCameraPosition: [3.5, 2.5, 3.5]
  }
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
            <TresPerspectiveCamera :position="currentModel.detailCameraPosition || [0, 0, 0.5]" />
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
                <TresPerspectiveCamera :position="model.cameraPosition || [0.2, 0.1, 0.1]" />
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
