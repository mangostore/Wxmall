<template>
    <div class="cube-tab-item" :class="{'cube-tab-item_selected': currentSelected, 'cube-tab-item_disabled': disabled}" @click="itemClick">
      <slot/>
    </div>
</template>

<script>
  export default {
    name: 'cube-tab-item',
    props: {
      disabled: Boolean,
      selected: Boolean
    },
    data () {
      return {
        currentIndex: -1,
        currentSelected: this.selected
      }
    },
    methods: {
      itemClick () {
        if (!this.disabled) {
          this.currentSelected = true
          this.$parent.selectedIndex = this.currentIndex
          this.$nextTick(() => {
            this.$emit('item-click', this.currentIndex)
          })
        }
      }
    },
    mounted () {
      this.$parent.updateIndex()
    },
    beforeDestroy () {
      this.$nextTick(() => {
        this.$parent.updateIndex()
      })
    }
  }
</script>

<style lang="stylus">
  .cube-tab-item {
    display: block;
    flex: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    text-align: center;
    line-height: 44px;
    color: $tab-item-color;
    &_selected {
      background: 0 0;
      color: $tab-item-selected-color;
      border-bottom: 2px solid $tab-item-selected-color;
    }
    &_disabled {
      color: $tab-item-disabled-color;
    }
  }
</style>
