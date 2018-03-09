<template>
  <transition name="cube-password-fade">
    <cube-popup type="password" :mask="true" :center="true" v-show="isVisible">
      <div class="cube-password-main">
        <span class="cube-password-close" @click="close"><i class="cubeic-close"></i></span>
        <h2 class="cube-password-title">
          请输入支付密码
        </h2>
        <p class="cube-password-info">支付 <span>￥{{money}}</span></p>
        <div class="cube-password-input">
          <div class="cube-password-border clear-fix">
            <input type="tel" maxlength="6" autofocus v-focus v-model="password">
            <span class="cube-password-grid" v-for="i in 6"><i class="cube-password-disc" v-show="i <= currentLength"></i></span>
          </div>
        </div>
        <a class="cube-password-forget" href="javascript:void(0)" @click="forgetPassword">忘记密码</a>
      </div>
    </cube-popup>
  </transition>
</template>

<script>
  import apiMixin from 'cube-ui/src/common/mixins/api'
  import {orderPay} from '../service'

  export default {
    name: 'cube-password',
    mixins: [apiMixin],
    props: {
      money: {
        type: [Number, String],
        default: 0
      },
      orderIds: {
        type: [Number, String],
        default: 0
      },
      payStyle: {
        type: String,
        default: 'R'
      },
      login: {
        type: Boolean,
        default: false
      },
      userInfo: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        password: ''
      }
    },
    computed: {
      currentLength: function () {
        return this.password.length
      }
    },
    directives: {
      focus: {
        update: function (el) {
          el.focus()
        }
      }
    },
    methods: {
      close () {
        this.password = ''
        this.hide()
      },
      forgetPassword () {
        this.password = ''
        this.isVisible = false
        this.$emit('forget')
      },
      async submitOrderPay () {
        this.res = await orderPay(this, this.orderIds, this.payStyle, this.money, this.password)
        if (this.res && this.res.data) {
          this.$emit('success')
        } else {
          this.$emit('failed')
        }
        this.isVisible = false
        this.password = ''
      }
    },
    watch: {
      password (val) {
        if (val.length > 5) {
          this.submitOrderPay()
        }
      }
    }
  }
</script>

<style lang="stylus">
  .cube-password {
    &-main {
      width: 270px;
      padding: 0;
      text-align: center;
      overflow: hidden;
      border-radius: 2px;
      background-color: #fff;
    }

    &-close {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      position: absolute;
      top: 0;
      right: 0;
      width: 32px;
      height: 32px;
      color: $color-light-grey;
      font-size: 16px;
    }

    &-title {
      background-color: #f5f5f5;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
    }

    &-info {
      font-size: 12px;
      color: #777;
      padding: 25px 20px 15px;
      text-align: center;
      span {
        font-size: 20px;
        color: #333;
      }
    }

    &-input {
      padding: 0 20px 10px;
    }

    &-border {
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      height: 38px;
      border: 1px solid $color-light-grey-ss;
    }

    &-input input {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 38px;
      padding: 0 10px;
      line-height: 38px;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }

    &-grid {
      flex: 1;
      height: 20px;
      border-right: 1px dashed #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      &:last-child {
        border-right: none;
      }
    }

    &-disc {
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #333;
    }

    &-forget {
      display: block;
      padding: 5px 20px 20px;
      text-align: right;
    }
  }

  .cube-password-fade-enter-active {
    animation: password-fadein .4s;
  }
  .cube-password-main {
    animation: password-zoom .4s;
  }
  @keyframes password-fadein {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
  @keyframes password-zoom {
    0% {transform: scale(0);}
    50% {transform: scale(1.1);}
    100% {transform: scale(1);}
  }
</style>
