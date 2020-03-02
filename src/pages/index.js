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
            <div className="w-full p-6">
              <h2 className="font-os font-bold text-2xl md:text-4xl tracking-wide text-gray-800">
                Hi, I'm Richard <span role="img" aria-label="waving">👋</span>
              </h2>
              <p className="inline-block font-os text-lg tracking-wide pt-6 pl-1 text-gray-800 w-full text-justify">
                I'm a{" "}
                <span className="font-bold italic text-green-600">
                  freelance
                </span>{" "}
                software developer and <a href="https://www.youtube.com/channel/UC5cM2sE9tQ9trKFZUiwv_7A">YouTuber</a> based in Nottingham, UK. I like
                to spend my free time learning everything I can about web development
                both frontend as well as backend.
                <br />
                <br />
                That includes everything from <a href="https://reactjs.org/">React</a> and <a href="https://vuejs.org/">Vue</a>, to <a href="https://www.php.net/">PHP</a> and <a href="https://laravel.com/">Laravel</a>.
              </p>
            </div>

            <div className="w-full p-6">
              <h3 className="font-os font-extrabold text-2xl md:text-2xl tracking-wide text-gray-800">
                Latest YouTube Content
              </h3>
            </div>

            <div className="iframe-container">
              <iframe 
                title="React Course on YouTube"
                className="p-6"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/sxV1krCtHuU" 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              >
              </iframe>
            </div>

            <div className="w-full p-6">
              <h3 className="font-os font-extrabold text-2xl md:text-2xl tracking-wide text-gray-800">
                All Posts, Ever!
              </h3>
            </div>

            {posts.map(({ node }, index) => {
              const title = node.frontmatter.title || node.fields.slug

              return (
                <div className="flex w-full px-6 py-2 hover:bg-gray-200" key={index}>
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
