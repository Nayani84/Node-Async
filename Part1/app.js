const baseURL = "http://numbersapi.com";
const favNumber = 5;

// 1.Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
// let favNumResponse = axios.get(`${baseURL}/${favNumber}?json`);

async function favNum() {
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(data);
  $('#factsul').append(`<p>${data.text}</p>`)
}
favNum();



// 2.Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let favNumbers = [3, 16, 20];

async function favNums() {
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  favNumbers.forEach((num) => {
    $('#factsul2').append(`<p>${data[num]}</p>`)
  })
  console.log(data);
}
favNums();



// 3.Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

async function favNumFact() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => {
    $('#factsul3').append(`<p>${data.text}</p>`);
  });
}
favNumFact();
