(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[17],{586:function(e,t,n){"use strict";n.r(t),n.d(t,"initialize",(function(){return le})),n.d(t,"addTrackers",(function(){return fe})),n.d(t,"ga",(function(){return se})),n.d(t,"set",(function(){return pe})),n.d(t,"send",(function(){return ge})),n.d(t,"pageview",(function(){return be})),n.d(t,"modalview",(function(){return de})),n.d(t,"timing",(function(){return ye})),n.d(t,"event",(function(){return ve})),n.d(t,"exception",(function(){return me})),n.d(t,"plugin",(function(){return he})),n.d(t,"outboundLink",(function(){return Oe})),n.d(t,"testModeAPI",(function(){return we})),n.d(t,"OutboundLink",(function(){return je}));var r={};n.r(r),n.d(r,"addTrackers",(function(){return B})),n.d(r,"initialize",(function(){return U})),n.d(r,"ga",(function(){return Z})),n.d(r,"set",(function(){return H})),n.d(r,"send",(function(){return Q})),n.d(r,"pageview",(function(){return W})),n.d(r,"modalview",(function(){return X})),n.d(r,"timing",(function(){return Y})),n.d(r,"event",(function(){return ee})),n.d(r,"exception",(function(){return te})),n.d(r,"plugin",(function(){return ne})),n.d(r,"outboundLink",(function(){return re})),n.d(r,"testModeAPI",(function(){return oe})),n.d(r,"default",(function(){return ie}));var o=n(0),i=n.n(o),a=n(4),c=n.n(a);function u(e){console.warn("[react-ga]",e)}function l(e){return(l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){O(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h(e);if(t){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return v(this,n)}}function v(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?m(e):t}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(a,e);var t,n,r,o=y(a);function a(){var e;g(this,a);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return O(m(e=o.call.apply(o,[this].concat(n))),"handleClick",(function(t){var n=e.props,r=n.target,o=n.eventLabel,i=n.to,c=n.onClick,u=n.trackerNames,l={label:o},f="_blank"!==r,s=!(t.ctrlKey||t.shiftKey||t.metaKey||1===t.button);f&&s?(t.preventDefault(),a.trackLink(l,(function(){window.location.href=i}),u)):a.trackLink(l,(function(){}),u),c&&c(t)})),e}return t=a,(n=[{key:"render",value:function(){var e=this.props,t=e.to,n=e.target,r=s(s({},p(e,["to","target"])),{},{target:n,href:t,onClick:this.handleClick});return"_blank"===n&&(r.rel="".concat(r.rel?r.rel:""," noopener noreferrer").trim()),delete r.eventLabel,delete r.trackerNames,i.a.createElement("a",r)}}])&&b(t.prototype,n),r&&b(t,r),a}(o.Component);O(w,"trackLink",(function(){u("ga tracking not enabled")})),w.propTypes={eventLabel:c.a.string.isRequired,target:c.a.string,to:c.a.string,onClick:c.a.func,trackerNames:c.a.arrayOf(c.a.string)},w.defaultProps={target:null,to:null,onClick:null,trackerNames:null};function j(e){return"string"===typeof(t=e)&&-1!==t.indexOf("@")?(u("This arg looks like an email address, redacting."),"REDACTED (Potential Email Address)"):e;var t}function k(e){return e&&e.toString().replace(/^\s+|\s+$/g,"")}var P=/^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;function A(e){return k(e).replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,(function(e,t,n){return t>0&&t+e.length!==n.length&&e.search(P)>-1&&":"!==n.charAt(t-2)&&("-"!==n.charAt(t+e.length)||"-"===n.charAt(t-1))&&n.charAt(t-1).search(/[^\s-]/)<0?e.toLowerCase():e.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1)}))}var S=!1;function E(e){console.info("[react-ga]",e)}var D=[],x={calls:D,ga:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];D.push([].concat(t))},resetCalls:function(){D.length=0}};function T(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function q(e){return(q="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function L(e){return function(e){if(Array.isArray(e))return I(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return I(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var _="undefined"===typeof window||"undefined"===typeof document,J=!1,R=!0,z=!1,M=!0,G=!0,F=function(){var e;return z?x.ga.apply(x,arguments):!_&&(window.ga?(e=window).ga.apply(e,arguments):u("ReactGA.initialize must be called first or GoogleAnalytics should be loaded manually"))};function K(e){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=e||"";return t&&(r=A(e)),n&&(r=j(r)),r}(e,R,G)}function V(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=n[0];"string"===typeof o?(!M&&Array.isArray(e)||F.apply(void 0,n),Array.isArray(e)&&e.forEach((function(e){F.apply(void 0,L(["".concat(e,".").concat(o)].concat(n.slice(1))))}))):u("ga command must be a string")}function $(e,t){e?t&&(t.debug&&!0===t.debug&&(J=!0),!1===t.titleCase&&(R=!1),!1===t.redactEmail&&(G=!1),t.useExistingGa)||(t&&t.gaOptions?F("create",e,t.gaOptions):F("create",e,"auto")):u("gaTrackingID is required in initialize()")}function B(e,t){return Array.isArray(e)?e.forEach((function(e){"object"===q(e)?$(e.trackingId,e):u("All configs must be an object")})):$(e,t),!0}function U(e,t){if(t&&!0===t.testMode)z=!0;else{if(_)return;t&&!0===t.standardImplementation||function(e){if(!S){S=!0;var t="https://www.google-analytics.com/analytics.js";e&&e.gaAddress?t=e.gaAddress:e&&e.debug&&(t="https://www.google-analytics.com/analytics_debug.js");var n,r,o,i,a,c,u,l=e&&e.onerror;n=window,r=document,o="script",i=t,a="ga",n.GoogleAnalyticsObject=a,n.ga=n.ga||function(){(n.ga.q=n.ga.q||[]).push(arguments)},n.ga.l=1*new Date,c=r.createElement(o),u=r.getElementsByTagName(o)[0],c.async=1,c.src=i,c.onerror=l,u.parentNode.insertBefore(c,u)}}(t)}M=!t||"boolean"!==typeof t.alwaysSendToDefaultTracker||t.alwaysSendToDefaultTracker,B(e,t)}function Z(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.length>0&&(F.apply(void 0,t),J&&(E("called ga('arguments');"),E("with arguments: ".concat(JSON.stringify(t))))),window.ga}function H(e,t){e?"object"===q(e)?(0===Object.keys(e).length&&u("empty `fieldsObject` given to .set()"),V(t,"set",e),J&&(E("called ga('set', fieldsObject);"),E("with fieldsObject: ".concat(JSON.stringify(e))))):u("Expected `fieldsObject` arg to be an Object"):u("`fieldsObject` is required in .set()")}function Q(e,t){V(t,"send",e),J&&(E("called ga('send', fieldObject);"),E("with fieldObject: ".concat(JSON.stringify(e))),E("with trackers: ".concat(JSON.stringify(t))))}function W(e,t,n){if(e){var r=k(e);if(""!==r){var o={};if(n&&(o.title=n),V(t,"send",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){N(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({hitType:"pageview",page:r},o)),J){E("called ga('send', 'pageview', path);");var i="";n&&(i=" and title: ".concat(n)),E("with path: ".concat(r).concat(i))}}else u("path cannot be an empty string in .pageview()")}else u("path is required in .pageview()")}function X(e,t){if(e){var n,r="/"===(n=k(e)).substring(0,1)?n.substring(1):n;if(""!==r){var o="/modal/".concat(r);V(t,"send","pageview",o),J&&(E("called ga('send', 'pageview', path);"),E("with path: ".concat(o)))}else u("modalName cannot be an empty string or a single / in .modalview()")}else u("modalName is required in .modalview(modalName)")}function Y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.category,n=e.variable,r=e.value,o=e.label,i=arguments.length>1?arguments[1]:void 0;if(t&&n&&"number"===typeof r){var a={hitType:"timing",timingCategory:K(t),timingVar:K(n),timingValue:r};o&&(a.timingLabel=K(o)),Q(a,i)}else u("args.category, args.variable AND args.value are required in timing() AND args.value has to be a number")}function ee(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.category,n=e.action,r=e.label,o=e.value,i=e.nonInteraction,a=e.transport,c=T(e,["category","action","label","value","nonInteraction","transport"]),l=arguments.length>1?arguments[1]:void 0;if(t&&n){var f={hitType:"event",eventCategory:K(t),eventAction:K(n)};r&&(f.eventLabel=K(r)),"undefined"!==typeof o&&("number"!==typeof o?u("Expected `args.value` arg to be a Number."):f.eventValue=o),"undefined"!==typeof i&&("boolean"!==typeof i?u("`args.nonInteraction` must be a boolean."):f.nonInteraction=i),"undefined"!==typeof a&&("string"!==typeof a?u("`args.transport` must be a string."):(-1===["beacon","xhr","image"].indexOf(a)&&u("`args.transport` must be either one of these values: `beacon`, `xhr` or `image`"),f.transport=a)),Object.keys(c).filter((function(e){return"dimension"===e.substr(0,"dimension".length)})).forEach((function(e){f[e]=c[e]})),Object.keys(c).filter((function(e){return"metric"===e.substr(0,"metric".length)})).forEach((function(e){f[e]=c[e]})),Q(f,l)}else u("args.category AND args.action are required in event()")}function te(e,t){var n=e.description,r=e.fatal,o={hitType:"exception"};n&&(o.exDescription=K(n)),"undefined"!==typeof r&&("boolean"!==typeof r?u("`args.fatal` must be a boolean."):o.exFatal=r),Q(o,t)}var ne={require:function(e,t,n){if(e){var r=k(e);if(""!==r){var o=n?"".concat(n,".require"):"require";if(t){if("object"!==q(t))return void u("Expected `options` arg to be an Object");0===Object.keys(t).length&&u("Empty `options` given to .require()"),Z(o,r,t),J&&E("called ga('require', '".concat(r,"', ").concat(JSON.stringify(t)))}else Z(o,r),J&&E("called ga('require', '".concat(r,"');"))}else u("`name` cannot be an empty string in .require()")}else u("`name` is required in .require()")},execute:function(e,t){for(var n,r,o=arguments.length,i=new Array(o>2?o-2:0),a=2;a<o;a++)i[a-2]=arguments[a];if(1===i.length?n=i[0]:(r=i[0],n=i[1]),"string"!==typeof e)u("Expected `pluginName` arg to be a String.");else if("string"!==typeof t)u("Expected `action` arg to be a String.");else{var c="".concat(e,":").concat(t);n=n||null,r&&n?(Z(c,r,n),J&&(E("called ga('".concat(c,"');")),E('actionType: "'.concat(r,'" with payload: ').concat(JSON.stringify(n))))):n?(Z(c,n),J&&(E("called ga('".concat(c,"');")),E("with payload: ".concat(JSON.stringify(n))))):(Z(c),J&&E("called ga('".concat(c,"');")))}}};function re(e,t,n){if("function"===typeof t)if(e&&e.label){var r={hitType:"event",eventCategory:"Outbound",eventAction:"Click",eventLabel:K(e.label)},o=!1,i=setTimeout((function(){o=!0,t()}),250);r.hitCallback=function(){clearTimeout(i),o||t()},Q(r,n)}else u("args.label is required in outboundLink()");else u("hitCallback function is required")}var oe=x,ie={initialize:U,ga:Z,set:H,send:Q,pageview:W,modalview:X,timing:Y,event:ee,exception:te,plugin:ne,outboundLink:re,testModeAPI:x};function ae(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ce(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ae(Object(n),!0).forEach((function(t){ue(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ae(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ue(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var le=U,fe=B,se=Z,pe=H,ge=Q,be=W,de=X,ye=Y,ve=ee,me=te,he=ne,Oe=re,we=oe;w.origTrackLink=w.trackLink,w.trackLink=re;var je=w;t.default=ce(ce({},r),{},{OutboundLink:je})}}]);
//# sourceMappingURL=17.3a69d526.chunk.js.map