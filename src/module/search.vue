<template>
  <div class="cube-search">
    <i class="iconfont icon-fangdajing"></i>
    <input type="text" class="cube-search-input" :placeholder="placeholder" ref="input" :value="value" @input="updateSearch($event.target.value)" @focus="searchFocus">
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: String,
      value: [String, Number]
    },
    methods: {
      searchFocus () {
        this.$emit('focus')
      },
      updateSearch (val) {
        this.$refs.input.value = val
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="stylus">
  .cube-search {
    width: 100%;
    position: relative;
    &-input {
      box-sizing: border-box;
      width: 100%;
      height: 32px;
      padding-left: 36px;
      margin: 0;
      font-size: 12px;
      line-height: 1;
      text-align: left;
      background-color: #f0f0f0;
      border-radius: 15px;
      border-color: transparent;
      outline: none;
    }
    i {
      position: absolute;
      top: 8px;
      left: 12px;
    }
  }
</style>
