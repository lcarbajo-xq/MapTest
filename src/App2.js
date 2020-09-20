import React, { useState, useEffect } from 'react';
import  ReactMap, { Marker, Popup } from 'react-map-gl';
import * as data from './record-stores.json'
import './App3.css'

const App = () => {
  const [ viewport, setViewport ] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 38.7071,
    longitude: -9.13549 ,
    zoom: 12
  });

  const [ selectedStore, setSelectedStore ] = useState();

  useEffect ( () => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedStore(null)
      }
    }
    window.addEventListener("keydown", listener )
  }, [])

  const token = "pk.eyJ1IjoibGNhcmJham8iLCJhIjoiY2tkNjl4bDFiMDkxYTJybjU1NzQzenl2NiJ9.SXYTOsxMD7gORIM-mmVwGw"

  const style = 'mapbox://styles/lcarbajo/ckd6b1ssz1ezd1inzypezuff9'

return (  
  <div>
    <ReactMap 
      { ...viewport} 
      mapboxApiAccessToken = { token }
      mapStyle = { style }
      onViewportChange = { (viewport) => setViewport ( viewport ) }>
      { 
      data.default.map( (recordStore) => (
      
        <Marker key= { recordStore.recordid } latitude= { recordStore.fields.geoloc[0] } longitude= { recordStore.fields.geoloc[1] }>
          <button className='marker-btn' onClick = { (e) => {
            e.preventDefault();
            setSelectedStore(recordStore)
          }}>
            <img src='/record-store.png' alt='record-store-icon'/>
          </button>
        </Marker>
      ))}
      { selectedStore &&
        (
        <Popup 
            latitude= { selectedStore.fields.geoloc[0] } 
            longitude= { selectedStore.fields.geoloc[1] }
            onClose= { () => {
              setSelectedStore(null)
            }}>
          <div>
            <h2>{ selectedStore.fields.name }</h2>
      <p>{selectedStore.fields.city }, { selectedStore.fields.countrycode}</p>
          </div>
        </Popup>
      )} 
    </ReactMap>
  </div>); 
}

export default App;
