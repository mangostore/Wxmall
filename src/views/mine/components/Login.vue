<template>
  <div class="login-view">
    <form class="login-form">
      <template v-if="accountLogin">
        <div class="login-form-row border-bottom-1px">
          <input class="login-form-input" type="text" placeholder="请输入手机号或用户名" v-model="account" ref="account">
        </div>
        <div class="login-form-row border-bottom-1px">
          <input class="login-form-input" type="password" placeholder="请输入密码" v-model="password" ref="password">
          <router-link class="login-form-link" to="/forget">忘记密码？</router-link>
        </div>
      </template>
      <template v-else>
        <div class="login-form-row border-bottom-1px">
          <input class="login-form-input" type="text" placeholder="请输入手机号" v-model="mobile" ref="mobile">
          <a class="login-form-link" @click="getMobileCode" v-if="!count">获取验证码</a>
          <span class="login-form-sent" v-if="count">已发送({{ count }}s)</span>
        </div>
        <div class="login-form-row border-bottom-1px">
          <input class="login-form-input" type="text" placeholder="验证码" v-model="code" ref="code">
        </div>
      </template>
      <div class="login-form-submit">
        <cube-button @click="submitLogin" :disabled="submitActive">{{ submitActive ? '登录中...' : '登录' }}</cube-button>
      </div>
    </form>
    <div class="login-links">
      <div class="login-links-change" @click="changeLoginWay">{{ accountLogin ? '手机号登录' : '账号密码登录' }}</div>
      <router-link to="/register">我要注册</router-link>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {mobileCode, mobileLogin, accountLogin} from '../../../service'
  import {required, minLength, maxLength, mobile} from '../../../basic'

  export default {
    data () {
      return {
        account: null,          // 账号名
        password: null,         // 密码
        mobile: null,           // 手机号
        code: null,             // 验证码
        count: 0,               // 倒计时
        accountLogin: false,    // 是否是账号登录
        submitActive: false     // 是否是正在提交中
      }
    },
    computed: {
      ...mapState([
        'login', 'userInfo'     // 登录状态、用户信息
      ])
    },
    validations: {
      account: [
        {rule: required, txt: '需要填写账号'},
        {rule: minLength, params: 3, txt: '用户名需要大于3位'},
        {rule: maxLength, params: 15, txt: '用户名需要小于15位'}
      ],
      password: [
        {rule: required, txt: '需要填写密码'}
      ],
      mobile: [
        {rule: required, txt: '需要填写手机'},
        {rule: mobile, txt: '手机号格式不正确'}
      ],
      code: [
        {rule: required, txt: '需要填写验证码'}
      ]
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'        // 记录用户信息
      ]),
      msg (txt) {                // 提示弹框
        const toast = this.$createToast({type: 'warn', time: 1500, txt: txt})
        toast.show()
      },
      countDown () {              // 倒计时
        this.count = 120
        this.interval = setInterval(() => {
          this.count--
          if (this.count <= 0) {
            clearInterval(this.interval)
            this.count = 0
          }
        }, 1000)
      },
      getMobileCode () {          // 获取验证码
        if (!this.$validate(['mobile'], this.msg)) return false
        this.countDown()
        mobileCode(this, this.mobile)
      },
      changeLoginWay () {         // 切换登录方式
        this.accountLogin = !this.accountLogin
      },
      loginSuccess (userInfo) {   // 登录成功
        this.submitActive = false
        this.RECORD_USERINFO(userInfo)
        this.$router.go(-1)
      },
      async submitLogin () {        // 提交登录
        this.submitActive = true
        if (this.accountLogin) {
          this.res = this.$validate(['account', 'password'], this.msg) && await accountLogin(this, this.account, this.password)
        } else {
          this.res = this.$validate(['mobile', 'code'], this.msg) && await mobileLogin(this, this.mobile, this.code)
        }
        if (this.res && this.res.data && this.res.data.UserBase_ID) this.loginSuccess(this.res.data)
        this.submitActive = false
      }
    },
    mounted () {
      if (this.login) this.loginSuccess(this.userInfo)
    }
  }
</script>

<style lang="stylus">
  .login-view.mine-subview {
    padding-top: 130px;
    background: #fff url('../images/logo.png') no-repeat center 40px;
    background-size: 133px 45px;
  }

  .login-form {
    padding: 10px;
    &-row {
      display: flex;
      align-items: center;
    }
    &-input {
      font-size: 14px;
      min-height: 48px;
      flex: 1;
      outline: none;
    }
    &-link {
      color: #008fd7;
      font-size: 14px;
    }
    &-sent {
      color: #ccc;
      font-size: 14px;
    }
    &-submit {
      padding: 50px 15px 0;
    }
  }

  .login-links {
    display: flex;
    padding: 0 25px;
    font-size: 13px;
    &-change {
      flex: 1;
    }
  }
</style>
