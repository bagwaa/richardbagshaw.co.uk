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
          className="px-8 py-3 text-sm font-semibold text-white uppercase bg-gray-900 font-os"
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
          <script>
            var clicky_site_ids = clicky_site_ids || [];
            clicky_site_ids.push(101198792);
          </script>
          <script async src="//static.getclicky.com/js"></script>
        </Helmet>
        <header className="py-12 text-center">{header}</header>
        <main>{children}</main>
        <footer className="flex items-center justify-center h-64 mt-6 bg-gray-900">
          <span className="text-center text-gray-500 font-os">
            © {new Date().getFullYear()} Built by{" "}
            <a href="https://twitter.com/bagwaa">@bagwaa</a> using
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
            {` `}
            <br />
            and <a href="https://tailwindcss.com/">Tailwind CSS</a> ❤️
            {` `}
            <br />
            <br />
            Please direct all enquiries to <a href="mailto:richard@bagshaw.co.uk">richard@bagshaw.co.uk</a> and I will respond as soon as possible.
          </span>
        </footer>
      </div>
    )
  }
}

export default Layout
