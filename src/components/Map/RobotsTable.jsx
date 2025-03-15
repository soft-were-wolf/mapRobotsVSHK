import React, { memo, useMemo } from 'react';
import { Table } from 'antd';
import '../../styles/App.css';
import { useTheme } from '../../App';

const RobotsTable = ({ robotsData, centerMapOnRobot }) => {
  const { currentTheme } = useTheme();
  
  const columns = useMemo(() => [
    { title: 'Имя', dataIndex: 'name', key: 'name', render: (text) => <span>{text.slice(-3)}</span> },
    { title: 'Online', dataIndex: 'status', key: 'status', render: (status) => <span style={{ color: status !== 0 ? 'green' : 'red' }}>●</span> },
    {
      title: 'Заряд', dataIndex: 'charge', key: 'charge', render: (charge) => {
        let color;
        if (charge > 75) color = '#006400';
        else if (charge > 50) color = '#9ACD32';
        else if (charge > 25) color = '#FF8C00';
        else color = '#8B0000';
        return <span style={{ color }}>{charge}%</span>;
      }
    },
  ], []);

  return (
    <div className="table-container" style={{ borderColor: currentTheme.borderColor, backgroundColor: currentTheme.primaryColor, boxShadow: `0 2px 4px ${currentTheme.shadowColor}` }}>
      <Table dataSource={robotsData} columns={columns} rowKey="id" pagination={false} size="small" className="centered-table" onRow={(record) => ({ onClick: () => centerMapOnRobot(record) })} />
    </div>
  );
};

export default memo(RobotsTable);
