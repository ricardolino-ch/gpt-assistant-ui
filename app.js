const client = ZAFClient.init();

async function callGPT(action, text) {
  const response = await fetch('https://gpt-backend-82dw.onrender.com/gpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action, text })
  });

  const data = await response.json();
  return data.text || 'Fehler bei der GPT-Antwort.';
}

window.onload = async () => {
  const textarea = document.getElementById('input');
  const improveBtn = document.getElementById('improve');
  const translateBtn = document.getElementById('translate');

  const data = await client.get('comment.text');
  if (data['comment.text']) {
    textarea.value = data['comment.text'];
  }

  improveBtn.onclick = async () => {
    improveBtn.disabled = true;
    improveBtn.innerText = 'Wird verbessert...';
    textarea.value = await callGPT('improve', textarea.value);
    improveBtn.disabled = false;
    improveBtn.innerText = 'Text verbessern';
  };

  translateBtn.onclick = async () => {
    translateBtn.disabled = true;
    translateBtn.innerText = 'Übersetze...';
    textarea.value = await callGPT('translate_de_fr', textarea.value);
    translateBtn.disabled = false;
    translateBtn.innerText = 'Übersetzen (DE → FR)';
  };
};