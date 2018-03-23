<template>
  <div class="list-view" v-title="'商品列表'">
    <cube-drawer :show.sync="filterShow" show-mode="push" placement="right" :drawer-style="{width: '90%', background: '#fff'}">
      <cube-scroll :data="list" :options="{pullUpLoad: {threshold: 0, txt: {more: '', noMore: '— 到底了，别再拉了 —'}}}" @pulling-up="getNextPageData" ref="scroll">
        <div class="list-top border-bottom-1px">
          <cube-search placeholder="请输入商品名称" v-model="searchValue" @focus="toSearchPage"/>
          <div class="list-top-type" @click="typeChange">
            <i class="iconfont" :class="cardType ? 'icon-Grid' : 'icon-List'"></i>
          </div>
        </div>
        <ul class="list-filter border-bottom-1px">
          <li :class="{'list-filter-active': SortType === 'all'}" @click="overallSort">综合排序</li>
          <li :class="{'list-filter-active': SortType === 'sel'}" @click="sellSort">销售优先</li>
          <li :class="{'list-filter-active': SortType === 'pri'}" @click="priceSort">
            价格<i class="list-filter-order" :class="priceOrderClass"></i>
          </li>
          <li @click="filterSort">筛选<i class="iconfont icon-shaixuan"></i></li>
        </ul>
        <div class="list-wrapper clear-fix">
          <cube-list-item v-for="(item, index) in list" :data="item" :key="index" :cardType="cardType"/>
        </div>
      </cube-scroll>
      <div slot="drawer" class="list-drawer">
        <div class="list-drawer-price border-bottom-1px">
          价格区间(元）
          <input type="number" class="list-drawer-input" placeholder="最低价" v-model="PriceMin">
          -
          <input type="number" class="list-drawer-input" placeholder="最高价" v-model="PriceMax">
        </div>
        <div class="list-drawer-attribute border-bottom-1px" v-for="(sort, index) in attributes" :key="index" v-if="attributes">
          <div class="list-drawer-title">{{sort.AttributesName}}
            <span class="list-drawer-collapse" :class="{'list-drawer-collapse_show': collapse[index]}" @click="collapseToggle(index)">
              <i class="cubeic-arrow"></i>
            </span>
          </div>
          <cube-checker class="list-drawer-checker" :class="{'list-drawer-checker_show': collapse[index]}" v-model="selectedAttributes[index]">
            <cube-checker-item v-for="(val, index) in sort.AttrValueList" :key="index" :value="val.AttrValues_ID">
              {{val.AttrValue}}
            </cube-checker-item>
          </cube-checker>
        </div>
        <div class="list-drawer-btns clear-fix">
          <div class="list-drawer-reset" @click="resetFilter">重置</div>
          <div class="list-drawer-ensure" @click="ensureFilter">确定</div>
        </div>
      </div>
    </cube-drawer>
  </div>
</template>

<script>
  import {CubeDrawer, CubeChecker, CubeCheckerItem} from '../../../basic'
  import {CubeSearch, CubeListItem} from '../../../module'
  import {productList, filterAttributes} from '../../../service'

  export default {
    components: {
      CubeDrawer,
      CubeSearch,
      CubeListItem,
      CubeChecker,
      CubeCheckerItem
    },
    data () {
      return {
        list: [],
        attributes: null,
        cardType: false,
        filterShow: false,
        pageIndex: 1,
        keyword: '',
        SortType: 'all',
        Sort: 'asc',
        CategoryID: 0,
        BrandID: 0,
        PriceMin: '',
        PriceMax: '',
        collapse: [],
        selectedAttributes: [],
        searchValue: ''
      }
    },
    computed: {
      priceOrderClass () {
        return {
          'list-filter-order_asc': this.SortType === 'pri' && this.Sort === 'asc',
          'list-filter-order_desc': this.SortType === 'pri' && this.Sort === 'desc'
        }
      },
      attValueIds () {
        let attValueIds = ''
        this.BrandID = this.selectedAttributes[0] || 0
        attValueIds = this.selectedAttributes.slice(0).join(',')
        return attValueIds
      }
    },
    methods: {
      async getListData () {
        if (this.pageIndex === 1) this.loading.show()
        this.res = await productList(this, this.pageIndex, this.keyword, this.SortType, this.Sort, this.CategoryID, this.BrandID, this.attValueIds, this.PriceMin, this.PriceMax)
        this.loading.hide()
        if (this.res && this.res.data) {
          this.list = this.list.concat(this.res.data)
          if (this.res.data.length < 10) this.$refs.scroll.forceUpdate(false)
        } else {
          this.$refs.scroll.forceUpdate(false)
        }
      },
      async getFilterAttributes () {
        this.res2 = await filterAttributes(this, this.CategoryID)
        if (this.res2 && this.res2.data) this.attributes = this.res2.data.AttributesList
      },
      getFirstPageData () {
        this.pageIndex = 1
        this.list = []
        this.$refs.scroll.pullUpDirty = true
        this.getListData()
      },
      getNextPageData () {
        this.pageIndex = this.pageIndex + 1
        this.getListData()
      },
      overallSort () {
        if (this.SortType !== 'all') {
          this.SortType = 'all'
          this.Sort = 'desc'
          this.getFirstPageData()
        }
      },
      sellSort () {
        if (this.SortType !== 'sel') {
          this.SortType = 'sel'
          this.Sort = 'desc'
          this.getFirstPageData()
        }
      },
      priceSort () {
        this.SortType = 'pri'
        if (this.Sort === 'asc') {
          this.Sort = 'desc'
        } else {
          this.Sort = 'asc'
        }
        this.getFirstPageData()
      },
      filterSort () {
        this.filterShow = !this.filterShow
      },
      typeChange () {
        this.cardType = !this.cardType
      },
      collapseToggle (index) {
        this.$set(this.collapse, index, !this.collapse[index])
      },
      resetFilter () {
        this.PriceMin = ''
        this.PriceMax = ''
        this.BrandID = 0
        this.selectedAttributes = []
        this.collapse = []
        this.getFirstPageData()
        this.filterShow = false
      },
      ensureFilter () {
        this.getFirstPageData()
        this.filterShow = false
      },
      toSearchPage () {
        window.location.href = './search.html'
      }
    },
    mounted () {
      this.loading = this.$createToast({
        time: 0
      })
      this.CategoryID = this.$route.query.id || 0
      this.searchValue = this.$route.query.keyword || ''
      this.keyword = this.CategoryID !== 0 ? '' : this.searchValue
      this.getListData()
      this.getFilterAttributes()
    }
  }
</script>

<style lang="stylus">
  body {
    background: $color-background;
    font-size: 14px;
  }

  .list-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .before-trigger {
      font-size: 14px;
      color: #666;
    }
  }

  .list-top {
    background: #fff;
    padding: 6px 42px 6px 10px;
    position: relative;
    &-type {
      position: absolute;
      width: 32px;
      height: 32px;
      top: 6px;
      right: 10px;
      line-height: 32px;
      text-align: center;
    }
  }

  .list-filter {
    height: 46px;
    background: #fff;
    li {
      width: 25%;
      float: left;
      padding: 15px 0;
      font-size: 14px;
      text-align: center;
      .iconfont {
        font-size: 12px;
        margin-left: 2px;
        color: #999;
      }
    }
    &-active {
      color: #fe355c;
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

  .list-drawer {
    box-sizing: border-box;
    font-size: 14px;
    height: 100%;
    padding-bottom: 80px;
    overflow: auto;
    &-price {
      padding: 10px;
    }
    &-input {
      box-sizing: border-box;
      width: 78px;
      height: 34px;
      text-align: center;
      padding: 10px 15px;
      background-color: #f7f7f7;
      line-height: 14px;
      outline: none;
    }
    &-attribute {
      padding: 10px;
    }
    &-title {
      padding-bottom: 10px;
      position: relative;
    }
    &-collapse {
      position: absolute;
      padding: 10px;
      top: -10px;
      right: -10px;
      color: #999;
      transform: rotate(90deg);
      &_show {
        transform: rotate(-90deg);
      }
    }
    &-checker {
      height: 32px;
      overflow: hidden;
      &_show {
        height: auto;
      }
    }
    &-btns {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      >div {
        float: left;
        width: 50%;
        height: 44px;
        font-size: 16px;
        text-align: center;
        line-height: 44px;
        color: #fff;
      }
    }
    &-reset {
      background-color: #55c1ff;
    }
    &-ensure {
      background-color: #ff2150;
    }
    .cube-checker-item {
      box-sizing: border-box;
      min-width: 60px;
      max-width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: #f7f7f7;
      border-radius: 2px;
      vertical-align: middle;
      padding: 10px;
      margin: 0 10px 10px 0;
      font-size: 12px;
      color: #666;
      line-height: 1;
      text-align: center;
      &_selected {
        background-color: $color-orange;
        color: #fff;
      }
      &_disabled {
        opacity: .5;
      }
    }
  }
</style>
