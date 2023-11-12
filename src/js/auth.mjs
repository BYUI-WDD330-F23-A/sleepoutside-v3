import { loginRequest } from "./externalServices.mjs";
import { alertMessage, convertToJson, getLocalStorage, setLocalStorage, setToken } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = 'so-token';

export async function login(creds, redirect = "/") {
    const token = await loginRequest(creds);
    setToken(token);
    // because of the default arg provided above...if no redirect is provided send them Home.
    window.location = redirect;
}



export function checkLogin() {
    const storedToken = getLocalStorage(tokenKey) || false;
    if (isTokenValid(storedToken)) {
        return storedToken;
    }
    // Not a valid token, clear the token and redirect to login.
    setToken('');
    let curLocation = window.location;
    let newLocation = "/login/?redirect=" + curLocation;
    window.location = newLocation;
}



function isTokenValid(userToken) {
    
    if (userToken) {
        let decodedToken = jwtDecode(userToken);
        let currentDate = new Date();
        if(decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Expired token.");
            return false;
        } else {
            console.log("Valid token.");
            return true;
        }
    }
    return false;
}