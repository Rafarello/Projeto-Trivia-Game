const INITIAL_STATE = {
  btnResposta: false,
};

function btnRespostaesable(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'DESABLE':
    return { btnResposta: action.payload };
  default:
    return state;
  }
}

export default btnRespostaesable;
