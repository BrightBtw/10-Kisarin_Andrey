import { http, HttpResponse } from 'msw';
import { baseURL } from '../services/lib/baseURL';
import { currencyResponse } from './response';

export const handlers = [
  http.get(baseURL, () => {
    return HttpResponse.json(currencyResponse)
  }),
];