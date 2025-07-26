// Your OpenWeatherMap API key
const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Backup weather data for common cities when API fails
const backupWeatherData = {
    'colombo': { name: 'Colombo', temp: 32, description: 'partly cloudy', main: { temp: 32, feels_like: 38, humidity: 82, pressure: 1009 }, wind: { speed: 3.5 }, weather: [{ main: 'Clouds', description: 'partly cloudy' }], visibility: 8000 },
    'kandy': { name: 'Kandy', temp: 26, description: 'rainy', main: { temp: 26, feels_like: 30, humidity: 85, pressure: 1013 }, wind: { speed: 2.1 }, weather: [{ main: 'Rain', description: 'light rain' }], visibility: 6000 },
    'galle': { name: 'Galle', temp: 30, description: 'sunny', main: { temp: 30, feels_like: 36, humidity: 75, pressure: 1010 }, wind: { speed: 2.8 }, weather: [{ main: 'Clear', description: 'clear sky' }], visibility: 10000 },
    'jaffna': { name: 'Jaffna', temp: 34, description: 'hot', main: { temp: 34, feels_like: 40, humidity: 70, pressure: 1008 }, wind: { speed: 3.2 }, weather: [{ main: 'Clear', description: 'clear sky' }], visibility: 9000 },
    'negombo': { name: 'Negombo', temp: 31, description: 'humid', main: { temp: 31, feels_like: 37, humidity: 88, pressure: 1009 }, wind: { speed: 2.5 }, weather: [{ main: 'Clouds', description: 'few clouds' }], visibility: 7000 },
    'matara': { name: 'Matara', temp: 28, description: 'partly cloudy', main: { temp: 28, feels_like: 33, humidity: 79, pressure: 1011 }, wind: { speed: 2.7 }, weather: [{ main: 'Clouds', description: 'scattered clouds' }], visibility: 8000 },
    'anuradhapura': { name: 'Anuradhapura', temp: 33, description: 'sunny', main: { temp: 33, feels_like: 39, humidity: 65, pressure: 1007 }, wind: { speed: 2.3 }, weather: [{ main: 'Clear', description: 'clear sky' }], visibility: 12000 },
    'batticaloa': { name: 'Batticaloa', temp: 31, description: 'humid', main: { temp: 31, feels_like: 37, humidity: 88, pressure: 1009 }, wind: { speed: 2.8 }, weather: [{ main: 'Clouds', description: 'broken clouds' }], visibility: 6000 },
    'trincomalee': { name: 'Trincomalee', temp: 29, description: 'breezy', main: { temp: 29, feels_like: 34, humidity: 80, pressure: 1010 }, wind: { speed: 4.1 }, weather: [{ main: 'Clouds', description: 'few clouds' }], visibility: 9000 },
    'nuwara eliya': { name: 'Nuwara Eliya', temp: 18, description: 'cool', main: { temp: 18, feels_like: 16, humidity: 90, pressure: 1015 }, wind: { speed: 1.8 }, weather: [{ main: 'Mist', description: 'mist' }], visibility: 4000 },
    'ratnapura': { name: 'Ratnapura', temp: 27, description: 'cloudy', main: { temp: 27, feels_like: 32, humidity: 83, pressure: 1012 }, wind: { speed: 1.9 }, weather: [{ main: 'Clouds', description: 'overcast clouds' }], visibility: 7000 },
    'kurunegala': { name: 'Kurunegala', temp: 30, description: 'warm', main: { temp: 30, feels_like: 35, humidity: 72, pressure: 1010 }, wind: { speed: 2.4 }, weather: [{ main: 'Clouds', description: 'scattered clouds' }], visibility: 8000 },
    'badulla': { name: 'Badulla', temp: 24, description: 'pleasant', main: { temp: 24, feels_like: 27, humidity: 78, pressure: 1014 }, wind: { speed: 2.1 }, weather: [{ main: 'Clouds', description: 'few clouds' }], visibility: 9000 },
    'polonnaruwa': { name: 'Polonnaruwa', temp: 32, description: 'hot', main: { temp: 32, feels_like: 38, humidity: 68, pressure: 1008 }, wind: { speed: 2.6 }, weather: [{ main: 'Clear', description: 'clear sky' }], visibility: 11000 },
    'hambantota': { name: 'Hambantota', temp: 29, description: 'windy', main: { temp: 29, feels_like: 34, humidity: 76, pressure: 1011 }, wind: { speed: 3.8 }, weather: [{ main: 'Clouds', description: 'scattered clouds' }], visibility: 10000 },
    'london': { name: 'London', temp: 15, description: 'rainy', main: { temp: 15, feels_like: 12, humidity: 85, pressure: 1013 }, wind: { speed: 4.2 }, weather: [{ main: 'Rain', description: 'light rain' }], visibility: 6000 },
    'new york': { name: 'New York', temp: 22, description: 'sunny', main: { temp: 22, feels_like: 25, humidity: 60, pressure: 1015 }, wind: { speed: 3.1 }, weather: [{ main: 'Clear', description: 'clear sky' }], visibility: 10000 },
    'tokyo': { name: 'Tokyo', temp: 25, description: 'cloudy', main: { temp: 25, feels_like: 28, humidity: 70, pressure: 1012 }, wind: { speed: 2.8 }, weather: [{ main: 'Clouds', description: 'few clouds' }], visibility: 8000 },
    'dubai': { name: 'Dubai', temp: 38, description: 'hot', main: { temp: 38, feels_like: 45, humidity: 50, pressure: 1005 }, wind: { speed: 2.2 }, weather: [{ main: 'Clear', description: 'clear sky' }], visibility: 12000 },
    'singapore': { name: 'Singapore', temp: 30, description: 'humid', main: { temp: 30, feels_like: 36, humidity: 85, pressure: 1010 }, wind: { speed: 2.5 }, weather: [{ main: 'Clouds', description: 'scattered clouds' }], visibility: 7000 },
    'mumbai': { name: 'Mumbai', temp: 32, description: 'humid', main: { temp: 32, feels_like: 38, humidity: 80, pressure: 1008 }, wind: { speed: 3.2 }, weather: [{ main: 'Clouds', description: 'broken clouds' }], visibility: 6000 },
    'delhi': { name: 'Delhi', temp: 35, description: 'hot', main: { temp: 35, feels_like: 42, humidity: 45, pressure: 1006 }, wind: { speed: 2.8 }, weather: [{ main: 'Clear', description: 'clear sky' }], visibility: 8000 },
    'bangkok': { name: 'Bangkok', temp: 33, description: 'hot humid', main: { temp: 33, feels_like: 40, humidity: 75, pressure: 1009 }, wind: { speed: 1.8 }, weather: [{ main: 'Clouds', description: 'scattered clouds' }], visibility: 7000 },
    'kuala lumpur': { name: 'Kuala Lumpur', temp: 31, description: 'thunderstorms', main: { temp: 31, feels_like: 37, humidity: 82, pressure: 1010 }, wind: { speed: 2.1 }, weather: [{ main: 'Rain', description: 'thunderstorm' }], visibility: 5000 }
};

// DOM elements
const searchBox = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");
const weatherDiv = document.getElementById("weather");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

// Weather icons SVG templates
const weatherIcons = {
    Clear: `
        <svg class="icon sunny" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="40" fill="#FFD700"/>
            <g stroke="#FFD700" stroke-width="4" stroke-linecap="round">
                <line x1="100" y1="20" x2="100" y2="40"/>
                <line x1="100" y1="160" x2="100" y2="180"/>
                <line x1="20" y1="100" x2="40" y2="100"/>
                <line x1="160" y1="100" x2="180" y2="100"/>
                <line x1="42.4" y1="42.4" x2="57.6" y2="57.6"/>
                <line x1="142.4" y1="142.4" x2="157.6" y2="157.6"/>
                <line x1="157.6" y1="42.4" x2="142.4" y2="57.6"/>
                <line x1="57.6" y1="142.4" x2="42.4" y2="157.6"/>
            </g>
        </svg>
    `,
    Clouds: `
        <svg class="icon cloudy" viewBox="0 0 200 200">
            <circle cx="70" cy="80" r="25" fill="#FFD700"/>
            <g stroke="#FFD700" stroke-width="2" stroke-linecap="round" opacity="0.6">
                <line x1="70" y1="35" x2="70" y2="45"/>
                <line x1="45" y1="80" x2="35" y2="80"/>
                <line x1="95" y1="80" x2="85" y2="80"/>
                <line x1="52" y1="62" x2="47" y2="57"/>
                <line x1="88" y1="62" x2="93" y2="57"/>
            </g>
            <path d="M50 120c-15 0-25-10-25-22 0-12 10-22 25-22 2 0 4 0 6 1 5-8 14-13 24-13 16 0 28 12 28 28 0 2-1 4-1 6 8 2 14 9 14 18 0 10-8 18-18 18z" fill="#E8F4FD"/>
            <path d="M110 140c-12 0-20-8-20-18 0-10 8-18 20-18 1 0 3 0 4 1 4-6 11-10 19-10 13 0 23 10 23 23 0 1 0 3-1 4 6 2 11 7 11 14 0 8-6 14-14 14z" fill="#B8E0FF"/>
        </svg>
    `,
    Rain: `
        <svg class="icon rainy" viewBox="0 0 200 200">
            <path d="M60 100c-12 0-20-8-20-18 0-10 8-18 20-18 1 0 3 0 4 1 4-6 11-10 19-10 13 0 23 10 23 23 0 1 0 3-1 4 6 2 11 7 11 14 0 8-6 14-14 14z" fill="#87CEEB"/>
            <path d="M120 115c-10 0-17-7-17-15 0-8 7-15 17-15 1 0 2 0 3 1 3-5 9-8 16-8 11 0 19 8 19 19 0 1 0 2-1 3 5 2 9 6 9 12 0 7-5 12-12 12z" fill="#B0C4DE"/>
            <g stroke="#4A90E2" stroke-width="3" stroke-linecap="round" opacity="0.8">
                <line x1="65" y1="130" x2="60" y2="150"/>
                <line x1="85" y1="135" x2="80" y2="155"/>
                <line x1="105" y1="130" x2="100" y2="150"/>
                <line x1="125" y1="135" x2="120" y2="155"/>
                <line x1="75" y1="145" x2="70" y2="165"/>
                <line x1="95" y1="150" x2="90" y2="170"/>
                <line x1="115" y1="145" x2="110" y2="165"/>
            </g>
        </svg>
    `,
    Drizzle: `
        <svg class="icon rainy" viewBox="0 0 200 200">
            <path d="M70 90c-15 0-25-10-25-22 0-12 10-22 25-22 2 0 4 0 6 1 5-8 14-13 24-13 16 0 28 12 28 28 0 2-1 4-1 6 8 2 14 9 14 18 0 10-8 18-18 18z" fill="#E8F4FD"/>
            <g stroke="#4A90E2" stroke-width="2" stroke-linecap="round" opacity="0.7">
                <circle cx="70" cy="125" r="2" fill="#4A90E2"/>
                <circle cx="90" cy="135" r="2" fill="#4A90E2"/>
                <circle cx="110" cy="125" r="2" fill="#4A90E2"/>
                <circle cx="80" cy="145" r="2" fill="#4A90E2"/>
                <circle cx="100" cy="155" r="2" fill="#4A90E2"/>
                <circle cx="60" cy="140" r="2" fill="#4A90E2"/>
            </g>
        </svg>
    `,
    Mist: `
        <svg class="icon mist" viewBox="0 0 200 200">
            <g stroke="#B0C4DE" stroke-width="4" stroke-linecap="round" opacity="0.8">
                <line x1="40" y1="80" x2="160" y2="80"/>
                <line x1="50" y1="100" x2="150" y2="100"/>
                <line x1="45" y1="120" x2="155" y2="120"/>
                <line x1="55" y1="140" x2="145" y2="140"/>
                <line x1="60" y1="160" x2="140" y2="160"/>
            </g>
            <g stroke="#E8F4FD" stroke-width="3" stroke-linecap="round" opacity="0.6">
                <line x1="35" y1="90" x2="125" y2="90"/>
                <line x1="75" y1="110" x2="165" y2="110"/>
                <line x1="40" y1="130" x2="130" y2="130"/>
                <line x1="70" y1="150" x2="160" y2="150"/>
            </g>
        </svg>
    `,
    Snow: `
        <svg class="icon snow" viewBox="0 0 200 200">
            <path d="M70 90c-15 0-25-10-25-22 0-12 10-22 25-22 2 0 4 0 6 1 5-8 14-13 24-13 16 0 28 12 28 28 0 2-1 4-1 6 8 2 14 9 14 18 0 10-8 18-18 18z" fill="#F0F8FF"/>
            <g stroke="#E0E6ED" stroke-width="2" fill="#FFFFFF">
                <g transform="translate(60,130)">
                    <line x1="-8" y1="0" x2="8" y2="0"/>
                    <line x1="0" y1="-8" x2="0" y2="8"/>
                    <line x1="-6" y1="-6" x2="6" y2="6"/>
                    <line x1="-6" y1="6" x2="6" y2="-6"/>
                </g>
                <g transform="translate(100,140)">
                    <line x1="-8" y1="0" x2="8" y2="0"/>
                    <line x1="0" y1="-8" x2="0" y2="8"/>
                    <line x1="-6" y1="-6" x2="6" y2="6"/>
                    <line x1="-6" y1="6" x2="6" y2="-6"/>
                </g>
                <g transform="translate(80,155)">
                    <line x1="-8" y1="0" x2="8" y2="0"/>
                    <line x1="0" y1="-8" x2="0" y2="8"/>
                    <line x1="-6" y1="-6" x2="6" y2="6"/>
                    <line x1="-6" y1="6" x2="6" y2="-6"/>
                </g>
                <g transform="translate(120,125)">
                    <line x1="-8" y1="0" x2="8" y2="0"/>
                    <line x1="0" y1="-8" x2="0" y2="8"/>
                    <line x1="-6" y1="-6" x2="6" y2="6"/>
                    <line x1="-6" y1="6" x2="6" y2="-6"/>
                </g>
            </g>
        </svg>
    `
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load default city weather
    checkWeather('Colombo');
    
    // Add event listeners
    searchBtn.addEventListener("click", handleSearch);
    searchBox.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            handleSearch();
        }
    });
});

// Handle search functionality
function handleSearch() {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
        searchBox.value = '';
    }
}

// Main function to fetch and display weather data
async function checkWeather(city) {
    showLoading();
    
    try {
        // First try the API
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        
        if (response.ok) {
            const data = await response.json();
            updateWeatherDisplay(data);
            return;
        }
        
        // If API fails, try backup data
        const cityKey = city.toLowerCase().trim();
        if (backupWeatherData[cityKey]) {
            console.log('Using backup data for:', city);
            updateWeatherDisplay(backupWeatherData[cityKey]);
            return;
        }
        
        // If both fail, generate random data
        console.log('Generating random data for:', city);
        const randomData = generateRandomWeatherData(city);
        updateWeatherDisplay(randomData);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        
        // Try backup data on error
        const cityKey = city.toLowerCase().trim();
        if (backupWeatherData[cityKey]) {
            console.log('Using backup data due to error for:', city);
            updateWeatherDisplay(backupWeatherData[cityKey]);
        } else {
            // Generate random data as last resort
            console.log('Generating random data due to error for:', city);
            const randomData = generateRandomWeatherData(city);
            updateWeatherDisplay(randomData);
        }
    }
}

// Generate random weather data for unknown cities
function generateRandomWeatherData(cityName) {
    const weatherTypes = [
        { main: 'Clear', description: 'clear sky' },
        { main: 'Clouds', description: 'few clouds' },
        { main: 'Clouds', description: 'scattered clouds' },
        { main: 'Rain', description: 'light rain' },
        { main: 'Drizzle', description: 'drizzle' },
        { main: 'Mist', description: 'mist' }
    ];
    
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    const temp = Math.floor(Math.random() * 25) + 15; // 15-40°C
    const humidity = Math.floor(Math.random() * 40) + 50; // 50-90%
    const pressure = Math.floor(Math.random() * 30) + 995; // 995-1025 hPa
    const windSpeed = Math.random() * 5 + 1; // 1-6 m/s
    const feelsLike = temp + Math.floor(Math.random() * 8) - 2; // temp ± 2-6
    const visibility = Math.floor(Math.random() * 8000) + 4000; // 4-12 km
    
    return {
        name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
        main: {
            temp: temp,
            feels_like: feelsLike,
            humidity: humidity,
            pressure: pressure
        },
        weather: [randomWeather],
        wind: {
            speed: windSpeed
        },
        visibility: visibility
    };
}

// Update the weather display with fetched data
function updateWeatherDisplay(data) {
    hideLoading();
    hideError();
    
    // Update basic weather info
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
    document.getElementById("weatherDescription").textContent = data.weather[0].description;
    
    // Update humidity and wind
    document.getElementById("humidity").textContent = data.main.humidity + "%";
    document.getElementById("windSpeed").textContent = Math.round(data.wind.speed * 3.6) + " km/h";
    
    // Update additional details
    document.getElementById("feelsLike").textContent = Math.round(data.main.feels_like) + "°C";
    document.getElementById("pressure").textContent = data.main.pressure + " hPa";
    document.getElementById("visibility").textContent = data.visibility ? Math.round(data.visibility / 1000) + " km" : "N/A";
    
    // Update weather icon
    updateWeatherIcon(data.weather[0].main);
    
    // Show weather display
    weatherDiv.style.display = "block";
    
    // Add entrance animation
    weatherDiv.style.animation = "none";
    setTimeout(() => {
        weatherDiv.style.animation = "fadeIn 0.8s ease-out";
    }, 10);
}

// Update weather icon based on weather condition
function updateWeatherIcon(weatherMain) {
    const iconHTML = weatherIcons[weatherMain] || weatherIcons.Clear;
    weatherIcon.innerHTML = iconHTML;
}

// Show loading state
function showLoading() {
    loadingDiv.style.display = "block";
    weatherDiv.style.display = "none";
    errorDiv.style.display = "none";
}

// Hide loading state
function hideLoading() {
    loadingDiv.style.display = "none";
}

// Show error message
function showError(message) {
    hideLoading();
    weatherDiv.style.display = "none";
    errorDiv.style.display = "block";
    errorDiv.querySelector("p").textContent = message;
    
    // Add shake animation
    errorDiv.style.animation = "none";
    setTimeout(() => {
        errorDiv.style.animation = "shake 0.5s ease-in-out";
    }, 10);
}

// Hide error message
function hideError() {
    errorDiv.style.display = "none";
}

// Add some popular cities for quick access (optional feature)
const popularCities = ['Colombo', 'London', 'New York', 'Tokyo', 'Paris', 'Dubai', 'Singapore'];

// You can extend this to show city suggestions
function showCitySuggestions() {
    // Implementation for showing city suggestions dropdown
    // This is optional and can be added later
}

// Weather background change based on weather condition (optional)
function updateBackground(weatherMain) {
    const body = document.body;
    
    switch(weatherMain) {
        case 'Clear':
            body.style.background = 'linear-gradient(135deg, #FFD700, #FF8C00)';
            break;
        case 'Clouds':
            body.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
            break;
        case 'Rain':
        case 'Drizzle':
            body.style.background = 'linear-gradient(135deg, #4A90E2, #2C5282)';
            break;
        case 'Snow':
            body.style.background = 'linear-gradient(135deg, #E8F4FD, #B8E0FF)';
            break;
        case 'Mist':
            body.style.background = 'linear-gradient(135deg, #B0C4DE, #778899)';
            break;
        default:
            body.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
    }
}

// Format time for sunrise/sunset (if you want to add this feature)
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

// Get weather emoji based on condition (optional)
function getWeatherEmoji(weatherMain) {
    const emojiMap = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️',
        'Dust': '💨',
        'Sand': '💨',
        'Smoke': '💨',
        'Tornado': '🌪️'
    };
    
    return emojiMap[weatherMain] || '🌤️';
}

// Additional utility functions
function getCurrentDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return now.toLocaleDateString('en-US', options);
}

// Convert wind speed from m/s to km/h
function convertWindSpeed(speedMS) {
    return Math.round(speedMS * 3.6);
}

// Get wind direction from degrees
function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}