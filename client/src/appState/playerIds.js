import {
  FETCH_PLAYERS_SUCCESS,
  CREATE_PLAYER_SUCCESS,
  DELETE_PLAYER_SUCCESS
} from './constants';

function addPlayerId(state, playerId) {
  const newState = [...state];
  newState.push(playerId);
  return newState;
}

function deletePlayerId(state, playerId) {
  const newState = [...state];
  const index = newState.indexOf(playerId);
  if (index > -1) {
    newState.splice(index, 1);
  }
  return newState;
}

export default function playerIds(state = [], action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return action.payload.data.players.map((player) => player.id);
    case CREATE_PLAYER_SUCCESS:
      return addPlayerId(state, action.payload.data.id);
    case DELETE_PLAYER_SUCCESS:
      return deletePlayerId(state, action.payload.data);
    default:
      return state;
  }
}
