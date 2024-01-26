import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return(
  <>
    <Layout title={'ecommerce-Aboutus'}>
    <div className="about-section">
  <div className="inner-container">
    <h1>About Us</h1>
    <p className="text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit ducimus, enim inventore earum, eligendi nostrum pariatur necessitatibus eius dicta a voluptates sit deleniti autem error eos totam nisi neque voluptates sit deleniti autem error eos totam nisi neque.
    </p>
    <div className="skills">
      <span>Web Design</span>
      <span>Photoshop &amp; Illustrator</span>
      <span>Coding</span>
    </div>
  </div>
</div>

    </Layout>
  </>
  )
};

export default About;
