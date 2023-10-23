import axios from 'axios';

async function promptGPT(prompt) {
  const body = {
    prompt: prompt
  };
  console.log('Body:', body);
  try {
    const response = await axios.post('http://localhost:8080/prompt', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! status: ${error.response.status}`);
  }
}

export default promptGPT;