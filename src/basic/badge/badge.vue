<template>
    <span class="cube-badge" :class="{'cube-badge_dot': dot, 'cube-badge_single': isSingle}" v-if="show">{{ text }}</span>
</template>

<script>
  export default {
    name: 'cube-badge',
    props: {
      text: [String, Number, Boolean],
      dot: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      show () { return !!this.text },
      isSingle () { return this.text && this.text.toString().length === 1 }
    }
  }
</script>

<style lang="stylus">
  @require '../theme.styl'

  .cube-badge {
    display: inline-block;
    text-align: center;
    background: $badge-bgc;
    color: #fff;
    font-size: 10px;
    height: 14px;
    line-height: 16px;
    border-radius: 7px;
    min-width: 14px;
    padding: 0 3px;
    background-clip: padding-box;
    vertical-align: middle;
    white-space: nowrap;
    &_dot {
      height: 8px;
      min-width: 8px;
      border-radius: 4px;
      padding: 0;
      font-size: 0;
    }
    &_single {
      padding: 0;
    }
  }
</style>
