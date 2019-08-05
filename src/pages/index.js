import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />

        <div className="flex m-4">
          <div className="container lg:max-w-4xl mx-auto">
            <div className="w-full bg-blue-100 p-6 shadow">
              <h2 className="font-os font-bold text-3xl md:text-5xl tracking-wide text-gray-800">
                Hi, I'm Richard.
              </h2>
              <p className="inline-block font-os text-lg tracking-wide pt-6 pl-1 text-gray-800 w-full text-justify">
                I'm a{" "}
                <span className="font-bold italic text-green-600">
                  freelance
                </span>{" "}
                software developer and blogger based in Nottingham, UK. I like
                to spend time learning everything I can about web development
                both frontend as well as backend.
                <br />
                <br />
                That includes everything from React and Vue, to PHP and Laravel
                APIs
              </p>
            </div>

            <div className="w-full p-6">
              <h3 className="font-os font-extrabold text-2xl md:text-3xl tracking-wide text-gray-800">
                All Posts, Ever!
              </h3>
            </div>

            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug

              return (
                <div className="flex w-full px-6 py-2 hover:bg-gray-200">
                  <Img
                    sizes={node.frontmatter.icon.childImageSharp.sizes}
                    className="w-8 h-8 flex-none"
                  />
                  <p
                    key={node.fields.slug}
                    className="pl-3 text-lg font-medium text-gray-700 leading-snug font-os tracking-wide"
                  >
                    <Link
                      className="shadow-none hover:text-blue-600"
                      to={node.fields.slug}
                    >
                      {title}
                    </Link>
                  </p>
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
            icon {
              childImageSharp {
                sizes(maxWidth: 30) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
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
