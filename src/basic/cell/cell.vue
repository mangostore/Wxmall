<template>
  <component :is="tagName" class="cube-cell" :href="href">
    <slot name="icon">
    </slot>
    <div class="cube-cell-title">
      <slot name="title">
        {{ title }}
        <span class="cube-cell-label" v-text="label" v-if="label"></span>
      </slot>
    </div>
    <div class="cube-cell-value" :class="{'cube-cell-value_arrow': to}">
      <slot>
        {{ value }}
        <i class="cube-cell-arrow" v-if="to"></i>
      </slot>
    </div>
  </component>
</template>

<script>
  /**
   * cube-cell
   * @module components/cell
   * @desc 单元格
   * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理， to 有值时有点击效果
   * @param {string} [title] - 标题
   * @param {string} [label] - 备注信息
   * @param {string} [value] - 右侧显示文字
   * @param {Boolean} [arrow] - 是否显示箭头
   * @param {slot} - 同 value, 会覆盖 value 属性
   * @param {slot} [title] - 同 title, 会覆盖 title 属性
   * @param {slot} [icon] - 例如可以传入图片
   *
   * @example
   * <cube-cell title="标题文字" value="描述文字" to="/"></cube-cell>
   * <cube-cell title="标题文字">
   *   <img src="../images/icon.png" slot="icon"/>
   *   <div>
   *       描述文字
   *       <button>确定</button>
   *   </div>
   * </cube-cell>
   */
  export default {
    name: 'cube-cell',

    props: {
      to: [String, Object],
      title: String,
      label: String,
      value: String
    },

    computed: {
      tagName () {
        return this.to ? 'a' : 'div'
      },
      href () {
        if (this.to && !this.added && this.$router) {
          const resolved = this.$router.match(this.to)
          // if (!resolved.matched.length) return this.to

          this.$nextTick(() => {
            this.added = true
            this.$el.addEventListener('click', this.handleClick)
          })
          return resolved.fullPath || resolved.path
        }
        return this.to
      }
    },

    methods: {
      handleClick ($event) {
        $event.preventDefault()
        this.$router.push(this.href)
      }
    }
  }
</script>

<style lang="stylus">
  @require '~cube-ui/src/common/stylus/index.styl'

  .cube-cell {
    box-sizing: border-box;
    position: relative;
    display: flex;
    width: 100%;
    min-height: 46px;
    padding: 10px;
    overflow: hidden;
    background-color: $cell-bgc;
    font-size: 16px;
    color: inherit;
    line-height: 1;
    text-decoration: none;
    align-items: center;

    &::before {
      content: " ";
      position: absolute;
      left: 10px;
      top: 0;
      right: 10px;
      height: 1px;
      border-top: 1px solid $cell-border-color;
      color: $cell-border-color;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }

    &:first-child::before {
      left: 0;
      right: 0;
    }

    &:last-child::after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: -1px;
      right: 0;
      height: 1px;
      border-bottom: 1px solid $cell-border-color;
      color: $cell-border-color;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }

    a&:active {
      background-color: rgba(0, 0, 0, .04);
    }
  }

  .cube-cell-title {
    flex: 1;
    font-size: 15px;
    color: $cell-title-color;
  }

  .cube-cell-label {
    color: #888;
    display: block;
    font-size: 12px;
    margin-top: 6px;
  }

  .cube-cell-value {
    color: $cell-value-color;
    display: flex;
    align-items: center;
    font-size: 13px;

    &_arrow {
      margin-right: 24px;
    }
  }

  .cube-cell-arrow::after {
    border: 1px solid $cell-arrow-color;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    position: absolute;
    top: 50%;
    right: 20px;
    width: 6px;
    height: 6px;
    transform: translateY(-50%) rotate(45deg);
  }
</style>
