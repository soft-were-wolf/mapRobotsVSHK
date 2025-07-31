import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MapContainer,
  ImageOverlay,
  FeatureGroup,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { Select } from "antd";
import GeoJsonLayer from "./GeoJsonLayer";
import AnimatedMarker from "./AnimatedMarker";
import useGeoJsonData from "./useGeoJsonData";
import MarkerLegend from "./MarkerLegend";
import RobotsTable from "./RobotsTable";
import useMapData from "./useMapData";
import "../../styles/MapComponent.css";
import MapImage from "../../data/map-russia-vshk_from_pgm.png";
import { useTheme } from "../../App";

import { ZonesEditor } from "../ZonesEditor/ZonesEditor";
import { drawLocal } from "../../shared/helpers";
import { mapRotate } from "../../shared/constants";
import 'leaflet-rotate';

drawLocal(L);

const { Option } = Select;

const imageBounds = [
  [-172, -148],
  [31, 308],
];

const mapBounds = [
  [0, 0],
  [26, 209],
];

const useRobotsData = (userToken, interval = 1000) => {
  const [robotsData, setRobotsData] = useState([]);
  const intervalIdRef = useRef(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiEndpointRobots = import.meta.env.VITE_API_ENDPOINT_ROBOTS;

  const robotsDataURL = import.meta.env.VITE_ROBOTS_DATA;

  const fetchRobotsData = useCallback(async () => {
    try {
      const response = await axios.get(
        robotsDataURL,
        {
          headers: { token: userToken },
          timeout: 10000,
        }
      );
      setRobotsData(response.data.data);
    } catch (error) {
      console.error("Ошибка при получении данных о роботах:", error);
    }
  }, [apiBaseUrl, apiEndpointRobots, userToken]);

  useEffect(() => {
    fetchRobotsData();
    intervalIdRef.current = setInterval(fetchRobotsData, interval);
    return () => clearInterval(intervalIdRef.current);
  }, [fetchRobotsData, interval]);

  return robotsData;
};

const MapComponent = () => {
  const { themeMode, currentTheme } = useTheme();
  const {
    mapIds,
    selectedMap,
    loading,
    roadsData,
    laneMarksData,
    positionsData,
    handleMapChange,
  } = useMapData();
  const [showGeoJSON, setShowGeoJSON] = useState(false);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true); // Состояние для управления видимостью таблицы

  const userToken = import.meta.env.VITE_USER_TOKEN;
  const robotsData = useRobotsData(userToken);
  const geoJsonData = useGeoJsonData(
    showGeoJSON,
    roadsData,
    laneMarksData,
    positionsData
  );
  const mapRef = useRef(null);

  useEffect(() => {
    if (roadsData && laneMarksData && positionsData) {
      setShowGeoJSON(true);
    }
  }, [roadsData, laneMarksData, positionsData]);

  const initialZoom = 2;
  const maxZoom = 5;
  const minZoom = 0.5;
  const robotZoom = 4;

  const centerMapOnRobot = useCallback((robot) => {
    if (mapRef.current && robot.x !== null && robot.y !== null) {
      mapRef.current.setView([robot.y, robot.x], robotZoom);
    }
  }, []);

  return (
    <div
      className="main-container"
      style={{ backgroundColor: currentTheme.secondaryColor }}
    >
      <div
        className="map-canvas"
        style={{
          borderColor: currentTheme.borderColor,
          backgroundColor: currentTheme.primaryColor,
          boxShadow: `0 2px 4px ${currentTheme.shadowColor}`,
        }}
      >
        <MapContainer
          key={themeMode}
          center={[0, 0]}
          zoom={initialZoom}
          zoomControl={false}
          minZoom={minZoom}
          maxZoom={maxZoom}
          style={{ height: "100%", width: "100%" }}
          attributionControl={false}
          crs={L.CRS.Simple}
          ref={mapRef}
          doubleClickZoom={false}
          rotate={true}
          touchRotate={true}
          rotateControl={false}
          bearing={mapRotate}
        >
          <FeatureGroup>
            <ImageOverlay
              url={MapImage}
              bounds={imageBounds}
              zIndex={-1}
              className={themeMode === "dark" ? "dark-mode" : ""}
            />

            {
              showGeoJSON && geoJsonData && (<GeoJsonLayer geojsonData={geoJsonData} />)
            }

            {
              robotsData
                .filter((robot) => robot.x !== null && robot.y !== null)
                .map((robot, index) => (
                  <AnimatedMarker
                    key={index}
                    position={[robot.y, robot.x]}
                    name={robot.name}
                    robot={robot}
                    onClick={() => setSelectedRobot(robot)}
                  />
                ))
            }
          </FeatureGroup>

          <ZonesEditor map={mapRef.current} />

        </MapContainer>
      </div>

      <div className="select-container" onClick={(e) => e.stopPropagation()}>
        <Select
          style={{ width: 200 }}
          placeholder="Выберите карту"
          onChange={handleMapChange}
          value={selectedMap}
          loading={loading}
        >
          {mapIds.map((mapId) => (
            <Option key={mapId} value={mapId}>
              {mapId}
            </Option>
          ))}
        </Select>
      </div>
      <MarkerLegend currentTheme={currentTheme} />
    </div>
  );
};

export default React.memo(MapComponent);
