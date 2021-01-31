/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Global, ThemeProvider, css } from "@emotion/react"

// components
import Header from "./header"
import MenuLink from "./menuLink"

import { buildMenuData } from "../../utils/build-menu-data"

const theme = {
  colors: {
    primaryLight: `#b5ffff`,
    primary: `#7ff0ff`,
    primaryDark: `#46bdcc`,
    textOnPrimary: `#a56277`,
    secondaryLight: `#ffff80`,
    secondary: `#f4ef4c`,
    secondaryDark: `#bebd02`,
    textOnSecondary: `#e27175`,
  },
}

const Layout = ({ currentPath, children }) => {
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
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
          }

          * + * {
            margin-top: 1rem;
          }

          html,
          body {
            margin: 0;
            color: #555;
            font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-size: 18px;
            line-height: 1.4;

            /* remove margin for the main div that Gatsby mounts into */
            > div {
              margin-top: 0;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              color: #222;
              line-height: 1.1;

              + * {
                margin-top: 0.5rem;
              }
            }

            strong {
              color: #222;
            }

            li {
              margin-top: 0.25rem;
            }
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <Header siteTitle={data.site.siteMetadata.title || `Title`} />
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              width: 250,
              marginTop: `1rem`,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
            <nav>
              {menuData.map(({ title, items }) => (
                <div key={`${title}`}>
                  <div>{title}</div>
                  <ul
                    css={css`
                      list-style: none;
                      padding-inline-start: 0;
                    `}
                  >
                    {items.map(({ title: subTitle, path }) => (
                      <MenuLink
                        key={path}
                        isActive={currentPath === path}
                        url={path}
                        title={subTitle}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div
            style={{
              maxWidth: 960,
              padding: `0 1.0875rem 1.45rem`,
              marginLeft: `3rem`,
            }}
          >
            <main>{children}</main>
            <footer
              style={{
                marginTop: `2rem`,
              }}
            >
              © {new Date().getFullYear()}, Built by
              {` `}
              <a href="https://github.com/wtlin1228">wtlin1228</a>
            </footer>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  currentPath: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
