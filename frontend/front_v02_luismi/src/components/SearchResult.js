import React from "react";
import { useState, useEffect } from "react";
import { getSpaces } from "../http/api";
import useAuth from "../shared/hooks/useAuth";
import "../css/SearchResult.css";
import useQuery from "../shared/hooks/useQuery";

function SearchResult() {
  const [spacesData, setSpacesData] = useState([]);
  const { userData } = useAuth();
  let query = useQuery();

  useEffect(() => {
    const queryData = query.get("query");
    const date = query.get("date");
    getSpaces().then((data) => {
      console.log(data);
      setSpacesData(data);
    });
  }, []);

  console.log(spacesData);

  return (
    <div className="searchResult">
      {spacesData.map((space) => {
        return (
          <section className="section-results" key={space.idEspacios}>
            <img alt="" />
            <i className="far fa-heart" />

            <div className="searchResult__info">
              <div className="searchResult__infoTop">
                <p>{space?.location}</p>
                <h3>{space?.nombre}</h3>
                <p>____</p>
                <p>{space?.descripcion}</p>
              </div>

              <div className="searchResult__infoBottom">
                <div className="searchResult__stars">
                  <i className="far fa-star" />
                  <p>
                    <strong>{space?.aforo}</strong>
                  </p>
                </div>
                <div className="searchResults__price">
                  <h2>{space?.precio}</h2>
                  <p>{space?.precio}</p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default SearchResult;
