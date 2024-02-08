const BASE_URL = '/api/users';
import { getToken } from "./usersService";



export async function signUp(userData) {


  return sendRequest(BASE_URL + '/', 'POST', userData);
}



export async function logIn(credentials) {
  return sendRequest(BASE_URL + '/login', 'POST', credentials);
}


export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}



export async function sendRequest(url, method = 'GET', payload = null) {

  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }

  const token = getToken();

  if (token) {
    options.headers ||= {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);

  if (res.ok) return res.json();
  throw new Error("Bad Request");
}