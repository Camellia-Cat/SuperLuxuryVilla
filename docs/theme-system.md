# 主题系统文档
`- MQ`
## 概述

本项目实现了一个完整的主题系统，支持浅色模式和深色模式，每种模式均有多种配色方案。该主题系统基于 CSS 变量和 Tailwind CSS 构建，使得应用程序的样式保持一致变得简单且高效。

## 主题结构

主题系统包括：

1. **默认浅色主题** - 应用于 `:root`
2. **浅色主题变体**：
   - `.theme-light-blue` - 蓝色系浅色主题
   - `.theme-light-pink` - 粉色系浅色主题
   - `.theme-light-red` - 红色系浅色主题
   - `.theme-light-BlueViolet` - 蓝紫色系浅色主题
   - `.theme-light-SlateBlue` - 石板蓝色系浅色主题

3. **默认深色主题** - 使用 `.dark` 类
4. **深色主题变体**：
   - `.dark.theme-night-green` - 绿色系深色主题
   - `.dark.theme-night-yellow` - 黄色系深色主题
   - `.dark.theme-night-DeepPink` - 深粉色系深色主题

## 使用方法

### 应用主题

在根 HTML 根元素中加入适当的类即可应用主题：
```html
<!-- 对于具有蓝色主题的浅色模式 -->
<html class="theme-light-blue">

<!-- 对于具有绿色主题的深色模式 -->
<html class="dark theme-night-green">
```

### Switching Themes

可以使用 JavaScript 动态切换主题：

```javascript
// 切换到浅蓝色主题
document.documentElement.className = 'theme-light-blue';

// 切换到深绿色主题
document.documentElement.className = 'dark theme-night-green';
```

### Creating a Theme Switcher Component

简单主题切换器示例:

```vue
<template>
  <div>
    <h3>浅色主题</h3>
    <button @click="setTheme('theme-light-blue')">Blue</button>
    <button @click="setTheme('theme-light-pink')">Pink</button>
    <button @click="setTheme('theme-light-red')">Red</button>
    <button @click="setTheme('theme-light-BlueViolet')">Blue Violet</button>
    <button @click="setTheme('theme-light-SlateBlue')">Slate Blue</button>
    
    <h3>深色主题</h3>
    <button @click="setTheme('dark theme-night-green')">Green</button>
    <button @click="setTheme('dark theme-night-yellow')">Yellow</button>
    <button @click="setTheme('dark theme-night-DeepPink')">Deep Pink</button>
  </div>
</template>

<script>
export default {
  methods: {
    setTheme(theme) {
      document.documentElement.className = theme;
      // 将主题首选项保存到 localStorage
      localStorage.setItem('theme', theme);
    }
  },
  mounted() {
    // 如果本地可用？加载保存的主题首选项
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }
}
</script>
```

## CSS 变量

每个主题定义以下 CSS 变量：

- `--background` - 主背景颜色
- `--foreground` - 主文字颜色
- `--card` - 卡片背景颜色
- `--card-foreground` - 卡片文字颜色
- `--popover` - 弹出框背景颜色
- `--popover-foreground` - 弹出框文字颜色
- `--primary` - 主操作颜色
- `--primary-foreground` - 主操作元素的文字颜色
- `--secondary` - 次操作颜色
- `--secondary-foreground` - 次操作元素的文字颜色
- `--muted` - 弱背景颜色
- `--muted-foreground` - 弱元素文字颜色
- `--accent` - 强调颜色
- `--accent-foreground` - 强调元素文字颜色
- `--destructive` - 危险操作颜色
- `--destructive-foreground` - 危险操作元素文字颜色
- `--border` - 边框颜色
- `--input` - 输入元素边框颜色
- `--ring` - 焦点环颜色
- `--chart-1` 到 `--chart-5` - 图表与数据可视化使用的颜色


## 扩展主题系统

要添加新主题：

1. 在 `src/assets/main.css` 中添加一个新的类，遵循现有模式
2. 定义主题的所有必要 CSS 变量
3. 为保持一致性，使用 HSL 色彩格式（如 `--primary: 210 100% 50%;`）

以下是添加新的浅色主题的示例：

```css
/* 浅色主题 - 青色 */
.theme-light-teal {
  --background: 180 50% 98%;
  --foreground: 180 50% 10%;
  --card: 180 50% 100%;
  --card-foreground: 180 50% 10%;
  /* 定义所有其他变量... */
}
```

## 结论

1. 始终使用 CSS 变量，而不是硬编码颜色
2. 使用引用这些变量的 Tailwind 实用类（如 `bg-background`、`text-foreground`）
3. 在所有主题中测试 UI，确保对比度和可读性良好
4. 设计新主题时考虑无障碍性（确保足够的对比度比率）
