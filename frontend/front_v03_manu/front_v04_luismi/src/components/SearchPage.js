import React from "react";
import { useState, useEffect } from "react";
import { getSpaceInfo } from "../http/api";
import { Link, useParams } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import useQuery from "../shared/hooks/useQuery";
import "../css/SearchPage.css";

function SearchPage() {
  const [spacesData, setSpacesData] = useState([]);
  const { userData } = useAuth();
  const [click, setClick] = useState(false);
  let query = useQuery();
  let { idEspacio } = useParams();

  useEffect(() => {
    getSpaceInfo(idEspacio).then((data) => {
      setSpacesData(data);
    });
  }, [idEspacio]);

  return (
    <div className="searchResult">
      <section className="section-space" key={spacesData.idEspacios}>
        <p>{spacesData?.nombreHotel}</p>
        <h2>{spacesData?.nombre}</h2>

        <div className="info-space">
          <i className="fas fa-star page" />
          <p>
            <strong>{spacesData?.score}</strong>
          </p>
          <p>{"(" + spacesData?.localidad + ")"}</p>
          <i className="fas fa-heart page" />
        </div>

        <div className="img-space">
          <img className="img-page" alt="" src="images/image-hotel.jpg" />
        </div>

        <div className="book-space">
          <h3>{spacesData?.precio + " €/ day"}</h3>
          <p>{spacesData?.precio + " € total"}</p>
          <Link
            to={"/spaces/" + spacesData.idEspacios + "/booking"}
            className=""
          >
            <button>Reservar</button>
          </Link>
        </div>

        <div className="description-space">
          <h3>Descripción</h3>
          <p>{spacesData?.descripcion}</p>
          <h3>Esquipamiento</h3>
          <div className="equip-space">
            <p>{spacesData?.tipoEspacio}</p>
          </div>
        </div>

        <div className="comment-space">
          <h3>Comentarios</h3>
          <div className="score-space">
            <i className="fas fa-star page" />
            <p>
              <strong>{spacesData?.score}</strong>
            </p>
          </div>
          <p>todos los comentarios aqui listados</p>
        </div>
      </section>
    </div>
  );
}

export default SearchPage;
