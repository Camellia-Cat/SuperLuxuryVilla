# ThemeSwitcher 组件

一个可复用的 Vue 3 主题切换组件，具有优雅的 UI 和平滑的过渡效果。

## Features

- 圆形按钮带有画笔图标，点击后会展开显示主题选项
- 支持亮色和暗色两种主题
- 切换主题时有平滑的淡入淡出过渡效果
- 可通过 props 进行自定义
- 将主题偏好保存到 localStorage 中
- 使用 Tailwind CSS 实现响应式设计
- 具备良好的可访问性，包含正确的 ARIA 属性

## Installation

该组件已经是项目的一部分。确保你已安装以下依赖：

```bash
npm install lucide-vue-next
```

## Usage

在你的 Vue 文件中导入并使用该组件：

```vue
<script setup>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

// 处理主题变更事件
const handleThemeChanged = (theme) => {
  console.log('Theme changed to:', theme)
}
</script>

<template>
  <div>
    <ThemeSwitcher 
      position="bottom-right"
      title="Choose Theme"
      @theme-changed="handleThemeChanged"
    />
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | String | 'Theme Switcher' | 主题面板中显示的标题 |
| `position` | String | 'bottom-right' | 按钮相对于面板的位置。可选项：'top-left'、'top-right'、'bottom-left'、'bottom-right' |
| `defaultTheme` | String | 'theme-light-blue' | 如果没有保存的主题时使用的默认主题 |
| `showLightThemes` | Boolean | true |是否显示亮色主题部分 |
| `showDarkThemes` | Boolean | true | 是否显示暗色主题部分 |
| `showPreview` | Boolean | true |是否显示主题预览部分 |
| `closeOnSelect` | Boolean | true |在选择主题后是否关闭面板 |
| `customLightThemes` | Array | [] | 要添加到默认亮色主题的自定义亮色主题 |
| `customDarkThemes` | Array | [] | 要添加到默认暗色主题的自定义暗色主题 |

## Events

| Event | Payload | Description                    |
|-------|---------|--------------------------------|
| `panel-toggle` | Boolean | 面板打开或关闭时触发                     |
| `before-theme-change` | Object | 主题变更前触发，包含 oldTheme 和 newTheme |
| `theme-changed` | String | 主题变更后触发，携带新的主题值                |

## Custom Themes

你可以通过传递主题对象数组来添加自定义主题:

```vue
<ThemeSwitcher 
  :customLightThemes="[
    { label: 'Custom Light', value: 'theme-light-custom' }
  ]"
  :customDarkThemes="[
    { label: 'Custom Dark', value: 'dark theme-night-custom' }
  ]"
/>
```

每个主题对象应包含:
- `label`: 主题的显示名称
- `value`: 应用于文档的 CSS 类名

## 样式

该组件使用 Tailwind CSS 进行样式设计。你可以通过修改组件模板中的类来自定义外观。
淡入淡出过渡效果是通过 Vue 内置的 transition 组件和 CSS 过渡实现的。