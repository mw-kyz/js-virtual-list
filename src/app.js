import './app.scss'

import { ITEM_HEIGHT, MAX_ITEM_COUNT, TIME_PRE_FPS } from './config'
import { setCurrentData, setDataSource, reactive } from './reactive';
import { render } from './render';
import { setAnimationFrame } from './utils';

console.log(MAX_ITEM_COUNT)

;(() => {
  const oScroller = document.querySelector('#J_scrollWrapper')
  const oList = oScroller.querySelector('.list-wrapper')
  const $state = reactive(oList)
  let beginTime = Date.now()

  const init = () => {
    initData(1, 20)
    render($state.currentData, $state.paddingSet, oList)
    bindEvent()
  }

  function initData (init, count) {
    setDataSource(init, count)
    setCurrentData()
    console.log($state)
  }

  function bindEvent () {
    oScroller.addEventListener('scroll', handleScroll, false)
  }
  function handleScroll () {
    const endTime = Date.now()
    // 节流
    if (endTime - beginTime >= TIME_PRE_FPS) {
      beginTime = endTime
      // 此处的 this 指向 oScroller
      $state.startIndex = Math.floor(this.scrollTop / ITEM_HEIGHT)
      console.log(Date.now())
    }
    // 利用 setAnimationFrame 还存在问题，还需考虑此处是否能使用 requestAnimationFrame
    // requestAnimationFrame用法可参考test.html
    // setAnimationFrame(() => {
    //   $state.startIndex = Math.floor(this.scrollTop / ITEM_HEIGHT)
    //   // console.log(Date.now())
    // })
  }

  init()
})()