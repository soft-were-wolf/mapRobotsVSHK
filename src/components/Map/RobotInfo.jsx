import React, { useMemo, memo } from 'react';
import { Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import '../../styles/RobotInfo.css';
import { useTheme } from '../../App';

const { Title, Text } = Typography;

const RobotInfo = ({ robot, onClose }) => {
  const { currentTheme } = useTheme();

  const themeStyles = useMemo(() => ({
    backgroundColor: currentTheme.primaryColor,
    color: currentTheme.textColor,
    borderColor: currentTheme.borderColor,
    boxShadow: `0 0 10px ${currentTheme.shadowColor}`,
  }), [currentTheme]);

  if (!robot) return null;

  return (
    <div className="robot-info" style={themeStyles}>
      <div className="robot-info-header">
        <Title level={4} className="robot-info-title" style={{ color: currentTheme.textColor }}>
          {robot.name}
        </Title>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={onClose}
          style={{ color: currentTheme.textColor }}
        />
      </div>
      <div className="robot-info-body">
        <Text strong style={{ color: currentTheme.textColor }}>Заряд: </Text>
        <Text style={{ color: currentTheme.textColor }}>{robot.charge}%</Text>
        <br />
        <Text strong style={{ color: currentTheme.textColor }}>Статус: </Text>
        <Text style={{ color: currentTheme.textColor }}>{robot.status}</Text>
        <br />
        <Text strong style={{ color: currentTheme.textColor }}>Ручной режим: </Text>
        <Text style={{ color: currentTheme.textColor }}>{robot.emergent}</Text>
      </div>
    </div>
  );
};

export default memo(RobotInfo);
