const myform = document.getElementById("formviewcard");
myform.addEventListener("submit", function (e) {
  e.preventDefault();
  myform.reset();
});

const mybuttonTriggerAlert = document.getElementById("coloralert");
mybuttonTriggerAlert.addEventListener("click", function (e) {
  e.preventDefault();
  const alert = document.getElementById("success-alert");

  alert.classList.remove("alertttstart");
  alert.classList.remove("alertttgo");
  alert.classList.add("opacity-0");
  alert.classList.remove("opacity-0");
  alert.classList.add("alertttstart");

  setTimeout(function () {
    alert.classList.add("alertttgo");
  }, 3000);
  myform.reset();
});

window.addEventListener("scroll", function () {
  let header = document.getElementById("change-color");

  if (window.scrollY > 50) {
    header.classList.add("newcolor");
  } else {
    header.classList.remove("newcolor");
  }
});
