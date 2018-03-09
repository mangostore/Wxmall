<template>
  <div class="sort-view" v-title="'分类'">
    <section class="sort-search border-bottom-1px">
      <cube-search placeholder="搜索商品关键词" @focus="toSearchPage"/>
    </section>

    <section class="sort-main" v-if="sortList">
      <ul class="sort-main-tab">
        <li class="sort-main-item border-bottom-1px" v-for="(item, index) in sortList" :key="index" :class="{'sort-main-item_active': index === activeIndex}" @click="activeIndex = index">
          {{item.Name}}
        </li>
      </ul>
      <div class="sort-main-content">
        <div class="sort-main-panel" v-for="(item, index) in sortList[activeIndex].ChildList" :key="index">
          <h3 class="sort-main-title">{{item.Name}}</h3>
          <ul class="sort-main-categories clear-fix">
            <li class="sort-main-category" v-for="(item2, index2) in item.ChildList" :key="index2" @click="toListPage(item2.Categories_ID)">{{item2.Name}}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="sort-tab">
      <cube-tabbar :active="2"/>
    </section>
  </div>
</template>

<script>
  import {allSort} from '../../../service'
  import {CubeTabbar, CubeSearch} from '../../../module'

  export default {
    components: {
      CubeTabbar,
      CubeSearch
    },
    data () {
      return {
        sortList: null,
        activeIndex: 0
      }
    },
    methods: {
      async getAllSort () {
        this.res = await allSort(this)
        if (this.res && this.res.data) {
          this.sortList = this.res.data
        }
      },
      toListPage (id) {
        // window.location.href = './list.html?id=' + id
        this.$router.push({
          path: 'list',
          query: {id: id}
        })
      },
      toSearchPage () {
        console.log('focus')
        window.location.href = './search.html'
      }
    },
    mounted () {
      this.getAllSort()
    }
  }
</script>

<style lang="stylus">
  .sort-search {
    padding: 10px;
  }

  .sort-main {
    position: fixed;
    top: 53px;
    bottom: 50px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 25%;
    &-tab {
      width: 25%;
      height: 100%;
      overflow: auto;
      background: #f7f7f7;
      position: absolute;
      top: 0;
      left: 0;
    }
    &-item {
      font-size: 14px;
      line-height: 50px;
      text-align: center;
      &_active {
        background: #fff;
      }
      &:active {
        background: #fff;
      }
    }
    &-content {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow: auto;
      padding-top: 10px;
    }
    &-panel {
      padding: 5px;
    }
    &-title {
      font-size: 12px;
      color: $color-light-grey;
      padding: 3px;
    }
    &-category {
      box-sizing: border-box;
      float: left;
      width: 30%;
      margin: 6px 1.5%;
      padding: 12px 6px;
      border: 1px solid #efefef;
      border-radius: 5px;
      font-size: 13px;
      max-width: 92px;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
</style>
