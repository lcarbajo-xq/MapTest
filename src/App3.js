import React, { useState, useEffect } from 'react';
import  ReactMap, { Marker, Popup } from 'react-map-gl';
import * as data from './record-stores.json'
import './App3.css'

const App = () => {
  const [ viewport, setViewport ] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.09024,
    longitude: -95.712891,
    zoom: 4
  });

  const [ stateHover, setStateHover ] = useState()

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

  const style = 'mapbox://styles/lcarbajo/ckd7vrcy405bz1ipox5pqd9zv'

  const layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'];

  const colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];


return (  
  <div>
    <ReactMap 
      { ...viewport} 
      mapboxApiAccessToken = { token }
      mapStyle = { style }
      style={{ position: 'absolute', top: '0', bottom: '0',width: '100%'}} 
      onHover= { e => { if ( e.features && e.features[0] ) {
                  setStateHover(e.features[0].properties) }
      }}>
        <div className='map-overlay' id='features'>
            <h2>USA Record Stores</h2>

            {
              stateHover 
                ? <div id='pd'><h3><strong>{ stateHover.name }</strong></h3> <p><strong>{ stateHover.density }</strong><em> Record Stores</em></p></div>
                : <div id='pd'><p>Pon el cursor sobre un estado!</p></div>
            }
        </div>
        <div className='map-overlay' id='leyenda'>
        {
          layers.map( layer => {
            let layerColour = colors[layers.indexOf(layer)]
            return <div key= {layer} className='item'> 
                    <span className='key'style={{ backgroundColor: `${layerColour}`}}></span>
                    <span className='value'>{ layer }</span>
                  </div>
          })
        }
        </div>
      {/* // onViewportChange = { (viewport) => setViewport ( viewport ) }> */}
      {/* // { data.default.map( (recordStore) => (
      //   <Marker key= { recordStore.recordid } latitude= { recordStore.fields.geoloc[0] } longitude= { recordStore.fields.geoloc[1] }>
      //     <button className='marker-btn' onClick = { (e) => {
      //       e.preventDefault();
      //       setSelectedStore(recordStore)
      //     }}>
      //       <img src='/record-store.png' alt='record-store-icon'/>
      //     </button>
      //   </Marker>
      // ))}
      // { selectedStore && (
      //   <Popup 
      //       latitude= { selectedStore.fields.geoloc[0] } 
      //       longitude= { selectedStore.fields.geoloc[1] }
      //       onClose= { () => {
      //         setSelectedStore(null)
      //       }}>
      //     <div>
      //       <h2>{ selectedStore.fields.name }</h2>
      // <p>{selectedStore.fields.city }, { selectedStore.fields.countrycode}</p>
      //     </div>
      //   </Popup>
      // )} */}
    </ReactMap>
  </div>); 
}

export default App;
