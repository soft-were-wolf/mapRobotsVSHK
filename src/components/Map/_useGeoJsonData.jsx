import { useState, useEffect, useMemo } from 'react';

const useGeoJsonData = (showGeoJSON, roadsData, laneMarksData, positionsData) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  const generatePolygons = useMemo(() => {
    if (!positionsData?.data) return [];
    return positionsData.data.map(position => {
      const { x, y, name } = position;
      const width = name.startsWith("GT") || name.startsWith("restGT") ? 0.8 : 1.2;
      const height = name.startsWith("GT") || name.startsWith("restGT") ? 1.2 : 0.8;
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const coordinates = [
        [x - halfWidth, y - halfHeight],
        [x + halfWidth, y - halfHeight],
        [x + halfWidth, y + halfHeight],
        [x - halfWidth, y + halfHeight],
        [x - halfWidth, y - halfHeight]
      ];
      return {
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [coordinates] },
        properties: { name }
      };
    });
  }, [positionsData]);

  const generateLines = useMemo(() => {
    if (!laneMarksData?.data || !roadsData?.data) return [];
    
    const pointsMap = laneMarksData.data.reduce((acc, point) => {
      acc[point.id] = [point.x, point.y];
      return acc;
    }, {});

    return roadsData.data.reduce((acc, road) => {
      road.lanes.forEach(lane => {
        const startCoords = pointsMap[lane.startPos];
        const endCoords = pointsMap[lane.endPos];
        if (startCoords && endCoords) {
          acc.push({
            type: "Feature",
            geometry: { type: "LineString", coordinates: [startCoords, endCoords] },
            properties: {}
          });
        }
      });
      return acc;
    }, []);
  }, [laneMarksData, roadsData]);

  useEffect(() => {
    if (showGeoJSON && positionsData && roadsData && laneMarksData) {
      const features = generatePolygons;
      const lines = generateLines;
      const geoJson = { type: "FeatureCollection", features: [...features, ...lines] };
      setGeoJsonData(geoJson);
    }
  }, [showGeoJSON, generatePolygons, generateLines, positionsData, roadsData, laneMarksData]);

  return geoJsonData;
};

export default useGeoJsonData;
