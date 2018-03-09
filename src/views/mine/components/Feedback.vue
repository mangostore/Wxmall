<template>
  <div class="feedback-view">
    <form class="feedback-form">
      <textarea name="feedback" cols="30" placeholder="如果您对我们有什么建议、想法和期望，请告诉我们" v-model="content"></textarea>
      <cube-button :primary="true" @click="feedbackSubmit">提交</cube-button>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content: null
      }
    },
    methods: {
      feedbackSubmit () {
        console.log('feedback')
      }
    }
  }
</script>

<style lang="stylus">
  .feedback-view {
    background: #fff;
  }
  .feedback-form {
    padding: 10px;
    textarea {
      box-sizing: border-box;
      background: #fafafa;
      border: 1px solid #e6e6e6;
      width: 100%;
      min-height: 125px;
      padding: 10px;
      margin-bottom: 20px;
      outline: none;
      resize: none;
    }
  }
</style>
