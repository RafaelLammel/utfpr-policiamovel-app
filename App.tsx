import React from 'react';
import {AuthProvider} from "./src/contexts/auth";
import Routes from "./src/routes";
import {defineTask} from "expo-task-manager";
import {LOCATION_TASK_NAME} from "./src/consts/taskNames";
import {sendLocation} from "./src/services/location";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

defineTask(LOCATION_TASK_NAME, sendLocation);