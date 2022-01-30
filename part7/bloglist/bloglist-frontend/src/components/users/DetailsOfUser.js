import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const DetailsOfUser = () => {
  const user = useSelector((state) => state.users.filter(user => user.id === useParams().id))
  console.log('User', user)

  if(!user) return ''
  else
    return (
      <div>
        <h2>{user[0].name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user[0].blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
}

export default DetailsOfUser
