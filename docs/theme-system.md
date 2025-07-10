# Theme System Documentation

## Overview

This project implements a comprehensive theme system with light and dark modes, each with multiple color schemes. The theme system is built using CSS variables and Tailwind CSS, making it easy to apply consistent styling across the application.

## Theme Structure

The theme system consists of:

1. **Default Light Theme** - Applied to `:root`
2. **Light Theme Variations**:
   - `.theme-light-blue` - Blue-based light theme
   - `.theme-light-pink` - Pink-based light theme
   - `.theme-light-red` - Red-based light theme
   - `.theme-light-BlueViolet` - Blue-violet-based light theme
   - `.theme-light-SlateBlue` - Slate blue-based light theme

3. **Default Dark Theme** - Applied with `.dark` class
4. **Dark Theme Variations**:
   - `.dark.theme-night-green` - Green-based dark theme
   - `.dark.theme-night-yellow` - Yellow-based dark theme
   - `.dark.theme-night-DeepPink` - Deep pink-based dark theme

## How to Use

### Applying Themes

To apply a theme, add the appropriate class to the root HTML element:

```html
<!-- For light mode with blue theme -->
<html class="theme-light-blue">

<!-- For dark mode with green theme -->
<html class="dark theme-night-green">
```

### Switching Themes

You can switch themes dynamically using JavaScript:

```javascript
// Switch to light blue theme
document.documentElement.className = 'theme-light-blue';

// Switch to dark green theme
document.documentElement.className = 'dark theme-night-green';
```

### Creating a Theme Switcher Component

Example of a simple theme switcher in Vue:

```vue
<template>
  <div>
    <h3>Light Themes</h3>
    <button @click="setTheme('theme-light-blue')">Blue</button>
    <button @click="setTheme('theme-light-pink')">Pink</button>
    <button @click="setTheme('theme-light-red')">Red</button>
    <button @click="setTheme('theme-light-BlueViolet')">Blue Violet</button>
    <button @click="setTheme('theme-light-SlateBlue')">Slate Blue</button>
    
    <h3>Dark Themes</h3>
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
      // Optionally save the theme preference to localStorage
      localStorage.setItem('theme', theme);
    }
  },
  mounted() {
    // Load saved theme preference if available
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }
}
</script>
```

## CSS Variables

Each theme defines the following CSS variables:

- `--background` - Main background color
- `--foreground` - Main text color
- `--card` - Card background color
- `--card-foreground` - Card text color
- `--popover` - Popover background color
- `--popover-foreground` - Popover text color
- `--primary` - Primary action color
- `--primary-foreground` - Text color on primary elements
- `--secondary` - Secondary action color
- `--secondary-foreground` - Text color on secondary elements
- `--muted` - Muted background color
- `--muted-foreground` - Text color on muted elements
- `--accent` - Accent color
- `--accent-foreground` - Text color on accent elements
- `--destructive` - Destructive action color
- `--destructive-foreground` - Text color on destructive elements
- `--border` - Border color
- `--input` - Input element border color
- `--ring` - Focus ring color
- `--chart-1` through `--chart-5` - Colors for charts and data visualization

## Extending the Theme System

To add a new theme:

1. Add a new class in `src/assets/main.css` following the existing pattern
2. Define all the necessary CSS variables for the theme
3. Use HSL color format for consistency (e.g., `--primary: 210 100% 50%;`)

Example of adding a new light theme:

```css
/* Light Theme - Teal */
.theme-light-teal {
  --background: 180 50% 98%;
  --foreground: 180 50% 10%;
  --card: 180 50% 100%;
  --card-foreground: 180 50% 10%;
  /* Define all other variables... */
}
```

## Best Practices

1. Always use the CSS variables instead of hardcoding colors
2. Use the Tailwind utility classes that reference these variables (e.g., `bg-background`, `text-foreground`)
3. Test your UI in all themes to ensure good contrast and readability
4. Consider accessibility when designing new themes (ensure sufficient contrast ratios)