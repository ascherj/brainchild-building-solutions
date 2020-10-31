import React from 'react';

const Hero = ({ image, heading, subheading }) => (
  <div
    className="full-width-image margin-top-0 my-hero"
    style={{
      backgroundImage: `url(${
        !!image.childImageSharp ? image.childImageSharp.fluid.src : image
      })`,
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}
  >
    <div
      style={{
        display: 'flex',
        height: '100px',
        lineHeight: '1',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: '11',
      }}
    >
      <h1
        className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
        style={{
          color: 'white',
          lineHeight: '1',
          padding: '0.25em',
        }}
      >
        {heading}
      </h1>
      <h3
        className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
        style={{
          color: 'white',
          lineHeight: '1',
          padding: '0.25em',
        }}
      >
        {subheading}
      </h3>
    </div>
  </div>
);

export default Hero;
