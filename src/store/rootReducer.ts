import { combineReducers } from 'redux'
import postsReducer, { postsKey } from '@/store/slices/postsSlice'

const rootReducer = combineReducers({
  [postsKey]: postsReducer,
})

export default rootReducer
