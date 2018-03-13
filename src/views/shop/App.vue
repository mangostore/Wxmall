<template>
  <div class="shop-view">
    <section class="shop-top">
      <img class="shop-top-logo" src="" alt="">
      <h2 class="shop-top-name">湖南</h2>
      <p class="shop-top-count">3人收藏</p>
      <cube-button inline outline><i class="iconfont icon-heart"></i>收藏</cube-button>
    </section>

    <section class="shop-main">
      <cube-tab>
        <cube-tab-item>
          <i class="iconfont icon-dianpu1"></i>
          店铺首页
        </cube-tab-item>
        <cube-tab-item>
          <i class="iconfont icon-daizi"></i>
          全部商品
        </cube-tab-item>
        <cube-tab-item>
          <i class="iconfont icon-Grid"></i>
          商品分类
        </cube-tab-item>
        <cube-tab-item>
          <i class="iconfont icon-icon-test"></i>
          店铺简介
        </cube-tab-item>
      </cube-tab>
    </section>
  </div>
</template>

<script>
  import '@/assets/fonts/iconfont.css'
  import {CubeTab, CubeTabItem} from '../../basic'

  export default {
    components: {
      CubeTab,
      CubeTabItem
    }
  }
</script>

<style lang="stylus">
  body {
    background-color: $color-background;
    font-size: 12px;
  }

  .shop-top {
    background-color: #fff;
  }
</style>
