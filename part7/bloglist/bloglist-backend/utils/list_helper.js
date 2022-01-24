const { max } = require("lodash");
const _ = require("lodash");

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((prev, current) => {
        return prev + current.likes;
      }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce(
        (prev, current) => {
          if (current.likes > prev.likes) {
            prev = {
              title: current.title,
              author: current.author,
              likes: current.likes,
            };
          }
          return prev;
        },
        {
          title: blogs[0].title,
          author: blogs[0].author,
          likes: blogs[0].likes,
        }
      );
};

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce(
        (maxBlogs, current) => {
          maxBlogs.authors[current.author] = maxBlogs.authors[current.author]
            ? maxBlogs.authors[current.author] + 1
            : 1;

          maxBlogs.maxBlog.author = maxBlogs.maxBlog.author
            ? maxBlogs.maxBlog.blogs < maxBlogs.authors[current.author]
              ? current.author
              : maxBlogs.maxBlog.author
            : current.author;

          maxBlogs.maxBlog.blogs = maxBlogs.maxBlog.blogs
            ? maxBlogs.maxBlog.blogs < maxBlogs.authors[current.author]
              ? maxBlogs.authors[current.author]
              : maxBlogs.maxBlog.blogs
            : maxBlogs.authors[current.author];

          //console.log(maxBlogs);
          return maxBlogs;
        },
        { authors: {}, maxBlog: {} }
      ).maxBlog;
};


const mostLikes = (blogs) => {
    return blogs.length === 0
      ? {}
      : blogs.reduce(
          (maxBlogs, current) => {
            maxBlogs.authors[current.author] = maxBlogs.authors[current.author]
              ? maxBlogs.authors[current.author] + current.likes
              : current.likes;
  
            maxBlogs.maxBlog.author = maxBlogs.maxBlog.author
              ? maxBlogs.maxBlog.likes < maxBlogs.authors[current.author]
                ? current.author
                : maxBlogs.maxBlog.author
              : current.author;
  
            maxBlogs.maxBlog.likes = maxBlogs.maxBlog.likes
              ? maxBlogs.maxBlog.likes < maxBlogs.authors[current.author]
                ? maxBlogs.authors[current.author]
                : maxBlogs.maxBlog.likes
              : maxBlogs.authors[current.author];
  
            //console.log(maxBlogs);
            return maxBlogs;
          },
          { authors: {}, maxBlog: {} }
        ).maxBlog;
  };

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
