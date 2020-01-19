import * as R from 'ramda';
import * as axios from "axios";
import { $log } from "./config";

function group(what, ...args) {
  if ($log && console) {
    console.groupCollapsed && console.groupCollapsed(what);
    console.log(...args);
    console.groupEnd && console.groupEnd();
  }
}

class ValidationException {
  constructor(response) {
    this.response = R.is(Object, response) ? response : JSON.parse(response);
  }

  toString() {
    let messages = [];
    R.forEach(item => messages.push(...item), this.response);
    return messages.join("\n");
  }
}

axios.defaults.withCredentials = false;

const hooks = [];

export function addCreateHook(fn) {
  hooks.push(fn);
}

export default function (host, { baseAuth = null, onError, onResponse }) {
  let options = { timeout: 10000, responseType: "json", };
  if (R.is(String, host)) {
    options.baseURL = host;
  } else {
    options = { ...options, ...host };
  }
  hooks.forEach((hook) => {
    options = hook(options);
  });
  const API = axios.create(options);

  if ($log) {
    API.interceptors.request.use((config) => {
      console.log("request", config.method, config.url, config.params, config.data);
      return config;
    });
  }

  API.interceptors.response.use(r => {
    if ($log) {
      group("Done " + R.path(['config', 'url'], r), R.prop("data", r));
    }
    if (onResponse) {
      return onResponse(r.data);
    }
    return r.data;
  }, (error) => {
    if ($log) {
      group("API Error", error.config, error.request, error.response);
    }
    if (onError) {
      return onError(error);
    }
    if (error.response && error.response.status === 422) {
      let data = error.response.data;
      return Promise.reject(new ValidationException(data));
    }
    return Promise.reject(error);
  });
  return API;
}

