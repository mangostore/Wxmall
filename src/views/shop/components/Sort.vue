<template>
  <div class="sort-view">
    <div class="sort-card" v-for="(item_s, index_s) in cateList" :key="index_s">
      <h2 class="sort-card-title">{{item_s.ShopCateName}}</h2>
      <ul class="sort-card-list">
        <li class="sort-card-item" v-for="(item_i, index_i) in item_s.ChildList" :key="index_i" @click="goToListPage(shopId, item_i.ShopProdCate_ID, item_i.ShopCateName)">
          {{item_i.ShopCateName}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {shopCate} from '../../../service'

  export default {
    name: 'sort',
    data () {
      return {
        shopId: 0,
        cateList: []
      }
    },
    methods: {
      async getShopCate () {
        this.res = await shopCate(this, this.shopId)
        if (this.res && this.res.data) {
          this.cateList = this.res.data
        }
      },
      goToListPage (shopId, cateId, cateName) {
        window.location.href = './sort.html#/search?shopId=' + shopId + '&cateId=' + cateId + '&cateName=' + cateName
      }
    },
    mounted () {
      this.shopId = this.$route.query.id || 0
      this.getShopCate()
    }
  }
</script>

<style lang="stylus">
  .sort-view {
    padding-top: 10px;
  }

  .sort-card {
    margin-bottom: 10px;
    background-color: #fff;
    &-title {
      line-height: 42px;
      padding: 0 10px;
      font-size: 15px;
    }
    &-list {
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }
    &-item {
      float: left;
      width: 49%;
      line-height: 36px;
      background-color: $color-light-grey-ss;
      text-align: center;
      margin-bottom: 5px;
      cursor: pointer;
      &:nth-child(even) {
        margin-left: 2%;
      }
    }
  }
</style>
