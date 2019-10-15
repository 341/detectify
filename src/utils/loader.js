const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

if (canUseDOM) {
    window.$ = window.jQuery = require('jquery');
}
