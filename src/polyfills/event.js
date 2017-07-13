/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sets the Event polyfill if it does not exist.
 * @param {!Window} win
 */
export function install(win) {
  // win.Event is a function on Edge, Chrome, FF, Safari but
  // is an object on IE 11.
  if (typeof win.Event === 'function') {
    return;
  }

  function Event(name, params) {
    params = params || {bubbles: false, cancelable: false};
    const evt = win.document.createEvent('Event');
    evt.initEvent(
        name,
        params.bubbles,
        params.cancelable
    );
    return evt;
  }

  // supports >= IE 9. Below IE 9, window.Event.prototype is undefined
  Event.prototype = win.Event.prototype;

  win.Event = Event;
}
