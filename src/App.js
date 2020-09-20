import React, { useState, useRef } from 'react';
import  ReactMap, { Marker, FlyToInterpolator } from 'react-map-gl';
import useSupercluster from 'use-supercluster'
import useSwr from 'swr'
import './App.css'


const App = () => {

// SET MAPBOX TOKEN

const MAP_BOX_TOKEN = "pk.eyJ1IjoibGNhcmJham8iLCJhIjoiY2tkNjl4bDFiMDkxYTJybjU1NzQzenl2NiJ9.SXYTOsxMD7gORIM-mmVwGw"

// SET DATA URL

const recordStoresUrl = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=record-stores&q=&rows=9999&facet=city&facet=countrycode&facet=hasclosed&refine.countrycode=ES'

// SET THE VIEWPORT

const [ viewport, setViewport ] = useState({
  latitude: 40.463667,
  longitude: -3.74922,
  width: '100vw',
  height: '100vh',
  zoom: 5
})

// SET THE MAP REFERENCE

const mapRef = useRef();

const { data, error } = useSwr( recordStoresUrl, async () => {
  const response = await fetch( recordStoresUrl );
  const data = await response.json() 
  return data
})

const recordStoresSpain = data && !error ? data.records : []

//CLUSTERING - POUNTS

const points = recordStoresSpain.map( recordStore =>({
    type: "Feature",
    properties: {
      cluster: false,
      rsId: recordStore.recordid,
      country: recordStore.fields.countrycode
    },
    geometry: recordStore.geometry
}))

//CLUSTERING - BOUNDS

const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null

// CLUSTERINGg - SET SUPERCLUSTER

const { clusters, supercluster } = useSupercluster({
  points,
  zoom: viewport.zoom,
  bounds,
  options: { radius: 40, maxZoom: 20 }
})

return (  
  <div>
    <ReactMap 
      { ...viewport}
      maxSize= { 20 }
      mapboxApiAccessToken = { MAP_BOX_TOKEN }
      onViewportChange = { (newViewport) => { 
        setViewport(newViewport)
      }}
      ref={ mapRef }>

      {
        clusters.map( cluster => {
          const [ longitude , latitude ] = cluster.geometry.coordinates;
          const { cluster : isCluster, point_count: pointCount } = cluster.properties;
          if (isCluster) {
            return ( <Marker key={ cluster.id } latitude={ latitude } longitude={ longitude }>
                    <div className='cluster-marker' style={
                        { width: `${10 + ( pointCount / points.length ) * 60 }px`,
                          height: `${10 + ( pointCount / points.length ) * 60 }px`}}
                          onClick= { () => {
                            const expansionZoom = Math.min( 
                              supercluster.getClusterExpansionZoom( cluster.id ),
                              20
                            );
                            setViewport({
                              ...viewport,
                              latitude,
                              longitude,
                              zoom: expansionZoom,
                              transitionInterpolator: new FlyToInterpolator( { speed: 2 } ),
                              transiionDuration: 'auto'
                            })
                          }}>
                      { pointCount }
                    </div>
                  </Marker>) 
          } 
         return (
            <Marker key={ cluster.properties.rsId } latitude={ latitude } longitude={ longitude }>
              <button className='record-store-marker'>
                <img src='/record-store.png' alt='record-store-icon'/>
              </button>
            </Marker>
         )})
      }
        <div className='map-overlay' id='features'>
        </div>
    </ReactMap>
  </div>); 
}

export default App;
