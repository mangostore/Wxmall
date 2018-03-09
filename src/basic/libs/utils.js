/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 获取地址栏参数
 */
export const getQuery = name => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const result = window.location.search.substr(1).match(reg)
  if (result) return decodeURI(result[2])
  return null
}
