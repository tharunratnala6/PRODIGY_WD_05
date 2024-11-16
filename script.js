let weather = {
    apikey: "366ad39fda7445f2b6d32c94121cc86b",
    fetchWeather: function (city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data))
            .catch((error) => {
                document.querySelector(".city").innerText = "City not found.";
                document.querySelector(".temp").innerText = "--°C";
                document.querySelector(".description").innerText = "N/A";
                document.querySelector(".humidity").innerText = "Humidity: --%";
                document.querySelector(".wind").innerText = "Wind speed: -- km/h";
                document.querySelector(".icon").src = "";
                document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?landscape')";
                console.error(error.message);
            });
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        // Update weather details
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".weather").classList.remove("loading");

        // Update background image
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name},weather')`;
    },

    search: function () {
        const searchBarValue = document.querySelector(".searchbar").value.trim();
        if (searchBarValue === "") {
            alert("Please enter a city name.");
        } else {
            this.fetchWeather(searchBarValue);
        }
    },
};

// Event Listeners
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

// Fetch default city's weather
weather.fetchWeather("hyderabad");
