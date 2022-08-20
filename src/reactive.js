import { ITEM_HEIGHT, MAX_ITEM_COUNT } from "./config"
import { update, updatePaddingSet } from "./render"
import { getData } from "./utils"

const $state = {}

const data = {
  dataSource: [],
  currentData: [],
  startIndex: 0,
  endIndex: 0,
  paddingSet: {
    paddingTop: 0,
    paddingBottom: 0
  }
}

export function reactive (list) {
  Object.defineProperties($state, {
    dataSource: {
      get () {
        return data.dataSource
      },
      set (newValue) {
        data.dataSource = newValue
        setCurrentData()
      }
    },
    currentData: {
      get () {
        return data.currentData
      },
      set (newValue) {
        data.currentData = newValue
        update($state.currentData, list)
      }
    },
    startIndex: {
      get () {
        return data.startIndex
      },
      set (newValue) {
        if ($state.startIndex !== newValue) {
          data.startIndex = newValue
          // 当列表已经没有数据时，需继续请求新数据
          if ($state.endIndex >= $state.dataSource.length - 1) {
            // 1-20 => 21-40 => 41-60
            setDataSource($state.dataSource.length + 1, $state.dataSource.length + 20)
          }
          // 因为存在 resetStartIndex，所以需在 resetStartIndex 之后，startIndex仍然大于0，才需要更新 currentData 和 padding
          if (resetStartIndex() > 0) {
            setCurrentData()
            setPaddingSet()
          }
        }
      }
    },
    endIndex: {
      get () {
        return setEndIndex()
      }
    },
    paddingSet: {
      get () {
        return data.paddingSet
      },
      set (newValue) {
        data.paddingSet = newValue
        updatePaddingSet($state.paddingSet, list)
      }
    }
  })

  return $state
}

function setEndIndex () {
  const startIndex = resetStartIndex()
  // 乘以2，渲染两个屏幕的元素，防止滑动过快，出现白屏
  const endIndex = startIndex + MAX_ITEM_COUNT * 2

  return $state.dataSource[endIndex] ? endIndex : ($state.dataSource.length - 1)
}

export function setDataSource (init, count) {
  // 原来的数据 + 新获取的数据
  $state.dataSource = [
    ...$state.dataSource,
    ...getData(init, count)
  ]
}

export function setCurrentData () {
  const startIndex = resetStartIndex()
  $state.currentData = $state.dataSource.slice(startIndex, $state.endIndex)
}

export function setPaddingSet () {
  const startIndex = resetStartIndex()
  $state.paddingSet = {
    paddingTop: startIndex * ITEM_HEIGHT,
    paddingBottom: ($state.dataSource.length - $state.endIndex) * ITEM_HEIGHT
  }
}

export function resetStartIndex () {
  // 首尾各预留半屏的元素，减少上下滑动时白屏
  const count = Math.floor(MAX_ITEM_COUNT / 2)
  return $state.startIndex <= count ? 0 : $state.startIndex - count
}