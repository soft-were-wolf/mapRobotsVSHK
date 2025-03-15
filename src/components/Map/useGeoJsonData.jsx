import { useState, useEffect, useMemo } from 'react';

const LEFT_OFFSET = 0.25; 
const RIGHT_OFFSET = 0.25;
const ROTATION_ANGLE = 2; 

const rotatePoint = (x, y, centerX, centerY, angle) => {
  const radians = (Math.PI / 180) * angle; 
  const dx = x - centerX;
  const dy = y - centerY;
  const xNew = centerX + dx * Math.cos(radians) - dy * Math.sin(radians);
  const yNew = centerY + dx * Math.sin(radians) + dy * Math.cos(radians);
  return [xNew, yNew];
};

const useGeoJsonData = (showGeoJSON, roadsData, laneMarksData, positionsData) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  const generatePolygons = useMemo(() => {
    if (!positionsData?.data) return [];
    return positionsData.data.map(position => {
      const { x, y, name } = position;

      if (name.includes("entrance")) {
        return null;
      }

      let offsetX = 0;
      let offsetY = 0;

      const isAorBWithFourDigits = /^[AB]\d{4}/.test(name);

      if (name.startsWith("A") || name.startsWith("B")) {
        if (name.includes("col01")) {
          offsetX = -LEFT_OFFSET; 
        } else if (name.includes("col02")) {
          offsetX = RIGHT_OFFSET;
        }

        if (isAorBWithFourDigits) {
          offsetX = RIGHT_OFFSET * 2 - 0.1; 
        }
      } else if (name.startsWith("GT")) {
        if (name.includes("col01")) {
          offsetX = RIGHT_OFFSET; 
        } else if (name.includes("col02")) {
          offsetX = -LEFT_OFFSET; 
        }
      }

      if (name.startsWith("A104") || name.startsWith("A108") || name.startsWith("A112")) {
        offsetX = -LEFT_OFFSET; 
      }

      if (name.startsWith("A205") || name.startsWith("A209") || name.startsWith("A201")) {
        offsetX = RIGHT_OFFSET; 
      }

      if (name.startsWith("GT") && parseInt(name.slice(2)) >= 77 && parseInt(name.slice(2)) <= 92) {
        if (name.includes("col01")) {
          offsetX = -RIGHT_OFFSET;
        } else if (name.includes("col02")) {
          offsetX = LEFT_OFFSET; 
        }
      }

      const width = name.startsWith("restGT") || name.startsWith("charge")? 0.8 : 1.2;
      const height = name.startsWith("restGT") || name.startsWith("charge") ? 1.2 : 0.8;
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      const centerX = x + offsetX;
      const centerY = y + offsetY;

      let coordinates = [
        [x - halfWidth + offsetX, y - halfHeight + offsetY],
        [x + halfWidth + offsetX, y - halfHeight + offsetY],
        [x + halfWidth + offsetX, y + halfHeight + offsetY],
        [x - halfWidth + offsetX, y + halfHeight + offsetY],
        [x - halfWidth + offsetX, y - halfHeight + offsetY]
      ];

      coordinates = coordinates.map(([cx, cy]) => rotatePoint(cx, cy, centerX, centerY, ROTATION_ANGLE));

      return {
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [coordinates] },
        properties: { name }
      };
    }).filter(item => item !== null);
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
