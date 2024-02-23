const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:DdhYCmh_/temoignages_freelance';
const newQuoteBtn = document.getElementById('get-new-quote');
const quoteEl = document.querySelector('[data-quote]');
const quoteImgEl = document.querySelector('[data-img');
const quotePrenomEl = document.querySelector('[data-prenom]');
const quoteNomEl = document.querySelector('[data-nom]');
const quotePosteEl = document.querySelector('[data-poste]');
const quoteLkEl = document.querySelector('[data-lk]');

async function fetchDataAsync() {
  try {
    const response = await fetch(API_URL);
    if (!response) {
      throw new Error('Response is not okay');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function displayQuote() {
  try {
    const data = await fetchDataAsync();
    const randomNumer = Math.floor(Math.random() * data.length);
    quoteEl.textContent = data[randomNumer].Temoignage;
    quotePrenomEl.textContent = data[randomNumer].Prenom;
    quoteNomEl.textContent = data[randomNumer].Nom;
    quotePosteEl.textContent = data[randomNumer].job_title;
    quoteLkEl.setAttribute('href', data[randomNumer].Linkedin_URL);
    if (!data[randomNumer].img_url) {
      //
    } else {
      quoteImgEl.setAttribute('src', data[randomNumer].img_url);
    }
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  displayQuote();
  newQuoteBtn.addEventListener('click', async () => {
    await displayQuote();
  });
}

const postNewQuote = async function (quote) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quote }),
    });
    if (!response) {
      throw new Error('Response is not okay');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postQuote = async function () {
  const data = await postNewQuote('Voici une nouvelle quote');
  console.log(data);
};

postQuote();
init();
