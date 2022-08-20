export function render (currentData, paddingSet, list) {
  const oFragment = document.createDocumentFragment()

  currentData.forEach(item => {
    const oItem = document.createElement('div')
    oItem.className = 'list-item'
    oItem.innerText = item
    oFragment.appendChild(oItem)
  });

  list.appendChild(oFragment)
  updatePaddingSet(paddingSet, list)
}

export function update (currentData, list) {
  const oItems = list.querySelectorAll('.list-item')
  // 此处可优化，并不是所有dom都需要更新，只需要将列表前面/后面的item剪切，替换内容后再插入到后面/前面即可
  // 但是需要判断到底是往上滑，还是往下滑，上滑就剪切前面的，下滑就剪切后面的
  // 可以参考vue的diff，判断哪些需要改变，或者想一些其它办法实现
  oItems.forEach((item, index) => {
    item.innerText = currentData[index]
  })
}

export function updatePaddingSet (paddingSet, list) {
  for (let key in paddingSet) {
    list.style[key] = paddingSet[key] + 'px'
  }
}