import React from "react"
import { Link } from "gatsby"
import "../css/styles.css"
import { Helmet } from "react-helmet"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={`/`}>{title}</Link>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link
            className="bg-red-500 text-white py-2 px-4 uppercase font-opensans text-sm font-semibold hover:bg-gray-800"
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans"
            rel="stylesheet"
          />
        </Helmet>
        <header className="pt-16 text-center pb-12">{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
