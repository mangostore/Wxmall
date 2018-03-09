<template>
    <div class="cube-tab border-bottom-1px" :class="{'cube-tab_animate': animate}">
      <slot/>
      <div class="cube-tab-bar" :class="transitionClass" :style="barStyle" v-if="animate">
        <span class="cube-tab-inner"></span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'cube-tab',
    props: {
      animate: {
        type: Boolean,
        default: true
      },
      value: Number
    },
    data () {
      return {
        number: this.$children.length,
        selectedIndex: -1,
        forward: true
      }
    },
    computed: {
      transitionClass () {
        return this.forward ? 'cube-tab-bar_forward' : 'cube-tab-bar_backward'
      },
      barLeft () {
        return `${this.selectedIndex * (100 / this.number)}%`
      },
      barRight () {
        return `${(this.number - this.selectedIndex - 1) * (100 / this.number)}%`
      },
      barStyle () {
        return {
          left: this.barLeft,
          right: this.barRight
        }
      }
    },
    methods: {
      updateIndex () {
        if (this.$children && this.$children.length) {
          let children = this.$children
          this.number = children.length
          children.forEach((item, index) => {
            item.currentIndex = index
            if (item.currentSelected) {
              this.selectedIndex = index
            }
          })
        }
      }
    },
    watch: {
      selectedIndex (val, oldVal) {
        if (oldVal > -1 && this.$children[oldVal]) this.$children[oldVal].currentSelected = false
        if (val > -1 && this.$children[val]) this.$children[val].currentSelected = true
        if (val > oldVal) this.forward = true
        if (val < oldVal) this.forward = false
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="stylus">
  .cube-tab {
    display: flex;
    background-color: #fff;
    height: 44px;
    position: relative;
    &_animate {
      .cube-tab-item {
        border-bottom-color: transparent;
      }
    }
    &-bar {
      position: absolute;
      height: 2px;
      bottom: 0;
      left: 0;
      text-align: center;
      &_forward {
        transition: right .3s cubic-bezier(0.35, 0, 0.25, 1), left .3s cubic-bezier(0.35, 0, 0.25, 1) .1s;
      }
      &_backward {
        transition: right .3s cubic-bezier(0.35, 0, 0.25, 1) .1s, left .3s cubic-bezier(0.35, 0, 0.25, 1);
      }
    }
    &-inner {
      display: block;
      height: 100%;
      width: 100%;
      margin: 0 auto;
      background: $tab-item-selected-color;
    }
  }
</style>
