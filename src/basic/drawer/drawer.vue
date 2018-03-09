// forked from: https://github.com/bajian/vue-drawer

<template>
  <div class="cube-drawer">
    <div :style="{transform: `translate3d(${translateX}px, 0, 0)`}"
         class="cube-drawer-body">
      <slot>
      </slot>
      <div class="cube-drawer-mask" :class="show ? 'cube-drawer-mask_active' : ''" @click="hideMask"></div>
    </div>
    <div
      ref="drawer"
      class="cube-drawer-content"
      :style="drawerStyle"
      :class="[placement !=='left' ? 'cube-drawer-right' : 'cube-drawer-left', show ? 'cube-drawer-content_active' : '']" >
      <slot name="drawer">
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cube-drawer',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      placement: {
        type: String,
        default: 'left'
      },
      showMode: {
        type: String,
        default: 'overlay'
      },
      drawerStyle: Object
    },
    data () {
      return {
        drawerWidth: 0,
        translateX: 0
      }
    },
    watch: {
      show: function () {
        if (!this.show) {
          this.$emit('on-hide')
        } else {
          this.$emit('on-show')
        }
        if (this.showMode === 'overlay') {
          return
        }
        if (!this.show) {
          this.translateX = 0
        } else {
          this.translateX = this.placement === 'left' ? this.drawerWidth : -this.drawerWidth
        }
      }
    },
    methods: {
      hideMask () {
        this.$emit('update:show', false)
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.drawerWidth = this.$refs.drawer.clientWidth
      })
    }
  }
</script>

<style lang="stylus">
  .cube-drawer {
    display: block;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &-body {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: transform ease-in-out 0.38s, visibility 0.38s;
    }

    &-mask {
      z-index: 9999;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      visibility: hidden;
      opacity: 0;
      transition: opacity ease-in-out 0.38s, visibility ease-in-out 0.38s;
      background-color: rgba(0, 0, 0, 0.3);
      &_active {
        visibility: visible;
        opacity: 1;
      }
    }

    .cube-drawer-left {
      left: 0;
      transform: translateX(-100%);
    }

    .cube-drawer-right {
      right: 0;
      transform: translateX(100%);
    }

    .cube-drawer-content {
      background-color: #fff;
      position: absolute;
      top: 0;
      height:100%;
      overflow: hidden;
      pointer-events: none;
      visibility: hidden;
      transition: transform ease-in-out 0.38s, visibility 0.38s;
      will-change: none;
      &_active {
        pointer-events: inherit;
        visibility: visible;
        transform: translateX(0%);
      }
    }
  }
</style>
