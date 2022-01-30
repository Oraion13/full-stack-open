import React, { useEffect } from 'react'
import Login from './components/login/Login'
import Users from './components/users/Users'
import DetailsOfUser from './components/users/DetailsOfUser'
import DetailsOfBlog from './components/blogs/DetailsOfBlog'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  // get all data
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  // store user credentials and token
  useEffect(() => {
    dispatch(setUser())
  }, [])

  const padding = {
    padding: 5,
  }

  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
        </div>

        {notification}

        <Routes>
          <Route path="/blogs/:id" element={<DetailsOfBlog />} />
          <Route path="/users/:id" element={<DetailsOfUser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
