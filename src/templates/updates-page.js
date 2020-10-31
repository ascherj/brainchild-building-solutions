import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import styled from 'styled-components';

const UpdatesPageStyles = styled.div`
  div.content {
    text-align: center;
  }
`;

export const UpdatesPageTemplate = ({ image, heading, subheading }) => {
  return (
    <UpdatesPageStyles>
      <Hero image={image} heading={heading} subheading={subheading} />
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
    </UpdatesPageStyles>
  );
};

UpdatesPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
};

const UpdatesPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <UpdatesPageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
      />
    </Layout>
  );
};

UpdatesPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UpdatesPage;

export const updatesPageQuery = graphql`
  query UpdatesPage {
    markdownRemark(frontmatter: { templateKey: { eq: "updates-page" } }) {
      frontmatter {
        heading
        subheading
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
