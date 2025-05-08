const myTimeZoneDisplay = document.getElementById("my-time-zone");
const resultTimeZoneDisplay = document.getElementById("result-time-zone");
const submitBtn = document.getElementById('submit')
const addressInput = document.getElementById('address')
const feedbackElem = document.getElementById('input-feedback')

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else { 
    myTimeZoneDisplay.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function success(position) {
  myTimeZoneDisplay.innerHTML = ""
  let data = []
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = "0d01523bd42245d19d894aa217e45ba5"
  var requestOptions = {
    method: 'GET',
  };
  
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      data=result.features[0].properties
      console.log(data)
      const propertiesElement = document.createElement("div")
      propertiesElement.classList.add('properties-container')
      propertiesElement.innerHTML += `
        <p>Name Of The Time Zone: ${data.timezone.name}</p>
        <p>Lat: ${data.lat}</p>
        <p>Long: ${data.lon}</p>
        <p>Offset STD: ${data.timezone.offset_STD}</p>
        <p>Offset STD Seconds: ${data.timezone.offset_STD_seconds}</p>
        <p>Offset DST: ${data.timezone.offset_DST}</p>
        <p>Offset DST Seconds: ${data.timezone.offset_DST_seconds}</p>
        <p>Country: ${data.country}</p>
        <p>Postcode: ${data.postcode}</p>
        <p>City: ${data.city}</p>
      `
      myTimeZoneDisplay.appendChild(propertiesElement)
    })
    .catch(error => console.log('error', error));
}
function timezoneByAddress(){
  resultTimeZoneDisplay.innerHTML = ""
  const address = addressInput.value
  let data = []
  const apiKey = "0d01523bd42245d19d894aa217e45ba5"
  if(address){
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`)
    .then(resp => resp.json())
    .then((geocodingResult) => {
      data = geocodingResult.features[0].properties
      console.log(data);
      const resultantProperties = document.createElement("div")
      resultantProperties.classList.add("result-properties-container")
      resultantProperties.innerHTML += `
        <p>Name Of The Time Zone: ${data.timezone.name}</p>
        <p>Lat: ${data.lat}</p>
        <p>Long: ${data.lon}</p>
        <p>Offset STD: ${data.timezone.offset_STD}</p>
        <p>Offset STD Seconds: ${data.timezone.offset_STD_seconds}</p>
        <p>Offset DST: ${data.timezone.offset_DST}</p>
        <p>Offset DST Seconds: ${data.timezone.offset_DST_seconds}</p>
        <p>Country: ${data.country}</p>
        <p>Postcode: ${data.postcode}</p>
        <p>City: ${data.city}</p>
      `
      resultTimeZoneDisplay.appendChild(resultantProperties)
    });
    } else {
      feedbackElem.style.display = "block"
      setTimeout(()=>{
        feedbackElem.style.display = "none"
      }, 2000)
    }
}
submitBtn.addEventListener("click", timezoneByAddress)

function error(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}
getLocation()