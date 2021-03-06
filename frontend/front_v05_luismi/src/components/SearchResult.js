import React from "react";
import { useState, useEffect } from "react";
import { getSpaceLocation } from "../http/api";
import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import "../css/SearchResult.css";
import useQuery from "../shared/hooks/useQuery";

function SearchResult() {
  const [spacesData, setSpacesData] = useState([]);
  const { userData, date } = useAuth();
  const [click, setClick] = useState(false);
  let query = useQuery();
  const queryData = query.get("location");

  useEffect(() => {
    getSpaceLocation(queryData).then((data) => {
      setSpacesData(data);
      console.log(queryData);
    });
  }, []);

  let fecha1 = new Date(date.checkIn);
  let fecha2 = new Date(date.checkOut);

  let resta = fecha2.getTime() - fecha1.getTime();
  let precioTotal = Math.round(
    (resta / (1000 * 60 * 60 * 24)) * spacesData.precio
  );

  return (
    <div className="searchResult">
      <Link to="/" className="hotel-back">
        <>
          <i class="fas fa-arrow-left"></i>
        </>
      </Link>
      {spacesData.map((space) => {
        return (
          <Link
            to={"/spaces/" + space.idEspacios + "?location=" + queryData}
            className="section-link"
          >
            <section className="section-results" key={space.idEspacios}>
              <img className="img-results" alt="" src="images/img-space.jpg" />

              <div className="searchResult__info">
                <div className="searchResult__infoTop">
                  <p>{space?.nombreHotel}</p>
                  <h3>{space?.nombre}</h3>
                  <p>{space?.tipoEspacio}</p>
                  <p>————</p>
                  <p>{space?.descripcion}</p>
                  <div className="searchResult__stars">
                    <i className="fas fa-star result" />
                    <p>
                      <strong>{space?.score}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="searchResults__fav-price">
                <i className="fas fa-heart result" />
                <div className="searchResults__price">
                  <h2>{space?.precio + " €/ day"}</h2>
                  <p>{precioTotal + " € total"}</p>
                </div>
              </div>
            </section>
          </Link>
        );
      })}
    </div>
  );
}

export default SearchResult;
