<script setup>
import { ref, onMounted } from 'vue';
import { Mail, Phone, Github } from 'lucide-vue-next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

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
  // 联系部分动画
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

/* 卡片样式 */
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