// 每个列表项的高度
export const ITEM_HEIGHT = 101
// 页面能容纳的最大列表项，加1是因为有可能首尾各半个 item
export const MAX_ITEM_COUNT = Math.ceil(document.querySelector('#J_scrollWrapper').offsetHeight / ITEM_HEIGHT) + 1
// 一秒30帧，人眼就不会觉得卡顿，此处计算多少毫秒一帧
export const TIME_PRE_FPS = 1000 / 30