// node_modules/@angular/build/src/builders/karma/polyfills/jasmine_global.js
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
(function() {
  "use strict";
  window.toString = function() {
    return "[object GjsGlobal]";
  };
})();

// node_modules/@angular/build/src/builders/karma/polyfills/init_sourcemaps.js
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
globalThis.sourceMapSupport?.install();
//# debugId=a0b755d6-3f3b-579a-b7e9-76b75604a315
//# sourceMappingURL=polyfills.js.map
