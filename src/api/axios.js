import axios from "axios";
import {URL_BASE_SERVER} from './utils.js';

export const connection = axios.create({
  baseURL:URL_BASE_SERVER 
});

