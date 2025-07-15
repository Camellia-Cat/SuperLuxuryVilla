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
/*
* 1.position:位置
* 2.rotation:旋转
* 3.scale:缩放
* */
const models = ref([
  { 
    id: 'su7', 
    name: '小米Su7',
    path: '/res/su7/scene.gltf', 
    description: '小米su7',
    cameraPosition: [6, 3, 4],
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
            <TresPerspectiveCamera :position="models.find(m => m.id === 'su7')?.cameraPosition || [6, 3, 4]" />
            <OrbitControls />
            <Suspense>
              <GLTFModel path="/res/su7/scene.gltf" draco />
            </Suspense>
            <TresDirectionalLight :position="[6, 3, 4]" :intensity="4" cast-shadow />
          </TresCanvas>
        </div>
        <div class="mt-4 flex justify-center">
          <button 
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            @click="handleModelClick('su7')"
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
                <TresPerspectiveCamera :position="model.cameraPosition || [0.3, 0.5, 0.3]" />
                <OrbitControls enableDamping={false} enableZoom={false} enablePan={false} />
                <Suspense>
                  <GLTFModel :path="model.path" draco :rotation-y="1"/>
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
