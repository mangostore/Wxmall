<template>
  <div class="cube-switch" :class="{ 'cube-switch_active': checked }" @click="clickSwitch">
    <span class="cube-switch-circle" :class="{ 'cube-switch-circle_active': checked }"></span>
  </div>
</template>

<script>
  /**
   * cube-switch
   * @module basic/switch
   * @desc 开关
   * @param {boolean} [value=false] 开关值，可选 true, false
   * @event CubeSwitch#update
   *
   * @example
   * <cube-switch :value="true"></cube-switch>
   */
  export default {
    name: 'cube-switch',
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        checked: this.value
      }
    },
    watch: {
      checked (newValue) {
        this.$emit('update', newValue)
      }
    },
    methods: {
      clickSwitch () {
        this.checked = !this.checked
      }
    }
  }
</script>

<style lang="stylus">
  @require '../theme.styl'

  .cube-switch {
    display: inline-block;
    position: relative;
    height: 20px;
    width: 36px;
    background-color: $switch-off-color;
    border-radius: 1000px;
    transition: all 0.1s;
    &_active {
      background-color: $switch-on-color;
      transition: all 0.2s ease 0.2s;
    }
  }

  .cube-switch-circle {
    position: absolute;
    display: block;
    height: 18px;
    width: 18px;
    background: #fff;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .1);
    box-shadow: -1px 1px 1px $switch-off-color;
    top: 0;
    left: 1px;
    transition: all 0.3s;
    &_active {
      left: 16px;
      border-color: $switch-on-color;
      box-shadow: none;
      transition: all 0.3s ease 0.05s;
    }
  }
</style>
