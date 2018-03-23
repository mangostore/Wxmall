<template>
  <div class="cart-view">
    <section class="cart-edit">
      可批量编辑商品
      <a class="cart-edit-link" href="javascript:;">编辑商品</a>
    </section>
    <cube-scroll class="cart-scroll" v-if="cartData" :data="totalShopList" :options="{pullDownRefresh: {threshold: 60, stop: 30, txt: '刷新成功'}}" @pulling-down="onPullingDown" ref="scroll">
      <cart-item v-for="(item, index) in cartData.shoplists" :data="item" :key="index" @checked="getCheckedProduct(index, arguments)"></cart-item>
      <div class="cart-scroll-invaild" v-if="cartData.invaildshops && cartData.invaildshops.length">
        失效商品
        <cart-item v-for="(item, index) in cartData.invaildshops" :data="item" :key="index"></cart-item>
      </div>
    </cube-scroll>
    <div class="cart-bottom">
      <cube-checkbox class="cart-bottom-toolbar" v-model="totalCartChecked">
        全选 <span class="cart-bottom-total">合计：¥ <em>{{totalPrice.split('.')[0]}}</em>.{{totalPrice.split('.')[1]}}</span>
        <cube-button class="cart-bottom-btn" inline primary>去结算({{totalNumber}})</cube-button>
      </cube-checkbox>
      <cube-tabbar :active="3"/>
    </div>
  </div>
</template>

<script>
  import {cartList} from '../../service'
  import {setStore, getStore} from '../../basic'
  import {mapState} from 'vuex'
  import CartItem from './components/cart-item'
  import {CubeTabbar} from '../../module'

  export default {
    components: {
      CartItem,
      CubeTabbar
    },
    data () {
      return {
        cartData: {
          count: 0,
          invaildshops: [],
          shoplists: []
        },
        checkedProduct: [],
        editState: false
      }
    },
    computed: {
      ...mapState([
        'login', 'userInfo'
      ]),
      totalShopList () {
        return this.cartData.invaildshops.concat(this.cartData.shoplists)
      },
      validProductCount () {
        const shopList = this.cartData.shoplists
        let productCount = 0
        shopList.forEach(function (item) {
          productCount += item.produlists.length
        })
        return productCount
      },
      totalCartChecked: {
        get () {
          return this.checkedProduct.length === this.validProductCount
        }
      },
      totalNumber () {
        let totalNumber = 0
        this.checkedProduct.forEach(function (item) {
          if (item) {
            totalNumber += item.length
          }
        })
        return totalNumber
      },
      totalPrice () {
        let totalPrice = 0
        this.checkedProduct.forEach(function (item) {
          totalPrice += item.Price * item.numbers
        })
        return totalPrice.toFixed(2).toString()
      }
    },
    methods: {
      async getCartData () {
        this.res = await cartList(this)
        if (this.res && this.res.data) {
          this.cartData = this.res.data
          setStore('cartData', this.cartData)
        }
      },
      getCheckedProduct (index, payload) {
        console.log('checked')
        if (payload) {
          for (let i = 0; i < payload.length; i++) {
            payload[i] = JSON.parse(payload[i])
          }
        }
        this.$set(this.checkedProduct, index, payload)
      },
      onPullingDown () {
        this.getCartData()
      }
    },
    mounted () {
      if (this.login) {
        this.getCartData()
      } else {
        this.cartData = JSON.parse(getStore('cartData'))
      }
    }
  }
</script>

<style lang="stylus">
  html, body {
    height: 100%;
  }
  html>body {
    background-color: $color-background;
    font-size: 12px;
  }

  .cart-view {
    height: 100%;
    position: relative;
    padding: 44px 0 100px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .cart-edit {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    line-height: 44px;
    padding: 0 10px;
    background-color: $color-light-grey-ss;
    &-link {
      float: right;
      color: #007aff;
    }
  }

  .cart-bottom {
    &-toolbar {
      background-color: #fff;
      position: fixed!important;
      left: 0;
      right: 0;
      bottom: 50px;
    }
    &-total {
      color: $color-orange;
      padding-left: 10px;
      em {
        font-style: normal;
        font-size: 16px;
      }
    }
    .cube-checkbox {
      padding: 0 10px;
    }
    .cube-btn {
      float: right;
      font-size: 15px;
      line-height: 26px;
      margin-right: -10px;
    }
    .cube-checkbox-wrap {
      padding: 0;
      font-size: 14px;
      line-height: 44px;
    }
    .cube-checkbox-label {
      width: 100%;
    }
  }
</style>
