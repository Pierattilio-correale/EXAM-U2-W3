const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();

class Car {
  constructor(_name, _description, _price, _imageUrl, _brand) {
    this.name = _name;
    this.description = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
    this.brand = _brand;
  }
}

const URLparameters = new URLSearchParams(location.search);
const eventId = URLparameters.get("id");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("URLimg");
const brandInput = document.getElementById("brand");

const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";

if (eventId) {
  fetch(eventsURL + "/" + eventId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella fetch");
      }
    })
    .then((data) => {
      nameInput.value = data.name;
      descriptionInput.value = data.description;
      priceInput.value = data.price;

      imageUrlInput.value = data.imageUrl;
      brandInput.value = data.brand;
    })
    .catch((err) => console.log("ERRORE DEL RIPOPOLAMENTO DEL FORM", err));
}

const form = document.getElementById("event-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const car = new Car(
    nameInput.value,
    descriptionInput.value,
    priceInput.value,

    imageUrlInput.value,
    brandInput.value
  );

  console.log("CONCERT", car);

  let methodToUse;
  let URLtoUse;

  if (eventId) {
    methodToUse = "PUT";
    URLtoUse = eventsURL + "/" + eventId;
  } else {
    methodToUse = "POST";
    URLtoUse = eventsURL;
  }

  fetch(URLtoUse, {
    method: methodToUse,
    body: JSON.stringify(car),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzA1YzM4MzRiZjAwMTUwMDA3MGEiLCJpYXQiOjE3NDI1NDkwODQsImV4cCI6MTc0Mzc1ODY4NH0.UGR0ADoR1Yfb4OS4XSGYhs6qfDT87_MmP0UG1KUlGa8",

      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("SALVATAGGIO COMPLETATO!");
      } else {
        throw new Error("ricevuta response non ok dal backend");
      }
    })
    .catch((err) => {
      console.log("errore nel salvataggio!", err);
    });
});
// https://www.andreaminini.com/javascript/confirm-in-javascript#:~:text=L'istruzione%20Confirm%20del%20linguaggio,sul%20pulsante%20OK%20o%20Annulla.
const buttonFormReset = document.getElementById("resett");
buttonFormReset.addEventListener("click", function (e) {
  e.preventDefault();
  const confirmReset = confirm("Sei sicuro di voler resettare il modulo?");
  if (confirmReset) {
    form.reset();
  }
});
