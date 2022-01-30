import { useDispatch, useSelector } from 'react-redux'
import { getOneUser } from '../../reducers/usersReducer'

const DetailsOfUser = (props) => {
  const dispatch = useDispatch()
  dispatch(getOneUser(props.id))
  const users = useSelector((state) => state.users)

  console.log('called', props.id)
  return (
    <div>
      <h2>{users[0].name}</h2>
      <h3>added blogs</h3>
      <ul>{users[0].blogs.map(blog => (
        <li key={blog.id}>
          {blog.title}
        </li>
      ))}</ul>
    </div>
  )
}

export default DetailsOfUser