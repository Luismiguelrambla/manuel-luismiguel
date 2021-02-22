import React, { useState, useEffect } from "react";
import { SliderData } from "./SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { getSpaceInfo } from "../http/api";
import "../css/Slider.css";
import useAuth from "../shared/hooks/useAuth";

const ImageSlider = () => {
  const { userData } = useAuth();
  const [spacesData, setSpacesData] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getSpaceInfo(userData.id).then((data) => {
      setSpacesData(data);
      console.log(spacesData);
    });
  }, []);

  const nextSlide = () => {
    setCurrent(current === spacesData.photos - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? spacesData.photos - 1 : current - 1);
  };

  if (!Array.isArray(spacesData.photos) || spacesData.photos <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {SliderData.map((spacesData) => {
        return (
          <div
            className={spacesData.photos === current ? "slide active" : "slide"}
            key={spacesData.photos}
          >
            {spacesData.photos === current && (
              <img
                src={spacesData.photo}
                alt="travel image"
                className="image"
              />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
