export const lockZones = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            30.0,
                            10.0
                        ],
                        [
                            40.0,
                            40.0
                        ],
                        [
                            20.0,
                            40.0
                        ],
                        [
                            10.0,
                            20.0
                        ],
                        [
                            30.0,
                            10.0
                        ]
                    ],
                    [
                        [
                            15.0,
                            5.0
                        ],
                        [
                            25.0,
                            15.0
                        ],
                        [
                            5.0,
                            15.0
                        ],
                        [
                            15.0,
                            5.0
                        ]
                    ],
                    [
                        [
                            45.0,
                            20.0
                        ],
                        [
                            55.0,
                            30.0
                        ],
                        [
                            35.0,
                            30.0
                        ],
                        [
                            45.0,
                            20.0
                        ]
                    ]
                ]
            },
            "properties": {
                "name": "Зона комплектации"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            60.0,
                            25.0
                        ],
                        [
                            70.0,
                            35.0
                        ],
                        [
                            50.0,
                            35.0
                        ],
                        [
                            60.0,
                            25.0
                        ]
                    ],
                    [
                        [
                            21.624,
                            -114.32
                        ],
                        [
                            22.363,
                            -126.72
                        ],
                        [
                            -1.281,
                            -127.75
                        ]
                    ],
                    [
                        [
                            -127.397,
                            -1.73
                        ],
                        [
                            -116.548,
                            -9.85
                        ],
                        [
                            -127.049,
                            -10.29
                        ]
                    ],
                    [
                        [
                            260.734,
                            29.80
                        ],
                        [
                            261.228,
                            17.43
                        ],
                        [
                            255.537,
                            17.20
                        ]
                    ]
                ]
            },
            "properties": {
                "name": "Кондиционеры"
            }
        }
    ]
}

export const lockZonesArr = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                30.0,
                                10.0
                            ],
                            [
                                40.0,
                                40.0
                            ],
                            [
                                20.0,
                                40.0
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                30.0 + 20,
                                10.0 + 20
                            ],
                            [
                                40.0 + 20,
                                40.0 + 20
                            ],
                            [
                                20.0 + 20,
                                40.0 + 20
                            ]
                        ]
                    ]
                ]
            },
            "properties": {
                "name": "Зона комплектации"
            }
        }
    ]
}

export const robotsMockData = {
    "type": "robots",
    "data": [
        {
            "id": "VV.VSHK.AK2000.206",
            "name": "VV.VSHK.AK2000.206",
            "mac": "000000000000",
            "ip": "0.0.0.0",
            "type": null,
            "status": 0,
            "charge": 68,
            "pallet_reach": 0,
            "jacking": 1,
            "lock": 3,
            "charge_status": "",
            "location_status": -20,
            "angle": null,
            "map_id": "map-russia-vshk",
            "robot_id": null,
            "group_id": null,
            "created_at": "2025-01-21T07:03:48.000Z",
            "updated_at": "2025-01-21T15:35:34.000Z",
            "obstacle": "no_obstacle",
            "emergent": "no",
            "reset_pos": null,
            "version": null,
            "disabled": 0,
            "mission_version": null,
            "fault_msg": null,
            "fail_lock": 0,
            "reset_module": null,
            "reset_module_open": 0,
            "ping": null,
            "map_name": "map-russia-vshk",
            "x": 162.1318,
            "y": -96.6058,
            "cross": false,
            "cross_msg": "",
            "charge_type": ""
        },
        {
            "id": "VV.VSHK.AK2000.207",
            "name": "VV.VSHK.AK2000.207",
            "mac": "000000000000",
            "ip": "0.0.0.0",
            "type": null,
            "status": 1,
            "charge": 70,
            "pallet_reach": 0,
            "jacking": 1,
            "lock": 3,
            "charge_status": "disconnect",
            "location_status": 2,
            "angle": null,
            "map_id": "map-russia-vshk",
            "robot_id": null,
            "group_id": null,
            "created_at": "2025-03-03T07:17:30.000Z",
            "updated_at": "2025-03-03T14:19:56.000Z",
            "obstacle": "no_obstacle",
            "emergent": "yes",
            "reset_pos": null,
            "version": null,
            "disabled": 0,
            "mission_version": null,
            "fault_msg": null,
            "fail_lock": 0,
            "reset_module": null,
            "reset_module_open": 0,
            "ping": null,
            "map_name": "map-russia-vshk",
            "x": 262.1318,
            "y": -96.6058,
            "cross": false,
            "cross_msg": "",
            "charge_type": ""
        },
        {
            "id": "VV.VSHK.AK2000.208",
            "name": "VV.VSHK.AK2000.208",
            "mac": "000000000000",
            "ip": "0.0.0.0",
            "type": null,
            "status": 3,
            "charge": 34,
            "pallet_reach": 0,
            "jacking": 1,
            "lock": 3,
            "charge_status": "disconnect",
            "location_status": 2,
            "angle": null,
            "map_id": "map-russia-vshk",
            "robot_id": null,
            "group_id": null,
            "created_at": "2025-03-03T07:31:33.000Z",
            "updated_at": "2025-03-03T14:22:47.000Z",
            "obstacle": "no_obstacle",
            "emergent": "no",
            "reset_pos": null,
            "version": null,
            "disabled": 0,
            "mission_version": null,
            "fault_msg": null,
            "fail_lock": 0,
            "reset_module": null,
            "reset_module_open": 0,
            "ping": null,
            "map_name": "map-russia-vshk",
            "x": 77.0635,
            "y": -92.7747,
            "cross": false,
            "cross_msg": "",
            "charge_type": ""
        }
    ]
}