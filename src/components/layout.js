/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import "./layout.css"

import { buildMenuData } from "../../utils/build-menu-data"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      allDirectory(
        filter: { relativeDirectory: { regex: "/[0-9]{2}-[a-zA-Z]*/i" } }
      ) {
        nodes {
          name
          relativePath
        }
      }
    }
  `)

  const menuData = buildMenuData(data.allDirectory.nodes)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title || `Title`} />
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: 300,
          }}
        >
          {menuData.map(({ title, items }) => (
            <div key={`${title}`}>
              <div>{title}</div>
              {items.map(({ title: subTitle, path }) => (
                <div key={path}>
                  <Link to={path}>{subTitle}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main>{children}</main>
          <footer
            style={{
              marginTop: `2rem`,
            }}
          >
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
