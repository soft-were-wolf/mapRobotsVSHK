import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { Marker, useMap } from 'react-leaflet';
import CustomIcon from './CustomIcon';
import '../../styles/AnimatedMarker.css';

const calculateRotationAngle = (prevPos, newPos) => {
  const deltaX = newPos[0] - prevPos[0];
  const deltaY = newPos[1] - prevPos[1];
  return Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 180;
};

const getMarkerColor = (robot) => {
  if (robot.status === 0) return "#6C6C6D";
  if (robot.emergent === "yes") return "#D4B1F7";
  if (robot.charge < 40) return "#9DCDCD";
  if (robot.cross) return "#FE6D6D";
  if (robot.disabled === 1) return "#FFCF0A";
  if (robot.obstacle === "obstacle_stop") return "#FFCF0A";
  return "#DB946A";
};

const AnimatedMarker = ({ position, name, robot, onClick }) => {
  const markerRef = useRef();
  const map = useMap();
  const [prevPosition, setPrevPosition] = useState(position);
  const [rotationAngle, setRotationAngle] = useState(0);
  const color = getMarkerColor(robot);

  useEffect(() => {
    const icon = markerRef.current?.getElement();
    if (!icon) return;

    const handleZoomStart = () => {
      icon.style.transition = 'transform 0.1s';
    };

    const handleZoomEnd = () => {
      icon.style.transition = 'transform 1s';
    };

    map.on('zoomstart', handleZoomStart);
    map.on('zoomend', handleZoomEnd);

    return () => {
      map.off('zoomstart', handleZoomStart);
      map.off('zoomend', handleZoomEnd);
    };
  }, [map]);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const icon = marker.getElement();
    icon.style.transition = 'transform 1s';

    const hasSignificantChange = (Math.abs(prevPosition[0] - position[0]) >= 0.1 || Math.abs(prevPosition[1] - position[1]) >= 0.1);

    if (hasSignificantChange) {
      const angle = calculateRotationAngle(prevPosition, position);
      setRotationAngle(angle);
      setPrevPosition(position);
    }

    marker.setLatLng(position);
  }, [position, prevPosition]);

  const modifiedName = name.slice(-3);
  const customIcon = CustomIcon({ rotationAngle, name: modifiedName, color, jacking: robot.jacking });

  const handleClick = useCallback(() => {
    onClick(robot);
  }, [onClick, robot]);

  return (
    <Marker
      position={position}
      icon={customIcon}
      ref={markerRef}
      eventHandlers={{ click: handleClick }}
    />
  );
};

export default memo(AnimatedMarker);
