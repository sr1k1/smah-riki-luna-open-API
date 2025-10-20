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

// ----------------- Ultimate Spider-Man ----------------- //
fetch(`https://gateway.marvel.com/v1/public/series/38809?${searchParams}`)
    .then(response => response.json())
    .then(response => {
        const comicUSM = response.data.results[0];

        console.log(comicUSM);

        // Set the page's title to what is shown in this query //
        const pageTitle = document.querySelector('h1');
        pageTitle.innerText = comicUSM.title

        // Add the image from the API fetch right after the nav bar //
        const previewIMG = document.createElement('img');

        // Give it the link specified by the thumbnail attribute in the response
        const imgURL = `${comicUSM.thumbnail.path}.${comicUSM.thumbnail.extension}`;

        // Add image element to HTML document
        const header = document.querySelector('header');
        
        previewIMG.setAttribute('src', imgURL);
        previewIMG.setAttribute('class', 'usm-img');

        previewIMG.style.display = 'block';
        previewIMG.style.margin = 'auto';

        header.append(previewIMG);

        // Add paragraph detailing the description of the comics as given by the Marvel API
        const marvelDesc = document.createElement('p');
        marvelDesc.setAttribute('class', 'marvelDesc');
        marvelDesc.innerText = comicUSM.description;

        // Add to the HTML tree after first paragraph
        const introFirstParagraph = document.querySelector('.intro-start-line');
        introFirstParagraph.after(marvelDesc);
    });