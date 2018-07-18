export default (type, item) => {
  if (item.avatar) {
    return item.avatar
  }

  return `https://res.cloudinary.com/podcasteo/image/upload/v2/${type}/${item.slug}/avatar/default.jpg`
}
