import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Features from '../components/Features';
import BlogRoll from '../components/BlogRoll';
import Hero from '../components/Hero';

const Description = ({ description }) => (
  <div className="section">
    <div className="container">
      <div className="section">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <h3>{description}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Products = ({ description, products }) => (
  <div className="section" style={{ background: '#eee' }}>
    <div className="container">
      <div className="section">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h3 className="has-text-weight-semibold is-size-3">
              What We Offer
            </h3>
            <p>{description}</p>
          </div>
        </div>
        <Features gridItems={products.blurbs} />
        <div className="columns">
          <div className="column is-12 has-text-centered">
            <Link className="btn" to="/products-and-services">
              See all products
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LatestStories = () => (
  <div className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <div className="content">
            <div className="column is-12">
              <h3 className="has-text-weight-semibold is-size-2">
                Latest stories
              </h3>
              <BlogRoll />
              <div className="column is-12 has-text-centered">
                <Link className="btn" to="/blog">
                  Read more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const IndexPageTemplate = ({
  image,
  heading,
  subheading,
  mainpitch,
  description,
  products,
}) => (
  <div>
    <Hero image={image} heading={heading} subheading={subheading} />
    <Description description={mainpitch.description} />

    {/* <Products description={description} products={products} /> */}
    {/* <LatestStories /> */}
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  products: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        products={frontmatter.products}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        products {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
