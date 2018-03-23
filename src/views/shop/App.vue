<template>
  <div class="shop-view">
    <section class="shop-top">
      <img class="shop-top-logo" :src="shopInfo.Logo">
      <h2 class="shop-top-name">{{shopInfo.ShopName}}</h2>
      <p class="shop-top-count">{{favoriteNum}}人收藏</p>
      <cube-button inline outline primary :class="['shop-top-favorite', {'shop-top-favorite_on': favoriteState === 2}]" @click="changeShopCollect">
        <i class="iconfont icon-heart"></i>{{favoriteState === 2 ? '已收藏' : '收藏'}}
      </cube-button>
    </section>

    <section class="shop-main">
      <cube-tab v-model="currentTab">
        <cube-tab-item :selected="matchedPath('/')" @item-click="$router.replace({path: '/', query: {id: shopId}})">
          <i class="iconfont icon-dianpu1"></i>
          店铺首页
        </cube-tab-item>
        <cube-tab-item :selected="matchedPath('/all')" @item-click="$router.replace({path: '/all', query: {id: shopId}})">
          <i class="iconfont icon-daizi"></i>
          <div class="shop-main-label">全部商品</div>
        </cube-tab-item>
        <cube-tab-item :selected="matchedPath('/sort')" @item-click="$router.replace({path: '/sort', query: {id: shopId}})">
          <i class="iconfont icon-Grid"></i>
          <div class="shop-main-label">商品分类</div>
        </cube-tab-item>
        <cube-tab-item :selected="matchedPath('/brief')" @item-click="$router.replace({path: '/brief', query: {id: shopId}})">
          <i class="iconfont icon-icon-test"></i>
          <div class="shop-main-label">店铺简介</div>
        </cube-tab-item>
      </cube-tab>
      <transition name="router-fade">
        <keep-alive>
          <router-view class="shop-router-view"></router-view>
        </keep-alive>
      </transition>
    </section>
  </div>
</template>

<script>
  import '../../assets/fonts/iconfont.css'
  import throttle from 'lodash/throttle'
  import {CubeTab, CubeTabItem, CubeSticky} from '../../basic'
  import {shopInfo, shopCollect} from '../../service'
  import {mapState, mapMutations} from 'vuex'

  export default {
    components: {
      CubeTab,
      CubeTabItem,
      CubeSticky
    },
    data () {
      return {
        shopId: 0,
        shopInfo: {},
        favoriteNum: 0,
        favoriteState: 1,
        currentTab: -1
      }
    },
    computed: {
      ...mapState([
        'login', 'userInfo'
      ]),
      changeShopCollect () {
        return throttle(() => {
          this.getShopCollect(1)
        }, 1000)
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_SHOPINFO'
      ]),
      async getShopInfo () {
        this.res = await shopInfo(this, this.shopId)
        if (this.res) {
          this.shopInfo = this.res.data
          this.RECORD_SHOPINFO(this.shopInfo)
        }
      },
      async getShopCollect (state) {                        // 0：获取收藏状态  1、2：切换收藏状态
        this.res = await shopCollect(this, this.shopId, state)
        if (this.res) {
          this.favoriteNum = this.res.data.FavoNum
          this.favoriteState = this.res.data.FavoState      // 1：未收藏  2：已收藏
          if (state) {
            this.$createToast({
              type: 'correct',
              txt: this.favoriteState === 2 ? '收藏成功' : '取消收藏成功',
              time: 1500
            }).show()
          }
        }
      },
      matchedPath (path) {
        const routePath = this.$route.path
        if (path === routePath) {
          return true
        }
      }
    },
    mounted () {
      this.shopId = this.$route.query.id || 0
      this.getShopInfo()
      this.getShopCollect(0)
    }
  }
</script>

<style lang="stylus">
  body {
    background-color: $color-background;
  }

  html>body {
    font-size: 12px;
  }

  .shop-top {
    background: url("images/storeBg.png") no-repeat;
    background-size: 100% 100%;
    height: 50px;
    padding: 10px;
    position: relative;
    img {
      width: 42px;
      height: auto;
      position: absolute;
      top: 10px;
      left: 10px;
    }
    &-name {
      font-size: 14px;
      padding: 5px 60px 5px 50px;
      line-height: 1.1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &-count {
      font-size: 12px;
      padding-left: 50px;
    }
    .cube-btn {
      position: absolute!important;
      right: 10px;
      bottom: 10px;
      &.shop-top-favorite_on {
        color: $color-grey;
        i {
          display: none;
        }
        &::after {
          border: none;
        }
      }
    }
  }

  .shop-main {
    .cube-tab-item {
      padding-top: 4px;
      font-size: 12px;
      line-height: 18px;
      .iconfont {
        display: block;
      }
    }
  }

  .shop-router-view {
    height: 0;
  }

  .router-fade-enter {
    opacity: 0;
    transition: all .5s;
  }
  .router-fade-leave-to {
    opacity: 0;
    transition: all 0s;
  }
  .router-fade-enter-to, .router-fade-leave {
    opacity: 1;
    transition: all .5s;
  }

</style>
