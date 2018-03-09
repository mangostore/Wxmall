<template>
    <div class="success-view">
      <div class="success-tip">
        <div class="success-tip-main">
          <h3>付款成功啦！</h3>
          <p>本商城不会以付款异常为由要求您退款，谨防诈骗!</p>
        </div>
        <div class="success-tip-btns">
          <cube-button inline outline primary>查看订单</cube-button>
          <cube-button inline outline primary @click="goToHome">继续购物</cube-button>
        </div>
      </div>
      <div class="success-info">
        <h2 class="success-info-title">订单信息</h2>
        <p>收货地址：{{info.shAdress}}</p>
        <p>实际付款：{{info.TotalMoney}}</p>
        <p>获得LC：{{info.LCmoney}}</p>
      </div>
    </div>
</template>

<script>
  import {paySuccess} from '../../../service'
  import {mapState} from 'vuex'

  export default {
    name: 'success',
    data () {
      return {
        ordersId: 0,
        info: {}
      }
    },
    computed: {
      ...mapState([
        'login', 'userInfo'
      ])
    },
    methods: {
      async getPaySuccessInfo () {
        this.res = await paySuccess(this, this.orderIds)
        if (this.res) {
          this.info = this.res.data
        }
      },
      goToHome () {
        window.location.href = './home.html'
      }
    },
    mounted () {
      this.orderIds = this.$route.query.orderIds || 0
      this.getPaySuccessInfo()
    }
  }
</script>

<style lang="stylus">
  .success-tip {
    background-color: #fff;
    padding: 20px 0;
    margin-bottom: 10px;
    &-main {
      box-sizing: border-box;
      width: 76%;
      margin-left: 16%;
      padding: 10px 0 10px 80px;
      background: url('../images/cj.png') no-repeat top 5px left 0;
      background-size: 65px 65px;
      h3 {
        font-size: 16px;
        margin-bottom: 5px;
        color: $color-orange;
      }
      p {
        font-size: 14px;
        line-height: 1.4;
        color: $color-grey;
      }
    }
    &-btns {
      text-align: center;
    }
    .cube-btn {
      border-radius: 4px;
      margin: 10px 20px 0;
      padding: 10px 20px;
      font-size: 15px;
    }
  }

  .success-info {
    background-color: #fff;
    padding: 0 10px 20px;
    &-title {
      font-size: 16px;
      line-height: 44px;
    }
    p {
      font-size: 13px;
      line-height: 1.4;
      margin-bottom: 5px;
    }
  }
</style>
