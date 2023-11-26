// When the page loaded start functions
window.onload = function () {
  ApplyDeskImage(0);
  ApplyDeskpadOptionImages();
  AddDeskPads();
  ApplyOptions();
};

// All the necessary ids/classes
const mainPage = document.querySelector(".main-page-desk-configurator");
const configuratorContainer = document.querySelector(".configurator-container");
const configPageButton = document.getElementById("config-button");
const deskpadName = document.getElementById("deskpad-name");
const selectDeskpad = document.getElementById("choose-deskpad");
const selectMeasurements = document.getElementById("choose-units");
const desk = document.querySelector(".desk");
const selectDeskWidth = document.getElementById("desk-width");
const selectDeskHeight = document.getElementById("desk-height");
const deskPad = document.querySelector(".deskpad");
const deskOptions = document.querySelector(".desk-options");
// Variables for desk/deskpad size, units
let deskpadIndex = 0;
const scale = 0.2; // Change the scale to fit in Desk/Deskpad on the screen
let selectDeskValueWidth = 1300; //Default
let selectDeskValueHeight = 900; //Default
let units = "mm"; //Default
let selectDeskpadValueX;
let selectDeskpadValueY;
let isDragging = false;
let offsetX;
let offsetY;
const deskImages = [
  "./images/desks/desk01.webp",
  "./images/desks/desk02.webp",
  "./images/desks/desk03.webp",
];
const deskImagesSmall = [
  "./images/desks/desk01small.webp",
  "./images/desks/desk02small.webp",
  "./images/desks/desk03small.webp",
];

// EVENT LISTENERS
// Listens if Different Deskpad size is changed
selectDeskpad.addEventListener("change", function () {
  // Get the value from the selected deskpad (value received is size)
  const selectDeskpadValue = selectDeskpad.value.split(" ").map(Number);
  selectDeskpadValueX = selectDeskpadValue[0];
  selectDeskpadValueY = selectDeskpadValue[1];
  deskPad.style.width =
    units === "mm"
      ? selectDeskpadValueX * scale + units
      : units === "cm"
      ? (selectDeskpadValueX * scale) / 10 + units
      : ((selectDeskpadValueX * scale) / 25.4).toFixed(2) + units;
  deskPad.style.height =
    units === "mm"
      ? selectDeskpadValueY * scale + units
      : units === "cm"
      ? (selectDeskpadValueY * scale) / 10 + units
      : ((selectDeskpadValueY * scale) / 25.4).toFixed(2) + units;
});

// Listens if Units changed
selectMeasurements.addEventListener("change", function () {
  // Get the value from the selected deskpad (value received is size)
  units = selectMeasurements.value;
  //
  for (let i = 0; i < selectDeskpad.children.length; i++) {
    const selectDeskpadChildrenValue = selectDeskpad.children[i].value
      .split(" ")
      .map(Number);
    const selectDeskpadChildrenValueX = selectDeskpadChildrenValue[0];
    const selectDeskpadChildrenValueY = selectDeskpadChildrenValue[1];
    selectDeskpad.children[i].textContent = `${
      units === "mm"
        ? selectDeskpadChildrenValueX + units
        : units === "cm"
        ? selectDeskpadChildrenValueX / 10 + units
        : (selectDeskpadChildrenValueX / 25.4).toFixed(2) + units + `ch`
    } ${
      units === "mm"
        ? selectDeskpadChildrenValueY + units
        : units === "cm"
        ? selectDeskpadChildrenValueY / 10 + units
        : (selectDeskpadChildrenValueY / 25.4).toFixed(2) + units + `ch`
    }`;
    ApplyOptions();
  }
});

// Listens if Desk (WIDTH) is changed
selectDeskWidth.addEventListener("input", function () {
  // Get the value from the selected deskpad (value received is size)
  selectDeskValueWidth =
    units === "mm"
      ? selectDeskWidth.value
      : units === "cm"
      ? selectDeskWidth.value * 10
      : (selectDeskWidth.value * 25.4).toFixed(2);
});

// Listens if Desk (HEIGHT) is changed
selectDeskHeight.addEventListener("input", function () {
  // Get the value from the selected deskpad (value received is size)
  selectDeskValueHeight =
    units === "mm"
      ? selectDeskHeight.value
      : units === "cm"
      ? selectDeskHeight.value * 10
      : (selectDeskHeight.value * 25.4).toFixed(2);
});

// Start dragging
deskPad.addEventListener("mousedown", (e) => {
  isDragging = true;
  // Calculate the offset from the mouse pointer to the top-left corner of the element
  offsetX = e.clientX - deskPad.getBoundingClientRect().left;
  offsetY = e.clientY - deskPad.getBoundingClientRect().top;
});

// Move Deskpad
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    // Update the element's position based on the mouse movement
    deskPad.style.left = e.clientX - offsetX + "px";
    deskPad.style.top = e.clientY - offsetY + "px";
  }
});

// Stop dragging when mouse button up
document.addEventListener("mouseup", () => {
  isDragging = false;
});

// FUNCTIONS
// Insert deskpad options html with images
function ApplyDeskpadOptionImages() {
  deskImagesSmall.forEach((image, i) => {
    deskOptions.insertAdjacentHTML(
      "beforeend",
      `
        <button onclick="ApplyDeskImage(${i})" title="Apply desk style." style="background-image: url('${image}')"></button>`
    );
  });
}
// Apply desk image
function ApplyDeskImage(deskIndex) {
  desk.style.backgroundImage = `url("${deskImages[deskIndex]}")`;
}
// Adds DeskPads from JSON file
function AddDeskPads() {
  fetch("./deskPads.json")
    .then((response) => response.json())
    .then((data) => {
      // Asign first deskpad size to variables and apply it
      selectDeskpadValueX = data[deskpadIndex].size[0].x;
      selectDeskpadValueY = data[deskpadIndex].size[0].y;
      deskPad.style.width = selectDeskpadValueX * scale + units;
      deskPad.style.height = selectDeskpadValueY * scale + units;
      deskPad.style.backgroundImage = `url("${data[deskpadIndex].image}")`;
      // Apply desk size
      desk.style.width = selectDeskValueWidth * scale + units;
      desk.style.height = selectDeskValueHeight * scale + units;
      selectDeskWidth.value = selectDeskValueWidth;
      selectDeskHeight.value = selectDeskValueHeight;
      // Input first name for the list
      deskpadName.textContent = data[deskpadIndex].name;
      // Input deskpad options
      data[deskpadIndex].size.forEach((s) => {
        selectDeskpad.insertAdjacentHTML(
          "beforeend",
          `
                <option value="${s.x} ${s.y}">${s.x}${units} x ${s.y}${units}</option>`
        );
      });
    });
}

// Toggle main page display:flex/none
function ToggleMainPage(index) {
  if (mainPage.style.display === "none" || mainPage.style.display === "") {
    mainPage.style.display = "flex";
    deskpadIndex = index;
  } else {
    mainPage.style.display = "none";
  }
}

// Toggles Deskpad Configurator page Open/Close
function ToggleConfiguratorPage(button) {
  if (button === "menu") {
    configuratorContainer.classList.remove("close-open-config-anim");
    configPageButton.classList.remove("hidden");
  } else if (button === "close") {
    configuratorContainer.classList.add("close-open-config-anim");
    configPageButton.classList.add("hidden");
  }
}

// Apply selected options by pressing the "Apply" button
function ApplyOptions() {
  // Change CSS Values
  desk.style.width =
    units === "mm"
      ? selectDeskValueWidth * scale + units
      : units === "cm"
      ? (selectDeskValueWidth * scale) / 10 + units
      : ((selectDeskValueWidth * scale) / 25.4).toFixed(2) + units;
  desk.style.height =
    units === "mm"
      ? selectDeskValueHeight * scale + units
      : units === "cm"
      ? (selectDeskValueHeight * scale) / 10 + units
      : ((selectDeskValueHeight * scale) / 25.4).toFixed(2) + units;
  // Update Desk values
  selectDeskWidth.value =
    units === "mm"
      ? selectDeskValueWidth
      : units === "cm"
      ? selectDeskValueWidth / 10
      : (selectDeskValueWidth / 25.4).toFixed(2);
  selectDeskHeight.value =
    units === "mm"
      ? selectDeskValueHeight
      : units === "cm"
      ? selectDeskValueHeight / 10
      : (selectDeskValueHeight / 25.4).toFixed(2);
}
