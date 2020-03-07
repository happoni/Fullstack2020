const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const initialValue = 0

  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, cur) => acc + cur.likes, initialValue)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return NaN
  }

  let maxLikes = 0
  let favBlog

  blogs.forEach(b => {
    if (b.likes > maxLikes) {
      favBlog = b
      maxLikes = b.likes
    }
  })

  return favBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}