import React, { useState } from "react";
import { Link } from "react-router-dom";
import validate from "./validateInfo";
import useAuth from "../shared/hooks/useAuth";
import FormSignup from "./FormSignup";
import { useForm } from "react-hook-form";
import UploadImg from "./UploadImg";
import "../css/UserHotel.css";

const UserHotel = () => {
  const { signUp } = useAuth();
  const { register, handleSubmit, errors } = useForm();

  const test = (data) => {
    signUp(data);
  };

  return (
    <div className="form-container-hotels">
      <span className="close-btn-hotels">x</span>
      <div className="form-content-left-hotels">
        <div className="form-avatar-hotels">
          <UploadImg />
        </div>
        <img
          src="images/image-hotel.jpg"
          alt="spaceship"
          className="form-img-hotels"
        />
        <img
          src="images/image-space.jpg"
          alt="spaceship"
          className="form-img2-hotels"
        />
        <h1>Hello, Alejandra</h1>
        <h2>Hotel: Nh Collection</h2>
      </div>
      <div className="form-content-right-hotels">
        <form className="form-hotels" onSubmit={handleSubmit(test)}>
          <div className="form-inputs-hotels">
            <label htmlFor="nombre" className="form-label-hotels">
              Hotel
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              ref={register()}
              className="form-input-hotels"
              placeholder="Enter the Hotel Name"
            />
            {errors.nombre && <p>{errors.nombre}</p>}
          </div>
          <div className="form-inputs-hotels">
            <label htmlFor="nombre" className="form-label">
              Name
            </label>
            <input
              id="nombre"
              type="text"
              name="apellidos"
              ref={register()}
              className="form-input-hotels"
              placeholder="Enter your Last Name"
            />
            {errors.nombre && <p>{errors.nombre}</p>}
          </div>
          <div className="form-inputs-hotels">
            <label htmlFor="apellidos" className="form-label-hotels">
              Last Name
            </label>
            <input
              id="apellidos"
              type="text"
              name="apellidos"
              ref={register()}
              className="form-input-hotels"
              placeholder="Enter your Last Name"
            />
            {errors.apellidos && <p>{errors.apellidos}</p>}
          </div>
          <div className="form-inputs-hotels">
            <label htmlFor="fechaNacimiento" className="form-label-hotels">
              Birthday
            </label>
            <input
              id="fechaNacimiento"
              type="date"
              name="fechaNacimiento"
              ref={register()}
              className="form-input-hotels"
              placeholder="Enter your Birthday"
            />
            {errors.fechaNacimiento && <p>{errors.fechaNacimiento}</p>}
          </div>
          <div className="form-inputs-hotels">
            <label htmlFor="telefono" className="form-label-hotels">
              Telephone Number
            </label>
            <input
              id="telefono"
              type="number"
              name="telefono"
              ref={register()}
              className="form-input-hotels"
              placeholder="Enter your Telephone Number"
            />
            {errors.telefono && <p>{errors.telefono}</p>}
          </div>
          <div className="form-inputs-hotels">
            <label htmlFor="nif" className="form-label">
              NIF
            </label>
            <input
              id="nif"
              type="number"
              name="nif"
              ref={register()}
              className="form-input-hotels"
              placeholder="Enter your ID No."
            />
            {errors.nif && <p>{errors.nif}</p>}
          </div>
          <div className="form-inputs-hotels">
            <label htmlFor="direccion" className="form-label">
              Address
            </label>
            <input
              id="direccion"
              type="text"
              name="direccion"
              ref={register()}
              className="form-input-hotels"
              placeholder="Enter your Address"
            />
            {errors.direccion && <p>{errors.direccion}</p>}
          </div>
          <div className="form-inputs-hotels">
            <label htmlFor="iban" className="form-label-hotels">
              IBAN
            </label>
            <input
              id="iban"
              type="text"
              name="iban"
              ref={register()}
              className="form-input-hotels"
              placeholder="Enter your Bank Account"
            />
            {errors.iban && <p>{errors.iban}</p>}
          </div>
          <button className="form-input-btn-hotels" type="submit">
            Save
          </button>
          <span className="form-input-login-hotels">
            Already have an account? Login <Link to="/login">here</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default UserHotel;
