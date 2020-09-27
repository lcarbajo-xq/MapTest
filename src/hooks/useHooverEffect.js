import React, { useEffect, useRef, useState, useCallback } from "react";

export const useHoverEffect = (map) => {
  let hoveredStateId = useRef(null);

  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedStore(null);
      }
    };
    window.addEventListener("keydown", listener);
  }, []);

  const setHover = useCallback(
    (e) => {
      const { lngLat } = e;
      const pointLong = lngLat[0];
      const pointLat = lngLat[1];
      if (e.features) {
        if (hoveredStateId.current) {
          map.current
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
            map.current
              .getMap()
              .setFeatureState(
                { source: "states", id: hoveredStateId.current },
                { hover: true }
              );
        }
      }
    },
    [map]
  );

  const unsetHover = useCallback(() => {
    if (hoveredStateId.current) {
      map.current
        .getMap()
        .setFeatureState(
          { source: "states", id: hoveredStateId.current },
          { hover: false }
        );
      setSelectedStore(null);
    }
    hoveredStateId.current = null;
  }, [map]);

  return { setHover, selectedStore, setSelectedStore, unsetHover };
};
