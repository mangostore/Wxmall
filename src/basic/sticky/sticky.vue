<template>
  <div class="cube-sticky">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'cube-sticky',
    props: {
      offset: {
        type: Number,
        default: 0
      }
    },
    mounted () {
      const el = this.$el
      const scrollEl = this.$parent.$el
      const cloneEl = el.cloneNode(true)
      const offsetY = el.offsetTop - this.offset
      let hasFixed = false
      this.$nextTick(() => {
        this.$parent.scroll.on('scroll', (position) => {
          if (-position.y > offsetY && !hasFixed) {
            el.parentElement.insertBefore(cloneEl, el)
            cloneEl.setAttribute('style', 'visibility: hidden')
            scrollEl.parentElement.insertBefore(el, scrollEl)
            el.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%;')
            hasFixed = true
          } else if (-position.y < offsetY && hasFixed) {
            el.setAttribute('style', '')
            cloneEl.parentElement.insertBefore(el, cloneEl)
            cloneEl.parentElement.removeChild(cloneEl)
            hasFixed = false
          }
        })
      })
    }
  }
</script>

<style lang="stylus">
  .cube-sticky {
    z-index: 99;
    &_fixed {
      width: 100%;
      position: fixed;
      top: 0;
      transform: translate3d(0, 0, 0);
    }
  }
</style>

