<template>
  <div class="set-view">
    <div class="set-cells">
      <cube-cell title="意见反馈" to="/set/feedback"/>
      <cube-cell title="关于我们" to="/set/about"/>
      <cube-cell title="帮助中心" to="/set/help"/>
    </div>

    <div class="set-exit" v-if="login">
      <cube-button :light="true" @click="exitLogin">退出登录</cube-button>
    </div>

    <transition name="move">
      <router-view class="set-subview"/>
    </transition>
  </div>
</template>

<script>
  import {CubeCell} from '../../../basic'
  import {mapState, mapMutations} from 'vuex'

  export default {
    components: {
      CubeCell
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState([
        'login'
      ])
    },
    methods: {
      ...mapMutations([
        'OUT_LOGIN'
      ]),
      exitLogin () {
        this.OUT_LOGIN()
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus">
  .set-view {
    padding-top: 10px;
  }
  .set-exit {
    padding: 30px 10px 0;
  }
  .set-subview {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
