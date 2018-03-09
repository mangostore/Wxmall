<template>
  <div class="detail-view" v-if="productDetail" v-title="'商品详情'">
    <cube-scroll :options="scrollOptions" :data="showImageText" @pulling-up="pullingUpShowImageText" ref="scroll">
      <div slot="pullup"></div>

      <section class="detail-top">
        <div class="detail-top-slide">
          <cube-slide>
            <cube-slide-item v-for="(item, index) in productDetail.ProduAtta" :key="index" :auto-play="false">
              <img :src="item.AttaUrl">
            </cube-slide-item>
          </cube-slide>
        </div>
        <div class="detail-top-info">
          <div class="detail-top-title">
            {{productDetail.ProduTitle}}
            <div class="detail-top-favorite" :class="{'detail-top-favorite_done': productDetail.ProduFavoState === 2}" @click="productFavoriteClick">
              <template v-if="productDetail.ProduFavoState === 2">
                <i class="iconfont icon-shoucang"></i>
                <div class="detail-top-label">已收藏</div>
              </template>
              <template v-else>
                <i class="iconfont icon-shoucang1"></i>
                <div class="detail-top-label">收藏</div>
              </template>
            </div>
          </div>
          <div class="detail-top-price">
            <span class="detail-top-unit">¥</span>{{productDetail.ShopPrice.split('.')[0]}}<span class="detail-top-point">.{{productDetail.ShopPrice.split('.')[1]}}</span>
            <span class="detail-top-free" v-if="selectedExpress && selectedExpress.Free === 'Y'">包邮</span>
            <div class="detail-top-postage">{{selectedExpress ? ('邮费 ' + Number(selectedExpress.StartFee).toFixed(2)) : '该地区不支持配送'}}</div>
          </div>
          <div class="detail-top-lc border-top-1px">
            <span class="detail-top-sale">{{productDetail.SaleCount}}人成交</span>
            <span v-if="Number(productDetail.MaxUseSpePow) > 0">可用LC{{productDetail.MaxUseSpePow}}</span>
            <span v-else>奖励LC{{productDetail.PreSpePower}}</span>
          </div>
        </div>
      </section>

      <section class="detail-attributes">
        <cube-cell :title="'已选择： ' + selectedAttributes.valueText" to="/" @click.native="showAttributes"/>
      </section>

      <section class="detail-address">
        <cube-cell @click.native="showAddress" to="/">
          <div slot="title">
            送至：  <i class="iconfont icon-dibiao"></i> {{address.name}}
          </div>
        </cube-cell>
      </section>

      <section class="detail-other">
        <div class="detail-other-item border-bottom-1px">
          <label class="detail-other-label">服务承诺</label>
          <div class="detail-other-content">
            <span v-for="(item, index) in productDetail.ProdServs" :key="index"><i class="iconfont icon-1"></i>{{item.ServName}}</span>
          </div>
        </div>
        <div class="detail-other-item">
          <label class="detail-other-label">支付方式</label>
          <div class="detail-other-content">
            <span>账户余额</span>
            <span>微信支付</span>
          </div>
        </div>
      </section>

      <section class="detail-evaluation">
        <div class="detail-evaluation-cell">
          <cube-cell :title="'商品评价(' + evaluations.EvaluationCount + ')'" to="/evaluation"/>
        </div>
        <cube-evaluation-item :data="evaluations.Evaluation[0]"/>
        <router-link class="detail-evaluation-more" :to="'/evaluation?id=' + this.productId">查看更多评价</router-link>
      </section>

      <section class="detail-shop">
        <div class="detail-shop-top clear-fix">
          <div class="detail-shop-logo">
            <img :src="productDetail.ShopLogo">
          </div>
          <div class="detail-shop-favorite" :class="{'detail-shop-favorite_done': productDetail.ShopsFavoState === 2}" @click="shopFavoriteClick">
            <template v-if="productDetail.ShopsFavoState === 2">
              <i class="iconfont icon-heart"></i>
              <div class="detail-shop-label">已收藏</div>
            </template>
            <template v-else>
              <i class="iconfont icon-xin"></i>
              <div class="detail-shop-label">收藏店铺</div>
            </template>
          </div>
          <div class="detail-shop-name">{{productDetail.ShopName}}</div>
        </div>
        <div class="detail-shop-btns">
          <a class="detail-shop-btn" :href="'tel:' + productDetail.ShopPhone">联系供应商</a>
          <a class="detail-shop-btn" :href="'./shop.html?id=' + productDetail.ShopsID">进入店铺</a>
        </div>
      </section>

      <section class="detail-tips" v-if="!showImageText[0]">继续上拉，查看图文详情</section>

      <section class="detail-main" v-if="showImageText[0]">
        <cube-sticky ref="sticky">
          <cube-tab v-model="tabIndex">
            <cube-tab-item selected>商品介绍</cube-tab-item>
            <cube-tab-item>参数详情</cube-tab-item>
            <cube-tab-item>售后保障</cube-tab-item>
          </cube-tab>
        </cube-sticky>
        <div class="detail-main-content" v-html="imgHtml" v-show="this.tabIndex === 0" :style="{minHeight: contentMinHeight}"></div>
        <div class="detail-main-content" v-html="paraHtml" v-show="this.tabIndex === 1" :style="{minHeight: contentMinHeight}"></div>
        <div class="detail-main-content" v-html="custHtml" v-show="this.tabIndex === 2" :style="{minHeight: contentMinHeight}"></div>
      </section>
    </cube-scroll>

    <section class="detail-bottom border-top-1px">
      <ul class="detail-bottom-btns">
        <li class="detail-bottom-link">
          <a :href="'tel:' + productDetail.ShopPhone">
            <i class="iconfont icon-kefu"></i>
            <div class="detail-bottom-label">客服</div>
          </a>
        </li>
        <li class="detail-bottom-link">
          <a :href="'./shop.html?id=' + productDetail.ShopsID">
            <i class="iconfont icon-dianpu"></i>
            <div class="detail-bottom-label">店铺</div>
          </a>
        </li>
        <li class="detail-bottom-link">
          <a href="./cart.html">
            <cube-badge :text="cartCount"/>
            <i class="iconfont icon-gouwuche"></i>
            <div class="detail-bottom-label">购物车</div>
          </a>
        </li>
        <li class="detail-bottom-btn detail-bottom-btn_add" @click="addToCart">加入购物车</li>
        <li class="detail-bottom-btn detail-bottom-btn_buy" @click="buyNow">立即购买</li>
      </ul>
    </section>

    <cube-popup-bottom ref="attrPopup">
      <div class="detail-attributes-panel">
        <div class="detail-attributes-info border-bottom-1px">
          <div class="detail-attributes-image">
            <img :src="productDetail.SkuAttaUrl || productDetail.ProduAtta[0].AttaUrl">
          </div>
          <div class="detail-attributes-price">¥{{productDetail.ShopPrice}}</div>
          <p>库存<span class="detail-attributes-stock">{{productDetail.StockCount}}</span>件</p>
          <p>已选择：<span class="detail-attributes-selected">{{selectedAttributes.valueText}}</span></p>
        </div>
        <div class="detail-attributes-item border-bottom-1px" v-for="(item, index) in productDetail.ProduAttributes" :key="index">
          {{item.IbutesName}}
          <cube-checker v-model="selectedAttributes.valueArray[index]" :radioRequired="true">
            <cube-checker-item v-for="(item2, index2) in item.AttrList" :key="index2" :value="item2.ValueID" @on-item-click="changeSelectedAttribute(index, index2)">{{item2.Value}}</cube-checker-item>
          </cube-checker>
        </div>
        <div class="detail-attributes-item border-bottom-1px" v-if="selectedExpress">
          邮寄方式
          <cube-checker :radioRequired="true" v-model="selectedExpress">
            <cube-checker-item v-for="(item, index) in productDetail.ProduTraExp" :key="index" :value="item">
              {{item.ExpressName + '：' + ((item.Free === 'Y') ? '包邮' : (item.StartFee + '元'))}}
            </cube-checker-item>
          </cube-checker>
        </div>
        <div class="detail-attributes-item border-bottom-1px">
          数量
          <div class="detail-attributes-number">
            <cube-number v-model="count" :min="1" :max="productDetail.StockCount"/>
          </div>
        </div>
        <div class="detail-attributes-ensure">
          <cube-button :primary="true" @click="attrEnsure">确定</cube-button>
        </div>
      </div>
    </cube-popup-bottom>

    <cube-popup-bottom ref="addrPopup">
      <div class="detail-address-panel">
        <div class="detail-address-title">配送至</div>
        <ul class="detail-address-list">
          <li class="detail-address-item border-bottom-1px" v-for="(item, index) in addressList" :key="index" @click="selectedAddress(item)">
            <i class="iconfont icon-dibiao"></i> {{item.ProvinceCitName}}
          </li>
        </ul>
        <div class="detail-address-add">
          <cube-button :primary="true" @click="selectedNewAddress">选择新地址</cube-button>
        </div>
      </div>
    </cube-popup-bottom>
  </div>
</template>

<script>
  import {
    productDetail,
    productSkuInfo,
    addressList,
    postageByAreaID,
    allArea,
    productEvaluation,
    productFavoriteAdd,
    productFavoriteDelete,
    shopFavoriteAdd,
    shopFavoriteDelete,
    cartCount,
    productIntroduction,
    addToCartGetCount
  } from '../../../service'
  import {CubeCell, CubeChecker, CubeCheckerItem, CubeNumber, CubeBadge, CubeTab, CubeTabItem, CubeSticky} from '../../../basic'
  import {CubePopupBottom, CubeEvaluationItem} from '../../../module'
  import {mapState} from 'vuex'

  export default {
    components: {
      CubeCell,
      CubePopupBottom,
      CubeChecker,
      CubeCheckerItem,
      CubeNumber,
      CubeEvaluationItem,
      CubeBadge,
      CubeTab,
      CubeTabItem,
      CubeSticky
    },
    data () {
      return {
        productId: 0,                 // 商品ID
        productDetail: null,          // 商品详情
        selectedExpress: {},          // 选择的邮寄方式及费用
        count: 1,                     // 选择的商品数量
        address: {                    // 配送地址
          id: 0,
          name: '湖南省长沙市'
        },
        addressList: [],              // 用户收货地址列表
        areaCascadeData: [],          // 省市区级联数据
        evaluations: {                // 商品评价数据
          EvaluationCount: 0,
          GoodEvaluationCount: 0,
          MiddleEvaluationCount: 0,
          BadEvaluationCount: 0,
          Evaluation: [],
          GoodEvaluation: [],
          MiddleEvaluation: [],
          BadEvaluation: []
        },
        pageIndex: [1, 1, 1, 1],
        showImageText: [false],        // 是否显示图文详情
        cartCount: 0,                  // 购物车数量
        tabIndex: -1,                  // 商品介绍tab当前位置
        imgHtml: '',                   // 商品介绍内容
        paraHtml: '',                  // 参数详情内容
        custHtml: '',                  // 售后保障内容
        contentMinHeight: '',          // 图文详情内容最小高度，保证能滚动到tab固定位置
        scrollOptions: {               // 滚动配置
          click: true,
          pullUpLoad: {
            threshold: -50
          }
        },
        ensureAttrStatus: 0             // 确定属性后行为   0： 无其他操作  1：加入购物车  2：立即购买
      }
    },
    computed: {
      ...mapState([                    // 用户登录信息
        'login', 'userInfo'
      ]),
      selectedAttributes () {         // 转换选择的属性用于展示和发起请求
        const selected = {
          valueArray: [],
          valueId: '',
          valueText: ''
        }
        if (this.productDetail) {
          this.productDetail.ProduAttributes.forEach((item) => {
            item.AttrList.forEach((item2) => {
              if (item2.Select === 'active') {
                selected.valueArray.push(item2.ValueID)
                selected.valueId += item2.ValueID + ','
                selected.valueText += ' “' + item2.Value + '” ,'
              }
            })
          })
        }
        selected.valueId = selected.valueId.replace(/,$/g, '')
        selected.valueText = selected.valueText.replace(/,$/g, '')
        return selected
      }
    },
    methods: {
      async getProductDetail () {           // 获取商品详情数据
        this.res = await productDetail(this, this.productId)
        if (this.res && this.res.data) {
          this.productDetail = this.res.data
          this.selectedExpress = this.productDetail.ProduTraExp[0]
        }
      },
      async changeSelectedAttribute (indexA, indexB) {      // 改变选择的属性，请求获取库存信息
        if (this.productDetail.ProduAttributes[indexA].AttrList[indexB].Select === 'active') return false
        this.res = await productSkuInfo(this, this.productId, this.selectedAttributes.valueId)
        if (this.res && this.res.data) {
          Object.assign(this.productDetail, this.res.data)
          this.productDetail.ProduAttributes[indexA].AttrList.forEach((item, index) => {
            if (index === indexB) {
              item.Select = 'active'
            } else {
              item.Select = ''
            }
          })
        }
      },
      async getAddressList () {       //  获取用户收货地址列表，默认地址设置为配送地址
        this.res = await addressList(this)
        if (this.res && this.res.data) {
          this.addressList = this.res.data
          this.addressList.forEach((item) => {
            if (item.IsDefu === 'Y') {
              this.address.name = item.ProvinceCitName
              this.address.id = item.CitAreStrt_ID
            }
          })
        }
      },
      async getPostageByAreaID () {    // 修改配送地址重新获取邮费信息
        this.res = await postageByAreaID(this, this.productId, this.address.id)
        if (this.res && this.res.data) {
          this.selectedExpress.StartFee = this.res.data[0].StartFee
          this.selectedExpress.Free = this.res.data[0].Free
        }
      },
      async getAllArea () {           // 获取省市区级联数据
        this.res = await allArea(this)
        if (this.res && this.res.data) {
          this.areaCascadeData = this.res.data
        }
      },
      async getProductEvaluation (type) {    // 获取评价数据，type 0：全部 1：好评 2：中评 3：差评
        this.res = await productEvaluation(this, this.productId, this.pageIndex[type], type)
        if (this.res && this.res.data) {
          if (type === 0) {
            if (this.pageIndex[0] === 1) {
              this.evaluations.EvaluationCount = this.res.data.EvaluationCount
              this.evaluations.GoodEvaluation = this.res.data.GoodEvaluation
              this.evaluations.MiddleEvaluation = this.res.data.MiddleEvaluation
              this.evaluations.BadEvaluation = this.res.data.BadEvaluation
            }
            this.evaluations.Evaluation = this.evaluations.Evaluation.concat(this.res.data.Evaluations)
          }
          if (type === 1) this.evaluations.GoodEvaluation = this.evaluations.GoodEvaluation.concat(this.res.data.GoodEvaluation)
          if (type === 2) this.evaluations.MiddleEvaluation = this.evaluations.MiddleEvaluation.concat(this.res.data.MiddleEvaluation)
          if (type === 3) this.evaluations.BadEvaluation = this.evaluations.BadEvaluation.concat(this.res.data.BadEvaluation)
        }
      },
      async productFavoriteAdd () {          // 收藏商品
        this.res = await productFavoriteAdd(this, this.productId, this.productDetail.ProduSkusID)
        if (this.res && this.res.data) {
          this.productDetail.ProduFavoState = 2
        }
      },
      async productFavoriteDelete () {        // 取消收藏商品
        this.res = await productFavoriteDelete(this, this.productId, this.productDetail.ProduSkusID)
        if (this.res && this.res.data) {
          this.productDetail.ProduFavoState = 1
        }
      },
      async shopFavoriteAdd () {              // 收藏店铺
        this.res = await shopFavoriteAdd(this, this.productDetail.ShopsID)
        if (this.res && this.res.data) {
          this.productDetail.ShopsFavoState = 2
        }
      },
      async shopFavoriteDelete () {           // 取消收藏店铺
        this.res = await shopFavoriteDelete(this, this.productDetail.ShopsID)
        if (this.res && this.res.data) {
          this.productDetail.ShopsFavoState = 1
        }
      },
      async getCartCount () {         // 获取购物车数量
        this.res = await cartCount(this)
        if (this.res && this.res.data) {
          this.cartCount = Number.parseInt(this.res.data)
        }
      },
      async getProductIntroduction (type) {       // 获取商品介绍tab内容
        this.res = await productIntroduction(this, this.productId, type)
        if (this.res && this.res.data) {
          if (type === 'Img') this.imgHtml = this.res.data.ProduContent
          if (type === 'Para') this.paraHtml = this.res.data.ProduPara
          if (type === 'Cust') this.custHtml = this.res.data.CustService
        }
      },
      showAttributes () {              // 显示商品属性弹出层
        this.ensureAttrStatus = 0
        this.$refs.attrPopup.show()
      },
      showAddress () {                 // 显示配送地址弹出层，未登录跳转至登录
        if (this.login) {
          this.$refs.addrPopup.show()
        } else {
          window.location.href = './mine.html#/login'
        }
      },
      selectedAddress (item) {          // 通过用户收货地址选择配送地址
        this.$refs.addrPopup.cancel()
        if (item.CitAreStrt_ID === this.address.id) return false
        this.address.name = item.ProvinceCitName
        this.address.id = item.CitAreStrt_ID
        this.getPostageByAreaID()
      },
      selectedNewAddress () {            // 选择新的配送地址
        this.$refs.addrPopup.cancel()
        this.getAllArea()
      },
      productFavoriteClick () {          // 切换商品收藏取消
        if (this.login) {
          if (this.productDetail.ProduFavoState === 2) {
            this.productFavoriteDelete()
          } else {
            this.productFavoriteAdd()
          }
        } else {
          window.location.href = './mine.html#/login'
        }
      },
      shopFavoriteClick () {              // 切换店铺收藏取消
        if (this.login) {
          if (this.productDetail.ShopsFavoState === 2) {
            this.shopFavoriteDelete()
          } else {
            this.shopFavoriteAdd()
          }
        } else {
          window.location.href = './mine.html#/login'
        }
      },
      pullingUpShowImageText () {
        if (!this.showImageText[0]) {
          this.$set(this.showImageText, 0, true)
          this.$nextTick(() => {
            this.contentMinHeight = this.$refs.scroll.$el.clientHeight - this.$refs.sticky.$el.clientHeight + 'px'     // 获取$refs.sticky需要在显示后
            this.$refs.scroll.scrollToElement('.cube-sticky', 500)
          })
        }
      },
      addToCart () {
        this.ensureAttrStatus = 1
        this.$refs.attrPopup.show()
      },
      buyNow () {
        this.ensureAttrStatus = 2
        this.$refs.attrPopup.show()
      },
      async attrEnsure () {
        this.$refs.attrPopup.cancel()
        if (this.ensureAttrStatus === 1) {
          this.res = await addToCartGetCount(this, this.productDetail.ProduSkusID, this.count, this.login, this.selectedExpress.ExpressName)
          if (this.res === false) return
          this.cartCount = this.res.data
          this.$createToast({
            type: 'correct',
            time: 1500,
            txt: '加入购物车成功'
          }).show()
        }
        if (this.ensureAttrStatus === 2) {
          const params = {
            isBuyNow: true,
            addressId: this.address.id,
            skuId: this.productDetail.ProduSkusID,
            buyNowNumber: this.count,
            expressName: this.selectedExpress.ExpressName,
            isSelfTake: false
          }
          this.$router.push({
            path: '/order',
            query: params
          })
        }
      }
    },
    mounted () {
      this.productId = this.$route.query.id || 0    // 通过路径参数获取商品ID
      this.getProductDetail()
      this.getProductEvaluation(0)
      if (this.login) {
        this.getAddressList()
        this.getCartCount()
      }
      this.getProductIntroduction('Img')
      this.getProductIntroduction('Para')
      this.getProductIntroduction('Cust')
    },
    watch: {
      login () {                              // 登录成功重新获取数据
        if (this.login) {
          this.getAddressList()
          this.getCartCount()
        }
      }
    }
  }
</script>

<style lang="stylus">
  .detail-view {
    padding-bottom: 50px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .detail-top {
    background-color: #fff;
    margin-bottom: 10px;
    &-slide {
      height: 3.75rem;
      overflow: hidden;
    }
    &-info {
      padding: 10px;
    }
    &-title {
      position: relative;
      height: 46px;
      overflow: hidden;
      font-size: 18px;
      font-weight: 400;
      line-height: 1.2;
      padding-right: 50px;
    }
    &-favorite {
      position: absolute;
      box-sizing: border-box;
      width: 50px;
      height: 50px;
      text-align: center;
      top: -10px;
      right: -10px;
      padding-top: 10px;
      color: $color-light-grey;
      transition: all .3s;
      .iconfont {
        font-size: 20px;
      }
      &_done {
        color: $color-orange;
      }
    }
    &-label {
      font-size: 10px;
    }
    &-price {
      color: $color-orange;
      font-size: 24px;
    }
    &-unit {
      font-size: 14px;
    }
    &-point {
      font-size: 18px;
    }
    &-free {
      display: inline-block;
      vertical-align: middle;
      padding: 3px 5px 2px;
      font-size: 12px;
      color: #fff;
      background: $color-orange;
      margin-top: -3px;
    }
    &-postage {
      font-size: 12px;
      color: $color-light-grey;
      padding: 5px 0 20px;
    }
    &-lc {
      font-size: 14px;
      color: $color-light-grey;
      padding-top: 10px;
    }
    &-sale {
      float: right;
    }
  }

  .detail-attributes {
    margin-bottom: 10px;
    &-panel {
      box-sizing: border-box;
      height: 450px;
      overflow: auto;
      padding: 10px;
      padding-bottom: 60px;
    }
    &-info {
      position: relative;
      padding: 0 20px 10px 100px;
      min-height: 75px;
      font-size: 13px;
      line-height: 1.4;
      color: $color-light-grey;
    }
    &-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 75px;
      height: 75px;
      overflow: hidden;
      border: 1px solid $color-light-grey-ss;
      display: flex;
      align-items: center;
      justify-content: center;
      >img {
        max-width: 100%;
      }
    }
    &-price {
      padding-bottom: 5px;
      font-size: 16px;
      color: $color-orange;
    }
    &-selected {
      color: $color-orange;
    }
    &-item {
      padding: 10px 0;
      color: $color-light-grey;
      .cube-checker {
        padding-top: 10px;
      }
      .cube-checker-item {
        background: $color-light-grey-ss;
        color: $color-grey;
        margin: 0 5px 5px 0;
        border-radius: 4px;
        font-size: 12px;
        vertical-align: middle;
        padding: 7px 10px;
        &_selected {
          background: $color-orange;
          color: #fff;
        }
      }
    }
    &-number {
      padding-top: 10px;
    }
    &-ensure {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      height: 44px;
    }
    >.cube-cell:active {
      background: #fff;
    }
    .cube-cell-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .detail-address {
    margin-bottom: 10px;
    &-panel {
      box-sizing: border-box;
      height: 450px;
      overflow: auto;
      padding: 10px;
      padding-bottom: 60px;
    }
    &-title {
      line-height: 1.5;
      text-align: center;
    }
    &-list {
      padding-top: 20px;
    }
    &-item {
      line-height: 44px;
      font-size: 14px;
      &:active {
        background: rgba(0, 0, 0, .02);
      }
    }
    &-add {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      height: 44px;
    }
    >.cube-cell {
      .iconfont {
        color: $color-orange;
      }
      &:active {
        background: #fff;
      }
    }
    .cube-cell-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .detail-other {
    background: #fff;
    margin-bottom: 10px;
    padding: 0 10px;
    &-item {
      line-height: 26px;
      position: relative;
      padding: 10px 0 10px 70px;
      font-size: 15px;
    }
    &-label {
      position: absolute;
      top: 10px;
      left: 0;
    }
    &-content {
      >span {
        display: inline-block;
        padding: 0 6px;
      }
      .iconfont {
        color: $color-orange;
        margin-right: 4px;
      }
    }
  }

  .detail-evaluation {
    background: #fff;
    margin-bottom: 10px;
    &-more {
      display: block;
      line-height: 44px;
      text-align: center;
      font-size: 14px;
      &:active {
        background-color: rgba(0, 0, 0, .04);
      }
    }
  }

  .detail-shop {
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
    &-logo {
      float: left;
      display: flex;
      width: 50px;
      height: 50px;
      border: 1px solid $color-light-grey-ss;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      >img {
        max-width: 100%;
      }
    }
    &-favorite {
      float: right;
      width: 50px;
      height: 50px;
      text-align: center;
      margin-top: 10px;
      color: $color-light-grey;
      transition: all .3s;
      .iconfont {
        font-size: 20px;
      }
      &_done {
        color: $color-orange;
      }
    }
    &-label {
      padding-top: 5px;
      font-size: 12px;
    }
    &-name {
      font-size: 14px;
      line-height: 1.3;
      padding: 5px 55px 10px 60px;
    }
    &-btns {
      text-align: center;
      padding: 5px; 0;
    }
    &-btn {
      display: inline-block;
      padding: 8px 30px;
      margin: 0 6px;
      border-radius: 6px;
      border: 1px solid $color-light-grey-ss;
      font-size: 15px;
      &:active {
        background: rgba(0, 0, 0, .04);
      }
    }
  }

  .detail-tips {
    font-size: 14px;
    color: $color-light-grey;
    line-height: 44px;
    text-align: center;
  }

  .detail-main {
    &-content {
      background: #fff;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 1.5;
      padding: 10px;
      min-height: 100%;
      img {
        width: 100%
        height: auto;
        vertical-align: middle;
      }
    }
  }
  .detail-bottom {
    position: fixed!important;
    right: 0;
    left: 0;
    bottom: 0;
    height: 50px;
    background: #fff;
    z-index: 9;
    &-link {
      width: 15%;
      height: 50px;
      float: left;
      text-align: center;
      position: relative;
      box-sizing: border-box;
      padding-top: 10px;
      >a {
        display: block;
        height: 100%;
        color: $color-grey;
      }
      .iconfont {
        font-size: 16px;
      }
      .cube-badge {
        position: absolute;
        top: 8px;
        right: 8px;
      }
      &:active {
        background: rgba(0, 0, 0, .04);
      }
    }
    &-label {
      font-size: 12px;
      padding-top: 5px;
    }
    &-btn {
      width: 27.5%;
      height: 50px;
      float: left;
      font-size: 14px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      position: relative;
      &_add {
        background: #54c1ff;
      }
      &_buy {
        background: $color-orange;
      }
      &_disabled {
        background: $color-light-grey;
      }
      &:active {
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, .04);
        }
      }
    }
  }
</style>
