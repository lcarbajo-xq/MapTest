import React, { useEffect, useState } from 'react';

export const useHoverEffect = ( hoveredStateId, map, feature ) => {

    const [ isHoveredStateId, setHoverStateId] = useState (hoveredStateId )

    if ( feature ) {
        if (hoveredStateId) {
            return map.current.getMap().setFeatureState(
              { source: 'states', id: hoveredStateId },
              { hover: false }
            )
        }
        hoveredStateId = feature.id;
        return hoveredStateId && map.current.getMap().setFeatureState(
          { source: 'states', id: hoveredStateId },
          { hover: true }
        );
        }
    })
}