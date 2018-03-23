<template>
  <div class="brief-view">
    <ul class="brief-list" v-if="shopInfo">
      <li class="brief-list-item border-bottom-1px"><label>商品描述</label> <span class="brief-list-highlight">{{shopInfo.Depoint}}</span></li>
      <li class="brief-list-item border-bottom-1px"><label>服务态度</label> <span class="brief-list-highlight">{{shopInfo.Sepoint}}</span></li>
      <li class="brief-list-item border-bottom-1px"><label>物流服务</label> <span class="brief-list-highlight">{{shopInfo.Shpoint}}</span></li>
      <li class="brief-list-item border-bottom-1px"><label>开店时间</label> {{shopInfo.CreateDate.split(' ')[0]}}</li>
      <li class="brief-list-item border-bottom-1px"><label>所在地</label> {{shopInfo.Addre}}</li>
      <li class="brief-list-item"><label>服务电话</label> <a class="brief-list-tel" :href="'tel:' + shopInfo.Phone"><i class="iconfont icon-kefudianhua"></i></a></li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'brief',
    computed: {
      ...mapState([
        'shopInfo'
      ])
    }
  }
</script>

<style lang="stylus">
  .brief-list {
    background-color: #fff;
    padding: 0 10px;
    &-item {
      line-height: 44px;
      font-size: 14px;
      label {
        display: inline-block;
        width: 60px;
        margin-right: 5px;
      }
    }
    &-highlight {
      color: $color-orange;
    }
    &-tel {
      display: inline-block;
      color: $color-orange;
      float: right;
      padding: 0 10px;
    }
  }
</style>
