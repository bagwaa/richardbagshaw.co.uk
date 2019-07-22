/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className="flex mb-8 border p-6 rounded-lg bg-gray-100">
      <div className="hidden md:block">
        <Image
          className="mr-4"
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      </div>

      <p className="font-os">
        Written by <strong>{author}</strong> a php, javascript, vue and react
        freelancer who lives and works in Nottingham, UK.
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          Follow me on Twitter
        </a>
      </p>
    </div>
  )
}

export default Bio
