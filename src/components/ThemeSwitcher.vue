<template>
  <div class="theme-switcher-container">
    <!-- 主题切换按钮 -->
    <button 
      @click="togglePanel"
      class="theme-toggle-btn flex items-center justify-center rounded-full w-10 h-10 bg-primary text-primary-foreground shadow-md hover:opacity-90 transition-all"
      :class="{ 'rotate-45': isPanelOpen }"
      :aria-label="isPanelOpen ? '关闭主题面板' : '打开主题面板'"
    >
      <Paintbrush class="w-5 h-5" />
    </button>

    <!-- 主题面板 -->
    <Transition name="fade">
      <div 
        v-if="isPanelOpen" 
        class="theme-panel p-5 rounded-lg border border-border bg-card shadow-lg mt-2 absolute z-50 w-72"
        :class="panelPosition"
      >
        <div class="flex justify-between items-center mb-5">
          <h2 class="text-xl font-bold text-card-foreground">{{ title }}</h2>
          <button 
            @click="togglePanel" 
            class="p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="关闭面板"
          >
            <X class="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div v-if="showLightThemes" class="mb-6">
          <h3 class="text-lg font-semibold mb-3 text-card-foreground">浅色主题</h3>
          <div class="grid grid-cols-5 gap-3">
            <div 
              v-for="theme in lightThemes" 
              :key="theme.value"
              @click="applyTheme(theme.value)" 
              class="theme-color-block cursor-pointer flex flex-col items-center"
            >
              <div 
                class="w-10 h-10 rounded-md shadow-sm hover:shadow-md transition-shadow"
                :class="{ 'ring-2 ring-ring': currentTheme === theme.value }"
                :style="{backgroundColor: theme.color}"
              ></div>
              <span class="text-xs mt-1 text-center">{{ theme.label }}</span>
            </div>
          </div>
        </div>

        <div v-if="showDarkThemes" class="mb-6">
          <h3 class="text-lg font-semibold mb-3 text-card-foreground">深色主题</h3>
          <div class="grid grid-cols-3 gap-3">
            <div 
              v-for="theme in darkThemes" 
              :key="theme.value"
              @click="applyTheme(theme.value)" 
              class="theme-color-block cursor-pointer flex flex-col items-center"
            >
              <div 
                class="w-10 h-10 rounded-md shadow-sm hover:shadow-md transition-shadow"
                :class="{ 'ring-2 ring-ring': currentTheme === theme.value }"
                :style="{backgroundColor: theme.color, border: '1px solid rgba(255,255,255,0.1)'}"
              ></div>
              <span class="text-xs mt-1 text-center">{{ theme.label }}</span>
            </div>
          </div>
        </div>

        <div v-if="showPreview" class="mt-8">
          <h3 class="text-lg font-semibold mb-3 text-card-foreground">主题预览</h3>
          <div class="space-y-4">
            <div class="p-4 rounded-md bg-background border border-border">
              <p class="text-foreground mb-2 text-sm font-medium">背景与文本</p>
              <div class="space-y-2">
                <div class="flex items-center">
                  <div class="h-4 w-4 bg-primary rounded-sm mr-2"></div>
                  <span class="text-xs">主色调</span>
                </div>
                <div class="flex items-center">
                  <div class="h-4 w-4 bg-secondary rounded-sm mr-2"></div>
                  <span class="text-xs">次要色调</span>
                </div>
                <div class="flex items-center">
                  <div class="h-4 w-4 bg-accent rounded-sm mr-2"></div>
                  <span class="text-xs">强调色</span>
                </div>
                <div class="flex items-center">
                  <div class="h-4 w-4 bg-muted rounded-sm mr-2"></div>
                  <span class="text-xs">柔和色</span>
                </div>
                <div class="flex items-center">
                  <div class="h-4 w-4 bg-destructive rounded-sm mr-2"></div>
                  <span class="text-xs">警告色</span>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-md bg-card border border-border">
              <p class="text-card-foreground mb-2 text-sm font-medium">卡片与元素</p>
              <div class="flex gap-2 mt-2 justify-center">
                <span class="inline-block h-6 w-6 rounded-full bg-chart-1"></span>
                <span class="inline-block h-6 w-6 rounded-full bg-chart-2"></span>
                <span class="inline-block h-6 w-6 rounded-full bg-chart-3"></span>
                <span class="inline-block h-6 w-6 rounded-full bg-chart-4"></span>
                <span class="inline-block h-6 w-6 rounded-full bg-chart-5"></span>
              </div>
              <div class="flex gap-2 mt-4 justify-center">
                <button class="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm">
                  主按钮
                </button>
                <button class="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm">
                  次按钮
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { Paintbrush, X } from 'lucide-vue-next';

export default {
  name: 'ThemeSwitcher',
  components: {
    Paintbrush,
    X
  },
  props: {
    // 面板标题
    title: {
      type: String,
      default: '主题切换'
    },
    // 面板相对于切换按钮的位置
    position: {
      type: String,
      default: 'bottom-right',
      validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value)
    },
    // 如果未保存任何主题，则使用默认主题
    defaultTheme: {
      type: String,
      default: 'theme-light-blue'
    },
    // 是否显示浅色主题部分
    showLightThemes: {
      type: Boolean,
      default: true
    },
    // 是否显示深色主题部分
    showDarkThemes: {
      type: Boolean,
      default: true
    },
    // 是否显示预览部分
    showPreview: {
      type: Boolean,
      default: true
    },
    // 选择后是否关闭面板
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    // 自定义浅色主题
    customLightThemes: {
      type: Array,
      default: () => []
    },
    // 自定义深色主题
    customDarkThemes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentTheme: '',
      isPanelOpen: false,
      // 默认浅色主题
      defaultLightThemes: [
        { label: '蓝色', value: 'theme-light-blue', color: '#1a73e8' },
        { label: '粉色', value: 'theme-light-pink', color: '#e83e8c' },
        { label: '红色', value: 'theme-light-red', color: '#dc3545' },
        { label: '蓝紫色', value: 'theme-light-BlueViolet', color: '#8a2be2' },
        { label: '青蓝色', value: 'theme-light-SlateBlue', color: '#6a5acd' }
      ],
      // 默认深色主题
      defaultDarkThemes: [
        { label: '绿色', value: 'dark theme-night-green', color: '#28a745' },
        { label: '黄色', value: 'dark theme-night-yellow', color: '#ffc107' },
        { label: '深粉色', value: 'dark theme-night-DeepPink', color: '#ff1493' }
      ]
    }
  },
  computed: {
    // 组合默认和自定义浅色主题
    lightThemes() {
      return [...this.defaultLightThemes, ...this.customLightThemes];
    },
    // 组合默认和自定义深色主题
    darkThemes() {
      return [...this.defaultDarkThemes, ...this.customDarkThemes];
    },
    // 确定面板位置类
    panelPosition() {
      switch(this.position) {
        case 'top-left':
          return 'bottom-full right-full mb-2';
        case 'top-right':
          return 'bottom-full left-0 mb-2';
        case 'bottom-left':
          return 'top-full right-full mt-2';
        case 'bottom-right':
        default:
          return 'top-full left-0 mt-2';
      }
    }
  },
  methods: {
    // 切换主题面板可见性
    togglePanel() {
      this.isPanelOpen = !this.isPanelOpen;
      this.$emit('panel-toggle', this.isPanelOpen);
    },
    // 使用过渡应用所选主题
    applyTheme(theme) {
      // 在主题更改之前发出事件
      this.$emit('before-theme-change', { 
        oldTheme: this.currentTheme, 
        newTheme: theme 
      });
      // 更新当前主题
      this.currentTheme = theme;
      // 使用淡化效果将主题应用于文档
      document.body.classList.add('theme-transition');
      document.documentElement.className = theme;

      // 将主题首选项保存到 localStorage
      localStorage.setItem('theme', theme);

      // 动画完成后删除过渡类
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
        // 主题更改后发出事件
        this.$emit('theme-changed', theme);
      }, 300);

      // 选择后关闭面板
      if (this.closeOnSelect) {
        this.isPanelOpen = false;
      }
    }
  },
  mounted() {
    // 加载保存的主题首选项
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      document.documentElement.className = savedTheme;
    } else {
      this.currentTheme = this.defaultTheme;
      document.documentElement.className = this.defaultTheme;
    }
    // 在外部单击时关闭面板
    const handleClickOutside = (event) => {
      if (this.isPanelOpen && !this.$el.contains(event.target)) {
        this.isPanelOpen = false;
      }
    };
    document.addEventListener('click', handleClickOutside);
    // 清理组件销毁上的事件侦听器
    this.$options.beforeUnmount = () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }
}
</script>

<style scoped>
.theme-switcher-container {
  position: relative;
  display: inline-block;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
:global(body.theme-transition) {
  transition: color 0.3s ease, background-color 0.3s ease;
}
.theme-toggle-btn {
  transition: transform 0.3s ease;
}
</style>
