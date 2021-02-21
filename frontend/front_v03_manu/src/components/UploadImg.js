import React, { Component } from "react";
import "../css/UploadImg.css";

export class UploadImg extends Component {
  state = {
    profileImg: "images/User-Avatar2.svg",
  };
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  render() {
    const { profileImg } = this.state;
    return (
      <div>
        <div className="container">
          <div className="img-holder">
            <img src={profileImg} alt="" id="img" className="img" />
          </div>
          <input
            type="file"
            accept="image/*"
            name="image-upload"
            id="input"
            onChange={this.imageHandler}
          />
          <div className="label">
            <label className="image-upload" htmlFor="input">
              <i class="far fa-edit"></i>
              Edit your Pic
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadImg;
