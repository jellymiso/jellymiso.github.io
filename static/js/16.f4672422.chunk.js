(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[16],{587:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return h}));var r=t(40),i=t(20);var o=t(28),c=(t(4),t(0)),a=t.n(c),l=t(129);function u(e,n){var t=Object.create(null);return e&&c.Children.map(e,(function(e){return e})).forEach((function(e){t[e.key]=function(e){return n&&Object(c.isValidElement)(e)?n(e):e}(e)})),t}function d(e,n,t){return null!=t[n]?t[n]:e.props[n]}function s(e,n,t){var r=u(e.children),i=function(e,n){function t(t){return t in n?n[t]:e[t]}e=e||{},n=n||{};var r,i=Object.create(null),o=[];for(var c in e)c in n?o.length&&(i[c]=o,o=[]):o.push(c);var a={};for(var l in n){if(i[l])for(r=0;r<i[l].length;r++){var u=i[l][r];a[i[l][r]]=t(u)}a[l]=t(l)}for(r=0;r<o.length;r++)a[o[r]]=t(o[r]);return a}(n,r);return Object.keys(i).forEach((function(o){var a=i[o];if(Object(c.isValidElement)(a)){var l=o in n,u=o in r,s=n[o],p=Object(c.isValidElement)(s)&&!s.props.in;!u||l&&!p?u||!l||p?u&&l&&Object(c.isValidElement)(s)&&(i[o]=Object(c.cloneElement)(a,{onExited:t.bind(null,a),in:s.props.in,exit:d(a,"exit",e),enter:d(a,"enter",e)})):i[o]=Object(c.cloneElement)(a,{in:!1}):i[o]=Object(c.cloneElement)(a,{onExited:t.bind(null,a),in:!0,exit:d(a,"exit",e),enter:d(a,"enter",e)})}})),i}var p=Object.values||function(e){return Object.keys(e).map((function(n){return e[n]}))},f=function(e){function n(n,t){var r,i=(r=e.call(this,n,t)||this).handleExited.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(r));return r.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},r}Object(o.a)(n,e);var t=n.prototype;return t.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},t.componentWillUnmount=function(){this.mounted=!1},n.getDerivedStateFromProps=function(e,n){var t,r,i=n.children,o=n.handleExited;return{children:n.firstRender?(t=e,r=o,u(t.children,(function(e){return Object(c.cloneElement)(e,{onExited:r.bind(null,e),in:!0,appear:d(e,"appear",t),enter:d(e,"enter",t),exit:d(e,"exit",t)})}))):s(e,i,o),firstRender:!1}},t.handleExited=function(e,n){var t=u(this.props.children);e.key in t||(e.props.onExited&&e.props.onExited(n),this.mounted&&this.setState((function(n){var t=Object(i.a)({},n.children);return delete t[e.key],{children:t}})))},t.render=function(){var e=this.props,n=e.component,t=e.childFactory,i=Object(r.a)(e,["component","childFactory"]),o=this.state.contextValue,c=p(this.state.children).map(t);return delete i.appear,delete i.enter,delete i.exit,null===n?a.a.createElement(l.a.Provider,{value:o},c):a.a.createElement(l.a.Provider,{value:o},a.a.createElement(n,i,c))},n}(a.a.Component);f.propTypes={},f.defaultProps={component:"div",childFactory:function(e){return e}};var h=f}}]);