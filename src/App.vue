<template>
  <div class="sub-app">
    <header class="sub-header">
      <h2>子应用（Vue3 + TS）</h2>
      <nav>
        <router-link to="/">子应用首页</router-link>
        <router-link to="/profile">子应用个人中心</router-link>
      </nav>
    </header>
    <main class="sub-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sub-app {
  min-height: 100%;
}

.sub-header {
  padding: 1rem;
  background-color: #42b983;
  color: white;
}

.sub-header nav {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.sub-header a {
  color: white;
  text-decoration: none;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
}

.sub-header a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.4);
}

.sub-main {
  padding: 1.5rem;
}
</style>