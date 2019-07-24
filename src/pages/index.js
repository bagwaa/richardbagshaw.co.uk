import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />

        <div className="flex">
          <div className="container lg:max-w-4xl mx-auto">
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div key={node.fields.slug}>
                  <div className="text-center">
                    <h3 className="text-center mb-8 text-4xl md:text-5xl font-medium text-gray-700 pt-6 leading-snug font-os tracking-wide">
                      <Link to={node.fields.slug}>{title}</Link>
                    </h3>
                  </div>
                  <div>
                    <div className="text-center font-semibold uppercase font-os text-lg text-gray-500 py-6 tracking-wide">
                      <small>
                        Published on {node.frontmatter.date} by{" "}
                        {node.frontmatter.author}
                      </small>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            author
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 800) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`
