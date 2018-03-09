<template>
  <transition name="cube-popup-bottom-fade">
    <cube-popup type="popup-bottom" :center="false" v-show="isVisible" @touchmove.prevent="noop" @mask-click="cancel">
      <transition name="cube-popup-bottom-move">
        <div class="cube-popup-bottom-panel" v-show="isVisible" @click.stop="noop">
          <span class="cube-popup-bottom-cancel" @click="cancel"><i class="cubeic-close"></i></span>
          <slot>
          </slot>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
  export default {
    name: 'cube-popup-bottom',
    data () {
      return {
        isVisible: false
      }
    },
    methods: {
      noop () {},
      cancel () {
        this.isVisible = false
        this.$emit('cancel')
      },
      show () {
        this.isVisible = true
      }
    }
  }
</script>

<style lang="stylus">
  .cube-popup-bottom-fade-enter, .cube-popup-bottom-fade-leave-active {
    opacity: 0;
  }
  .cube-popup-bottom-fade-enter-active, .cube-popup-bottom-fade-leave-active {
    transition: all .3s;
  }
  .cube-popup-bottom-move-enter, .cube-popup-bottom-move-leave-active {
    transform: translate3d(0, 100%, 0);
  }
  .cube-popup-bottom-move-enter-active, .cube-popup-bottom-move-leave-active {
    transition: all .3s;
  }

  .cube-popup-bottom {
    &-panel {
      background-color: #fff;
      font-size: 14px;
      position: relative;
    }
    &-cancel {
      display: block;
      width: 44px;
      height: 44px;
      position: absolute;
      top: 0;
      right: 0;
      text-align: center;
      line-height: 44px;
      z-index: 1;
      color: $color-grey;
      &:active {
        color: $color-active-grey;
      }
    }
  }
</style>
