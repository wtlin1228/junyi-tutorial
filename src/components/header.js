import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => {
  return (
    <header
      css={{
        background: `black`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        css={{
          margin: `0 auto`,
          maxWidth: 1200,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1>
          <Link
            to="/"
            css={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
