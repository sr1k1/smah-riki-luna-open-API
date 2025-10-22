// // ---------------------------------- Definitions ---------------------------------- // //
// ------------------- Global Variables ------------------- //
const THEME_CLASS_NAME_BY_CHARACTER_ID = {
    38809: 'spider-man',
    38806: 'black-panther'
}
const HTML_ELEMENT = document.documentElement;

const comicTitle = document.querySelector('#comic-title');
const comicDesc = document.querySelector('.comic-desc');
// ----------------- Keys and Hashes ----------------- //
// Retrieve the keys + create the hashes to retrieve information from the Marvel API
// NOTE : publicKey and privateKey defined in keys.js, and MD5 is pulled from the CryptoJS cdnjs script.

// Use keys and time stamp to generate MD5 hash
const ts = Date.now().toString();

// Use all defined parameters to fetch data from API
const MD5Hash = CryptoJS.MD5(ts + privateKey + publicKey).toString()

// Create a URLSearchParams object and append all required key-value pairs
const searchParams = new URLSearchParams();

searchParams.append("apikey", publicKey);
searchParams.append("ts", ts);
searchParams.append("hash", MD5Hash);

// Defining a fetching function
function marvelComicFetch(comicID) {
    
    // Fetch data and populate page
    fetch(`https://gateway.marvel.com/v1/public/series/${comicID}?${searchParams}`)
        .then(response => response.json())
        .then(response => {
            const comic = response.data.results[0];
            console.log(comic);

            // Set image after nav bar to preview image of comic //
            // Find image element
            const previewIMG = document.querySelector('.comic-img');

            // Set src attribute to appropriate url
            const imgURL = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            previewIMG.setAttribute('src', imgURL);

            // Set title and paragraph elements to reflect selected comic attributes //
            // Set attributes of comic title and comic description
            comicTitle.style.display = '';
            comicDesc.style.display = '';

            comicTitle.innerText = comic.title
            comicDesc.innerText = comic.description;

            // Change colors on page //
            // Set the class of the html element to the character specified by the passed in comic ID
            const charName = THEME_CLASS_NAME_BY_CHARACTER_ID[comicID];

            // Remove all classes on the html element, followed by adding the class name of the current comic
            HTML_ELEMENT.className = '';
            HTML_ELEMENT.setAttribute('class', charName);
        })
        .catch(error => console.log('The fetch was unsuccessful! Probably because the API sucks and the server is down.'));;
}

// // ---------------------------------- Relevant Runtime ---------------------------------- // //

// Hide all text elements that are not in use
comicTitle.style.display = 'None';
comicDesc.style.display = 'None';

// ----------------- Ultimate Spider-Man ----------------- //
// Locate link for Spider-Man
const usmShow = document.querySelector('#usm-click');

// When clicked, fetch Spider-Man data from the endpoint
usmShow.addEventListener('click', () => marvelComicFetch(38809));

// ----------------- Ultimate Black Panther ----------------- //
// Locate link for Black Panther
const ubpShow = document.querySelector('#ubp-click');

// When clicked, fetch Black Panther data from the endpoint 
ubpShow.addEventListener('click', () => marvelComicFetch(38806));

// Series IDs for the three Ultimate comic series I was looking into
// 38806 ubp
// 44292 ueg
// 42303 uw