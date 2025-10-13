// ----------------- Fetch Marvel API ----------------- //
// publicKey and privateKey defined in keys.js, 
// and MD5 is pulled from the CryptoJS cdnjs script.

// Use keys and time stamp to generate MD5 hash
const ts = Date.now().toString();

// Use all defined parameters to fetch data from API
const MD5Hash = CryptoJS.MD5(ts + privateKey + publicKey).toString()

// Create a URLSearchParams object and append all required key-value pairs
const searchParams = new URLSearchParams();

searchParams.append("apikey", publicKey);
searchParams.append("ts", ts);
searchParams.append("hash", MD5Hash);
searchParams.append("titleStartsWith", "Ultimate Spider-Man");

// Fetch data from Marvel API
fetch(`https://gateway.marvel.com/v1/public/comics?${searchParams}`)
    .then(response => response.json())
    .then(data => console.log(data));