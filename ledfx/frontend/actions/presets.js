import fetch from "cross-fetch";

const apiUrl = window.location.protocol + "//" + window.location.host + "/api";

import { getDevicePresets } from './device_presets'

export const DELETE_PRESET = "DELETE_PRESET"
export const ADD_PRESET = "ADD_PRESET"
export const GET_ALL_PRESETS = "GET_ALL_PRESETS"
export const RENAME_PRESET = "RENAME_PRESET"

export function addPreset(name, deviceId) {
  return dispatch => {
    const data = {
      name: name
    };
    return fetch(`${apiUrl}/devices/${deviceId}/presets`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch({
        type: ADD_PRESET,
        response: json
      }))
      .then(() => dispatch(getDevicePresets(deviceId)))
  };
}

export function deletePreset(effectId, category, presetId) {
  return dispatch => {
    const data = {
      category: category,
      preset_id: presetId,
    };
    fetch(`${apiUrl}/effects/${effectId}/presets`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch({
        type: DELETE_PRESET,
        response: json
      }));
  };
}

export function renamePreset(effectId, category, presetId, name) {
  return dispatch => {
    const data = {
      category: category,
      preset_id: presetId,
      name: name
    };
    fetch(`${apiUrl}/effects/${effectId}/presets`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch({
        type: RENAME_PRESET,
        response: json
      }));
  };
}

export function getAllPresets(effectId) {
  return dispatch => {
    fetch(`${apiUrl}/effects/${effectId}/presets`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => dispatch({
          type: GET_ALL_PRESETS,
          presets: json.presets,
          receivedAt: Date.now()
      }))
  };
}