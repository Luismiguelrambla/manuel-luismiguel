import React from "react";
import { useState, useEffect } from "react";
import { getSpaceLocation, getHotelInfo } from "../http/api";
import { Link } from "react-router-dom";
import useAuth from "../shared/hooks/useAuth";
import "../css/SearchResult.css";
import useQuery from "../shared/hooks/useQuery";

function SearchResult() {
  const [spacesData, setSpacesData] = useState([]);
  const { userData } = useAuth();
  const [click, setClick] = useState(false);
  let query = useQuery();
  const queryData = query.get("location");

  useEffect(() => {
    getHotelInfo(userData.id).then((data) => {
      setSpacesData(data);
      console.log(queryData);
    });
  }, []);

  return (
    <div className="searchResult">
      <Link to="/hotels/profile">
        <p>
          <i class="fas fa-arrow-left"></i> Back to Profile
        </p>
      </Link>
      {spacesData.map((space) => {
        return (
          <Link
            to={"/spaces/" + space.idHotel + "?location=" + queryData}
            className="section-link"
          >
            <section className="section-results" key={space.idHotel}>
              <div className="searchResult__info">
                <div className="searchResult__infoTop">
                  <h3>{space?.nombre}</h3>
                  <p>{space?.localidad}</p>
                  <p>————</p>
                  <p>{space?.direccion}</p>
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
