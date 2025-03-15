import { useState, useEffect, useRef, memo } from "react";
import { FeatureGroup, Polygon, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, message, Modal, Popconfirm, Space, Typography } from "antd";
import { applyLockZones, getLockZones } from "../../services/ZonesEditor";

import "leaflet/dist/leaflet.css";
import "react-leaflet-draft";  // нужен просто, чтобы стили применялись к иконкам редактора

import styles from "./ZonesEditor.module.css";

const changeZoneName = (setName) => (evt) => {
    setName(evt.target.value);
}
const openChangeZonnName = (id, zoneId, name, setName, setState) => () => {
    zoneId.current = id;
    setState(true);
    setName(name);
}

const cancelZoneNameChange = (setName, setState) => () => {
    setState(false);
    setName("");
}

const zonesVisibilitySwitch = (setVisible) => () => {
    setVisible(val => !val);
}

const applyZoneNameChange = (polygons, zoneId, zoneName, setZoneName, setState, setPolygons) => () => {

    const newPolygons = polygons.map(polygon => {
        if (polygon.props.id === zoneId.current) {

            return <Polygon
                id={polygon.props.id}
                key={polygon.props.id}
                pathOptions={{
                    color: "#33333380",
                    weight: 4,
                    fillOpacity: .4
                }}
                positions={polygon.props.positions}
            >
                <Popup>
                    <Typography.Title level={5}>{zoneName}</Typography.Title>
                    <Space className={styles.space}>
                        <Button
                            onClick={
                                openChangeZonnName(
                                    polygon.props.id,
                                    zoneId,
                                    zoneName,
                                    setZoneName,
                                    setState
                                )
                            }
                        >
                            Изменить название
                        </Button>
                    </Space>
                </Popup>
            </Polygon>
        }
        else {
            return polygon;
        }
    })

    setPolygons(newPolygons);

    setState(false);

    setZoneName("");
}

const createdZone = (map, zoneId, changeName, setName, setState, setPolygons) => (obj) => {

    if (map) {
        const pos = obj.layer.editing.latlngs[0][0].map(coords => [coords.lat, coords.lng]);

        const id = uuidv4();

        setPolygons(val => [
            ...val,
            <Polygon
                id={id}
                key={id}
                pathOptions={{
                    color: "#33333380",
                    weight: 4,
                    fillOpacity: .4
                }}
                positions={[pos]}
            >
                <Popup>
                    <Typography.Title level={5}>{"Новая зона"}</Typography.Title>
                    <Space className={styles.space}>
                        <Button
                            onClick={
                                changeName(
                                    id,
                                    zoneId,
                                    "Новая зона",
                                    setName,
                                    setState
                                )
                            }
                        >
                            Изменить название
                        </Button>
                    </Space>
                </Popup>
            </Polygon>
        ]);

        map.eachLayer((layer) => {
            if (layer.options?.color === "#333") {
                map.removeLayer(layer);
            }
        });
    }
};

const deletedZone = (setPolygons) => (evt) => {
    const layers = Object.values(evt.layers._layers);

    const ids = layers.map(layer => layer.options.id);

    setPolygons(arr => arr.filter(obj => {

        if (!ids.includes(obj.props.id)) {
            return obj;
        }

    }));

}

const editedZone = (setPolygons) => (evt) => {
    const layers = Object.values(evt.layers._layers);

    const idList = layers.reduce((accum, layer) => {
        accum[layer.options.id] = layer.editing.latlngs[0][0].map(coords => [coords.lat, coords.lng]);
        return accum
    }, {});

    setPolygons(arr => arr.map(obj => {

        const pos = idList[obj.props.id];

        if (pos) {
            return {
                ...obj,
                props: {
                    ...obj.props,
                    positions: [pos]
                }
            };
        }
        else {
            return obj;
        }

    }));

}

const applyZones = async (polygons, messageApi) => {  // отправка данных на сервер

    const zones = polygons.reduce((accum, layer) => {

        const pos = layer.props.positions.flatMap(pos => pos.map(yx => [yx[1], yx[0]]));

        if (accum[layer.props.children.props.children[0].props.children]) {
            accum[layer.props.children.props.children[0].props.children].push([pos]);
            return accum;
        }
        else {
            accum[layer.props.children.props.children[0].props.children] = [[pos]];
            accum.keys
                ? accum.keys.push(layer.props.children.props.children[0].props.children)
                : (accum.keys = [layer.props.children.props.children[0].props.children]);
            return accum;
        }

    }, {});

    const features = zones?.keys?.map(key => {
        return {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: zones[key]
            },
            properties: {
                name: key
            }
        }
    });

    const lockZones = {
        type: "FeatureCollection",
        features: features ?? []
    };

    const resp = await applyLockZones(lockZones);

    const success = () => {
        messageApi.success("Зоны применены");
    };

    const error = () => {
        messageApi.error("Зоны не применены");
    };

    resp ? success() : error();
}

const confirmApplyZones = (polygons, messageApi) => () => {
    applyZones(polygons, messageApi);
};

export const ZonesEditor = memo(({ map }) => {
    const [polygons, setPolygons] = useState([]);  // все зоны запрета проезда роботов
    const [isVisibleZones, setVisibleZones] = useState(true); // Состояние для управления видимостью зон запрета проезда роботов
    const [isChangeZoneNameOpen, setZoneNameChangeModalState] = useState(false);
    const [lockZoneName, setLockZoneName] = useState("");

    const [messageApi, contextHolder] = message.useMessage();

    const lockZoneId = useRef("");

    useEffect(() => { // получить зоны запрета проезда роботов

        const promise = getLockZones();

        promise.then(res => {

            const polygons = res.flatMap(obj => obj.pos.map(pos => {
                const id = uuidv4();

                return <Polygon
                    id={id}
                    key={id}
                    pathOptions={{
                        color: "#33333380",
                        weight: 4,
                        fillOpacity: .4
                    }}
                    positions={pos}
                >
                    <Popup>
                        <Typography.Title level={5}>{obj.name}</Typography.Title>
                        <Space className={styles.space}>
                            <Button
                                onClick={
                                    openChangeZonnName(
                                        id,
                                        lockZoneId,
                                        obj.name,
                                        setLockZoneName,
                                        setZoneNameChangeModalState
                                    )
                                }
                            >
                                Изменить название
                            </Button>
                        </Space>
                    </Popup>
                </Polygon>
            }));

            setPolygons(polygons);

        })

    }, []);

    return <FeatureGroup>
        {contextHolder}

        {isVisibleZones && polygons}

        <EditControl
            onCreated={
                createdZone(
                    map,
                    lockZoneId,
                    openChangeZonnName,
                    setLockZoneName,
                    setZoneNameChangeModalState,
                    setPolygons
                )
            }
            onDeleted={deletedZone(setPolygons)}
            onEdited={editedZone(setPolygons)}
            draw={{
                circle: false,
                rectangle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
                polygon: {
                    shapeOptions: {
                        color: "#333",
                    },
                },
            }}
        />

        <Button className={`${styles.zonesBtn} ${styles.zonesVisibilitySwitch}`} onClick={zonesVisibilitySwitch(setVisibleZones)}>
            {isVisibleZones ? "Скрыть" : "Отобразить"}
        </Button>

        <Popconfirm
            title={<Typography.Text>Применение зон</Typography.Text>}
            description={
                <>
                    <div>
                        <Typography.Text>Вы действительно хотите применить зоны?</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>Всего зон: </Typography.Text>
                        <Typography.Text strong>{polygons.length}</Typography.Text>
                    </div>
                </>
            }
            icon={false}
            onConfirm={confirmApplyZones(polygons, messageApi)}
            okText="Да"
            cancelText="Нет"
            placement={"bottomRight"}
            okType="default"
        >
            <Button className={`${styles.zonesBtn} ${styles.applyZones}`}>
                Применить
            </Button>
        </Popconfirm>

        <Modal
            title="Изменение название зоны"
            open={isChangeZoneNameOpen}
            onCancel={cancelZoneNameChange(setLockZoneName, setZoneNameChangeModalState)}
            okText={"Применить"}
            cancelText={"Отменить"}
            okType={"default"}
            onOk={
                applyZoneNameChange(
                    polygons,
                    lockZoneId,
                    lockZoneName,
                    setLockZoneName,
                    setZoneNameChangeModalState,
                    setPolygons
                )
            }
        >
            <Input
                onChange={changeZoneName(setLockZoneName)}
                placeholder={"Введите новое название зоны!"}
                value={lockZoneName}
            />
        </Modal>

    </FeatureGroup >
});