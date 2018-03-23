<template>
  <div class="cart-item" v-if="data">
    <cube-checkbox class="cart-item-shop" v-model="totalChecked">
      <div @click="goToShop(data.Shops_ID)">
        {{data.ShopName}} <i class="cubeic-arrow"></i>
      </div>
    </cube-checkbox>
    <cube-checkbox-group v-model="checkList">
      <cube-checkbox class="cart-item-product" v-for="(product, index) in data.produlists" :option="JSON.stringify(product)" :key="index">
        <div class="cart-item-content" @click="goToDetail(product.Produ_ID)">
          <div class="cart-item-img">
            <img :src="product.AttaUrl">
          </div>
          <h2 class="cart-item-title">{{product.ProdTitle}}</h2>
          <div class="cart-item-attr">
            <span v-if="product.AttrName">{{product.AttrName}}:{{product.AttrValue}}</span>
            <span v-if="product.AttrName1">{{product.AttrName1}}:{{product.AttrValue1}}</span>
            <span v-if="product.AttrName2">{{product.AttrName2}}:{{product.AttrValue2}}</span>
            <span v-if="product.AttrName3">{{product.AttrName3}}:{{product.AttrValue3}}</span>
            <span v-if="product.AttrName4">{{product.AttrName4}}:{{product.AttrValue4}}</span>
          </div>
          <div class="cart-item-price">¥<span>{{product.Price.split('.')[0]}}</span>.{{product.Price.split('.')[1]}}</div>
        </div>
        <cube-number v-model="product.numbers" :min="1" :max="Number.parseInt(product.StockNum)" width="28px"></cube-number>
      </cube-checkbox>
    </cube-checkbox-group>
  </div>
</template>

<script>
  import {CubeNumber} from '../../../basic'

  export default {
    name: 'cart-item',
    components: {
      CubeNumber
    },
    props: {
      data: Object
    },
    data () {
      return {
        checkList: []
      }
    },
    computed: {
      productCount () {
        return this.data ? this.data.produlists.length : 0
      },
      totalChecked: {
        get () {
          return this.checkList.length === this.productCount
        },
        set (newValue) {
          if (newValue) {
            let checkList = []
            this.data.produlists.forEach(function (item) {
              checkList.push(JSON.stringify(item))
            })
            this.checkList = checkList
          } else {
            this.checkList.splice(0)
          }
        }
      }
    },
    methods: {
      goToShop (id) {
        window.location.href = './shop.html#/?id=' + id
      },
      goToDetail (id) {
        window.location.href = './detail.html#/?id=' + id
      }
    },
    watch: {
      checkList () {
        this.$emit('checked', this.checkList)
      }
    }
  }
</script>

<style lang="stylus">
  .cart-item {
    margin-bottom: 10px;
    background-color: #fff;
    font-size: 14px;

    .cube-checkbox {
      padding: 0 10px;
    }

    .cube-checkbox-input {
      width: 14px;
    }

    &-product {
      .cube-checkbox-label {
        position: relative;
        box-sizing: border-box;
        padding-left: 80px;
        width: 100%;
      }
    }

    &-img {
      width: 62px;
      height: 62px;
      border-radius: 4px;
      border: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      img {
        max-width: 100%;
      }
    }

    &-title {
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      color: $color-dark-grey;
      min-height: 36px;
      line-height: 1.3;
      margin-bottom: 4px;
    }

    &-attr {
      font-size: 11px;
      span {
        margin-right: 3px;
      }
    }

    &-price {
      color: $color-orange;
      font-size: 12px;
      padding-top: 5px;
      span {
        font-size: 16px;
      }
    }

    .cube-number {
      position: absolute;
      right: 0;
      bottom: 0;
      .cube-number-selector {
        padding: 5px;
        height: 14px;
        line-height: 1;
        font-size: 14px;
        svg {
          width: 14px!important;
          height: 14px!important;
        }
      }
      .cube-number-input {
        font-size: 15px;
        height: 18px;
      }
    }
  }
</style>
