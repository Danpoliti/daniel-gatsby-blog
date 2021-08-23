import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Articles" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <article key={post.fields.slug}>
              <article
                className="index-article"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header className="index-article-summary">
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span className="article-title">{title}</span>
                    </Link>
                  </h2>
                  <div className="index-article-date">
                    <small>{post.frontmatter.date}</small>
                  </div>
                  <section className="index-keep-reading">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                    <Link to={post.fields.slug} itemProp="url">[ Keep reading ]</Link>
                  </section>
                </header>
                <div className="index-article-img">
                  <Link to={post.fields.slug} itemProp="url">
                    <img src={
                      post.frontmatter.image || "lotr-amazon-article.jpg"
                    } alt=""
                      width={380}
                      // aspectRatio={4/3}
                      // height={120}
                      // fit="inside"
                      // quality={100} 
                      className="article-img"
                    />
                  </Link>
                </div>
              </article>
            </article>
          )
        })}
      </ol>
    </Layout>
  )
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
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          image
        }
      }
    }
  }
`
