# ThemeSwitcher Component

A reusable Vue 3 component for theme switching with an elegant UI and smooth transitions.

## Features

- Circular button with brush icon that expands to reveal theme options
- Supports both light and dark themes
- Smooth fade transitions when changing themes
- Customizable through props
- Saves theme preference to localStorage
- Responsive design with Tailwind CSS
- Accessible with proper ARIA attributes

## Installation

The component is already part of the project. Make sure you have the required dependencies:

```bash
npm install lucide-vue-next
```

## Usage

Import and use the component in your Vue file:

```vue
<script setup>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

// Optional: Handle theme change events
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
| `title` | String | 'Theme Switcher' | The title displayed in the theme panel |
| `position` | String | 'bottom-right' | Position of the panel relative to the button. Options: 'top-left', 'top-right', 'bottom-left', 'bottom-right' |
| `defaultTheme` | String | 'theme-light-blue' | Default theme to use if none is saved |
| `showLightThemes` | Boolean | true | Whether to show light themes section |
| `showDarkThemes` | Boolean | true | Whether to show dark themes section |
| `showPreview` | Boolean | true | Whether to show theme preview section |
| `closeOnSelect` | Boolean | true | Whether to close panel after theme selection |
| `customLightThemes` | Array | [] | Custom light themes to add to the default ones |
| `customDarkThemes` | Array | [] | Custom dark themes to add to the default ones |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `panel-toggle` | Boolean | Emitted when the panel is opened or closed |
| `before-theme-change` | Object | Emitted before theme change with oldTheme and newTheme |
| `theme-changed` | String | Emitted after theme change with the new theme value |

## Custom Themes

You can add custom themes by passing arrays of theme objects:

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

Each theme object should have:
- `label`: Display name for the theme
- `value`: CSS class name to apply to the document

## Styling

The component uses Tailwind CSS for styling. You can customize the appearance by modifying the classes in the component template.

The fade transitions are implemented using Vue's built-in transition component and CSS transitions.