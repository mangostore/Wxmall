const Validator = {}
Validator.install = function (Vue) {
  Vue.prototype.$validate = function (targets, cb) {
    const validations = this.$options.validations
    if (!Array.isArray(targets)) {
      console.log('first arguments should be an array in $validate')
      return false
    }
    if (cb && !(typeof cb === 'function')) {
      console.log('second arguments should be a function in $validate')
      return false
    }
    return targets.every((target) => {
      return validations[target].every((item) => {
        if (!item.rule(this[target], item.params)) {
          cb(item.txt, this.$refs[target])
          return false
        }
        return true
      })
    })
  }
}
export default Validator
