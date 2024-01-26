import React from "react";
import Layout from "../components/layout/Layout";

const Contactus = () => {
  return (
    <>
      <Layout title={'contact-us'}>
      <div className="container">
  <h1>Contact Us by FabForm.io</h1>
  <form action="https://fabform.io/f/{insert-form-id-here}" method="post">
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div className="form-group">
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" required defaultValue={""} />
    </div>
    <div className="form-group">
      <button type="submit">Submit</button>
    </div>
    <p>Powered by <a href="https://fabform.io" rel="noopener" target="_blank">fabform.io</a></p>
  </form>
</div>

      </Layout>
    </>
  );
};

export default Contactus;
