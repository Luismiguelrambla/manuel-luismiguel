import React, { useState } from "react";
import { Link } from "react-router-dom";
import validate from "./validateInfo";
import useAuth from "../shared/hooks/useAuth";
import "../css/Form.css";
import FormSignup from "./FormSignup";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const { signUp } = useAuth();
  const { register, handleSubmit, errors } = useForm();

  const test = (data) => {
    signUp(data);
  };

  return (
    <div className="form-container">
      <span className="close-btn">x</span>
      <div className="form-content-left">
        <img
          src="images/User-Avatar.svg"
          alt="spaceship"
          className="form-img"
        />
      </div>
      <div className="form-content-right">
        <form className="form" onSubmit={handleSubmit(test)}>
          <h1>Get started with us today! Wellcome to Gestion "fulano".</h1>
          <div className="form-inputs">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              ref={register()}
              className="form-input"
              placeholder="Enter your Name"
            />
            {errors.nombre && <p>{errors.nombre}</p>}
          </div>
          <div className="form-inputs">
            <label htmlFor="apellidos" className="form-label">
              Last Name
            </label>
            <input
              id="apellidos"
              type="text"
              name="apellidos"
              ref={register()}
              className="form-input"
              placeholder="Enter your Last Name"
            />
            {errors.apellidos && <p>{errors.apellidos}</p>}
          </div>
          <div className="form-inputs">
            <label htmlFor="fechaNacimiento" className="form-label">
              Birthday
            </label>
            <input
              id="fechaNacimiento"
              type="date"
              name="fechaNacimiento"
              ref={register()}
              className="form-input"
              placeholder="Enter your Birthday"
            />
            {errors.fechaNacimiento && <p>{errors.fechaNacimiento}</p>}
          </div>
          <div className="form-inputs">
            <label htmlFor="telefono" className="form-label">
              Telephone Number
            </label>
            <input
              id="telefono"
              type="number"
              name="telefono"
              ref={register()}
              className="form-input"
              placeholder="Enter your telephone number"
            />
            {errors.telefono && <p>{errors.telefono}</p>}
          </div>
          <div className="form-inputs">
            <label htmlFor="metodoDePago" className="form-label">
              Payment Method
            </label>
            <input
              id="metodoDePago"
              type="number"
              name="metodoDePago"
              ref={register()}
              className="form-input"
              placeholder="Enter your credit card"
            />
            {errors.metodoDePago && <p>{errors.metodoDePago}</p>}
          </div>
          <button className="form-input-btn" type="submit">
            Save
          </button>
          <span className="form-input-login">
            Already have an account? Login <Link to="/login">here</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
