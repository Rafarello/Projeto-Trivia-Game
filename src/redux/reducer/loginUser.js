// Esse reducer será responsável por tratar as informações da pessoa usuária
const URL_IMAGEM = 'https://www.gravatar.com/avatar/00000000000000000000000000000000';

const INITIAL_STATE = {
  name: 'Pessoa Jogadora',
  placar: 0,
  urlGravatar: URL_IMAGEM,
  email: '',
};

function loginUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state,
      name: action.payload.inputName,
      email: action.payload.inputEmail };
  default:
    return state;
  }
}

export default loginUser;
