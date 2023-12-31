// let imageURL;

// function submitHandler() {
//   console.log("click");
//   const fileInput = document.getElementById("fileInput");
//   console.log(fileInput.files);
//   const image = fileInput.files[0];

//   // Multipart file
//   const formData = new FormData();
//   formData.append("image_file", image);
//   formData.append("size", "auto");

//   const apiKey = "jL5ViuL3NJBSifDeuV5RWysM";

//   fetch("https://api.remove.bg/v1.0/removebg", {
//     method: "POST",
//     headers: {
//       "X-Api-Key": apiKey,
//     },
//     body: formData,
//   })
//     .then(function (reponse) {
//       return reponse.blob();
//     })
//     .then(function (blob) {
//       console.log(blob);
//       const url = URL.createObjectURL(blob);
//       imageURL = url;
//       const img = document.createElement("img");
//       img.src = url;
//       document.body.appendChild(img);
//     })
//     .catch();
// }

// function downloadFile() {
//   var a = document.createElement("a"); //<a></a>
//   a.href = imageURL;
//   a.download = "naciasv.png";
//   document.body.appendChild(a);

//   a.click();

//   document.body.removeChild(a);
// }

let addCard = document.getElementById("addCard");
let displayCard = document.getElementById("displayCard");
let loadingCard = document.getElementById("loadingCard");
let downloadCard = document.getElementById("downloadCard");
let fileInput = document.getElementById("fileInput");
let imageBefore = document.getElementById("display-img");
let startBtn = document.getElementById("startBtn");
let imageAfter = document.querySelector(".image-after");
let imageBeforeSM = document.querySelector(".image-before");
let uploadAnother = document.getElementById("uploadAnother");
let downloadHref = document.getElementById("downloadHref");

const reader = new FileReader();
const formData = new FormData();
let file = null;
const API_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = "jL5ViuL3NJBSifDeuV5RWysM";

const activeScreen = (screen) => {
  addCard.style.display = "none";
  displayCard.style.display = "none";
  loadingCard.style.display = "none";
  downloadCard.style.display = "none";
  screen.style.display = "flex";
};

activeScreen(addCard);

fileInput.addEventListener("input", () => {
  file = fileInput.files[0];
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    // console.log(reader.result);
    imageBefore.src = reader.result;
    imageBeforeSM.src = reader.result;
  };
  activeScreen(displayCard);
});

startBtn.addEventListener("click", () => {
  formData.append("image_file", file);
  activeScreen(loadingCard);
  fetch(API_URL, {
    method: "POST",
    headers: {
      "X-Api-Key": API_KEY,
    },
    body: formData,
  })
    .then((res) => res.blob())
    .then((blob) => {
      file = fileInput.files[0];
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        imageAfter.src = reader.result;
        downloadHref.setAttribute("href", reader.result);
      };
      activeScreen(downloadCard);
    });
});

uploadAnother.addEventListener("click", () => {
  window.location.reload();
});
