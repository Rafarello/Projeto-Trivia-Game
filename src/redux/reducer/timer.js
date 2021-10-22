const INITIAL_STATE = {
  btnResposta: '',
  placar: 0,
  assertions: 0,
  players: {},
};

function btnRespostaesable(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'DESABLE':
    return { ...state,
      btnResposta: action.payload };
  case 'SOMA_PLACAR':
    return { ...state,
      placar: action.payload + state.placar,
      assertions: state.assertions + 1 };
  case 'PLAYERS':
    console.log(state.players);
    return { ...state,
      players: [state.players] };
  default:
    return state;
  }
}

export default btnRespostaesable;