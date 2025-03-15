import { applyLockZonesData, getLockZonesData } from '../api/ZonesEditor';
import { LockZones } from '../shared/types/ZonesEditor';

export const getLockZones = async () => {

    const data = await getLockZonesData();

    if (data?.name === "AxiosError") {
        return [];
    }

    const poligons = data.features.map((obj: { geometry: { coordinates: any[][]; }; properties: { name: any; }; }) => {

        const pos = obj.geometry.coordinates.map((coords: any[][]) => coords.map(arr => arr.map((xy: number[]) => [xy[1], xy[0]])));

        return { name: obj.properties.name, pos }

    });

    return poligons;
}

export const applyLockZones = async (data: LockZones) => {

    const resp = await applyLockZonesData(data);

    if (resp?.name === "AxiosError") {
        return false;
    }
    else {
        return true;
    }

}