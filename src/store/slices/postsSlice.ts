import { QUERY_PARAMETERS, STATUS } from '@/config/constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPosts } from '@/utils/graphql/getPosts'
import { IPageInfo, IPost } from '@/types'

interface IState {
  data: {
    nodes: IPost[]
    pageInfo: IPageInfo
  }
  status: string
  error: string | null | unknown
  filter: {
    category: string
    page: number
  }
}

const initialState = {
  data: {
    nodes: [],
    pageInfo: {} as IPageInfo,
  },
  status: STATUS.IDLE,
  error: null,
  filter: {
    category: '',
    page: 1,
  },
}

export const postsKey = 'Posts'

export const fetchPosts = createAsyncThunk(
  `${postsKey}/fetch`,
  async ({
    category = '',
    limit = QUERY_PARAMETERS.LIMIT,
  }: {
    category: string
    limit?: number
  }) => {
    // TODO: fix double request
    console.log('fetching posts')
    if (category === 'latest-posts') {
      category = ''
      limit = QUERY_PARAMETERS.LATEST
    }
    const { posts } = await getPosts({ category, limit })
    return posts
  },
)

export const postsSlice = createSlice({
  name: postsKey,
  initialState,
  reducers: {
    setCategory: (state: IState, action) => {
      state.filter = { category: action.payload, page: 1 }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state: IState) => {
        state.status = STATUS.PENDING
        state.error = null
        state.data = { nodes: [], pageInfo: {} as IPageInfo }
      })
      .addCase(fetchPosts.fulfilled, (state: IState, action) => {
        state.status = STATUS.FULFILLED
        state.data = action.payload
      })
      .addCase(fetchPosts.rejected, (state: IState, action) => {
        state.data = { nodes: [], pageInfo: {} as IPageInfo }
        state.error = action.payload
        state.status = STATUS.REJECTED
      })
  },
})

export const { setCategory } = postsSlice.actions

export const selectPosts = (state: { [key: string]: unknown }) =>
  state[postsKey]

export default postsSlice.reducer
