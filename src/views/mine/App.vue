<template>
  <div class="mine-view">
    <section class="mine-header" :class="mineHeaderState">
      <cube-button :inline="true" :outline="true" @click="toLogin" v-if="!login">注册/登录</cube-button>
      <template v-else>
        <div class="mine-header-avator">
          <img :src="avatorUrl" alt="">
        </div>
        <div class="mine-header-name">{{ userInfo && userInfo.LoginName }}</div>
        <div class="mine-header-favorites">
          <router-link to="/favorites/goods">收藏商品({{ favorites && favorites.FavProdNum }}) &nbsp; </router-link>
          <router-link to="/favorites/store">收藏店铺({{ favorites && favorites.FavShopsNum }})</router-link>
        </div>
      </template>
    </section>

    <section class="mine-order">
      <cube-cell title="我的订单" value="查看全部订单" :to="login ? '/orders' : '/login'">
        <img src="./images/clipboard.png" class="mine-icon" slot="icon">
      </cube-cell>
      <div class="mine-order-flexbox border-top-1px">
        <router-link class="mine-order-item" :to="login ? '/orders/pay' : '/login'">
          <div class="mine-order-icon">
            <img src="./images/orderIcon01.png">
            <cube-badge :text="login && orders && orders.waitPayCount"/>
          </div>
          <div class="mine-order-label">待付款</div>
        </router-link>
        <router-link class="mine-order-item" :to="login ? '/orders/send' : '/login'">
          <div class="mine-order-icon">
            <img src="./images/orderIcon02.png">
            <cube-badge :text="login && orders && orders.waitSendCount"/>
          </div>
          <div class="mine-order-label">待发货</div>
        </router-link>
        <router-link class="mine-order-item" :to="login ? '/orders/take' : '/login'">
          <div class="mine-order-icon">
            <img src="./images/orderIcon03.png">
            <cube-badge :text="login && orders && orders.waitRecCount"/>
          </div>
          <div class="mine-order-label">待收货</div>
        </router-link>
        <router-link class="mine-order-item" :to="login ? '/orders/evaluate' : '/login'">
          <div class="mine-order-icon">
            <img src="./images/orderIcon04.png">
            <cube-badge :text="login && orders && orders.finishCount"/>
          </div>
          <div class="mine-order-label">待评价</div>
        </router-link>
        <router-link class="mine-order-item" :to="login ? '/orders/after' : '/login'">
          <div class="mine-order-icon">
            <img src="./images/orderIcon05.png">
          </div>
          <div class="mine-order-label">售后</div>
        </router-link>
      </div>
    </section>

    <section class="mine-cells">
      <cube-cell title="现金账户" :to="login ? '/account' : '/login'">
        <img src="./images/mineMoney.png" class="mine-icon" slot="icon">
      </cube-cell>
      <cube-cell title="账户与安全" :to="login ? '/safe' : '/login'">
        <img src="./images/safe_icon.png" class="mine-icon" slot="icon">
      </cube-cell>
      <cube-cell title="我的二维码" :to="login ? '/qr' : '/login'">
        <img src="./images/myCode.png" class="mine-icon" slot="icon">
      </cube-cell>
      <cube-cell title="分享收益" :to="login ? '/earnings' : '/login'">
        <img src="./images/shareEarn.png" class="mine-icon" slot="icon">
      </cube-cell>
      <cube-cell title="管理收货地址" :to="login ? '/address' : '/login'">
        <img src="./images/address.png" class="mine-icon" slot="icon">
      </cube-cell>
    </section>

    <section class="mine-cells">
      <cube-cell title="消息" :to="login ? '/message' : '/login'">
        <img src="./images/tel.png" class="mine-icon" slot="icon">
      </cube-cell>
      <cube-cell title="设置" to="/set">
        <img src="./images/setting.png" class="mine-icon" slot="icon">
      </cube-cell>
    </section>

    <section class="mine-tel">
      客服电话 <a class="mine-tel-number" href="tel:400-0885-999">400-0885-999</a>
    </section>

    <section class="mine-time"> 工作时间：09:00-17:30 </section>

    <section class="mine-tab">
      <cube-tabbar :active="4"/>
    </section>

    <transition name="move">
      <router-view class="mine-subview"/>
    </transition>
  </div>
</template>

<script>
  import {favoritesNum, orderList} from '../../service'
  import {mapState, mapMutations} from 'vuex'
  import {CubeCell, CubeSwitch, CubeBadge} from '../../basic'
  import {CubeTabbar} from '../../module'

  const defaultAvator = require('./images/user_head_mo.jpg')

  export default {
    components: {
      CubeTabbar,
      CubeCell,
      CubeSwitch,
      CubeBadge
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState([                               // 登录状态、用户信息、收藏数量、相关订单数量
        'login', 'userInfo', 'favorites', 'orders'
      ]),
      mineHeaderState () {                        // 登录状态显示
        return this.login ? 'mine-header_in' : 'mine-header_out'
      },
      avatorUrl () {                              // 用户头像
        return (this.userInfo && this.userInfo.HeadImgUrl) || defaultAvator
      }
    },
    methods: {
      ...mapMutations([                             // 记录用户信息、记录收藏数量、记录相关订单数量
        'RECORD_USERINFO', 'RECORD_FAVORITES', 'RECORD_ORDERS'
      ]),
      toLogin () {                                  // 登录跳转
        this.$router.push('login')
      },
      async getFavoritesNum () {                    // 获取收藏数量
        const res = await favoritesNum(this, this.userInfo)
        res.data && this.RECORD_FAVORITES(res.data)
      },
      async getOrderNum () {
        const res = await orderList(this, 1, 1)      // 获取相关订单数量
        res.data && this.RECORD_ORDERS(res.data)
      },
      loginGetData () {                              // 已登录获取数据
        this.getFavoritesNum()
        this.getOrderNum()
      },
      // 移动端滚动穿透问题
      setFixedLayout () {
        this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        document.body.setAttribute('style', 'font-size: 12px; position: fixed; width: 100%; top: ' + (-this.scrollTop) + 'px')
      },
      revertLayout () {
        document.body.setAttribute('style', 'font-size: 12px;')
        document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop
      }
    },
    mounted () {
      if (!/\/$/g.test(location.hash)) this.setFixedLayout()        // 不是主页body使用fixed布局
      if (this.login) this.loginGetData()
    },
    watch: {
      '$route' (to, from) {                           // 监听路由变化切换body布局方式
        if (/\/$/g.test(from.path)) this.setFixedLayout()
        if (/\/$/g.test((to.path))) this.revertLayout()
      },
      login () {                                      // 监听登录状态改变
        if (this.login) this.loginGetData()
      }
    }
  }
</script>

<style lang="stylus">
  body {
    background-color: $color-background;
  }

  .mine-view {
    padding-bottom: 80px;
  }

  .mine-icon {
    margin-right: 10px;
    width: 20px;
  }

  .mine-header {
    height: 110px;
    background: url(./images/mineBg.png) center center no-repeat;
    background-size: 100% 100%;
    &_out {
      line-height: 110px;
      text-align: center;
      .cube-btn {
        font-size: 16px;
        letter-spacing: 2px;
        color: #fff;
        padding: 10px 20px;
        &::after {
          border: 1px solid #fff !important;
        }
      }
    }
    &_in {
      box-sizing: border-box;
      padding: 30px 0 0 75px;
      font-size: 17px;
      color: #fff;
    }
    &-avator {
      position: absolute;
      top: 30px;
      left: 15px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #fff;
      img {
        width: 100%;
        height: auto;
      }
    }
    &-name {
      padding-top: 5px;
      margin-bottom: 10px;
    }
    &-favorites {
      font-size: 12px;
      a {
        color: #fff;
      }
    }
  }

  .mine-order {
    background-color: #fff;
    &-flexbox {
      display: flex;
    }
    &-item {
      flex: 1;
      text-align: center;
      padding: 15px 0 10px;
      &:active {
        background: rgba(0, 0, 0, .04);
      }
    }
    &-icon {
      display: inline-block;
      position: relative;
      img {
        height: 18px;
      }
      span {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate3d(110%, -50%, 0);
      }
    }
    &-label {
      font-size: 12px;
      color: $color-grey;
      padding-top: 3px;
    }
  }

  .mine-cells {
    margin-top: 5px;
  }

  .mine-tel {
    text-align: center;
    font-size: 14px;
    color: #666;
    background: #fff;
    margin-top: 5px;
    padding: 15px 10px;
    &-number {
      color: #999;
    }
  }

  .mine-time {
    text-align: center;
    font-size: 12px;
    color: $color-grey;
    line-height: 40px;
  }

  .mine-subview {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-background;
    overflow-y: auto;
    z-index: 99;
  }

  .fade-enter-active, .fade-leave-to {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .move-enter, .move-leave-to {
    transition: all 0.3s;
    transform: translate3d(100%, 0, 0);
  }

  .move-enter-to, .move-leave {
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
  }
</style>
