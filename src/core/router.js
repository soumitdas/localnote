// https://github.com/BusinessDuck/html5-history-router/blob/master/lib/router.esm.js

export default class Router {
  constructor() {
    this.routes = [];
    this._listener = () => this._onLocationChange();
    this._subscribe();
    window.addEventListener("DOMContentLoaded", this._listener);
    this.defaultHandler = function () {};
  }

  dispose() {
    this._prevState = null;
    this._prevUrl = null;
    this._unsubscribe();
  }

  push(url, state) {
    if (url === void 0) {
      url = "/";
    }
    if (state === void 0) {
      state = {};
    }
    if (url !== location.pathname) {
      history.pushState(state, document.title, url);
    }
    return this._onLocationChange();
  }

  back() {
    history.back();
  }

  on(pathName, handler) {
    if (typeof handler !== "function") {
      throw new Error("handler should be a function");
    }
    this.routes.push({
      pathName,
      handler,
    });
    //return this;
  }

  default(handler) {
    if (typeof handler !== "function") {
      throw new Error("handler should be a function");
    }
    this.defaultHandler = handler;
  }

  /**
   * Subscribe to browser events
   */
  _subscribe() {
    if (!this._subscribed) {
      window.addEventListener("popstate", this._listener);
      this._subscribed = true;
    }
  }

  /**
   * Unsubscribe to browser events
   */
  _unsubscribe() {
    if (this._subscribed) {
      window.removeEventListener("popstate", this._listener);
      this._subscribed = false;
    }
  }

  _onLocationChange() {
    const pathName = window.location.pathname;
    const match = this.routes.find(
      (route) => pathName.match(this._pathToRegex(route.pathName)) !== null
    );
    if (match && match.handler) {
      const result = pathName.match(this._pathToRegex(match.pathName));
      this.params = this._getParams({ ...match, result });
      //console.log(this.params);
      match.handler(this.params);
    } else {
      this.defaultHandler();
    }
  }

  _pathToRegex(path) {
    return new RegExp(
      "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"
    );
  }

  _getParams(match) {
    const values = match.result.slice(1);
    const keys = Array.from(match.pathName.matchAll(/:(\w+)/g)).map(
      (result) => result[1]
    );

    return Object.fromEntries(
      keys.map((key, i) => {
        return [key, values[i]];
      })
    );
  }
}
