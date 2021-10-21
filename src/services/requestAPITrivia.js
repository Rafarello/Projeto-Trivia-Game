const REQUEST_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const requestToken = async () => {
  const response = await fetch(REQUEST_TOKEN);
  const responseJson = await response.json();
  return responseJson;
};

export const requestQuestions = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const responseJson = await response.json();
  return responseJson;
};

export default requestToken;
