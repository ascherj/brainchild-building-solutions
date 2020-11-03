import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Img from 'gatsby-image';
import styled from 'styled-components';

const FounderStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 275px 1fr;
  align-items: center;

  @media (max-width: 1000px) {
    grid-template-columns: auto;
  }
`;

export const AboutPageTemplate = ({
  title,
  content,
  contentComponent,
  image1,
}) => {
  const PageContent = contentComponent || Content;
  const { image, alt } = image1;

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h3 className="title is-size-3 has-text-weight-bold">{title}</h3>
              <FounderStyles className="mark-ascher content">
                <Img fixed={image.childImageSharp.fixed} alt={alt} />
                <div>
                  <h2 className="is-size-2">
                    Brainchild's Founder, Mark Ascher
                  </h2>
                  <p>
                    Brainchild Building Solutions founder, Mark Ascher, is a
                    salesman, design partner, and engineer. He obtained a B.S.
                    in Civil Engineering from Northeastern University in 1987,
                    and has subsequently worked 30+ years in the building
                    industry. Mark credits his engineering background and years
                    of industry experience as critical components to the success
                    of Brainchild Building Solutions. He emphasizes relationship
                    building and understanding of the customer's vision in order
                    to deliver exceptional service with enthusiasm and value.
                    These factors separate him from the typical lumber yard
                    salesman and enable him to position himself strategically in
                    the field helping builders and developers achieve their
                    construction goals.
                  </p>
                </div>
              </FounderStyles>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        image1={post.frontmatter.image1}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image1 {
          alt
          image {
            childImageSharp {
              fixed(width: 250, height: 250) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
