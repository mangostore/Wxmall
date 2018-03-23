<template>
  <transition name="router-fade">
    <router-view></router-view>
    <!--<keep-alive>-->
      <!--<router-view></router-view>-->
    <!--</keep-alive>-->
  </transition>
</template>

<script>
  export default {
  }
</script>

<style lang="stylus">
  html, body {
    height: 100%;
    background-color: $color-background;
  }
  html>body {
    font-size: 12px;
  }
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
