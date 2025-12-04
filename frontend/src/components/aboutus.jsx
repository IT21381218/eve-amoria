import React from 'react';
import { CardContainer, CardBody, CardItem } from './ui/card-3d';
import '../styles/about.css';

const AboutUs = () => {
  const features = [
    {
      image: "https://res.cloudinary.com/dwcxwpn7q/image/upload/v1734601339/zade/808867832474604375_urxq7d.png",
      title: "World Wide Shipping",
      description: "We deliver our products globally with reliable tracking and efficient delivery times to ensure your satisfaction."
    },
    {
      image: "https://res.cloudinary.com/dwcxwpn7q/image/upload/v1734601339/zade/808867832474604375_urxq7d.png",
      title: "Secure Online Payment",
      description: "Your transactions are protected with industry-leading encryption and secure payment gateways."
    },
    {
      image: "https://res.cloudinary.com/dwcxwpn7q/image/upload/v1734601339/zade/808867832474604375_urxq7d.png",
      title: "Totally Discreet Package",
      description: "We ensure your privacy with discrete packaging and confidential handling of all orders."
    }
  ];

  return (
    <div className="about-container">
      <h1 className="about-title">Why Choose Us</h1>
      <div className="features-grid">
        {features.map((feature, index) => (
          <CardContainer key={index}>
            <CardBody className="card-body">
              <CardItem
                translateZ={50}
                className="card-media"
              >
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="card-img"
                />
              </CardItem>
              <CardItem
                as="h2"
                translateZ={30}
                className="card-title"
              >
                {feature.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ={40}
                className="card-desc"
              >
                {feature.description}
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;