const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();

const URLparameters = new URLSearchParams(location.search);

const carId = URLparameters.get("id");

const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";

const getCarDetails = function () {
  fetch(eventsURL + "/" + carId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzA1YzM4MzRiZjAwMTUwMDA3MGEiLCJpYXQiOjE3NDI1NDkwODQsImV4cCI6MTc0Mzc1ODY4NH0.UGR0ADoR1Yfb4OS4XSGYhs6qfDT87_MmP0UG1KUlGa8",
    },
  })
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli");
      }
    })
    .then((data) => {
      console.log("DETTAGLI EVENTO", data);

      const name = document.getElementById("name");
      const description = document.getElementById("description");
      const brand = document.getElementById("brand");
      const price = document.getElementById("price");
      const imageUrl = document.getElementById("URLimg");

      name.innerText = data.name;
      brand.innerText = data.name;
      description.innerText = data.description;
      price.innerText = data.price + "€";
      imageUrl.src = data.imageUrl;
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DATI CONCERTO", err);
    });
};

const editCar = function () {
  location.assign("./backoffice.html?id=" + carId);
};

const deleteCar = function () {
  const conferma = confirm("Sei sicuro di voler eliminare questa macchina?");
  if (!conferma) {
    return;
  }

  fetch(eventsURL + "/" + carId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzA1YzM4MzRiZjAwMTUwMDA3MGEiLCJpYXQiOjE3NDI1NDkwODQsImV4cCI6MTc0Mzc1ODY4NH0.UGR0ADoR1Yfb4OS4XSGYhs6qfDT87_MmP0UG1KUlGa8",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Macchina Eliminata");
        location.assign("./home.html");
      } else {
        throw new Error("Eliminazione NON andata a buon fine!");
      }
    })
    .catch((err) => {
      console.log("ERRORE NELLA CANCELLAZIONE", err);
    });
};

getCarDetails();

window.addEventListener("scroll", function () {
  let header = document.getElementById("change-color");

  if (window.scrollY > 50) {
    header.classList.add("newcolor");
  } else {
    header.classList.remove("newcolor");
  }
});
