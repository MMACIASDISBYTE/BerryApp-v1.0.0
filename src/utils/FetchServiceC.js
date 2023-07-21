import { useAuth0 } from '@auth0/auth0-react';
import useAuth from 'hooks/useAuth';

import { createAuth0Client } from '@auth0/auth0-spa-js';




export const FetchService = {
    GetTOken: async function () {
        const auth0 = await createAuth0Client({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientId: process.env.REACT_APP_AUTH0_CLIENT_ID
        });

        const accessToken = await auth0.getTokenSilently();
        console.log('accessToken: ', accessToken);
        return accessToken;
    },
    Get: async function (url) {

        const obtenerTOken = await this.GetTOken();
        console.log('obtenerTOken: ', obtenerTOken);

        const requestUrl = `${process.env.REACT_APP_BASE_URL}/${url}`;
        console.log('fetchService.requestUrl: ', requestUrl);

        const response = await fetch(requestUrl, {
            headers: {
                Authorization: `Bearer ${obtenerTOken}`, // Incluye el token en la cabecera de la solicitud.
            },
        });
        const jsonData = await response.json();
        console.log('fetchService.jsonData: ', jsonData);

        return jsonData;
    },
}