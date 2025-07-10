<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ThemeSwitcher from '/src/components/ThemeSwitcher.vue'
import { ref } from 'vue'

// Example of handling theme change events
const handleThemeChanged = (theme) => {
  console.log('Theme changed to:', theme)
}

const handlePanelToggle = (isOpen) => {
  console.log('Theme panel is now:', isOpen ? 'open' : 'closed')
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <div class="theme-switcher-wrapper">
          <ThemeSwitcher 
            position="bottom-right"
            title="选择主题"
            :showPreview="true"
            :closeOnSelect="true"
            @theme-changed="handleThemeChanged"
            @panel-toggle="handlePanelToggle"
          />
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

nav a:hover {
  color: hsl(var(--primary));
}

nav a:first-of-type {
  border: 0;
}

nav a.router-link-active {
  color: hsl(var(--primary));
  font-weight: 600;
}

.theme-switcher-wrapper {
  display: inline-block;
  margin-left: 1rem;
  position: relative;
  vertical-align: middle;
}
</style>
