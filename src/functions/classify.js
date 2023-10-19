
async function classifyDocument(fileUrl, model) {
  var body = {
    "pathFile": fileUrl
  };
  console.log(JSON.stringify(body));
  const response = await fetch('http://localhost:8080/classify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

async function recognizeDocument(fileUrl, model) {
  var body = {
    "pathFile": fileUrl
  };
  console.log(JSON.stringify(body));
  const response = await fetch('http://localhost:8080/classify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export default classifyDocument;