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
          <div className="container lg:max-w-4xl mx-auto">
            <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes} />
            <h1 className="text-center text-4xl md:text-5xl font-medium text-gray-700 pt-6 leading-snug font-os tracking-wide">
              {post.frontmatter.title}
            </h1>
            <p className="text-center font-semibold uppercase font-os text-sm text-gray-500 py-6 tracking-wide">
              Published {post.frontmatter.date} By {post.frontmatter.author} -{" "}
              <a className="capitalize" href={post.frontmatter.gitHubPageLink}>
                Edit page on Github
              </a>
            </p>
            <Bio />
            <div
              className="blog-content font-os text-lg text-gray-700 leading-relaxed px-3"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <ul className="flex justify-around py-8 font-os text-blue-700 font-bold">
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
            <div className="signup min-w-full font-os p-8 rounded bg-gray-100 border">
              <form
                name="newsletter"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/success"
              >
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="newsletter" />
                <h2 className="font-os text-2xl text-gray-700 font-semibold tracking-wide">
                  Join the Newsletter
                </h2>
                <p className="font-os text-lg text-gray-800 leading-relaxed py-6">
                  I write about PHP, JavaScript frameworks such as React and
                  Vue, and programming in general, Keep up with my content and
                  unsubscribe whenever.
                  <span className="text-red-700 font-bold italic">
                    Never any spam
                  </span>
                  ,{" "}
                  <span className="text-green-700 font-bold italic">
                    only useful content
                  </span>
                  .
                </p>
                <p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    className="bg-blue-500 ml-2 w-24 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

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
