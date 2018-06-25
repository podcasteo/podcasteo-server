export default function stringToSlug(string) {
  let slug = string

  slug = slug.replace(/^\s+|\s+$/g, '') // trim
  slug = slug.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaaaeeeeiiiioooouuuunc------'

  for (let i = 0, {
    length,
  } = from; i < length; i++) {
    slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  slug = slug
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '')
    .replace(/-+/g, '')

  return slug
}
