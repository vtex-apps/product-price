import slugify from 'slugify'

export function slug(str: string) {
  const replaced =
    (typeof str === 'string' && str.replace(/[*+~.()'"!:@&[\]]/g, '')) || ''

  const slugified = slugify(replaced, { lower: true }) || ''

  return slugified
}
