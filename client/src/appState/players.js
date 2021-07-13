import {
  FETCH_PLAYERS_SUCCESS,
  CREATE_PLAYER_SUCCESS,
  DELETE_PLAYER_SUCCESS,
  MODIFY_PLAYER_SUCCESS
} from './constants';

function mergePlayers(state, { players }) {
  const newState = { ...state };
  players.forEach((player) => {
    newState[player.id] = player;
  });
  return newState;
};

function addPlayer(state, player) {
  const newState = { ...state };
  newState[player.id] = player;
  return newState;
};

function deletePlayer(state, player) {
  const newState = { ...state };
  delete newState[player];
  return newState;
};

function modifyPlayer(state, player) {
  const newState = { ...state };
  const modifiedPlayer = {
    ...newState[player.id],
    name: player.name,
    country: player.country,
    winnings: player.winnings,
  };
  newState[player.id] = modifiedPlayer;
  return newState;
};

export default function players(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);
    case CREATE_PLAYER_SUCCESS:
      return addPlayer(state, action.payload.data);
    case DELETE_PLAYER_SUCCESS:
      return deletePlayer(state, action.payload.data);
    case MODIFY_PLAYER_SUCCESS:
      return modifyPlayer(state, action.payload.data);
    default:
      return state;
  }
}
