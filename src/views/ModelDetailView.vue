<script setup>
import { ref, onMounted, computed, Suspense } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, Download } from 'lucide-vue-next';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls, GLTFModel as TresGLTF, Grid as TresGrid } from '@tresjs/cientos';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const route = useRoute();
const router = useRouter();
const modelId = computed(() => route.params.id);
const isLoading = ref(false);
const downloadProgress = ref(0);

// 模型数据
const models = {
  // 'antonius': { name: 'Antonius', path: '/res/antonius/scene.gltf', directory: '/public/res/antonius' },
  'basketball': { name: 'Basketball', path: '/res/basketball/scene.gltf', directory: '/public/res/basketball' },
  'buddha': { name: 'Buddha', path: '/res/buddha/scene.gltf', directory: '/public/res/buddha' },
  // 'decoratedcup': { name: 'Decorated Cup', path: '/res/decoratedcup/scene.gltf', directory: '/public/res/decoratedcup' },
  'kookpot': { name: 'Kookpot', path: '/res/kookpot/scene.gltf', directory: '/public/res/kookpot' }
};

const currentModel = computed(() => {
  return models[modelId.value] || null;
});

// 返回首页
const goBack = () => {
  router.push('/');
};

// 下载模型
const downloadModel = async () => {
  if (!currentModel.value) return;

  isLoading.value = true;
  downloadProgress.value = 0;

  try {
    const zip = new JSZip();
    const modelFolder = zip.folder(currentModel.value.name);

    // 获取模型文件列表
    const modelFiles = await fetchModelFiles(currentModel.value.directory);

    // 添加文件到zip
    for (let i = 0; i < modelFiles.length; i++) {
      const file = modelFiles[i];
      const response = await fetch(file.path);
      const blob = await response.blob();
      modelFolder.file(file.name, blob);

      // 更新进度
      downloadProgress.value = Math.round((i + 1) / modelFiles.length * 100);
    }

    // 生成并下载zip文件
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${currentModel.value.name}.zip`);

    isLoading.value = false;
  } catch (error) {
    console.error('下载模型出错:', error);
    isLoading.value = false;
  }
};

// 模拟获取模型文件列表
const fetchModelFiles = async (directory) => {
  // 在实际应用中，这里应该是一个API调用来获取目录中的所有文件
  const files = [
    { name: 'scene.gltf', path: `${directory}/scene.gltf` },
    { name: 'scene.bin', path: `${directory}/scene.bin` }
  ];

  // 检查模型ID，为有贴图的模型添加贴图文件
  if (modelId.value === 'basketball' || modelId.value === 'decoratedcup') {
    // 这些模型有贴图文件夹
    files.push(
      { name: 'textures/texture_diffuse.png', path: `${directory}/textures/texture_diffuse.png` },
      { name: 'textures/texture_normal.png', path: `${directory}/textures/texture_normal.png` },
      { name: 'textures/texture_metallicRoughness.png', path: `${directory}/textures/texture_metallicRoughness.png` }
    );
  }

  return files;
};
</script>

<template>
  <div class="model-detail-view min-h-screen bg-background p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- 头部导航 -->
      <div class="flex items-center mb-6">
        <button @click="goBack" class="flex items-center text-foreground hover:text-primary transition-colors">
          <ArrowLeft class="w-5 h-5 mr-2" />
          <span>返回</span>
        </button>
      </div>

      <!-- 模型信息 -->
      <div v-if="currentModel" class="mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-2">{{ currentModel.name }}</h1>
        <p class="text-foreground/70">3D模型详情</p>
      </div>

      <!-- 模型查看器 -->
      <div v-if="currentModel" class="model-viewer-container bg-background border border-border rounded-lg overflow-hidden mb-6 relative">
        <!-- 关闭按钮 -->
        <div class="absolute top-2 right-2 z-10">
          <button @click="goBack" class="bg-background/80 hover:bg-background text-foreground rounded-full p-1 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <Suspense>
          <template #default>
            <TresCanvas>
              <TresGLTF 
                :path="currentModel?.path" 
                :scale="[1, 1, 1]" 
                :rotation="[0, Math.PI / 4, 0]" 
                :disable-textures="true"
                :material-props="{ map: null }" 
                :material-type="'MeshBasicMaterial'"
              />
              <TresGrid :cell-size="1" :cell-thickness="1" :cell-color="'#6e6e6e'" :section-size="2" :section-thickness="1" :section-color="'#9d4b4b'" :fade-distance="30" :fade-strength="1" />
              <OrbitControls />
            </TresCanvas>
          </template>
          <template #fallback>
            <div class="flex items-center justify-center h-full w-full bg-background">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </template>
        </Suspense>
      </div>

      <!-- 下载按钮 -->
      <div class="flex justify-center">
        <button 
          @click="downloadModel" 
          class="download-button flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors"
          :disabled="isLoading"
        >
          <Download v-if="!isLoading" class="w-5 h-5 mr-2" />
          <span v-if="!isLoading">下载模型</span>
          <span v-else>下载中... {{ downloadProgress }}%</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.model-viewer-container {
  height: 500px;
  width: 100%;
}

.download-button:disabled {
  @apply opacity-70 cursor-not-allowed;
}
</style>
