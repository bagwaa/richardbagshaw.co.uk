import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import sadGifisSad from "../../static/sad.gif"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <h1 className="text-center text-6xl mb-8">
          404{" "}
          <span role="img" aria-label="sad face">
            😔
          </span>
        </h1>
        <img
          src={sadGifisSad}
          alt="Four Oh Four - So Sorry!"
          className="w-1/3 rounded-lg shadow-lg mx-auto"
        />
        <p className="text-center font-os">
          You just hit a route that doesn&#39;t exist... the sadness is real
        </p>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
