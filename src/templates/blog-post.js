import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div></div>

        <div className="flex">
          <div className="container mx-auto mt-6 px-1 md:w-full lg:w-3/4 xl:w-2/6">
            <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes} />

            <h1 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold text-gray-700 pt-6 leading-snug font-opensans tracking-wide">
              {post.frontmatter.title}
            </h1>

            <p className="text-center font-semibold uppercase font-opensans text-sm text-gray-500 py-6 tracking-wide">
              Published {post.frontmatter.date} By {post.frontmatter.author}
            </p>

            <div
              className="blog-content font-opensans text-lg text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <ul className="flex justify-between py-8 font-opensans text-blue-700 font-bold">
              <li>
                {previous && (
                  <Link
                    to={previous.fields.slug}
                    className="shadow-none"
                    rel="prev"
                  >
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link
                    to={next.fields.slug}
                    className="shadow-none"
                    rel="next"
                  >
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>

            <Bio />
            <div className="mt-8 py-10">
              <Comments />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

class Comments extends React.Component {
  constructor(...args) {
    super(...args)
    this.ref = React.createRef()
  }
  render() {
    return (
      <div ref={this.ref} className="comments">
        <div id="commento"></div>
      </div>
    )
  }
  componentDidMount() {
    const s = document.createElement("script")
    s.src = "https://cdn.commento.io/js/commento.js"
    s.setAttribute("data-timestamp", +new Date())
    this.ref.current.appendChild(s)
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
`
