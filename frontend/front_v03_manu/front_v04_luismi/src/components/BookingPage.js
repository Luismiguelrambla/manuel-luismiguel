import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { getSpaceInfo, newBooking } from "../http/api";
import "../css/Form.css";
import useAuth from "../shared/hooks/useAuth";

export default function AuthForm() {
  const [spacesData, setSpacesData] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  let { idEspacio } = useParams();

  useEffect(() => {
    getSpaceInfo(idEspacio).then((data) => {
      setSpacesData(data);
    });
  }, [idEspacio]);

  const { date } = useAuth();

  const onSubmit = async (idEspacios, fechaLlegada, fechaSalida) => {
    await newBooking(spacesData.idEspacios, date.checkIn, date.checkOut);
  };

  return (
    <div className="form-container">
      <span className="close-btn">x</span>
      <div className="form-content-left">
        <img src="images/team-form.svg" alt="spaceship" className="form-img" />
      </div>
      <div className="form-content-right">
        <div className="form">
          <h1>You are one click away from confirming your reservation for:</h1>
          <div className="form-inputs">
            <h1>————————</h1>
            <h2 className="form-label" htmlFor="email">
              {spacesData?.nombre} at {spacesData?.nombreHotel}
            </h2>
          </div>
          <div className="form-inputs">
            <h1>————————</h1>
            <h2 className="form-label" htmlFor="password">
              Date: From {date.checkIn} to {date.checkOut}
            </h2>
          </div>
          <div className="form-inputs">
            <h1>————————</h1>
            <h2 className="form-label" htmlFor="password">
              Total price: {spacesData?.precio} €
            </h2>
          </div>
          <h1>————————</h1>
          <button className="form-input-btn" type="button" onClick={onSubmit}>
            Booking
          </button>
          <span className="form-input-login">
            If you want to cancel,{" "}
            <Link to={"/spaces/" + spacesData.idEspacios}>click here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
