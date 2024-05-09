import * as dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const production = process.env['PRODUCTION'] === 'true';
const firebaseConfig = {
  apiKey: process.env['FIREBASE_API_KEY'],
  authDomain: process.env['FIREBASE_AUTH_DOMAIN']
};

// Exporta las variables
export const environment = {
  production: production,
  firebaseConfig: firebaseConfig
};
