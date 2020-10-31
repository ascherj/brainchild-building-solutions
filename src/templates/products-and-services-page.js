import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import styled from 'styled-components';

const ProductsAndServicesPageStyles = styled.div`
  div.content {
    text-align: center;
  }
`;

export const ProductsAndServicesPageTemplate = ({ image, heading }) => (
  <ProductsAndServicesPageStyles>
    <Hero image={image} heading={heading} subheading="" />
    <section className="section">
      <div className="container">
        <div className="content">
          <h1>
            <span role="img" aria-label="construction-emoji">
              🏗️
            </span>{' '}
            This page is under construction{' '}
            <span role="img" aria-label="construction-emoji">
              🏗️
            </span>
          </h1>
        </div>
      </div>
    </section>
  </ProductsAndServicesPageStyles>
);

ProductsAndServicesPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
};

const ProductsAndServicesPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProductsAndServicesPageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
      />
    </Layout>
  );
};

ProductsAndServicesPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductsAndServicesPage;

export const productsAndServicesPageQuery = graphql`
  query ProductsAndServicesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
      }
    }
  }
`;
