/* Global Variables */
const endpoint ='http://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=b74592af4e652a316d129c16e54e4d63&units=metric';
const button = document.querySelector('#generate');

// event listener that performs the functions upon clicking on button
button.addEventListener('click', () => {
    let zipCode = document.querySelector('#zip').value; // Get user input
    const feelings = document.querySelector('#feelings').value; // Get user input
    weatherData(endpoint, zipCode, key)
    .then((data) =>{postData({temp : data.main.temp, date : newDate, userRes : feelings})})
    .then(() => {updateUI()}); // chaining promises
});



// Fetch the data from the OpenWeatherMap API
const weatherData = async (baseUrl, apiKey, code) =>{
    const data = await fetch(baseUrl + apiKey + code)
    try{
        return await data.json(); 
    }
    catch(error){
        console.log('error', error);
    }
}

// post the data received back to the server
const postData = async (data) => {
    const response = await fetch('http://localhost:3000/postData', {
        method: 'POST',
        credentials : 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        return await response.json();
    }
    catch(error){
        console.log('error', error);
    }
}

// fetching the data from the server and updating the UI of the web app
// with the received data
const updateUI = async () => {
    const request = await fetch('http://localhost:3000/getData');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `<P>${allData.date}</p>`;
        document.getElementById('temp').innerHTML = `<P>${allData.temperature}</p>`;
        document.getElementById('content').innerHTML = `<P>${allData.userResponse}</p>`;

    }
    catch(error){
        console.log(error);
    }
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate=(d.getMonth()+1)+'.'+d.getDate()+'.'+d.getFullYear(); // add +1 to getMonth returned value, as it returns
                                                                  // months from 0 to 11.