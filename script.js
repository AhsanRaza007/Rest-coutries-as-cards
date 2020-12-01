
//function that wraps a XMLHttpRequest in a promise to make AJAX reqests promise-like
//return a promise that resolves the response from url parsed as JSON
function promiseRequest(method='GET', url='https://restcountries.eu/rest/v2/all'){
    return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
        request.open(method, url);
        request.onload = function(){
            resolve(JSON.parse(this.response));
        };
        request.onerror=function(){
            reject("Error!"+ this.status + " " + this.statusText)
        };
        request.send();
    });
}

let restcountriesData = [];

//Fetch style promise based ajax request
promiseRequest()
.then(data=>{
    restcountriesData=data;
    //run() starts the main DOM element creation using the rest countries data
    run();
})
.catch(err=>console.log(err));


function run(){
    let root = document.getElementById('root');
    root.className = "my-5 row mx-auto container flex-wrap jusify-content-around";

    //for-each country create a card and append it to the root element
    restcountriesData.forEach((country)=>{
        createcard(country.name, country.flag,country.capital, country.alpha2Code+","+country.alpha3Code, country.region, country.latlng.join(","))
    })

    //function to create individual cards using thr data from a country and add the card to the root element
    function createcard(country, flagUrl, capital, countryCodes, region, latLong){
        let card = document.createElement('div');
        card.className = "card p-0 col-md-3 col-12"

        card.innerHTML=`<div class="card-header">
                            ${country}
                        </div>
                        <img class="card-img-top img-fluid" src="${flagUrl}"/>
                        <div class="card-body">
                            <p class="card-text">Capital: <span class="badge badge-success">${capital}</span></p>
                            <p class="card-text">Country Codes: <span class="font-weight-bold">${countryCodes}</p>
                            <p class="card-text">Region: <span class="font-weight-bold">${region}</p>
                            <p class="card-text">Lat, Long <span class="font-weight-bold">${latLong}</p>
                        </div>`;

        root.appendChild(card);
    }
}
