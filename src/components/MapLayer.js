import React, { useState, useEffect, useRef } from 'react';
import  ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl';


  const [ selectedStore, setSelectedStore ] = useState();

  const mapRef = useRef();

  useEffect ( () => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedStore(null)
      }
    }
    window.addEventListener("keydown", listener )
  }, [])

  // useEffect ( () => {
  //   fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson')
  //   .then((res) => {
  //      return res.json();
  //   }).then((response) => {
  //       const data = response
  //       console.log(data)
  //     })
  //   }, [])

  const token = "pk.eyJ1IjoibGNhcmJham8iLCJhIjoiY2tkNjl4bDFiMDkxYTJybjU1NzQzenl2NiJ9.SXYTOsxMD7gORIM-mmVwGw"

  const style = 'mapbox://styles/lcarbajo/ckd6b1ssz1ezd1inzypezuff9'

  let hoveredStateId = null

  const hoverPopUp = <Popup closeButton= { false } closeOnClick= { false } longitude={0.0} latitude={0.0}> </Popup>

  const dataLayerFill = {
    'id': 'state-fills',
    'type': 'fill',
    'source': 'states',
    'paint': {
      'fill-color': '#627BC1',
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 
        1, 
        0.5 
      ]      
    }
  }

  const dataLayerBorder = {
      'id': 'state-borders',
      'type': 'line',
      'source': 'states',
       'paint': {
        'line-color': '#627BC1',
        'line-width': 2
      }
  }


return (  
  <div>
    <ReactMapGL 
        { ...viewport} 
        ref= { mapRef }
        mapboxApiAccessToken = { token }
        mapStyle = { style }
        onViewportChange = { (viewport) => setViewport ( viewport ) }
        onHover= { (e) => {
          const { lngLat } = e
          const pointLong = lngLat[0]
          const pointLat = lngLat[1]
          if (e.features) {
            if (hoveredStateId) {
                mapRef.current.getMap().setFeatureState(
                  { source: 'states', id: hoveredStateId },
                  { hover: false }
                )
            }
            hoveredStateId = e.features[0].id;
            hoveredStateId && mapRef.current.getMap().setFeatureState(
              { source: 'states', id: hoveredStateId },
              { hover: true }
            );
            }
        }}
      onMouseLeave={ () => {
        if (hoveredStateId) {
          mapRef.current.getMap().setFeatureState(
            { source: 'states', id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      }}
      >
        <Source id='states'generateId type='geojson' data='/countries.geojson' >
          <Layer {...dataLayerFill }/>
          {/* <Layer {...dataLayerBorder }/>           */}
        </Source>
      
      {/* { 
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
      )}  */}
    </ReactMapGL>
  </div>); 
}

export default App;
