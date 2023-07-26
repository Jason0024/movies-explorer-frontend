import { _checkResponse } from './constants';
import { BASE_URL } from './constants';

export function getCards() {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => _checkResponse(res));
}
