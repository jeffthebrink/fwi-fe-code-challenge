import {
  FETCH_PLAYERS_SUCCESS,
  CREATE_PLAYER_SUCCESS,
  DELETE_PLAYER_SUCCESS,
  MODIFY_PLAYER_SUCCESS
} from './constants';

export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}

export function createPlayerSuccess(data) {
  return { type: CREATE_PLAYER_SUCCESS, payload: { data } };
}

export function deletePlayerSuccess(data) {
  return { type: DELETE_PLAYER_SUCCESS, payload: { data } };
}

export function modifyPlayerSuccess(data) {
  return { type: MODIFY_PLAYER_SUCCESS, payload: { data } };
}
