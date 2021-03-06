import AddComment from './AddComment'

const ViewComments = ({ blog }) => {

  if(!blog.comments) return ''
  else
    return (
      <div id='comments'>
        <h2>Comments</h2>
        <h3>Add Comment</h3>
        <AddComment blog={blog} />
        <ul className='comments'>
          {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>

      </div>
    )
}

export default ViewComments