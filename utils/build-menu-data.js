const capitalizeFirstLetter = s => s[0].toUpperCase() + s.slice(1)

const parsePath = path => {
  const [index, ...others] = path.split("-")
  const title = others.map(capitalizeFirstLetter).join(" ")
  const slug = others.join("-")

  return {
    index: +index,
    title,
    slug,
  }
}

const buildRouteFromRelativePath = relativePath => {
  const {
    index: parentIndex,
    title: parentTitle,
    slug: parentSlug,
  } = parsePath(relativePath.split("/")[0])
  const { title, slug } = parsePath(relativePath.split("/")[1])

  return {
    parentIndex,
    parentTitle,
    newRoute: {
      title,
      path: `/${parentSlug}/${slug}`,
    },
  }
}

const buildMenuData = data => {
  let menuData = []

  data.forEach(({ relativePath }) => {
    const { parentIndex, parentTitle, newRoute } = buildRouteFromRelativePath(
      relativePath
    )

    if (menuData[parentIndex]) {
      menuData[parentIndex].items.push(newRoute)
      return
    }

    menuData[parentIndex] = {
      title: parentTitle,
      items: [newRoute],
    }
  })

  return menuData
}

module.exports = { buildRouteFromRelativePath, buildMenuData }
