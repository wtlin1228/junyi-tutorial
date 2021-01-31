/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { buildRouteFromRelativePath } = require("./utils/build-menu-data")

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type DocsPage implements Node @dontInfer {
      id: ID!
      title: String!
      slug: String!
      path: String!
      updated: Date! @dateformat
      body: String! 
    }
  `)
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const parent = getNode(node.parent)

  // Only work on MDX files that were loaded by this theme
  if (node.internal.type !== "Mdx") {
    return
  }

  const {
    newRoute: { path },
  } = buildRouteFromRelativePath(parent.relativeDirectory)

  actions.createNode({
    id: createNodeId(`DocsPage-${node.id}`),
    title: node.frontmatter.title || parent.name,
    slug: node.frontmatter.slug,
    path,
    updated: parent.modifiedTime,
    parent: node.id,
    internal: {
      type: "DocsPage",
      contentDigest: node.internal.contentDigest,
    },
  })
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    DocsPage: {
      body: {
        type: "String!",
        resolve: (source, args, context, info) => {
          // Load the resolver for the `Mdx` type `body` field
          const type = info.schema.getType("Mdx")
          const mdxFields = type.getFields()
          const resolver = mdxFields.body.resolve

          const mdxNode = context.nodeModel.getNodeById({ id: source.parent })

          return resolver(mdxNode, args, context, {
            fieldName: "body",
          })
        },
      },
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allDocsPage {
        nodes {
          path
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic("failed to create docs", result.errors)
  }

  const docs = result.data.allDocsPage.nodes

  docs.forEach(doc => {
    actions.createPage({
      path: doc.path,
      component: require.resolve("./src/templates/docs.js"),
      context: {
        slug: doc.slug,
      },
    })
  })
}
