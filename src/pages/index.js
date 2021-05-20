import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import projectTwindig1 from "../../static/twindig1.png"
import projectTwindig2 from "../../static/twindig2.png"
import projectRentora1 from "../../static/rentora1.png"
import projectRentora2 from "../../static/rentora2.png"
import projectTransferMyBills1 from "../../static/transfermybills.png"
import projectTransferMyBills2 from "../../static/transfermybills2.png"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Freelance Web Developer" />

        <div className="flex sm:m-0 md:m-4">
          <div className="container mx-auto lg:max-w-4xl">
            <div className="w-full p-6">
              <h2 className="text-2xl font-bold tracking-wide text-gray-800 font-os md:text-4xl">
                Hi, I'm Richard <span role="img" aria-label="waving">👋</span>
              </h2>
              <p className="inline-block w-full pt-6 text-lg tracking-wide text-justify text-gray-800 font-os">
                I'm a{" "}
                <span className="italic font-bold text-green-600">
                  software developer
                </span>{" "}
                based in Nottingham, UK. I like
                to spend my free time learning everything I can about web development
                both frontend and backend.
                <br />
                <br />
                That includes technologies such as <a href="https://laravel.com/">Laravel</a>, <a href="https://www.php.net/">PHP</a>, <a href="https://laravel-livewire.com/">Laravel Livewire</a>, <a href="https://tailwindcss.com/">Tailwind CSS</a>, <a href="https://vuejs.org/">Vue</a> and <a href="https://github.com/alpinejs/alpine/">AlpineJS</a>
                <br />
                <br />
                I am currently working in a fully remote role as a Senior Product Architect @ <a href="https://www.leadwithprimitive.com">leadwithprimitive.com</a> based in Lubbock, Texas.
              </p>
            </div>

            <div className="youtube-container">
              <iframe
                title="HTML & CSS Challenge on Frontend Mentor"
                className="p-6"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/iHF_PP6yurQ"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              >
              </iframe>
            </div>

            <div className="w-full p-6">
              <h3 className="text-2xl font-extrabold tracking-wide text-gray-800 font-os md:text-2xl">
                All Blog Posts, Written, Ever!
              </h3>
            </div>

            <div className="flex flex-wrap w-full">
                {posts.map(({ node }, index) => {
                  const title = node.frontmatter.title || node.fields.slug

                  return (
                    <div className="flex w-1/2 px-6 py-2 hover:bg-gray-200" key={index}>
                      <Img
                        sizes={node.frontmatter.icon.childImageSharp.sizes}
                        className="flex-none w-8 h-8"
                      />
                      <p
                        key={node.fields.slug}
                        className="pl-3 text-lg font-medium leading-snug tracking-wide text-gray-700 font-os"
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
