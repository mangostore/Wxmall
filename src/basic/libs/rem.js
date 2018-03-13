(function (document, window) {
  const docEl = document.documentElement
  const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const setRootSize = function () {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'
  }
  if (!document.addEventListener) return
  window.addEventListener(resizeEvent, setRootSize, false)
  document.addEventListener('DOMContentLoaded', setRootSize, false)
})(document, window)
