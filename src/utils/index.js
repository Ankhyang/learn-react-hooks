import { $host } from './config';
import Fetch from "./axios-helper";

const $ajax = Fetch($host, { baseAuth: null });

export { $ajax };
