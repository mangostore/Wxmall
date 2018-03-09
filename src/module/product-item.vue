<template>
    <div class="cube-product-item border-bottom-1px" @click="toDetail">
      <div class="cube-product-item-image">
        <img :src="product.AttaUrl">
      </div>
      <div class="cube-product-item-main">
        <h2 class="cube-product-item-title">{{product.ProdTitle}}</h2>
        <div class="cube-product-item-attr">{{attributes}}</div>
        <div class="cube-product-item-lc">可用{{product.MaxUseSpePow}}LC</div>
      </div>
      <div class="cube-product-item-price">
        ￥{{product.Price}}
        <div class="cube-product-item-count">×{{product.numbers}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'cube-product-item',
    props: {
      product: Object
    },
    computed: {
      attributes () {
        let attr = ''
        if (this.product.AttrName) {
          attr += this.product.AttrName + ':' + this.product.AttrValue + ';'
        }
        if (this.product.AttrName1) {
          attr += this.product.AttrName1 + ':' + this.product.AttrValue1 + ';'
        }
        if (this.product.AttrName2) {
          attr += this.product.AttrName2 + ':' + this.product.AttrValue2 + ';'
        }
        if (this.product.AttrName3) {
          attr += this.product.AttrName3 + ':' + this.product.AttrValue3 + ';'
        }
        return attr
      }
    },
    methods: {
      toDetail () {
        this.$router.push({
          path: '/',
          query: {
            id: this.product.Produ_ID
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  .cube-product-item {
    background-color: #fff;
    display: flex;
    padding: 15px;
    line-height: 1.2;
    &-image {
      height: 50px;
      flex: 0 0 50px;
      overflow: hidden;
      img {
        width: 50px;
      }
    }
    &-main {
      padding: 0 15px;
      flex: auto;
    }
    &-title {
      font-size: 14px;
      margin-bottom: 8px;
      font-weight: normal;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    &-attr {
      font-size: 12px;
      color: #999;
      line-height: 1.4;
    }
    &-lc {
      font-size: 12px;
      color: #ff2150;
      padding-top: 5px;
    }
    &-price {
      font-size: 14px;
      color: #ff2150;
    }
    &-count {
      text-align: right;
      color: #333;
      line-height: 1.6;
    }
  }
</style>
