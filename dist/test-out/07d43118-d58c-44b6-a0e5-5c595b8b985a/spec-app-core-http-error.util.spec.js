import {
  PlatformLocation,
  XhrFactory,
  parseCookieValue
} from "./chunk-5O4HXTFG.js";
import {
  CSP_NONCE,
  DOCUMENT,
  DestroyRef,
  EnvironmentInjector,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  Observable,
  PendingTasks,
  ResourceImpl,
  RuntimeError,
  Service,
  TracingService,
  TransferState,
  assertInInjectionContext,
  computed,
  concatMap,
  encapsulateResourceError,
  filter,
  finalize,
  formatRuntimeError,
  init_core,
  init_esm,
  init_operators,
  inject,
  linkedSignal,
  makeEnvironmentProviders,
  makeStateKey,
  map,
  of,
  runInInjectionContext,
  setClassMetadata,
  signal,
  switchMap,
  truncateMiddle,
  untracked,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefineService,
  ɵɵinject
} from "./chunk-KCAFHNMN.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-LRKDA6DW.js";

// node_modules/@angular/common/fesm2022/_module-chunk.mjs
init_core();
init_core();
init_operators();
init_esm();
/**
 * @license Angular v22.1.7
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var HttpHeaders = class _HttpHeaders {
  headers;
  normalizedNames = /* @__PURE__ */ new Map();
  lazyInit;
  lazyUpdate = null;
  constructor(headers) {
    if (!headers) {
      this.headers = /* @__PURE__ */ new Map();
    } else if (typeof headers === "string") {
      this.lazyInit = () => {
        this.headers = /* @__PURE__ */ new Map();
        headers.split("\n").forEach((line) => {
          const index = line.indexOf(":");
          if (index > 0) {
            const name = line.slice(0, index);
            const value = line.slice(index + 1).trim();
            this.addHeaderEntry(name, value);
          }
        });
      };
    } else if (typeof Headers !== "undefined" && headers instanceof Headers) {
      this.headers = /* @__PURE__ */ new Map();
      headers.forEach((value, name) => {
        this.addHeaderEntry(name, value);
      });
    } else {
      this.lazyInit = () => {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          assertValidHeaders(headers);
        }
        this.headers = /* @__PURE__ */ new Map();
        Object.entries(headers).forEach(([name, values]) => {
          this.setHeaderEntries(name, values);
        });
      };
    }
  }
  has(name) {
    this.init();
    return this.headers.has(name.toLowerCase());
  }
  get(name) {
    this.init();
    const values = this.headers.get(name.toLowerCase());
    return values && values.length > 0 ? values[0] : null;
  }
  keys() {
    this.init();
    return Array.from(this.normalizedNames.values());
  }
  getAll(name) {
    this.init();
    return this.headers.get(name.toLowerCase()) || null;
  }
  append(name, value) {
    return this.clone({
      name,
      value,
      op: "a"
    });
  }
  set(name, value) {
    return this.clone({
      name,
      value,
      op: "s"
    });
  }
  delete(name, value) {
    return this.clone({
      name,
      value,
      op: "d"
    });
  }
  maybeSetNormalizedName(name, lcName) {
    if (!this.normalizedNames.has(lcName)) {
      this.normalizedNames.set(lcName, name);
    }
  }
  init() {
    if (!!this.lazyInit) {
      if (this.lazyInit instanceof _HttpHeaders) {
        this.copyFrom(this.lazyInit);
      } else {
        this.lazyInit();
      }
      this.lazyInit = null;
      if (!!this.lazyUpdate) {
        this.lazyUpdate.forEach((update) => this.applyUpdate(update));
        this.lazyUpdate = null;
      }
    }
  }
  copyFrom(other) {
    other.init();
    for (const [key, values] of other.headers.entries()) {
      this.headers.set(key, values);
      this.normalizedNames.set(key, other.normalizedNames.get(key));
    }
  }
  clone(update) {
    const clone = new _HttpHeaders();
    clone.lazyInit = !!this.lazyInit && this.lazyInit instanceof _HttpHeaders ? this.lazyInit : this;
    clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
    return clone;
  }
  applyUpdate(update) {
    const key = update.name.toLowerCase();
    switch (update.op) {
      case "a":
      case "s":
        let value = update.value;
        if (typeof value === "string") {
          value = [value];
        }
        if (value.length === 0) {
          return;
        }
        this.maybeSetNormalizedName(update.name, key);
        const base = update.op === "a" ? (this.headers.get(key) || []).slice() : [];
        base.push(...value);
        this.headers.set(key, base);
        break;
      case "d":
        const toDelete = update.value;
        if (toDelete === void 0) {
          this.headers.delete(key);
          this.normalizedNames.delete(key);
        } else {
          const valuesToDelete = Array.isArray(toDelete) ? toDelete : [toDelete];
          let existing = this.headers.get(key);
          if (!existing) {
            return;
          }
          existing = existing.filter((value2) => valuesToDelete.indexOf(value2) === -1);
          if (existing.length === 0) {
            this.headers.delete(key);
            this.normalizedNames.delete(key);
          } else {
            this.headers.set(key, existing);
          }
        }
        break;
    }
  }
  addHeaderEntry(name, value) {
    const key = name.toLowerCase();
    this.maybeSetNormalizedName(name, key);
    if (this.headers.has(key)) {
      this.headers.get(key).push(value);
    } else {
      this.headers.set(key, [value]);
    }
  }
  setHeaderEntries(name, values) {
    const headerValues = (Array.isArray(values) ? values : [values]).map((value) => value.toString());
    const key = name.toLowerCase();
    this.headers.set(key, headerValues);
    this.maybeSetNormalizedName(name, key);
  }
  forEach(fn) {
    this.init();
    Array.from(this.normalizedNames.keys()).forEach((key) => fn(this.normalizedNames.get(key), this.headers.get(key)));
  }
};
function assertValidHeaders(headers) {
  for (const [key, value] of Object.entries(headers)) {
    if (!(typeof value === "string" || typeof value === "number") && !Array.isArray(value)) {
      throw new Error(`Unexpected value of the \`${key}\` header provided. Expecting either a string, a number or an array, but got: \`${value}\`.`);
    }
  }
}
var HttpContext = class {
  map = /* @__PURE__ */ new Map();
  set(token, value) {
    this.map.set(token, value);
    return this;
  }
  get(token) {
    if (!this.map.has(token)) {
      this.map.set(token, token.defaultValue());
    }
    return this.map.get(token);
  }
  delete(token) {
    this.map.delete(token);
    return this;
  }
  has(token) {
    return this.map.has(token);
  }
  keys() {
    return this.map.keys();
  }
};
var HttpUrlEncodingCodec = class {
  encodeKey(key) {
    return standardEncoding(key);
  }
  encodeValue(value) {
    return standardEncoding(value);
  }
  decodeKey(key) {
    return decodeURIComponent(key);
  }
  decodeValue(value) {
    return decodeURIComponent(value);
  }
};
function paramParser(rawParams, codec) {
  const map2 = /* @__PURE__ */ new Map();
  if (rawParams.length > 0) {
    const params = rawParams.replace(/^\?/, "").split("&");
    params.forEach((param) => {
      const eqIdx = param.indexOf("=");
      const [key, val] = eqIdx == -1 ? [codec.decodeKey(param), ""] : [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))];
      const list = map2.get(key) || [];
      list.push(val);
      map2.set(key, list);
    });
  }
  return map2;
}
var STANDARD_ENCODING_REGEX = /%(\d[a-f0-9])/gi;
var STANDARD_ENCODING_REPLACEMENTS = {
  "40": "@",
  "3A": ":",
  "24": "$",
  "2C": ",",
  "3B": ";",
  "3D": "=",
  "3F": "?",
  "2F": "/"
};
function standardEncoding(v) {
  return encodeURIComponent(v).replace(STANDARD_ENCODING_REGEX, (s, t) => STANDARD_ENCODING_REPLACEMENTS[t] ?? s);
}
function valueToString(value) {
  return `${value}`;
}
var HttpParams = class _HttpParams {
  map;
  encoder;
  updates = null;
  cloneFrom = null;
  constructor(options = {}) {
    this.encoder = options.encoder || new HttpUrlEncodingCodec();
    if (options.fromString) {
      if (options.fromObject) {
        throw new RuntimeError(2805, ngDevMode && "Cannot specify both fromString and fromObject.");
      }
      this.map = paramParser(options.fromString, this.encoder);
    } else if (!!options.fromObject) {
      this.map = /* @__PURE__ */ new Map();
      Object.keys(options.fromObject).forEach((key) => {
        const value = options.fromObject[key];
        const values = Array.isArray(value) ? value.map(valueToString) : [valueToString(value)];
        this.map.set(key, values);
      });
    } else {
      this.map = null;
    }
  }
  has(param) {
    this.init();
    return this.map.has(param);
  }
  get(param) {
    this.init();
    const res = this.map.get(param);
    return !!res ? res[0] : null;
  }
  getAll(param) {
    this.init();
    return this.map.get(param) || null;
  }
  keys() {
    this.init();
    return Array.from(this.map.keys());
  }
  append(param, value) {
    return this.clone({
      param,
      value,
      op: "a"
    });
  }
  appendAll(params) {
    const updates = [];
    Object.keys(params).forEach((param) => {
      const value = params[param];
      if (Array.isArray(value)) {
        value.forEach((_value) => {
          updates.push({
            param,
            value: _value,
            op: "a"
          });
        });
      } else {
        updates.push({
          param,
          value,
          op: "a"
        });
      }
    });
    return this.clone(updates);
  }
  set(param, value) {
    return this.clone({
      param,
      value,
      op: "s"
    });
  }
  delete(param, value) {
    return this.clone({
      param,
      value,
      op: "d"
    });
  }
  toString() {
    this.init();
    return this.keys().map((key) => {
      const eKey = this.encoder.encodeKey(key);
      return this.map.get(key).map((value) => eKey + "=" + this.encoder.encodeValue(value)).join("&");
    }).filter((param) => param !== "").join("&");
  }
  clone(update) {
    const clone = new _HttpParams({
      encoder: this.encoder
    });
    clone.cloneFrom = this.cloneFrom || this;
    clone.updates = (this.updates || []).concat(update);
    return clone;
  }
  init() {
    if (this.map === null) {
      this.map = /* @__PURE__ */ new Map();
    }
    if (this.cloneFrom !== null) {
      this.cloneFrom.init();
      for (const [key, values] of this.cloneFrom.map.entries()) {
        this.map.set(key, values);
      }
      this.updates.forEach((update) => {
        switch (update.op) {
          case "a":
          case "s":
            const base = update.op === "a" ? (this.map.get(update.param) || []).slice() : [];
            base.push(valueToString(update.value));
            this.map.set(update.param, base);
            break;
          case "d":
            if (update.value !== void 0) {
              const base2 = (this.map.get(update.param) || []).slice();
              const idx = base2.indexOf(valueToString(update.value));
              if (idx !== -1) {
                base2.splice(idx, 1);
              }
              if (base2.length > 0) {
                this.map.set(update.param, base2);
              } else {
                this.map.delete(update.param);
              }
            } else {
              this.map.delete(update.param);
              break;
            }
        }
      });
      this.cloneFrom = this.updates = null;
    }
  }
};
function mightHaveBody(method) {
  switch (method) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return false;
    default:
      return true;
  }
}
function isArrayBuffer(value) {
  return typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer;
}
function isBlob(value) {
  return typeof Blob !== "undefined" && value instanceof Blob;
}
function isFormData(value) {
  return typeof FormData !== "undefined" && value instanceof FormData;
}
function isUrlSearchParams(value) {
  return typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams;
}
var CONTENT_TYPE_HEADER = "Content-Type";
var ACCEPT_HEADER = "Accept";
var TEXT_CONTENT_TYPE = "text/plain";
var JSON_CONTENT_TYPE = "application/json";
var ACCEPT_HEADER_VALUE = `${JSON_CONTENT_TYPE}, ${TEXT_CONTENT_TYPE}, */*`;
var HttpRequest = class _HttpRequest {
  url;
  body = null;
  headers;
  context;
  reportProgress = false;
  reportUploadProgress = false;
  reportDownloadProgress = false;
  withCredentials = false;
  credentials;
  keepalive = false;
  cache;
  priority;
  mode;
  redirect;
  referrer;
  integrity;
  referrerPolicy;
  responseType = "json";
  method;
  params;
  urlWithParams;
  transferCache;
  timeout;
  constructor(method, url, third, fourth) {
    this.url = url;
    this.method = method.toUpperCase();
    let options;
    if (mightHaveBody(this.method) || !!fourth) {
      this.body = third !== void 0 ? third : null;
      options = fourth;
    } else {
      options = third;
    }
    if (options) {
      this.reportProgress = !!options.reportProgress;
      this.reportUploadProgress = !!options.reportUploadProgress;
      this.reportDownloadProgress = !!options.reportDownloadProgress;
      this.withCredentials = !!options.withCredentials;
      this.keepalive = !!options.keepalive;
      if (!!options.responseType) {
        this.responseType = options.responseType;
      }
      if (options.headers) {
        this.headers = options.headers;
      }
      if (options.context) {
        this.context = options.context;
      }
      if (options.params) {
        this.params = options.params;
      }
      if (options.priority) {
        this.priority = options.priority;
      }
      if (options.cache) {
        this.cache = options.cache;
      }
      if (options.credentials) {
        this.credentials = options.credentials;
      }
      if (typeof options.timeout === "number") {
        if (options.timeout < 1 || !Number.isInteger(options.timeout)) {
          throw new RuntimeError(2822, ngDevMode ? "`timeout` must be a positive integer value" : "");
        }
        this.timeout = options.timeout;
      }
      if (options.mode) {
        this.mode = options.mode;
      }
      if (options.redirect) {
        this.redirect = options.redirect;
      }
      if (options.integrity) {
        this.integrity = options.integrity;
      }
      if (options.referrer !== void 0) {
        this.referrer = options.referrer;
      }
      if (options.referrerPolicy) {
        this.referrerPolicy = options.referrerPolicy;
      }
      this.transferCache = options.transferCache;
    }
    this.headers ??= new HttpHeaders();
    this.context ??= new HttpContext();
    if (!this.params) {
      this.params = new HttpParams();
      this.urlWithParams = url;
    } else {
      const params = this.params.toString();
      if (params.length === 0) {
        this.urlWithParams = url;
      } else {
        let urlWithoutFragment = url;
        let fragment = "";
        const hashIdx = url.indexOf("#");
        if (hashIdx !== -1) {
          fragment = url.substring(hashIdx);
          urlWithoutFragment = url.substring(0, hashIdx);
        }
        const qIdx = urlWithoutFragment.indexOf("?");
        const sep = qIdx === -1 ? "?" : qIdx < urlWithoutFragment.length - 1 ? "&" : "";
        this.urlWithParams = urlWithoutFragment + sep + params + fragment;
      }
    }
  }
  serializeBody() {
    if (this.body === null) {
      return null;
    }
    if (typeof this.body === "string" || isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) || isUrlSearchParams(this.body)) {
      return this.body;
    }
    if (this.body instanceof HttpParams) {
      return this.body.toString();
    }
    if (typeof this.body === "object" || typeof this.body === "boolean" || Array.isArray(this.body)) {
      return JSON.stringify(this.body);
    }
    return this.body.toString();
  }
  detectContentTypeHeader() {
    if (this.body === null) {
      return null;
    }
    if (isFormData(this.body)) {
      return null;
    }
    if (isBlob(this.body)) {
      return this.body.type || null;
    }
    if (isArrayBuffer(this.body)) {
      return null;
    }
    if (typeof this.body === "string") {
      return TEXT_CONTENT_TYPE;
    }
    if (this.body instanceof HttpParams) {
      return "application/x-www-form-urlencoded;charset=UTF-8";
    }
    if (typeof this.body === "object" || typeof this.body === "number" || typeof this.body === "boolean") {
      return JSON_CONTENT_TYPE;
    }
    return null;
  }
  clone(update = {}) {
    const method = update.method || this.method;
    const url = update.url || this.url;
    const responseType = update.responseType || this.responseType;
    const keepalive = update.keepalive ?? this.keepalive;
    const priority = update.priority || this.priority;
    const cache = update.cache || this.cache;
    const mode = update.mode || this.mode;
    const redirect = update.redirect || this.redirect;
    const credentials = update.credentials || this.credentials;
    const referrer = update.referrer ?? this.referrer;
    const integrity = update.integrity || this.integrity;
    const referrerPolicy = update.referrerPolicy || this.referrerPolicy;
    const transferCache = update.transferCache ?? this.transferCache;
    const timeout = update.timeout ?? this.timeout;
    const body = update.body !== void 0 ? update.body : this.body;
    const withCredentials = update.withCredentials ?? this.withCredentials;
    const reportProgress = update.reportProgress ?? this.reportProgress;
    const reportUploadProgress = update.reportUploadProgress ?? this.reportUploadProgress;
    const reportDownloadProgress = update.reportDownloadProgress ?? this.reportDownloadProgress;
    let headers = update.headers || this.headers;
    let params = update.params || this.params;
    const context = update.context ?? this.context;
    if (update.setHeaders !== void 0) {
      headers = Object.keys(update.setHeaders).reduce((headers2, name) => headers2.set(name, update.setHeaders[name]), headers);
    }
    if (update.setParams) {
      params = Object.keys(update.setParams).reduce((params2, param) => params2.set(param, update.setParams[param]), params);
    }
    return new _HttpRequest(method, url, body, {
      params,
      headers,
      context,
      reportProgress,
      reportUploadProgress,
      reportDownloadProgress,
      responseType,
      withCredentials,
      transferCache,
      keepalive,
      cache,
      priority,
      timeout,
      mode,
      redirect,
      credentials,
      referrer,
      integrity,
      referrerPolicy
    });
  }
};
var HttpEventType;
(function(HttpEventType2) {
  HttpEventType2[HttpEventType2["Sent"] = 0] = "Sent";
  HttpEventType2[HttpEventType2["UploadProgress"] = 1] = "UploadProgress";
  HttpEventType2[HttpEventType2["ResponseHeader"] = 2] = "ResponseHeader";
  HttpEventType2[HttpEventType2["DownloadProgress"] = 3] = "DownloadProgress";
  HttpEventType2[HttpEventType2["Response"] = 4] = "Response";
  HttpEventType2[HttpEventType2["User"] = 5] = "User";
})(HttpEventType || (HttpEventType = {}));
var HttpResponseBase = class {
  headers;
  status;
  statusText;
  url;
  ok;
  type;
  redirected;
  responseType;
  constructor(init, defaultStatus = 200, defaultStatusText = "OK") {
    this.headers = init.headers || new HttpHeaders();
    this.status = init.status !== void 0 ? init.status : defaultStatus;
    this.statusText = init.statusText || defaultStatusText;
    this.url = init.url || null;
    this.redirected = init.redirected;
    this.responseType = init.responseType;
    this.ok = this.status >= 200 && this.status < 300;
  }
};
var HttpHeaderResponse = class _HttpHeaderResponse extends HttpResponseBase {
  constructor(init = {}) {
    super(init);
  }
  type = HttpEventType.ResponseHeader;
  clone(update = {}) {
    return new _HttpHeaderResponse({
      headers: update.headers || this.headers,
      status: update.status !== void 0 ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || void 0
    });
  }
};
var HttpResponse = class _HttpResponse extends HttpResponseBase {
  body;
  constructor(init = {}) {
    super(init);
    this.body = init.body !== void 0 ? init.body : null;
  }
  type = HttpEventType.Response;
  clone(update = {}) {
    return new _HttpResponse({
      body: update.body !== void 0 ? update.body : this.body,
      headers: update.headers || this.headers,
      status: update.status !== void 0 ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || void 0,
      redirected: update.redirected ?? this.redirected,
      responseType: update.responseType ?? this.responseType
    });
  }
};
var HttpErrorResponse = class extends HttpResponseBase {
  name = "HttpErrorResponse";
  message;
  error;
  ok = false;
  constructor(init) {
    super(init, 0, "Unknown Error");
    if (this.status >= 200 && this.status < 300) {
      this.message = `Http failure during parsing for ${init.url || "(unknown url)"}`;
    } else {
      this.message = `Http failure response for ${init.url || "(unknown url)"}: ${init.status} ${init.statusText}`;
    }
    this.error = init.error || null;
  }
};
var HTTP_STATUS_CODE_OK = 200;
var HTTP_STATUS_CODE_NO_CONTENT = 204;
var HttpStatusCode;
(function(HttpStatusCode2) {
  HttpStatusCode2[HttpStatusCode2["Continue"] = 100] = "Continue";
  HttpStatusCode2[HttpStatusCode2["SwitchingProtocols"] = 101] = "SwitchingProtocols";
  HttpStatusCode2[HttpStatusCode2["Processing"] = 102] = "Processing";
  HttpStatusCode2[HttpStatusCode2["EarlyHints"] = 103] = "EarlyHints";
  HttpStatusCode2[HttpStatusCode2["Ok"] = 200] = "Ok";
  HttpStatusCode2[HttpStatusCode2["Created"] = 201] = "Created";
  HttpStatusCode2[HttpStatusCode2["Accepted"] = 202] = "Accepted";
  HttpStatusCode2[HttpStatusCode2["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
  HttpStatusCode2[HttpStatusCode2["NoContent"] = 204] = "NoContent";
  HttpStatusCode2[HttpStatusCode2["ResetContent"] = 205] = "ResetContent";
  HttpStatusCode2[HttpStatusCode2["PartialContent"] = 206] = "PartialContent";
  HttpStatusCode2[HttpStatusCode2["MultiStatus"] = 207] = "MultiStatus";
  HttpStatusCode2[HttpStatusCode2["AlreadyReported"] = 208] = "AlreadyReported";
  HttpStatusCode2[HttpStatusCode2["ImUsed"] = 226] = "ImUsed";
  HttpStatusCode2[HttpStatusCode2["MultipleChoices"] = 300] = "MultipleChoices";
  HttpStatusCode2[HttpStatusCode2["MovedPermanently"] = 301] = "MovedPermanently";
  HttpStatusCode2[HttpStatusCode2["Found"] = 302] = "Found";
  HttpStatusCode2[HttpStatusCode2["SeeOther"] = 303] = "SeeOther";
  HttpStatusCode2[HttpStatusCode2["NotModified"] = 304] = "NotModified";
  HttpStatusCode2[HttpStatusCode2["UseProxy"] = 305] = "UseProxy";
  HttpStatusCode2[HttpStatusCode2["Unused"] = 306] = "Unused";
  HttpStatusCode2[HttpStatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
  HttpStatusCode2[HttpStatusCode2["PermanentRedirect"] = 308] = "PermanentRedirect";
  HttpStatusCode2[HttpStatusCode2["BadRequest"] = 400] = "BadRequest";
  HttpStatusCode2[HttpStatusCode2["Unauthorized"] = 401] = "Unauthorized";
  HttpStatusCode2[HttpStatusCode2["PaymentRequired"] = 402] = "PaymentRequired";
  HttpStatusCode2[HttpStatusCode2["Forbidden"] = 403] = "Forbidden";
  HttpStatusCode2[HttpStatusCode2["NotFound"] = 404] = "NotFound";
  HttpStatusCode2[HttpStatusCode2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
  HttpStatusCode2[HttpStatusCode2["NotAcceptable"] = 406] = "NotAcceptable";
  HttpStatusCode2[HttpStatusCode2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
  HttpStatusCode2[HttpStatusCode2["RequestTimeout"] = 408] = "RequestTimeout";
  HttpStatusCode2[HttpStatusCode2["Conflict"] = 409] = "Conflict";
  HttpStatusCode2[HttpStatusCode2["Gone"] = 410] = "Gone";
  HttpStatusCode2[HttpStatusCode2["LengthRequired"] = 411] = "LengthRequired";
  HttpStatusCode2[HttpStatusCode2["PreconditionFailed"] = 412] = "PreconditionFailed";
  HttpStatusCode2[HttpStatusCode2["PayloadTooLarge"] = 413] = "PayloadTooLarge";
  HttpStatusCode2[HttpStatusCode2["UriTooLong"] = 414] = "UriTooLong";
  HttpStatusCode2[HttpStatusCode2["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
  HttpStatusCode2[HttpStatusCode2["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
  HttpStatusCode2[HttpStatusCode2["ExpectationFailed"] = 417] = "ExpectationFailed";
  HttpStatusCode2[HttpStatusCode2["ImATeapot"] = 418] = "ImATeapot";
  HttpStatusCode2[HttpStatusCode2["MisdirectedRequest"] = 421] = "MisdirectedRequest";
  HttpStatusCode2[HttpStatusCode2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
  HttpStatusCode2[HttpStatusCode2["Locked"] = 423] = "Locked";
  HttpStatusCode2[HttpStatusCode2["FailedDependency"] = 424] = "FailedDependency";
  HttpStatusCode2[HttpStatusCode2["TooEarly"] = 425] = "TooEarly";
  HttpStatusCode2[HttpStatusCode2["UpgradeRequired"] = 426] = "UpgradeRequired";
  HttpStatusCode2[HttpStatusCode2["PreconditionRequired"] = 428] = "PreconditionRequired";
  HttpStatusCode2[HttpStatusCode2["TooManyRequests"] = 429] = "TooManyRequests";
  HttpStatusCode2[HttpStatusCode2["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
  HttpStatusCode2[HttpStatusCode2["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
  HttpStatusCode2[HttpStatusCode2["InternalServerError"] = 500] = "InternalServerError";
  HttpStatusCode2[HttpStatusCode2["NotImplemented"] = 501] = "NotImplemented";
  HttpStatusCode2[HttpStatusCode2["BadGateway"] = 502] = "BadGateway";
  HttpStatusCode2[HttpStatusCode2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
  HttpStatusCode2[HttpStatusCode2["GatewayTimeout"] = 504] = "GatewayTimeout";
  HttpStatusCode2[HttpStatusCode2["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
  HttpStatusCode2[HttpStatusCode2["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
  HttpStatusCode2[HttpStatusCode2["InsufficientStorage"] = 507] = "InsufficientStorage";
  HttpStatusCode2[HttpStatusCode2["LoopDetected"] = 508] = "LoopDetected";
  HttpStatusCode2[HttpStatusCode2["NotExtended"] = 510] = "NotExtended";
  HttpStatusCode2[HttpStatusCode2["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(HttpStatusCode || (HttpStatusCode = {}));
var XSSI_PREFIX$1 = /^\)\]\}',?\n/;
var DEFAULT_SSR_MAX_RESPONSE_BODY_SIZE = 1024 * 1024;
var HTTP_FETCH_MAX_RESPONSE_SIZE = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_FETCH_MAX_RESPONSE_SIZE" : "", {
  factory: () => false ? DEFAULT_SSR_MAX_RESPONSE_BODY_SIZE : null
});
var FetchBackend = class _FetchBackend {
  fetchImpl = inject(FetchFactory, {
    optional: true
  })?.fetch ?? ((...args) => globalThis.fetch(...args));
  ngZone = inject(NgZone);
  destroyRef = inject(DestroyRef);
  maxResponseSize = inject(HTTP_FETCH_MAX_RESPONSE_SIZE);
  handle(request) {
    return new Observable((observer) => {
      const aborter = new AbortController();
      let done = false;
      const wrappedObserver = {
        next: (val) => {
          if (val.type === HttpEventType.Response) {
            done = true;
          }
          observer.next(val);
        },
        error: (err) => {
          done = true;
          observer.error(err);
        },
        complete: () => {
          done = true;
          observer.complete();
        }
      };
      this.doRequest(request, aborter.signal, wrappedObserver).then(noop, (error) => wrappedObserver.error(new HttpErrorResponse({
        error
      })));
      let timeoutId;
      if (request.timeout) {
        timeoutId = this.ngZone.runOutsideAngular(() => setTimeout(() => {
          if (!aborter.signal.aborted) {
            aborter.abort(new DOMException("signal timed out", "TimeoutError"));
          }
        }, request.timeout));
      }
      return () => {
        if (timeoutId !== void 0) {
          clearTimeout(timeoutId);
        }
        if (!done && !aborter.signal.aborted) {
          aborter.abort();
        }
      };
    });
  }
  doRequest(request, signal2, observer) {
    return __async(this, null, function* () {
      const init = this.createRequestInit(request);
      let response;
      try {
        const fetchPromise = this.ngZone.runOutsideAngular(() => this.fetchImpl(request.urlWithParams, __spreadValues({
          signal: signal2
        }, init)));
        silenceSuperfluousUnhandledPromiseRejection(fetchPromise);
        observer.next({
          type: HttpEventType.Sent
        });
        response = yield fetchPromise;
      } catch (error) {
        observer.error(new HttpErrorResponse({
          error,
          status: error.status ?? 0,
          statusText: error.statusText,
          url: request.urlWithParams,
          headers: error.headers
        }));
        return;
      }
      const headers = new HttpHeaders(response.headers);
      const statusText = response.statusText;
      const url = response.url || request.urlWithParams;
      let status = response.status;
      let body = null;
      const reportDownloadProgress = request.reportProgress || request.reportDownloadProgress;
      if (reportDownloadProgress) {
        observer.next(new HttpHeaderResponse({
          headers,
          status,
          statusText,
          url
        }));
      }
      if (response.body) {
        const contentType = response.headers.get(CONTENT_TYPE_HEADER) ?? "";
        const contentLength = response.headers.get("content-length");
        const contentLengthValue = contentLength !== null ? Number(contentLength) : NaN;
        if (this.maxResponseSize !== null && Number.isFinite(contentLengthValue) && contentLengthValue > this.maxResponseSize) {
          yield response.body.cancel();
          throwBodyTooLargeError(this.maxResponseSize);
        }
        const chunks = [];
        const reader = response.body.getReader();
        let receivedLength = 0;
        let decoder;
        let partialText;
        const reqZone = typeof Zone !== "undefined" && Zone.current;
        let canceled = false;
        yield this.ngZone.runOutsideAngular(() => __async(this, null, function* () {
          while (true) {
            if (this.destroyRef.destroyed) {
              yield reader.cancel();
              canceled = true;
              break;
            }
            const {
              done,
              value
            } = yield reader.read();
            if (done) {
              break;
            }
            chunks.push(value);
            receivedLength += value.length;
            if (this.maxResponseSize !== null && receivedLength > this.maxResponseSize) {
              yield reader.cancel();
              throwBodyTooLargeError(this.maxResponseSize);
            }
            if (reportDownloadProgress) {
              partialText = request.responseType === "text" ? (partialText ?? "") + (decoder ??= getTextDecoder(contentType)).decode(value, {
                stream: true
              }) : void 0;
              const reportProgress = () => observer.next({
                type: HttpEventType.DownloadProgress,
                total: Number.isFinite(contentLengthValue) ? contentLengthValue : void 0,
                loaded: receivedLength,
                partialText
              });
              reqZone ? reqZone.run(reportProgress) : reportProgress();
            }
          }
        }));
        if (canceled) {
          observer.complete();
          return;
        }
        const chunksAll = this.concatChunks(chunks, receivedLength);
        try {
          body = this.parseBody(request, chunksAll, contentType, status);
        } catch (error) {
          observer.error(new HttpErrorResponse({
            error,
            headers: new HttpHeaders(response.headers),
            status: response.status,
            statusText: response.statusText,
            url: response.url || request.urlWithParams
          }));
          return;
        }
      }
      if (status === 0) {
        status = body ? HTTP_STATUS_CODE_OK : 0;
      }
      const ok = status >= 200 && status < 300;
      const redirected = response.redirected;
      const responseType = response.type;
      if (ok) {
        observer.next(new HttpResponse({
          body,
          headers,
          status,
          statusText,
          url,
          redirected,
          responseType
        }));
        observer.complete();
      } else {
        observer.error(new HttpErrorResponse({
          error: body,
          headers,
          status,
          statusText,
          url,
          redirected,
          responseType
        }));
      }
    });
  }
  parseBody(request, binContent, contentType, status) {
    switch (request.responseType) {
      case "json":
        const text = new TextDecoder().decode(binContent).replace(XSSI_PREFIX$1, "");
        if (text === "") {
          return null;
        }
        try {
          return JSON.parse(text);
        } catch (e) {
          if (status < 200 || status >= 300) {
            return text;
          }
          throw e;
        }
      case "text":
        return getTextDecoder(contentType).decode(binContent);
      case "blob":
        return new Blob([binContent], {
          type: contentType
        });
      case "arraybuffer":
        return binContent.buffer;
    }
  }
  createRequestInit(req) {
    if (req.reportUploadProgress) {
      throw new RuntimeError(2824, ngDevMode && "The FetchBackend does not support upload progress reporting. Please use `withXhr()` on your `provideHttpClient()` configuration if you want to report upload progress.");
    }
    const headers = {};
    let credentials;
    credentials = req.credentials;
    if (req.withCredentials) {
      (typeof ngDevMode === "undefined" || ngDevMode) && warningOptionsMessage(req);
      credentials = "include";
    }
    req.headers.forEach((name, values) => headers[name] = values.join(","));
    if (!req.headers.has(ACCEPT_HEADER)) {
      headers[ACCEPT_HEADER] = ACCEPT_HEADER_VALUE;
    }
    if (!req.headers.has(CONTENT_TYPE_HEADER)) {
      const detectedType = req.detectContentTypeHeader();
      if (detectedType !== null) {
        headers[CONTENT_TYPE_HEADER] = detectedType;
      }
    }
    return {
      body: req.serializeBody(),
      method: req.method,
      headers,
      credentials,
      keepalive: req.keepalive,
      cache: req.cache,
      priority: req.priority,
      mode: req.mode,
      redirect: req.redirect,
      referrer: req.referrer,
      integrity: req.integrity,
      referrerPolicy: req.referrerPolicy
    };
  }
  concatChunks(chunks, totalLength) {
    const chunksAll = new Uint8Array(totalLength);
    let position = 0;
    for (const chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }
    return chunksAll;
  }
  static \u0275fac = function FetchBackend_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FetchBackend)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _FetchBackend,
    factory: _FetchBackend.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FetchBackend, [{
    type: Service
  }], null, null);
})();
var FetchFactory = class {
};
function noop() {
}
function warningOptionsMessage(req) {
  if (req.credentials && req.withCredentials) {
    console.warn(formatRuntimeError(2819, `Angular detected that a \`HttpClient\` request has both \`withCredentials: true\` and \`credentials: '${req.credentials}'\` options. The \`withCredentials\` option is overriding the explicit \`credentials\` setting to 'include'. Consider removing \`withCredentials\` and using \`credentials: '${req.credentials}'\` directly for clarity.`));
  }
}
function silenceSuperfluousUnhandledPromiseRejection(promise) {
  promise.then(noop, noop);
}
function throwBodyTooLargeError(maxResponseSize) {
  throw new RuntimeError(-2825, ngDevMode && `Fetch response body exceeded the configured buffer limit (${maxResponseSize} bytes).`);
}
var CHARSET_REGEX = /charset=\s*["']?([^;"'\s]+)["']?/i;
function getTextDecoder(contentType) {
  const match = contentType.match(CHARSET_REGEX);
  if (match !== null) {
    try {
      return new TextDecoder(match[1]);
    } catch (e) {
    }
  }
  return new TextDecoder();
}
var XSRF_ENABLED = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "XSRF_ENABLED" : "", {
  factory: () => true
});
var XSRF_DEFAULT_COOKIE_NAME = "XSRF-TOKEN";
var XSRF_COOKIE_NAME = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "XSRF_COOKIE_NAME" : "", {
  factory: () => XSRF_DEFAULT_COOKIE_NAME
});
var XSRF_DEFAULT_HEADER_NAME = "X-XSRF-TOKEN";
var XSRF_HEADER_NAME = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "XSRF_HEADER_NAME" : "", {
  factory: () => XSRF_DEFAULT_HEADER_NAME
});
var HttpXsrfCookieExtractor = class _HttpXsrfCookieExtractor {
  cookieName = inject(XSRF_COOKIE_NAME);
  doc = inject(DOCUMENT);
  lastCookieString = "";
  lastToken = null;
  parseCount = 0;
  getToken() {
    if (false) {
      return null;
    }
    const cookieString = this.doc.cookie || "";
    if (cookieString !== this.lastCookieString) {
      this.parseCount++;
      this.lastToken = parseCookieValue(cookieString, this.cookieName);
      this.lastCookieString = cookieString;
    }
    return this.lastToken;
  }
  static \u0275fac = function HttpXsrfCookieExtractor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpXsrfCookieExtractor)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _HttpXsrfCookieExtractor,
    factory: _HttpXsrfCookieExtractor.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpXsrfCookieExtractor, [{
    type: Service
  }], null, null);
})();
var HttpXsrfTokenExtractor = class _HttpXsrfTokenExtractor {
  static \u0275fac = function HttpXsrfTokenExtractor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpXsrfTokenExtractor)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpXsrfTokenExtractor,
    factory: function HttpXsrfTokenExtractor_Factory(__ngFactoryType__) {
      let __ngConditionalFactory__ = null;
      if (__ngFactoryType__) {
        __ngConditionalFactory__ = new (__ngFactoryType__ || _HttpXsrfTokenExtractor)();
      } else {
        __ngConditionalFactory__ = \u0275\u0275inject(HttpXsrfCookieExtractor);
      }
      return __ngConditionalFactory__;
    },
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpXsrfTokenExtractor, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useExisting: HttpXsrfCookieExtractor
    }]
  }], null, null);
})();
function xsrfInterceptorFn(req, next) {
  if (!inject(XSRF_ENABLED) || req.method === "GET" || req.method === "HEAD") {
    return next(req);
  }
  try {
    const locationHref = inject(PlatformLocation).href;
    const {
      origin: locationOrigin
    } = new URL(locationHref);
    const {
      origin: requestOrigin
    } = new URL(req.url, locationOrigin);
    if (locationOrigin !== requestOrigin) {
      return next(req);
    }
  } catch (e) {
    return next(req);
  }
  const token = inject(HttpXsrfTokenExtractor).getToken();
  const headerName = inject(XSRF_HEADER_NAME);
  if (token != null && !req.headers.has(headerName)) {
    req = req.clone({
      headers: req.headers.set(headerName, token)
    });
  }
  return next(req);
}
var HttpXsrfInterceptor = class _HttpXsrfInterceptor {
  injector = inject(EnvironmentInjector);
  intercept(initialRequest, next) {
    return runInInjectionContext(this.injector, () => xsrfInterceptorFn(initialRequest, (downstreamRequest) => next.handle(downstreamRequest)));
  }
  static \u0275fac = function HttpXsrfInterceptor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpXsrfInterceptor)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpXsrfInterceptor,
    factory: _HttpXsrfInterceptor.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpXsrfInterceptor, [{
    type: Injectable
  }], null, null);
})();
function interceptorChainEndFn(req, finalHandlerFn) {
  return finalHandlerFn(req);
}
function adaptLegacyInterceptorToChain(chainTailFn, interceptor) {
  return (initialRequest, finalHandlerFn) => interceptor.intercept(initialRequest, {
    handle: (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn)
  });
}
function chainedInterceptorFn(chainTailFn, interceptorFn, injector) {
  return (initialRequest, finalHandlerFn) => runInInjectionContext(injector, () => interceptorFn(initialRequest, (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn)));
}
var HTTP_INTERCEPTORS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_INTERCEPTORS" : "");
var HTTP_INTERCEPTOR_FNS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_INTERCEPTOR_FNS" : "", {
  factory: () => [xsrfInterceptorFn]
});
var HTTP_ROOT_INTERCEPTOR_FNS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_ROOT_INTERCEPTOR_FNS" : "");
var REQUESTS_CONTRIBUTE_TO_STABILITY = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "REQUESTS_CONTRIBUTE_TO_STABILITY" : "", {
  factory: () => true
});
function legacyInterceptorFnFactory() {
  let chain = null;
  return (req, handler) => {
    if (chain === null) {
      const interceptors = inject(HTTP_INTERCEPTORS, {
        optional: true
      }) ?? [];
      chain = interceptors.reduceRight(adaptLegacyInterceptorToChain, interceptorChainEndFn);
    }
    const pendingTasks = inject(PendingTasks);
    const contributeToStability = inject(REQUESTS_CONTRIBUTE_TO_STABILITY);
    if (contributeToStability) {
      const removeTask = pendingTasks.add();
      return chain(req, handler).pipe(finalize(removeTask));
    } else {
      return chain(req, handler);
    }
  };
}
var HttpBackend = class _HttpBackend {
  static \u0275fac = function HttpBackend_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpBackend)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpBackend,
    factory: function HttpBackend_Factory(__ngFactoryType__) {
      let __ngConditionalFactory__ = null;
      if (__ngFactoryType__) {
        __ngConditionalFactory__ = new (__ngFactoryType__ || _HttpBackend)();
      } else {
        __ngConditionalFactory__ = \u0275\u0275inject(FetchBackend);
      }
      return __ngConditionalFactory__;
    },
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpBackend, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useExisting: FetchBackend
    }]
  }], null, null);
})();
var fetchBackendWarningDisplayed = false;
var HttpInterceptorHandler = class _HttpInterceptorHandler {
  backend;
  injector;
  chain = null;
  pendingTasks = inject(PendingTasks);
  contributeToStability = inject(REQUESTS_CONTRIBUTE_TO_STABILITY);
  constructor(backend, injector) {
    this.backend = backend;
    this.injector = injector;
    if ((typeof ngDevMode === "undefined" || ngDevMode) && !fetchBackendWarningDisplayed) {
      const isTestingBackend = this.backend.isTestingBackend;
      if (false) {
        fetchBackendWarningDisplayed = true;
        injector.get(Console).warn(formatRuntimeError(2801, "Angular detected that `HttpClient` is not configured to use `fetch` APIs. It's strongly recommended to enable `fetch` for applications that use Server-Side Rendering for better performance and compatibility. To enable `fetch`, remove the `withXhr()` feature from the `provideHttpClient()` call"));
      }
    }
  }
  handle(initialRequest) {
    if (this.chain === null) {
      const parentHandler = this.injector.get(HttpHandler, null, {
        skipSelf: true
      });
      const isDelegating = parentHandler !== null && this.backend === parentHandler;
      const rootInterceptorFns = this.injector.get(HTTP_ROOT_INTERCEPTOR_FNS, [], isDelegating ? {
        self: true
      } : void 0);
      const dedupedInterceptorFns = Array.from(/* @__PURE__ */ new Set([...this.injector.get(HTTP_INTERCEPTOR_FNS), ...rootInterceptorFns]));
      this.chain = dedupedInterceptorFns.reduceRight((nextSequencedFn, interceptorFn) => chainedInterceptorFn(nextSequencedFn, interceptorFn, this.injector), interceptorChainEndFn);
    }
    const chain = this.chain;
    if (this.contributeToStability) {
      const removeTask = this.pendingTasks.add();
      return untracked(() => chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest))).pipe(finalize(removeTask));
    } else {
      return untracked(() => chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest)));
    }
  }
  static \u0275fac = function HttpInterceptorHandler_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpInterceptorHandler)(\u0275\u0275inject(HttpBackend), \u0275\u0275inject(EnvironmentInjector));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpInterceptorHandler,
    factory: _HttpInterceptorHandler.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpInterceptorHandler, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: HttpBackend
  }, {
    type: EnvironmentInjector
  }], null);
})();
var HttpHandler = class _HttpHandler {
  static \u0275fac = function HttpHandler_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpHandler)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpHandler,
    factory: function HttpHandler_Factory(__ngFactoryType__) {
      let __ngConditionalFactory__ = null;
      if (__ngFactoryType__) {
        __ngConditionalFactory__ = new (__ngFactoryType__ || _HttpHandler)();
      } else {
        __ngConditionalFactory__ = \u0275\u0275inject(HttpInterceptorHandler);
      }
      return __ngConditionalFactory__;
    },
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpHandler, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useExisting: HttpInterceptorHandler
    }]
  }], null, null);
})();
function addBody(options, body) {
  return __spreadValues({
    body
  }, options);
}
var HttpClient = class _HttpClient {
  handler;
  constructor(handler) {
    this.handler = handler;
  }
  request(first, url, options = {}) {
    let req;
    if (first instanceof HttpRequest) {
      req = first;
    } else {
      let headers = void 0;
      if (options.headers instanceof HttpHeaders) {
        headers = options.headers;
      } else {
        headers = new HttpHeaders(options.headers);
      }
      let params = void 0;
      if (!!options.params) {
        if (options.params instanceof HttpParams) {
          params = options.params;
        } else {
          params = new HttpParams({
            fromObject: options.params
          });
        }
      }
      req = new HttpRequest(first, url, options.body !== void 0 ? options.body : null, {
        headers,
        context: options.context,
        params,
        reportProgress: options.reportProgress,
        reportUploadProgress: options.reportUploadProgress,
        reportDownloadProgress: options.reportDownloadProgress,
        responseType: options.responseType || "json",
        withCredentials: options.withCredentials,
        transferCache: options.transferCache,
        keepalive: options.keepalive,
        priority: options.priority,
        cache: options.cache,
        mode: options.mode,
        redirect: options.redirect,
        credentials: options.credentials,
        referrer: options.referrer,
        referrerPolicy: options.referrerPolicy,
        integrity: options.integrity,
        timeout: options.timeout
      });
    }
    const events$ = of(req).pipe(concatMap((req2) => this.handler.handle(req2)));
    if (first instanceof HttpRequest || options.observe === "events") {
      return events$;
    }
    const res$ = events$.pipe(filter((event) => event instanceof HttpResponse));
    switch (options.observe || "body") {
      case "body":
        switch (req.responseType) {
          case "arraybuffer":
            return res$.pipe(map((res) => {
              if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                throw new RuntimeError(2806, ngDevMode && "Response is not an ArrayBuffer.");
              }
              return res.body;
            }));
          case "blob":
            return res$.pipe(map((res) => {
              if (res.body !== null && !(res.body instanceof Blob)) {
                throw new RuntimeError(2807, ngDevMode && "Response is not a Blob.");
              }
              return res.body;
            }));
          case "text":
            return res$.pipe(map((res) => {
              if (res.body !== null && typeof res.body !== "string") {
                throw new RuntimeError(2808, ngDevMode && "Response is not a string.");
              }
              return res.body;
            }));
          case "json":
          default:
            return res$.pipe(map((res) => res.body));
        }
      case "response":
        return res$;
      default:
        throw new RuntimeError(2809, ngDevMode && `Unreachable: unhandled observe type ${options.observe}}`);
    }
  }
  delete(url, options = {}) {
    return this.request("DELETE", url, options);
  }
  get(url, options = {}) {
    return this.request("GET", url, options);
  }
  head(url, options = {}) {
    return this.request("HEAD", url, options);
  }
  jsonp(url, callbackParam) {
    return this.request("JSONP", url, {
      params: new HttpParams().append(callbackParam, "JSONP_CALLBACK"),
      observe: "body",
      responseType: "json"
    });
  }
  options(url, options = {}) {
    return this.request("OPTIONS", url, options);
  }
  patch(url, body, options = {}) {
    return this.request("PATCH", url, addBody(options, body));
  }
  post(url, body, options = {}) {
    return this.request("POST", url, addBody(options, body));
  }
  put(url, body, options = {}) {
    return this.request("PUT", url, addBody(options, body));
  }
  static \u0275fac = function HttpClient_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpClient)(\u0275\u0275inject(HttpHandler));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpClient,
    factory: _HttpClient.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpClient, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: HttpHandler
  }], null);
})();
var nextRequestId = 0;
var foreignDocument;
var JSONP_ERR_NO_CALLBACK = "JSONP injected script did not invoke callback.";
var JSONP_ERR_WRONG_METHOD = "JSONP requests must use JSONP request method.";
var JSONP_ERR_WRONG_RESPONSE_TYPE = "JSONP requests must use Json response type.";
var JSONP_ERR_HEADERS_NOT_SUPPORTED = "JSONP requests do not support headers.";
var JSONP_ERR_UNSAFE_URL = "JSONP requests only support absolute URLs with HTTP(S) protocols.";
var JsonpCallbackContext = class {
};
function jsonpCallbackContext() {
  if (typeof window === "object") {
    return window;
  }
  return {};
}
var JsonpClientBackend = class _JsonpClientBackend {
  callbackMap;
  document;
  resolvedPromise = Promise.resolve();
  nonce = inject(CSP_NONCE, {
    optional: true
  });
  constructor(callbackMap, document) {
    this.callbackMap = callbackMap;
    this.document = document;
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      console.warn("JSONP support is deprecated as it can cause XSS vulnerabilities, and will be removed in a future version of Angular. Please use standard HTTP requests instead.");
    }
  }
  nextCallback() {
    return `ng_jsonp_callback_${nextRequestId++}`;
  }
  handle(req) {
    if (req.method !== "JSONP") {
      throw new RuntimeError(2810, ngDevMode && JSONP_ERR_WRONG_METHOD);
    } else if (req.responseType !== "json") {
      throw new RuntimeError(2811, ngDevMode && JSONP_ERR_WRONG_RESPONSE_TYPE);
    }
    if (req.headers.keys().length > 0) {
      throw new RuntimeError(2812, ngDevMode && JSONP_ERR_HEADERS_NOT_SUPPORTED);
    }
    if (!this.isAllowedJsonpUrl(req.urlWithParams)) {
      throw new RuntimeError(2826, ngDevMode && JSONP_ERR_UNSAFE_URL);
    }
    return new Observable((observer) => {
      const callback = this.nextCallback();
      const url = req.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/, `=${callback}$1`);
      const node = this.document.createElement("script");
      node.src = url;
      if (this.nonce) {
        node.setAttribute("nonce", this.nonce);
      }
      let body = null;
      let finished = false;
      this.callbackMap[callback] = (data) => {
        delete this.callbackMap[callback];
        body = data;
        finished = true;
      };
      const cleanup = () => {
        node.removeEventListener("load", onLoad);
        node.removeEventListener("error", onError);
        node.remove();
        delete this.callbackMap[callback];
      };
      const onLoad = () => {
        this.resolvedPromise.then(() => {
          cleanup();
          if (!finished) {
            observer.error(new HttpErrorResponse({
              url,
              status: 0,
              statusText: "JSONP Error",
              error: new Error(JSONP_ERR_NO_CALLBACK)
            }));
            return;
          }
          observer.next(new HttpResponse({
            body,
            status: HTTP_STATUS_CODE_OK,
            statusText: "OK",
            url
          }));
          observer.complete();
        });
      };
      const onError = (error) => {
        cleanup();
        observer.error(new HttpErrorResponse({
          error,
          status: 0,
          statusText: "JSONP Error",
          url
        }));
      };
      node.addEventListener("load", onLoad);
      node.addEventListener("error", onError);
      this.document.body.appendChild(node);
      observer.next({
        type: HttpEventType.Sent
      });
      return () => {
        if (!finished) {
          this.removeListeners(node);
        }
        cleanup();
      };
    });
  }
  removeListeners(script) {
    foreignDocument ??= this.document.implementation.createHTMLDocument();
    foreignDocument.adoptNode(script);
  }
  isAllowedJsonpUrl(url) {
    return /^https?:\/\//i.test(url);
  }
  static \u0275fac = function JsonpClientBackend_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JsonpClientBackend)(\u0275\u0275inject(JsonpCallbackContext), \u0275\u0275inject(DOCUMENT));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _JsonpClientBackend,
    factory: _JsonpClientBackend.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JsonpClientBackend, [{
    type: Injectable
  }], () => [{
    type: JsonpCallbackContext
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
function jsonpInterceptorFn(req, next) {
  if (req.method === "JSONP") {
    return inject(JsonpClientBackend).handle(req);
  }
  return next(req);
}
var JsonpInterceptor = class _JsonpInterceptor {
  injector;
  constructor(injector) {
    this.injector = injector;
  }
  intercept(initialRequest, next) {
    return runInInjectionContext(this.injector, () => jsonpInterceptorFn(initialRequest, (downstreamRequest) => next.handle(downstreamRequest)));
  }
  static \u0275fac = function JsonpInterceptor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JsonpInterceptor)(\u0275\u0275inject(EnvironmentInjector));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _JsonpInterceptor,
    factory: _JsonpInterceptor.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JsonpInterceptor, [{
    type: Injectable
  }], () => [{
    type: EnvironmentInjector
  }], null);
})();
var XSSI_PREFIX = /^\)\]\}',?\n/;
function validateXhrCompatibility(req) {
  const unsupportedOptions = [{
    property: "keepalive",
    errorCode: 2813
  }, {
    property: "cache",
    errorCode: 2814
  }, {
    property: "priority",
    errorCode: 2815
  }, {
    property: "mode",
    errorCode: 2816
  }, {
    property: "redirect",
    errorCode: 2817
  }, {
    property: "credentials",
    errorCode: 2818
  }, {
    property: "integrity",
    errorCode: 2820
  }, {
    property: "referrer",
    errorCode: 2821
  }, {
    property: "referrerPolicy",
    errorCode: 2823
  }];
  for (const {
    property,
    errorCode
  } of unsupportedOptions) {
    if (req[property]) {
      console.warn(formatRuntimeError(errorCode, `Angular detected that a \`HttpClient\` request with the \`${property}\` option was sent using XHR, which does not support it. To use the \`${property}\` option, use the Fetch API by removing \`withXhr()\` from the \`provideHttpClient()\` call.`));
    }
  }
}
var HttpXhrBackend = class _HttpXhrBackend {
  xhrFactory;
  tracingService = inject(TracingService, {
    optional: true
  });
  constructor(xhrFactory) {
    this.xhrFactory = xhrFactory;
  }
  maybePropagateTrace(fn) {
    return this.tracingService?.propagate ? this.tracingService.propagate(fn) : fn;
  }
  handle(req) {
    if (req.method === "JSONP") {
      throw new RuntimeError(-2800, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot make a JSONP request without JSONP support. To fix the problem, either add the \`withJsonpSupport()\` call (if \`provideHttpClient()\` is used) or import the \`HttpClientJsonpModule\` in the root NgModule.`);
    }
    ngDevMode && validateXhrCompatibility(req);
    const xhrFactory = this.xhrFactory;
    const source = false ? from(xhrFactory.\u0275loadImpl()) : of(null);
    return source.pipe(switchMap(() => {
      return new Observable((observer) => {
        const xhr = xhrFactory.build();
        xhr.open(req.method, req.urlWithParams);
        if (req.withCredentials) {
          xhr.withCredentials = true;
        }
        req.headers.forEach((name, values) => xhr.setRequestHeader(name, values.join(",")));
        if (!req.headers.has(ACCEPT_HEADER)) {
          xhr.setRequestHeader(ACCEPT_HEADER, ACCEPT_HEADER_VALUE);
        }
        if (!req.headers.has(CONTENT_TYPE_HEADER)) {
          const detectedType = req.detectContentTypeHeader();
          if (detectedType !== null) {
            xhr.setRequestHeader(CONTENT_TYPE_HEADER, detectedType);
          }
        }
        if (req.timeout) {
          xhr.timeout = req.timeout;
        }
        if (req.responseType) {
          const responseType = req.responseType.toLowerCase();
          xhr.responseType = responseType !== "json" ? responseType : "text";
        }
        const reqBody = req.serializeBody();
        let headerResponse = null;
        const partialFromXhr = () => {
          if (headerResponse !== null) {
            return headerResponse;
          }
          const statusText = xhr.statusText || "OK";
          const headers = new HttpHeaders(xhr.getAllResponseHeaders());
          const url = xhr.responseURL || req.url;
          headerResponse = new HttpHeaderResponse({
            headers,
            status: xhr.status,
            statusText,
            url
          });
          return headerResponse;
        };
        const onLoad = this.maybePropagateTrace(() => {
          let {
            headers,
            status,
            statusText,
            url
          } = partialFromXhr();
          let body = null;
          if (status !== HTTP_STATUS_CODE_NO_CONTENT) {
            body = typeof xhr.response === "undefined" ? xhr.responseText : xhr.response;
          }
          if (status === 0) {
            status = !!body ? HTTP_STATUS_CODE_OK : 0;
          }
          let ok = status >= 200 && status < 300;
          if (req.responseType === "json" && typeof body === "string") {
            const originalBody = body;
            body = body.replace(XSSI_PREFIX, "");
            try {
              body = body !== "" ? JSON.parse(body) : null;
            } catch (error) {
              body = originalBody;
              if (ok) {
                ok = false;
                body = {
                  error,
                  text: body
                };
              }
            }
          }
          if (ok) {
            observer.next(new HttpResponse({
              body,
              headers,
              status,
              statusText,
              url: url || void 0
            }));
            observer.complete();
          } else {
            observer.error(new HttpErrorResponse({
              error: body,
              headers,
              status,
              statusText,
              url: url || void 0
            }));
          }
        });
        const onError = this.maybePropagateTrace((error) => {
          const {
            url
          } = partialFromXhr();
          const res = new HttpErrorResponse({
            error,
            status: xhr.status || 0,
            statusText: xhr.statusText || "Unknown Error",
            url: url || void 0
          });
          observer.error(res);
        });
        let onTimeout = onError;
        if (req.timeout) {
          onTimeout = this.maybePropagateTrace((_) => {
            const {
              url
            } = partialFromXhr();
            const res = new HttpErrorResponse({
              error: new DOMException("Request timed out", "TimeoutError"),
              status: xhr.status || 0,
              statusText: xhr.statusText || "Request timeout",
              url: url || void 0
            });
            observer.error(res);
          });
        }
        let sentHeaders = false;
        const onDownProgress = this.maybePropagateTrace((event) => {
          if (!sentHeaders) {
            observer.next(partialFromXhr());
            sentHeaders = true;
          }
          let progressEvent = {
            type: HttpEventType.DownloadProgress,
            loaded: event.loaded
          };
          if (event.lengthComputable) {
            progressEvent.total = event.total;
          }
          if (req.responseType === "text" && !!xhr.responseText) {
            progressEvent.partialText = xhr.responseText;
          }
          observer.next(progressEvent);
        });
        const onUpProgress = this.maybePropagateTrace((event) => {
          let progress = {
            type: HttpEventType.UploadProgress,
            loaded: event.loaded
          };
          if (event.lengthComputable) {
            progress.total = event.total;
          }
          observer.next(progress);
        });
        xhr.addEventListener("load", onLoad);
        xhr.addEventListener("error", onError);
        xhr.addEventListener("timeout", onTimeout);
        xhr.addEventListener("abort", onError);
        const reportUploadProgress = req.reportProgress || req.reportUploadProgress;
        const reportDownloadProgress = req.reportProgress || req.reportDownloadProgress;
        if (reportDownloadProgress) {
          xhr.addEventListener("progress", onDownProgress);
        }
        if (reportUploadProgress && reqBody !== null && xhr.upload) {
          xhr.upload.addEventListener("progress", onUpProgress);
        }
        xhr.send(reqBody);
        observer.next({
          type: HttpEventType.Sent
        });
        return () => {
          xhr.removeEventListener("error", onError);
          xhr.removeEventListener("abort", onError);
          xhr.removeEventListener("load", onLoad);
          xhr.removeEventListener("timeout", onTimeout);
          if (reportDownloadProgress) {
            xhr.removeEventListener("progress", onDownProgress);
          }
          if (reportUploadProgress && reqBody !== null && xhr.upload) {
            xhr.upload.removeEventListener("progress", onUpProgress);
          }
          if (xhr.readyState !== xhr.DONE) {
            xhr.abort();
          }
        };
      });
    }));
  }
  static \u0275fac = function HttpXhrBackend_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpXhrBackend)(\u0275\u0275inject(XhrFactory));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _HttpXhrBackend,
    factory: _HttpXhrBackend.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpXhrBackend, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: XhrFactory
  }], null);
})();
var HttpFeatureKind;
(function(HttpFeatureKind2) {
  HttpFeatureKind2[HttpFeatureKind2["Interceptors"] = 0] = "Interceptors";
  HttpFeatureKind2[HttpFeatureKind2["LegacyInterceptors"] = 1] = "LegacyInterceptors";
  HttpFeatureKind2[HttpFeatureKind2["CustomXsrfConfiguration"] = 2] = "CustomXsrfConfiguration";
  HttpFeatureKind2[HttpFeatureKind2["NoXsrfProtection"] = 3] = "NoXsrfProtection";
  HttpFeatureKind2[HttpFeatureKind2["JsonpSupport"] = 4] = "JsonpSupport";
  HttpFeatureKind2[HttpFeatureKind2["RequestsMadeViaParent"] = 5] = "RequestsMadeViaParent";
  HttpFeatureKind2[HttpFeatureKind2["Fetch"] = 6] = "Fetch";
  HttpFeatureKind2[HttpFeatureKind2["Xhr"] = 7] = "Xhr";
})(HttpFeatureKind || (HttpFeatureKind = {}));
function makeHttpFeature(kind, providers) {
  return {
    \u0275kind: kind,
    \u0275providers: providers
  };
}
function provideHttpClient(...features) {
  if (ngDevMode) {
    const featureKinds = new Set(features.map((f) => f.\u0275kind));
    if (featureKinds.has(HttpFeatureKind.NoXsrfProtection) && featureKinds.has(HttpFeatureKind.CustomXsrfConfiguration)) {
      throw new Error(`Configuration error: found both withXsrfConfiguration() and withNoXsrfProtection() in the same call to provideHttpClient(), which is a contradiction.`);
    }
    const hasBackendOverride = featureKinds.has(HttpFeatureKind.Fetch) || featureKinds.has(HttpFeatureKind.Xhr);
    if (featureKinds.has(HttpFeatureKind.RequestsMadeViaParent) && hasBackendOverride) {
      throw new Error(`Configuration error: withRequestsMadeViaParent() cannot be combined with withFetch() or withXhr() in the same call to provideHttpClient().`);
    }
  }
  const providers = [HttpClient, FetchBackend, HttpInterceptorHandler, {
    provide: HttpHandler,
    useExisting: HttpInterceptorHandler
  }, {
    provide: HttpBackend,
    useFactory: () => {
      return inject(FetchBackend);
    }
  }, {
    provide: HTTP_INTERCEPTOR_FNS,
    useValue: xsrfInterceptorFn,
    multi: true
  }];
  for (const feature of features) {
    providers.push(...feature.\u0275providers);
  }
  return makeEnvironmentProviders(providers);
}
var LEGACY_INTERCEPTOR_FN = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "LEGACY_INTERCEPTOR_FN" : "");
function withInterceptorsFromDi() {
  return makeHttpFeature(HttpFeatureKind.LegacyInterceptors, [{
    provide: LEGACY_INTERCEPTOR_FN,
    useFactory: legacyInterceptorFnFactory
  }, {
    provide: HTTP_INTERCEPTOR_FNS,
    useExisting: LEGACY_INTERCEPTOR_FN,
    multi: true
  }]);
}
function withXsrfConfiguration({
  cookieName,
  headerName
}) {
  const providers = [];
  if (cookieName !== void 0) {
    providers.push({
      provide: XSRF_COOKIE_NAME,
      useValue: cookieName
    });
  }
  if (headerName !== void 0) {
    providers.push({
      provide: XSRF_HEADER_NAME,
      useValue: headerName
    });
  }
  return makeHttpFeature(HttpFeatureKind.CustomXsrfConfiguration, providers);
}
function withNoXsrfProtection() {
  return makeHttpFeature(HttpFeatureKind.NoXsrfProtection, [{
    provide: XSRF_ENABLED,
    useValue: false
  }]);
}
function withJsonpSupport() {
  return makeHttpFeature(HttpFeatureKind.JsonpSupport, [JsonpClientBackend, {
    provide: JsonpCallbackContext,
    useFactory: jsonpCallbackContext
  }, {
    provide: HTTP_INTERCEPTOR_FNS,
    useValue: jsonpInterceptorFn,
    multi: true
  }]);
}
function withXhr() {
  return makeHttpFeature(HttpFeatureKind.Xhr, [HttpXhrBackend, {
    provide: HttpBackend,
    useExisting: HttpXhrBackend
  }]);
}
var HttpClientXsrfModule = class _HttpClientXsrfModule {
  static disable() {
    return {
      ngModule: _HttpClientXsrfModule,
      providers: [withNoXsrfProtection().\u0275providers]
    };
  }
  static withOptions(options = {}) {
    return {
      ngModule: _HttpClientXsrfModule,
      providers: withXsrfConfiguration(options).\u0275providers
    };
  }
  static \u0275fac = function HttpClientXsrfModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpClientXsrfModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _HttpClientXsrfModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [HttpXsrfInterceptor, {
      provide: HTTP_INTERCEPTORS,
      useExisting: HttpXsrfInterceptor,
      multi: true
    }, {
      provide: HttpXsrfTokenExtractor,
      useClass: HttpXsrfCookieExtractor
    }, withXsrfConfiguration({
      cookieName: XSRF_DEFAULT_COOKIE_NAME,
      headerName: XSRF_DEFAULT_HEADER_NAME
    }).\u0275providers, {
      provide: XSRF_ENABLED,
      useValue: true
    }]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpClientXsrfModule, [{
    type: NgModule,
    args: [{
      providers: [HttpXsrfInterceptor, {
        provide: HTTP_INTERCEPTORS,
        useExisting: HttpXsrfInterceptor,
        multi: true
      }, {
        provide: HttpXsrfTokenExtractor,
        useClass: HttpXsrfCookieExtractor
      }, withXsrfConfiguration({
        cookieName: XSRF_DEFAULT_COOKIE_NAME,
        headerName: XSRF_DEFAULT_HEADER_NAME
      }).\u0275providers, {
        provide: XSRF_ENABLED,
        useValue: true
      }]
    }]
  }], null, null);
})();
var HttpClientModule = class _HttpClientModule {
  static \u0275fac = function HttpClientModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpClientModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _HttpClientModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [provideHttpClient(withInterceptorsFromDi(), withXhr())]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpClientModule, [{
    type: NgModule,
    args: [{
      providers: [provideHttpClient(withInterceptorsFromDi(), withXhr())]
    }]
  }], null, null);
})();
var HttpClientJsonpModule = class _HttpClientJsonpModule {
  static \u0275fac = function HttpClientJsonpModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpClientJsonpModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _HttpClientJsonpModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [withJsonpSupport().\u0275providers]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpClientJsonpModule, [{
    type: NgModule,
    args: [{
      providers: [withJsonpSupport().\u0275providers]
    }]
  }], null, null);
})();

// node_modules/@angular/common/fesm2022/http.mjs
init_core();
/**
 * @license Angular v22.1.7
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var HTTP_TRANSFER_CACHE_ORIGIN_MAP = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_TRANSFER_CACHE_ORIGIN_MAP" : "");
var BODY = "b";
var HEADERS = "h";
var STATUS = "s";
var STATUS_TEXT = "st";
var REQ_URL = "u";
var RESPONSE_TYPE = "rt";
var CACHE_OPTIONS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "HTTP_TRANSFER_STATE_CACHE_OPTIONS" : "");
var ALLOWED_METHODS = ["GET", "HEAD"];
function canUseOrCacheRequest(req, options) {
  const {
    isCacheActive,
    filter: filter2,
    includePostRequests,
    includeRequestsWithAuthHeaders,
    includeRequestsWithCredentials,
    includeNonCacheableRequests
  } = options;
  const {
    transferCache: requestOptions,
    method: requestMethod
  } = req;
  if (!isCacheActive || requestOptions === false || requestMethod === "POST" && !includePostRequests && !requestOptions || requestMethod !== "POST" && !ALLOWED_METHODS.includes(requestMethod) || !includeRequestsWithAuthHeaders && hasAuthHeaders(req) || !includeRequestsWithCredentials && hasOutgoingCredentials(req) || !includeNonCacheableRequests && (hasUncacheableCacheControl(req.headers) || isNonCacheableRequest(req.cache)) || filter2?.(req) === false) {
    return false;
  }
  return true;
}
function getHeadersToInclude(options, requestOptions) {
  return typeof requestOptions === "object" && requestOptions.includeHeaders ? requestOptions.includeHeaders : options.includeHeaders;
}
function retrieveStateFromCache(req, options, transferState, originMap, storeKey, skipUseCacheChecks = false) {
  if (!skipUseCacheChecks && !canUseOrCacheRequest(req, options)) {
    return null;
  }
  if (originMap) {
    throw new RuntimeError(2803, ngDevMode && "Angular detected that the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token is configured and present in the client side code. Please ensure that this token is only provided in the server code of the application.");
  }
  if (!storeKey) {
    const requestUrl = false ? mapRequestOriginUrl(req.url, originMap) : req.url;
    storeKey = makeCacheKey(req, requestUrl);
  }
  const response = transferState.get(storeKey, null);
  if (!response) {
    return null;
  }
  const {
    [BODY]: undecodedBody,
    [RESPONSE_TYPE]: responseType,
    [HEADERS]: httpHeaders,
    [STATUS]: status,
    [STATUS_TEXT]: statusText,
    [REQ_URL]: url
  } = response;
  let body = undecodedBody;
  switch (responseType) {
    case "arraybuffer":
      body = fromBase64(undecodedBody);
      break;
    case "blob":
      body = new Blob([fromBase64(undecodedBody)]);
      break;
  }
  let headers = new HttpHeaders(httpHeaders);
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    const {
      transferCache: requestOptions
    } = req;
    const headersToInclude = getHeadersToInclude(options, requestOptions);
    headers = appendMissingHeadersDetection(req.url, headers, headersToInclude ?? []);
  }
  return new HttpResponse({
    body,
    headers,
    status,
    statusText,
    url
  });
}
function hasAuthHeaders(req) {
  const headers = req.headers;
  return headers.has("authorization") || headers.has("proxy-authorization") || headers.has("cookie");
}
var UNCACHEABLE_CACHE_CONTROL_DIRECTIVES = /* @__PURE__ */ new Set(["no-store", "private", "no-cache"]);
function hasUncacheableCacheControl(headers) {
  const cacheControl = headers.get("cache-control");
  if (!cacheControl) {
    return false;
  }
  return cacheControl.split(",").some((directive) => {
    const directiveName = directive.split("=", 1)[0].trim().toLowerCase();
    return UNCACHEABLE_CACHE_CONTROL_DIRECTIVES.has(directiveName);
  });
}
function isNonCacheableRequest(cache) {
  return cache === "no-cache" || cache === "no-store";
}
function hasOutgoingCredentials(req) {
  const {
    withCredentials,
    credentials
  } = req;
  return withCredentials || credentials === "include" || credentials === "same-origin";
}
function sortAndConcatParams(params) {
  const searchParams = new URLSearchParams(params instanceof URLSearchParams ? params : params.toString());
  searchParams.sort();
  return searchParams.toString();
}
function makeCacheKey(request, mappedRequestUrl) {
  const {
    params,
    method,
    responseType
  } = request;
  const encodedParams = sortAndConcatParams(params);
  let serializedBody = request.serializeBody();
  if (serializedBody instanceof URLSearchParams) {
    serializedBody = sortAndConcatParams(serializedBody);
  } else if (typeof serializedBody !== "string") {
    serializedBody = "";
  }
  const key = [method, responseType, mappedRequestUrl, serializedBody, encodedParams].join("\0");
  const hash = generateHash(key);
  return makeStateKey(hash);
}
function fromBase64(base64) {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return bytes.buffer;
}
function appendMissingHeadersDetection(url, headers, headersToInclude) {
  const warningProduced = /* @__PURE__ */ new Set();
  return new Proxy(headers, {
    get(target, prop) {
      const value = Reflect.get(target, prop);
      const methods = /* @__PURE__ */ new Set(["get", "has", "getAll"]);
      if (typeof value !== "function" || !methods.has(prop)) {
        return value;
      }
      return (headerName) => {
        const key = (prop + ":" + headerName).toLowerCase();
        if (!headersToInclude.includes(headerName) && !warningProduced.has(key)) {
          warningProduced.add(key);
          const truncatedUrl = truncateMiddle(url);
          console.warn(formatRuntimeError(-2802, `Angular detected that the \`${headerName}\` header is accessed, but the value of the header was not transferred from the server to the client by the HttpTransferCache. To include the value of the \`${headerName}\` header for the \`${truncatedUrl}\` request, use the \`includeHeaders\` list. The \`includeHeaders\` can be defined either on a request level by adding the \`transferCache\` parameter, or on an application level by adding the \`httpCacheTransfer.includeHeaders\` argument to the \`provideClientHydration()\` call. `));
        }
        return value.apply(target, [headerName]);
      };
    }
  });
}
var SHA256_ROUND_CONSTANTS = /* @__PURE__ */ new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
var textEncoder;
function generateHash(value) {
  textEncoder ??= new TextEncoder();
  const inputBytes = textEncoder.encode(value);
  let hashState0 = 1779033703;
  let hashState1 = 3144134277;
  let hashState2 = 1013904242;
  let hashState3 = 2773480762;
  let hashState4 = 1359893119;
  let hashState5 = 2600822924;
  let hashState6 = 528734635;
  let hashState7 = 1541459225;
  const messageLengthInBits = inputBytes.length * 8;
  const paddedLengthInBytes = (inputBytes.length + 8 >> 6) + 1 << 6;
  const paddedBytes = new Uint8Array(paddedLengthInBytes);
  paddedBytes.set(inputBytes);
  paddedBytes[inputBytes.length] = 128;
  const paddedBytesView = new DataView(paddedBytes.buffer);
  const lowBits = messageLengthInBits >>> 0;
  const highBits = messageLengthInBits / 4294967296 >>> 0;
  paddedBytesView.setUint32(paddedLengthInBytes - 8, highBits, false);
  paddedBytesView.setUint32(paddedLengthInBytes - 4, lowBits, false);
  const messageSchedule = new Uint32Array(64);
  for (let chunkOffset = 0; chunkOffset < paddedLengthInBytes; chunkOffset += 64) {
    for (let i = 0; i < 16; i++) {
      messageSchedule[i] = paddedBytesView.getUint32(chunkOffset + i * 4, false);
    }
    for (let i = 16; i < 64; i++) {
      const prevWord15 = messageSchedule[i - 15];
      const sigma0 = ((prevWord15 >>> 7 | prevWord15 << 25) ^ (prevWord15 >>> 18 | prevWord15 << 14) ^ prevWord15 >>> 3) >>> 0;
      const prevWord2 = messageSchedule[i - 2];
      const sigma1 = ((prevWord2 >>> 17 | prevWord2 << 15) ^ (prevWord2 >>> 19 | prevWord2 << 13) ^ prevWord2 >>> 10) >>> 0;
      messageSchedule[i] = messageSchedule[i - 16] + sigma0 + messageSchedule[i - 7] + sigma1 >>> 0;
    }
    let workingStateA = hashState0;
    let workingStateB = hashState1;
    let workingStateC = hashState2;
    let workingStateD = hashState3;
    let workingStateE = hashState4;
    let workingStateF = hashState5;
    let workingStateG = hashState6;
    let workingStateH = hashState7;
    for (let i = 0; i < 64; i++) {
      const capitalSigma1 = ((workingStateE >>> 6 | workingStateE << 26) ^ (workingStateE >>> 11 | workingStateE << 21) ^ (workingStateE >>> 25 | workingStateE << 7)) >>> 0;
      const chFunction = (workingStateE & workingStateF ^ ~workingStateE & workingStateG) >>> 0;
      const temp1 = workingStateH + capitalSigma1 + chFunction + SHA256_ROUND_CONSTANTS[i] + messageSchedule[i] >>> 0;
      const capitalSigma0 = ((workingStateA >>> 2 | workingStateA << 30) ^ (workingStateA >>> 13 | workingStateA << 19) ^ (workingStateA >>> 22 | workingStateA << 10)) >>> 0;
      const majFunction = (workingStateA & workingStateB ^ workingStateA & workingStateC ^ workingStateB & workingStateC) >>> 0;
      const temp2 = capitalSigma0 + majFunction >>> 0;
      workingStateH = workingStateG;
      workingStateG = workingStateF;
      workingStateF = workingStateE;
      workingStateE = workingStateD + temp1 >>> 0;
      workingStateD = workingStateC;
      workingStateC = workingStateB;
      workingStateB = workingStateA;
      workingStateA = temp1 + temp2 >>> 0;
    }
    hashState0 = hashState0 + workingStateA >>> 0;
    hashState1 = hashState1 + workingStateB >>> 0;
    hashState2 = hashState2 + workingStateC >>> 0;
    hashState3 = hashState3 + workingStateD >>> 0;
    hashState4 = hashState4 + workingStateE >>> 0;
    hashState5 = hashState5 + workingStateF >>> 0;
    hashState6 = hashState6 + workingStateG >>> 0;
    hashState7 = hashState7 + workingStateH >>> 0;
  }
  return [hashState0, hashState1, hashState2, hashState3, hashState4, hashState5, hashState6, hashState7].map((x) => x.toString(16).padStart(8, "0")).join("");
}
var httpResource = (() => {
  const jsonFn = makeHttpResourceFn("json");
  jsonFn.arrayBuffer = makeHttpResourceFn("arraybuffer");
  jsonFn.blob = makeHttpResourceFn("blob");
  jsonFn.text = makeHttpResourceFn("text");
  return jsonFn;
})();
function makeHttpResourceFn(responseType) {
  return function httpResource2(request, options) {
    if (ngDevMode && !options?.injector) {
      assertInInjectionContext(httpResource2);
    }
    const injector = options?.injector ?? inject(Injector);
    const cacheOptions = injector.get(CACHE_OPTIONS, null, {
      optional: true
    });
    const transferState = injector.get(TransferState, null, {
      optional: true
    });
    const originMap = injector.get(HTTP_TRANSFER_CACHE_ORIGIN_MAP, null, {
      optional: true
    });
    const getInitialStream = (req) => {
      if (cacheOptions && transferState && req) {
        const cachedResponse = retrieveStateFromCache(req, cacheOptions, transferState, originMap);
        if (cachedResponse) {
          try {
            const body = cachedResponse.body;
            const parsed = options?.parse ? options.parse(body) : body;
            return signal({
              value: parsed
            });
          } catch (e) {
            if (typeof ngDevMode === "undefined" || ngDevMode) {
              console.warn(`Angular detected an error while parsing the cached response for the httpResource at \`${req.url}\`. The resource will fall back to its default value and try again asynchronously.`, e);
            }
          }
        }
      }
      return void 0;
    };
    return new HttpResourceImpl(injector, (ctx) => normalizeRequest(ctx, request, responseType), options?.defaultValue, options?.debugName, options?.parse, options?.equal, getInitialStream);
  };
}
function normalizeRequest(ctx, request, responseType) {
  let unwrappedRequest = typeof request === "function" ? request(ctx) : request;
  if (unwrappedRequest === void 0) {
    return void 0;
  } else if (typeof unwrappedRequest === "string") {
    unwrappedRequest = {
      url: unwrappedRequest
    };
  }
  const headers = unwrappedRequest.headers instanceof HttpHeaders ? unwrappedRequest.headers : new HttpHeaders(unwrappedRequest.headers);
  const params = unwrappedRequest.params instanceof HttpParams ? unwrappedRequest.params : new HttpParams({
    fromObject: unwrappedRequest.params
  });
  return new HttpRequest(unwrappedRequest.method ?? "GET", unwrappedRequest.url, unwrappedRequest.body ?? null, {
    headers,
    params,
    reportProgress: unwrappedRequest.reportProgress,
    withCredentials: unwrappedRequest.withCredentials,
    keepalive: unwrappedRequest.keepalive,
    cache: unwrappedRequest.cache,
    priority: unwrappedRequest.priority,
    mode: unwrappedRequest.mode,
    redirect: unwrappedRequest.redirect,
    responseType,
    context: unwrappedRequest.context,
    transferCache: unwrappedRequest.transferCache,
    credentials: unwrappedRequest.credentials,
    referrer: unwrappedRequest.referrer,
    referrerPolicy: unwrappedRequest.referrerPolicy,
    integrity: unwrappedRequest.integrity,
    timeout: unwrappedRequest.timeout
  });
}
var HttpResourceImpl = class extends ResourceImpl {
  client;
  _headers = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "_headers"
  } : {}), {
    source: this.extRequest,
    computation: () => void 0
  }));
  _progress = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "_progress"
  } : {}), {
    source: this.extRequest,
    computation: () => void 0
  }));
  _statusCode = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "_statusCode"
  } : {}), {
    source: this.extRequest,
    computation: () => void 0
  }));
  headers = computed(() => this.status() === "resolved" || this.status() === "error" ? this._headers() : void 0, ...ngDevMode ? [{
    debugName: "headers"
  }] : []);
  progress = this._progress.asReadonly();
  statusCode = this._statusCode.asReadonly();
  constructor(injector, request, defaultValue, debugName, parse, equal, getInitialStream) {
    super(request, ({
      params: request2,
      abortSignal
    }) => {
      let sub;
      let aborted = false;
      const onAbort = () => {
        aborted = true;
        sub?.unsubscribe();
      };
      abortSignal.addEventListener("abort", onAbort);
      const stream = signal({
        value: void 0
      }, ...ngDevMode ? [{
        debugName: "stream"
      }] : []);
      let resolve;
      const promise = new Promise((r) => resolve = r);
      const send = (value) => {
        stream.set(value);
        resolve?.(stream);
        resolve = void 0;
      };
      sub = this.client.request(request2).subscribe({
        next: (event) => {
          switch (event.type) {
            case HttpEventType.Response:
              this._headers.set(event.headers);
              this._statusCode.set(event.status);
              try {
                send({
                  value: parse ? parse(event.body) : event.body
                });
              } catch (error) {
                send({
                  error: encapsulateResourceError(error)
                });
              }
              break;
            case HttpEventType.DownloadProgress:
              this._progress.set(event);
              break;
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this._headers.set(error.headers);
            this._statusCode.set(error.status);
          }
          send({
            error
          });
          abortSignal.removeEventListener("abort", onAbort);
        },
        complete: () => {
          if (resolve) {
            send({
              error: new RuntimeError(-991, ngDevMode && "Resource completed before producing a value")
            });
          }
          abortSignal.removeEventListener("abort", onAbort);
        }
      });
      if (aborted) {
        sub.unsubscribe();
      }
      return promise;
    }, defaultValue, equal, debugName, injector, void 0, getInitialStream);
    this.client = injector.get(HttpClient);
  }
  set(value) {
    super.set(value);
    this._headers.set(void 0);
    this._progress.set(void 0);
    this._statusCode.set(void 0);
  }
};

// src/app/models/common.model.ts
function cov_1ek7qlwa82() {
  var path = "E:\\Code\\MyGittee\\rustfs-oos\\rustfs-oos-client-ng\\src\\app\\models\\common.model.ts";
  var hash = "b9be88861c736179cca97fad95d14860ef4c46e8";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "E:\\Code\\MyGittee\\rustfs-oos\\rustfs-oos-client-ng\\src\\app\\models\\common.model.ts",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 44,
          column: 34
        }
      },
      "1": {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 8,
          column: 46
        }
      },
      "2": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 74
        }
      },
      "3": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 62
        }
      },
      "4": {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 74
        }
      },
      "5": {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 12,
          column: 80
        }
      },
      "6": {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 66
        }
      },
      "7": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 14,
          column: 74
        }
      },
      "8": {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 15,
          column: 76
        }
      },
      "9": {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 16,
          column: 66
        }
      },
      "10": {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 17,
          column: 66
        }
      },
      "11": {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 66
        }
      },
      "12": {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 19,
          column: 60
        }
      },
      "13": {
        start: {
          line: 20,
          column: 4
        },
        end: {
          line: 20,
          column: 74
        }
      },
      "14": {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 21,
          column: 86
        }
      },
      "15": {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 78
        }
      },
      "16": {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 23,
          column: 78
        }
      },
      "17": {
        start: {
          line: 24,
          column: 4
        },
        end: {
          line: 24,
          column: 58
        }
      },
      "18": {
        start: {
          line: 25,
          column: 4
        },
        end: {
          line: 25,
          column: 70
        }
      },
      "19": {
        start: {
          line: 26,
          column: 4
        },
        end: {
          line: 26,
          column: 66
        }
      },
      "20": {
        start: {
          line: 27,
          column: 4
        },
        end: {
          line: 27,
          column: 68
        }
      },
      "21": {
        start: {
          line: 28,
          column: 4
        },
        end: {
          line: 28,
          column: 84
        }
      },
      "22": {
        start: {
          line: 29,
          column: 4
        },
        end: {
          line: 29,
          column: 86
        }
      },
      "23": {
        start: {
          line: 30,
          column: 4
        },
        end: {
          line: 30,
          column: 80
        }
      },
      "24": {
        start: {
          line: 31,
          column: 4
        },
        end: {
          line: 31,
          column: 58
        }
      },
      "25": {
        start: {
          line: 32,
          column: 4
        },
        end: {
          line: 32,
          column: 66
        }
      },
      "26": {
        start: {
          line: 33,
          column: 4
        },
        end: {
          line: 33,
          column: 50
        }
      },
      "27": {
        start: {
          line: 34,
          column: 4
        },
        end: {
          line: 34,
          column: 66
        }
      },
      "28": {
        start: {
          line: 35,
          column: 4
        },
        end: {
          line: 35,
          column: 92
        }
      },
      "29": {
        start: {
          line: 36,
          column: 4
        },
        end: {
          line: 36,
          column: 82
        }
      },
      "30": {
        start: {
          line: 37,
          column: 4
        },
        end: {
          line: 37,
          column: 72
        }
      },
      "31": {
        start: {
          line: 38,
          column: 4
        },
        end: {
          line: 38,
          column: 68
        }
      },
      "32": {
        start: {
          line: 39,
          column: 4
        },
        end: {
          line: 39,
          column: 72
        }
      },
      "33": {
        start: {
          line: 40,
          column: 4
        },
        end: {
          line: 40,
          column: 80
        }
      },
      "34": {
        start: {
          line: 41,
          column: 4
        },
        end: {
          line: 41,
          column: 78
        }
      },
      "35": {
        start: {
          line: 42,
          column: 4
        },
        end: {
          line: 42,
          column: 78
        }
      },
      "36": {
        start: {
          line: 43,
          column: 4
        },
        end: {
          line: 43,
          column: 78
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 7,
            column: 1
          },
          end: {
            line: 7,
            column: 2
          }
        },
        loc: {
          start: {
            line: 7,
            column: 22
          },
          end: {
            line: 44,
            column: 1
          }
        },
        line: 7
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 44,
            column: 3
          },
          end: {
            line: 44,
            column: 32
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 44,
            column: 3
          },
          end: {
            line: 44,
            column: 12
          }
        }, {
          start: {
            line: 44,
            column: 17
          },
          end: {
            line: 44,
            column: 31
          }
        }],
        line: 44
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0,
      "16": 0,
      "17": 0,
      "18": 0,
      "19": 0,
      "20": 0,
      "21": 0,
      "22": 0,
      "23": 0,
      "24": 0,
      "25": 0,
      "26": 0,
      "27": 0,
      "28": 0,
      "29": 0,
      "30": 0,
      "31": 0,
      "32": 0,
      "33": 0,
      "34": 0,
      "35": 0,
      "36": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0]
    },
    inputSourceMap: {
      version: 3,
      file: "common.model.js",
      sourceRoot: "",
      sources: ["common.model.ts"],
      names: [],
      mappings: "AAAA;;;GAGG;AAkBH,qDAAqD;AACrD,MAAM,CAAN,IAAY,SA6CX;AA7CD,WAAY,SAAS;IACnB,yCAAQ,CAAA;IACR,qEAAwB,CAAA;IAExB,yDAAkB,CAAA;IAClB,qEAAwB,CAAA;IACxB,2EAA2B,CAAA;IAC3B,6DAAoB,CAAA;IACpB,qEAAwB,CAAA;IACxB,uEAAyB,CAAA;IAEzB,6DAAoB,CAAA;IACpB,6DAAoB,CAAA;IACpB,6DAAoB,CAAA;IAEpB,uDAAiB,CAAA;IACjB,qEAAwB,CAAA;IACxB,iFAA8B,CAAA;IAC9B,yEAA0B,CAAA;IAC1B,yEAA0B,CAAA;IAE1B,qDAAgB,CAAA;IAChB,iEAAsB,CAAA;IACtB,6DAAoB,CAAA;IACpB,+DAAqB,CAAA;IACrB,+EAA6B,CAAA;IAC7B,iFAA8B,CAAA;IAC9B,2EAA2B,CAAA;IAE3B,qDAAgB,CAAA;IAChB,6DAAoB,CAAA;IAEpB,6CAAY,CAAA;IACZ,6DAAoB,CAAA;IACpB,uFAAiC,CAAA;IACjC,6EAA4B,CAAA;IAE5B,mEAAuB,CAAA;IACvB,+DAAqB,CAAA;IACrB,mEAAuB,CAAA;IAEvB,2EAA2B,CAAA;IAC3B,yEAA0B,CAAA;IAC1B,yEAA0B,CAAA;IAC1B,yEAA0B,CAAA;AAC5B,CAAC,EA7CW,SAAS,KAAT,SAAS,QA6CpB",
      sourcesContent: ["/**\n * \u901A\u7528\u57FA\u7840\u7C7B\u578B.\n * \u6765\u6E90\uFF1AReact \u7248 src/api/types/Common.d.ts\u3001ErrorTypes.ts\uFF08\u540E\u7AEF\u4E3A\u771F\u76F8\u6E90\uFF09\u3002\n */\n\n/** \u5B58\u50A8\u7C7B\uFF08StorageClass.cs\uFF09. */\nexport type StorageClass = 'Standard' | 'InfrequentAccess' | 'Archive';\n\n/**\n * \u5185\u5BB9\u52A0\u5BC6\u6A21\u5F0F\uFF08\u955C\u50CF\u540E\u7AEF Contracts/Enums/EncryptionMode.cs\uFF09.\n * - ServerSide\uFF1A\u670D\u52A1\u7AEF\u52A0\u5BC6\uFF08SSE\uFF09\uFF0C\u670D\u52A1\u7AEF\u53EF\u8BFB\u660E\u6587\u5E76\u6267\u884C\u5185\u5BB9\u6CBB\u7406\uFF08\u9ED8\u8BA4\uFF09\u3002\n * - EndToEnd\uFF1A\u7AEF\u5230\u7AEF\u52A0\u5BC6\uFF08\u96F6\u77E5\u8BC6\uFF09\uFF0C\u5BA2\u6237\u7AEF\u52A0\u5BC6\u76F4\u4F20\uFF0C\u670D\u52A1\u7AEF\u4EC5\u5B58\u5BC6\u6587\u3002\n */\nexport type EncryptionMode = 'ServerSide' | 'EndToEnd';\n\n/** \u540E\u7AEF\u7EDF\u4E00\u9519\u8BEF\u54CD\u5E94\u4F53\uFF1A\u6210\u529F\u8FD4\u56DE\u88F8\u6570\u636E\uFF1B\u5931\u8D25\u8FD4\u56DE { code, message }. */\nexport interface ApiError {\n  code: number;\n  message: string;\n}\n\n/** \u540E\u7AEF ErrorCode \u679A\u4E3E\uFF08\u4E0E Contracts/ErrorCodes.cs \u5BF9\u9F50\uFF09. */\nexport enum ErrorCode {\n  None = 0,\n  UnspecifiedError = 10000,\n\n  BadRequest = 40000,\n  ValidationFailed = 40001,\n  InvalidParentFolder = 40002,\n  FileTooLarge = 40003,\n  DuplicateFileKey = 40004,\n  UploadPartInvalid = 40005,\n\n  Unauthorized = 40100,\n  TokenExpired = 40101,\n  InvalidToken = 40102,\n\n  Forbidden = 40300,\n  PermissionDenied = 40301,\n  SharePasswordIncorrect = 40302,\n  FileUnderRetention = 40303,\n  FileUnderLegalHold = 40304,\n\n  NotFound = 40400,\n  BucketNotFound = 40401,\n  FileNotFound = 40402,\n  ShareNotFound = 40403,\n  UploadSessionNotFound = 40404,\n  RecycleBinItemNotFound = 40405,\n  FileVersionNotFound = 40406,\n\n  Conflict = 40900,\n  ShareRevoked = 40901,\n\n  Gone = 41000,\n  ShareExpired = 41001,\n  ShareMaxDownloadsExceeded = 41002,\n  UploadSessionExpired = 41003,\n\n  PayloadTooLarge = 41300,\n  QuotaExceeded = 41301,\n  TooManyRequests = 42900,\n\n  InternalServerError = 50000,\n  StorageServerError = 50001,\n  ServiceUnavailable = 50300,\n  StorageUnavailable = 50301,\n}\n"]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "b9be88861c736179cca97fad95d14860ef4c46e8"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    cov_1ek7qlwa82 = function() {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1ek7qlwa82();
var ErrorCode;
cov_1ek7qlwa82().s[0]++;
(function(ErrorCode2) {
  cov_1ek7qlwa82().f[0]++;
  cov_1ek7qlwa82().s[1]++;
  ErrorCode2[ErrorCode2["None"] = 0] = "None";
  cov_1ek7qlwa82().s[2]++;
  ErrorCode2[ErrorCode2["UnspecifiedError"] = 1e4] = "UnspecifiedError";
  cov_1ek7qlwa82().s[3]++;
  ErrorCode2[ErrorCode2["BadRequest"] = 4e4] = "BadRequest";
  cov_1ek7qlwa82().s[4]++;
  ErrorCode2[ErrorCode2["ValidationFailed"] = 40001] = "ValidationFailed";
  cov_1ek7qlwa82().s[5]++;
  ErrorCode2[ErrorCode2["InvalidParentFolder"] = 40002] = "InvalidParentFolder";
  cov_1ek7qlwa82().s[6]++;
  ErrorCode2[ErrorCode2["FileTooLarge"] = 40003] = "FileTooLarge";
  cov_1ek7qlwa82().s[7]++;
  ErrorCode2[ErrorCode2["DuplicateFileKey"] = 40004] = "DuplicateFileKey";
  cov_1ek7qlwa82().s[8]++;
  ErrorCode2[ErrorCode2["UploadPartInvalid"] = 40005] = "UploadPartInvalid";
  cov_1ek7qlwa82().s[9]++;
  ErrorCode2[ErrorCode2["Unauthorized"] = 40100] = "Unauthorized";
  cov_1ek7qlwa82().s[10]++;
  ErrorCode2[ErrorCode2["TokenExpired"] = 40101] = "TokenExpired";
  cov_1ek7qlwa82().s[11]++;
  ErrorCode2[ErrorCode2["InvalidToken"] = 40102] = "InvalidToken";
  cov_1ek7qlwa82().s[12]++;
  ErrorCode2[ErrorCode2["Forbidden"] = 40300] = "Forbidden";
  cov_1ek7qlwa82().s[13]++;
  ErrorCode2[ErrorCode2["PermissionDenied"] = 40301] = "PermissionDenied";
  cov_1ek7qlwa82().s[14]++;
  ErrorCode2[ErrorCode2["SharePasswordIncorrect"] = 40302] = "SharePasswordIncorrect";
  cov_1ek7qlwa82().s[15]++;
  ErrorCode2[ErrorCode2["FileUnderRetention"] = 40303] = "FileUnderRetention";
  cov_1ek7qlwa82().s[16]++;
  ErrorCode2[ErrorCode2["FileUnderLegalHold"] = 40304] = "FileUnderLegalHold";
  cov_1ek7qlwa82().s[17]++;
  ErrorCode2[ErrorCode2["NotFound"] = 40400] = "NotFound";
  cov_1ek7qlwa82().s[18]++;
  ErrorCode2[ErrorCode2["BucketNotFound"] = 40401] = "BucketNotFound";
  cov_1ek7qlwa82().s[19]++;
  ErrorCode2[ErrorCode2["FileNotFound"] = 40402] = "FileNotFound";
  cov_1ek7qlwa82().s[20]++;
  ErrorCode2[ErrorCode2["ShareNotFound"] = 40403] = "ShareNotFound";
  cov_1ek7qlwa82().s[21]++;
  ErrorCode2[ErrorCode2["UploadSessionNotFound"] = 40404] = "UploadSessionNotFound";
  cov_1ek7qlwa82().s[22]++;
  ErrorCode2[ErrorCode2["RecycleBinItemNotFound"] = 40405] = "RecycleBinItemNotFound";
  cov_1ek7qlwa82().s[23]++;
  ErrorCode2[ErrorCode2["FileVersionNotFound"] = 40406] = "FileVersionNotFound";
  cov_1ek7qlwa82().s[24]++;
  ErrorCode2[ErrorCode2["Conflict"] = 40900] = "Conflict";
  cov_1ek7qlwa82().s[25]++;
  ErrorCode2[ErrorCode2["ShareRevoked"] = 40901] = "ShareRevoked";
  cov_1ek7qlwa82().s[26]++;
  ErrorCode2[ErrorCode2["Gone"] = 41e3] = "Gone";
  cov_1ek7qlwa82().s[27]++;
  ErrorCode2[ErrorCode2["ShareExpired"] = 41001] = "ShareExpired";
  cov_1ek7qlwa82().s[28]++;
  ErrorCode2[ErrorCode2["ShareMaxDownloadsExceeded"] = 41002] = "ShareMaxDownloadsExceeded";
  cov_1ek7qlwa82().s[29]++;
  ErrorCode2[ErrorCode2["UploadSessionExpired"] = 41003] = "UploadSessionExpired";
  cov_1ek7qlwa82().s[30]++;
  ErrorCode2[ErrorCode2["PayloadTooLarge"] = 41300] = "PayloadTooLarge";
  cov_1ek7qlwa82().s[31]++;
  ErrorCode2[ErrorCode2["QuotaExceeded"] = 41301] = "QuotaExceeded";
  cov_1ek7qlwa82().s[32]++;
  ErrorCode2[ErrorCode2["TooManyRequests"] = 42900] = "TooManyRequests";
  cov_1ek7qlwa82().s[33]++;
  ErrorCode2[ErrorCode2["InternalServerError"] = 5e4] = "InternalServerError";
  cov_1ek7qlwa82().s[34]++;
  ErrorCode2[ErrorCode2["StorageServerError"] = 50001] = "StorageServerError";
  cov_1ek7qlwa82().s[35]++;
  ErrorCode2[ErrorCode2["ServiceUnavailable"] = 50300] = "ServiceUnavailable";
  cov_1ek7qlwa82().s[36]++;
  ErrorCode2[ErrorCode2["StorageUnavailable"] = 50301] = "StorageUnavailable";
})((cov_1ek7qlwa82().b[0][0]++, ErrorCode) || (cov_1ek7qlwa82().b[0][1]++, ErrorCode = {}));

// src/app/core/http/error.util.ts
function cov_2jy268vvn4() {
  var path = "E:\\Code\\MyGittee\\rustfs-oos\\rustfs-oos-client-ng\\src\\app\\core\\http\\error.util.ts";
  var hash = "c5205baeefb9b30dd5ecd8286e8ac0982d1819f6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "E:\\Code\\MyGittee\\rustfs-oos\\rustfs-oos-client-ng\\src\\app\\core\\http\\error.util.ts",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 20
        },
        end: {
          line: 16,
          column: 1
        }
      },
      "1": {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 33,
          column: 5
        }
      },
      "2": {
        start: {
          line: 19,
          column: 21
        },
        end: {
          line: 19,
          column: 32
        }
      },
      "3": {
        start: {
          line: 21,
          column: 8
        },
        end: {
          line: 25,
          column: 9
        }
      },
      "4": {
        start: {
          line: 22,
          column: 12
        },
        end: {
          line: 24,
          column: 37
        }
      },
      "5": {
        start: {
          line: 26,
          column: 8
        },
        end: {
          line: 28,
          column: 9
        }
      },
      "6": {
        start: {
          line: 27,
          column: 12
        },
        end: {
          line: 27,
          column: 32
        }
      },
      "7": {
        start: {
          line: 29,
          column: 23
        },
        end: {
          line: 29,
          column: 35
        }
      },
      "8": {
        start: {
          line: 30,
          column: 8
        },
        end: {
          line: 32,
          column: 9
        }
      },
      "9": {
        start: {
          line: 31,
          column: 12
        },
        end: {
          line: 31,
          column: 39
        }
      },
      "10": {
        start: {
          line: 34,
          column: 4
        },
        end: {
          line: 36,
          column: 5
        }
      },
      "11": {
        start: {
          line: 35,
          column: 8
        },
        end: {
          line: 35,
          column: 29
        }
      },
      "12": {
        start: {
          line: 37,
          column: 4
        },
        end: {
          line: 37,
          column: 31
        }
      }
    },
    fnMap: {
      "0": {
        name: "extractErrorMessage",
        decl: {
          start: {
            line: 17,
            column: 16
          },
          end: {
            line: 17,
            column: 35
          }
        },
        loc: {
          start: {
            line: 17,
            column: 63
          },
          end: {
            line: 38,
            column: 1
          }
        },
        line: 17
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 17,
            column: 43
          },
          end: {
            line: 17,
            column: 61
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 17,
            column: 54
          },
          end: {
            line: 17,
            column: 61
          }
        }],
        line: 17
      },
      "1": {
        loc: {
          start: {
            line: 18,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 18,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        }, {
          start: {
            line: void 0,
            column: void 0
          },
          end: {
            line: void 0,
            column: void 0
          }
        }],
        line: 18
      },
      "2": {
        loc: {
          start: {
            line: 21,
            column: 8
          },
          end: {
            line: 25,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 21,
            column: 8
          },
          end: {
            line: 25,
            column: 9
          }
        }, {
          start: {
            line: void 0,
            column: void 0
          },
          end: {
            line: void 0,
            column: void 0
          }
        }],
        line: 21
      },
      "3": {
        loc: {
          start: {
            line: 21,
            column: 12
          },
          end: {
            line: 21,
            column: 102
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 21,
            column: 12
          },
          end: {
            line: 21,
            column: 55
          }
        }, {
          start: {
            line: 21,
            column: 59
          },
          end: {
            line: 21,
            column: 102
          }
        }],
        line: 21
      },
      "4": {
        loc: {
          start: {
            line: 22,
            column: 19
          },
          end: {
            line: 24,
            column: 36
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 23,
            column: 18
          },
          end: {
            line: 23,
            column: 38
          }
        }, {
          start: {
            line: 24,
            column: 18
          },
          end: {
            line: 24,
            column: 36
          }
        }],
        line: 22
      },
      "5": {
        loc: {
          start: {
            line: 26,
            column: 8
          },
          end: {
            line: 28,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 26,
            column: 8
          },
          end: {
            line: 28,
            column: 9
          }
        }, {
          start: {
            line: void 0,
            column: void 0
          },
          end: {
            line: void 0,
            column: void 0
          }
        }],
        line: 26
      },
      "6": {
        loc: {
          start: {
            line: 26,
            column: 12
          },
          end: {
            line: 26,
            column: 61
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 26,
            column: 12
          },
          end: {
            line: 26,
            column: 45
          }
        }, {
          start: {
            line: 26,
            column: 49
          },
          end: {
            line: 26,
            column: 61
          }
        }],
        line: 26
      },
      "7": {
        loc: {
          start: {
            line: 30,
            column: 8
          },
          end: {
            line: 32,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 30,
            column: 8
          },
          end: {
            line: 32,
            column: 9
          }
        }, {
          start: {
            line: void 0,
            column: void 0
          },
          end: {
            line: void 0,
            column: void 0
          }
        }],
        line: 30
      },
      "8": {
        loc: {
          start: {
            line: 30,
            column: 12
          },
          end: {
            line: 30,
            column: 41
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 30,
            column: 12
          },
          end: {
            line: 30,
            column: 18
          }
        }, {
          start: {
            line: 30,
            column: 22
          },
          end: {
            line: 30,
            column: 41
          }
        }],
        line: 30
      },
      "9": {
        loc: {
          start: {
            line: 34,
            column: 4
          },
          end: {
            line: 36,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 34,
            column: 4
          },
          end: {
            line: 36,
            column: 5
          }
        }, {
          start: {
            line: void 0,
            column: void 0
          },
          end: {
            line: void 0,
            column: void 0
          }
        }],
        line: 34
      },
      "10": {
        loc: {
          start: {
            line: 34,
            column: 8
          },
          end: {
            line: 34,
            column: 47
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 34,
            column: 8
          },
          end: {
            line: 34,
            column: 30
          }
        }, {
          start: {
            line: 34,
            column: 34
          },
          end: {
            line: 34,
            column: 47
          }
        }],
        line: 34
      },
      "11": {
        loc: {
          start: {
            line: 37,
            column: 11
          },
          end: {
            line: 37,
            column: 30
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 37,
            column: 11
          },
          end: {
            line: 37,
            column: 19
          }
        }, {
          start: {
            line: 37,
            column: 23
          },
          end: {
            line: 37,
            column: 30
          }
        }],
        line: 37
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0],
      "5": [0, 0],
      "6": [0, 0],
      "7": [0, 0],
      "8": [0, 0],
      "9": [0, 0],
      "10": [0, 0],
      "11": [0, 0]
    },
    inputSourceMap: {
      version: 3,
      file: "error.util.js",
      sourceRoot: "",
      sources: ["error.util.ts"],
      names: [],
      mappings: "AAAA;;;GAGG;AACH,OAAO,EAAE,iBAAiB,EAAE,MAAM,sBAAsB,CAAC;AAGzD,OAAO,EAAE,SAAS,EAAE,MAAM,2BAA2B,CAAC;AAEtD,0BAA0B;AAC1B,MAAM,WAAW,GAA2B;IAC1C,GAAG,EAAE,SAAS;IACd,GAAG,EAAE,YAAY;IACjB,GAAG,EAAE,YAAY;IACjB,GAAG,EAAE,QAAQ;IACb,GAAG,EAAE,cAAc;IACnB,GAAG,EAAE,OAAO;IACZ,GAAG,EAAE,eAAe;CACrB,CAAC;AAEF,MAAM,UAAU,mBAAmB,CAAC,KAAc,EAAE,QAAQ,GAAG,OAAO;IACpE,IAAI,KAAK,YAAY,iBAAiB,EAAE,CAAC;QACvC,MAAM,IAAI,GAAG,KAAK,CAAC,KAAwB,CAAC;QAC5C,wBAAwB;QACxB,IAAI,IAAI,EAAE,IAAI,KAAK,SAAS,CAAC,kBAAkB,IAAI,IAAI,EAAE,IAAI,KAAK,SAAS,CAAC,kBAAkB,EAAE,CAAC;YAC/F,OAAO,IAAI,CAAC,IAAI,KAAK,SAAS,CAAC,kBAAkB;gBAC/C,CAAC,CAAC,oBAAoB;gBACtB,CAAC,CAAC,kBAAkB,CAAC;QACzB,CAAC;QACD,IAAI,OAAO,IAAI,EAAE,OAAO,KAAK,QAAQ,IAAI,IAAI,CAAC,OAAO,EAAE,CAAC;YACtD,OAAO,IAAI,CAAC,OAAO,CAAC;QACtB,CAAC;QACD,MAAM,MAAM,GAAG,KAAK,CAAC,MAAM,CAAC;QAC5B,IAAI,MAAM,IAAI,WAAW,CAAC,MAAM,CAAC,EAAE,CAAC;YAClC,OAAO,WAAW,CAAC,MAAM,CAAC,CAAC;QAC7B,CAAC;IACH,CAAC;IACD,IAAI,KAAK,YAAY,KAAK,IAAI,KAAK,CAAC,OAAO,EAAE,CAAC;QAC5C,OAAO,KAAK,CAAC,OAAO,CAAC;IACvB,CAAC;IACD,OAAO,QAAQ,IAAI,OAAO,CAAC;AAC7B,CAAC",
      sourcesContent: ["/**\n * \u4ECE\u9519\u8BEF\u5BF9\u8C61\u4E2D\u63D0\u70BC\u7528\u6237\u53EF\u8BFB\u7684\u63D0\u793A\u6587\u6848\uFF08\u5BF9\u6807 React \u7248 client.ts extractErrorMessage\uFF09\u3002\n * \u4F18\u5148\u540E\u7AEF\u9519\u8BEF\u4F53\uFF1B\u4FDD\u7559\u62D2\u7EDD\u65F6\u7ED9\u51FA\u7B80\u6D01\u53CB\u597D\u7684\u4E00\u53E5\u3002\n */\nimport { HttpErrorResponse } from '@angular/common/http';\n\nimport type { ApiError } from '../../models/common.model';\nimport { ErrorCode } from '../../models/common.model';\n\n/** \u975E\u4E1A\u52A1\u5F02\u5E38\u7684 HTTP \u72B6\u6001\u9ED8\u8BA4\u6587\u6848\u3002 */\nconst STATUS_TEXT: Record<number, string> = {\n  400: '\u8BF7\u6C42\u53C2\u6570\u6709\u8BEF\u3002',\n  401: '\u672A\u6388\u6743\u6216\u767B\u5F55\u5DF2\u8FC7\u671F\u3002',\n  403: '\u6CA1\u6709\u6743\u9650\u6267\u884C\u8BE5\u64CD\u4F5C\u3002',\n  404: '\u8D44\u6E90\u4E0D\u5B58\u5728\u3002',\n  409: '\u8D44\u6E90\u51B2\u7A81\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5\u3002',\n  413: '\u6587\u4EF6\u8FC7\u5927\u3002',\n  429: '\u64CD\u4F5C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002',\n};\n\nexport function extractErrorMessage(error: unknown, fallback = '\u64CD\u4F5C\u5931\u8D25\u3002'): string {\n  if (error instanceof HttpErrorResponse) {\n    const data = error.error as ApiError | null;\n    // \u4FDD\u7559\u62D2\u7EDD\uFF1A\u7B80\u6D01\u53CB\u597D\uFF0C\u800C\u4E0D\u662F\u5197\u957F\u7684\u540E\u7AEF\u6587\u6848\u3002\n    if (data?.code === ErrorCode.FileUnderRetention || data?.code === ErrorCode.FileUnderLegalHold) {\n      return data.code === ErrorCode.FileUnderLegalHold\n        ? '\u8BE5\u6587\u4EF6\u5DF2\u88AB\u6CD5\u5B9A\u4FDD\u7559\uFF0C\u7981\u6B62\u5220\u9664/\u8986\u76D6\u3002'\n        : '\u8BE5\u6587\u4EF6\u5DF2\u88AB\u4FDD\u7559\uFF0C\u7981\u6B62\u5220\u9664/\u8986\u76D6\u3002';\n    }\n    if (typeof data?.message === 'string' && data.message) {\n      return data.message;\n    }\n    const status = error.status;\n    if (status && STATUS_TEXT[status]) {\n      return STATUS_TEXT[status];\n    }\n  }\n  if (error instanceof Error && error.message) {\n    return error.message;\n  }\n  return fallback || '\u64CD\u4F5C\u5931\u8D25\u3002';\n}\n"]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "c5205baeefb9b30dd5ecd8286e8ac0982d1819f6"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    cov_2jy268vvn4 = function() {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2jy268vvn4();
var STATUS_TEXT2 = (cov_2jy268vvn4().s[0]++, {
  400: "\u8BF7\u6C42\u53C2\u6570\u6709\u8BEF\u3002",
  401: "\u672A\u6388\u6743\u6216\u767B\u5F55\u5DF2\u8FC7\u671F\u3002",
  403: "\u6CA1\u6709\u6743\u9650\u6267\u884C\u8BE5\u64CD\u4F5C\u3002",
  404: "\u8D44\u6E90\u4E0D\u5B58\u5728\u3002",
  409: "\u8D44\u6E90\u51B2\u7A81\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5\u3002",
  413: "\u6587\u4EF6\u8FC7\u5927\u3002",
  429: "\u64CD\u4F5C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002"
});
function extractErrorMessage(error, fallback = (cov_2jy268vvn4().b[0][0]++, "\u64CD\u4F5C\u5931\u8D25\u3002")) {
  cov_2jy268vvn4().f[0]++;
  cov_2jy268vvn4().s[1]++;
  if (error instanceof HttpErrorResponse) {
    cov_2jy268vvn4().b[1][0]++;
    const data = (cov_2jy268vvn4().s[2]++, error.error);
    cov_2jy268vvn4().s[3]++;
    if ((cov_2jy268vvn4().b[3][0]++, data?.code === ErrorCode.FileUnderRetention) || (cov_2jy268vvn4().b[3][1]++, data?.code === ErrorCode.FileUnderLegalHold)) {
      cov_2jy268vvn4().b[2][0]++;
      cov_2jy268vvn4().s[4]++;
      return data.code === ErrorCode.FileUnderLegalHold ? (cov_2jy268vvn4().b[4][0]++, "\u8BE5\u6587\u4EF6\u5DF2\u88AB\u6CD5\u5B9A\u4FDD\u7559\uFF0C\u7981\u6B62\u5220\u9664/\u8986\u76D6\u3002") : (cov_2jy268vvn4().b[4][1]++, "\u8BE5\u6587\u4EF6\u5DF2\u88AB\u4FDD\u7559\uFF0C\u7981\u6B62\u5220\u9664/\u8986\u76D6\u3002");
    } else {
      cov_2jy268vvn4().b[2][1]++;
    }
    cov_2jy268vvn4().s[5]++;
    if ((cov_2jy268vvn4().b[6][0]++, typeof data?.message === "string") && (cov_2jy268vvn4().b[6][1]++, data.message)) {
      cov_2jy268vvn4().b[5][0]++;
      cov_2jy268vvn4().s[6]++;
      return data.message;
    } else {
      cov_2jy268vvn4().b[5][1]++;
    }
    const status = (cov_2jy268vvn4().s[7]++, error.status);
    cov_2jy268vvn4().s[8]++;
    if ((cov_2jy268vvn4().b[8][0]++, status) && (cov_2jy268vvn4().b[8][1]++, STATUS_TEXT2[status])) {
      cov_2jy268vvn4().b[7][0]++;
      cov_2jy268vvn4().s[9]++;
      return STATUS_TEXT2[status];
    } else {
      cov_2jy268vvn4().b[7][1]++;
    }
  } else {
    cov_2jy268vvn4().b[1][1]++;
  }
  cov_2jy268vvn4().s[10]++;
  if ((cov_2jy268vvn4().b[10][0]++, error instanceof Error) && (cov_2jy268vvn4().b[10][1]++, error.message)) {
    cov_2jy268vvn4().b[9][0]++;
    cov_2jy268vvn4().s[11]++;
    return error.message;
  } else {
    cov_2jy268vvn4().b[9][1]++;
  }
  cov_2jy268vvn4().s[12]++;
  return (cov_2jy268vvn4().b[11][0]++, fallback) || (cov_2jy268vvn4().b[11][1]++, "\u64CD\u4F5C\u5931\u8D25\u3002");
}

// src/app/core/http/error.util.spec.ts
describe("extractErrorMessage", () => {
  it("HttpErrorResponse 401 \u4F7F\u7528\u72B6\u6001\u9ED8\u8BA4\u6587\u6848", () => {
    const err = new HttpErrorResponse({ status: 401, statusText: "Unauthorized" });
    expect(extractErrorMessage(err)).toBe("\u672A\u6388\u6743\u6216\u767B\u5F55\u5DF2\u8FC7\u671F\u3002");
  });
  it("HttpErrorResponse 404 \u4F7F\u7528\u72B6\u6001\u9ED8\u8BA4\u6587\u6848", () => {
    const err = new HttpErrorResponse({ status: 404 });
    expect(extractErrorMessage(err)).toBe("\u8D44\u6E90\u4E0D\u5B58\u5728\u3002");
  });
  it("\u4F18\u5148\u53D6\u540E\u7AEF\u4E1A\u52A1 message", () => {
    const err = new HttpErrorResponse({
      status: 400,
      error: { code: "ValidationFailed", message: "\u6587\u4EF6\u540D\u4E0D\u80FD\u4E3A\u7A7A\u3002" }
    });
    expect(extractErrorMessage(err)).toBe("\u6587\u4EF6\u540D\u4E0D\u80FD\u4E3A\u7A7A\u3002");
  });
  it("\u4FDD\u7559\u62D2\u7EDD\uFF08FileUnderRetention / FileUnderLegalHold\uFF09\u7ED9\u4E13\u7528\u6587\u6848", () => {
    const r = new HttpErrorResponse({
      status: 409,
      error: { code: ErrorCode.FileUnderRetention, message: "raw" }
    });
    expect(extractErrorMessage(r)).toBe("\u8BE5\u6587\u4EF6\u5DF2\u88AB\u4FDD\u7559\uFF0C\u7981\u6B62\u5220\u9664/\u8986\u76D6\u3002");
    const l = new HttpErrorResponse({
      status: 409,
      error: { code: ErrorCode.FileUnderLegalHold, message: "raw" }
    });
    expect(extractErrorMessage(l)).toBe("\u8BE5\u6587\u4EF6\u5DF2\u88AB\u6CD5\u5B9A\u4FDD\u7559\uFF0C\u7981\u6B62\u5220\u9664/\u8986\u76D6\u3002");
  });
  it("Error \u5B9E\u4F8B\u53D6 message", () => {
    expect(extractErrorMessage(new Error("\u78C1\u76D8\u5DF2\u6EE1\u3002"))).toBe("\u78C1\u76D8\u5DF2\u6EE1\u3002");
  });
  it("\u672A\u77E5\u7C7B\u578B\u56DE\u9000\u9ED8\u8BA4\u6587\u6848", () => {
    expect(extractErrorMessage("some string")).toBe("\u64CD\u4F5C\u5931\u8D25\u3002");
    expect(extractErrorMessage(null)).toBe("\u64CD\u4F5C\u5931\u8D25\u3002");
    expect(extractErrorMessage(void 0)).toBe("\u64CD\u4F5C\u5931\u8D25\u3002");
    expect(extractErrorMessage("x", "\u81EA\u5B9A\u4E49\u515C\u5E95\u3002")).toBe("\u81EA\u5B9A\u4E49\u515C\u5E95\u3002");
  });
  it("\u540E\u7AEF message \u4E3A\u7A7A\u65F6\u6309\u72B6\u6001\u515C\u5E95", () => {
    const err = new HttpErrorResponse({ status: 429, error: { code: "X", message: "" } });
    expect(extractErrorMessage(err)).toBe("\u64CD\u4F5C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002");
  });
});
//# debugId=f6af03a3-8cd7-520b-995f-430e4af7f864
//# sourceMappingURL=spec-app-core-http-error.util.spec.js.map
