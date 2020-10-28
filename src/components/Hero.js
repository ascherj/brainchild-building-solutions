import React from 'react';

const Hero = ({ image, title, subheading }) => (
  <div
    className="full-width-image margin-top-0"
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
        height: '150px',
        lineHeight: '1',
        justifyContent: 'space-around',
        alignItems: 'left',
        flexDirection: 'column',
      }}
    >
      <h1
        className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
        style={{
          boxShadow:
            'rgb(213, 0, 0) 0.5rem 0px 0px, rgb(213, 0, 0) -0.5rem 0px 0px',
          backgroundColor: 'rgb(213, 0, 0)',
          color: 'white',
          lineHeight: '1',
          padding: '0.25em',
        }}
      >
        {title}
      </h1>
      <h3
        className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
        style={{
          boxShadow:
            'rgb(213, 0, 0) 0.5rem 0px 0px, rgb(213, 0, 0) -0.5rem 0px 0px',
          backgroundColor: 'rgb(213, 0, 0)',
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
