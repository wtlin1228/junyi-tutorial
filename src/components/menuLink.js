import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "@emotion/styled"

// utils

// assets

// components

// self-defined-configs

// self-defined-components
const LinkWrapper = styled.li`
  position: relative;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => (props.isActive ? `100%` : `3px`)};
    background-color: #000000;
    transform: ${props => (props.isActive ? `scaleY(1)` : `scaleY(0)`)};
    transition: transform 0.2s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s,
      background-color 0.1s;
  }

  :hover::before {
    transform: scaleY(1);
    width: 100%;
  }

  a {
    color: ${props => (props.isActive ? `white` : `black`)};
    font-size: 0.875rem;
    text-decoration: none;
    display: block;
    padding: 0.5rem 0 0.5rem 0.75rem;
    position: relative;
    z-index: 10;
  }

  :hover a {
    color: white;
    mix-blend-mode: difference;
  }
`

const MenuLink = ({ isActive, url, title }) => {
  return (
    <LinkWrapper isActive={isActive}>
      <Link to={url}>{title}</Link>
    </LinkWrapper>
  )
}

MenuLink.propTypes = {
  isActive: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default MenuLink
