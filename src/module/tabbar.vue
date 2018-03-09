<template>
  <div class="cube-tabbar">
    <a v-for="item in tabs" :key="item.href" :href="item.href" class="cube-tabbar-item" :class="{'cube-tabbar-item_active': item.active}">
      <i :class="item.icon"></i>
      <div class="cube-tabbar-label">{{item.label}}</div>
    </a>
  </div>
</template>

<script>
  import '@/assets/fonts/iconfont.css'
  export default {
    name: 'tabbar',
    props: ['active'],
    computed: {
      tabs: function () {
        const tabs = [
          {href: './home.html', icon: 'iconfont icon-ic_home_tab_normal', label: '首页', active: false},
          {href: './sort.html', icon: 'iconfont icon-ic_sort_tab_normal', label: '分类', active: false},
          {href: './cart.html', icon: 'iconfont icon-ic_cart_tab_normal', label: '购物车', active: false},
          {href: './mine.html', icon: 'iconfont icon-ic_mine_tab_normal', label: '我的', active: false}
        ]
        tabs[this.active - 1].href = 'javascript:void(0);'
        tabs[this.active - 1].active = true
        return tabs
      }
    }
  }
</script>

<style lang="stylus">
  .cube-tabbar {
    height: 50px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .5);
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: 9;

    &-item {
      flex: 1;
      padding: 7px 0;
      text-decoration: none;
      text-align: center;
      &_active {
        color: #ff2150;
      }
      .iconfont {
        font-size: 22px;
      }
    }

    &-label {
      font-size: 10px;
      padding-top: 5px;
    }
  }
</style>
