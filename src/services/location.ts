import {hasStartedLocationUpdatesAsync, LocationObject, stopLocationUpdatesAsync} from "expo-location";
import {LocationRequest} from "../interfaces/requests/LocationRequest";
import {putLocation} from "./api";
import {LOCATION_TASK_NAME} from "../consts/taskNames";

export async function sendLocation({data, error}) {
  if (error) {
    console.error(error);
    return;
  }

  if (data) {
    const locations = data.locations as LocationObject[];

    const location = locations.filter(l => Math.max(...locations.map(x => x.timestamp)) === l.timestamp)[0];

    const {longitude, latitude} = location.coords;

    const locationRequest: LocationRequest = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    };

    console.log(locationRequest);
    const responseOrError = await putLocation(locationRequest);
    console.log(responseOrError);

    if (responseOrError === 401) {
      const taskHasStarted = await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

      if(taskHasStarted)
        await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }
  }
}