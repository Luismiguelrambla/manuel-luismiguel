import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Contact Us</h1>
      <p className="sub-title">Please start a conversation</p>

      <div id="contact-container">
        <div className="contact-info">
          <h4>Contact Information</h4>
          <p>Fill up the form and then click send</p>
          <div className="icon-text">
            <i class="fa fa-phone" aria-hidden="true"></i>
            <span>+34 258-258-258</span>
          </div>
          <div className="icon-text">
            <i class="fa fa-envelope" aria-hidden="true"></i>
            <span>contacto@gestionespacios.com</span>
          </div>
          <div className="icon-text">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <span>Hermosilla 82, 28001 Madrid</span>
          </div>
          <div className="social-media">
            <a href="#" className="icon-circle">
              <i class="fa fa-facebook-official" aria-hidden="true"></i>
            </a>
            <a href="#" className="icon-circle">
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="#" className="icon-circle">
              <i class="fa fa-instagram" aria-hidden="true"></i>
            </a>
            <a href="#" className="icon-circle">
              <i class="fa fa-youtube" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <form>
          <div className="col">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>E-mail</label>
              <input type="email" />
            </div>
            <div className="form-group">
              <label>Phone N.</label>
              <input type="tel" />
            </div>
          </div>
          <div className="col">
            <div className="form-group solo">
              <label>What is the subject which you contact us?</label>
              <div id="radio-buttons">
                <div className="radio-button">
                  <input
                    type="radio"
                    id="radioannulment"
                    name="type"
                    value="annulment"
                  />
                  <label for="radioannulment">Annulment</label>
                </div>
                <div className="radio-button">
                  <input
                    type="radio"
                    id="radiorefund"
                    name="type"
                    value="refund"
                  />
                  <label for="radiorefund">Refund</label>
                </div>
                <div className="radio-button">
                  <input
                    type="radio"
                    id="radioother"
                    name="type"
                    value="other"
                  />
                  <label for="radioother">Other</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="form-group solo">
              <label>Message</label>
              <textarea></textarea>
            </div>
          </div>
          <div className="col">
            <div className="form-group solo right">
              <button className="primary">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
