import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useMapData = () => {
  const [mapIds, setMapIds] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roadsData, setRoadsData] = useState(null);
  const [laneMarksData, setLaneMarksData] = useState(null);
  const [positionsData, setPositionsData] = useState(null);

  const userToken = import.meta.env.VITE_USER_TOKEN;
  const mapDataURL = import.meta.env.VITE_MAP_DATA;
  const mapObjDataURL = import.meta.env.VITE_MAP_OBJ_DATA;

  const fetchMapsData = useCallback(async () => {
    try {
      const response = await axios.get(mapDataURL, { headers: { token: userToken }, timeout: 5000 });
      const mapData = response.data.data;
      setMapIds(mapData.map(map => map.id));
      if (mapData.length > 0) {
        setSelectedMap(mapData[0].id);
        await handleMapChange(mapData[0].id);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching maps data:', error);
      setLoading(false);
    }
  }, [userToken]);

  const fetchData = useCallback(async (endpoint, setData, mapId) => {
    try {
      const response = await axios.post(`${mapObjDataURL}${endpoint}`, { map_id: mapId }, { headers: { token: userToken }, timeout: 600000 });
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
    }
  }, [userToken]);

  const handleMapChange = useCallback(async (value) => {
    setSelectedMap(value);
    await fetchData('roads', setRoadsData, value);
    await fetchData('lane_marks', setLaneMarksData, value);
    await fetchData('positions', setPositionsData, value);
  }, [fetchData]);

  useEffect(() => {
    fetchMapsData();
  }, [fetchMapsData]);

  return {
    mapIds,
    selectedMap,
    loading,
    roadsData,
    laneMarksData,
    positionsData,
    handleMapChange,
  };
};

export default useMapData;
