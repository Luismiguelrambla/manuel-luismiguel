import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { Button } from "./Button";
import "../App.css";
import "../css/HeroSection.css";

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

function HeroSection(props) {
  const { handleSubmit, register } = useForm();
  const history = useHistory();
  //const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    history.push(`/results?query=${data.query}&date=${data.date}`);
  };

  return (
    <div className="hero-container">
      <video src="/videos/video-2.mp4" autoPlay loop muted />
      <h1>Welcome!</h1>
      <p>Discover the right place for your needs</p>
      <div className="hero-btns">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="form-control"
            placeholder="Where?"
            name="query"
            ref={register()}
            // onChange={(e) => this.setState({ searchTerm: e.target.value })}
            // value={this.state.searchTerm}
            autoFocus
          />
          <input
            type="datetime-local"
            className="form-date"
            name="date"
            ref={register()}
            value="2020-02-04T19:30"
            min="2020-02-04T00:00"
            max="2021-02-04T00:00"
          />

          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            type="submit"
          >
            {" "}
            <i className="fas fa-search" />{" "}
          </Button>
        </form>
        {/* <p>{this.state.error ? this.state.error : ""}</p> */}
      </div>
    </div>
  );
}

export default HeroSection;
