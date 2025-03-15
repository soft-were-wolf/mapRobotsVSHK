import React, { memo } from 'react';

const legendItems = [
  { color: "#6C6C6D", text: "Отключён" },
  { color: "#D4B1F7", text: "Ручной режим" },
  { color: "#9DCDCD", text: "Низкий заряд" },
  { color: "#FE6D6D", text: "Уступает дорогу" },
  { color: "#FFCF0A", text: "Заблокирован" },
  { color: "#DB946A", text: "Активный" }
];

const MarkerLegend = ({ currentTheme }) => {
  return (
    <div className="marker-legend" style={{ background: `${currentTheme.secondaryColor}B3`, boxShadow: `0 2px 4px ${currentTheme.shadowColor}` }}>
      {legendItems.map((item, index) => (
        <div key={index} className="legend-item">
          <div className="legend-circle" style={{ backgroundColor: item.color }}></div>
          <span className="legend-text" style={{ color: currentTheme.textColor }}>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default memo(MarkerLegend);
