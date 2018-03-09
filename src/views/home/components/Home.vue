<template>
  <div class="home-view" v-title="'丝路贵人商城'">
    <section class="home-top">
      <div class="home-top-search"></div>
      <cube-slide class="home-top-slide" v-if="slides">
        <cube-slide-item v-for="(item, index) in slides" :key="index">
          <a :href="item.AdHttp">
            <img :src="imgUrl + item.PicturePath">
          </a>
        </cube-slide-item>
      </cube-slide>
      <div class="home-top-categories" v-if="categories">
        <router-link class="home-top-category" v-for="(item, index) in categories" :key="index" :to="item.URL">
          <img :src="'/static/images/indexIcon0' + (index + 1) +'.png'">
          <div class="home-top-label">{{item.CateTitle}}</div>
        </router-link>
      </div>
      <div class="home-top-news border-top-1px" v-if="news">
        <cube-slide class="home-top-marquee">
          <cube-slide-item v-for="(item, index) in news" v-if="index % 2 === 0" :key="index">
            <a class="home-top-article" href="/"><i></i>{{item.Title}}</a>
            <a class="home-top-article" href="/"><i></i>{{news[index + 1].Title}}</a>
          </cube-slide-item>
          <div slot="dots"></div>
        </cube-slide>
      </div>
    </section>

    <section class="home-floor" v-if="hots">
      <div class="home-floor-title border-bottom-1px">
        <span class="home-floor-red">推荐</span>·商品
      </div>
      <div class="home-floor-content">
        <div class="home-floor-hot">
          <cube-scroll direction="horizontal">
            <div class="home-floor-hot-list" :style="{width: hots.length*100 + 'px'}">
              <router-link class="home-floor-hot-item" v-for="(item, index) in hots" :key="index" to="/">
                <div class="home-floor-hot-image">
                  <img :src="item.AttaUrl">
                </div>
                <div class="home-floor-hot-label">{{item.ProdTitle}}</div>
              </router-link>
            </div>
          </cube-scroll>
        </div>
      </div>
    </section>

    <home-floor :data="floorA" type="a"/>

    <home-floor :data="floorB" type="b"/>

    <home-floor :data="floorC" type="c"/>

    <home-floor :data="floorD" type="d"/>

    <section class="home-tab">
      <cube-tabbar :active="1"/>
    </section>
  </div>
</template>

<script>
  import {imgUrl} from '../../../assets/js/config'
  import {setStore, getStore} from '../../../basic'
  import {adList, newsList, hotProdList} from '../../../service'
  import {CubeTabbar} from '../../../module'
  import HomeFloor from './HomeFloor'

  export default {
    components: {
      CubeTabbar,
      HomeFloor
    },
    data () {
      return {
        slides: JSON.parse(getStore('slides')),
        categories: JSON.parse(getStore('categories')),
        news: JSON.parse(getStore('news')),
        hots: JSON.parse(getStore('hots')),
        floorA: JSON.parse(getStore('floorA')),
        floorB: JSON.parse(getStore('floorB')),
        floorC: JSON.parse(getStore('floorC')),
        floorD: JSON.parse(getStore('floorD')),
        imgUrl: imgUrl
      }
    },
    mounted () {
      adList(this, 1).then((res) => {         // 获取轮播轮播和分类入口
        if (res.data) {
          this.slides = res.data.adList
          this.categories = res.data.cateList
          setStore('slides', this.slides)
          setStore('categories', this.categories)
        }
      })
      newsList(this).then((res) => {          // 获取热门资讯
        if (res.data) this.news = res.data.Newslist
        setStore('news', this.news)
      })
      hotProdList(this).then((res) => {       // 获取推荐商品
        if (res.data) this.hots = res.data
        setStore('hots', this.hots)
      })
      adList(this, 'A').then((res) => {         // 获取楼层A
        if (res.data) this.floorA = res.data
        this.floorA.banner = this.floorA.adList.shift()
        setStore('floorA', this.floorA)
      })
      adList(this, 'B').then((res) => {         // 获取楼层B
        if (res.data) this.floorB = res.data
        this.floorB.banner = this.floorB.adList.shift()
        setStore('floorB', this.floorB)
      })
      adList(this, 'C').then((res) => {         // 获取楼层C
        if (res.data) this.floorC = res.data
        this.floorC.banner = this.floorC.adList.shift()
        setStore('floorC', this.floorC)
      })
      adList(this, 'D').then((res) => {         // 获取楼层D
        if (res.data) this.floorD = res.data
        setStore('floorD', this.floorD)
      })
    }
  }
</script>

<style lang="stylus">
  body {
    background-color: $color-background;
  }

  .home-view {
    padding-bottom: 60px;
  }

  .home-top{
    background: #fff;
    margin-bottom: 10px;
    &-slide {
      height: 42.67%;
      width: 100%;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 1.6rem!important;
      }
    }
    &-categories {
      display: flex;
      flex-wrap: wrap;
    }
    &-category {
      flex: 0 1 25%;
      padding: 10px 0;
      text-align: center;
      img {
        width: 48px;
        height: 48px;
      }
      &:active {
        background: rgba(0, 0, 0, .04);
      }
    }
    &-label {
      font-size: 14px;
      padding: 5px 0;
    }
    &-news {
      padding: 10px 15px 10px 72px;
      background: url("../images/hot-news.png") no-repeat 15px 10px;
      background-size: 46px 33px;
    }
    &-marquee {
      height: 32px;
      overflow: hidden;
      border-left: 1px solid $color-col-line;
    }
    &-article {
      font-size: 12px;
      line-height: 1.4;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      i {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: #fcdc29;
        margin: 0 10px;
        position: relative;
        top: -2px;
      }
    }

  }
</style>
