import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import * as data from "./record-stores.json";
import "./App3.css";

const App = () => {
  const [viewport, setViewport] = useState({
    width: "60vw",
    height: "100vh",
    latitude: 38.7071,
    longitude: -9.13549,
    zoom: 5,
  });

  const [selectedStore, setSelectedStore] = useState(null);

  const mapRef = useRef();

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedStore(null);
      }
    };
    window.addEventListener("keydown", listener);
  }, []);

  // useEffect ( () => {
  //   fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson')
  //   .then((res) => {
  //      return res.json();
  //   }).then((response) => {
  //       const data = response
  //       console.log(data)
  //     })
  //   }, [])

  const token =
    "pk.eyJ1IjoibGNhcmJham8iLCJhIjoiY2tkNjl4bDFiMDkxYTJybjU1NzQzenl2NiJ9.SXYTOsxMD7gORIM-mmVwGw";

  const style = "mapbox://styles/lcarbajo/ckd6b1ssz1ezd1inzypezuff9";

  let hoveredStateId = useRef(null);

  const hoverPopUp = (
    <Popup
      closeButton={false}
      closeOnClick={false}
      longitude={0.0}
      latitude={0.0}
    >
      {" "}
    </Popup>
  );

  const dataLayerFill = {
    id: "state-fills",
    type: "fill",
    source: "states",
    paint: {
      "fill-color": "#627BC1",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0.5,
      ],
    },
  };

  const dataLayerBorder = {
    id: "state-borders",
    type: "line",
    source: "states",
    paint: {
      "line-color": "#627BC1",
      "line-width": 2,
    },
  };

  const handleHover = useCallback(
    (e) => {
      const { lngLat } = e;
      const pointLong = lngLat[0];
      const pointLat = lngLat[1];
      if (e.features) {
        if (hoveredStateId.current) {
          mapRef.current
            .getMap()
            .setFeatureState(
              { source: "states", id: hoveredStateId.current },
              { hover: false }
            );
        }
        if (e.features[0] !== undefined) {
          hoveredStateId.current = e.features[0].id;
          const { ADMIN } = e.features[0].properties;
          setSelectedStore({ ADMIN, pointLat, pointLong });
          hoveredStateId.current &&
            mapRef.current
              .getMap()
              .setFeatureState(
                { source: "states", id: hoveredStateId.current },
                { hover: true }
              );
        }
      }
    },
    [hoveredStateId]
  );

  const handleMouseOut = useCallback(() => {
    if (hoveredStateId.current) {
      mapRef.current
        .getMap()
        .setFeatureState(
          { source: "states", id: hoveredStateId.current },
          { hover: false }
        );
      setSelectedStore(null);
    }
    hoveredStateId.current = null;
  }, [hoveredStateId]);

  return (
    <div className="app">
      <div className="header">
        <img src="/logo192.png" alt="logo" />
        <nav>Barra de navegación</nav>
        <form>Formulario de busqueda</form>
      </div>
      <span className="info-container">
        <div className="control-panel">
          <h2>Más de 100 tiendas</h2>
          <h1>Tiendas de discos en Barcelona</h1>
          <ul className="store-list">
            <li>
              <img src="/logo512.png" alt="IMAGEN" />
              <div className="store-info-container">
                <p>Tags de tienda</p>
                <h3>Nombre de la tienda</h3>
                <h4>Caracteristicas de la tienda</h4>
              </div>
            </li>
          </ul>
        </div>
        <div className="map-container">
          <ReactMapGL
            {...viewport}
            style={{ top: 0, right: 0, border: "1px solid blue" }}
            ref={mapRef}
            mapboxApiAccessToken={token}
            // mapStyle={style}
            onViewportChange={setViewport}
            onHover={handleHover}
            onMouseOut={handleMouseOut}
          >
            {selectedStore && selectedStore.ADMIN !== undefined && (
              <Popup
                latitude={selectedStore.pointLat}
                longitude={selectedStore.pointLong}
                onClose={() => {
                  setSelectedStore(null);
                }}
              >
                <div>
                  <p>{selectedStore.ADMIN && selectedStore.ADMIN}</p>
                </div>
              </Popup>
            )}
            <Source
              id="states"
              generateId
              type="geojson"
              data="/countries.geojson"
            >
              <Layer {...dataLayerFill} />
              <Layer {...dataLayerBorder} />
            </Source>
            {/* {/* { 
          data.default.map( (recordStore) => (
          
            <Marker key= { recordStore.recordid } latitude= { recordStore.fields.geoloc[0] } longitude= { recordStore.fields.geoloc[1] }>
              <button className='marker-btn' onClick = { (e) => {
                e.preventDefault();
                setSelectedStore(recordStore)
              }}>
                <img src='/record-store.png' alt='record-store-icon'/>
              </button>
            </Marker>
          ))} */}
          </ReactMapGL>
        </div>
      </span>
    </div>
  );
};

export default App;
