import { zonesEditorReqConfig } from "../shared/apiConfigs";
import { mockDelay } from "../shared/helpers";
import { lockZones, lockZonesArr } from "../shared/mockData";
import { LockZones } from "../shared/types/ZonesEditor";
import { httpClient } from "./http-client";

export const getLockZonesData = async () => {

    try {

        const resp = await httpClient(zonesEditorReqConfig).get(`restriction`);
        return resp.data;

        // await mockDelay(1000);
        // return lockZonesArr;

    } catch (error) {
        console.error("Error of get lock zones data: ", error);
        return error;
    }

}

export const applyLockZonesData = async (data: LockZones) => {

    try {

        await httpClient(zonesEditorReqConfig).put(`restriction`, data);

        // await mockDelay(1000);

        return true;

    } catch (error) {
        console.error("Error in applying blocking zones: ", error);
        return error;
    }

}