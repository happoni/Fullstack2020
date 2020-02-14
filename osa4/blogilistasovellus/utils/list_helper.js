const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const initialValue = 0

  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, cur) => acc + cur.likes, initialValue)
}

module.exports = {
  dummy,
  totalLikes,
}