import React from "react"
import { Link } from "gatsby"
import "../css/styles.css"
import { Helmet } from "react-helmet"

class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    let header

    header = (
      <h3>
        <Link
          className="font-os bg-red-500 text-white py-1 px-4 uppercase text-sm font-semibold hover:bg-gray-800"
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )

    return (
      <div>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans"
            rel="stylesheet"
          />
        </Helmet>
        <header className="py-12 text-center">{header}</header>
        <main>{children}</main>
        <footer className="flex justify-center items-center h-64 mt-6 bg-gray-900">
          <span className="font-os text-gray-500 text-center">
            © {new Date().getFullYear()} Built by{" "}
            <a href="https://twitter.com/bagwaa">@bagwaa</a> using
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
            {` `}
            <br />
            and <a href="https://tailwindcss.com/">Tailwind CSS</a> ❤️
          </span>
        </footer>
      </div>
    )
  }
}

export default Layout
