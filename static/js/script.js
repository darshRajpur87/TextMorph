const apiKey = "YOUR_API_KEY";  

async function translateTextDirectly(text, targetLang) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      q: text,
      target: targetLang,
      format: "text"
    })
  });

  const data = await response.json();

  if (data.data && data.data.translations && data.data.translations.length > 0) {
    return data.data.translations[0].translatedText;
  } else if (data.error) {
    throw new Error(data.error.message);
  } else {
    throw new Error("Translation failed");
  }
}

document.getElementById('btn-convert').addEventListener('click', async () => {
  const inputText = document.querySelector('.text-div').innerText.trim();
  const targetLang = document.getElementById('language-selector').value;
  const outputDiv = document.querySelector('.textO-div');

  if (!inputText || inputText === "Type your text here...") {
    outputDiv.innerText = 'Please enter text to translate.';
    return;
  }

  outputDiv.innerText = 'Translating...';

  try {
    const translatedText = await translateTextDirectly(inputText, targetLang);
    outputDiv.innerText = translatedText;
  } catch (error) {
    outputDiv.innerText = 'Translation error: ' + error.message;
  }
});
function copyText() {
  const text = document.getElementById("textToCopy").innerText;
  navigator.clipboard.writeText(text)
    .then(() => alert("Text copied!"))
    .catch(err => console.error("Copy failed", err));
}
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

