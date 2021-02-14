import React from "react";
import "../App.css";
import { Button } from "./Button";
import "../css/HeroSection.css";
import { Link } from "react-router-dom";

/* const handleSubmit = async (e) => {
  e.preventDefault();
  
  if(!this.state.searchTerm) {
    return this.setState({error: 'Please write a valid text'})
  }

  const res = await fetch(`${API}&=${this.state.searchTerm}`)
  const data = await res.json();

  if (!data.Search) {
    return this.setState({error: 'There are not results'})
  }

  this.setState({data: data.Search, error:'', searchTerm:''})
} */

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/video-2.mp4" autoPlay loop muted />
      <h1>Welcome!</h1>
      <p>Discover the right place for your needs</p>
      <div className="hero-btns">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Where?"
            // onChange={(e) => this.setState({ searchTerm: e.target.value })}
            // value={this.state.searchTerm}
            autoFocus
          />
          <input
            type="datetime-local"
            className="form-date"
            value="2020-02-04T19:30"
            min="2020-02-04T00:00"
            max="2021-02-04T00:00"
          />
        </form>
        {/* <p>{this.state.error ? this.state.error : ""}</p> */}

        <Link to="/results">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            {" "}
            <i className="fas fa-search" />{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
