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
                  freelance
                </span>{" "}
                software developer, <a target="_new" href="https://www.youtube.com/channel/UC5cM2sE9tQ9trKFZUiwv_7A">YouTuber</a> and <a target="_new" href="https://www.thefreelancedeveloper.co.uk/">Podcaster</a> based in Nottingham, UK. I like
                to spend my free time learning everything I can about web development
                both frontend as well as backend.
                <br />
                <br />
                That includes everything from <a href="https://reactjs.org/">React</a> and <a href="https://vuejs.org/">Vue</a>, to <a href="https://www.php.net/">PHP</a> and <a href="https://laravel.com/">Laravel</a>.
                <br />
                <br />
                You can contact me on <a href="mailto:richard@bagshaw.co.uk">richard@bagshaw.co.uk</a> or <a href="tel:07545 966 851">07545 966 851</a> to discuss your requirements further.
              </p>
            </div>

            <div className="w-full px-6">
              <h3 className="text-2xl font-extrabold tracking-wide text-gray-800 font-os md:text-2xl">
                YouTube & Podcast
              </h3>
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

            <div className="inline-block w-full px-6 md:w-1/2">
              <iframe
                className="border border-gray-500"
                title="The Freelance Developer Podcast"
                height="200px"
                width="100%"
                frameborder="no"
                scrolling="no"
                seamless
                src="https://player.simplecast.com/9bf0e9fe-9d9f-43b4-9acb-a406f412ea2f?dark=false">
              </iframe>
            </div>

            <div className="inline-block w-full px-6 md:w-1/2">
              <iframe
                className="border border-gray-500"
                title="The Freelance Developer Podcast"
                height="200px"
                width="100%"
                frameBorder="no"
                scrolling="no"
                seamless
                src="https://player.simplecast.com/27b1d4f8-3f6e-47f7-8365-a6b8115073ca?dark=false">
              </iframe>
            </div>

            <div className="w-full p-6">
              <h3 className="text-2xl font-extrabold tracking-wide text-gray-800 font-os md:text-2xl">
                All Blog Posts, Written, Ever!
              </h3>
            </div>

            {posts.map(({ node }, index) => {
              const title = node.frontmatter.title || node.fields.slug

              return (
                <div className="flex w-full px-6 py-2 hover:bg-gray-200" key={index}>
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

            <div className="w-full p-6">
              <h3 className="text-2xl font-extrabold tracking-wide text-gray-800 font-os md:text-2xl">
                Previous Freelance Projects
              </h3>
            </div>

            <div className="w-full px-6">
              <div className="pb-3 mb-3 text-gray-800 border-b font-os">
                <div className="mb-2 font-extrabold tracking-wide text-1xl md:text-1xl">
                  Twindig.com (<a href="https://www.twindig.com/" target="_new">https://www.twindig.com</a>)
                </div>
                <p class="font-bold text-green-500">Technical Stack: PHP, Laravel, Livewire and Alpine</p>
                <p class="mt-3">
                  <a href="https://www.twindig.com/" target="_new">Twindig.com</a> is a new kind of property platform that will help you make smarter decisions at every stage of your property journey.
                </p>
                <p className="mt-3">
                    Twindig lets you securely store your essential documents in one easy to access place and makes sure you never forget a renewal date when you use our clever reminders tool.
                </p>
                <p className="mt-3">
                    Monitor your home and those that you follow. Discover valuable information about where you live, where you are going to live and where you’d love to live.
                </p>
                <p className="mt-3">
                    Make buying and selling easier by bringing the whole market into reach. Twindig allows you and your agent to showcase your home giving potential buyers more reasons to buy it and gives you the confidence you need to sell quicker and move faster.
                </p>
              </div>

              <div className="inline-block w-1/2 pr-1">
                <a href="https://www.twindig.com/" target="_new">
                  <img src={projectTwindig1} alt="Link to Twindig Homepage" />
                </a>
              </div>
              <div className="inline-block w-1/2 pl-1">
                <a href="https://rentora.co.uk/listings/in/london" target="_new">
                  <img src={projectTwindig2} alt="Link to Twindig Homepage" />
                </a>
              </div>
            </div>

            <div className="w-full px-6">
              <div className="pb-3 mb-3 text-gray-800 border-b font-os">
                <div className="mb-2 font-extrabold tracking-wide text-1xl md:text-1xl">
                  Rentora (<a href="https://rentora.co.uk/" target="_new">https://rentora.co.uk</a>)
                </div>
                <p class="font-bold text-green-500">Technical Stack: PHP, Laravel, Vue, Json API</p>
                <p class="mt-3">
                  <a href="https://rentora.co.uk/" target="_new">rentora.co.uk</a> makes it easy to list properties, find tenants, manage tenancies, collect rent and more.
                </p>
                <p className="mt-3">
                List your property, review applications, manage tenancies, perform inventories, share documents, get paid and more - anywhere, on any device, 24/7.
                </p>
              </div>

              <div className="inline-block w-1/2 pr-1">
                <a href="https://rentora.co.uk/" target="_new">
                  <img src={projectRentora1} alt="Link to Rentora Homepage" />
                </a>
              </div>
              <div className="inline-block w-1/2 pl-1">
                <a href="https://rentora.co.uk/listings/in/london" target="_new">
                  <img src={projectRentora2} alt="Link to Rentora Property Listings" />
                </a>
              </div>
            </div>

            <div className="w-full px-6">
              <div className="pb-3 mb-3 text-gray-800 border-b font-os">
                <div className="mb-2 font-extrabold tracking-wide text-1xl md:text-1xl">
                  TransferMyBills (<a href="https://transfermybills.com/" target="_new">https://transfermybills.com</a>)
                </div>
                <p class="font-bold text-green-500">Technical Stack: PHP, Laravel</p>
                <p class="mt-3">
                Relocating can be stressful, but contacting everyone is easy using our free service.  Let <a href="https://transfermybills.com/" target="_new">transfermybills.com</a> notify existing utility, insurance and service providers of your impending move
                </p>
              </div>

              <div className="inline-block w-1/2 pr-1">
                <a href="https://transfermybills.com/" target="_new">
                  <img src={projectTransferMyBills1} className="mx-auto" alt="Link to TransferMyBills Homepage" />
                </a>
              </div>
              <div className="inline-block w-1/2 pl-1">
                <a href="https://transfermybills.com/" target="_new">
                  <img src={projectTransferMyBills2} className="mx-auto" alt="Link to TransferMyBills Homepage" />
                </a>
              </div>
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
