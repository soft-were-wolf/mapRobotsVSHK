import React, { useCallback, memo } from 'react';
import { GeoJSON } from 'react-leaflet';

const GeoJsonLayer = ({ geojsonData }) => {
  const style = useCallback((feature) => {
    const isLineString = feature.geometry.type === 'LineString';
    return {
      color: isLineString ? '#FCDA89' : '#A1C3C4',
      weight: isLineString ? 3 : 1,
    };
  }, []);

  const onEachFeature = useCallback((feature, layer) => {
    if (feature.properties?.name) {
      layer.bindTooltip(feature.properties.name, {
        permanent: false,
        direction: 'auto'
      });
    }
  }, []);

  return <GeoJSON data={geojsonData} style={style} onEachFeature={onEachFeature} />;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.geojsonData === nextProps.geojsonData;
};

export default memo(GeoJsonLayer, areEqual);
