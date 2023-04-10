// Define variables for the search input and response container
const searchInput = document.getElementById('textarea');
const responseContainer = document.getElementById('responseContainer')
const searchButton = document.getElementById('searchButton');
const weatherImg = document.getElementById('weatherImg');
const searchCity = document.getElementById('searchCity')
checkrain = false;

// Define a function to fetch the weather data
async function getWeatherData(city) {
    const apiKey = 'Insert your API key here';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            responseContainer.textContent = 'No city found'
            //throw new Error('Failed to fetch weather data');
        }
    } catch (error) {
        console.error(error);
        responseContainer.textContent = 'Failed to fetch weather data';
    }
}

// Add an event listener to the search button
searchButton.addEventListener('click', async () => {
    const city = searchInput.value;
    const data = await getWeatherData(city);
    if (data) {
        temperature = data.main.temp - 273.15
        finalTemperature = Math.floor(temperature);
        responseContainer.textContent = `${data.weather[0].main}, ${finalTemperature} °C`;
        searchCity.innerHTML = `📍 ${city}`
        if(data.weather[0].main === "Rain") {
            weatherImg.src = './images/Drizzle.png';
        } else {
            weatherImg.src = './images/Sunny.png'
        }
    }
});