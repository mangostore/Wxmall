<template>
  <div class="cube-checker">
    <slot>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'cube-checker',
    props: {
      defaultItemClass: {
        type: String,
        default: 'cube-checker-item'
      },
      selectedItemClass: {
        type: String,
        default: 'cube-checker-item_selected'
      },
      disabledItemClass: {
        type: String,
        default: 'cube-checker-item_disabled'
      },
      type: {
        type: String,
        default: 'radio'
      },
      value: [String, Number, Array, Object],
      max: Number,
      radioRequired: Boolean
    },
    watch: {
      value (newValue) {
        this.currentValue = newValue
      },
      currentValue (val) {
        this.$emit('input', val)
        this.$emit('on-change', val)
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    }
  }
</script>
