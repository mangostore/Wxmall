<template>
    <div class="order-view" v-title="'确认订单'">
      <section class="order-address">
        <cube-cell to="/address">
          <div class="order-address-exist" v-if="address" slot="title">
            收货人：{{address.Receiver}} &nbsp;&nbsp; {{address.M_Phone}}
            <p class="order-address-location">{{address.AddrInfo}}</p>
          </div>
          <div class="order-address-without" v-else slot="title">
            暂未设置收货地址
          </div>
        </cube-cell>
      </section>

      <section class="order-list">
        <div class="order-list-item" v-for="(shop, index_s) in shopList" :key="index_s">
          <div class="order-list-shop border-bottom-1px">{{shop.ShopName}}</div>
          <cube-product-item v-for="(product, index_p) in shop.produlists" :product="product" :key="index_p"/>
          <div class="order-list-express border-bottom-1px">运费： <span>￥{{shop.TraExp}}</span></div>
          <div class="order-list-message border-bottom-1px">
            <span>买家留言：</span>
            <textarea rows="3" placeholder="订单补充说明..." v-model="message"></textarea>
          </div>
          <div class="order-list-total">共{{shop.shopCount}}件商品，合计：<span>￥{{shop.TotalPrice}}</span></div>
        </div>
      </section>

      <section class="order-invoice">
        <cube-cell :title="'发票：' + invoice.text" to="/invoice"></cube-cell>
      </section>

      <section class="order-deduction">
        <div class="order-deduction-cell border-bottom-1px" @click="deductionShow = !deductionShow">
          金额抵扣 <span>{{Number.parseFloat(statistics.needLC) > 0 ? '可抵用' : '不可抵用'}}</span> <i class="order-deduction-arrow" :class="{'order-deduction-arrow_open': deductionShow}"></i>
        </div>
        <div class="order-deduction-content" :class="{'order-deduction-content_open': deductionShow}">
          <cube-checkbox v-model="deduction" position="right">LC抵用</cube-checkbox>
          <p class="order-deduction-info">
            账号余额{{statistics.lcBala}}个LC，商品最高可抵{{statistics.needLC}}元 <span>（使用了LC抵扣的商品不额外赠送LC）</span>
          </p>
        </div>
      </section>

      <section class="order-bottom">
        <span>总计：￥{{needPay}}</span>
        <template v-if="!deduction">赠送{{statistics.giftLC}}LC</template>
        <template v-else>抵扣{{canDeduction}}LC</template>
        <cube-button inline primary @click="orderConfirmToPay">确定</cube-button>
      </section>
    </div>
</template>

<script>
  import {addressList, orderBookingList, orderStatistics, orderConfirm} from '../../../service'
  import {CubeCell} from '../../../basic'
  import {CubeProductItem} from '../../../module'
  import {mapState} from 'vuex'

  export default {
    name: 'order',
    components: {
      CubeCell,
      CubeProductItem
    },
    data () {
      return {
        isBuyNow: false,
        addressId: 0,
        skuId: 0,
        buyNowNumber: 0,
        expressName: '',
        isSelfTake: false,
        cartIds: '',
        address: null,
        shopList: [],
        statistics: {},
        message: '',
        invoice: {
          id: -1,
          text: '不开发票'
        },
        deduction: false,
        deductionShow: false
      }
    },
    computed: {
      ...mapState([                    // 用户登录信息
        'login', 'userInfo'
      ]),
      canDeduction () {
        const lcBala = Number.parseFloat(this.statistics.lcBala)
        const needLC = Number.parseFloat(this.statistics.needLC)
        return lcBala > needLC ? needLC : lcBala
      },
      needPay () {
        const apAcou = Number.parseFloat(this.statistics.apAcou)
        return this.deduction ? (apAcou - this.canDeduction) : apAcou
      },
      payType () {
        return this.deduction ? 'C' : 'A'
      }
    },
    methods: {
      async getAddressList () {
        this.res = await addressList(this)
        if (this.res && this.res.data && this.res.data.length > 0) {
          const addressList = this.res.data
          for (let i = 0; i < addressList.length; i++) {
            if (addressList[i].IsDefu === 'Y') {
              this.address = addressList[i]
              return
            }
          }
          this.address = addressList[0]
        }
      },
      async getOrderBookingList () {
        this.res = await orderBookingList(this, this.isBuyNow, this.addressId, this.skuId, this.buyNowNumber, this.expressName, this.isSelfTake, this.cartIds)
        if (this.res && this.res.data) {
          this.shopList = this.res.data.shoplists
          this.shopList.forEach((item) => {
            let shopCount = 0
            item.produlists.forEach((product) => {
              shopCount += Number.parseInt(product.numbers)
            })
            item.shopCount = shopCount
          })
        }
      },
      async getOrderStatistics () {
        this.res = await orderStatistics(this, this.isBuyNow, this.addressId, this.skuId, this.buyNowNumber, this.expressName, this.isSelfTake, this.cartIds)
        if (this.res && this.res.data) {
          this.statistics = this.res.data
        }
      },
      async orderConfirmToPay () {
        this.loading = this.$createToast({
          txt: '确认订单中...',
          time: 0
        }).show()
        this.res = await orderConfirm(this, this.isBuyNow, this.message, this.payType, this.address.UserAddre_ID, this.invoice.id, this.skuId, this.buyNowNumber, this.expressName, this.isSelfTake)
        this.loading.hide()
        if (this.res && this.res.data) {
          this.$router.push({
            path: '/pay',
            query: {orderIds: this.res.data.ordIds}
          })
        }
      }
    },
    mounted () {
      this.isBuyNow = this.$route.query.isBuyNow
      this.addressId = this.$route.query.addressId
      this.skuId = this.$route.query.skuId
      this.buyNowNumber = this.$route.query.buyNowNumber
      this.expressName = this.$route.query.expressName
      this.isSelfTake = this.$route.query.isSelfTake
      this.cartIds = this.$route.query.cartIds
      this.getAddressList()
      this.getOrderBookingList()
      this.getOrderStatistics()
    }
  }
</script>

<style lang="stylus">
  .order-view {
    padding-bottom: 60px;
  }

  .order-address {
    margin-bottom: 10px;
    &-exist {
      padding: 6px 0;
      color: #333;
    }
    &-location {
      padding-top: 5px;
      font-size: 14px;
      color: $color-light-grey;
    }
    &-without {
      padding: 10px 0;
    }
  }

  .order-list {
    &-item {
      margin-bottom: 10px;
      background-color: #fff;
    }
    &-shop {
      padding: 15px;
    }
    &-express {
      padding: 15px;
      font-size: 14px;
      span {
        float: right;
      }
    }
    &-message {
      padding: 10px 15px 10px 100px;
      position: relative;
      span {
        position: absolute;
        top: 15px;
        left: 15px;
      }
      textarea {
        width: 100%;
        border: none;
        outline: none;
      }
    }
    &-total {
      padding: 15px;
      text-align: right;
      font-size: 14px;
      span {
        color: #ff2150;
      }
    }
  }

  .order-invoice {
    margin-bottom: 10px;
  }

  .order-deduction {
    font-size: 15px;
    background-color: #fff;
    &-cell {
      padding: 10px 15px;
      line-height: 20px;
      span {
        display: inline-block;
        background-color: $color-orange;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        padding: 0 10px;
        vertical-align: middle;
        margin-left: 10px;
      }
    }
    &-arrow::after {
      border: 1px solid #ccc;
      border-bottom-width: 0;
      border-left-width: 0;
      content: " ";
      position: absolute;
      top: 50%;
      right: 20px;
      width: 6px;
      height: 6px;
      transform: translateY(-50%) rotate(135deg);
    }
    &-arrow_open::after {
      transform: translateY(-50%) rotate(-45deg);
    }
    &-content {
      height: 0;
      overflow: hidden;
      &_open {
        height: auto;
      }
    }
    &-info {
      padding: 0 15px 10px;
      font-size: 14px;
      color: $color-orange;
      line-height: 1.4;
    }
  }
  .order-bottom {
    position: fixed;
    width: 100%;
    height: 44px;
    left: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, .05);
    line-height: 44px;
    font-size: 14px;
    color: $color-grey;
    span {
      color: $color-orange;
      padding: 0 6px 0 10px;
    }
    .cube-btn {
      float: right;
      width: 96px;
      height: 100%;
      font-size: 15px;
    }
  }
</style>
