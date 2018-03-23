<template>
  <div class="all-view">
    <section class="all-filter">
      <span :class="['all-filter-item', {'all-filter-item_active': type === 'all'}]" @click="selectAll">综合</span>
      <span :class="['all-filter-item', {'all-filter-item_active': type === 'sel'}]" @click="selectSel">销量</span>
      <span :class="['all-filter-item', {'all-filter-item_active': type === 'pri'}]" @click="selectPri">
        价格 <i class="all-filter-order" :class="priceOrderClass"></i>
      </span>
    </section>
    <section class="all-scroll">
      <cube-scroll :data="list" :options="{pullUpLoad: {threshold: 0, txt: {more: '', noMore: '— 到底了，别再拉了 —'}}}" @pulling-up="getNextPageData" ref="scroll">
        <cube-list-item v-for="(item, index) in list" :data="item" :key="index" :card-type="true"></cube-list-item>
      </cube-scroll>
    </section>
  </div>
</template>

<script>
  import {shopProductList} from '../../../service'
  import {CubeListItem} from '../../../module'
  import {mapState} from 'vuex'

  export default {
    name: 'all',
    components: {
      CubeListItem
    },
    data () {
      return {
        type: 'all',
        order: 'desc',
        page: 1,
        list: []
      }
    },
    computed: {
      ...mapState([
        'login', 'userInfo'
      ]),
      priceOrderClass () {
        return {
          'all-filter-order_asc': this.type === 'pri' && this.order === 'asc',
          'all-filter-order_desc': this.type === 'pri' && this.order === 'desc'
        }
      }
    },
    methods: {
      async getShopProductList () {
        if (this.pageIndex === 1) {
          this.loading = this.$createToast({
            time: 0
          }).show()
        }
        this.res = await shopProductList(this, this.$route.query.id || 0, this.type, this.order, this.pageIndex)
        this.loading.hide()
        if (this.res && this.res.data) {
          this.list = this.list.concat(this.res.data)
          if (this.res.data.length < 10) this.$refs.scroll.forceUpdate(false)
        } else {
          this.$refs.scroll.forceUpdate(false)
        }
      },
      getFirstPageData () {
        this.pageIndex = 1
        this.list = []
        this.$refs.scroll.pullUpDirty = true
        this.getShopProductList()
      },
      getNextPageData () {
        this.pageIndex = this.pageIndex + 1
        this.getShopProductList()
      },
      selectAll () {
        this.type = 'all'
        this.order = 'desc'
        this.getFirstPageData()
      },
      selectSel () {
        this.type = 'sel'
        this.order = 'desc'
        this.getFirstPageData()
      },
      selectPri () {
        this.type = 'pri'
        if (this.order === 'desc') {
          this.order = 'asc'
        } else {
          this.order = 'desc'
        }
        this.getFirstPageData()
      }
    },
    mounted () {
      this.getFirstPageData()
    }
  }
</script>

<style lang="stylus">
  .all-filter {
    line-height: 32px;
    display: flex;
    background-color: #fff;
    &-item {
      flex: 1 0 auto;
      text-align: center;
      &_active {
        color: $color-orange;
      }
    }
    &-order {
      display: inline-block;
      width: 7px;
      height: 14px;
      vertical-align: middle;
      background: url('../images/order_sprites.png') no-repeat;
      background-size: 7px 42px;
      position: relative;
      left: 3px;
      background-position: 0 -32px
      &_desc {
        background-position: 0 2px;
      }
      &_asc {
        background-position: 0 -16px;
      }
    }
  }

  .all-scroll {
    position: fixed;
    top: 146px;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 5px;
    .cube-scroll-list-wrapper::after {
      content: '';
      display: block;
      clear: both;
    }
  }
</style>
