import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import validate from "./validateInfo";
import useAuth from "../shared/hooks/useAuth";
import FormSignup from "./FormSignup";
import { useForm } from "react-hook-form";
import { getUserInfo, editUser, deleteUser, getHotelInfo } from "../http/api";
import UploadImg from "./UploadImg";
import "../css/UserHotel.css";
import ShowToLoggedInUserHotel from "./ShowToLoggedInUserHotel";
import ImageSlider from "./ImageSlider";
import { SliderData } from "./SliderData";

const UserHotel = () => {
  const { userData, signOut } = useAuth();
  const [profileData, setprofileData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    getUserInfo(userData.id).then((data) => {
      setprofileData(data);
    });
  }, [userData]);

  useEffect(() => {
    getHotelInfo(userData.id).then((data) => {
      setHotelData(data);
    });
  }, [userData]);
  console.log(hotelData);

  const onSubmit = async (editdata) => {
    await editUser(
      profileData.idUsuario,
      editdata.nombre,
      editdata.apellidos,
      editdata.telefono,
      editdata.correo,
      editdata.fechaNacimiento
    );
    console.log(editdata.avatar);
    window.location.reload();
  };

  const deleteUserClick = async (idUsuario) => {
    await deleteUser(profileData.idUsuario);
  };

  return (
    <div className="form-container-hotels">
      <span className="close-btn-hotels">x</span>
      <div className="form-content-left-hotels">
        <div className="form-avatar-hotels">
          <UploadImg />
        </div>
        <h1>{"Hello, " + profileData.nombre + " " + profileData.apellidos}</h1>
        <p className="separator">—————————</p>
        <ShowToLoggedInUserHotel>
          <h2>
            <Link className="link-hotels" to="/hotels/Gestion">
              Manage your hotels <i class="fas fa-edit"></i>
            </Link>
          </h2>
        </ShowToLoggedInUserHotel>
      </div>
      <div className="form-content-right-hotels">
        <form className="form-hotels" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inputs-hotels">
            <label htmlFor="nombre" className="form-label-hotels">
              Name
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              ref={register()}
              className="form-input-hotels"
              placeholder={profileData.nombre}
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
              placeholder={profileData.apellidos}
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
              value={profileData.fechaNacimiento}
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
              placeholder={profileData.telefono}
            />
            {errors.telefono && <p>{errors.telefono}</p>}
          </div>
          <div className="form-inputs-hotels">
            <label htmlFor="correo" className="form-label">
              Email
            </label>
            <input
              id="correo"
              type="email"
              name="correo"
              ref={register()}
              className="form-input-hotels"
              placeholder={profileData.correo}
            />
            {errors.correo && <p>{errors.correo}</p>}
          </div>
          <button className="form-input-btn-hotels" type="submit">
            Save
          </button>
          <span className="form-input-login-hotels">
            If you want to delete your account click
            <Link to="/" onClick={deleteUserClick}>
              here
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default UserHotel;
