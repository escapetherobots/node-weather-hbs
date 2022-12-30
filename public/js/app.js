// puzzle.mead.io/puzzle

console.log('client side js loaded');
const uri = 'puzzle.mead.io/puzzle';
// fetch(uri).then((res) => {
    
//     // console.log(res.body);
//     res.json().then(data => {
//         debugger;
//     })
// });

// Async/Await


// fetch(uri)
//     .then(response => {
//         response.json().then(parsedJson => {
//             console.log(parsedJson);
//             // code that can access both here
//         })
//     });





const weatherForm = document.querySelector('form');
const searchVal = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const city = document.querySelector('#city');
const state = document.querySelector('#state');
const temp = document.querySelector('#temp');
const condition = document.querySelector('#condition');
message1.textContent = '';
city.textContent = '';
state.textContent = '';
temp.textContent = '';
condition.textContent = '';



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log('event: ', searchVal.value);
    fetch('http://localhost:3000/weather?address=' + searchVal.value).then((response) => {
        response.json().then(data => {
            if(data.error) {
                console.log(data.error);
                message1.textContent = data.error;
            }
            else {
                console.log(data.city);
                console.log(data.state);
                console.log(data.temp);
                console.log(data.forecast[0]);
                city.textContent =      data.city;
                state.textContent =     data.state;
                temp.textContent =      data.temp;
                condition.textContent = data.forecast[0];
            }
        })
    });
});