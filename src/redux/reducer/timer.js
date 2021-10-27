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
    console.log(state.assertions + 1);
    return { ...state,
      placar: action.payload + state.placar,
      assertions: state.assertions,
    };
  case 'PLAYERS':
    return { ...state,
      players: [state.players] };
  case 'RESET_PLACAR':
    return { ...state,
      placar: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}

export default btnRespostaesable;
