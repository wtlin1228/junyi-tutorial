import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
      }
      body
    }
  }
`

const DocTemplate = ({ location, data: { mdx: doc } }) => (
  <Layout currentPath={location.pathname}>
    <h1>{doc.frontmatter.title}</h1>
    <p>Posted by {doc.frontmatter.author}</p>
    <MDXRenderer>{doc.body}</MDXRenderer>
    <Link to="/">&larr; back to all docs</Link>
  </Layout>
)

DocTemplate.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
}

export default DocTemplate
