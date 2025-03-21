// questo documento si caricherà in index.html

//FUNZIONE PER AVERE ANNO CORRENTE NEL FOOTER

const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();

const hideSpinner = function () {
  const div = document.getElementById("divspinner");
  div.classList.add("d-none");
};

const getEvents = function () {
  const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";
  fetch(eventsURL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzA1YzM4MzRiZjAwMTUwMDA3MGEiLCJpYXQiOjE3NDI1NDkwODQsImV4cCI6MTc0Mzc1ODY4NH0.UGR0ADoR1Yfb4OS4XSGYhs6qfDT87_MmP0UG1KUlGa8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("la risposta non era valida");
      }
    })
    .then((data) => {
      console.log("DATI", data);
      hideSpinner();

      data.forEach((car) => {
        const row = document.getElementById("events-row");

        row.innerHTML += `<div class="col col-12 col-sm-6 col-md-4 col-lg-4 col-xxl-3 my-3">
  <div class="card h-100">
    <img src="${car.imageUrl}" class="card-img-top img-fluid" alt="${car.name}">
    <div class="card-body bg-black text-white d-flex flex-column">
      <h5 class="card-title">${car.name}</h5>
      <p class="card-text">${car.description}</p>
      <p class="card-text flex-grow-1">${car.price}$</p>
      <div class="d-xl-flex">
      <a href="./viewcard.html?id=${car._id}" class="btn btn-outline-primary mx-2 my-3 my-xl-0 p-1 w-100">Vai Ai Dettagli</a>
      <a href="./details.html?id=${car._id}" class="btn btn-outline-success mx-2 p-1 w-100">Modifica</a>
       </div>
    </div>
  </div>
</div>`;
      });
    })

    .catch((error) => {
      hideSpinner();
      console.log("Si è verificato un errore:", error);
    });
};

getEvents();

window.addEventListener("scroll", function () {
  let header = document.getElementById("change-color");

  if (window.scrollY > 50) {
    header.classList.add("newcolor");
  } else {
    header.classList.remove("newcolor");
  }
});
