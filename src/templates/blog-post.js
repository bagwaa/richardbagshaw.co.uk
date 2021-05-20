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
          image={post.frontmatter.featuredImage.childImageSharp.sizes.src}
          siteUrl={this.props.location.origin}
          postUrl={this.props.location.href}
        />

        <div className="flex m-4">
          <div className="container mx-auto lg:max-w-4xl">
            <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes} />
            <h1 className="pt-6 text-4xl font-medium leading-snug tracking-wide text-center text-gray-700 md:text-5xl font-os">
              {post.frontmatter.title}
            </h1>
            <p className="py-6 text-sm font-semibold tracking-wide text-center text-gray-500 uppercase font-os">
              Published {post.frontmatter.date} By {post.frontmatter.author} -{" "}
              <a className="capitalize" href={post.frontmatter.gitHubPageLink}>
                Edit page on Github
              </a>
            </p>
            <Bio />
            <div
              className="px-3 text-lg leading-relaxed text-gray-700 blog-content font-os"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <ul className="flex justify-around py-8 font-bold text-blue-700 font-os">
              <li>
                {previous && (
                  <Link
                    to={previous.fields.slug}
                    className="shadow-none"
                    rel="prev"
                  >
                    ← Prev
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
                    Next →
                  </Link>
                )}
              </li>
            </ul>
            <Bio />
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
        gitHubPageLink
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
