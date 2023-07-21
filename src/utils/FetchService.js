
//C:\Users\Mariano Macias\OneDrive - Disbyte SA\Escritorio\Berry-backUp\Berry-webApi-React\src\utils\FetchService.js

export const FetchService = {

    get: async function(url){


        const requestUrl = `${process.env.REACT_APP_BASE_URL}/${url}`; 
        console.log('fetchService.requestUrl: ', requestUrl);
        
        const response = await fetch(requestUrl);        
    }
}