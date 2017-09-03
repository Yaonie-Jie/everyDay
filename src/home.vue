<template>
  <div>
    <!-- 头部导航 -->
    <Heads></Heads>
    <main>
      <!-- 左侧导航 -->
      <div class="main-left">
        <NavBar></NavBar>
      </div>
      <!-- 右侧主内容区 -->
      <div class="main-right">
        <transition name="fade">
          <router-view class="view"></router-view>
        </transition>
      </div>
    </main>
  </div>
</template>
<script>
  import Heads from 'components/Heads.vue'
  import NavBar from 'components/NavBar.vue'

  export default {
    name: 'home',
    components: {Heads, NavBar},
    data: function () {
      return {

      }
    },
    created: function () {

    }
  }

</script>
