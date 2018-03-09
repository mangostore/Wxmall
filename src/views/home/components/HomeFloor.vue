<template>
  <section :class="'home-floor home-floor-f' + type" v-if="data">
    <router-link class="home-floor-banner" v-if="data.banner" :to="data.banner.AdHttp">
      <img :src="imgUrl + data.banner.PicturePath">
    </router-link>
    <div class="home-floor-title border-bottom-1px">
      {{data.cateList[0].Title}}
      <router-link class="home-floor-more" :to="data.cateList[0].URL">更多<i class="cubeic-arrow"></i></router-link>
    </div>
    <div class="home-floor-content">
      <div class="clear-fix">
        <router-link class="home-floor-item border-bottom-1px border-left-1px" v-for="(item, index) in data.adList" :key="index" :to="item.AdHttp">
          <div class="home-floor-text">
            <h3 class="home-floor-adt">{{item.ADTitle}}</h3>
            <div class="home-floor-desc">{{item.Descript}}</div>
          </div>
          <img class="home-floor-img" :src="imgUrl + item.PicturePath">
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
  import {imgUrl} from '../../../assets/js/config'

  export default {
    name: 'home-floor',
    props: {
      data: Object,
      type: {
        type: String,
        default: 'a'
      }
    },
    data () {
      return {
        imgUrl: imgUrl
      }
    }
  }
</script>

<style lang="stylus">
  .home-floor {
    background: #fff;
    margin-bottom: 20px;
    &-banner {
      display: block;
      background: $color-background;
      padding-bottom: 20px;
      img {
        width: 100%;
      }
    }
    &-title {
      font-size: 15px;
      color: #333;
      font-weight: 600;
      line-height: 36px;
      padding: 0 10px;
    }
    &-red {
      color: #fe355c;
    }
    &-orange {
      color: #fb5e27;
    }
    &-pink {
      color: #ff5270;
    }
    &-blue {
      color: #7c9cf7;
    }
    &-green {
      color: #c7e5ac;
    }
    &-more {
      float: right;
      font-size: 12px;
      color: #666;
    }
    &-hot {
      padding: 10px;
      &-list {
        display: flex;
      }
      &-item {
        width: 85px;
        margin-right: 15px;
      }
      &-image {
        display: flex;
        width: 85px;
        height: 85px;
        overflow: hidden;
        align-items: center;
        img {
          width: 100%;
        }
      }
      &-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        text-align: center;
        padding: 5px 0;
      }
    }
    &-item {
      position: relative;
      display: block;
      overflow: hidden;
      float: left;
      > img {
        max-width: 100%;
      }
    }
    &-fa {
      .home-floor-item {
        width: 25%;
        height: .8rem;
      }
      .home-floor-text {
        display: none;
      }
      .home-floor-item:first-child {
        width: 50%;
        height: 1.6rem;
        .home-floor-text {
          display: block;
          position: absolute;
          top: 0;
          left: 10px;
          font-size: 10px;
          line-height: 1.2;
        }
        .home-floor-adt {
          padding-top: 10px;
          font-size: 13px;
          color: #fe355c;
          margin-bottom: 5px;
        }
      }
    }
    &-fb {
      .home-floor-title {
        color: #f68c47;
      }
      .home-floor-item {
        width: 25%;
        height: .94rem;
        text-align: center;
        .home-floor-text {
          height: .47rem;
          font-size: 10px;
          line-height: 1.2;
        }
        .home-floor-adt {
          padding-top: 10px;
          font-size: 13px;
          color: #fe355c;
          margin-bottom: 5px;
        }
        .home-floor-img {
          height: .47rem;
        }
      }
      .home-floor-item:first-child {
        width: 50%;
        height: 1.88rem;
        .home-floor-text {
          display: block;
          position: absolute;
          top: 0;
          left: 10px;
          z-index: 1;
          text-align: left;
        }
        .home-floor-img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 100%;
          height: auto;
        }
      }
      .home-floor-item:nth-child(2) .home-floor-adt {
        color: #ff2150;
      }
      .home-floor-item:nth-child(3) .home-floor-adt {
        color: #12a7e5;
      }
      .home-floor-item:nth-child(4) .home-floor-adt {
        color: #ff7e00;
      }
      .home-floor-item:nth-child(5) .home-floor-adt {
        color: #ff5270;
      }
    }
    &-fc {
      .home-floor-title {
        color: #b656e2;
      }
      .home-floor-item {
        width: 33.33%;
        text-align: center;
      }
      .home-floor-text {
        box-sizing: border-box;
        height: 45px;
        padding: 10px 5px 0;
      }
      .home-floor-adt {
        font-size: 13px;
        line-height: 1.2;
        color: #fb5e27;
        margin-bottom: 5px;
      }
      .home-floor-desc {
        font-size: 11px;
        color: #333;
      }
      .home-floor-img {
        height: .68rem;
        margin-bottom: 5px;
      }
    }
    &-fd {
      .home-floor-title {
        color: #7a74f5;
      }
      .home-floor-item {
        box-sizing: border-box;
        width: 50%;
        padding: 10px;
      }
      .home-floor-text {
        width: 50%;
        float: left;
        line-height: 1.2;
      }
      .home-floor-adt {
        padding-top: 20px;
        font-size: 13px;
        color: #333;
        margin-bottom: 5px;
      }
      .home-floor-desc {
        font-size: 10px;
      }
      .home-floor-img {
        float: right;
        width: 50%;
      }
      .home-floor-item:nth-child(1) .home-floor-desc {
        color: #fe5976;
      }
      .home-floor-item:nth-child(2) .home-floor-desc {
        color: #7c9cf7;
      }
      .home-floor-item:nth-child(3) .home-floor-desc {
        color: #7c9cf7;
      }
      .home-floor-item:nth-child(4) .home-floor-desc {
        color: #c7e5ac;
      }
      .home-floor-item:nth-child(5) .home-floor-desc {
        color: #7c9cf7;
      }
      .home-floor-item:nth-child(6) .home-floor-desc {
        color: #fe5976;
      }
    }
  }
</style>
