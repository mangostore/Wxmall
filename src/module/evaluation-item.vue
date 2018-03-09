<template>
    <div class="cube-evaluation-item border-bottom-1px" v-if="data">
      <div class="cube-evaluation-item-user">
        <span class="cube-evaluation-item-avator">
          <img :src="data.eva_userimg_url">
        </span>
        {{data.eva_name}}
      </div>
      <div class="cube-evaluation-item-content">
        {{data.eva_lua}}
        <div class="cube-evaluation-item-images" v-if="data.img_list">
          <img v-for="(item, index) in data.img_list" v-img="{group: data.eva_id}" :src="item" :key="index">
        </div>
      </div>
      <div class="cube-evaluation-item-time">
        {{data.eva_time}}
      </div>
      <div class="cube-evaluation-item-replay" v-if="data.seller_replay">
        <span class="cube-evaluation-item-highlight">{{data.seller_name}}</span>：{{data.seller_replay}}
      </div>
    </div>
</template>

<script>
  export default {
    name: 'cube-evaluation-item',
    props: {
      data: Object
    }
  }
</script>

<style lang="stylus">
  .cube-evaluation-item {
    padding: 10px;
    font-size: 14px;
    &-avator {
      display: inline-flex;
      width: 26px;
      height: 26px;
      border-radius: 13px;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      border: 1px solid $color-light-grey-ss;
      margin-right: 10px;
      vertical-align: middle;
      img {
        max-width: 100%;
      }
    }
    &-content {
      padding: 10px 0;
    }
    &-images {
      height: 40px;
      margin: 5px 0;
      img {
        height: 40px;
      }
    }
    &-time {
      font-size: 13px;
      color: $color-light-grey;
    }
  }
</style>
