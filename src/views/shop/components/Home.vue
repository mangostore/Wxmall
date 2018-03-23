<template>
  <div class="home-view clear-fix">
    <cube-list-item v-for="(item, index) in list" :data="item" :key="index" :card-type="true"></cube-list-item>
  </div>
</template>

<script>
  import {shopRecom} from '../../../service'
  import CubeListItem from '../../../module/list-item'

  export default {
    name: 'home',
    components: {
      CubeListItem
    },
    data () {
      return {
        list: []
      }
    },
    methods: {
      async getShopRecom () {
        this.res = await shopRecom(this, this.$route.query.id || 0)
        if (this.res) {
          this.list = this.res.data
        }
      }
    },
    mounted () {
      this.getShopRecom()
    }
  }
</script>

<style lang="stylus">

</style>
