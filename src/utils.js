import { TIME_PRE_FPS } from "./config"

// 获取数据，此处用 i 模拟接口获取的数据
export function getData (init, count) {
  const arr = []

  for (let i = init; i <= count; i++) {
    arr.push(i)
  }

  return arr
}

export function setAnimationFrame (callback) {
  let beginTime = Date.now()

  // 为什么不直接用 setTimeout 做节流？
  // 因为需要保证上一步渲染完了，再去走下一步，setTimeout无法完成
  window.requestAnimationFrame(function cb() {
    const endTime = Date.now()
    callback()
  
    if (endTime - beginTime >= TIME_PRE_FPS) {
      beginTime = endTime
      window.requestAnimationFrame(cb)
    }
  })
}