# SuperLuxuryVilla
### MQ's Super Luxury Villa🤓

## Project Description
通过 `Vite` 创建的 `MQ的SuperLuxuryVilla`  Vue 3 项目。

## Features
- Vue 3 with Composition API
- 带有组合式 API 的 Vue 3
- Vue Router for navigation
- 用于导航的 Vue Router
- Vite for fast development and building
- 用于快速开发和构建的 Vite
- Comprehensive theme system with light and dark modes
- 全面的主题系统，包括白天和黑夜模式

## Project Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure
- `src/` - 源代码
  - `assets/` - CSS 和其他资源
  - `components/` - Vue 组件
  - `router/` - Vue Router 配置
  - `views/` - 页面组件
- `public/` - 静态资产
- `docs/` - 文档
  - `theme-system.md` - 主题系统文档

## Theme System
该项目包括一个具有多个浅色和深色主题的综合主题系统。主题系统是使用 CSS 变量和 Tailwind CSS 构建的。

- **Light Themes**: Blue, Pink, Red, BlueViolet, SlateBlue
- **Dark Themes**: Green, Yellow, DeepPink

有关如何使用和扩展主题系统的详细文档，请参阅 [Theme System Documentation](./docs/theme-system.md).

要查看主题系统的实际效果，请使用 'ThemeSwitcher' 组件：
```vue
<template>
  <ThemeSwitcher />
</template>

<script>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

export default {
  components: {
    ThemeSwitcher
  }
}
</script>
```
