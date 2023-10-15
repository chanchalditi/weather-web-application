const button = document.getElementById("s-button");
const currLoc = document.getElementById("curr-location-button")
const input = document.getElementById("city-input");

const city = document.getElementById("cityLoc")
const cityTime = document.getElementById("cityTime")
const yourTime = document.getElementById("yourTime")
const cityTemp = document.getElementById("cityTemp")



//fetching data from api server
async function getData(cityName){
    const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=40659e56cce1426eba744123230207&q=${cityName}&aqi=yes`)
    if(promise.status === 400){
        alert("Invalid request! Please enter a valid CityName")
        return null
    }
    return await promise.json()
}

//fetching and passing the lat,lon to main function
async function getLocation(position) {
    const value = `${position.coords.latitude},${position.coords.longitude}`
    hello(value)
}
//if failed to get the user location
function failedtoGetLoc() {
    alert("Location access denied...")
    console.log("There was an issue...")
}


//manipulating html after getting the json file
const hello =  async (val) => {
    // const value = input.value;
    const result = await getData(val);
    if(result === null) return

    city.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
    cityTime.innerText = `${result.location.localtime}`
    cityTemp.innerText = `${result.current.temp_c}℃`
    document.getElementById("condition").innerText = `${result.current.condition.text}`
    document.getElementById("feels-like").innerText = `Feels like ${result.current.feelslike_c}℃ | Humidity ${result.current.humidity}%`
    document.getElementById("wind-pre").innerText = `Wind ${result.current.wind_kph} KM/H | Pressure ${result.current.pressure_mb} mb`
    
    console.log(result)
}

//created this function to get user location
currLoc.addEventListener("click", async () => {
    navigator.geolocation.getCurrentPosition(getLocation,failedtoGetLoc)
})


//created this function for Enter keyword
window.addEventListener("keypress", async (e) => {
    if(e.key === 'Enter'){
        const value = input.value
        hello(value)
    }
})
button.addEventListener("click", async () =>{
    const value = input.value
    hello(value)
})



// function showTime() {
//     const time = new Date()
//     const dataTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
//     // const dataDate = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
//     yourTime.innerText = `Your Date & Time: `+time
//     // console.log(time)
// }
// setInterval(showTime,1000)

