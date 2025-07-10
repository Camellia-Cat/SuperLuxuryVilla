<script setup>
import { ref, onMounted } from 'vue';
import {
  Home, 
  Code, 
  Laptop, 
  Layers, 
  Github, 
  Cpu, 
  Globe, 
  Heart, 
  Star, 
  Calendar,
  ArrowRight,
  Mail,
  Phone,
  Briefcase,
  Users,
  Box} from 'lucide-vue-next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaQing from '/src/assets/img/avatar/MaQing.jpg'
import YangChunXing from '/src/assets/img/avatar/YangChunXing.jpg'
import GuoYongZhi from '/src/assets/img/avatar/GuoYongZhi.jpg'
import model3D from '/src/assets/img/projectImg/Tmodel.png'
import bigData from '/src/assets/img/projectImg/bigData.png'
import projectXM from '/src/assets/img/projectImg/project.png'
// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// Projects data
const projects = ref([
  {
    id: 1,
    title: '基于WebGL的3D模型展示器',
    description: '一个基于WebGL的3D模型展示器，支持3D模型的加载、渲染、动画、交互等功能',
    rating: 4.9,
    image: `${model3D}`
  },
  {
    id: 2,
    title: '基于WebGL的工业数字孪生化生产系统',
    description: '基于WebGL的工业数字孪生化生产系统，支持生产线、工艺、设备、生产数据等功能',
    rating: 4.7,
    image: `${bigData}`
  },
  {
    id: 3,
    title: 'Vue3 + TypeScript + Vite2 + TailwindCSS + VitePress2 项目模板',
    description: 'Vue3 + TypeScript + Vite2 + TailwindCSS + VitePress2 项目模板，用于快速搭建 Vue3 + TypeScript + Vite2 + TailwindCSS + VitePress2 项目',
    rating: 4.5,
    image: `${projectXM}`
  }
]);

// 技能数据
const skills = ref([
  { icon: Code, name: '前端开发' },
  { icon: Cpu, name: '后端开发' },
  { icon: Laptop, name: 'UI/UX设计' },
  { icon: Globe, name: 'Web应用' },
  { icon: Layers, name: '数据库' },
  { icon: Github, name: '版本控制' }
]);

// 贡献者数据
const contributors = ref([
  {
    name: '马庆',
    role: '前端开发、UI/UX设计、交互算法设计',
    avatar: `${MaQing}`,
    github: 'https://github.com/MaQing377025773/SuperLuxuryVilla'
  },
  {
    name: '杨春兴',
    role: '后端开发、数据库优化、API开发',
    avatar: `${YangChunXing}`,
    github: 'https://github.com/MaQing377025773/SuperLuxuryVilla'
  },
  {
    name: '郭永智',
    role: '后端开发、产品设计、后台系统开发',
    avatar: `${GuoYongZhi}`,
    github: 'https://github.com/MaQing377025773/SuperLuxuryVilla'
  }
]);

// 表单数据
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

// 表单提交处理
const submitForm = () => {
  alert('表单已提交！我会尽快回复您。');
  contactForm.value = { name: '', email: '', phone: '', message: '' };
};

// GSAP animations
onMounted(() => {
  // Hero section entrance animation
  gsap.from('.hero-content', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Projects section scroll animation
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.projects-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Skills section scroll animation
  gsap.from('.skill-card', {
    scrollTrigger: {
      trigger: '.skills-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.6,
    scale: 0.8,
    opacity: 0,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  });

  // 3D Models section animation
  gsap.from('.models-section .section-title, .models-section .section-description, .model-placeholder', {
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

  // Contributors section animation
  gsap.from('.contributor-card', {
    scrollTrigger: {
      trigger: '.contributors-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // Contact section animation
  gsap.from('.contact-form-card, .contact-info-card', {
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.8,
    x: function(i) { return i % 2 === 0 ? -30 : 30; },
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
  });
});
</script>

<template>
  <!-- 主内容区域 - 使用主题背景色 -->
  <main class="min-h-screen bg-background">
    <!-- 英雄区域 - 使用主题强调色作为背景 -->
    <section class="hero-section bg-accent p-8 md:p-16 rounded-b-3xl shadow-lg">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold text-accent-foreground mb-4 hero-content">
          MQ空间欢迎你🎉
        </h1>
        <p class="text-xl md:text-2xl text-accent-foreground/80 max-w-2xl mb-8 hero-content">
          欢迎来到我的个人空间，这里展示我的项目、技能和最新动态
        </p>
        <div class="flex flex-wrap gap-4 hero-content">
          <button class="btn-primary">
            查看项目
            <Briefcase class="w-4 h-4 ml-2" />
          </button>
          <button class="btn-secondary">
            联系我
            <ArrowRight class="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
    <!-- 项目展示区域 -->
    <section class="projects-section py-16 px-4 md:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="section-title">一些有趣的项目🥳</h2>
        <p class="section-description">
          所展示项目均为个人/团队开源项目，你可以在下方浏览并进入查看和下载它们😎
        </p>
        <!-- 项目卡片网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div 
            v-for="project in projects" 
            :key="project.id" 
            class="project-card"
          >
            <div class="relative h-48 rounded-t-lg overflow-hidden">
              <img 
                :src="project.image" 
                :alt="project.title" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-card-foreground mb-2 line-clamp-1">{{ project.title }}</h3>
              <p class="text-muted-foreground mb-4 line-clamp-2">{{ project.description }}</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <Star class="w-5 h-5 text-primary fill-primary" />
                  <span class="ml-1 text-card-foreground font-medium">{{ project.rating }}</span>
                </div>
                <button class="icon-btn">
                  <Heart class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 技能区域 - 使用主题次要背景色 -->
    <section class="skills-section py-16 px-4 md:px-8 bg-secondary">
      <div class="max-w-6xl mx-auto">
        <h2 class="section-title text-secondary-foreground">偏好技术</h2>
        <p class="section-description text-secondary-foreground/80">
          掌握和理解这些技术，会有用！
        </p>

        <!-- 技能网格 -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-8">
          <div 
            v-for="(skill, index) in skills" 
            :key="index" 
            class="skill-card"
          >
            <component 
              :is="skill.icon" 
              class="w-8 h-8 text-primary mb-2"
            />
            <h3 class="text-secondary-foreground font-medium">{{ skill.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- 3D模型展示区域 -->
    <section class="models-section py-16 px-4 md:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="section-title">3D区预留位😏</h2>
        <p class="section-description">
          这里没有三幻神！
          <br />
          <p class="section-description">
            没有蒂法、没有D.va、没有春丽🤭
          </p>
        </p>

        <!-- 3D模型占位区域 -->
        <div class="model-placeholder bg-muted rounded-lg p-8 mt-8 text-center">
          <Box class="w-16 h-16 mx-auto text-primary mb-4" />
          <h3 class="text-xl font-bold text-foreground mb-2">3D模型展示区域</h3>
          <p class="text-muted-foreground">
            这里将展示3D模型内容，敬请期待！
          </p>
        </div>
      </div>
    </section>

    <!-- 贡献者英雄榜 -->
    <section class="contributors-section py-16 px-4 md:px-8 bg-accent">
      <div class="max-w-6xl mx-auto">
        <h2 class="section-title text-accent-foreground">贡献者😎</h2>
        <p class="section-description text-accent-foreground/80">
          排名不分先后，欢迎大家加入！
        </p>

        <!-- 贡献者卡片网格 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div 
            v-for="(contributor, index) in contributors" 
            :key="index" 
            class="contributor-card bg-background rounded-lg p-6 text-center shadow-sm border border-border"
          >
            <img 
              :src="contributor.avatar" 
              :alt="contributor.name" 
              class="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-lg font-bold text-foreground mb-1">{{ contributor.name }}</h3>
            <p class="text-muted-foreground mb-3">{{ contributor.role }}</p>
            <a :href="contributor.github" target="_blank" class="inline-flex items-center text-primary hover:underline">
              <Github class="w-4 h-4 mr-1" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我区域 -->
    <section class="contact-section py-16 px-4 md:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="section-title">联系我</h2>
        <p class="section-description">
          有任何问题、困难或技术咨询？请填写下面的表单，我会尽快回复您
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <!-- 联系表单 - 使用主题卡片背景 -->
          <div class="contact-form-card">
            <h3 class="text-xl font-bold text-card-foreground mb-4">发送消息</h3>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">姓名</label>
                <input 
                  id="name" 
                  v-model="contactForm.name" 
                  type="text" 
                  required
                  placeholder="请输入您的姓名"
                />
              </div>
              <div class="form-group">
                <label for="email">电子邮箱</label>
                <input 
                  id="email" 
                  v-model="contactForm.email" 
                  type="email" 
                  required
                  placeholder="请输入您的电子邮箱"
                />
              </div>
              <div class="form-group">
                <label for="phone">电话</label>
                <input 
                  id="phone" 
                  v-model="contactForm.phone" 
                  type="tel"
                  placeholder="请输入您的电话号码"
                />
              </div>
              <div class="form-group">
                <label for="message">留言</label>
                <textarea 
                  id="message" 
                  v-model="contactForm.message" 
                  rows="4" 
                  required
                  placeholder="请输入您的留言内容"
                ></textarea>
              </div>
              <button type="submit" class="btn-primary w-full">
                提交
              </button>
            </form>
          </div>

          <!-- 联系信息卡片 - 使用主题强调色背景 -->
          <div class="contact-info-card">
            <h3 class="text-xl font-bold text-accent-foreground mb-4">联系方式</h3>
            <div class="space-y-4">
              <div class="flex items-start">
                <Mail class="w-5 h-5 text-primary mt-1 mr-3" />
                <div>
                  <h4 class="font-medium text-accent-foreground">电子邮箱</h4>
                  <p class="text-accent-foreground/80">18109303070@163.com</p>
                </div>
              </div>
              <div class="flex items-start">
                <Phone class="w-5 h-5 text-primary mt-1 mr-3" />
                <div>
                  <h4 class="font-medium text-accent-foreground">电话</h4>
                  <p class="text-accent-foreground/80">+86 181 0930 3070</p>
                </div>
              </div>
              <div class="flex items-start">
                <Github class="w-5 h-5 text-primary mt-1 mr-3" />
                <div>
                  <h4 class="font-medium text-accent-foreground">GitHub</h4>
                  <p class="text-accent-foreground/80">
                    github.com/MaQing377025773
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 - 使用主题柔和背景色 -->
    <footer class="py-8 px-4 md:px-8 bg-muted">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-muted-foreground">
          © 2023 我的个人网站. 保留所有权利.
        </p>
      </div>
    </footer>
  </main>
</template>

<style scoped>
/* 标题样式 */
.section-title {
  @apply text-3xl font-bold text-foreground mb-2;
}

.section-description {
  @apply text-lg text-foreground/70 max-w-2xl mb-6;
}

/* 按钮样式 */
.btn-primary {
  @apply flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground 
         rounded-lg font-medium shadow-sm hover:opacity-90 transition-all;
}

.btn-secondary {
  @apply flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground 
         rounded-lg font-medium shadow-sm hover:bg-secondary/80 transition-all;
}

.icon-btn {
  @apply p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors;
}

/* 卡片样式 */
.project-card {
  @apply bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow;
}

.skill-card {
  @apply flex flex-col items-center justify-center p-6 bg-background rounded-lg 
         border border-border text-center shadow-sm;
}

.model-placeholder {
  @apply flex flex-col items-center justify-center p-12 bg-background rounded-lg 
         border border-border text-center shadow-sm transition-all hover:shadow-md;
}

.contributor-card {
  @apply bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow;
}

.contact-form-card {
  @apply bg-card rounded-lg border border-border p-6 shadow-md;
}

.contact-info-card {
  @apply bg-accent rounded-lg border border-border p-6 shadow-md;
}

/* 表单样式 */
.form-group {
  @apply mb-4;
}

.form-group label {
  @apply block text-sm font-medium text-card-foreground mb-1;
}

.form-group input,
.form-group textarea {
  @apply w-full px-4 py-2 bg-background border border-input rounded-md 
         text-foreground placeholder:text-muted-foreground focus:outline-none 
         focus:ring-2 focus:ring-ring focus:border-input;
}
</style>
