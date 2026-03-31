import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export const apiConfig = {
  baseUrl: 'http://127.0.0.1:8081',
};
