<template>
  <div class="pay-view" v-title="'确定订单'">
    <div class="pay-type">
      <cube-radio-group>
        <cube-radio v-for="(type, index) in types" :option="type" :key="index" v-model="selected" position="right">
          <div class="pay-type-content">
            <img :src="type.icon" class="pay-type-icon">
            {{type.label}}
            <span class="pay-type-info">{{type.info}}</span>
          </div>
        </cube-radio>
      </cube-radio-group>
    </div>

    <div class="pay-bottom">
      支付：￥{{orderDetail.RealPay}}
      <cube-button inline primary @click="toPassword">付款</cube-button>
    </div>
  </div>
</template>

<script>
  import {orderDetail, accountMsg} from '../../../service'
  import {mapState} from 'vuex'
  import CubePassword from '../../../module/password'

  const wx = require('../images/wx.png')
  const yr = require('../images/yr.png')

  export default {
    name: 'pay',
    components: {
      CubePassword
    },
    data () {
      return {
        orderIds: 0,
        orderDetail: {
          RealPay: 0
        },
        accountMsg: {
          UserBala: 0
        },
        selected: 'R'
      }
    },
    computed: {
      ...mapState([
        'login', 'userInfo'
      ]),
      types () {
        return [
          {
            label: '余额',
            value: 'R',
            icon: yr,
            info: '可用余额' + this.accountMsg.UserBala + '元'
          },
          {
            label: '微信支付',
            value: 'W',
            icon: wx,
            info: ''
          }
        ]
      }
    },
    methods: {
      async getOrderDetail () {
        this.res = await orderDetail(this, this.orderIds)
        if (this.res) {
          this.orderDetail = this.res.data
        }
      },
      async getAccountMsg () {
        this.res = await accountMsg(this)
        if (this.res) {
          this.accountMsg = this.res.data
        }
      },
      toPassword () {
        this.password = this.$createPassword({
          money: this.orderDetail.RealPay,
          orderIds: this.orderIds,
          payStyle: this.selected,
          login: this.login,
          userInfo: this.userInfo
        }, ['forget']).show()
        this.password.$on('forget', () => {    // create的组件不能使用路由
          this.$router.push('forget')
        })
        this.password.$on('success', () => {
          this.$router.push({
            path: 'success',
            query: {orderIds: this.orderIds}
          })
        })
      }
    },
    mounted () {
      this.orderIds = this.$route.query.orderIds || 0
      this.getOrderDetail()
      this.getAccountMsg()
    }
  }
</script>

<style lang="stylus">
  .pay-type {
    font-size: 18px;
    &-content {
      width: 100%;
      font-size: 14px;
      padding-right: 30px;
    }
    &-icon {
      height: 20px;
      vertical-align: middle;
      margin-right: 10px;
    }
    &-info {
      display: inline-block;
      float: right;
    }
  }

  .pay-bottom {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 44px;
    width: 100%;
    background-color: #fff;
    line-height: 44px;
    padding: 0 0 0 10px;
    font-size: 14px;
    color: $color-orange;
    .cube-btn {
      float: right;
      width: 96px;
      height: 100%;
      font-size: 15px;
    }
  }
</style>
