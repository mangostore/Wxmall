<template>
  <div class="evaluation-view" v-title="'商品评价'">
    <section class="evaluation-tab">
      <div class="evaluation-tab-item" :class="{'evaluation-tab-item_active': activeIndex === 0}" @click="changeEvaluation(0)"><span>全部{{EvaluationCount}}</span></div>
      <div class="evaluation-tab-item" :class="{'evaluation-tab-item_active': activeIndex === 1}" @click="changeEvaluation(1)"><span>好评{{GoodEvaluationCount}}</span></div>
      <div class="evaluation-tab-item" :class="{'evaluation-tab-item_active': activeIndex === 2}" @click="changeEvaluation(2)"><span>中评{{MiddleEvaluationCount}}</span></div>
      <div class="evaluation-tab-item" :class="{'evaluation-tab-item_active': activeIndex === 3}" @click="changeEvaluation(3)"><span>差评{{BadEvaluationCount}}</span></div>
    </section>
    <cube-scroll class="evaluation-content" :options="{pullUpLoad: {threshold: 0, txt: {more: '加载更多', noMore: '— 到底了，别再拉了 —'}}}" :data="Evaluation[activeIndex]" @pulling-up="addEvaluation" ref="scroll">
      <cube-evaluation-item v-for="(item, index) in Evaluation[activeIndex]" :data="item" :key="index"/>
    </cube-scroll>
  </div>
</template>

<script>
  import {productEvaluation} from '../../../service'
  import {CubeEvaluationItem} from '../../../module'

  export default {
    components: {
      CubeEvaluationItem
    },
    data () {
      return {
        productId: 0,
        EvaluationCount: 0,
        GoodEvaluationCount: 0,
        MiddleEvaluationCount: 0,
        BadEvaluationCount: 0,
        Evaluation: [],
        pageIndex: [1, 1, 1, 1],
        activeIndex: 0
      }
    },
    methods: {
      async getProductEvaluation (type) {    // 获取评价数据，type 0：全部 1：好评 2：中评 3：差评
        if (this.pageIndex[type] === 1) this.loading.show()
        this.res = await productEvaluation(this, this.productId, this.pageIndex[type], type)
        this.loading.hide()
        if (this.res && this.res.data) {
          this.EvaluationCount = this.res.data.EvaluationCount
          this.GoodEvaluationCount = this.res.data.GoodEvaluationCount
          this.MiddleEvaluationCount = this.res.data.MiddleEvaluationCount
          this.BadEvaluationCount = this.res.data.BadEvaluationCount
          let evaluations = this.res.data.Evaluations
          if (this.pageIndex[type] === 1) {
            this.$set(this.Evaluation, type, evaluations)
          } else {
            this.$set(this.Evaluation, type, this.Evaluation[type].concat(evaluations))
          }
          this.pageIndex[type]++
        } else {
          this.$refs.scroll.forceUpdate()
        }
      },
      changeEvaluation (type) {
        this.activeIndex = type
        if (this.pageIndex[type] === 1) {
          this.getProductEvaluation(type)
        }
      },
      addEvaluation () {
        this.getProductEvaluation(this.activeIndex)
      }
    },
    mounted () {
      this.loading = this.$createToast({time: 0})
      this.productId = this.$route.query.id || 0
      this.getProductEvaluation(0)
    }
  }
</script>

<style lang="stylus">
  .evaluation-view {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 44px;
    background-color: #fff;
    position: relative;
  }

  .evaluation-tab {
    position: absolute;
    top: 0;
    left: 0;
    height: 44px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    box-shadow: 0 1px 0 rgba(0, 0, 0, .05);
    &-item {
      flex: 1;
      padding: 10px 5px 10px 10px;
      span {
        display: block;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        text-align: center;
        color: #fe355c;
        background-color: #fef1f1;
        border-radius: 2px;
      }
      &_active span {
        color: #fff;
        background-color: #fe355c;
      }
    }
  }

  .evaluation-content {
    width: 100%;
    height: 100%;
  }
</style>
