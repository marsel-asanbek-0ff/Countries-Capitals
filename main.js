const countryContainer = document.querySelector('#countryContainer')
const filterInput = document.querySelector('#filterInput')

async function getCountries(){
    try{
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        return countries;

    }catch (error){
        console.log('Error fetching data:', error);

    }
}

function createCountryCard(country) {
    const card = document.createElement('div');
    card.classList.add('country-card')

    const flag = document.createElement('img');
    flag.classList.add('flag')
    flag.src = country.flags.svg;
    flag.alt = `${country.name.common} Flag`;

    const name = document.createElement('h2')
    name.textContent = country.name.common;

    const capital = document.createElement('p')
    capital.textContent = `Capital: ${country.capital}`

    card.appendChild(flag);
    card.appendChild(name);
    card.appendChild(capital);

    countryContainer.appendChild(card);
}

async function renderCountries(){
    const countries = await getCountries();
    countryContainer.innerHTML = '';

    countries.forEach(country => {
        createCountryCard(country)
    })
}

filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card')

    countryCards.forEach( card => {
        const countryName = card.querySelector('h2').textContent.toLowerCase()
        if(countryName.includes(filterValue)){
            card.style.display = 'block'
        }else{
            card.style.display = 'none'
        }
    })
})

renderCountries()