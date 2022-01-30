import blogService from '../services/blogs'
import { notification } from './notificationReducer'

const blogsReducer = (state = [], action) => {
  switch(action.type){
  case 'INIT_BLOG':
    return action.data

  case 'CREATE_BLOG':
    return [...state, action.data]

  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.id)

  case 'LIKE_BLOG':
    return state.map(blog => blog.id === action.data.id ? { ...blog, likes: action.data.content.likes } : blog)

  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    await dispatch({
      type: 'INIT_BLOG',
      data
    })
  }
}

export const addNewBlog = (content) => {
  return async dispatch => {
    const data = await blogService.postBlog(content)

    if(data){
      await dispatch(notification((`a new blog ${content.title} by ${content.author} is added`)))
      await dispatch({
        type: 'CREATE_BLOG',
        data
      })
    }
    else await dispatch(notification('cannot add blog'))

  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const response = await blogService.removeBlog(id)

    if(response.status === 202){
      await dispatch({
        type: 'REMOVE_BLOG',
        id
      })
    }
  }
}

export const likeBlog = (id, content) => {
  return async dispatch => {
    await dispatch({
      type: 'LIKE_BLOG',
      data: { id, content }
    })
    await blogService.updateBlog(id, content)
  }
}

export default blogsReducer