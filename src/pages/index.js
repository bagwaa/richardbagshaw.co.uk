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
            <div className="w-full bg-gray-100 p-6 rounded-lg shadow">
              <h2 className="font-os font-extrabold text-3xl md:text-5xl tracking-wide text-gray-800">
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

            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div key={node.fields.slug}>
                  <div className="text-center">
                    <h3 className="text-center mb-8 text-3xl md:text-4xl font-medium text-gray-700 pt-8 leading-snug font-os tracking-wide">
                      <Link
                        className="shadow-none hover:text-blue-600"
                        to={node.fields.slug}
                      >
                        {title}
                      </Link>
                    </h3>
                  </div>
                  <div>
                    <div className="text-center font-semibold uppercase font-os text-lg text-gray-500 tracking-wide">
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
