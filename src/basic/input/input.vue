<template>
  <div class="cube-input border-top-1px">
    <label class="cube-input-label" v-if="label" v-text="label"></label>
    <input class="cube-input-field" type="text"/>
    <i class="cube-input-clear cubeic-close" v-if="disableClear"></i>
    <div class="cube-input-state">

    </div>
    <div class="cube-input-other">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cube-input',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      label: String,
      disableClear: Boolean,
      state: {
        type: String,
        default: 'default'
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus">
  .cube-input {
    display: flex;
    position: relative;
    min-height: 48px;
    background: #fff;

    &-field {
      flex: 1;
    }
  }
</style>
