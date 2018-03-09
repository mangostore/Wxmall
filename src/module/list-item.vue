<template>
  <a class="cube-list-item" :class="{'cube-list-item_card': cardType}" :href="'./detail.html#/?id=' + data.Produ_ID">
    <div class="cube-list-item-image">
      <img v-lazy="data.AttaUrl"/>
    </div>
    <div class="cube-list-item-info border-bottom-1px">
      <h3 class="cube-list-item-title">{{data.ProdTitle}}</h3>
      <div class="cube-list-item-price">
        <span class="cube-list-item-unit">¥</span> {{data.ShopPrice}}
        <span class="cube-list-item-postage" v-if="data.StartFree">包邮</span>
      </div>
      <div class="cube-list-item-bottom">
        {{Number(data.MaxUseSpePow) > 0 ? ('可用LC' + data.MaxUseSpePow) : ('奖励LC' + data.PreSpePower)}}
        <span class="cube-list-item-right">{{data.SaleCount}}人成交</span>
      </div>
    </div>
  </a>
</template>

<script>
  import '../basic/libs/rem'

  export default {
    props: {
      data: Object,
      cardType: Boolean
    }
  }
</script>

<style lang="stylus">
.cube-list-item {
  display: block;
  position: relative;
  padding: 4px 10px 4px 1.4rem;
  background: #fff;
  z-index: 0;
  &-image {
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    overflow: hidden;
    top: 4px;
    left: 10px;
    img {
      width: 100%;
    }
  }
  &-info {
    height: 1.2rem;
  }
  &-title {
    height: 40px;
    font-size: 14px;
    color: #333;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
  }
  &-price {
    font-size: 18px;
    color: $color-orange;
    margin-bottom: 12px;
  }
  &-unit {
    font-size: 14px;
  }
  &-postage {
    font-size: 10px;
    color: #fb9425;
    line-height: 1;
    padding: 2px 2px 1px;
    border-radius: 2px;
    border: 1px solid #fb9425;
    position: relative;
    top: -3px;
  }
  &-bottom {
    font-size: 12px;
  }
  &-right {
    float: right;
  }
  &_card {
    float: left;
    box-sizing: border-box;
    width: 50%;
    background: transparent;
    padding: 5px;
    &:nth-child(odd) {
      padding-left: 10px;
    }
    &:nth-child(even) {
      padding-right: 10px;
    }
    .cube-list-item-image {
      position: relative;
      top: 0;
      left: 0;
      width: 1.725rem;
      height: 1.725rem;
      background: #fff;
      z-index: 0;
    }
    .cube-list-item-info {
      box-sizing: border-box;
      background: #fff;
      height: 1.1rem;
      padding: 10px;
    }
  }
}
</style>
