
import Display from "./Display";

const Blog = (props) => {
    return (
        <>
        {props.blogs.map((blog) => (
        <Display key={blog.id} title={blog.title} author={blog.author} />
      ))}
        </>
    )
}

export default Blog;