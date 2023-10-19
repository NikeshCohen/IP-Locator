"use strict";

const apiKey = "at_iWtewRShD2LXP2vdFOauTa0xUDpp4";

///////////// DOM ELEMENTS /////////////

const input = document.querySelector(".input");
const inputBtn = document.querySelector(".btn");
const ipAddress = document.querySelector(".ip-address");
const ipLocation = document.querySelector(".location");
const timeZone = document.querySelector(".time-zone");
const isp = document.querySelector(".isp");

///////////// MAP /////////////

var map = L.map("map");

const updateMap = (lat, long) => {
  map.setView([lat, long], 16);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  var marker = L.marker([lat, long]).addTo(map);
};

///////////// INPUT /////////////

inputBtn.addEventListener("click", () => {
  updateInfo(fetchIP());
});

input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    updateInfo(fetchIP());
  }
});

const fetchIP = () => {
  let ip = input.value;

  return new URL(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`
  );
};

const clientIP = () => {
  return new URL(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`);
};

const updateInfo = (ipType) => {
  fetch(ipType)
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 422) {
        console.log("Invalid IP Address");

        input.classList.add("error");

        setTimeout(() => {
          input.classList.remove("error");
        }, 2000);
      } else {
        ipAddress.innerHTML = res.ip;
        ipLocation.innerHTML = `${res.location.city}, </br>${res.location.region} `;
        timeZone.innerHTML = `UTC${res.location.timezone}`;
        isp.innerHTML = res.isp;

        let latitude = res.location.lat;
        let longitude = res.location.lng;

        updateMap(latitude, longitude);
      }
    });
};

document.addEventListener("DOMContentLoaded", updateInfo(clientIP()));
