document.querySelector('#search').addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        return showAlert('Você precisa digitar uma cidade...');
    }

    const apiKey = "8d7a0b42b4978a24522104d7803b175b";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(apiUrl);
        const json = await results.json();

        if (json.cod === 200) {
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            });
        } else if (json.cod === '404') {
            showAlert(`
                Não foi possível localizar...
                <img src="abstract-fatal-error.gif" alt="Erro"/>
                `);
        }
    } catch (error) {
        showAlert('Ocorreu um erro ao buscar os dados. Por favor, tente novamente mais tarde.');
    }
});

function showInfo(json) {
    document.querySelector('#city_name').classList.remove('is-invalid');
    showAlert('');

    document.querySelector('#weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;

    document.querySelector('#temp_description').innerHTML = `${json.description}`;

    const tempImg = document.querySelector('#temp_img');
    tempImg.setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    tempImg.setAttribute('alt', json.description);

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;

    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`;

    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;

    document.querySelector('#wind_speed').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function showAlert(msg) {
    const alertElement = document.querySelector('#alert');
    alertElement.innerHTML = msg;
}
