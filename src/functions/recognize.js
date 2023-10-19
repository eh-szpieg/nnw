async function recognizeDocument(fileUrl,type, model) {
  var body = {
    "pathFile": fileUrl,
    "documentType": type
  };
  console.log(JSON.stringify(body));
  const response = await fetch('http://localhost:8080/document/recognize', {
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

export default recognizeDocument;