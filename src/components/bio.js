/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          modified{
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const modified = data.site.siteMetadata?.modified
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio-mod">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.jpg"
        width={200}
        // aspectRatio={4/3}
        height={120}
        fit="inside"
        quality={100}
        alt="Profile picture"
      />
      <div className="bio-mod-summary">

      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null} 

        </p>
      )}
      {modified?.name && (
        <p>
                Modified by <strong>Daniel Politi.{author.name2}</strong> {author?.summary2 || null}

              </p>
      )}
      </div>
    </div>
  )
}

export default Bio
