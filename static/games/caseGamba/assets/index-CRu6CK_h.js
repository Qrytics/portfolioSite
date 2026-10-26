var wx=Object.defineProperty;var Ex=(s,e,t)=>e in s?wx(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var Kn=(s,e,t)=>Ex(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=t(a);fetch(a.href,l)}})();function Qm(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Tu={exports:{}},zo={},bu={exports:{}},vt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zp;function Tx(){if(zp)return vt;zp=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),d=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),y=Symbol.iterator;function S(E){return E===null||typeof E!="object"?null:(E=y&&E[y]||E["@@iterator"],typeof E=="function"?E:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,C={};function v(E,H,xe){this.props=E,this.context=H,this.refs=C,this.updater=xe||M}v.prototype.isReactComponent={},v.prototype.setState=function(E,H){if(typeof E!="object"&&typeof E!="function"&&E!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,E,H,"setState")},v.prototype.forceUpdate=function(E){this.updater.enqueueForceUpdate(this,E,"forceUpdate")};function _(){}_.prototype=v.prototype;function N(E,H,xe){this.props=E,this.context=H,this.refs=C,this.updater=xe||M}var U=N.prototype=new _;U.constructor=N,A(U,v.prototype),U.isPureReactComponent=!0;var T=Array.isArray,Y=Object.prototype.hasOwnProperty,O={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function W(E,H,xe){var X,ee={},ue=null,re=null;if(H!=null)for(X in H.ref!==void 0&&(re=H.ref),H.key!==void 0&&(ue=""+H.key),H)Y.call(H,X)&&!I.hasOwnProperty(X)&&(ee[X]=H[X]);var me=arguments.length-2;if(me===1)ee.children=xe;else if(1<me){for(var we=Array(me),Pe=0;Pe<me;Pe++)we[Pe]=arguments[Pe+2];ee.children=we}if(E&&E.defaultProps)for(X in me=E.defaultProps,me)ee[X]===void 0&&(ee[X]=me[X]);return{$$typeof:s,type:E,key:ue,ref:re,props:ee,_owner:O.current}}function L(E,H){return{$$typeof:s,type:E.type,key:H,ref:E.ref,props:E.props,_owner:E._owner}}function w(E){return typeof E=="object"&&E!==null&&E.$$typeof===s}function z(E){var H={"=":"=0",":":"=2"};return"$"+E.replace(/[=:]/g,function(xe){return H[xe]})}var ie=/\/+/g;function Q(E,H){return typeof E=="object"&&E!==null&&E.key!=null?z(""+E.key):H.toString(36)}function de(E,H,xe,X,ee){var ue=typeof E;(ue==="undefined"||ue==="boolean")&&(E=null);var re=!1;if(E===null)re=!0;else switch(ue){case"string":case"number":re=!0;break;case"object":switch(E.$$typeof){case s:case e:re=!0}}if(re)return re=E,ee=ee(re),E=X===""?"."+Q(re,0):X,T(ee)?(xe="",E!=null&&(xe=E.replace(ie,"$&/")+"/"),de(ee,H,xe,"",function(Pe){return Pe})):ee!=null&&(w(ee)&&(ee=L(ee,xe+(!ee.key||re&&re.key===ee.key?"":(""+ee.key).replace(ie,"$&/")+"/")+E)),H.push(ee)),1;if(re=0,X=X===""?".":X+":",T(E))for(var me=0;me<E.length;me++){ue=E[me];var we=X+Q(ue,me);re+=de(ue,H,xe,we,ee)}else if(we=S(E),typeof we=="function")for(E=we.call(E),me=0;!(ue=E.next()).done;)ue=ue.value,we=X+Q(ue,me++),re+=de(ue,H,xe,we,ee);else if(ue==="object")throw H=String(E),Error("Objects are not valid as a React child (found: "+(H==="[object Object]"?"object with keys {"+Object.keys(E).join(", ")+"}":H)+"). If you meant to render a collection of children, use an array instead.");return re}function pe(E,H,xe){if(E==null)return E;var X=[],ee=0;return de(E,X,"","",function(ue){return H.call(xe,ue,ee++)}),X}function le(E){if(E._status===-1){var H=E._result;H=H(),H.then(function(xe){(E._status===0||E._status===-1)&&(E._status=1,E._result=xe)},function(xe){(E._status===0||E._status===-1)&&(E._status=2,E._result=xe)}),E._status===-1&&(E._status=0,E._result=H)}if(E._status===1)return E._result.default;throw E._result}var he={current:null},G={transition:null},fe={ReactCurrentDispatcher:he,ReactCurrentBatchConfig:G,ReactCurrentOwner:O};function D(){throw Error("act(...) is not supported in production builds of React.")}return vt.Children={map:pe,forEach:function(E,H,xe){pe(E,function(){H.apply(this,arguments)},xe)},count:function(E){var H=0;return pe(E,function(){H++}),H},toArray:function(E){return pe(E,function(H){return H})||[]},only:function(E){if(!w(E))throw Error("React.Children.only expected to receive a single React element child.");return E}},vt.Component=v,vt.Fragment=t,vt.Profiler=a,vt.PureComponent=N,vt.StrictMode=r,vt.Suspense=h,vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fe,vt.act=D,vt.cloneElement=function(E,H,xe){if(E==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+E+".");var X=A({},E.props),ee=E.key,ue=E.ref,re=E._owner;if(H!=null){if(H.ref!==void 0&&(ue=H.ref,re=O.current),H.key!==void 0&&(ee=""+H.key),E.type&&E.type.defaultProps)var me=E.type.defaultProps;for(we in H)Y.call(H,we)&&!I.hasOwnProperty(we)&&(X[we]=H[we]===void 0&&me!==void 0?me[we]:H[we])}var we=arguments.length-2;if(we===1)X.children=xe;else if(1<we){me=Array(we);for(var Pe=0;Pe<we;Pe++)me[Pe]=arguments[Pe+2];X.children=me}return{$$typeof:s,type:E.type,key:ee,ref:ue,props:X,_owner:re}},vt.createContext=function(E){return E={$$typeof:d,_currentValue:E,_currentValue2:E,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},E.Provider={$$typeof:l,_context:E},E.Consumer=E},vt.createElement=W,vt.createFactory=function(E){var H=W.bind(null,E);return H.type=E,H},vt.createRef=function(){return{current:null}},vt.forwardRef=function(E){return{$$typeof:u,render:E}},vt.isValidElement=w,vt.lazy=function(E){return{$$typeof:x,_payload:{_status:-1,_result:E},_init:le}},vt.memo=function(E,H){return{$$typeof:p,type:E,compare:H===void 0?null:H}},vt.startTransition=function(E){var H=G.transition;G.transition={};try{E()}finally{G.transition=H}},vt.unstable_act=D,vt.useCallback=function(E,H){return he.current.useCallback(E,H)},vt.useContext=function(E){return he.current.useContext(E)},vt.useDebugValue=function(){},vt.useDeferredValue=function(E){return he.current.useDeferredValue(E)},vt.useEffect=function(E,H){return he.current.useEffect(E,H)},vt.useId=function(){return he.current.useId()},vt.useImperativeHandle=function(E,H,xe){return he.current.useImperativeHandle(E,H,xe)},vt.useInsertionEffect=function(E,H){return he.current.useInsertionEffect(E,H)},vt.useLayoutEffect=function(E,H){return he.current.useLayoutEffect(E,H)},vt.useMemo=function(E,H){return he.current.useMemo(E,H)},vt.useReducer=function(E,H,xe){return he.current.useReducer(E,H,xe)},vt.useRef=function(E){return he.current.useRef(E)},vt.useState=function(E){return he.current.useState(E)},vt.useSyncExternalStore=function(E,H,xe){return he.current.useSyncExternalStore(E,H,xe)},vt.useTransition=function(){return he.current.useTransition()},vt.version="18.3.1",vt}var Bp;function ef(){return Bp||(Bp=1,bu.exports=Tx()),bu.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vp;function bx(){if(Vp)return zo;Vp=1;var s=ef(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(u,h,p){var x,y={},S=null,M=null;p!==void 0&&(S=""+p),h.key!==void 0&&(S=""+h.key),h.ref!==void 0&&(M=h.ref);for(x in h)r.call(h,x)&&!l.hasOwnProperty(x)&&(y[x]=h[x]);if(u&&u.defaultProps)for(x in h=u.defaultProps,h)y[x]===void 0&&(y[x]=h[x]);return{$$typeof:e,type:u,key:S,ref:M,props:y,_owner:a.current}}return zo.Fragment=t,zo.jsx=d,zo.jsxs=d,zo}var Gp;function Cx(){return Gp||(Gp=1,Tu.exports=bx()),Tu.exports}var g=Cx(),mt=ef();const Ax=Qm(mt);var sl={},Cu={exports:{}},Rn={},Au={exports:{}},Ru={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hp;function Rx(){return Hp||(Hp=1,(function(s){function e(G,fe){var D=G.length;G.push(fe);e:for(;0<D;){var E=D-1>>>1,H=G[E];if(0<a(H,fe))G[E]=fe,G[D]=H,D=E;else break e}}function t(G){return G.length===0?null:G[0]}function r(G){if(G.length===0)return null;var fe=G[0],D=G.pop();if(D!==fe){G[0]=D;e:for(var E=0,H=G.length,xe=H>>>1;E<xe;){var X=2*(E+1)-1,ee=G[X],ue=X+1,re=G[ue];if(0>a(ee,D))ue<H&&0>a(re,ee)?(G[E]=re,G[ue]=D,E=ue):(G[E]=ee,G[X]=D,E=X);else if(ue<H&&0>a(re,D))G[E]=re,G[ue]=D,E=ue;else break e}}return fe}function a(G,fe){var D=G.sortIndex-fe.sortIndex;return D!==0?D:G.id-fe.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var d=Date,u=d.now();s.unstable_now=function(){return d.now()-u}}var h=[],p=[],x=1,y=null,S=3,M=!1,A=!1,C=!1,v=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function U(G){for(var fe=t(p);fe!==null;){if(fe.callback===null)r(p);else if(fe.startTime<=G)r(p),fe.sortIndex=fe.expirationTime,e(h,fe);else break;fe=t(p)}}function T(G){if(C=!1,U(G),!A)if(t(h)!==null)A=!0,le(Y);else{var fe=t(p);fe!==null&&he(T,fe.startTime-G)}}function Y(G,fe){A=!1,C&&(C=!1,_(W),W=-1),M=!0;var D=S;try{for(U(fe),y=t(h);y!==null&&(!(y.expirationTime>fe)||G&&!z());){var E=y.callback;if(typeof E=="function"){y.callback=null,S=y.priorityLevel;var H=E(y.expirationTime<=fe);fe=s.unstable_now(),typeof H=="function"?y.callback=H:y===t(h)&&r(h),U(fe)}else r(h);y=t(h)}if(y!==null)var xe=!0;else{var X=t(p);X!==null&&he(T,X.startTime-fe),xe=!1}return xe}finally{y=null,S=D,M=!1}}var O=!1,I=null,W=-1,L=5,w=-1;function z(){return!(s.unstable_now()-w<L)}function ie(){if(I!==null){var G=s.unstable_now();w=G;var fe=!0;try{fe=I(!0,G)}finally{fe?Q():(O=!1,I=null)}}else O=!1}var Q;if(typeof N=="function")Q=function(){N(ie)};else if(typeof MessageChannel<"u"){var de=new MessageChannel,pe=de.port2;de.port1.onmessage=ie,Q=function(){pe.postMessage(null)}}else Q=function(){v(ie,0)};function le(G){I=G,O||(O=!0,Q())}function he(G,fe){W=v(function(){G(s.unstable_now())},fe)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(G){G.callback=null},s.unstable_continueExecution=function(){A||M||(A=!0,le(Y))},s.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<G?Math.floor(1e3/G):5},s.unstable_getCurrentPriorityLevel=function(){return S},s.unstable_getFirstCallbackNode=function(){return t(h)},s.unstable_next=function(G){switch(S){case 1:case 2:case 3:var fe=3;break;default:fe=S}var D=S;S=fe;try{return G()}finally{S=D}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(G,fe){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var D=S;S=G;try{return fe()}finally{S=D}},s.unstable_scheduleCallback=function(G,fe,D){var E=s.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?E+D:E):D=E,G){case 1:var H=-1;break;case 2:H=250;break;case 5:H=1073741823;break;case 4:H=1e4;break;default:H=5e3}return H=D+H,G={id:x++,callback:fe,priorityLevel:G,startTime:D,expirationTime:H,sortIndex:-1},D>E?(G.sortIndex=D,e(p,G),t(h)===null&&G===t(p)&&(C?(_(W),W=-1):C=!0,he(T,D-E))):(G.sortIndex=H,e(h,G),A||M||(A=!0,le(Y))),G},s.unstable_shouldYield=z,s.unstable_wrapCallback=function(G){var fe=S;return function(){var D=S;S=fe;try{return G.apply(this,arguments)}finally{S=D}}}})(Ru)),Ru}var jp;function Px(){return jp||(jp=1,Au.exports=Rx()),Au.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wp;function Lx(){if(Wp)return Rn;Wp=1;var s=ef(),e=Px();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function l(n,i){d(n,i),d(n+"Capture",i)}function d(n,i){for(a[n]=i,n=0;n<i.length;n++)r.add(i[n])}var u=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,x={},y={};function S(n){return h.call(y,n)?!0:h.call(x,n)?!1:p.test(n)?y[n]=!0:(x[n]=!0,!1)}function M(n,i,o,c){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:o!==null?!o.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function A(n,i,o,c){if(i===null||typeof i>"u"||M(n,i,o,c))return!0;if(c)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function C(n,i,o,c,f,m,b){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=f,this.mustUseProperty=o,this.propertyName=n,this.type=i,this.sanitizeURL=m,this.removeEmptyString=b}var v={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){v[n]=new C(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];v[i]=new C(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){v[n]=new C(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){v[n]=new C(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){v[n]=new C(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){v[n]=new C(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){v[n]=new C(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){v[n]=new C(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){v[n]=new C(n,5,!1,n.toLowerCase(),null,!1,!1)});var _=/[\-:]([a-z])/g;function N(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(_,N);v[i]=new C(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(_,N);v[i]=new C(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(_,N);v[i]=new C(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){v[n]=new C(n,1,!1,n.toLowerCase(),null,!1,!1)}),v.xlinkHref=new C("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){v[n]=new C(n,1,!1,n.toLowerCase(),null,!0,!0)});function U(n,i,o,c){var f=v.hasOwnProperty(i)?v[i]:null;(f!==null?f.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(A(i,o,f,c)&&(o=null),c||f===null?S(i)&&(o===null?n.removeAttribute(i):n.setAttribute(i,""+o)):f.mustUseProperty?n[f.propertyName]=o===null?f.type===3?!1:"":o:(i=f.attributeName,c=f.attributeNamespace,o===null?n.removeAttribute(i):(f=f.type,o=f===3||f===4&&o===!0?"":""+o,c?n.setAttributeNS(c,i,o):n.setAttribute(i,o))))}var T=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Y=Symbol.for("react.element"),O=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),W=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),w=Symbol.for("react.provider"),z=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),de=Symbol.for("react.suspense_list"),pe=Symbol.for("react.memo"),le=Symbol.for("react.lazy"),he=Symbol.for("react.offscreen"),G=Symbol.iterator;function fe(n){return n===null||typeof n!="object"?null:(n=G&&n[G]||n["@@iterator"],typeof n=="function"?n:null)}var D=Object.assign,E;function H(n){if(E===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);E=i&&i[1]||""}return`
`+E+n}var xe=!1;function X(n,i){if(!n||xe)return"";xe=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(se){var c=se}Reflect.construct(n,[],i)}else{try{i.call()}catch(se){c=se}n.call(i.prototype)}else{try{throw Error()}catch(se){c=se}n()}}catch(se){if(se&&c&&typeof se.stack=="string"){for(var f=se.stack.split(`
`),m=c.stack.split(`
`),b=f.length-1,F=m.length-1;1<=b&&0<=F&&f[b]!==m[F];)F--;for(;1<=b&&0<=F;b--,F--)if(f[b]!==m[F]){if(b!==1||F!==1)do if(b--,F--,0>F||f[b]!==m[F]){var V=`
`+f[b].replace(" at new "," at ");return n.displayName&&V.includes("<anonymous>")&&(V=V.replace("<anonymous>",n.displayName)),V}while(1<=b&&0<=F);break}}}finally{xe=!1,Error.prepareStackTrace=o}return(n=n?n.displayName||n.name:"")?H(n):""}function ee(n){switch(n.tag){case 5:return H(n.type);case 16:return H("Lazy");case 13:return H("Suspense");case 19:return H("SuspenseList");case 0:case 2:case 15:return n=X(n.type,!1),n;case 11:return n=X(n.type.render,!1),n;case 1:return n=X(n.type,!0),n;default:return""}}function ue(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case I:return"Fragment";case O:return"Portal";case L:return"Profiler";case W:return"StrictMode";case Q:return"Suspense";case de:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case z:return(n.displayName||"Context")+".Consumer";case w:return(n._context.displayName||"Context")+".Provider";case ie:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case pe:return i=n.displayName||null,i!==null?i:ue(n.type)||"Memo";case le:i=n._payload,n=n._init;try{return ue(n(i))}catch{}}return null}function re(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ue(i);case 8:return i===W?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function me(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function we(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Pe(n){var i=we(n)?"checked":"value",o=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var f=o.get,m=o.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return f.call(this)},set:function(b){c=""+b,m.call(this,b)}}),Object.defineProperty(n,i,{enumerable:o.enumerable}),{getValue:function(){return c},setValue:function(b){c=""+b},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function Ze(n){n._valueTracker||(n._valueTracker=Pe(n))}function He(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var o=i.getValue(),c="";return n&&(c=we(n)?n.checked?"true":"false":n.value),n=c,n!==o?(i.setValue(n),!0):!1}function st(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function B(n,i){var o=i.checked;return D({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??n._wrapperState.initialChecked})}function Mt(n,i){var o=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;o=me(i.value!=null?i.value:o),n._wrapperState={initialChecked:c,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function it(n,i){i=i.checked,i!=null&&U(n,"checked",i,!1)}function Qe(n,i){it(n,i);var o=me(i.value),c=i.type;if(o!=null)c==="number"?(o===0&&n.value===""||n.value!=o)&&(n.value=""+o):n.value!==""+o&&(n.value=""+o);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?Je(n,i.type,o):i.hasOwnProperty("defaultValue")&&Je(n,i.type,me(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Be(n,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,o||i===n.value||(n.value=i),n.defaultValue=i}o=n.name,o!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,o!==""&&(n.name=o)}function Je(n,i,o){(i!=="number"||st(n.ownerDocument)!==n)&&(o==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+o&&(n.defaultValue=""+o))}var Le=Array.isArray;function k(n,i,o,c){if(n=n.options,i){i={};for(var f=0;f<o.length;f++)i["$"+o[f]]=!0;for(o=0;o<n.length;o++)f=i.hasOwnProperty("$"+n[o].value),n[o].selected!==f&&(n[o].selected=f),f&&c&&(n[o].defaultSelected=!0)}else{for(o=""+me(o),i=null,f=0;f<n.length;f++){if(n[f].value===o){n[f].selected=!0,c&&(n[f].defaultSelected=!0);return}i!==null||n[f].disabled||(i=n[f])}i!==null&&(i.selected=!0)}}function R(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return D({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function ne(n,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(t(92));if(Le(o)){if(1<o.length)throw Error(t(93));o=o[0]}i=o}i==null&&(i=""),o=i}n._wrapperState={initialValue:me(o)}}function _e(n,i){var o=me(i.value),c=me(i.defaultValue);o!=null&&(o=""+o,o!==n.value&&(n.value=o),i.defaultValue==null&&n.defaultValue!==o&&(n.defaultValue=o)),c!=null&&(n.defaultValue=""+c)}function ye(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function ge(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function je(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?ge(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Re,Ue=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,c,f){MSApp.execUnsafeLocalFunction(function(){return n(i,o,c,f)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Re=Re||document.createElement("div"),Re.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Re.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function ft(n,i){if(i){var o=n.firstChild;if(o&&o===n.lastChild&&o.nodeType===3){o.nodeValue=i;return}}n.textContent=i}var Ee={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Oe=["Webkit","ms","Moz","O"];Object.keys(Ee).forEach(function(n){Oe.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),Ee[i]=Ee[n]})});function et(n,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||Ee.hasOwnProperty(n)&&Ee[n]?(""+i).trim():i+"px"}function rt(n,i){n=n.style;for(var o in i)if(i.hasOwnProperty(o)){var c=o.indexOf("--")===0,f=et(o,i[o],c);o==="float"&&(o="cssFloat"),c?n.setProperty(o,f):n[o]=f}}var Ve=D({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function xt(n,i){if(i){if(Ve[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function ct(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Pt=null;function q(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Ne=null,ce=null,ve=null;function Ie(n){if(n=Eo(n)){if(typeof Ne!="function")throw Error(t(280));var i=n.stateNode;i&&(i=ya(i),Ne(n.stateNode,n.type,i))}}function ke(n){ce?ve?ve.push(n):ve=[n]:ce=n}function ut(){if(ce){var n=ce,i=ve;if(ve=ce=null,Ie(n),i)for(n=0;n<i.length;n++)Ie(i[n])}}function Ut(n,i){return n(i)}function Yt(){}var wt=!1;function Mn(n,i,o){if(wt)return n(i,o);wt=!0;try{return Ut(n,i,o)}finally{wt=!1,(ce!==null||ve!==null)&&(Yt(),ut())}}function xn(n,i){var o=n.stateNode;if(o===null)return null;var c=ya(o);if(c===null)return null;o=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(o&&typeof o!="function")throw Error(t(231,i,typeof o));return o}var is=!1;if(u)try{var $i={};Object.defineProperty($i,"passive",{get:function(){is=!0}}),window.addEventListener("test",$i,$i),window.removeEventListener("test",$i,$i)}catch{is=!1}function bi(n,i,o,c,f,m,b,F,V){var se=Array.prototype.slice.call(arguments,3);try{i.apply(o,se)}catch(Me){this.onError(Me)}}var Ci=!1,Ar=null,Rr=!1,Ki=null,ea={onError:function(n){Ci=!0,Ar=n}};function rs(n,i,o,c,f,m,b,F,V){Ci=!1,Ar=null,bi.apply(ea,arguments)}function ta(n,i,o,c,f,m,b,F,V){if(rs.apply(this,arguments),Ci){if(Ci){var se=Ar;Ci=!1,Ar=null}else throw Error(t(198));Rr||(Rr=!0,Ki=se)}}function gi(n){var i=n,o=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(o=i.return),n=i.return;while(n)}return i.tag===3?o:null}function na(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function ia(n){if(gi(n)!==n)throw Error(t(188))}function ql(n){var i=n.alternate;if(!i){if(i=gi(n),i===null)throw Error(t(188));return i!==n?null:n}for(var o=n,c=i;;){var f=o.return;if(f===null)break;var m=f.alternate;if(m===null){if(c=f.return,c!==null){o=c;continue}break}if(f.child===m.child){for(m=f.child;m;){if(m===o)return ia(f),n;if(m===c)return ia(f),i;m=m.sibling}throw Error(t(188))}if(o.return!==c.return)o=f,c=m;else{for(var b=!1,F=f.child;F;){if(F===o){b=!0,o=f,c=m;break}if(F===c){b=!0,c=f,o=m;break}F=F.sibling}if(!b){for(F=m.child;F;){if(F===o){b=!0,o=m,c=f;break}if(F===c){b=!0,c=m,o=f;break}F=F.sibling}if(!b)throw Error(t(189))}}if(o.alternate!==c)throw Error(t(190))}if(o.tag!==3)throw Error(t(188));return o.stateNode.current===o?n:i}function P(n){return n=ql(n),n!==null?$(n):null}function $(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=$(n);if(i!==null)return i;n=n.sibling}return null}var oe=e.unstable_scheduleCallback,ae=e.unstable_cancelCallback,K=e.unstable_shouldYield,Ae=e.unstable_requestPaint,be=e.unstable_now,qe=e.unstable_getCurrentPriorityLevel,We=e.unstable_ImmediatePriority,ot=e.unstable_UserBlockingPriority,lt=e.unstable_NormalPriority,Ye=e.unstable_LowPriority,yt=e.unstable_IdlePriority,Rt=null,_t=null;function cn(n){if(_t&&typeof _t.onCommitFiberRoot=="function")try{_t.onCommitFiberRoot(Rt,n,void 0,(n.current.flags&128)===128)}catch{}}var ht=Math.clz32?Math.clz32:bt,Ke=Math.log,ei=Math.LN2;function bt(n){return n>>>=0,n===0?32:31-(Ke(n)/ei|0)|0}var un=64,ti=4194304;function $t(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function xi(n,i){var o=n.pendingLanes;if(o===0)return 0;var c=0,f=n.suspendedLanes,m=n.pingedLanes,b=o&268435455;if(b!==0){var F=b&~f;F!==0?c=$t(F):(m&=b,m!==0&&(c=$t(m)))}else b=o&~f,b!==0?c=$t(b):m!==0&&(c=$t(m));if(c===0)return 0;if(i!==0&&i!==c&&(i&f)===0&&(f=c&-c,m=i&-i,f>=m||f===16&&(m&4194240)!==0))return i;if((c&4)!==0&&(c|=o&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)o=31-ht(i),f=1<<o,c|=n[o],i&=~f;return c}function kt(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Gn(n,i){for(var o=n.suspendedLanes,c=n.pingedLanes,f=n.expirationTimes,m=n.pendingLanes;0<m;){var b=31-ht(m),F=1<<b,V=f[b];V===-1?((F&o)===0||(F&c)!==0)&&(f[b]=kt(F,i)):V<=i&&(n.expiredLanes|=F),m&=~F}}function Ai(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function vn(){var n=un;return un<<=1,(un&4194240)===0&&(un=64),n}function Hn(n){for(var i=[],o=0;31>o;o++)i.push(n);return i}function wn(n,i,o){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-ht(i),n[i]=o}function ra(n,i){var o=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<o;){var f=31-ht(o),m=1<<f;i[f]=0,c[f]=-1,n[f]=-1,o&=~m}}function Yl(n,i){var o=n.entangledLanes|=i;for(n=n.entanglements;o;){var c=31-ht(o),f=1<<c;f&i|n[c]&i&&(n[c]|=i),o&=~f}}var Lt=0;function xf(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var vf,$l,_f,yf,Sf,Kl=!1,sa=[],Zi=null,Ji=null,Qi=null,ao=new Map,lo=new Map,er=[],W0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Mf(n,i){switch(n){case"focusin":case"focusout":Zi=null;break;case"dragenter":case"dragleave":Ji=null;break;case"mouseover":case"mouseout":Qi=null;break;case"pointerover":case"pointerout":ao.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":lo.delete(i.pointerId)}}function co(n,i,o,c,f,m){return n===null||n.nativeEvent!==m?(n={blockedOn:i,domEventName:o,eventSystemFlags:c,nativeEvent:m,targetContainers:[f]},i!==null&&(i=Eo(i),i!==null&&$l(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),n)}function X0(n,i,o,c,f){switch(i){case"focusin":return Zi=co(Zi,n,i,o,c,f),!0;case"dragenter":return Ji=co(Ji,n,i,o,c,f),!0;case"mouseover":return Qi=co(Qi,n,i,o,c,f),!0;case"pointerover":var m=f.pointerId;return ao.set(m,co(ao.get(m)||null,n,i,o,c,f)),!0;case"gotpointercapture":return m=f.pointerId,lo.set(m,co(lo.get(m)||null,n,i,o,c,f)),!0}return!1}function wf(n){var i=Pr(n.target);if(i!==null){var o=gi(i);if(o!==null){if(i=o.tag,i===13){if(i=na(o),i!==null){n.blockedOn=i,Sf(n.priority,function(){_f(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){n.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}n.blockedOn=null}function oa(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var o=Jl(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(o===null){o=n.nativeEvent;var c=new o.constructor(o.type,o);Pt=c,o.target.dispatchEvent(c),Pt=null}else return i=Eo(o),i!==null&&$l(i),n.blockedOn=o,!1;i.shift()}return!0}function Ef(n,i,o){oa(n)&&o.delete(i)}function q0(){Kl=!1,Zi!==null&&oa(Zi)&&(Zi=null),Ji!==null&&oa(Ji)&&(Ji=null),Qi!==null&&oa(Qi)&&(Qi=null),ao.forEach(Ef),lo.forEach(Ef)}function uo(n,i){n.blockedOn===i&&(n.blockedOn=null,Kl||(Kl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,q0)))}function fo(n){function i(f){return uo(f,n)}if(0<sa.length){uo(sa[0],n);for(var o=1;o<sa.length;o++){var c=sa[o];c.blockedOn===n&&(c.blockedOn=null)}}for(Zi!==null&&uo(Zi,n),Ji!==null&&uo(Ji,n),Qi!==null&&uo(Qi,n),ao.forEach(i),lo.forEach(i),o=0;o<er.length;o++)c=er[o],c.blockedOn===n&&(c.blockedOn=null);for(;0<er.length&&(o=er[0],o.blockedOn===null);)wf(o),o.blockedOn===null&&er.shift()}var ss=T.ReactCurrentBatchConfig,aa=!0;function Y0(n,i,o,c){var f=Lt,m=ss.transition;ss.transition=null;try{Lt=1,Zl(n,i,o,c)}finally{Lt=f,ss.transition=m}}function $0(n,i,o,c){var f=Lt,m=ss.transition;ss.transition=null;try{Lt=4,Zl(n,i,o,c)}finally{Lt=f,ss.transition=m}}function Zl(n,i,o,c){if(aa){var f=Jl(n,i,o,c);if(f===null)mc(n,i,c,la,o),Mf(n,c);else if(X0(f,n,i,o,c))c.stopPropagation();else if(Mf(n,c),i&4&&-1<W0.indexOf(n)){for(;f!==null;){var m=Eo(f);if(m!==null&&vf(m),m=Jl(n,i,o,c),m===null&&mc(n,i,c,la,o),m===f)break;f=m}f!==null&&c.stopPropagation()}else mc(n,i,c,null,o)}}var la=null;function Jl(n,i,o,c){if(la=null,n=q(c),n=Pr(n),n!==null)if(i=gi(n),i===null)n=null;else if(o=i.tag,o===13){if(n=na(i),n!==null)return n;n=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return la=n,null}function Tf(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(qe()){case We:return 1;case ot:return 4;case lt:case Ye:return 16;case yt:return 536870912;default:return 16}default:return 16}}var tr=null,Ql=null,ca=null;function bf(){if(ca)return ca;var n,i=Ql,o=i.length,c,f="value"in tr?tr.value:tr.textContent,m=f.length;for(n=0;n<o&&i[n]===f[n];n++);var b=o-n;for(c=1;c<=b&&i[o-c]===f[m-c];c++);return ca=f.slice(n,1<c?1-c:void 0)}function ua(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function da(){return!0}function Cf(){return!1}function kn(n){function i(o,c,f,m,b){this._reactName=o,this._targetInst=f,this.type=c,this.nativeEvent=m,this.target=b,this.currentTarget=null;for(var F in n)n.hasOwnProperty(F)&&(o=n[F],this[F]=o?o(m):m[F]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?da:Cf,this.isPropagationStopped=Cf,this}return D(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=da)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=da)},persist:function(){},isPersistent:da}),i}var os={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ec=kn(os),ho=D({},os,{view:0,detail:0}),K0=kn(ho),tc,nc,po,fa=D({},ho,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:rc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==po&&(po&&n.type==="mousemove"?(tc=n.screenX-po.screenX,nc=n.screenY-po.screenY):nc=tc=0,po=n),tc)},movementY:function(n){return"movementY"in n?n.movementY:nc}}),Af=kn(fa),Z0=D({},fa,{dataTransfer:0}),J0=kn(Z0),Q0=D({},ho,{relatedTarget:0}),ic=kn(Q0),eg=D({},os,{animationName:0,elapsedTime:0,pseudoElement:0}),tg=kn(eg),ng=D({},os,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),ig=kn(ng),rg=D({},os,{data:0}),Rf=kn(rg),sg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},og={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ag={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lg(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=ag[n])?!!i[n]:!1}function rc(){return lg}var cg=D({},ho,{key:function(n){if(n.key){var i=sg[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=ua(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?og[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:rc,charCode:function(n){return n.type==="keypress"?ua(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?ua(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),ug=kn(cg),dg=D({},fa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Pf=kn(dg),fg=D({},ho,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:rc}),hg=kn(fg),pg=D({},os,{propertyName:0,elapsedTime:0,pseudoElement:0}),mg=kn(pg),gg=D({},fa,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),xg=kn(gg),vg=[9,13,27,32],sc=u&&"CompositionEvent"in window,mo=null;u&&"documentMode"in document&&(mo=document.documentMode);var _g=u&&"TextEvent"in window&&!mo,Lf=u&&(!sc||mo&&8<mo&&11>=mo),Nf=" ",Df=!1;function kf(n,i){switch(n){case"keyup":return vg.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function If(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var as=!1;function yg(n,i){switch(n){case"compositionend":return If(i);case"keypress":return i.which!==32?null:(Df=!0,Nf);case"textInput":return n=i.data,n===Nf&&Df?null:n;default:return null}}function Sg(n,i){if(as)return n==="compositionend"||!sc&&kf(n,i)?(n=bf(),ca=Ql=tr=null,as=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Lf&&i.locale!=="ko"?null:i.data;default:return null}}var Mg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Uf(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!Mg[n.type]:i==="textarea"}function Ff(n,i,o,c){ke(c),i=xa(i,"onChange"),0<i.length&&(o=new ec("onChange","change",null,o,c),n.push({event:o,listeners:i}))}var go=null,xo=null;function wg(n){th(n,0)}function ha(n){var i=fs(n);if(He(i))return n}function Eg(n,i){if(n==="change")return i}var Of=!1;if(u){var oc;if(u){var ac="oninput"in document;if(!ac){var zf=document.createElement("div");zf.setAttribute("oninput","return;"),ac=typeof zf.oninput=="function"}oc=ac}else oc=!1;Of=oc&&(!document.documentMode||9<document.documentMode)}function Bf(){go&&(go.detachEvent("onpropertychange",Vf),xo=go=null)}function Vf(n){if(n.propertyName==="value"&&ha(xo)){var i=[];Ff(i,xo,n,q(n)),Mn(wg,i)}}function Tg(n,i,o){n==="focusin"?(Bf(),go=i,xo=o,go.attachEvent("onpropertychange",Vf)):n==="focusout"&&Bf()}function bg(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return ha(xo)}function Cg(n,i){if(n==="click")return ha(i)}function Ag(n,i){if(n==="input"||n==="change")return ha(i)}function Rg(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var ni=typeof Object.is=="function"?Object.is:Rg;function vo(n,i){if(ni(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var o=Object.keys(n),c=Object.keys(i);if(o.length!==c.length)return!1;for(c=0;c<o.length;c++){var f=o[c];if(!h.call(i,f)||!ni(n[f],i[f]))return!1}return!0}function Gf(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Hf(n,i){var o=Gf(n);n=0;for(var c;o;){if(o.nodeType===3){if(c=n+o.textContent.length,n<=i&&c>=i)return{node:o,offset:i-n};n=c}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Gf(o)}}function jf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?jf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Wf(){for(var n=window,i=st();i instanceof n.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)n=i.contentWindow;else break;i=st(n.document)}return i}function lc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function Pg(n){var i=Wf(),o=n.focusedElem,c=n.selectionRange;if(i!==o&&o&&o.ownerDocument&&jf(o.ownerDocument.documentElement,o)){if(c!==null&&lc(o)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(n,o.value.length);else if(n=(i=o.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var f=o.textContent.length,m=Math.min(c.start,f);c=c.end===void 0?m:Math.min(c.end,f),!n.extend&&m>c&&(f=c,c=m,m=f),f=Hf(o,m);var b=Hf(o,c);f&&b&&(n.rangeCount!==1||n.anchorNode!==f.node||n.anchorOffset!==f.offset||n.focusNode!==b.node||n.focusOffset!==b.offset)&&(i=i.createRange(),i.setStart(f.node,f.offset),n.removeAllRanges(),m>c?(n.addRange(i),n.extend(b.node,b.offset)):(i.setEnd(b.node,b.offset),n.addRange(i)))}}for(i=[],n=o;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)n=i[o],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Lg=u&&"documentMode"in document&&11>=document.documentMode,ls=null,cc=null,_o=null,uc=!1;function Xf(n,i,o){var c=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;uc||ls==null||ls!==st(c)||(c=ls,"selectionStart"in c&&lc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),_o&&vo(_o,c)||(_o=c,c=xa(cc,"onSelect"),0<c.length&&(i=new ec("onSelect","select",null,i,o),n.push({event:i,listeners:c}),i.target=ls)))}function pa(n,i){var o={};return o[n.toLowerCase()]=i.toLowerCase(),o["Webkit"+n]="webkit"+i,o["Moz"+n]="moz"+i,o}var cs={animationend:pa("Animation","AnimationEnd"),animationiteration:pa("Animation","AnimationIteration"),animationstart:pa("Animation","AnimationStart"),transitionend:pa("Transition","TransitionEnd")},dc={},qf={};u&&(qf=document.createElement("div").style,"AnimationEvent"in window||(delete cs.animationend.animation,delete cs.animationiteration.animation,delete cs.animationstart.animation),"TransitionEvent"in window||delete cs.transitionend.transition);function ma(n){if(dc[n])return dc[n];if(!cs[n])return n;var i=cs[n],o;for(o in i)if(i.hasOwnProperty(o)&&o in qf)return dc[n]=i[o];return n}var Yf=ma("animationend"),$f=ma("animationiteration"),Kf=ma("animationstart"),Zf=ma("transitionend"),Jf=new Map,Qf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function nr(n,i){Jf.set(n,i),l(i,[n])}for(var fc=0;fc<Qf.length;fc++){var hc=Qf[fc],Ng=hc.toLowerCase(),Dg=hc[0].toUpperCase()+hc.slice(1);nr(Ng,"on"+Dg)}nr(Yf,"onAnimationEnd"),nr($f,"onAnimationIteration"),nr(Kf,"onAnimationStart"),nr("dblclick","onDoubleClick"),nr("focusin","onFocus"),nr("focusout","onBlur"),nr(Zf,"onTransitionEnd"),d("onMouseEnter",["mouseout","mouseover"]),d("onMouseLeave",["mouseout","mouseover"]),d("onPointerEnter",["pointerout","pointerover"]),d("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var yo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kg=new Set("cancel close invalid load scroll toggle".split(" ").concat(yo));function eh(n,i,o){var c=n.type||"unknown-event";n.currentTarget=o,ta(c,i,void 0,n),n.currentTarget=null}function th(n,i){i=(i&4)!==0;for(var o=0;o<n.length;o++){var c=n[o],f=c.event;c=c.listeners;e:{var m=void 0;if(i)for(var b=c.length-1;0<=b;b--){var F=c[b],V=F.instance,se=F.currentTarget;if(F=F.listener,V!==m&&f.isPropagationStopped())break e;eh(f,F,se),m=V}else for(b=0;b<c.length;b++){if(F=c[b],V=F.instance,se=F.currentTarget,F=F.listener,V!==m&&f.isPropagationStopped())break e;eh(f,F,se),m=V}}}if(Rr)throw n=Ki,Rr=!1,Ki=null,n}function Ft(n,i){var o=i[Sc];o===void 0&&(o=i[Sc]=new Set);var c=n+"__bubble";o.has(c)||(nh(i,n,2,!1),o.add(c))}function pc(n,i,o){var c=0;i&&(c|=4),nh(o,n,c,i)}var ga="_reactListening"+Math.random().toString(36).slice(2);function So(n){if(!n[ga]){n[ga]=!0,r.forEach(function(o){o!=="selectionchange"&&(kg.has(o)||pc(o,!1,n),pc(o,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[ga]||(i[ga]=!0,pc("selectionchange",!1,i))}}function nh(n,i,o,c){switch(Tf(i)){case 1:var f=Y0;break;case 4:f=$0;break;default:f=Zl}o=f.bind(null,i,o,n),f=void 0,!is||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),c?f!==void 0?n.addEventListener(i,o,{capture:!0,passive:f}):n.addEventListener(i,o,!0):f!==void 0?n.addEventListener(i,o,{passive:f}):n.addEventListener(i,o,!1)}function mc(n,i,o,c,f){var m=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var b=c.tag;if(b===3||b===4){var F=c.stateNode.containerInfo;if(F===f||F.nodeType===8&&F.parentNode===f)break;if(b===4)for(b=c.return;b!==null;){var V=b.tag;if((V===3||V===4)&&(V=b.stateNode.containerInfo,V===f||V.nodeType===8&&V.parentNode===f))return;b=b.return}for(;F!==null;){if(b=Pr(F),b===null)return;if(V=b.tag,V===5||V===6){c=m=b;continue e}F=F.parentNode}}c=c.return}Mn(function(){var se=m,Me=q(o),Te=[];e:{var Se=Jf.get(n);if(Se!==void 0){var Fe=ec,Ge=n;switch(n){case"keypress":if(ua(o)===0)break e;case"keydown":case"keyup":Fe=ug;break;case"focusin":Ge="focus",Fe=ic;break;case"focusout":Ge="blur",Fe=ic;break;case"beforeblur":case"afterblur":Fe=ic;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Fe=Af;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Fe=J0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Fe=hg;break;case Yf:case $f:case Kf:Fe=tg;break;case Zf:Fe=mg;break;case"scroll":Fe=K0;break;case"wheel":Fe=xg;break;case"copy":case"cut":case"paste":Fe=ig;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Fe=Pf}var Xe=(i&4)!==0,Wt=!Xe&&n==="scroll",Z=Xe?Se!==null?Se+"Capture":null:Se;Xe=[];for(var j=se,te;j!==null;){te=j;var Ce=te.stateNode;if(te.tag===5&&Ce!==null&&(te=Ce,Z!==null&&(Ce=xn(j,Z),Ce!=null&&Xe.push(Mo(j,Ce,te)))),Wt)break;j=j.return}0<Xe.length&&(Se=new Fe(Se,Ge,null,o,Me),Te.push({event:Se,listeners:Xe}))}}if((i&7)===0){e:{if(Se=n==="mouseover"||n==="pointerover",Fe=n==="mouseout"||n==="pointerout",Se&&o!==Pt&&(Ge=o.relatedTarget||o.fromElement)&&(Pr(Ge)||Ge[Ri]))break e;if((Fe||Se)&&(Se=Me.window===Me?Me:(Se=Me.ownerDocument)?Se.defaultView||Se.parentWindow:window,Fe?(Ge=o.relatedTarget||o.toElement,Fe=se,Ge=Ge?Pr(Ge):null,Ge!==null&&(Wt=gi(Ge),Ge!==Wt||Ge.tag!==5&&Ge.tag!==6)&&(Ge=null)):(Fe=null,Ge=se),Fe!==Ge)){if(Xe=Af,Ce="onMouseLeave",Z="onMouseEnter",j="mouse",(n==="pointerout"||n==="pointerover")&&(Xe=Pf,Ce="onPointerLeave",Z="onPointerEnter",j="pointer"),Wt=Fe==null?Se:fs(Fe),te=Ge==null?Se:fs(Ge),Se=new Xe(Ce,j+"leave",Fe,o,Me),Se.target=Wt,Se.relatedTarget=te,Ce=null,Pr(Me)===se&&(Xe=new Xe(Z,j+"enter",Ge,o,Me),Xe.target=te,Xe.relatedTarget=Wt,Ce=Xe),Wt=Ce,Fe&&Ge)t:{for(Xe=Fe,Z=Ge,j=0,te=Xe;te;te=us(te))j++;for(te=0,Ce=Z;Ce;Ce=us(Ce))te++;for(;0<j-te;)Xe=us(Xe),j--;for(;0<te-j;)Z=us(Z),te--;for(;j--;){if(Xe===Z||Z!==null&&Xe===Z.alternate)break t;Xe=us(Xe),Z=us(Z)}Xe=null}else Xe=null;Fe!==null&&ih(Te,Se,Fe,Xe,!1),Ge!==null&&Wt!==null&&ih(Te,Wt,Ge,Xe,!0)}}e:{if(Se=se?fs(se):window,Fe=Se.nodeName&&Se.nodeName.toLowerCase(),Fe==="select"||Fe==="input"&&Se.type==="file")var $e=Eg;else if(Uf(Se))if(Of)$e=Ag;else{$e=bg;var tt=Tg}else(Fe=Se.nodeName)&&Fe.toLowerCase()==="input"&&(Se.type==="checkbox"||Se.type==="radio")&&($e=Cg);if($e&&($e=$e(n,se))){Ff(Te,$e,o,Me);break e}tt&&tt(n,Se,se),n==="focusout"&&(tt=Se._wrapperState)&&tt.controlled&&Se.type==="number"&&Je(Se,"number",Se.value)}switch(tt=se?fs(se):window,n){case"focusin":(Uf(tt)||tt.contentEditable==="true")&&(ls=tt,cc=se,_o=null);break;case"focusout":_o=cc=ls=null;break;case"mousedown":uc=!0;break;case"contextmenu":case"mouseup":case"dragend":uc=!1,Xf(Te,o,Me);break;case"selectionchange":if(Lg)break;case"keydown":case"keyup":Xf(Te,o,Me)}var nt;if(sc)e:{switch(n){case"compositionstart":var at="onCompositionStart";break e;case"compositionend":at="onCompositionEnd";break e;case"compositionupdate":at="onCompositionUpdate";break e}at=void 0}else as?kf(n,o)&&(at="onCompositionEnd"):n==="keydown"&&o.keyCode===229&&(at="onCompositionStart");at&&(Lf&&o.locale!=="ko"&&(as||at!=="onCompositionStart"?at==="onCompositionEnd"&&as&&(nt=bf()):(tr=Me,Ql="value"in tr?tr.value:tr.textContent,as=!0)),tt=xa(se,at),0<tt.length&&(at=new Rf(at,n,null,o,Me),Te.push({event:at,listeners:tt}),nt?at.data=nt:(nt=If(o),nt!==null&&(at.data=nt)))),(nt=_g?yg(n,o):Sg(n,o))&&(se=xa(se,"onBeforeInput"),0<se.length&&(Me=new Rf("onBeforeInput","beforeinput",null,o,Me),Te.push({event:Me,listeners:se}),Me.data=nt))}th(Te,i)})}function Mo(n,i,o){return{instance:n,listener:i,currentTarget:o}}function xa(n,i){for(var o=i+"Capture",c=[];n!==null;){var f=n,m=f.stateNode;f.tag===5&&m!==null&&(f=m,m=xn(n,o),m!=null&&c.unshift(Mo(n,m,f)),m=xn(n,i),m!=null&&c.push(Mo(n,m,f))),n=n.return}return c}function us(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function ih(n,i,o,c,f){for(var m=i._reactName,b=[];o!==null&&o!==c;){var F=o,V=F.alternate,se=F.stateNode;if(V!==null&&V===c)break;F.tag===5&&se!==null&&(F=se,f?(V=xn(o,m),V!=null&&b.unshift(Mo(o,V,F))):f||(V=xn(o,m),V!=null&&b.push(Mo(o,V,F)))),o=o.return}b.length!==0&&n.push({event:i,listeners:b})}var Ig=/\r\n?/g,Ug=/\u0000|\uFFFD/g;function rh(n){return(typeof n=="string"?n:""+n).replace(Ig,`
`).replace(Ug,"")}function va(n,i,o){if(i=rh(i),rh(n)!==i&&o)throw Error(t(425))}function _a(){}var gc=null,xc=null;function vc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var _c=typeof setTimeout=="function"?setTimeout:void 0,Fg=typeof clearTimeout=="function"?clearTimeout:void 0,sh=typeof Promise=="function"?Promise:void 0,Og=typeof queueMicrotask=="function"?queueMicrotask:typeof sh<"u"?function(n){return sh.resolve(null).then(n).catch(zg)}:_c;function zg(n){setTimeout(function(){throw n})}function yc(n,i){var o=i,c=0;do{var f=o.nextSibling;if(n.removeChild(o),f&&f.nodeType===8)if(o=f.data,o==="/$"){if(c===0){n.removeChild(f),fo(i);return}c--}else o!=="$"&&o!=="$?"&&o!=="$!"||c++;o=f}while(o);fo(i)}function ir(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function oh(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return n;i--}else o==="/$"&&i++}n=n.previousSibling}return null}var ds=Math.random().toString(36).slice(2),vi="__reactFiber$"+ds,wo="__reactProps$"+ds,Ri="__reactContainer$"+ds,Sc="__reactEvents$"+ds,Bg="__reactListeners$"+ds,Vg="__reactHandles$"+ds;function Pr(n){var i=n[vi];if(i)return i;for(var o=n.parentNode;o;){if(i=o[Ri]||o[vi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(n=oh(n);n!==null;){if(o=n[vi])return o;n=oh(n)}return i}n=o,o=n.parentNode}return null}function Eo(n){return n=n[vi]||n[Ri],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function fs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function ya(n){return n[wo]||null}var Mc=[],hs=-1;function rr(n){return{current:n}}function Ot(n){0>hs||(n.current=Mc[hs],Mc[hs]=null,hs--)}function It(n,i){hs++,Mc[hs]=n.current,n.current=i}var sr={},dn=rr(sr),En=rr(!1),Lr=sr;function ps(n,i){var o=n.type.contextTypes;if(!o)return sr;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var f={},m;for(m in o)f[m]=i[m];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=f),f}function Tn(n){return n=n.childContextTypes,n!=null}function Sa(){Ot(En),Ot(dn)}function ah(n,i,o){if(dn.current!==sr)throw Error(t(168));It(dn,i),It(En,o)}function lh(n,i,o){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return o;c=c.getChildContext();for(var f in c)if(!(f in i))throw Error(t(108,re(n)||"Unknown",f));return D({},o,c)}function Ma(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||sr,Lr=dn.current,It(dn,n),It(En,En.current),!0}function ch(n,i,o){var c=n.stateNode;if(!c)throw Error(t(169));o?(n=lh(n,i,Lr),c.__reactInternalMemoizedMergedChildContext=n,Ot(En),Ot(dn),It(dn,n)):Ot(En),It(En,o)}var Pi=null,wa=!1,wc=!1;function uh(n){Pi===null?Pi=[n]:Pi.push(n)}function Gg(n){wa=!0,uh(n)}function or(){if(!wc&&Pi!==null){wc=!0;var n=0,i=Lt;try{var o=Pi;for(Lt=1;n<o.length;n++){var c=o[n];do c=c(!0);while(c!==null)}Pi=null,wa=!1}catch(f){throw Pi!==null&&(Pi=Pi.slice(n+1)),oe(We,or),f}finally{Lt=i,wc=!1}}return null}var ms=[],gs=0,Ea=null,Ta=0,jn=[],Wn=0,Nr=null,Li=1,Ni="";function Dr(n,i){ms[gs++]=Ta,ms[gs++]=Ea,Ea=n,Ta=i}function dh(n,i,o){jn[Wn++]=Li,jn[Wn++]=Ni,jn[Wn++]=Nr,Nr=n;var c=Li;n=Ni;var f=32-ht(c)-1;c&=~(1<<f),o+=1;var m=32-ht(i)+f;if(30<m){var b=f-f%5;m=(c&(1<<b)-1).toString(32),c>>=b,f-=b,Li=1<<32-ht(i)+f|o<<f|c,Ni=m+n}else Li=1<<m|o<<f|c,Ni=n}function Ec(n){n.return!==null&&(Dr(n,1),dh(n,1,0))}function Tc(n){for(;n===Ea;)Ea=ms[--gs],ms[gs]=null,Ta=ms[--gs],ms[gs]=null;for(;n===Nr;)Nr=jn[--Wn],jn[Wn]=null,Ni=jn[--Wn],jn[Wn]=null,Li=jn[--Wn],jn[Wn]=null}var In=null,Un=null,Bt=!1,ii=null;function fh(n,i){var o=$n(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=n,i=n.deletions,i===null?(n.deletions=[o],n.flags|=16):i.push(o)}function hh(n,i){switch(n.tag){case 5:var o=n.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,In=n,Un=ir(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,In=n,Un=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Nr!==null?{id:Li,overflow:Ni}:null,n.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=$n(18,null,null,0),o.stateNode=i,o.return=n,n.child=o,In=n,Un=null,!0):!1;default:return!1}}function bc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Cc(n){if(Bt){var i=Un;if(i){var o=i;if(!hh(n,i)){if(bc(n))throw Error(t(418));i=ir(o.nextSibling);var c=In;i&&hh(n,i)?fh(c,o):(n.flags=n.flags&-4097|2,Bt=!1,In=n)}}else{if(bc(n))throw Error(t(418));n.flags=n.flags&-4097|2,Bt=!1,In=n}}}function ph(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;In=n}function ba(n){if(n!==In)return!1;if(!Bt)return ph(n),Bt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!vc(n.type,n.memoizedProps)),i&&(i=Un)){if(bc(n))throw mh(),Error(t(418));for(;i;)fh(n,i),i=ir(i.nextSibling)}if(ph(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="/$"){if(i===0){Un=ir(n.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}n=n.nextSibling}Un=null}}else Un=In?ir(n.stateNode.nextSibling):null;return!0}function mh(){for(var n=Un;n;)n=ir(n.nextSibling)}function xs(){Un=In=null,Bt=!1}function Ac(n){ii===null?ii=[n]:ii.push(n)}var Hg=T.ReactCurrentBatchConfig;function To(n,i,o){if(n=o.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(t(309));var c=o.stateNode}if(!c)throw Error(t(147,n));var f=c,m=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===m?i.ref:(i=function(b){var F=f.refs;b===null?delete F[m]:F[m]=b},i._stringRef=m,i)}if(typeof n!="string")throw Error(t(284));if(!o._owner)throw Error(t(290,n))}return n}function Ca(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function gh(n){var i=n._init;return i(n._payload)}function xh(n){function i(Z,j){if(n){var te=Z.deletions;te===null?(Z.deletions=[j],Z.flags|=16):te.push(j)}}function o(Z,j){if(!n)return null;for(;j!==null;)i(Z,j),j=j.sibling;return null}function c(Z,j){for(Z=new Map;j!==null;)j.key!==null?Z.set(j.key,j):Z.set(j.index,j),j=j.sibling;return Z}function f(Z,j){return Z=pr(Z,j),Z.index=0,Z.sibling=null,Z}function m(Z,j,te){return Z.index=te,n?(te=Z.alternate,te!==null?(te=te.index,te<j?(Z.flags|=2,j):te):(Z.flags|=2,j)):(Z.flags|=1048576,j)}function b(Z){return n&&Z.alternate===null&&(Z.flags|=2),Z}function F(Z,j,te,Ce){return j===null||j.tag!==6?(j=_u(te,Z.mode,Ce),j.return=Z,j):(j=f(j,te),j.return=Z,j)}function V(Z,j,te,Ce){var $e=te.type;return $e===I?Me(Z,j,te.props.children,Ce,te.key):j!==null&&(j.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===le&&gh($e)===j.type)?(Ce=f(j,te.props),Ce.ref=To(Z,j,te),Ce.return=Z,Ce):(Ce=Za(te.type,te.key,te.props,null,Z.mode,Ce),Ce.ref=To(Z,j,te),Ce.return=Z,Ce)}function se(Z,j,te,Ce){return j===null||j.tag!==4||j.stateNode.containerInfo!==te.containerInfo||j.stateNode.implementation!==te.implementation?(j=yu(te,Z.mode,Ce),j.return=Z,j):(j=f(j,te.children||[]),j.return=Z,j)}function Me(Z,j,te,Ce,$e){return j===null||j.tag!==7?(j=Vr(te,Z.mode,Ce,$e),j.return=Z,j):(j=f(j,te),j.return=Z,j)}function Te(Z,j,te){if(typeof j=="string"&&j!==""||typeof j=="number")return j=_u(""+j,Z.mode,te),j.return=Z,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case Y:return te=Za(j.type,j.key,j.props,null,Z.mode,te),te.ref=To(Z,null,j),te.return=Z,te;case O:return j=yu(j,Z.mode,te),j.return=Z,j;case le:var Ce=j._init;return Te(Z,Ce(j._payload),te)}if(Le(j)||fe(j))return j=Vr(j,Z.mode,te,null),j.return=Z,j;Ca(Z,j)}return null}function Se(Z,j,te,Ce){var $e=j!==null?j.key:null;if(typeof te=="string"&&te!==""||typeof te=="number")return $e!==null?null:F(Z,j,""+te,Ce);if(typeof te=="object"&&te!==null){switch(te.$$typeof){case Y:return te.key===$e?V(Z,j,te,Ce):null;case O:return te.key===$e?se(Z,j,te,Ce):null;case le:return $e=te._init,Se(Z,j,$e(te._payload),Ce)}if(Le(te)||fe(te))return $e!==null?null:Me(Z,j,te,Ce,null);Ca(Z,te)}return null}function Fe(Z,j,te,Ce,$e){if(typeof Ce=="string"&&Ce!==""||typeof Ce=="number")return Z=Z.get(te)||null,F(j,Z,""+Ce,$e);if(typeof Ce=="object"&&Ce!==null){switch(Ce.$$typeof){case Y:return Z=Z.get(Ce.key===null?te:Ce.key)||null,V(j,Z,Ce,$e);case O:return Z=Z.get(Ce.key===null?te:Ce.key)||null,se(j,Z,Ce,$e);case le:var tt=Ce._init;return Fe(Z,j,te,tt(Ce._payload),$e)}if(Le(Ce)||fe(Ce))return Z=Z.get(te)||null,Me(j,Z,Ce,$e,null);Ca(j,Ce)}return null}function Ge(Z,j,te,Ce){for(var $e=null,tt=null,nt=j,at=j=0,nn=null;nt!==null&&at<te.length;at++){nt.index>at?(nn=nt,nt=null):nn=nt.sibling;var Ct=Se(Z,nt,te[at],Ce);if(Ct===null){nt===null&&(nt=nn);break}n&&nt&&Ct.alternate===null&&i(Z,nt),j=m(Ct,j,at),tt===null?$e=Ct:tt.sibling=Ct,tt=Ct,nt=nn}if(at===te.length)return o(Z,nt),Bt&&Dr(Z,at),$e;if(nt===null){for(;at<te.length;at++)nt=Te(Z,te[at],Ce),nt!==null&&(j=m(nt,j,at),tt===null?$e=nt:tt.sibling=nt,tt=nt);return Bt&&Dr(Z,at),$e}for(nt=c(Z,nt);at<te.length;at++)nn=Fe(nt,Z,at,te[at],Ce),nn!==null&&(n&&nn.alternate!==null&&nt.delete(nn.key===null?at:nn.key),j=m(nn,j,at),tt===null?$e=nn:tt.sibling=nn,tt=nn);return n&&nt.forEach(function(mr){return i(Z,mr)}),Bt&&Dr(Z,at),$e}function Xe(Z,j,te,Ce){var $e=fe(te);if(typeof $e!="function")throw Error(t(150));if(te=$e.call(te),te==null)throw Error(t(151));for(var tt=$e=null,nt=j,at=j=0,nn=null,Ct=te.next();nt!==null&&!Ct.done;at++,Ct=te.next()){nt.index>at?(nn=nt,nt=null):nn=nt.sibling;var mr=Se(Z,nt,Ct.value,Ce);if(mr===null){nt===null&&(nt=nn);break}n&&nt&&mr.alternate===null&&i(Z,nt),j=m(mr,j,at),tt===null?$e=mr:tt.sibling=mr,tt=mr,nt=nn}if(Ct.done)return o(Z,nt),Bt&&Dr(Z,at),$e;if(nt===null){for(;!Ct.done;at++,Ct=te.next())Ct=Te(Z,Ct.value,Ce),Ct!==null&&(j=m(Ct,j,at),tt===null?$e=Ct:tt.sibling=Ct,tt=Ct);return Bt&&Dr(Z,at),$e}for(nt=c(Z,nt);!Ct.done;at++,Ct=te.next())Ct=Fe(nt,Z,at,Ct.value,Ce),Ct!==null&&(n&&Ct.alternate!==null&&nt.delete(Ct.key===null?at:Ct.key),j=m(Ct,j,at),tt===null?$e=Ct:tt.sibling=Ct,tt=Ct);return n&&nt.forEach(function(Mx){return i(Z,Mx)}),Bt&&Dr(Z,at),$e}function Wt(Z,j,te,Ce){if(typeof te=="object"&&te!==null&&te.type===I&&te.key===null&&(te=te.props.children),typeof te=="object"&&te!==null){switch(te.$$typeof){case Y:e:{for(var $e=te.key,tt=j;tt!==null;){if(tt.key===$e){if($e=te.type,$e===I){if(tt.tag===7){o(Z,tt.sibling),j=f(tt,te.props.children),j.return=Z,Z=j;break e}}else if(tt.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===le&&gh($e)===tt.type){o(Z,tt.sibling),j=f(tt,te.props),j.ref=To(Z,tt,te),j.return=Z,Z=j;break e}o(Z,tt);break}else i(Z,tt);tt=tt.sibling}te.type===I?(j=Vr(te.props.children,Z.mode,Ce,te.key),j.return=Z,Z=j):(Ce=Za(te.type,te.key,te.props,null,Z.mode,Ce),Ce.ref=To(Z,j,te),Ce.return=Z,Z=Ce)}return b(Z);case O:e:{for(tt=te.key;j!==null;){if(j.key===tt)if(j.tag===4&&j.stateNode.containerInfo===te.containerInfo&&j.stateNode.implementation===te.implementation){o(Z,j.sibling),j=f(j,te.children||[]),j.return=Z,Z=j;break e}else{o(Z,j);break}else i(Z,j);j=j.sibling}j=yu(te,Z.mode,Ce),j.return=Z,Z=j}return b(Z);case le:return tt=te._init,Wt(Z,j,tt(te._payload),Ce)}if(Le(te))return Ge(Z,j,te,Ce);if(fe(te))return Xe(Z,j,te,Ce);Ca(Z,te)}return typeof te=="string"&&te!==""||typeof te=="number"?(te=""+te,j!==null&&j.tag===6?(o(Z,j.sibling),j=f(j,te),j.return=Z,Z=j):(o(Z,j),j=_u(te,Z.mode,Ce),j.return=Z,Z=j),b(Z)):o(Z,j)}return Wt}var vs=xh(!0),vh=xh(!1),Aa=rr(null),Ra=null,_s=null,Rc=null;function Pc(){Rc=_s=Ra=null}function Lc(n){var i=Aa.current;Ot(Aa),n._currentValue=i}function Nc(n,i,o){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===o)break;n=n.return}}function ys(n,i){Ra=n,Rc=_s=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(bn=!0),n.firstContext=null)}function Xn(n){var i=n._currentValue;if(Rc!==n)if(n={context:n,memoizedValue:i,next:null},_s===null){if(Ra===null)throw Error(t(308));_s=n,Ra.dependencies={lanes:0,firstContext:n}}else _s=_s.next=n;return i}var kr=null;function Dc(n){kr===null?kr=[n]:kr.push(n)}function _h(n,i,o,c){var f=i.interleaved;return f===null?(o.next=o,Dc(i)):(o.next=f.next,f.next=o),i.interleaved=o,Di(n,c)}function Di(n,i){n.lanes|=i;var o=n.alternate;for(o!==null&&(o.lanes|=i),o=n,n=n.return;n!==null;)n.childLanes|=i,o=n.alternate,o!==null&&(o.childLanes|=i),o=n,n=n.return;return o.tag===3?o.stateNode:null}var ar=!1;function kc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function yh(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function ki(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function lr(n,i,o){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(Et&2)!==0){var f=c.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),c.pending=i,Di(n,o)}return f=c.interleaved,f===null?(i.next=i,Dc(c)):(i.next=f.next,f.next=i),c.interleaved=i,Di(n,o)}function Pa(n,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,o|=c,i.lanes=o,Yl(n,o)}}function Sh(n,i){var o=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,o===c)){var f=null,m=null;if(o=o.firstBaseUpdate,o!==null){do{var b={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};m===null?f=m=b:m=m.next=b,o=o.next}while(o!==null);m===null?f=m=i:m=m.next=i}else f=m=i;o={baseState:c.baseState,firstBaseUpdate:f,lastBaseUpdate:m,shared:c.shared,effects:c.effects},n.updateQueue=o;return}n=o.lastBaseUpdate,n===null?o.firstBaseUpdate=i:n.next=i,o.lastBaseUpdate=i}function La(n,i,o,c){var f=n.updateQueue;ar=!1;var m=f.firstBaseUpdate,b=f.lastBaseUpdate,F=f.shared.pending;if(F!==null){f.shared.pending=null;var V=F,se=V.next;V.next=null,b===null?m=se:b.next=se,b=V;var Me=n.alternate;Me!==null&&(Me=Me.updateQueue,F=Me.lastBaseUpdate,F!==b&&(F===null?Me.firstBaseUpdate=se:F.next=se,Me.lastBaseUpdate=V))}if(m!==null){var Te=f.baseState;b=0,Me=se=V=null,F=m;do{var Se=F.lane,Fe=F.eventTime;if((c&Se)===Se){Me!==null&&(Me=Me.next={eventTime:Fe,lane:0,tag:F.tag,payload:F.payload,callback:F.callback,next:null});e:{var Ge=n,Xe=F;switch(Se=i,Fe=o,Xe.tag){case 1:if(Ge=Xe.payload,typeof Ge=="function"){Te=Ge.call(Fe,Te,Se);break e}Te=Ge;break e;case 3:Ge.flags=Ge.flags&-65537|128;case 0:if(Ge=Xe.payload,Se=typeof Ge=="function"?Ge.call(Fe,Te,Se):Ge,Se==null)break e;Te=D({},Te,Se);break e;case 2:ar=!0}}F.callback!==null&&F.lane!==0&&(n.flags|=64,Se=f.effects,Se===null?f.effects=[F]:Se.push(F))}else Fe={eventTime:Fe,lane:Se,tag:F.tag,payload:F.payload,callback:F.callback,next:null},Me===null?(se=Me=Fe,V=Te):Me=Me.next=Fe,b|=Se;if(F=F.next,F===null){if(F=f.shared.pending,F===null)break;Se=F,F=Se.next,Se.next=null,f.lastBaseUpdate=Se,f.shared.pending=null}}while(!0);if(Me===null&&(V=Te),f.baseState=V,f.firstBaseUpdate=se,f.lastBaseUpdate=Me,i=f.shared.interleaved,i!==null){f=i;do b|=f.lane,f=f.next;while(f!==i)}else m===null&&(f.shared.lanes=0);Fr|=b,n.lanes=b,n.memoizedState=Te}}function Mh(n,i,o){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],f=c.callback;if(f!==null){if(c.callback=null,c=o,typeof f!="function")throw Error(t(191,f));f.call(c)}}}var bo={},_i=rr(bo),Co=rr(bo),Ao=rr(bo);function Ir(n){if(n===bo)throw Error(t(174));return n}function Ic(n,i){switch(It(Ao,i),It(Co,n),It(_i,bo),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:je(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=je(i,n)}Ot(_i),It(_i,i)}function Ss(){Ot(_i),Ot(Co),Ot(Ao)}function wh(n){Ir(Ao.current);var i=Ir(_i.current),o=je(i,n.type);i!==o&&(It(Co,n),It(_i,o))}function Uc(n){Co.current===n&&(Ot(_i),Ot(Co))}var Gt=rr(0);function Na(n){for(var i=n;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Fc=[];function Oc(){for(var n=0;n<Fc.length;n++)Fc[n]._workInProgressVersionPrimary=null;Fc.length=0}var Da=T.ReactCurrentDispatcher,zc=T.ReactCurrentBatchConfig,Ur=0,Ht=null,Kt=null,en=null,ka=!1,Ro=!1,Po=0,jg=0;function fn(){throw Error(t(321))}function Bc(n,i){if(i===null)return!1;for(var o=0;o<i.length&&o<n.length;o++)if(!ni(n[o],i[o]))return!1;return!0}function Vc(n,i,o,c,f,m){if(Ur=m,Ht=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Da.current=n===null||n.memoizedState===null?Yg:$g,n=o(c,f),Ro){m=0;do{if(Ro=!1,Po=0,25<=m)throw Error(t(301));m+=1,en=Kt=null,i.updateQueue=null,Da.current=Kg,n=o(c,f)}while(Ro)}if(Da.current=Fa,i=Kt!==null&&Kt.next!==null,Ur=0,en=Kt=Ht=null,ka=!1,i)throw Error(t(300));return n}function Gc(){var n=Po!==0;return Po=0,n}function yi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return en===null?Ht.memoizedState=en=n:en=en.next=n,en}function qn(){if(Kt===null){var n=Ht.alternate;n=n!==null?n.memoizedState:null}else n=Kt.next;var i=en===null?Ht.memoizedState:en.next;if(i!==null)en=i,Kt=n;else{if(n===null)throw Error(t(310));Kt=n,n={memoizedState:Kt.memoizedState,baseState:Kt.baseState,baseQueue:Kt.baseQueue,queue:Kt.queue,next:null},en===null?Ht.memoizedState=en=n:en=en.next=n}return en}function Lo(n,i){return typeof i=="function"?i(n):i}function Hc(n){var i=qn(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var c=Kt,f=c.baseQueue,m=o.pending;if(m!==null){if(f!==null){var b=f.next;f.next=m.next,m.next=b}c.baseQueue=f=m,o.pending=null}if(f!==null){m=f.next,c=c.baseState;var F=b=null,V=null,se=m;do{var Me=se.lane;if((Ur&Me)===Me)V!==null&&(V=V.next={lane:0,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null}),c=se.hasEagerState?se.eagerState:n(c,se.action);else{var Te={lane:Me,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null};V===null?(F=V=Te,b=c):V=V.next=Te,Ht.lanes|=Me,Fr|=Me}se=se.next}while(se!==null&&se!==m);V===null?b=c:V.next=F,ni(c,i.memoizedState)||(bn=!0),i.memoizedState=c,i.baseState=b,i.baseQueue=V,o.lastRenderedState=c}if(n=o.interleaved,n!==null){f=n;do m=f.lane,Ht.lanes|=m,Fr|=m,f=f.next;while(f!==n)}else f===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function jc(n){var i=qn(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var c=o.dispatch,f=o.pending,m=i.memoizedState;if(f!==null){o.pending=null;var b=f=f.next;do m=n(m,b.action),b=b.next;while(b!==f);ni(m,i.memoizedState)||(bn=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),o.lastRenderedState=m}return[m,c]}function Eh(){}function Th(n,i){var o=Ht,c=qn(),f=i(),m=!ni(c.memoizedState,f);if(m&&(c.memoizedState=f,bn=!0),c=c.queue,Wc(Ah.bind(null,o,c,n),[n]),c.getSnapshot!==i||m||en!==null&&en.memoizedState.tag&1){if(o.flags|=2048,No(9,Ch.bind(null,o,c,f,i),void 0,null),tn===null)throw Error(t(349));(Ur&30)!==0||bh(o,i,f)}return f}function bh(n,i,o){n.flags|=16384,n={getSnapshot:i,value:o},i=Ht.updateQueue,i===null?(i={lastEffect:null,stores:null},Ht.updateQueue=i,i.stores=[n]):(o=i.stores,o===null?i.stores=[n]:o.push(n))}function Ch(n,i,o,c){i.value=o,i.getSnapshot=c,Rh(i)&&Ph(n)}function Ah(n,i,o){return o(function(){Rh(i)&&Ph(n)})}function Rh(n){var i=n.getSnapshot;n=n.value;try{var o=i();return!ni(n,o)}catch{return!0}}function Ph(n){var i=Di(n,1);i!==null&&ai(i,n,1,-1)}function Lh(n){var i=yi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Lo,lastRenderedState:n},i.queue=n,n=n.dispatch=qg.bind(null,Ht,n),[i.memoizedState,n]}function No(n,i,o,c){return n={tag:n,create:i,destroy:o,deps:c,next:null},i=Ht.updateQueue,i===null?(i={lastEffect:null,stores:null},Ht.updateQueue=i,i.lastEffect=n.next=n):(o=i.lastEffect,o===null?i.lastEffect=n.next=n:(c=o.next,o.next=n,n.next=c,i.lastEffect=n)),n}function Nh(){return qn().memoizedState}function Ia(n,i,o,c){var f=yi();Ht.flags|=n,f.memoizedState=No(1|i,o,void 0,c===void 0?null:c)}function Ua(n,i,o,c){var f=qn();c=c===void 0?null:c;var m=void 0;if(Kt!==null){var b=Kt.memoizedState;if(m=b.destroy,c!==null&&Bc(c,b.deps)){f.memoizedState=No(i,o,m,c);return}}Ht.flags|=n,f.memoizedState=No(1|i,o,m,c)}function Dh(n,i){return Ia(8390656,8,n,i)}function Wc(n,i){return Ua(2048,8,n,i)}function kh(n,i){return Ua(4,2,n,i)}function Ih(n,i){return Ua(4,4,n,i)}function Uh(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function Fh(n,i,o){return o=o!=null?o.concat([n]):null,Ua(4,4,Uh.bind(null,i,n),o)}function Xc(){}function Oh(n,i){var o=qn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&Bc(i,c[1])?c[0]:(o.memoizedState=[n,i],n)}function zh(n,i){var o=qn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&Bc(i,c[1])?c[0]:(n=n(),o.memoizedState=[n,i],n)}function Bh(n,i,o){return(Ur&21)===0?(n.baseState&&(n.baseState=!1,bn=!0),n.memoizedState=o):(ni(o,i)||(o=vn(),Ht.lanes|=o,Fr|=o,n.baseState=!0),i)}function Wg(n,i){var o=Lt;Lt=o!==0&&4>o?o:4,n(!0);var c=zc.transition;zc.transition={};try{n(!1),i()}finally{Lt=o,zc.transition=c}}function Vh(){return qn().memoizedState}function Xg(n,i,o){var c=fr(n);if(o={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null},Gh(n))Hh(i,o);else if(o=_h(n,i,o,c),o!==null){var f=yn();ai(o,n,c,f),jh(o,i,c)}}function qg(n,i,o){var c=fr(n),f={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null};if(Gh(n))Hh(i,f);else{var m=n.alternate;if(n.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var b=i.lastRenderedState,F=m(b,o);if(f.hasEagerState=!0,f.eagerState=F,ni(F,b)){var V=i.interleaved;V===null?(f.next=f,Dc(i)):(f.next=V.next,V.next=f),i.interleaved=f;return}}catch{}finally{}o=_h(n,i,f,c),o!==null&&(f=yn(),ai(o,n,c,f),jh(o,i,c))}}function Gh(n){var i=n.alternate;return n===Ht||i!==null&&i===Ht}function Hh(n,i){Ro=ka=!0;var o=n.pending;o===null?i.next=i:(i.next=o.next,o.next=i),n.pending=i}function jh(n,i,o){if((o&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,o|=c,i.lanes=o,Yl(n,o)}}var Fa={readContext:Xn,useCallback:fn,useContext:fn,useEffect:fn,useImperativeHandle:fn,useInsertionEffect:fn,useLayoutEffect:fn,useMemo:fn,useReducer:fn,useRef:fn,useState:fn,useDebugValue:fn,useDeferredValue:fn,useTransition:fn,useMutableSource:fn,useSyncExternalStore:fn,useId:fn,unstable_isNewReconciler:!1},Yg={readContext:Xn,useCallback:function(n,i){return yi().memoizedState=[n,i===void 0?null:i],n},useContext:Xn,useEffect:Dh,useImperativeHandle:function(n,i,o){return o=o!=null?o.concat([n]):null,Ia(4194308,4,Uh.bind(null,i,n),o)},useLayoutEffect:function(n,i){return Ia(4194308,4,n,i)},useInsertionEffect:function(n,i){return Ia(4,2,n,i)},useMemo:function(n,i){var o=yi();return i=i===void 0?null:i,n=n(),o.memoizedState=[n,i],n},useReducer:function(n,i,o){var c=yi();return i=o!==void 0?o(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=Xg.bind(null,Ht,n),[c.memoizedState,n]},useRef:function(n){var i=yi();return n={current:n},i.memoizedState=n},useState:Lh,useDebugValue:Xc,useDeferredValue:function(n){return yi().memoizedState=n},useTransition:function(){var n=Lh(!1),i=n[0];return n=Wg.bind(null,n[1]),yi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,o){var c=Ht,f=yi();if(Bt){if(o===void 0)throw Error(t(407));o=o()}else{if(o=i(),tn===null)throw Error(t(349));(Ur&30)!==0||bh(c,i,o)}f.memoizedState=o;var m={value:o,getSnapshot:i};return f.queue=m,Dh(Ah.bind(null,c,m,n),[n]),c.flags|=2048,No(9,Ch.bind(null,c,m,o,i),void 0,null),o},useId:function(){var n=yi(),i=tn.identifierPrefix;if(Bt){var o=Ni,c=Li;o=(c&~(1<<32-ht(c)-1)).toString(32)+o,i=":"+i+"R"+o,o=Po++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=jg++,i=":"+i+"r"+o.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},$g={readContext:Xn,useCallback:Oh,useContext:Xn,useEffect:Wc,useImperativeHandle:Fh,useInsertionEffect:kh,useLayoutEffect:Ih,useMemo:zh,useReducer:Hc,useRef:Nh,useState:function(){return Hc(Lo)},useDebugValue:Xc,useDeferredValue:function(n){var i=qn();return Bh(i,Kt.memoizedState,n)},useTransition:function(){var n=Hc(Lo)[0],i=qn().memoizedState;return[n,i]},useMutableSource:Eh,useSyncExternalStore:Th,useId:Vh,unstable_isNewReconciler:!1},Kg={readContext:Xn,useCallback:Oh,useContext:Xn,useEffect:Wc,useImperativeHandle:Fh,useInsertionEffect:kh,useLayoutEffect:Ih,useMemo:zh,useReducer:jc,useRef:Nh,useState:function(){return jc(Lo)},useDebugValue:Xc,useDeferredValue:function(n){var i=qn();return Kt===null?i.memoizedState=n:Bh(i,Kt.memoizedState,n)},useTransition:function(){var n=jc(Lo)[0],i=qn().memoizedState;return[n,i]},useMutableSource:Eh,useSyncExternalStore:Th,useId:Vh,unstable_isNewReconciler:!1};function ri(n,i){if(n&&n.defaultProps){i=D({},i),n=n.defaultProps;for(var o in n)i[o]===void 0&&(i[o]=n[o]);return i}return i}function qc(n,i,o,c){i=n.memoizedState,o=o(c,i),o=o==null?i:D({},i,o),n.memoizedState=o,n.lanes===0&&(n.updateQueue.baseState=o)}var Oa={isMounted:function(n){return(n=n._reactInternals)?gi(n)===n:!1},enqueueSetState:function(n,i,o){n=n._reactInternals;var c=yn(),f=fr(n),m=ki(c,f);m.payload=i,o!=null&&(m.callback=o),i=lr(n,m,f),i!==null&&(ai(i,n,f,c),Pa(i,n,f))},enqueueReplaceState:function(n,i,o){n=n._reactInternals;var c=yn(),f=fr(n),m=ki(c,f);m.tag=1,m.payload=i,o!=null&&(m.callback=o),i=lr(n,m,f),i!==null&&(ai(i,n,f,c),Pa(i,n,f))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var o=yn(),c=fr(n),f=ki(o,c);f.tag=2,i!=null&&(f.callback=i),i=lr(n,f,c),i!==null&&(ai(i,n,c,o),Pa(i,n,c))}};function Wh(n,i,o,c,f,m,b){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,m,b):i.prototype&&i.prototype.isPureReactComponent?!vo(o,c)||!vo(f,m):!0}function Xh(n,i,o){var c=!1,f=sr,m=i.contextType;return typeof m=="object"&&m!==null?m=Xn(m):(f=Tn(i)?Lr:dn.current,c=i.contextTypes,m=(c=c!=null)?ps(n,f):sr),i=new i(o,m),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Oa,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=f,n.__reactInternalMemoizedMaskedChildContext=m),i}function qh(n,i,o,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,c),i.state!==n&&Oa.enqueueReplaceState(i,i.state,null)}function Yc(n,i,o,c){var f=n.stateNode;f.props=o,f.state=n.memoizedState,f.refs={},kc(n);var m=i.contextType;typeof m=="object"&&m!==null?f.context=Xn(m):(m=Tn(i)?Lr:dn.current,f.context=ps(n,m)),f.state=n.memoizedState,m=i.getDerivedStateFromProps,typeof m=="function"&&(qc(n,i,m,o),f.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(i=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),i!==f.state&&Oa.enqueueReplaceState(f,f.state,null),La(n,o,f,c),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308)}function Ms(n,i){try{var o="",c=i;do o+=ee(c),c=c.return;while(c);var f=o}catch(m){f=`
Error generating stack: `+m.message+`
`+m.stack}return{value:n,source:i,stack:f,digest:null}}function $c(n,i,o){return{value:n,source:null,stack:o??null,digest:i??null}}function Kc(n,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var Zg=typeof WeakMap=="function"?WeakMap:Map;function Yh(n,i,o){o=ki(-1,o),o.tag=3,o.payload={element:null};var c=i.value;return o.callback=function(){Wa||(Wa=!0,du=c),Kc(n,i)},o}function $h(n,i,o){o=ki(-1,o),o.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var f=i.value;o.payload=function(){return c(f)},o.callback=function(){Kc(n,i)}}var m=n.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(o.callback=function(){Kc(n,i),typeof c!="function"&&(ur===null?ur=new Set([this]):ur.add(this));var b=i.stack;this.componentDidCatch(i.value,{componentStack:b!==null?b:""})}),o}function Kh(n,i,o){var c=n.pingCache;if(c===null){c=n.pingCache=new Zg;var f=new Set;c.set(i,f)}else f=c.get(i),f===void 0&&(f=new Set,c.set(i,f));f.has(o)||(f.add(o),n=dx.bind(null,n,i,o),i.then(n,n))}function Zh(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function Jh(n,i,o,c,f){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=ki(-1,1),i.tag=2,lr(o,i,1))),o.lanes|=1),n):(n.flags|=65536,n.lanes=f,n)}var Jg=T.ReactCurrentOwner,bn=!1;function _n(n,i,o,c){i.child=n===null?vh(i,null,o,c):vs(i,n.child,o,c)}function Qh(n,i,o,c,f){o=o.render;var m=i.ref;return ys(i,f),c=Vc(n,i,o,c,m,f),o=Gc(),n!==null&&!bn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~f,Ii(n,i,f)):(Bt&&o&&Ec(i),i.flags|=1,_n(n,i,c,f),i.child)}function ep(n,i,o,c,f){if(n===null){var m=o.type;return typeof m=="function"&&!vu(m)&&m.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=m,tp(n,i,m,c,f)):(n=Za(o.type,null,c,i,i.mode,f),n.ref=i.ref,n.return=i,i.child=n)}if(m=n.child,(n.lanes&f)===0){var b=m.memoizedProps;if(o=o.compare,o=o!==null?o:vo,o(b,c)&&n.ref===i.ref)return Ii(n,i,f)}return i.flags|=1,n=pr(m,c),n.ref=i.ref,n.return=i,i.child=n}function tp(n,i,o,c,f){if(n!==null){var m=n.memoizedProps;if(vo(m,c)&&n.ref===i.ref)if(bn=!1,i.pendingProps=c=m,(n.lanes&f)!==0)(n.flags&131072)!==0&&(bn=!0);else return i.lanes=n.lanes,Ii(n,i,f)}return Zc(n,i,o,c,f)}function np(n,i,o){var c=i.pendingProps,f=c.children,m=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},It(Es,Fn),Fn|=o;else{if((o&1073741824)===0)return n=m!==null?m.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,It(Es,Fn),Fn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=m!==null?m.baseLanes:o,It(Es,Fn),Fn|=c}else m!==null?(c=m.baseLanes|o,i.memoizedState=null):c=o,It(Es,Fn),Fn|=c;return _n(n,i,f,o),i.child}function ip(n,i){var o=i.ref;(n===null&&o!==null||n!==null&&n.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function Zc(n,i,o,c,f){var m=Tn(o)?Lr:dn.current;return m=ps(i,m),ys(i,f),o=Vc(n,i,o,c,m,f),c=Gc(),n!==null&&!bn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~f,Ii(n,i,f)):(Bt&&c&&Ec(i),i.flags|=1,_n(n,i,o,f),i.child)}function rp(n,i,o,c,f){if(Tn(o)){var m=!0;Ma(i)}else m=!1;if(ys(i,f),i.stateNode===null)Ba(n,i),Xh(i,o,c),Yc(i,o,c,f),c=!0;else if(n===null){var b=i.stateNode,F=i.memoizedProps;b.props=F;var V=b.context,se=o.contextType;typeof se=="object"&&se!==null?se=Xn(se):(se=Tn(o)?Lr:dn.current,se=ps(i,se));var Me=o.getDerivedStateFromProps,Te=typeof Me=="function"||typeof b.getSnapshotBeforeUpdate=="function";Te||typeof b.UNSAFE_componentWillReceiveProps!="function"&&typeof b.componentWillReceiveProps!="function"||(F!==c||V!==se)&&qh(i,b,c,se),ar=!1;var Se=i.memoizedState;b.state=Se,La(i,c,b,f),V=i.memoizedState,F!==c||Se!==V||En.current||ar?(typeof Me=="function"&&(qc(i,o,Me,c),V=i.memoizedState),(F=ar||Wh(i,o,F,c,Se,V,se))?(Te||typeof b.UNSAFE_componentWillMount!="function"&&typeof b.componentWillMount!="function"||(typeof b.componentWillMount=="function"&&b.componentWillMount(),typeof b.UNSAFE_componentWillMount=="function"&&b.UNSAFE_componentWillMount()),typeof b.componentDidMount=="function"&&(i.flags|=4194308)):(typeof b.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=V),b.props=c,b.state=V,b.context=se,c=F):(typeof b.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{b=i.stateNode,yh(n,i),F=i.memoizedProps,se=i.type===i.elementType?F:ri(i.type,F),b.props=se,Te=i.pendingProps,Se=b.context,V=o.contextType,typeof V=="object"&&V!==null?V=Xn(V):(V=Tn(o)?Lr:dn.current,V=ps(i,V));var Fe=o.getDerivedStateFromProps;(Me=typeof Fe=="function"||typeof b.getSnapshotBeforeUpdate=="function")||typeof b.UNSAFE_componentWillReceiveProps!="function"&&typeof b.componentWillReceiveProps!="function"||(F!==Te||Se!==V)&&qh(i,b,c,V),ar=!1,Se=i.memoizedState,b.state=Se,La(i,c,b,f);var Ge=i.memoizedState;F!==Te||Se!==Ge||En.current||ar?(typeof Fe=="function"&&(qc(i,o,Fe,c),Ge=i.memoizedState),(se=ar||Wh(i,o,se,c,Se,Ge,V)||!1)?(Me||typeof b.UNSAFE_componentWillUpdate!="function"&&typeof b.componentWillUpdate!="function"||(typeof b.componentWillUpdate=="function"&&b.componentWillUpdate(c,Ge,V),typeof b.UNSAFE_componentWillUpdate=="function"&&b.UNSAFE_componentWillUpdate(c,Ge,V)),typeof b.componentDidUpdate=="function"&&(i.flags|=4),typeof b.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof b.componentDidUpdate!="function"||F===n.memoizedProps&&Se===n.memoizedState||(i.flags|=4),typeof b.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&Se===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=Ge),b.props=c,b.state=Ge,b.context=V,c=se):(typeof b.componentDidUpdate!="function"||F===n.memoizedProps&&Se===n.memoizedState||(i.flags|=4),typeof b.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&Se===n.memoizedState||(i.flags|=1024),c=!1)}return Jc(n,i,o,c,m,f)}function Jc(n,i,o,c,f,m){ip(n,i);var b=(i.flags&128)!==0;if(!c&&!b)return f&&ch(i,o,!1),Ii(n,i,m);c=i.stateNode,Jg.current=i;var F=b&&typeof o.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&b?(i.child=vs(i,n.child,null,m),i.child=vs(i,null,F,m)):_n(n,i,F,m),i.memoizedState=c.state,f&&ch(i,o,!0),i.child}function sp(n){var i=n.stateNode;i.pendingContext?ah(n,i.pendingContext,i.pendingContext!==i.context):i.context&&ah(n,i.context,!1),Ic(n,i.containerInfo)}function op(n,i,o,c,f){return xs(),Ac(f),i.flags|=256,_n(n,i,o,c),i.child}var Qc={dehydrated:null,treeContext:null,retryLane:0};function eu(n){return{baseLanes:n,cachePool:null,transitions:null}}function ap(n,i,o){var c=i.pendingProps,f=Gt.current,m=!1,b=(i.flags&128)!==0,F;if((F=b)||(F=n!==null&&n.memoizedState===null?!1:(f&2)!==0),F?(m=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(f|=1),It(Gt,f&1),n===null)return Cc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(b=c.children,n=c.fallback,m?(c=i.mode,m=i.child,b={mode:"hidden",children:b},(c&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=b):m=Ja(b,c,0,null),n=Vr(n,c,o,null),m.return=i,n.return=i,m.sibling=n,i.child=m,i.child.memoizedState=eu(o),i.memoizedState=Qc,n):tu(i,b));if(f=n.memoizedState,f!==null&&(F=f.dehydrated,F!==null))return Qg(n,i,b,c,F,f,o);if(m){m=c.fallback,b=i.mode,f=n.child,F=f.sibling;var V={mode:"hidden",children:c.children};return(b&1)===0&&i.child!==f?(c=i.child,c.childLanes=0,c.pendingProps=V,i.deletions=null):(c=pr(f,V),c.subtreeFlags=f.subtreeFlags&14680064),F!==null?m=pr(F,m):(m=Vr(m,b,o,null),m.flags|=2),m.return=i,c.return=i,c.sibling=m,i.child=c,c=m,m=i.child,b=n.child.memoizedState,b=b===null?eu(o):{baseLanes:b.baseLanes|o,cachePool:null,transitions:b.transitions},m.memoizedState=b,m.childLanes=n.childLanes&~o,i.memoizedState=Qc,c}return m=n.child,n=m.sibling,c=pr(m,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=o),c.return=i,c.sibling=null,n!==null&&(o=i.deletions,o===null?(i.deletions=[n],i.flags|=16):o.push(n)),i.child=c,i.memoizedState=null,c}function tu(n,i){return i=Ja({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function za(n,i,o,c){return c!==null&&Ac(c),vs(i,n.child,null,o),n=tu(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function Qg(n,i,o,c,f,m,b){if(o)return i.flags&256?(i.flags&=-257,c=$c(Error(t(422))),za(n,i,b,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(m=c.fallback,f=i.mode,c=Ja({mode:"visible",children:c.children},f,0,null),m=Vr(m,f,b,null),m.flags|=2,c.return=i,m.return=i,c.sibling=m,i.child=c,(i.mode&1)!==0&&vs(i,n.child,null,b),i.child.memoizedState=eu(b),i.memoizedState=Qc,m);if((i.mode&1)===0)return za(n,i,b,null);if(f.data==="$!"){if(c=f.nextSibling&&f.nextSibling.dataset,c)var F=c.dgst;return c=F,m=Error(t(419)),c=$c(m,c,void 0),za(n,i,b,c)}if(F=(b&n.childLanes)!==0,bn||F){if(c=tn,c!==null){switch(b&-b){case 4:f=2;break;case 16:f=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:f=32;break;case 536870912:f=268435456;break;default:f=0}f=(f&(c.suspendedLanes|b))!==0?0:f,f!==0&&f!==m.retryLane&&(m.retryLane=f,Di(n,f),ai(c,n,f,-1))}return xu(),c=$c(Error(t(421))),za(n,i,b,c)}return f.data==="$?"?(i.flags|=128,i.child=n.child,i=fx.bind(null,n),f._reactRetry=i,null):(n=m.treeContext,Un=ir(f.nextSibling),In=i,Bt=!0,ii=null,n!==null&&(jn[Wn++]=Li,jn[Wn++]=Ni,jn[Wn++]=Nr,Li=n.id,Ni=n.overflow,Nr=i),i=tu(i,c.children),i.flags|=4096,i)}function lp(n,i,o){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),Nc(n.return,i,o)}function nu(n,i,o,c,f){var m=n.memoizedState;m===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:o,tailMode:f}:(m.isBackwards=i,m.rendering=null,m.renderingStartTime=0,m.last=c,m.tail=o,m.tailMode=f)}function cp(n,i,o){var c=i.pendingProps,f=c.revealOrder,m=c.tail;if(_n(n,i,c.children,o),c=Gt.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&lp(n,o,i);else if(n.tag===19)lp(n,o,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(It(Gt,c),(i.mode&1)===0)i.memoizedState=null;else switch(f){case"forwards":for(o=i.child,f=null;o!==null;)n=o.alternate,n!==null&&Na(n)===null&&(f=o),o=o.sibling;o=f,o===null?(f=i.child,i.child=null):(f=o.sibling,o.sibling=null),nu(i,!1,f,o,m);break;case"backwards":for(o=null,f=i.child,i.child=null;f!==null;){if(n=f.alternate,n!==null&&Na(n)===null){i.child=f;break}n=f.sibling,f.sibling=o,o=f,f=n}nu(i,!0,o,null,m);break;case"together":nu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Ba(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Ii(n,i,o){if(n!==null&&(i.dependencies=n.dependencies),Fr|=i.lanes,(o&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,o=pr(n,n.pendingProps),i.child=o,o.return=i;n.sibling!==null;)n=n.sibling,o=o.sibling=pr(n,n.pendingProps),o.return=i;o.sibling=null}return i.child}function ex(n,i,o){switch(i.tag){case 3:sp(i),xs();break;case 5:wh(i);break;case 1:Tn(i.type)&&Ma(i);break;case 4:Ic(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,f=i.memoizedProps.value;It(Aa,c._currentValue),c._currentValue=f;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(It(Gt,Gt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?ap(n,i,o):(It(Gt,Gt.current&1),n=Ii(n,i,o),n!==null?n.sibling:null);It(Gt,Gt.current&1);break;case 19:if(c=(o&i.childLanes)!==0,(n.flags&128)!==0){if(c)return cp(n,i,o);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),It(Gt,Gt.current),c)break;return null;case 22:case 23:return i.lanes=0,np(n,i,o)}return Ii(n,i,o)}var up,iu,dp,fp;up=function(n,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)n.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},iu=function(){},dp=function(n,i,o,c){var f=n.memoizedProps;if(f!==c){n=i.stateNode,Ir(_i.current);var m=null;switch(o){case"input":f=B(n,f),c=B(n,c),m=[];break;case"select":f=D({},f,{value:void 0}),c=D({},c,{value:void 0}),m=[];break;case"textarea":f=R(n,f),c=R(n,c),m=[];break;default:typeof f.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=_a)}xt(o,c);var b;o=null;for(se in f)if(!c.hasOwnProperty(se)&&f.hasOwnProperty(se)&&f[se]!=null)if(se==="style"){var F=f[se];for(b in F)F.hasOwnProperty(b)&&(o||(o={}),o[b]="")}else se!=="dangerouslySetInnerHTML"&&se!=="children"&&se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&se!=="autoFocus"&&(a.hasOwnProperty(se)?m||(m=[]):(m=m||[]).push(se,null));for(se in c){var V=c[se];if(F=f!=null?f[se]:void 0,c.hasOwnProperty(se)&&V!==F&&(V!=null||F!=null))if(se==="style")if(F){for(b in F)!F.hasOwnProperty(b)||V&&V.hasOwnProperty(b)||(o||(o={}),o[b]="");for(b in V)V.hasOwnProperty(b)&&F[b]!==V[b]&&(o||(o={}),o[b]=V[b])}else o||(m||(m=[]),m.push(se,o)),o=V;else se==="dangerouslySetInnerHTML"?(V=V?V.__html:void 0,F=F?F.__html:void 0,V!=null&&F!==V&&(m=m||[]).push(se,V)):se==="children"?typeof V!="string"&&typeof V!="number"||(m=m||[]).push(se,""+V):se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&(a.hasOwnProperty(se)?(V!=null&&se==="onScroll"&&Ft("scroll",n),m||F===V||(m=[])):(m=m||[]).push(se,V))}o&&(m=m||[]).push("style",o);var se=m;(i.updateQueue=se)&&(i.flags|=4)}},fp=function(n,i,o,c){o!==c&&(i.flags|=4)};function Do(n,i){if(!Bt)switch(n.tailMode){case"hidden":i=n.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?n.tail=null:o.sibling=null;break;case"collapsed":o=n.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function hn(n){var i=n.alternate!==null&&n.alternate.child===n.child,o=0,c=0;if(i)for(var f=n.child;f!==null;)o|=f.lanes|f.childLanes,c|=f.subtreeFlags&14680064,c|=f.flags&14680064,f.return=n,f=f.sibling;else for(f=n.child;f!==null;)o|=f.lanes|f.childLanes,c|=f.subtreeFlags,c|=f.flags,f.return=n,f=f.sibling;return n.subtreeFlags|=c,n.childLanes=o,i}function tx(n,i,o){var c=i.pendingProps;switch(Tc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(i),null;case 1:return Tn(i.type)&&Sa(),hn(i),null;case 3:return c=i.stateNode,Ss(),Ot(En),Ot(dn),Oc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(ba(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ii!==null&&(pu(ii),ii=null))),iu(n,i),hn(i),null;case 5:Uc(i);var f=Ir(Ao.current);if(o=i.type,n!==null&&i.stateNode!=null)dp(n,i,o,c,f),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return hn(i),null}if(n=Ir(_i.current),ba(i)){c=i.stateNode,o=i.type;var m=i.memoizedProps;switch(c[vi]=i,c[wo]=m,n=(i.mode&1)!==0,o){case"dialog":Ft("cancel",c),Ft("close",c);break;case"iframe":case"object":case"embed":Ft("load",c);break;case"video":case"audio":for(f=0;f<yo.length;f++)Ft(yo[f],c);break;case"source":Ft("error",c);break;case"img":case"image":case"link":Ft("error",c),Ft("load",c);break;case"details":Ft("toggle",c);break;case"input":Mt(c,m),Ft("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!m.multiple},Ft("invalid",c);break;case"textarea":ne(c,m),Ft("invalid",c)}xt(o,m),f=null;for(var b in m)if(m.hasOwnProperty(b)){var F=m[b];b==="children"?typeof F=="string"?c.textContent!==F&&(m.suppressHydrationWarning!==!0&&va(c.textContent,F,n),f=["children",F]):typeof F=="number"&&c.textContent!==""+F&&(m.suppressHydrationWarning!==!0&&va(c.textContent,F,n),f=["children",""+F]):a.hasOwnProperty(b)&&F!=null&&b==="onScroll"&&Ft("scroll",c)}switch(o){case"input":Ze(c),Be(c,m,!0);break;case"textarea":Ze(c),ye(c);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(c.onclick=_a)}c=f,i.updateQueue=c,c!==null&&(i.flags|=4)}else{b=f.nodeType===9?f:f.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=ge(o)),n==="http://www.w3.org/1999/xhtml"?o==="script"?(n=b.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=b.createElement(o,{is:c.is}):(n=b.createElement(o),o==="select"&&(b=n,c.multiple?b.multiple=!0:c.size&&(b.size=c.size))):n=b.createElementNS(n,o),n[vi]=i,n[wo]=c,up(n,i,!1,!1),i.stateNode=n;e:{switch(b=ct(o,c),o){case"dialog":Ft("cancel",n),Ft("close",n),f=c;break;case"iframe":case"object":case"embed":Ft("load",n),f=c;break;case"video":case"audio":for(f=0;f<yo.length;f++)Ft(yo[f],n);f=c;break;case"source":Ft("error",n),f=c;break;case"img":case"image":case"link":Ft("error",n),Ft("load",n),f=c;break;case"details":Ft("toggle",n),f=c;break;case"input":Mt(n,c),f=B(n,c),Ft("invalid",n);break;case"option":f=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},f=D({},c,{value:void 0}),Ft("invalid",n);break;case"textarea":ne(n,c),f=R(n,c),Ft("invalid",n);break;default:f=c}xt(o,f),F=f;for(m in F)if(F.hasOwnProperty(m)){var V=F[m];m==="style"?rt(n,V):m==="dangerouslySetInnerHTML"?(V=V?V.__html:void 0,V!=null&&Ue(n,V)):m==="children"?typeof V=="string"?(o!=="textarea"||V!=="")&&ft(n,V):typeof V=="number"&&ft(n,""+V):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(a.hasOwnProperty(m)?V!=null&&m==="onScroll"&&Ft("scroll",n):V!=null&&U(n,m,V,b))}switch(o){case"input":Ze(n),Be(n,c,!1);break;case"textarea":Ze(n),ye(n);break;case"option":c.value!=null&&n.setAttribute("value",""+me(c.value));break;case"select":n.multiple=!!c.multiple,m=c.value,m!=null?k(n,!!c.multiple,m,!1):c.defaultValue!=null&&k(n,!!c.multiple,c.defaultValue,!0);break;default:typeof f.onClick=="function"&&(n.onclick=_a)}switch(o){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return hn(i),null;case 6:if(n&&i.stateNode!=null)fp(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(o=Ir(Ao.current),Ir(_i.current),ba(i)){if(c=i.stateNode,o=i.memoizedProps,c[vi]=i,(m=c.nodeValue!==o)&&(n=In,n!==null))switch(n.tag){case 3:va(c.nodeValue,o,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&va(c.nodeValue,o,(n.mode&1)!==0)}m&&(i.flags|=4)}else c=(o.nodeType===9?o:o.ownerDocument).createTextNode(c),c[vi]=i,i.stateNode=c}return hn(i),null;case 13:if(Ot(Gt),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Bt&&Un!==null&&(i.mode&1)!==0&&(i.flags&128)===0)mh(),xs(),i.flags|=98560,m=!1;else if(m=ba(i),c!==null&&c.dehydrated!==null){if(n===null){if(!m)throw Error(t(318));if(m=i.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(t(317));m[vi]=i}else xs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;hn(i),m=!1}else ii!==null&&(pu(ii),ii=null),m=!0;if(!m)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Gt.current&1)!==0?Zt===0&&(Zt=3):xu())),i.updateQueue!==null&&(i.flags|=4),hn(i),null);case 4:return Ss(),iu(n,i),n===null&&So(i.stateNode.containerInfo),hn(i),null;case 10:return Lc(i.type._context),hn(i),null;case 17:return Tn(i.type)&&Sa(),hn(i),null;case 19:if(Ot(Gt),m=i.memoizedState,m===null)return hn(i),null;if(c=(i.flags&128)!==0,b=m.rendering,b===null)if(c)Do(m,!1);else{if(Zt!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(b=Na(n),b!==null){for(i.flags|=128,Do(m,!1),c=b.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=o,o=i.child;o!==null;)m=o,n=c,m.flags&=14680066,b=m.alternate,b===null?(m.childLanes=0,m.lanes=n,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=b.childLanes,m.lanes=b.lanes,m.child=b.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=b.memoizedProps,m.memoizedState=b.memoizedState,m.updateQueue=b.updateQueue,m.type=b.type,n=b.dependencies,m.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),o=o.sibling;return It(Gt,Gt.current&1|2),i.child}n=n.sibling}m.tail!==null&&be()>Ts&&(i.flags|=128,c=!0,Do(m,!1),i.lanes=4194304)}else{if(!c)if(n=Na(b),n!==null){if(i.flags|=128,c=!0,o=n.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Do(m,!0),m.tail===null&&m.tailMode==="hidden"&&!b.alternate&&!Bt)return hn(i),null}else 2*be()-m.renderingStartTime>Ts&&o!==1073741824&&(i.flags|=128,c=!0,Do(m,!1),i.lanes=4194304);m.isBackwards?(b.sibling=i.child,i.child=b):(o=m.last,o!==null?o.sibling=b:i.child=b,m.last=b)}return m.tail!==null?(i=m.tail,m.rendering=i,m.tail=i.sibling,m.renderingStartTime=be(),i.sibling=null,o=Gt.current,It(Gt,c?o&1|2:o&1),i):(hn(i),null);case 22:case 23:return gu(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(Fn&1073741824)!==0&&(hn(i),i.subtreeFlags&6&&(i.flags|=8192)):hn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function nx(n,i){switch(Tc(i),i.tag){case 1:return Tn(i.type)&&Sa(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Ss(),Ot(En),Ot(dn),Oc(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Uc(i),null;case 13:if(Ot(Gt),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));xs()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Ot(Gt),null;case 4:return Ss(),null;case 10:return Lc(i.type._context),null;case 22:case 23:return gu(),null;case 24:return null;default:return null}}var Va=!1,pn=!1,ix=typeof WeakSet=="function"?WeakSet:Set,ze=null;function ws(n,i){var o=n.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(c){jt(n,i,c)}else o.current=null}function ru(n,i,o){try{o()}catch(c){jt(n,i,c)}}var hp=!1;function rx(n,i){if(gc=aa,n=Wf(),lc(n)){if("selectionStart"in n)var o={start:n.selectionStart,end:n.selectionEnd};else e:{o=(o=n.ownerDocument)&&o.defaultView||window;var c=o.getSelection&&o.getSelection();if(c&&c.rangeCount!==0){o=c.anchorNode;var f=c.anchorOffset,m=c.focusNode;c=c.focusOffset;try{o.nodeType,m.nodeType}catch{o=null;break e}var b=0,F=-1,V=-1,se=0,Me=0,Te=n,Se=null;t:for(;;){for(var Fe;Te!==o||f!==0&&Te.nodeType!==3||(F=b+f),Te!==m||c!==0&&Te.nodeType!==3||(V=b+c),Te.nodeType===3&&(b+=Te.nodeValue.length),(Fe=Te.firstChild)!==null;)Se=Te,Te=Fe;for(;;){if(Te===n)break t;if(Se===o&&++se===f&&(F=b),Se===m&&++Me===c&&(V=b),(Fe=Te.nextSibling)!==null)break;Te=Se,Se=Te.parentNode}Te=Fe}o=F===-1||V===-1?null:{start:F,end:V}}else o=null}o=o||{start:0,end:0}}else o=null;for(xc={focusedElem:n,selectionRange:o},aa=!1,ze=i;ze!==null;)if(i=ze,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,ze=n;else for(;ze!==null;){i=ze;try{var Ge=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Ge!==null){var Xe=Ge.memoizedProps,Wt=Ge.memoizedState,Z=i.stateNode,j=Z.getSnapshotBeforeUpdate(i.elementType===i.type?Xe:ri(i.type,Xe),Wt);Z.__reactInternalSnapshotBeforeUpdate=j}break;case 3:var te=i.stateNode.containerInfo;te.nodeType===1?te.textContent="":te.nodeType===9&&te.documentElement&&te.removeChild(te.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Ce){jt(i,i.return,Ce)}if(n=i.sibling,n!==null){n.return=i.return,ze=n;break}ze=i.return}return Ge=hp,hp=!1,Ge}function ko(n,i,o){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var f=c=c.next;do{if((f.tag&n)===n){var m=f.destroy;f.destroy=void 0,m!==void 0&&ru(i,o,m)}f=f.next}while(f!==c)}}function Ga(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&n)===n){var c=o.create;o.destroy=c()}o=o.next}while(o!==i)}}function su(n){var i=n.ref;if(i!==null){var o=n.stateNode;switch(n.tag){case 5:n=o;break;default:n=o}typeof i=="function"?i(n):i.current=n}}function pp(n){var i=n.alternate;i!==null&&(n.alternate=null,pp(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[vi],delete i[wo],delete i[Sc],delete i[Bg],delete i[Vg])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function mp(n){return n.tag===5||n.tag===3||n.tag===4}function gp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||mp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function ou(n,i,o){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(n,i):o.insertBefore(n,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(n,o)):(i=o,i.appendChild(n)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=_a));else if(c!==4&&(n=n.child,n!==null))for(ou(n,i,o),n=n.sibling;n!==null;)ou(n,i,o),n=n.sibling}function au(n,i,o){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?o.insertBefore(n,i):o.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(au(n,i,o),n=n.sibling;n!==null;)au(n,i,o),n=n.sibling}var on=null,si=!1;function cr(n,i,o){for(o=o.child;o!==null;)xp(n,i,o),o=o.sibling}function xp(n,i,o){if(_t&&typeof _t.onCommitFiberUnmount=="function")try{_t.onCommitFiberUnmount(Rt,o)}catch{}switch(o.tag){case 5:pn||ws(o,i);case 6:var c=on,f=si;on=null,cr(n,i,o),on=c,si=f,on!==null&&(si?(n=on,o=o.stateNode,n.nodeType===8?n.parentNode.removeChild(o):n.removeChild(o)):on.removeChild(o.stateNode));break;case 18:on!==null&&(si?(n=on,o=o.stateNode,n.nodeType===8?yc(n.parentNode,o):n.nodeType===1&&yc(n,o),fo(n)):yc(on,o.stateNode));break;case 4:c=on,f=si,on=o.stateNode.containerInfo,si=!0,cr(n,i,o),on=c,si=f;break;case 0:case 11:case 14:case 15:if(!pn&&(c=o.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){f=c=c.next;do{var m=f,b=m.destroy;m=m.tag,b!==void 0&&((m&2)!==0||(m&4)!==0)&&ru(o,i,b),f=f.next}while(f!==c)}cr(n,i,o);break;case 1:if(!pn&&(ws(o,i),c=o.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=o.memoizedProps,c.state=o.memoizedState,c.componentWillUnmount()}catch(F){jt(o,i,F)}cr(n,i,o);break;case 21:cr(n,i,o);break;case 22:o.mode&1?(pn=(c=pn)||o.memoizedState!==null,cr(n,i,o),pn=c):cr(n,i,o);break;default:cr(n,i,o)}}function vp(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var o=n.stateNode;o===null&&(o=n.stateNode=new ix),i.forEach(function(c){var f=hx.bind(null,n,c);o.has(c)||(o.add(c),c.then(f,f))})}}function oi(n,i){var o=i.deletions;if(o!==null)for(var c=0;c<o.length;c++){var f=o[c];try{var m=n,b=i,F=b;e:for(;F!==null;){switch(F.tag){case 5:on=F.stateNode,si=!1;break e;case 3:on=F.stateNode.containerInfo,si=!0;break e;case 4:on=F.stateNode.containerInfo,si=!0;break e}F=F.return}if(on===null)throw Error(t(160));xp(m,b,f),on=null,si=!1;var V=f.alternate;V!==null&&(V.return=null),f.return=null}catch(se){jt(f,i,se)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)_p(i,n),i=i.sibling}function _p(n,i){var o=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(oi(i,n),Si(n),c&4){try{ko(3,n,n.return),Ga(3,n)}catch(Xe){jt(n,n.return,Xe)}try{ko(5,n,n.return)}catch(Xe){jt(n,n.return,Xe)}}break;case 1:oi(i,n),Si(n),c&512&&o!==null&&ws(o,o.return);break;case 5:if(oi(i,n),Si(n),c&512&&o!==null&&ws(o,o.return),n.flags&32){var f=n.stateNode;try{ft(f,"")}catch(Xe){jt(n,n.return,Xe)}}if(c&4&&(f=n.stateNode,f!=null)){var m=n.memoizedProps,b=o!==null?o.memoizedProps:m,F=n.type,V=n.updateQueue;if(n.updateQueue=null,V!==null)try{F==="input"&&m.type==="radio"&&m.name!=null&&it(f,m),ct(F,b);var se=ct(F,m);for(b=0;b<V.length;b+=2){var Me=V[b],Te=V[b+1];Me==="style"?rt(f,Te):Me==="dangerouslySetInnerHTML"?Ue(f,Te):Me==="children"?ft(f,Te):U(f,Me,Te,se)}switch(F){case"input":Qe(f,m);break;case"textarea":_e(f,m);break;case"select":var Se=f._wrapperState.wasMultiple;f._wrapperState.wasMultiple=!!m.multiple;var Fe=m.value;Fe!=null?k(f,!!m.multiple,Fe,!1):Se!==!!m.multiple&&(m.defaultValue!=null?k(f,!!m.multiple,m.defaultValue,!0):k(f,!!m.multiple,m.multiple?[]:"",!1))}f[wo]=m}catch(Xe){jt(n,n.return,Xe)}}break;case 6:if(oi(i,n),Si(n),c&4){if(n.stateNode===null)throw Error(t(162));f=n.stateNode,m=n.memoizedProps;try{f.nodeValue=m}catch(Xe){jt(n,n.return,Xe)}}break;case 3:if(oi(i,n),Si(n),c&4&&o!==null&&o.memoizedState.isDehydrated)try{fo(i.containerInfo)}catch(Xe){jt(n,n.return,Xe)}break;case 4:oi(i,n),Si(n);break;case 13:oi(i,n),Si(n),f=n.child,f.flags&8192&&(m=f.memoizedState!==null,f.stateNode.isHidden=m,!m||f.alternate!==null&&f.alternate.memoizedState!==null||(uu=be())),c&4&&vp(n);break;case 22:if(Me=o!==null&&o.memoizedState!==null,n.mode&1?(pn=(se=pn)||Me,oi(i,n),pn=se):oi(i,n),Si(n),c&8192){if(se=n.memoizedState!==null,(n.stateNode.isHidden=se)&&!Me&&(n.mode&1)!==0)for(ze=n,Me=n.child;Me!==null;){for(Te=ze=Me;ze!==null;){switch(Se=ze,Fe=Se.child,Se.tag){case 0:case 11:case 14:case 15:ko(4,Se,Se.return);break;case 1:ws(Se,Se.return);var Ge=Se.stateNode;if(typeof Ge.componentWillUnmount=="function"){c=Se,o=Se.return;try{i=c,Ge.props=i.memoizedProps,Ge.state=i.memoizedState,Ge.componentWillUnmount()}catch(Xe){jt(c,o,Xe)}}break;case 5:ws(Se,Se.return);break;case 22:if(Se.memoizedState!==null){Mp(Te);continue}}Fe!==null?(Fe.return=Se,ze=Fe):Mp(Te)}Me=Me.sibling}e:for(Me=null,Te=n;;){if(Te.tag===5){if(Me===null){Me=Te;try{f=Te.stateNode,se?(m=f.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(F=Te.stateNode,V=Te.memoizedProps.style,b=V!=null&&V.hasOwnProperty("display")?V.display:null,F.style.display=et("display",b))}catch(Xe){jt(n,n.return,Xe)}}}else if(Te.tag===6){if(Me===null)try{Te.stateNode.nodeValue=se?"":Te.memoizedProps}catch(Xe){jt(n,n.return,Xe)}}else if((Te.tag!==22&&Te.tag!==23||Te.memoizedState===null||Te===n)&&Te.child!==null){Te.child.return=Te,Te=Te.child;continue}if(Te===n)break e;for(;Te.sibling===null;){if(Te.return===null||Te.return===n)break e;Me===Te&&(Me=null),Te=Te.return}Me===Te&&(Me=null),Te.sibling.return=Te.return,Te=Te.sibling}}break;case 19:oi(i,n),Si(n),c&4&&vp(n);break;case 21:break;default:oi(i,n),Si(n)}}function Si(n){var i=n.flags;if(i&2){try{e:{for(var o=n.return;o!==null;){if(mp(o)){var c=o;break e}o=o.return}throw Error(t(160))}switch(c.tag){case 5:var f=c.stateNode;c.flags&32&&(ft(f,""),c.flags&=-33);var m=gp(n);au(n,m,f);break;case 3:case 4:var b=c.stateNode.containerInfo,F=gp(n);ou(n,F,b);break;default:throw Error(t(161))}}catch(V){jt(n,n.return,V)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function sx(n,i,o){ze=n,yp(n)}function yp(n,i,o){for(var c=(n.mode&1)!==0;ze!==null;){var f=ze,m=f.child;if(f.tag===22&&c){var b=f.memoizedState!==null||Va;if(!b){var F=f.alternate,V=F!==null&&F.memoizedState!==null||pn;F=Va;var se=pn;if(Va=b,(pn=V)&&!se)for(ze=f;ze!==null;)b=ze,V=b.child,b.tag===22&&b.memoizedState!==null?wp(f):V!==null?(V.return=b,ze=V):wp(f);for(;m!==null;)ze=m,yp(m),m=m.sibling;ze=f,Va=F,pn=se}Sp(n)}else(f.subtreeFlags&8772)!==0&&m!==null?(m.return=f,ze=m):Sp(n)}}function Sp(n){for(;ze!==null;){var i=ze;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:pn||Ga(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!pn)if(o===null)c.componentDidMount();else{var f=i.elementType===i.type?o.memoizedProps:ri(i.type,o.memoizedProps);c.componentDidUpdate(f,o.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var m=i.updateQueue;m!==null&&Mh(i,m,c);break;case 3:var b=i.updateQueue;if(b!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}Mh(i,b,o)}break;case 5:var F=i.stateNode;if(o===null&&i.flags&4){o=F;var V=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":V.autoFocus&&o.focus();break;case"img":V.src&&(o.src=V.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var se=i.alternate;if(se!==null){var Me=se.memoizedState;if(Me!==null){var Te=Me.dehydrated;Te!==null&&fo(Te)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}pn||i.flags&512&&su(i)}catch(Se){jt(i,i.return,Se)}}if(i===n){ze=null;break}if(o=i.sibling,o!==null){o.return=i.return,ze=o;break}ze=i.return}}function Mp(n){for(;ze!==null;){var i=ze;if(i===n){ze=null;break}var o=i.sibling;if(o!==null){o.return=i.return,ze=o;break}ze=i.return}}function wp(n){for(;ze!==null;){var i=ze;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Ga(4,i)}catch(V){jt(i,o,V)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var f=i.return;try{c.componentDidMount()}catch(V){jt(i,f,V)}}var m=i.return;try{su(i)}catch(V){jt(i,m,V)}break;case 5:var b=i.return;try{su(i)}catch(V){jt(i,b,V)}}}catch(V){jt(i,i.return,V)}if(i===n){ze=null;break}var F=i.sibling;if(F!==null){F.return=i.return,ze=F;break}ze=i.return}}var ox=Math.ceil,Ha=T.ReactCurrentDispatcher,lu=T.ReactCurrentOwner,Yn=T.ReactCurrentBatchConfig,Et=0,tn=null,Xt=null,an=0,Fn=0,Es=rr(0),Zt=0,Io=null,Fr=0,ja=0,cu=0,Uo=null,Cn=null,uu=0,Ts=1/0,Ui=null,Wa=!1,du=null,ur=null,Xa=!1,dr=null,qa=0,Fo=0,fu=null,Ya=-1,$a=0;function yn(){return(Et&6)!==0?be():Ya!==-1?Ya:Ya=be()}function fr(n){return(n.mode&1)===0?1:(Et&2)!==0&&an!==0?an&-an:Hg.transition!==null?($a===0&&($a=vn()),$a):(n=Lt,n!==0||(n=window.event,n=n===void 0?16:Tf(n.type)),n)}function ai(n,i,o,c){if(50<Fo)throw Fo=0,fu=null,Error(t(185));wn(n,o,c),((Et&2)===0||n!==tn)&&(n===tn&&((Et&2)===0&&(ja|=o),Zt===4&&hr(n,an)),An(n,c),o===1&&Et===0&&(i.mode&1)===0&&(Ts=be()+500,wa&&or()))}function An(n,i){var o=n.callbackNode;Gn(n,i);var c=xi(n,n===tn?an:0);if(c===0)o!==null&&ae(o),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(o!=null&&ae(o),i===1)n.tag===0?Gg(Tp.bind(null,n)):uh(Tp.bind(null,n)),Og(function(){(Et&6)===0&&or()}),o=null;else{switch(xf(c)){case 1:o=We;break;case 4:o=ot;break;case 16:o=lt;break;case 536870912:o=yt;break;default:o=lt}o=Dp(o,Ep.bind(null,n))}n.callbackPriority=i,n.callbackNode=o}}function Ep(n,i){if(Ya=-1,$a=0,(Et&6)!==0)throw Error(t(327));var o=n.callbackNode;if(bs()&&n.callbackNode!==o)return null;var c=xi(n,n===tn?an:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=Ka(n,c);else{i=c;var f=Et;Et|=2;var m=Cp();(tn!==n||an!==i)&&(Ui=null,Ts=be()+500,zr(n,i));do try{cx();break}catch(F){bp(n,F)}while(!0);Pc(),Ha.current=m,Et=f,Xt!==null?i=0:(tn=null,an=0,i=Zt)}if(i!==0){if(i===2&&(f=Ai(n),f!==0&&(c=f,i=hu(n,f))),i===1)throw o=Io,zr(n,0),hr(n,c),An(n,be()),o;if(i===6)hr(n,c);else{if(f=n.current.alternate,(c&30)===0&&!ax(f)&&(i=Ka(n,c),i===2&&(m=Ai(n),m!==0&&(c=m,i=hu(n,m))),i===1))throw o=Io,zr(n,0),hr(n,c),An(n,be()),o;switch(n.finishedWork=f,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:Br(n,Cn,Ui);break;case 3:if(hr(n,c),(c&130023424)===c&&(i=uu+500-be(),10<i)){if(xi(n,0)!==0)break;if(f=n.suspendedLanes,(f&c)!==c){yn(),n.pingedLanes|=n.suspendedLanes&f;break}n.timeoutHandle=_c(Br.bind(null,n,Cn,Ui),i);break}Br(n,Cn,Ui);break;case 4:if(hr(n,c),(c&4194240)===c)break;for(i=n.eventTimes,f=-1;0<c;){var b=31-ht(c);m=1<<b,b=i[b],b>f&&(f=b),c&=~m}if(c=f,c=be()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*ox(c/1960))-c,10<c){n.timeoutHandle=_c(Br.bind(null,n,Cn,Ui),c);break}Br(n,Cn,Ui);break;case 5:Br(n,Cn,Ui);break;default:throw Error(t(329))}}}return An(n,be()),n.callbackNode===o?Ep.bind(null,n):null}function hu(n,i){var o=Uo;return n.current.memoizedState.isDehydrated&&(zr(n,i).flags|=256),n=Ka(n,i),n!==2&&(i=Cn,Cn=o,i!==null&&pu(i)),n}function pu(n){Cn===null?Cn=n:Cn.push.apply(Cn,n)}function ax(n){for(var i=n;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var c=0;c<o.length;c++){var f=o[c],m=f.getSnapshot;f=f.value;try{if(!ni(m(),f))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function hr(n,i){for(i&=~cu,i&=~ja,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var o=31-ht(i),c=1<<o;n[o]=-1,i&=~c}}function Tp(n){if((Et&6)!==0)throw Error(t(327));bs();var i=xi(n,0);if((i&1)===0)return An(n,be()),null;var o=Ka(n,i);if(n.tag!==0&&o===2){var c=Ai(n);c!==0&&(i=c,o=hu(n,c))}if(o===1)throw o=Io,zr(n,0),hr(n,i),An(n,be()),o;if(o===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,Br(n,Cn,Ui),An(n,be()),null}function mu(n,i){var o=Et;Et|=1;try{return n(i)}finally{Et=o,Et===0&&(Ts=be()+500,wa&&or())}}function Or(n){dr!==null&&dr.tag===0&&(Et&6)===0&&bs();var i=Et;Et|=1;var o=Yn.transition,c=Lt;try{if(Yn.transition=null,Lt=1,n)return n()}finally{Lt=c,Yn.transition=o,Et=i,(Et&6)===0&&or()}}function gu(){Fn=Es.current,Ot(Es)}function zr(n,i){n.finishedWork=null,n.finishedLanes=0;var o=n.timeoutHandle;if(o!==-1&&(n.timeoutHandle=-1,Fg(o)),Xt!==null)for(o=Xt.return;o!==null;){var c=o;switch(Tc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Sa();break;case 3:Ss(),Ot(En),Ot(dn),Oc();break;case 5:Uc(c);break;case 4:Ss();break;case 13:Ot(Gt);break;case 19:Ot(Gt);break;case 10:Lc(c.type._context);break;case 22:case 23:gu()}o=o.return}if(tn=n,Xt=n=pr(n.current,null),an=Fn=i,Zt=0,Io=null,cu=ja=Fr=0,Cn=Uo=null,kr!==null){for(i=0;i<kr.length;i++)if(o=kr[i],c=o.interleaved,c!==null){o.interleaved=null;var f=c.next,m=o.pending;if(m!==null){var b=m.next;m.next=f,c.next=b}o.pending=c}kr=null}return n}function bp(n,i){do{var o=Xt;try{if(Pc(),Da.current=Fa,ka){for(var c=Ht.memoizedState;c!==null;){var f=c.queue;f!==null&&(f.pending=null),c=c.next}ka=!1}if(Ur=0,en=Kt=Ht=null,Ro=!1,Po=0,lu.current=null,o===null||o.return===null){Zt=1,Io=i,Xt=null;break}e:{var m=n,b=o.return,F=o,V=i;if(i=an,F.flags|=32768,V!==null&&typeof V=="object"&&typeof V.then=="function"){var se=V,Me=F,Te=Me.tag;if((Me.mode&1)===0&&(Te===0||Te===11||Te===15)){var Se=Me.alternate;Se?(Me.updateQueue=Se.updateQueue,Me.memoizedState=Se.memoizedState,Me.lanes=Se.lanes):(Me.updateQueue=null,Me.memoizedState=null)}var Fe=Zh(b);if(Fe!==null){Fe.flags&=-257,Jh(Fe,b,F,m,i),Fe.mode&1&&Kh(m,se,i),i=Fe,V=se;var Ge=i.updateQueue;if(Ge===null){var Xe=new Set;Xe.add(V),i.updateQueue=Xe}else Ge.add(V);break e}else{if((i&1)===0){Kh(m,se,i),xu();break e}V=Error(t(426))}}else if(Bt&&F.mode&1){var Wt=Zh(b);if(Wt!==null){(Wt.flags&65536)===0&&(Wt.flags|=256),Jh(Wt,b,F,m,i),Ac(Ms(V,F));break e}}m=V=Ms(V,F),Zt!==4&&(Zt=2),Uo===null?Uo=[m]:Uo.push(m),m=b;do{switch(m.tag){case 3:m.flags|=65536,i&=-i,m.lanes|=i;var Z=Yh(m,V,i);Sh(m,Z);break e;case 1:F=V;var j=m.type,te=m.stateNode;if((m.flags&128)===0&&(typeof j.getDerivedStateFromError=="function"||te!==null&&typeof te.componentDidCatch=="function"&&(ur===null||!ur.has(te)))){m.flags|=65536,i&=-i,m.lanes|=i;var Ce=$h(m,F,i);Sh(m,Ce);break e}}m=m.return}while(m!==null)}Rp(o)}catch($e){i=$e,Xt===o&&o!==null&&(Xt=o=o.return);continue}break}while(!0)}function Cp(){var n=Ha.current;return Ha.current=Fa,n===null?Fa:n}function xu(){(Zt===0||Zt===3||Zt===2)&&(Zt=4),tn===null||(Fr&268435455)===0&&(ja&268435455)===0||hr(tn,an)}function Ka(n,i){var o=Et;Et|=2;var c=Cp();(tn!==n||an!==i)&&(Ui=null,zr(n,i));do try{lx();break}catch(f){bp(n,f)}while(!0);if(Pc(),Et=o,Ha.current=c,Xt!==null)throw Error(t(261));return tn=null,an=0,Zt}function lx(){for(;Xt!==null;)Ap(Xt)}function cx(){for(;Xt!==null&&!K();)Ap(Xt)}function Ap(n){var i=Np(n.alternate,n,Fn);n.memoizedProps=n.pendingProps,i===null?Rp(n):Xt=i,lu.current=null}function Rp(n){var i=n;do{var o=i.alternate;if(n=i.return,(i.flags&32768)===0){if(o=tx(o,i,Fn),o!==null){Xt=o;return}}else{if(o=nx(o,i),o!==null){o.flags&=32767,Xt=o;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Zt=6,Xt=null;return}}if(i=i.sibling,i!==null){Xt=i;return}Xt=i=n}while(i!==null);Zt===0&&(Zt=5)}function Br(n,i,o){var c=Lt,f=Yn.transition;try{Yn.transition=null,Lt=1,ux(n,i,o,c)}finally{Yn.transition=f,Lt=c}return null}function ux(n,i,o,c){do bs();while(dr!==null);if((Et&6)!==0)throw Error(t(327));o=n.finishedWork;var f=n.finishedLanes;if(o===null)return null;if(n.finishedWork=null,n.finishedLanes=0,o===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var m=o.lanes|o.childLanes;if(ra(n,m),n===tn&&(Xt=tn=null,an=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||Xa||(Xa=!0,Dp(lt,function(){return bs(),null})),m=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||m){m=Yn.transition,Yn.transition=null;var b=Lt;Lt=1;var F=Et;Et|=4,lu.current=null,rx(n,o),_p(o,n),Pg(xc),aa=!!gc,xc=gc=null,n.current=o,sx(o),Ae(),Et=F,Lt=b,Yn.transition=m}else n.current=o;if(Xa&&(Xa=!1,dr=n,qa=f),m=n.pendingLanes,m===0&&(ur=null),cn(o.stateNode),An(n,be()),i!==null)for(c=n.onRecoverableError,o=0;o<i.length;o++)f=i[o],c(f.value,{componentStack:f.stack,digest:f.digest});if(Wa)throw Wa=!1,n=du,du=null,n;return(qa&1)!==0&&n.tag!==0&&bs(),m=n.pendingLanes,(m&1)!==0?n===fu?Fo++:(Fo=0,fu=n):Fo=0,or(),null}function bs(){if(dr!==null){var n=xf(qa),i=Yn.transition,o=Lt;try{if(Yn.transition=null,Lt=16>n?16:n,dr===null)var c=!1;else{if(n=dr,dr=null,qa=0,(Et&6)!==0)throw Error(t(331));var f=Et;for(Et|=4,ze=n.current;ze!==null;){var m=ze,b=m.child;if((ze.flags&16)!==0){var F=m.deletions;if(F!==null){for(var V=0;V<F.length;V++){var se=F[V];for(ze=se;ze!==null;){var Me=ze;switch(Me.tag){case 0:case 11:case 15:ko(8,Me,m)}var Te=Me.child;if(Te!==null)Te.return=Me,ze=Te;else for(;ze!==null;){Me=ze;var Se=Me.sibling,Fe=Me.return;if(pp(Me),Me===se){ze=null;break}if(Se!==null){Se.return=Fe,ze=Se;break}ze=Fe}}}var Ge=m.alternate;if(Ge!==null){var Xe=Ge.child;if(Xe!==null){Ge.child=null;do{var Wt=Xe.sibling;Xe.sibling=null,Xe=Wt}while(Xe!==null)}}ze=m}}if((m.subtreeFlags&2064)!==0&&b!==null)b.return=m,ze=b;else e:for(;ze!==null;){if(m=ze,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:ko(9,m,m.return)}var Z=m.sibling;if(Z!==null){Z.return=m.return,ze=Z;break e}ze=m.return}}var j=n.current;for(ze=j;ze!==null;){b=ze;var te=b.child;if((b.subtreeFlags&2064)!==0&&te!==null)te.return=b,ze=te;else e:for(b=j;ze!==null;){if(F=ze,(F.flags&2048)!==0)try{switch(F.tag){case 0:case 11:case 15:Ga(9,F)}}catch($e){jt(F,F.return,$e)}if(F===b){ze=null;break e}var Ce=F.sibling;if(Ce!==null){Ce.return=F.return,ze=Ce;break e}ze=F.return}}if(Et=f,or(),_t&&typeof _t.onPostCommitFiberRoot=="function")try{_t.onPostCommitFiberRoot(Rt,n)}catch{}c=!0}return c}finally{Lt=o,Yn.transition=i}}return!1}function Pp(n,i,o){i=Ms(o,i),i=Yh(n,i,1),n=lr(n,i,1),i=yn(),n!==null&&(wn(n,1,i),An(n,i))}function jt(n,i,o){if(n.tag===3)Pp(n,n,o);else for(;i!==null;){if(i.tag===3){Pp(i,n,o);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(ur===null||!ur.has(c))){n=Ms(o,n),n=$h(i,n,1),i=lr(i,n,1),n=yn(),i!==null&&(wn(i,1,n),An(i,n));break}}i=i.return}}function dx(n,i,o){var c=n.pingCache;c!==null&&c.delete(i),i=yn(),n.pingedLanes|=n.suspendedLanes&o,tn===n&&(an&o)===o&&(Zt===4||Zt===3&&(an&130023424)===an&&500>be()-uu?zr(n,0):cu|=o),An(n,i)}function Lp(n,i){i===0&&((n.mode&1)===0?i=1:(i=ti,ti<<=1,(ti&130023424)===0&&(ti=4194304)));var o=yn();n=Di(n,i),n!==null&&(wn(n,i,o),An(n,o))}function fx(n){var i=n.memoizedState,o=0;i!==null&&(o=i.retryLane),Lp(n,o)}function hx(n,i){var o=0;switch(n.tag){case 13:var c=n.stateNode,f=n.memoizedState;f!==null&&(o=f.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),Lp(n,o)}var Np;Np=function(n,i,o){if(n!==null)if(n.memoizedProps!==i.pendingProps||En.current)bn=!0;else{if((n.lanes&o)===0&&(i.flags&128)===0)return bn=!1,ex(n,i,o);bn=(n.flags&131072)!==0}else bn=!1,Bt&&(i.flags&1048576)!==0&&dh(i,Ta,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Ba(n,i),n=i.pendingProps;var f=ps(i,dn.current);ys(i,o),f=Vc(null,i,c,n,f,o);var m=Gc();return i.flags|=1,typeof f=="object"&&f!==null&&typeof f.render=="function"&&f.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Tn(c)?(m=!0,Ma(i)):m=!1,i.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,kc(i),f.updater=Oa,i.stateNode=f,f._reactInternals=i,Yc(i,c,n,o),i=Jc(null,i,c,!0,m,o)):(i.tag=0,Bt&&m&&Ec(i),_n(null,i,f,o),i=i.child),i;case 16:c=i.elementType;e:{switch(Ba(n,i),n=i.pendingProps,f=c._init,c=f(c._payload),i.type=c,f=i.tag=mx(c),n=ri(c,n),f){case 0:i=Zc(null,i,c,n,o);break e;case 1:i=rp(null,i,c,n,o);break e;case 11:i=Qh(null,i,c,n,o);break e;case 14:i=ep(null,i,c,ri(c.type,n),o);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:ri(c,f),Zc(n,i,c,f,o);case 1:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:ri(c,f),rp(n,i,c,f,o);case 3:e:{if(sp(i),n===null)throw Error(t(387));c=i.pendingProps,m=i.memoizedState,f=m.element,yh(n,i),La(i,c,null,o);var b=i.memoizedState;if(c=b.element,m.isDehydrated)if(m={element:c,isDehydrated:!1,cache:b.cache,pendingSuspenseBoundaries:b.pendingSuspenseBoundaries,transitions:b.transitions},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){f=Ms(Error(t(423)),i),i=op(n,i,c,o,f);break e}else if(c!==f){f=Ms(Error(t(424)),i),i=op(n,i,c,o,f);break e}else for(Un=ir(i.stateNode.containerInfo.firstChild),In=i,Bt=!0,ii=null,o=vh(i,null,c,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(xs(),c===f){i=Ii(n,i,o);break e}_n(n,i,c,o)}i=i.child}return i;case 5:return wh(i),n===null&&Cc(i),c=i.type,f=i.pendingProps,m=n!==null?n.memoizedProps:null,b=f.children,vc(c,f)?b=null:m!==null&&vc(c,m)&&(i.flags|=32),ip(n,i),_n(n,i,b,o),i.child;case 6:return n===null&&Cc(i),null;case 13:return ap(n,i,o);case 4:return Ic(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=vs(i,null,c,o):_n(n,i,c,o),i.child;case 11:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:ri(c,f),Qh(n,i,c,f,o);case 7:return _n(n,i,i.pendingProps,o),i.child;case 8:return _n(n,i,i.pendingProps.children,o),i.child;case 12:return _n(n,i,i.pendingProps.children,o),i.child;case 10:e:{if(c=i.type._context,f=i.pendingProps,m=i.memoizedProps,b=f.value,It(Aa,c._currentValue),c._currentValue=b,m!==null)if(ni(m.value,b)){if(m.children===f.children&&!En.current){i=Ii(n,i,o);break e}}else for(m=i.child,m!==null&&(m.return=i);m!==null;){var F=m.dependencies;if(F!==null){b=m.child;for(var V=F.firstContext;V!==null;){if(V.context===c){if(m.tag===1){V=ki(-1,o&-o),V.tag=2;var se=m.updateQueue;if(se!==null){se=se.shared;var Me=se.pending;Me===null?V.next=V:(V.next=Me.next,Me.next=V),se.pending=V}}m.lanes|=o,V=m.alternate,V!==null&&(V.lanes|=o),Nc(m.return,o,i),F.lanes|=o;break}V=V.next}}else if(m.tag===10)b=m.type===i.type?null:m.child;else if(m.tag===18){if(b=m.return,b===null)throw Error(t(341));b.lanes|=o,F=b.alternate,F!==null&&(F.lanes|=o),Nc(b,o,i),b=m.sibling}else b=m.child;if(b!==null)b.return=m;else for(b=m;b!==null;){if(b===i){b=null;break}if(m=b.sibling,m!==null){m.return=b.return,b=m;break}b=b.return}m=b}_n(n,i,f.children,o),i=i.child}return i;case 9:return f=i.type,c=i.pendingProps.children,ys(i,o),f=Xn(f),c=c(f),i.flags|=1,_n(n,i,c,o),i.child;case 14:return c=i.type,f=ri(c,i.pendingProps),f=ri(c.type,f),ep(n,i,c,f,o);case 15:return tp(n,i,i.type,i.pendingProps,o);case 17:return c=i.type,f=i.pendingProps,f=i.elementType===c?f:ri(c,f),Ba(n,i),i.tag=1,Tn(c)?(n=!0,Ma(i)):n=!1,ys(i,o),Xh(i,c,f),Yc(i,c,f,o),Jc(null,i,c,!0,n,o);case 19:return cp(n,i,o);case 22:return np(n,i,o)}throw Error(t(156,i.tag))};function Dp(n,i){return oe(n,i)}function px(n,i,o,c){this.tag=n,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $n(n,i,o,c){return new px(n,i,o,c)}function vu(n){return n=n.prototype,!(!n||!n.isReactComponent)}function mx(n){if(typeof n=="function")return vu(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ie)return 11;if(n===pe)return 14}return 2}function pr(n,i){var o=n.alternate;return o===null?(o=$n(n.tag,i,n.key,n.mode),o.elementType=n.elementType,o.type=n.type,o.stateNode=n.stateNode,o.alternate=n,n.alternate=o):(o.pendingProps=i,o.type=n.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=n.flags&14680064,o.childLanes=n.childLanes,o.lanes=n.lanes,o.child=n.child,o.memoizedProps=n.memoizedProps,o.memoizedState=n.memoizedState,o.updateQueue=n.updateQueue,i=n.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=n.sibling,o.index=n.index,o.ref=n.ref,o}function Za(n,i,o,c,f,m){var b=2;if(c=n,typeof n=="function")vu(n)&&(b=1);else if(typeof n=="string")b=5;else e:switch(n){case I:return Vr(o.children,f,m,i);case W:b=8,f|=8;break;case L:return n=$n(12,o,i,f|2),n.elementType=L,n.lanes=m,n;case Q:return n=$n(13,o,i,f),n.elementType=Q,n.lanes=m,n;case de:return n=$n(19,o,i,f),n.elementType=de,n.lanes=m,n;case he:return Ja(o,f,m,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case w:b=10;break e;case z:b=9;break e;case ie:b=11;break e;case pe:b=14;break e;case le:b=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=$n(b,o,i,f),i.elementType=n,i.type=c,i.lanes=m,i}function Vr(n,i,o,c){return n=$n(7,n,c,i),n.lanes=o,n}function Ja(n,i,o,c){return n=$n(22,n,c,i),n.elementType=he,n.lanes=o,n.stateNode={isHidden:!1},n}function _u(n,i,o){return n=$n(6,n,null,i),n.lanes=o,n}function yu(n,i,o){return i=$n(4,n.children!==null?n.children:[],n.key,i),i.lanes=o,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function gx(n,i,o,c,f){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Hn(0),this.expirationTimes=Hn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Hn(0),this.identifierPrefix=c,this.onRecoverableError=f,this.mutableSourceEagerHydrationData=null}function Su(n,i,o,c,f,m,b,F,V){return n=new gx(n,i,o,F,V),i===1?(i=1,m===!0&&(i|=8)):i=0,m=$n(3,null,null,i),n.current=m,m.stateNode=n,m.memoizedState={element:c,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},kc(m),n}function xx(n,i,o){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:O,key:c==null?null:""+c,children:n,containerInfo:i,implementation:o}}function kp(n){if(!n)return sr;n=n._reactInternals;e:{if(gi(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Tn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var o=n.type;if(Tn(o))return lh(n,o,i)}return i}function Ip(n,i,o,c,f,m,b,F,V){return n=Su(o,c,!0,n,f,m,b,F,V),n.context=kp(null),o=n.current,c=yn(),f=fr(o),m=ki(c,f),m.callback=i??null,lr(o,m,f),n.current.lanes=f,wn(n,f,c),An(n,c),n}function Qa(n,i,o,c){var f=i.current,m=yn(),b=fr(f);return o=kp(o),i.context===null?i.context=o:i.pendingContext=o,i=ki(m,b),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=lr(f,i,b),n!==null&&(ai(n,f,b,m),Pa(n,f,b)),b}function el(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Up(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var o=n.retryLane;n.retryLane=o!==0&&o<i?o:i}}function Mu(n,i){Up(n,i),(n=n.alternate)&&Up(n,i)}function vx(){return null}var Fp=typeof reportError=="function"?reportError:function(n){console.error(n)};function wu(n){this._internalRoot=n}tl.prototype.render=wu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));Qa(n,i,null,null)},tl.prototype.unmount=wu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Or(function(){Qa(null,n,null,null)}),i[Ri]=null}};function tl(n){this._internalRoot=n}tl.prototype.unstable_scheduleHydration=function(n){if(n){var i=yf();n={blockedOn:null,target:n,priority:i};for(var o=0;o<er.length&&i!==0&&i<er[o].priority;o++);er.splice(o,0,n),o===0&&wf(n)}};function Eu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function nl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Op(){}function _x(n,i,o,c,f){if(f){if(typeof c=="function"){var m=c;c=function(){var se=el(b);m.call(se)}}var b=Ip(i,c,n,0,null,!1,!1,"",Op);return n._reactRootContainer=b,n[Ri]=b.current,So(n.nodeType===8?n.parentNode:n),Or(),b}for(;f=n.lastChild;)n.removeChild(f);if(typeof c=="function"){var F=c;c=function(){var se=el(V);F.call(se)}}var V=Su(n,0,!1,null,null,!1,!1,"",Op);return n._reactRootContainer=V,n[Ri]=V.current,So(n.nodeType===8?n.parentNode:n),Or(function(){Qa(i,V,o,c)}),V}function il(n,i,o,c,f){var m=o._reactRootContainer;if(m){var b=m;if(typeof f=="function"){var F=f;f=function(){var V=el(b);F.call(V)}}Qa(i,b,n,f)}else b=_x(o,i,n,f,c);return el(b)}vf=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var o=$t(i.pendingLanes);o!==0&&(Yl(i,o|1),An(i,be()),(Et&6)===0&&(Ts=be()+500,or()))}break;case 13:Or(function(){var c=Di(n,1);if(c!==null){var f=yn();ai(c,n,1,f)}}),Mu(n,1)}},$l=function(n){if(n.tag===13){var i=Di(n,134217728);if(i!==null){var o=yn();ai(i,n,134217728,o)}Mu(n,134217728)}},_f=function(n){if(n.tag===13){var i=fr(n),o=Di(n,i);if(o!==null){var c=yn();ai(o,n,i,c)}Mu(n,i)}},yf=function(){return Lt},Sf=function(n,i){var o=Lt;try{return Lt=n,i()}finally{Lt=o}},Ne=function(n,i,o){switch(i){case"input":if(Qe(n,o),i=o.name,o.type==="radio"&&i!=null){for(o=n;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var c=o[i];if(c!==n&&c.form===n.form){var f=ya(c);if(!f)throw Error(t(90));He(c),Qe(c,f)}}}break;case"textarea":_e(n,o);break;case"select":i=o.value,i!=null&&k(n,!!o.multiple,i,!1)}},Ut=mu,Yt=Or;var yx={usingClientEntryPoint:!1,Events:[Eo,fs,ya,ke,ut,mu]},Oo={findFiberByHostInstance:Pr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Sx={bundleType:Oo.bundleType,version:Oo.version,rendererPackageName:Oo.rendererPackageName,rendererConfig:Oo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:T.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=P(n),n===null?null:n.stateNode},findFiberByHostInstance:Oo.findFiberByHostInstance||vx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var rl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rl.isDisabled&&rl.supportsFiber)try{Rt=rl.inject(Sx),_t=rl}catch{}}return Rn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yx,Rn.createPortal=function(n,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Eu(i))throw Error(t(200));return xx(n,i,null,o)},Rn.createRoot=function(n,i){if(!Eu(n))throw Error(t(299));var o=!1,c="",f=Fp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(f=i.onRecoverableError)),i=Su(n,1,!1,null,null,o,!1,c,f),n[Ri]=i.current,So(n.nodeType===8?n.parentNode:n),new wu(i)},Rn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=P(i),n=n===null?null:n.stateNode,n},Rn.flushSync=function(n){return Or(n)},Rn.hydrate=function(n,i,o){if(!nl(i))throw Error(t(200));return il(null,n,i,!0,o)},Rn.hydrateRoot=function(n,i,o){if(!Eu(n))throw Error(t(405));var c=o!=null&&o.hydratedSources||null,f=!1,m="",b=Fp;if(o!=null&&(o.unstable_strictMode===!0&&(f=!0),o.identifierPrefix!==void 0&&(m=o.identifierPrefix),o.onRecoverableError!==void 0&&(b=o.onRecoverableError)),i=Ip(i,null,n,1,o??null,f,!1,m,b),n[Ri]=i.current,So(n),c)for(n=0;n<c.length;n++)o=c[n],f=o._getVersion,f=f(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,f]:i.mutableSourceEagerHydrationData.push(o,f);return new tl(i)},Rn.render=function(n,i,o){if(!nl(i))throw Error(t(200));return il(null,n,i,!1,o)},Rn.unmountComponentAtNode=function(n){if(!nl(n))throw Error(t(40));return n._reactRootContainer?(Or(function(){il(null,null,n,!1,function(){n._reactRootContainer=null,n[Ri]=null})}),!0):!1},Rn.unstable_batchedUpdates=mu,Rn.unstable_renderSubtreeIntoContainer=function(n,i,o,c){if(!nl(o))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return il(n,i,o,!1,c)},Rn.version="18.3.1-next-f1338f8080-20240426",Rn}var Xp;function Nx(){if(Xp)return Cu.exports;Xp=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Cu.exports=Lx(),Cu.exports}var qp;function Dx(){if(qp)return sl;qp=1;var s=Nx();return sl.createRoot=s.createRoot,sl.hydrateRoot=s.hydrateRoot,sl}var kx=Dx();const Ix=Qm(kx),tf="caseGamba_save_v1",Mr={coins:150,currentTier:1,unlockedFigures:{t1_fig_01:["common"]},unlockedCosmetics:["hat_c_01"],avatar:{figureId:"t1_fig_01",figureRarity:"common",cosmetics:{hat:"hat_c_01",hair:null,glasses:null,shirt:null,pants:null,shoes:null,gloves:null,belt:null,wearable:null,item:null,sfx:null}},stats:{cratesOpened:0,duplicatesCashed:0,totalCoinsEarned:150,doodleJumpBestScore:0,doodleJumpTotalCoins:0,rarityCounts:{common:0,uncommon:0,rare:0,mythic:0,legendary:0}},soundMuted:!1,soundVolume:.75};function Ux(){var s,e;try{const t=localStorage.getItem(tf);if(!t)return{...Mr};const r=JSON.parse(t);return{...Mr,...r,avatar:{...Mr.avatar,...r.avatar||{},cosmetics:{...Mr.avatar.cosmetics,...((s=r.avatar)==null?void 0:s.cosmetics)||{}}},stats:{...Mr.stats,...r.stats||{},rarityCounts:{...Mr.stats.rarityCounts,...((e=r.stats)==null?void 0:e.rarityCounts)||{}}}}}catch(t){return console.warn("Failed to load caseGamba save from localStorage:",t),{...Mr}}}function Fx(s){try{localStorage.setItem(tf,JSON.stringify(s))}catch(e){console.error("Failed to save caseGamba state to localStorage:",e)}}function Ox(){return localStorage.removeItem(tf),{...Mr}}const qi={common:{id:"common",name:"Common",colorName:"Grey",hexColor:"#9E9E9E",glowColor:"rgba(158, 158, 158, 0.6)",accentColor:"#cfd8dc",dropRate:.58,duplicateMultiplier:.25,stingerFrequency:220},uncommon:{id:"uncommon",name:"Uncommon",colorName:"Blue",hexColor:"#00B0FF",glowColor:"rgba(0, 176, 255, 0.75)",accentColor:"#80d8ff",dropRate:.27,duplicateMultiplier:.5,stingerFrequency:330},rare:{id:"rare",name:"Rare",colorName:"Orange",hexColor:"#FF9100",glowColor:"rgba(255, 145, 0, 0.85)",accentColor:"#ffd180",dropRate:.11,duplicateMultiplier:1.25,stingerFrequency:440},mythic:{id:"mythic",name:"Mythic",colorName:"Red",hexColor:"#FF1744",glowColor:"rgba(255, 23, 68, 0.9)",accentColor:"#ff8a80",dropRate:.033,duplicateMultiplier:3.5,stingerFrequency:660},legendary:{id:"legendary",name:"Legendary",colorName:"Yellow",hexColor:"#FFD700",glowColor:"rgba(255, 215, 0, 0.95)",accentColor:"#fff59d",dropRate:.007,duplicateMultiplier:10,stingerFrequency:880}},e0=["common","uncommon","rare","mythic","legendary"],es=[{tier:1,name:"Scrap Cardboard Crate",subtitle:"Held together with hope & duct tape",cost:50,boxColor:"#8D6E63",accentColor:"#D7CCC8",glowColor:"rgba(141, 110, 99, 0.4)",bgGradient:"radial-gradient(ellipse at center, #261f1d 0%, #120e0d 70%, #080606 100%)",bgRoomStyle:"alleyway",meshStyle:"cardboard",description:"Found in the back alley dumpster. Smells faintly of damp cardboard and discarded dreams.",figureIds:[]},{tier:2,name:"Rusty Salvage Locker",subtitle:"Heavy iron reclaimed from the scrapyard",cost:180,boxColor:"#A1887F",accentColor:"#FF7043",glowColor:"rgba(255, 112, 67, 0.45)",bgGradient:"radial-gradient(ellipse at center, #2b1f1a 0%, #150f0c 70%, #0a0706 100%)",bgRoomStyle:"scrapyard",meshStyle:"rusty",description:"Corroded rivets and squeaky hinges. Contains grease-stained treasures of industrial grade.",figureIds:[]},{tier:3,name:"Reinforced Alloy Safe",subtitle:"High-security titanium reinforced lockbox",cost:650,boxColor:"#607D8B",accentColor:"#FFD600",glowColor:"rgba(255, 214, 0, 0.5)",bgGradient:"radial-gradient(ellipse at center, #1e2930 0%, #10161a 70%, #06090a 100%)",bgRoomStyle:"vault",meshStyle:"alloy",description:"Stamped with military hazard markings. The automated servo locks hiss when cracked.",figureIds:[]},{tier:4,name:"Neon Cyber Pod",subtitle:"Sub-dermal black market synth crate",cost:2400,boxColor:"#00E5FF",accentColor:"#F50057",glowColor:"rgba(0, 229, 255, 0.6)",bgGradient:"radial-gradient(ellipse at center, #0f2233 0%, #08111c 70%, #03060a 100%)",bgRoomStyle:"cyberpunk",meshStyle:"cyber",description:"Illuminated with pulsing EL wire. Bootlegs straight from the Megacity underbelly.",figureIds:[]},{tier:5,name:"Gilded High-Roller Vault",subtitle:"Solid 24-karat gold with velvet inlays",cost:9e3,boxColor:"#FFD700",accentColor:"#FFFFFF",glowColor:"rgba(255, 215, 0, 0.7)",bgGradient:"radial-gradient(ellipse at center, #2d2610 0%, #171306 70%, #090702 100%)",bgRoomStyle:"penthouse",meshStyle:"gilded",description:"Polished to an eye-watering mirror finish. Smells like expensive cigars and winning streaks.",figureIds:[]},{tier:6,name:"Biohazard Cryo Capsule",subtitle:"Deep freeze containment cylinder",cost:35e3,boxColor:"#00E676",accentColor:"#1DE9B6",glowColor:"rgba(0, 230, 118, 0.75)",bgGradient:"radial-gradient(ellipse at center, #0f2d1e 0%, #08170e 70%, #020805 100%)",bgRoomStyle:"biolab",meshStyle:"cryo",description:"Vents zero-Kelvin cryogenic vapor on opening. Genetic specimens preserved for centuries.",figureIds:[]},{tier:7,name:"Obsidian Nether Relic",subtitle:"Forged in subterranean brimstone",cost:14e4,boxColor:"#9C27B0",accentColor:"#FF1744",glowColor:"rgba(156, 39, 176, 0.8)",bgGradient:"radial-gradient(ellipse at center, #2d0e2e 0%, #150616 70%, #070108 100%)",bgRoomStyle:"nether",meshStyle:"obsidian",description:"Geometric obsidian panels float apart via anti-gravity. Dark energy pulses from within.",figureIds:[]},{tier:8,name:"Plasma Fusion Reactor",subtitle:"Magnetic confinement orbital core",cost:55e4,boxColor:"#FF3D00",accentColor:"#FFEA00",glowColor:"rgba(255, 61, 0, 0.85)",bgGradient:"radial-gradient(ellipse at center, #35150a 0%, #1b0a04 70%, #0a0301 100%)",bgRoomStyle:"reactor",meshStyle:"plasma",description:"Contains a miniature artificial sun. Extreme thermal shielding barely keeps it stable.",figureIds:[]},{tier:9,name:"Celestial Astral Sanctum",subtitle:"Carved from starlight and pearl",cost:22e5,boxColor:"#E040FB",accentColor:"#80D8FF",glowColor:"rgba(224, 64, 251, 0.9)",bgGradient:"radial-gradient(ellipse at center, #291533 0%, #130a19 70%, #050208 100%)",bgRoomStyle:"astral",meshStyle:"astral",description:"An ethereal crystalline construct radiating ancient starlight and harmonious celestial hymns.",figureIds:[]},{tier:10,name:"Cosmic Singularity Matrix",subtitle:"Event horizon hypercube",cost:1e7,boxColor:"#FF0055",accentColor:"#00FFFF",glowColor:"rgba(255, 0, 85, 0.95)",bgGradient:"radial-gradient(ellipse at center, #20081d 0%, #0c020d 70%, #000000 100%)",bgRoomStyle:"singularity",meshStyle:"singularity",description:"Light bends around this impossible black hole artifact. Bends the fabric of spacetime itself.",figureIds:[]}],zx=[{tier:1,archetype:"Scrap Scavenger",names:["Cardboard Bob","Tin Can Timmy","Rusty Rat","Pigeon Scout","Dumpster Diver","Bottlecap Billy","Newspaper Ninja","Soggy Sock","Cracked Mug","Spork Warrior","Tape Roll Terry","Twist-Tie Pete","Stale Donut","Cobweb Crawler","Styrofoam Sam","Alley Cat Boris","Crumpled Memo","Rusty Spring","Shed Snail","Pocket Lint Larry"],descriptions:["Assembled from discarded delivery boxes.","His head is an unwashed baked bean can.","Fastest rodent in the municipal waste district.","Keeps watch from a broken telephone pole.","Knows the exact schedule of every bakery dumpster.","Trades rare soda caps for shiny foil wrappers.","Folds himself into disguise during rainy days.","Legendary defender of the storm drain.","Missing a handle, but still holds vengeance.","Part spoon, part fork, totally lethal.","Strongest adhesive bond in the borough.","Never comes untwisted under pressure.","Hard as a brick, seasoned with city pavement.","Spins webs out of shredded supermarket flyers.","Immune to moisture, highly squeaky when stepped on.","Scars earned in intense alley turf disputes.","Contains classified secrets about garbage day.","Boings with unpredictable mechanical fury.","Paces himself, carrying a crushed soda can shell.","The most persistent creature in human pockets."],silhouettes:["biped","beast","robot","winged","biped","biped","ninja","blob","beast","biped","robot","beast","blob","beast","blob","beast","ninja","robot","beast","blob"]},{tier:2,archetype:"Junkyard Scrapper",names:["Wrench Wielder","Sparky Plug","Piston Pete","Gearhead Gary","Muffler Mike","Lugnut Lou","Exhaust Emma","Radiator Ralph","Chassis Chip","Carburetor Carl","Grease Monkey","Blowtorch Ben","Hydraulic Hank","Sledgehammer Sal","Gasket Gus","Flywheel Fran","Alternator Art","Bearing Barry","Oildrum Ollie","Junkyard Rex"],descriptions:["Can torque a lug bolt to 500 foot-pounds barehanded.","Fires erratic electrical arcs when startled.","Pumps with relentless diesel cadence.","Has 40 teeth, all made of transmission gears.","Belches black smoke to create hasty smoke screens.","Heavier than he looks, rolls true.","Hot fumes constantly vent from her copper pipes.","Coolant boiling with righteous rage.","Reinforced welded iron skeleton.","Carefully balances air and gasoline fumes.","Slick with 10W-40 motor oil, slips through any grab.","His flame burns blue and melts sheet metal.","Can lift a semi-truck on one arm.","Every strike registers on local seismographs.","High-pressure seal that has never blown.","Maintains rotational momentum indefinitely.","Recharges batteries while sleeping.","Smooth sphere rolling on frictionless grease.","Armored in 55 gallons of industrial steel.","The apex predator of the metal scrapyard."],silhouettes:["biped","robot","robot","robot","biped","robot","biped","robot","beast","robot","beast","biped","robot","biped","blob","robot","robot","blob","robot","beast"]},{tier:3,archetype:"Armored Vanguard",names:["Aegis Sentinel","Titan Ward","Bulwark Beta","Ironclad Ivan","Riot Striker","Phalanx Drone","Alloy Warden","Citadel Centurion","Kevlar Knight","Blast Barricade","Shieldwall Sam","Garrison Ghost","Pike Sentinel","Reinforced Rex","Vault Keeper","Heavy Heavyweight","Bunker Buster","Fortress Fiona","Lockdown Lynx","Tungsten Titan"],descriptions:["Equipped with a hydraulic blast shield.","Walks into artillery fire without flinching.","Military test prototype with dual defensive plating.","Old war veteran clad in cold-rolled plate.","Breaks through riot barriers with sonic shockwaves.","Hover drone emitting kinetic suppression fields.","Guards the military arsenal day and night.","Trained in ancient Roman defensive formations.","Triple-weave ballistic fiber weave suits.","Engineered to absorb directional landmine blasts.","Holds the front line against all odds.","An echo of an old fortress patrol unit.","Spear energized with armor-piercing charge.","Cybernetic canine wearing reactive armor.","Carries the master magnetic keycard to the vault.","Weighs three metric tons in full gear.","Breaches reinforced bunker doors like wet tissue.","Commands the outpost perimeter defense grid.","Silent predatory scout wrapped in composite stealth plating.","Core forged of hyper-dense tungsten carbide."],silhouettes:["biped","robot","hover","biped","biped","hover","biped","biped","ninja","robot","biped","ninja","biped","beast","robot","biped","robot","biped","beast","robot"]},{tier:4,archetype:"Cyberpunk Outlaw",names:["Neon Ronin","Glitch Hacker","Synth Geisha","Chrome Raider","Data Phantom","Overclock Otto","Fiberoptic Fox","Sub-Zero Netrunner","Laser Viper","Holo Dancer","Augment Ash","Cyber Shaman","Vector Valkyrie","Neural Nyx","Grid Stalker","Pixel Punk","Byte Brawler","Bandwidth Bandit","Matrix Mercenary","Circuit Queen"],descriptions:["Wields a thermal-edged katana humming with neon energy.","Injects malicious payloads into target optic nerves.","Deadly assassin cloaked beneath traditional courtesan guise.","Scavenges high-end neuro-chips from corporate labs.","Leaves only corrupted log files in his wake.","Heart rate synchronized with a 10GHz liquid nitrogen cooler.","Nine glowing fiber tails that siphon electricity.","Dives into ice-cold deep-net databases.","Twin cyber-fangs that inject nanite neurotoxins.","Flickers in and out of optical perception.","Over 90% artificial replacement body parts.","Channels corporate server spirits and digital ghosts.","Soars across high-rise skylines on hard-light wings.","Can download combat protocols in milliseconds.","Prowls dark alleys between fiber optic trunk lines.","Low-fi aesthetic, high-damage disruptor cannon.","Fists charged with kinetic capacitor cells.","Steals terabytes of classified corporate stocks.","Works for whoever has the highest cryptocurrency transfer.","Rules the underground augmented fighting circuit."],silhouettes:["ninja","ninja","biped","biped","hover","robot","beast","ninja","beast","biped","biped","biped","winged","ninja","beast","biped","biped","ninja","biped","biped"]},{tier:5,archetype:"Gilded Syndicate",names:["Midas Prince","Platinum Baron","Diamond Duchess","Velvet Kingpin","Goldfinger Gus","Silk Smuggler","Crown Enforcer","Vault Overseer","Emerald Viceroy","Champagne Charlie","Bullion Behemoth","Treasure Drake","Casino Croupier","Ruby Royal","Opal Oracle","Imperial Banker","Golden Griffin","Gilded Corsair","Prestige Paladin","Sovereign Sovereign"],descriptions:["Everything he touches turns to solid high-purity bullion.","Owns half the private orbital banking stations.","Armor cut from flawless synthetic diamond crystals.","Coordinates high-society heists from behind velvet ropes.","Has replaced his right hand with a gilded laser armature.","Imports exotic fabrics from off-world colonies.","Carries a solid gold scepter with a built-in stun field.","Never sleeps, keeps tally on the global reserve.","Robes dyed with emerald dust and woven silver.","Celebrates victory with vintage sparkling ambrosia.","Gilded golem funded by old-world hedge funds.","Hoards priceless relics on a bed of gold doubloons.","Deals cards faster than bullet camera shutters.","Draped in deep crimson silks and cut rubies.","Predicts stock market crashes with mystical precision.","Can liquidate small nations with a single signature.","Majestic beast with feathers dipped in liquid gold.","Sails solar yachts through private star systems.","Holy knight sworn to protect the international treasury.","The undisputed ruler of the elite high-roller club."],silhouettes:["biped","biped","biped","biped","biped","ninja","biped","robot","biped","biped","robot","winged","biped","biped","hover","biped","winged","biped","biped","biped"]},{tier:6,archetype:"Cryo Mutagen",names:["Frostbite Fiend","Cryo Stalker","Glacier Goliath","Zero-Kelvin Zealot","Blizzard Banshee","Icebound Abomination","Permafrost Parasite","Cryogenic Core","Boreal Behemoth","Rime Reaper","Arctic Chimera","Cryo Hivemind","Sub-Zero Siren","Avalanche Ape","Glacial Wyrm","Liquid Nitrogen Lurker","Thermal Siphon","Deep Freeze Dread","Frostfire Demon","Absolute Zero King"],descriptions:["Body temperature is cold enough to shatter steel on contact.","Leaves frozen footprints that freeze surrounding air.","A walking mountain of unmelting glacial ice.","Worships the thermal death of the universe.","Her scream drops ambient temperatures by 50 degrees.","Escaped from a classified orbital laboratory freezer.","Burrows into host nervous systems to induce hibernation.","A self-sustaining nuclear cryo-engine.","Ancient creature awakened from beneath Antarctic shelf.","Harvests heat energy with a scythe of pure frost.","Splice of arctic wolf, snow owl, and alien apex predator.","Controls millions of micro-ice nanites in unison.","Lures explorers into blizzards with haunting songs.","Can trigger an avalanche with a two-handed smash.","Slithers through frozen tundra ice sheets with ease.","Drips liquid nitrogen from its mutated fangs.","Absorbs all thermal kinetic energy in a 50-meter radius.","Encases its victims in flawless cryogenic glass.","Burns with an impossible freezing blue flame.","Monarch of the eternal cryogenic winter."],silhouettes:["beast","ninja","robot","biped","winged","beast","blob","hover","beast","ninja","winged","blob","biped","beast","beast","beast","hover","robot","elemental","biped"]},{tier:7,archetype:"Obsidian Nether",names:["Brimstone Berserker","Void Drake","Nether Inquisitor","Obsidian Colossus","Abyssal Lich","Hellfire Hellhound","Cinder Queen","Magma Leviathan","Shadow Flame Sorcerer","Ember Assassin","Soul Harvester","Pyroclastic Fiend","Obsidian Warlock","Brimstone Basilisk","Netherwing Gargoyle","Volcanic Juggernaut","Duskblade Demon","Nether Spire Golem","Ashfall Sovereign","Underworld Monarch"],descriptions:["Swings two-handed axes dripping with bubbling sulfur.","Breaths purplish-black voidfire that burns concepts.","Searches souls for traces of celestial light to purge.","Chiseled from glossy subterranean volcanic rock.","Channels necrotic dark matter through a bone staff.","Twin-headed hound stalking the borders of the abyss.","Crown woven from crystallized volcanic obsidian.","Swims through molten magma lakes under the crust.","Bends dark flames into shadowy protective barriers.","Darts from dark smoke clouds to strike critical veins.","Collects glowing embers of extinguished warriors.","Formed during the explosive eruption of supervolcanoes.","Recites incantations that tear holes into the void.","Its stony gaze petrifies victims into brittle volcanic glass.","Perched on blackened spires watching over the abyss.","Unstoppable battering ram wrapped in hardened crust.","Blades forged under the crushing pressure of planetary cores.","Constructed to guard the dark subterranean gates.","Rains burning ash across entire battlefields.","The ancient supreme lord of the infernal deep."],silhouettes:["biped","winged","biped","robot","ninja","beast","biped","beast","biped","ninja","hover","elemental","biped","beast","winged","robot","ninja","robot","biped","biped"]},{tier:8,archetype:"Plasma Celestial Engine",names:["Solar Archon","Fusion Golem","Corona Knight","Neutron Striker","Plasma Drake","Stellar Sentinel","Helios Valkyrie","Proton Pulsar","Orbital Vanguard","Thermonuclear Titan","Solaris Sage","Magnetic Coil Fiend","Supernova Beast","Gamma Ray Ghost","Ion Storm Chaser","Starforge Automaton","Corona Empress","Solar Flare Wyrm","Quantum Reactor Rex","Hyperion Overlord"],descriptions:["Radiates the brilliance of a newly ignited yellow star.","Fueled by an internal deuterium fusion chamber.","Clad in magnetic shields that deflect orbital lasers.","Strikes with the localized density of a neutron star.","Wings made of arching electromagnetic plasma flares.","Maintains solar orbital arrays in high orbit.","Leads the sun-fleet into interstellar battle.","Emits rhythmic pulses of coherent electromagnetic energy.","Drops from orbital stations with atmospheric re-entry heat.","Could vaporize a mountain range with a full core vent.","Understands the celestial geometry of nuclear fire.","Traps enemies in devastating magnetic containment loops.","Born in the heart of a dying giant star.","Invisible until it releases a blinding burst of radiation.","Rides stellar winds across planetary magnetic poles.","Forges starship armor out of heavy solar elements.","Directs coronal mass ejections with royal authority.","Coils around star-bases to absorb solar energy.","Quadruple-core fusion reactor in mechanical canine chassis.","The undisputed commander of celestial thermonuclear energy."],silhouettes:["biped","robot","biped","ninja","winged","robot","winged","hover","biped","robot","biped","robot","beast","hover","hover","robot","biped","beast","beast","biped"]},{tier:9,archetype:"Astral Ascendant",names:["Seraphim Prime","Astral Oracle","Starlight Sovereign","Nebula Weaver","Elysian Cherub","Eclipse Archangel","Cosmic Harmonizer","Zodiac Drake","Constellation Knight","Aura Valkyrie","Miracle Vanguard","Prismatic Paragon","Stardust Siren","Moonlight Empyrean","Chrono Seraph","Nova Phoenix","Divine Sentinel","Astral Sphinx","Luminous Sovereign","Celestial Pantocrator"],descriptions:["Six wings of shimmering iridescent starlight.","Peers through timelines to ensure cosmic destiny.","Ruler of the celestial courts above deep nebulae.","Weaves galaxies on a cosmic loom of quantum strings.","Small but radiates purest divine radiance.","Embodies the eternal dance of sun and moon.","Attunes planetary resonant frequencies to universal peace.","Twelve distinct forms matching celestial horoscopes.","Shield etched with shimmering constellation maps.","Flies faster than light, blessing allies below.","A warrior whose strikes bring instantaneous redemption.","Refracts pure light into all spectrums of power.","Her song calms supernova explosions.","Bathed in silvery lunar reflections and soothing light.","Controls the celestial flow of historical time.","Reborn from astral stardust every million years.","Eternal guardian of the starry gates to paradise.","Guards ancient cosmic riddles with unmatched intellect.","Source of illumination for entire galaxy clusters.","Ruler of all celestial beings and starry realms."],silhouettes:["winged","biped","biped","hover","winged","winged","biped","winged","biped","winged","biped","biped","biped","biped","winged","winged","robot","beast","biped","biped"]},{tier:10,archetype:"Cosmic Singularity",names:["Event Horizon Lord","Black Hole Deity","Quantum Singularity","Spacetime Sovereign","Entropy Master","Dark Matter Monolith","Graviton Emperor","Dimension Breaker","Void God Khaos","Omniverse Prime","Absolute Zero Paradox","Cosmic Genesis","Chrono Apex","Singularity Drake","Infinity Golem","Big Bang Remnant","Reality Shaper","Tesseract Sovereign","Multiverse Overlord","The Eternal Alpha-Omega"],descriptions:["Nothing, not even light, escapes his gravitational pull.","Carries a supermassive black hole at his core.","Exists in all quantum superpositions at once.","Can twist spacetime into impossible Möbius geometries.","Accelerates cosmic decay and universal destiny.","A towering obelisk carved from primordial dark matter.","Bends planetary gravity fields with a subtle gesture.","Shatters the fourth wall and dimensional barriers.","The primordial consciousness before the existence of time.","Contains the seed of a trillion parallel universes.","Where thermodynamic laws completely break down.","Spark that detonates new cosmic universes.","Exists simultaneously at the beginning and end of time.","Its wings span across multiple lightyears of dark space.","Carved from the bedrock of the first cosmic creation.","The echoes of cosmic radiation from the dawn of time.","Rearranges atomic matter and physical constants at will.","A 4D hyperdimensional entity casting 3D shadows.","Oversees the convergence of infinite timelines.","The definitive origin and terminus of all existence."],silhouettes:["biped","elemental","hover","biped","ninja","elemental","biped","robot","winged","biped","hover","elemental","winged","winged","robot","elemental","biped","hover","biped","elemental"]}];function Bx(s){return{common:{rarity:"common",title:`${s}`,primaryColor:"#9E9E9E",accentColor:"#CFD8DC",glowColor:"rgba(158, 158, 158, 0.4)",effect:"none"},uncommon:{rarity:"uncommon",title:`Charged ${s}`,primaryColor:"#00B0FF",accentColor:"#80D8FF",glowColor:"rgba(0, 176, 255, 0.6)",effect:"sparkle"},rare:{rarity:"rare",title:`Overclocked ${s}`,primaryColor:"#FF9100",accentColor:"#FFE082",glowColor:"rgba(255, 145, 0, 0.75)",effect:"flames"},mythic:{rarity:"mythic",title:`Bloodforged ${s}`,primaryColor:"#FF1744",accentColor:"#FF8A80",glowColor:"rgba(255, 23, 68, 0.85)",effect:"lightning"},legendary:{rarity:"legendary",title:`Ascendant Divine ${s}`,primaryColor:"#FFD700",accentColor:"#FFF59D",glowColor:"rgba(255, 215, 0, 0.95)",effect:"cosmic-halo"}}}const t0=[],Ys={};zx.forEach(s=>{Ys[s.tier]=[],s.names.forEach((e,t)=>{const a={id:`t${s.tier}_fig_${String(t+1).padStart(2,"0")}`,name:e,tier:s.tier,archetype:s.archetype,silhouette:s.silhouettes[t]||"biped",description:s.descriptions[t]||`A formidable figure from Tier ${s.tier}.`,variants:Bx(e)};t0.push(a),Ys[s.tier].push(a)})});es.forEach(s=>{s.figureIds=(Ys[s.tier]||[]).map(e=>e.id)});const Il={};t0.forEach(s=>{Il[s.id]=s});const Vx=[{id:"hat",label:"Hats & Helmets"},{id:"hair",label:"Hairstyles"},{id:"glasses",label:"Eyewear & Visors"},{id:"shirt",label:"Torso Armor"},{id:"pants",label:"Legwear & Greaves"},{id:"shoes",label:"Boots & Repulsors"},{id:"gloves",label:"Gauntlets & Grippers"},{id:"belt",label:"Belts & Power Sashes"},{id:"wearable",label:"Wings & Thrusters"},{id:"item",label:"Weapons & Relics"},{id:"sfx",label:"Visual Auras"}],Yo=[{id:"hat_c_01",name:"Cardboard Crown",category:"hat",rarity:"common",tier:1,description:"Folded from a reinforced scrap box with hand-cut battlements.",iconName:"crown",styleProps:{color:"#BCAAA4",secondaryColor:"#8D6E63"}},{id:"hat_u_01",name:"Junkyard Beanie",category:"hat",rarity:"uncommon",tier:2,description:"Snug industrial-grade knit wool with insulating thermofiber.",iconName:"beanie",styleProps:{color:"#00B0FF",secondaryColor:"#0288D1"}},{id:"hat_r_01",name:"Cyberpunk Oni Visor",category:"hat",rarity:"rare",tier:4,description:"Thermal-projected horns with optical HUD targeting matrix.",iconName:"oni-visor",styleProps:{color:"#FF9100",secondaryColor:"#FF3D00"}},{id:"hat_m_01",name:"Brimstone Horns",category:"hat",rarity:"mythic",tier:7,description:"Curved volcanic obsidian horns radiating nether brimstone heat.",iconName:"brimstone-horns",styleProps:{color:"#FF1744",secondaryColor:"#D50000",auraEffect:"flames"}},{id:"hat_l_01",name:"Astral Diadem of the Gods",category:"hat",rarity:"legendary",tier:9,description:"Floating celestial halo crowned with orbiting starlight shards.",iconName:"astral-halo",styleProps:{color:"#FFD700",secondaryColor:"#FFF59D",auraEffect:"cosmic-halo"}},{id:"hair_c_01",name:"Bedhead Shag",category:"hair",rarity:"common",tier:1,description:"Messy scavenged styling that never needs combing.",iconName:"hair-shag",styleProps:{color:"#8D6E63"}},{id:"hair_u_01",name:"Electric Blue Pompadour",category:"hair",rarity:"uncommon",tier:3,description:"Held firm by conductive cyber-gel and static electricity.",iconName:"hair-pompadour",styleProps:{color:"#00B0FF"}},{id:"hair_r_01",name:"Neon Cyber Spikes",category:"hair",rarity:"rare",tier:4,description:"Fiber-optic strands glowing with animated energy pulses.",iconName:"hair-spikes",styleProps:{color:"#FF9100"}},{id:"hair_m_01",name:"Crimson Dreadweave",category:"hair",rarity:"mythic",tier:7,description:"Dark crimson dreadlocks that float weightlessly in combat.",iconName:"hair-dreads",styleProps:{color:"#FF1744"}},{id:"hair_l_01",name:"Solar Plasma Mane",category:"hair",rarity:"legendary",tier:8,description:"Flowing solar flares in place of human hair.",iconName:"hair-solar",styleProps:{color:"#FFD700",auraEffect:"sparkle"}},{id:"glasses_c_01",name:"Cracked Spectacles",category:"glasses",rarity:"common",tier:1,description:"Wireframe glasses with one lens taped together.",iconName:"spectacles",styleProps:{color:"#B0BEC5"}},{id:"glasses_u_01",name:"Welding Goggles",category:"glasses",rarity:"uncommon",tier:2,description:"Heavy tinted mineral glass resistant to thermal arcs.",iconName:"goggles",styleProps:{color:"#00B0FF"}},{id:"glasses_r_01",name:"Pixel Thug Shades",category:"glasses",rarity:"rare",tier:3,description:"Stepped 8-bit black matte polarized eyewear.",iconName:"pixel-shades",styleProps:{color:"#FF9100"}},{id:"glasses_m_01",name:"Nether Gaze Blindfold",category:"glasses",rarity:"mythic",tier:7,description:"Embroidered with glowing runes of supernatural true sight.",iconName:"blindfold",styleProps:{color:"#FF1744"}},{id:"glasses_l_01",name:"Omni-Spectrum Singularity Visor",category:"glasses",rarity:"legendary",tier:10,description:"Displays multi-dimensional probability streams.",iconName:"omni-visor",styleProps:{color:"#FFD700",auraEffect:"cosmic-halo"}},{id:"shirt_c_01",name:"Stained Scavenger Tee",category:"shirt",rarity:"common",tier:1,description:"Weathered cotton shirt reinforced with duct-tape patches.",iconName:"scavenger-tee",styleProps:{color:"#78909C"}},{id:"shirt_u_01",name:"Alloy Hazard Jacket",category:"shirt",rarity:"uncommon",tier:3,description:"Ballistic fabric with high-visibility reflective hazard striping.",iconName:"hazard-jacket",styleProps:{color:"#00B0FF"}},{id:"shirt_r_01",name:"Synthwave Bomber",category:"shirt",rarity:"rare",tier:4,description:"Reversible carbon fiber flight jacket with EL piping.",iconName:"bomber-jacket",styleProps:{color:"#FF9100"}},{id:"shirt_m_01",name:"Obsidian Plate Vest",category:"shirt",rarity:"mythic",tier:7,description:"Articulated plates of glossy brimstone volcanic obsidian.",iconName:"obsidian-plate",styleProps:{color:"#FF1744"}},{id:"shirt_l_01",name:"Celestial Silk Tunic",category:"shirt",rarity:"legendary",tier:9,description:"Woven from harvested nebula filaments and diamond dust.",iconName:"celestial-tunic",styleProps:{color:"#FFD700"}},{id:"pants_c_01",name:"Patched Denim Jeans",category:"pants",rarity:"common",tier:1,description:"Triple-stitched denim with kneepad reinforcements.",iconName:"denim-pants",styleProps:{color:"#546E7A"}},{id:"pants_u_01",name:"Tech Cargo Trousers",category:"pants",rarity:"uncommon",tier:3,description:"Heavy utility pockets sealed with waterproof magnetic clasps.",iconName:"tech-cargo",styleProps:{color:"#00B0FF"}},{id:"pants_r_01",name:"Neon Track Pants",category:"pants",rarity:"rare",tier:4,description:"Dynamic light strips running down both outer seams.",iconName:"neon-pants",styleProps:{color:"#FF9100"}},{id:"pants_m_01",name:"Hellforged Greaves",category:"pants",rarity:"mythic",tier:7,description:"Heavy armor plating forged inside planetary magma chambers.",iconName:"hell-greaves",styleProps:{color:"#FF1744"}},{id:"pants_l_01",name:"Astral Flowing Robes",category:"pants",rarity:"legendary",tier:9,description:"Weightless celestial silk undulating like aurora light.",iconName:"astral-robes",styleProps:{color:"#FFD700"}},{id:"shoes_c_01",name:"Taped Chucks",category:"shoes",rarity:"common",tier:1,description:"Canvas shoes with duct-tape wrapping around the split sole.",iconName:"taped-shoes",styleProps:{color:"#78909C"}},{id:"shoes_u_01",name:"Steel-Toe Workboots",category:"shoes",rarity:"uncommon",tier:2,description:"Corrosion-proof industrial boots with puncture-proof soles.",iconName:"workboots",styleProps:{color:"#00B0FF"}},{id:"shoes_r_01",name:"Cyber Hover Sneakers",category:"shoes",rarity:"rare",tier:4,description:"Micro anti-grav repulsors floating 2 inches above the terrain.",iconName:"hover-kicks",styleProps:{color:"#FF9100"}},{id:"shoes_m_01",name:"Brimstone Stompers",category:"shoes",rarity:"mythic",tier:7,description:"Leaves scorching footprints that ignite surrounding air.",iconName:"brimstone-boots",styleProps:{color:"#FF1744"}},{id:"shoes_l_01",name:"Graviton Warp Boots",category:"shoes",rarity:"legendary",tier:10,description:"Anchors the user against supermassive gravitational anomalies.",iconName:"warp-boots",styleProps:{color:"#FFD700"}},{id:"gloves_c_01",name:"Fingerless Wool Mitts",category:"gloves",rarity:"common",tier:1,description:"Keeps knuckles warm while leaving fingertips free for fast picking.",iconName:"fingerless-gloves",styleProps:{color:"#8D6E63"}},{id:"gloves_u_01",name:"Hydraulic Piston Grippers",category:"gloves",rarity:"uncommon",tier:2,description:"Servo-assisted gauntlets that can crush solid iron.",iconName:"piston-gloves",styleProps:{color:"#00B0FF"}},{id:"gloves_r_01",name:"Hard-Light Gauntlets",category:"gloves",rarity:"rare",tier:4,description:"Projects solid photonic knuckles upon kinetic impact.",iconName:"light-gauntlets",styleProps:{color:"#FF9100"}},{id:"gloves_m_01",name:"Demon Claw Wraps",category:"gloves",rarity:"mythic",tier:7,description:"Woven from abyssal dragon hide with razor obsidian talons.",iconName:"claw-wraps",styleProps:{color:"#FF1744"}},{id:"gloves_l_01",name:"Midas Sovereign Touch",category:"gloves",rarity:"legendary",tier:5,description:"Pure 24k gold gauntlets pulsing with alchemical transmutation power.",iconName:"midas-touch",styleProps:{color:"#FFD700"}},{id:"belt_c_01",name:"Frayed Utility Rope",category:"belt",rarity:"common",tier:1,description:"Sturdy multi-ply hemp rope knotted firmly at the waist.",iconName:"rope-belt",styleProps:{color:"#BCAAA4"}},{id:"belt_u_01",name:"Heavy Tool Belt",category:"belt",rarity:"uncommon",tier:2,description:"Equipped with forged steel hammer loop and wrench holsters.",iconName:"tool-belt",styleProps:{color:"#00B0FF"}},{id:"belt_r_01",name:"Holo Battery Sash",category:"belt",rarity:"rare",tier:4,description:"Lithium solid-state cells powering wearable cybernetics.",iconName:"battery-sash",styleProps:{color:"#FF9100"}},{id:"belt_m_01",name:"Abyssal Skull Buckle",category:"belt",rarity:"mythic",tier:7,description:"Carved demonic skull that snarls at approaching danger.",iconName:"skull-buckle",styleProps:{color:"#FF1744"}},{id:"belt_l_01",name:"Cosmic Zodiac Cincture",category:"belt",rarity:"legendary",tier:9,description:"Twelve cut astrological gemstones in continuous orbital resonance.",iconName:"zodiac-belt",styleProps:{color:"#FFD700"}},{id:"wearable_c_01",name:"Cardboard Box Backpack",category:"wearable",rarity:"common",tier:1,description:"Duct-taped delivery box with sturdy rope shoulder straps.",iconName:"box-backpack",styleProps:{color:"#8D6E63"}},{id:"wearable_u_01",name:"Scrap Metal Jet Turbine",category:"wearable",rarity:"uncommon",tier:2,description:"Dual exhaust jetpack fashioned from aircraft salvage parts.",iconName:"jet-turbine",styleProps:{color:"#00B0FF"}},{id:"wearable_r_01",name:"Cyber Blade Wings",category:"wearable",rarity:"rare",tier:4,description:"Retractable aerodynamic carbon blades with cyan lighting.",iconName:"blade-wings",styleProps:{color:"#FF9100"}},{id:"wearable_m_01",name:"Nether Dragon Wings",category:"wearable",rarity:"mythic",tier:7,description:"Massive bat-like dragon wings venting dark smoke and embers.",iconName:"dragon-wings",styleProps:{color:"#FF1744",auraEffect:"flames"}},{id:"wearable_l_01",name:"Six-Wing Seraphim Halo",category:"wearable",rarity:"legendary",tier:9,description:"Six radiant starlight wings hovering in perfect divine symmetry.",iconName:"seraphim-wings",styleProps:{color:"#FFD700",auraEffect:"sparkle"}},{id:"item_c_01",name:"Bent Crowbar",category:"item",rarity:"common",tier:1,description:"Hardened forged steel with chipped bevels for cracking crates.",iconName:"crowbar",styleProps:{color:"#90A4AE"}},{id:"item_u_01",name:"Gigantic Pipe Wrench",category:"item",rarity:"uncommon",tier:2,description:"Heavy industrial lever tool able to crack hydraulic joints.",iconName:"pipe-wrench",styleProps:{color:"#00B0FF"}},{id:"item_r_01",name:"Neon Katana",category:"item",rarity:"rare",tier:4,description:"High-frequency vibro-blade with superheated thermal edge.",iconName:"neon-katana",styleProps:{color:"#FF9100"}},{id:"item_m_01",name:"Bloodforged Scythe",category:"item",rarity:"mythic",tier:7,description:"Massive two-handed battle scythe glowing with crimson malice.",iconName:"blood-scythe",styleProps:{color:"#FF1744"}},{id:"item_l_01",name:"Infinity Banhammer",category:"item",rarity:"legendary",tier:10,description:"Forged from collapsed dwarf star matter. Eliminates targets from reality.",iconName:"banhammer",styleProps:{color:"#FFD700",auraEffect:"cosmic-halo"}},{id:"sfx_c_01",name:"Dust Puff Footsteps",category:"sfx",rarity:"common",tier:1,description:"Subtle puffs of industrial dust kicking up with movement.",iconName:"dust-puff",styleProps:{color:"#B0BEC5"}},{id:"sfx_u_01",name:"Electric Static Spark",category:"sfx",rarity:"uncommon",tier:3,description:"Continuous micro electrical discharges arcing across joints.",iconName:"static-spark",styleProps:{color:"#00B0FF",auraEffect:"sparkle"}},{id:"sfx_r_01",name:"Holo Glitch Phantom",category:"sfx",rarity:"rare",tier:4,description:"Leaves chromatic aberration silhouettes behind when walking.",iconName:"glitch-phantom",styleProps:{color:"#FF9100",auraEffect:"lightning"}},{id:"sfx_m_01",name:"Netherfire Blood Aura",category:"sfx",rarity:"mythic",tier:7,description:"Dark crimson smoke and floating brimstone embers enveloped around you.",iconName:"blood-aura",styleProps:{color:"#FF1744",auraEffect:"flames"}},{id:"sfx_l_01",name:"Cosmic Singularity Warp",category:"sfx",rarity:"legendary",tier:10,description:"Micro gravitational lensing bending light around your presence.",iconName:"singularity-warp",styleProps:{color:"#FFD700",auraEffect:"cosmic-halo"}}],Jn={};Yo.forEach(s=>{Jn[s.id]=s});function Gx(){const s=Math.random();let e=0;for(const t of e0)if(e+=qi[t].dropRate,s<=e)return t;return"common"}function Hx(s,e){const t=es.find(l=>l.tier===s)||es[0],r=Ys[s]||Ys[1],a=[];for(let l=0;l<4;l++){const d=Gx(),u=qi[d];if(Math.random()<.7){const p=r[Math.floor(Math.random()*r.length)],y=(e.unlockedFigures[p.id]||[]).includes(d),S=y?Math.max(10,Math.round(t.cost*u.duplicateMultiplier)):0;a.push({slotIndex:l,type:"figure",figure:p,rarity:d,isDuplicate:y,duplicatePayout:S})}else{const p=Yo.filter(A=>A.rarity===d),x=p.length>0?p:Yo,y=x[Math.floor(Math.random()*x.length)],S=e.unlockedCosmetics.includes(y.id),M=S?Math.max(10,Math.round(t.cost*u.duplicateMultiplier)):0;a.push({slotIndex:l,type:"cosmetic",cosmetic:y,rarity:d,isDuplicate:S,duplicatePayout:M})}}return a}const Cs=[{id:"gymnopedie",title:"Gymnopédie Celestial",genre:"Calming Ambient Piano",bpm:58},{id:"elevator_rhodes",title:"Velvet Elevator",genre:"Smooth Elevator Lounge",bpm:64},{id:"raindrops",title:"Raindrops on Copper",genre:"Lo-Fi Chill Piano",bpm:62}];class jx{constructor(){Kn(this,"ctx",null);Kn(this,"sfxGain",null);Kn(this,"bgmGain",null);Kn(this,"masterGain",null);Kn(this,"isMuted",!1);Kn(this,"sfxVolume",.75);Kn(this,"bgmVolume",.35);Kn(this,"isMusicPlaying",!1);Kn(this,"currentTrackIndex",0);Kn(this,"musicTimeoutId",null);Kn(this,"onTrackChangeCallback",null)}initCtx(){if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(this.isMuted?0:1,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.setValueAtTime(this.sfxVolume,this.ctx.currentTime),this.sfxGain.connect(this.masterGain),this.bgmGain=this.ctx.createGain(),this.bgmGain.gain.setValueAtTime(this.bgmVolume,this.ctx.currentTime),this.bgmGain.connect(this.masterGain)}this.ctx.state==="suspended"&&this.ctx.resume()}setMuted(e){this.isMuted=e,this.masterGain&&this.ctx&&this.masterGain.gain.setValueAtTime(this.isMuted?0:1,this.ctx.currentTime)}setSfxVolume(e){this.sfxVolume=Math.max(0,Math.min(1,e)),this.sfxGain&&this.ctx&&this.sfxGain.gain.setValueAtTime(this.sfxVolume,this.ctx.currentTime)}setBgmVolume(e){this.bgmVolume=Math.max(0,Math.min(1,e)),this.bgmGain&&this.ctx&&this.bgmGain.gain.setValueAtTime(this.bgmVolume,this.ctx.currentTime)}onTrackChange(e){this.onTrackChangeCallback=e}toggleMusic(){return this.initCtx(),this.isMusicPlaying?(this.stopMusic(),!1):(this.startMusic(),!0)}isBgmActive(){return this.isMusicPlaying}getCurrentTrack(){return Cs[this.currentTrackIndex]}startMusic(){this.initCtx(),!this.isMusicPlaying&&(this.isMusicPlaying=!0,this.playNextMusicCycle())}stopMusic(){this.isMusicPlaying=!1,this.musicTimeoutId&&(window.clearTimeout(this.musicTimeoutId),this.musicTimeoutId=null)}nextTrack(){this.currentTrackIndex=(this.currentTrackIndex+1)%Cs.length,this.musicTimeoutId&&(window.clearTimeout(this.musicTimeoutId),this.musicTimeoutId=null),this.isMusicPlaying&&this.playNextMusicCycle()}playNextMusicCycle(){if(!this.isMusicPlaying)return;this.initCtx();const e=Cs[this.currentTrackIndex];this.onTrackChangeCallback&&this.onTrackChangeCallback(e),e.id==="gymnopedie"?this.playGymnopedieSequence():e.id==="elevator_rhodes"?this.playElevatorRhodesSequence():this.playRaindropsSequence()}playGymnopedieSequence(){if(!this.ctx||!this.bgmGain)return;const e=[{bass:98,chord:[196,246.94,293.66,369.99],melody:[587.33,493.88]},{bass:73.42,chord:[146.83,220,277.18,369.99],melody:[440,369.99]},{bass:82.41,chord:[164.81,196,246.94,329.63],melody:[493.88,587.33]},{bass:110,chord:[220,293.66,329.63,440],melody:[369.99,293.66]}],t=4.2,r=this.ctx.currentTime;e.forEach((l,d)=>{const u=r+d*t;this.synthesizePianoNote(l.bass,u,.28,t*.9,"acoustic"),l.chord.forEach((h,p)=>{const x=.08*p+Math.random()*.03;this.synthesizePianoNote(h,u+x,.16,3.5,"acoustic")}),l.melody.forEach((h,p)=>{const x=1.4+p*1.3+Math.random()*.1;this.synthesizePianoNote(h,u+x,.18,2.8,"acoustic")})});const a=e.length*t;this.musicTimeoutId=window.setTimeout(()=>{this.isMusicPlaying&&(Math.random()<.4&&(this.currentTrackIndex=(this.currentTrackIndex+1)%Cs.length),this.playNextMusicCycle())},a*1e3)}playElevatorRhodesSequence(){if(!this.ctx||!this.bgmGain)return;const e=[{bass:73.42,chord:[146.83,220,261.63,329.63,392],melody:[523.25,440]},{bass:98,chord:[196,246.94,329.63,349.23,440],melody:[392,349.23]},{bass:65.41,chord:[130.81,196,246.94,329.63,392],melody:[493.88,392]},{bass:110,chord:[220,277.18,329.63,415.3,493.88],melody:[440,329.63]}],t=3.8,r=this.ctx.currentTime;e.forEach((l,d)=>{const u=r+d*t;this.synthesizePianoNote(l.bass,u,.25,3.2,"rhodes"),l.chord.forEach((h,p)=>{this.synthesizePianoNote(h,u+.04*p,.15,2.5,"rhodes"),this.synthesizePianoNote(h,u+1.8+.03*p,.11,1.8,"rhodes")}),l.melody.forEach((h,p)=>{this.synthesizePianoNote(h,u+.9+p*1.1,.16,2.2,"rhodes")})});const a=e.length*t;this.musicTimeoutId=window.setTimeout(()=>{this.isMusicPlaying&&(Math.random()<.4&&(this.currentTrackIndex=(this.currentTrackIndex+1)%Cs.length),this.playNextMusicCycle())},a*1e3)}playRaindropsSequence(){if(!this.ctx||!this.bgmGain)return;const e=[{bass:55,chord:[110,164.81,220,261.63,329.63],melody:[659.25,523.25]},{bass:87.31,chord:[174.61,220,261.63,329.63],melody:[440,392]},{bass:73.42,chord:[146.83,220,261.63,329.63],melody:[587.33,440]},{bass:82.41,chord:[164.81,196,246.94,329.63],melody:[392,329.63]}],t=4,r=this.ctx.currentTime;e.forEach((l,d)=>{const u=r+d*t;this.synthesizePianoNote(l.bass,u,.24,3.6,"acoustic"),l.chord.forEach((h,p)=>{this.synthesizePianoNote(h,u+p*.06,.14,3.2,"acoustic")}),l.melody.forEach((h,p)=>{this.synthesizePianoNote(h,u+1.2+p*1.2,.17,2.6,"acoustic")})});const a=e.length*t;this.musicTimeoutId=window.setTimeout(()=>{this.isMusicPlaying&&(Math.random()<.4&&(this.currentTrackIndex=(this.currentTrackIndex+1)%Cs.length),this.playNextMusicCycle())},a*1e3)}synthesizePianoNote(e,t,r,a,l="acoustic"){if(!this.ctx||!this.bgmGain)return;const d=this.ctx.createOscillator(),u=this.ctx.createGain(),h=this.ctx.createOscillator(),p=this.ctx.createGain(),x=this.ctx.createBiquadFilter();x.type="lowpass",x.frequency.setValueAtTime(l==="rhodes"?1400:2800,t),x.frequency.exponentialRampToValueAtTime(300,t+a),l==="rhodes"?(d.type="sine",h.type="triangle",h.frequency.setValueAtTime(e*2,t),p.gain.setValueAtTime(r*.35,t),p.gain.exponentialRampToValueAtTime(1e-4,t+a*.4)):(d.type="triangle",h.type="sine",h.frequency.setValueAtTime(e*3,t),p.gain.setValueAtTime(r*.25,t),p.gain.exponentialRampToValueAtTime(1e-4,t+a*.3)),d.frequency.setValueAtTime(e,t),u.gain.setValueAtTime(1e-4,t),u.gain.linearRampToValueAtTime(r,t+.015),u.gain.exponentialRampToValueAtTime(r*.6,t+.2),u.gain.exponentialRampToValueAtTime(1e-4,t+a),d.connect(u),h.connect(p),u.connect(x),p.connect(x),x.connect(this.bgmGain),d.start(t),h.start(t),d.stop(t+a+.05),h.stop(t+a+.05)}playWindup(e=1.3){if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const t=this.ctx.currentTime,r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sawtooth",r.frequency.setValueAtTime(75,t),r.frequency.exponentialRampToValueAtTime(480,t+e);const l=this.ctx.createOscillator(),d=this.ctx.createGain();l.type="square",l.frequency.setValueAtTime(14,t),l.frequency.linearRampToValueAtTime(50,t+e),d.gain.setValueAtTime(30,t),l.connect(r.frequency),r.connect(a),a.gain.setValueAtTime(.01,t),a.gain.linearRampToValueAtTime(.28,t+e*.85),a.gain.exponentialRampToValueAtTime(.001,t+e),a.connect(this.sfxGain),r.start(t),l.start(t),r.stop(t+e),l.stop(t+e);const u=28;for(let h=0;h<u;h++){const p=Math.pow(h/u,1.8),x=t+p*e*.92;this.playTactileRatchet(x,550+h*35)}}playTactileRatchet(e,t){if(!this.ctx||!this.sfxGain)return;const r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(t,e),r.frequency.exponentialRampToValueAtTime(80,e+.035),a.gain.setValueAtTime(.18,e),a.gain.exponentialRampToValueAtTime(.001,e+.035),r.connect(a),a.connect(this.sfxGain),r.start(e),r.stop(e+.04)}playExplosion(){if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const e=this.ctx.currentTime,t=this.ctx.createOscillator(),r=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(180,e),t.frequency.exponentialRampToValueAtTime(26,e+.65),r.gain.setValueAtTime(.9,e),r.gain.exponentialRampToValueAtTime(.001,e+.7),t.connect(r),r.connect(this.sfxGain),t.start(e),t.stop(e+.75);const a=this.ctx.sampleRate*.45,l=this.ctx.createBuffer(1,a,this.ctx.sampleRate),d=l.getChannelData(0);for(let x=0;x<a;x++)d[x]=Math.random()*2-1;const u=this.ctx.createBufferSource();u.buffer=l;const h=this.ctx.createBiquadFilter();h.type="lowpass",h.frequency.setValueAtTime(2200,e),h.frequency.exponentialRampToValueAtTime(150,e+.45);const p=this.ctx.createGain();p.gain.setValueAtTime(.55,e),p.gain.exponentialRampToValueAtTime(.001,e+.45),u.connect(h),h.connect(p),p.connect(this.sfxGain),u.start(e),u.stop(e+.5),this.playTactileRatchet(e,1200)}playAscendWhoosh(e,t){if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const r=this.ctx.currentTime+e*.09,a=this.ctx.createOscillator(),l=this.ctx.createGain(),u={common:260,uncommon:360,rare:520,mythic:740,legendary:980}[t]||400;a.type="sine",a.frequency.setValueAtTime(u*.5,r),a.frequency.exponentialRampToValueAtTime(u*2.2,r+.4),l.gain.setValueAtTime(.01,r),l.gain.linearRampToValueAtTime(.24,r+.16),l.gain.exponentialRampToValueAtTime(.001,r+.45),a.connect(l),l.connect(this.sfxGain),a.start(r),a.stop(r+.5)}playCardLand(e,t=0){setTimeout(()=>{if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const r=this.ctx.currentTime,a=this.ctx.createOscillator(),l=this.ctx.createGain();a.type="sine",a.frequency.setValueAtTime(210,r),a.frequency.exponentialRampToValueAtTime(42,r+.22),l.gain.setValueAtTime(.48,r),l.gain.exponentialRampToValueAtTime(.001,r+.22),a.connect(l),l.connect(this.sfxGain),a.start(r),a.stop(r+.25),this.playRarityStinger(e,r+.06)},t)}playRarityStinger(e,t){!this.ctx||!this.sfxGain||(e==="common"?this.playTone(392,"triangle",.14,t,.18):e==="uncommon"?(this.playTone(440,"sine",.2,t,.3),this.playTone(659.25,"sine",.18,t+.07,.35)):e==="rare"?(this.playTone(523.25,"triangle",.22,t,.45),this.playTone(659.25,"triangle",.22,t+.05,.45),this.playTone(783.99,"sine",.26,t+.1,.6),this.playTone(1046.5,"sine",.18,t+.15,.7)):e==="mythic"?(this.playTone(130.81,"sawtooth",.4,t,.7),this.playTone(196,"sawtooth",.35,t+.04,.7),this.playTone(261.63,"square",.3,t+.08,.8),this.playTone(392,"sine",.35,t+.12,.9),this.playTone(523.25,"sine",.25,t+.16,1)):e==="legendary"&&([523.25,659.25,783.99,1046.5,1318.51,1567.98].forEach((a,l)=>{this.playTone(a,"sine",.32,t+l*.05,1.1)}),this.playTone(261.63,"triangle",.28,t+.1,1.4)))}playTone(e,t,r,a,l){if(!this.ctx||!this.sfxGain)return;const d=this.ctx.createOscillator(),u=this.ctx.createGain();d.type=t,d.frequency.setValueAtTime(e,a),u.gain.setValueAtTime(.001,a),u.gain.linearRampToValueAtTime(r,a+.02),u.gain.exponentialRampToValueAtTime(1e-4,a+l),d.connect(u),u.connect(this.sfxGain),d.start(a),d.stop(a+l+.05)}playDuplicateCoin(e=1){if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const t=Math.min(8,Math.max(3,Math.floor(Math.log10(e+1)*2.5))),r=this.ctx.currentTime;for(let a=0;a<t;a++){const l=r+a*.065,d=1300+a*140+Math.random()*90;this.playTone(d,"sine",.18,l,.16)}}playClick(){if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const e=this.ctx.currentTime;this.playTone(720,"sine",.09,e,.035)}playTierChange(){if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const e=this.ctx.currentTime;this.playTone(240,"triangle",.16,e,.09),this.playTone(480,"sine",.14,e+.04,.11)}playJumpBoing(){if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const e=this.ctx.currentTime,t=this.ctx.createOscillator(),r=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(280,e),t.frequency.exponentialRampToValueAtTime(640,e+.13),r.gain.setValueAtTime(.26,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),t.connect(r),r.connect(this.sfxGain),t.start(e),t.stop(e+.16)}playSpringJump(){if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const e=this.ctx.currentTime,t=this.ctx.createOscillator(),r=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(320,e),t.frequency.exponentialRampToValueAtTime(1250,e+.28),r.gain.setValueAtTime(.36,e),r.gain.exponentialRampToValueAtTime(.001,e+.32),t.connect(r),r.connect(this.sfxGain),t.start(e),t.stop(e+.34)}playCoinPickup(){if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const e=this.ctx.currentTime;this.playTone(1046.5,"sine",.18,e,.08),this.playTone(1396.91,"sine",.22,e+.06,.15)}playGameOver(){if(this.initCtx(),!this.ctx||!this.sfxGain||this.isMuted)return;const e=this.ctx.currentTime,t=this.ctx.createOscillator(),r=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(380,e),t.frequency.exponentialRampToValueAtTime(50,e+.55),r.gain.setValueAtTime(.22,e),r.gain.exponentialRampToValueAtTime(.001,e+.6),t.connect(r),r.connect(this.sfxGain),t.start(e),t.stop(e+.65)}}const dt=new jx;/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wx=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),n0=(...s)=>s.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Xx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qx=mt.forwardRef(({color:s="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:a="",children:l,iconNode:d,...u},h)=>mt.createElement("svg",{ref:h,...Xx,width:e,height:e,stroke:s,strokeWidth:r?Number(t)*24/Number(e):t,className:n0("lucide",a),...u},[...d.map(([p,x])=>mt.createElement(p,x)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=(s,e)=>{const t=mt.forwardRef(({className:r,...a},l)=>mt.createElement(qx,{ref:l,iconNode:e,className:n0(`lucide-${Wx(s)}`,r),...a}));return t.displayName=`${s}`,t};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yx=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],$x=zt("ArrowLeft",Yx);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kx=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Zx=zt("ArrowRight",Kx);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jx=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],ld=zt("Check",Jx);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qx=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],ev=zt("ChevronLeft",Qx);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tv=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],i0=zt("ChevronRight",tv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nv=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],iv=zt("CircleAlert",nv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rv=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],sv=zt("CircleCheckBig",rv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ov=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],$s=zt("Coins",ov);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const av=[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]],Ul=zt("Gamepad2",av);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lv=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],cv=zt("Lock",lv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uv=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],dv=zt("Music",uv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fv=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]],hv=zt("Pause",fv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pv=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],r0=zt("Play",pv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mv=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],s0=zt("RefreshCw",mv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gv=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],xv=zt("RotateCcw",gv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vv=[["path",{d:"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",key:"1wgbhj"}]],cd=zt("Shirt",vv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _v=[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]],yv=zt("SkipForward",_v);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sv=[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]],Mv=zt("SlidersVertical",Sv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wv=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],no=zt("Sparkles",wv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ev=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],Tv=zt("Star",Ev);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bv=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],Fl=zt("Trophy",bv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cv=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Av=zt("User",Cv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rv=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],Pv=zt("Volume2",Rv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lv=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],Nv=zt("VolumeX",Lv);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],nf=zt("X",Dv),kv=({coins:s,soundMuted:e,onToggleSound:t,onOpenDoodleJump:r,onOpenWardrobe:a,onOpenCodex:l,onResetSave:d})=>{const[u,h]=mt.useState(!1),[p,x]=mt.useState(dt.getCurrentTrack());mt.useEffect(()=>{dt.onTrackChange(M=>{x(M)})},[]);const y=()=>{const M=dt.toggleMusic();h(M),x(dt.getCurrentTrack())},S=()=>{dt.nextTrack(),x(dt.getCurrentTrack())};return g.jsxs("header",{className:"w-full bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between z-30 select-none gap-2",children:[g.jsxs("div",{className:"flex items-center gap-2.5",children:[g.jsx("div",{className:"w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-yellow-500/20 border border-yellow-200",children:g.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"#000",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[g.jsx("rect",{x:"2",y:"7",width:"20",height:"14",rx:"2"}),g.jsx("path",{d:"M12 7v14"}),g.jsx("path",{d:"M2 12h20"}),g.jsx("path",{d:"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"}),g.jsx("path",{d:"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"})]})}),g.jsxs("div",{children:[g.jsxs("h1",{className:"text-lg sm:text-xl font-black tracking-wider text-white uppercase font-display leading-none",children:["case",g.jsx("span",{className:"text-yellow-400",children:"Gamba"})]}),g.jsx("p",{className:"text-[9px] sm:text-[10px] text-zinc-400 font-bold tracking-wider uppercase",children:"Overwatch-Style Lootboxes"})]})]}),g.jsxs("div",{className:"hidden lg:flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-full text-xs",children:[g.jsxs("button",{onClick:y,className:`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold transition-colors ${u?"bg-yellow-400 text-black":"bg-zinc-800 text-zinc-300 hover:text-white"}`,title:u?"Pause Ambient Music":"Play Calming Music",children:[u?g.jsx(hv,{className:"w-3 h-3"}):g.jsx(r0,{className:"w-3 h-3"}),g.jsx("span",{children:"Music"})]}),g.jsxs("div",{className:"flex items-center gap-1 text-[11px] text-zinc-300 font-semibold max-w-[180px] truncate",children:[g.jsx(dv,{className:"w-3 h-3 text-yellow-400 flex-shrink-0"}),g.jsx("span",{className:"truncate",children:p.title})]}),u&&g.jsx("button",{onClick:S,className:"p-1 rounded-full text-zinc-400 hover:text-white transition-colors",title:"Next Track",children:g.jsx(yv,{className:"w-3 h-3"})})]}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsxs("div",{className:"flex items-center gap-1.5 bg-zinc-900 border border-amber-500/40 rounded-full px-3 py-1 shadow-inner",children:[g.jsx($s,{className:"w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-pulse"}),g.jsx("span",{className:"text-xs sm:text-sm font-black text-yellow-300 tracking-wide",children:s.toLocaleString()}),g.jsxs("button",{onClick:()=>{dt.playClick(),r()},className:"text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full ml-1 transition-colors flex items-center gap-0.5",title:"Play Doodle Jump to Earn Free Coins",children:[g.jsx("span",{children:"+"})," Earn"]})]}),g.jsxs("button",{onClick:()=>{dt.playClick(),r()},className:"hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-200 transition-colors",title:"Play Doodle Jump Minigame",children:[g.jsx(Ul,{className:"w-3.5 h-3.5 text-emerald-400"}),g.jsx("span",{children:"Arcade"})]}),g.jsxs("button",{onClick:()=>{dt.playClick(),l()},className:"flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-200 transition-colors",title:"View Figures Codex",children:[g.jsx(Fl,{className:"w-3.5 h-3.5 text-yellow-400"}),g.jsx("span",{className:"hidden sm:inline",children:"Codex"})]}),g.jsxs("button",{onClick:()=>{dt.playClick(),a()},className:"flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-200 transition-colors",title:"Customize Avatar & Wardrobe",children:[g.jsx(no,{className:"w-3.5 h-3.5 text-pink-400"}),g.jsx("span",{className:"hidden sm:inline",children:"Avatar"})]}),g.jsx("button",{onClick:()=>{t()},className:"p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors",title:e?"Unmute Sound":"Mute Sound",children:e?g.jsx(Nv,{className:"w-4 h-4 text-red-400"}):g.jsx(Pv,{className:"w-4 h-4 text-emerald-400"})}),g.jsx("button",{onClick:()=>{window.confirm("Reset all saved progress and start fresh with 150 starter coins?")&&d()},className:"p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-red-400 transition-colors",title:"Reset Save Data",children:g.jsx(xv,{className:"w-4 h-4"})})]})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rf="170",Iv=0,Yp=1,Uv=2,o0=1,a0=2,Gi=3,br=0,Nn=1,Hi=2,Er=0,Ws=1,ud=2,$p=3,Kp=4,Fv=5,Kr=100,Ov=101,zv=102,Bv=103,Vv=104,Gv=200,Hv=201,jv=202,Wv=203,dd=204,fd=205,Xv=206,qv=207,Yv=208,$v=209,Kv=210,Zv=211,Jv=212,Qv=213,e_=214,hd=0,pd=1,md=2,Ks=3,gd=4,xd=5,vd=6,_d=7,l0=0,t_=1,n_=2,Tr=0,i_=1,r_=2,s_=3,c0=4,o_=5,a_=6,l_=7,u0=300,Zs=301,Js=302,yd=303,Sd=304,Gl=306,Md=1e3,Jr=1001,wd=1002,hi=1003,c_=1004,ol=1005,Ei=1006,Pu=1007,Qr=1008,Yi=1009,d0=1010,f0=1011,$o=1012,sf=1013,ts=1014,ji=1015,Ko=1016,of=1017,af=1018,Qs=1020,h0=35902,p0=1021,m0=1022,fi=1023,g0=1024,x0=1025,Xs=1026,eo=1027,v0=1028,lf=1029,_0=1030,cf=1031,uf=1033,Rl=33776,Pl=33777,Ll=33778,Nl=33779,Ed=35840,Td=35841,bd=35842,Cd=35843,Ad=36196,Rd=37492,Pd=37496,Ld=37808,Nd=37809,Dd=37810,kd=37811,Id=37812,Ud=37813,Fd=37814,Od=37815,zd=37816,Bd=37817,Vd=37818,Gd=37819,Hd=37820,jd=37821,Dl=36492,Wd=36494,Xd=36495,y0=36283,qd=36284,Yd=36285,$d=36286,u_=3200,d_=3201,S0=0,f_=1,wr="",Qn="srgb",io="srgb-linear",Hl="linear",Nt="srgb",As=7680,Zp=519,h_=512,p_=513,m_=514,M0=515,g_=516,x_=517,v_=518,__=519,Jp=35044,Qp="300 es",Wi=2e3,Ol=2001;class ro{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const l=a.indexOf(t);l!==-1&&a.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let l=0,d=a.length;l<d;l++)a[l].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lu=Math.PI/180,Kd=180/Math.PI;function Zo(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(mn[s&255]+mn[s>>8&255]+mn[s>>16&255]+mn[s>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[t&63|128]+mn[t>>8&255]+"-"+mn[t>>16&255]+mn[t>>24&255]+mn[r&255]+mn[r>>8&255]+mn[r>>16&255]+mn[r>>24&255]).toLowerCase()}function Ln(s,e,t){return Math.max(e,Math.min(t,s))}function y_(s,e){return(s%e+e)%e}function Nu(s,e,t){return(1-t)*s+t*e}function Bo(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Pn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class At{constructor(e=0,t=0){At.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6],this.y=a[1]*t+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Ln(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),a=Math.sin(t),l=this.x-e.x,d=this.y-e.y;return this.x=l*r-d*a+e.x,this.y=l*a+d*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class pt{constructor(e,t,r,a,l,d,u,h,p){pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,d,u,h,p)}set(e,t,r,a,l,d,u,h,p){const x=this.elements;return x[0]=e,x[1]=a,x[2]=u,x[3]=t,x[4]=l,x[5]=h,x[6]=r,x[7]=d,x[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,d=r[0],u=r[3],h=r[6],p=r[1],x=r[4],y=r[7],S=r[2],M=r[5],A=r[8],C=a[0],v=a[3],_=a[6],N=a[1],U=a[4],T=a[7],Y=a[2],O=a[5],I=a[8];return l[0]=d*C+u*N+h*Y,l[3]=d*v+u*U+h*O,l[6]=d*_+u*T+h*I,l[1]=p*C+x*N+y*Y,l[4]=p*v+x*U+y*O,l[7]=p*_+x*T+y*I,l[2]=S*C+M*N+A*Y,l[5]=S*v+M*U+A*O,l[8]=S*_+M*T+A*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],d=e[4],u=e[5],h=e[6],p=e[7],x=e[8];return t*d*x-t*u*p-r*l*x+r*u*h+a*l*p-a*d*h}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],d=e[4],u=e[5],h=e[6],p=e[7],x=e[8],y=x*d-u*p,S=u*h-x*l,M=p*l-d*h,A=t*y+r*S+a*M;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=y*C,e[1]=(a*p-x*r)*C,e[2]=(u*r-a*d)*C,e[3]=S*C,e[4]=(x*t-a*h)*C,e[5]=(a*l-u*t)*C,e[6]=M*C,e[7]=(r*h-p*t)*C,e[8]=(d*t-r*l)*C,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,a,l,d,u){const h=Math.cos(l),p=Math.sin(l);return this.set(r*h,r*p,-r*(h*d+p*u)+d+e,-a*p,a*h,-a*(-p*d+h*u)+u+t,0,0,1),this}scale(e,t){return this.premultiply(Du.makeScale(e,t)),this}rotate(e){return this.premultiply(Du.makeRotation(-e)),this}translate(e,t){return this.premultiply(Du.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<9;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Du=new pt;function w0(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function zl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function S_(){const s=zl("canvas");return s.style.display="block",s}const em={};function Xo(s){s in em||(em[s]=!0,console.warn(s))}function M_(s,e,t){return new Promise(function(r,a){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}function w_(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function E_(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Tt={enabled:!0,workingColorSpace:io,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Nt&&(s.r=Xi(s.r),s.g=Xi(s.g),s.b=Xi(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Nt&&(s.r=qs(s.r),s.g=qs(s.g),s.b=qs(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wr?Hl:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Xi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function qs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const tm=[.64,.33,.3,.6,.15,.06],nm=[.2126,.7152,.0722],im=[.3127,.329],rm=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sm=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Tt.define({[io]:{primaries:tm,whitePoint:im,transfer:Hl,toXYZ:rm,fromXYZ:sm,luminanceCoefficients:nm,workingColorSpaceConfig:{unpackColorSpace:Qn},outputColorSpaceConfig:{drawingBufferColorSpace:Qn}},[Qn]:{primaries:tm,whitePoint:im,transfer:Nt,toXYZ:rm,fromXYZ:sm,luminanceCoefficients:nm,outputColorSpaceConfig:{drawingBufferColorSpace:Qn}}});let Rs;class T_{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Rs===void 0&&(Rs=zl("canvas")),Rs.width=e.width,Rs.height=e.height;const r=Rs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Rs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zl("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),l=a.data;for(let d=0;d<l.length;d++)l[d]=Xi(l[d]/255)*255;return r.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Xi(t[r]/255)*255):t[r]=Xi(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let b_=0;class E0{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:b_++}),this.uuid=Zo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let d=0,u=a.length;d<u;d++)a[d].isDataTexture?l.push(ku(a[d].image)):l.push(ku(a[d]))}else l=ku(a);r.url=l}return t||(e.images[this.uuid]=r),r}}function ku(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?T_.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let C_=0;class Dn extends ro{constructor(e=Dn.DEFAULT_IMAGE,t=Dn.DEFAULT_MAPPING,r=Jr,a=Jr,l=Ei,d=Qr,u=fi,h=Yi,p=Dn.DEFAULT_ANISOTROPY,x=wr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:C_++}),this.uuid=Zo(),this.name="",this.source=new E0(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=l,this.minFilter=d,this.anisotropy=p,this.format=u,this.internalFormat=null,this.type=h,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=x,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==u0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Md:e.x=e.x-Math.floor(e.x);break;case Jr:e.x=e.x<0?0:1;break;case wd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Md:e.y=e.y-Math.floor(e.y);break;case Jr:e.y=e.y<0?0:1;break;case wd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dn.DEFAULT_IMAGE=null;Dn.DEFAULT_MAPPING=u0;Dn.DEFAULT_ANISOTROPY=1;class Dt{constructor(e=0,t=0,r=0,a=1){Dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,a){return this.x=e,this.y=t,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=this.w,d=e.elements;return this.x=d[0]*t+d[4]*r+d[8]*a+d[12]*l,this.y=d[1]*t+d[5]*r+d[9]*a+d[13]*l,this.z=d[2]*t+d[6]*r+d[10]*a+d[14]*l,this.w=d[3]*t+d[7]*r+d[11]*a+d[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,a,l;const h=e.elements,p=h[0],x=h[4],y=h[8],S=h[1],M=h[5],A=h[9],C=h[2],v=h[6],_=h[10];if(Math.abs(x-S)<.01&&Math.abs(y-C)<.01&&Math.abs(A-v)<.01){if(Math.abs(x+S)<.1&&Math.abs(y+C)<.1&&Math.abs(A+v)<.1&&Math.abs(p+M+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const U=(p+1)/2,T=(M+1)/2,Y=(_+1)/2,O=(x+S)/4,I=(y+C)/4,W=(A+v)/4;return U>T&&U>Y?U<.01?(r=0,a=.707106781,l=.707106781):(r=Math.sqrt(U),a=O/r,l=I/r):T>Y?T<.01?(r=.707106781,a=0,l=.707106781):(a=Math.sqrt(T),r=O/a,l=W/a):Y<.01?(r=.707106781,a=.707106781,l=0):(l=Math.sqrt(Y),r=I/l,a=W/l),this.set(r,a,l,t),this}let N=Math.sqrt((v-A)*(v-A)+(y-C)*(y-C)+(S-x)*(S-x));return Math.abs(N)<.001&&(N=1),this.x=(v-A)/N,this.y=(y-C)/N,this.z=(S-x)/N,this.w=Math.acos((p+M+_-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class A_ extends ro{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t);const a={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const l=new Dn(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);l.flipY=!1,l.generateMipmaps=r.generateMipmaps,l.internalFormat=r.internalFormat,this.textures=[];const d=r.count;for(let u=0;u<d;u++)this.textures[u]=l.clone(),this.textures[u].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let a=0,l=this.textures.length;a<l;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new E0(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ns extends A_{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class T0 extends Dn{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=hi,this.minFilter=hi,this.wrapR=Jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class R_ extends Dn{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=hi,this.minFilter=hi,this.wrapR=Jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jo{constructor(e=0,t=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=a}static slerpFlat(e,t,r,a,l,d,u){let h=r[a+0],p=r[a+1],x=r[a+2],y=r[a+3];const S=l[d+0],M=l[d+1],A=l[d+2],C=l[d+3];if(u===0){e[t+0]=h,e[t+1]=p,e[t+2]=x,e[t+3]=y;return}if(u===1){e[t+0]=S,e[t+1]=M,e[t+2]=A,e[t+3]=C;return}if(y!==C||h!==S||p!==M||x!==A){let v=1-u;const _=h*S+p*M+x*A+y*C,N=_>=0?1:-1,U=1-_*_;if(U>Number.EPSILON){const Y=Math.sqrt(U),O=Math.atan2(Y,_*N);v=Math.sin(v*O)/Y,u=Math.sin(u*O)/Y}const T=u*N;if(h=h*v+S*T,p=p*v+M*T,x=x*v+A*T,y=y*v+C*T,v===1-u){const Y=1/Math.sqrt(h*h+p*p+x*x+y*y);h*=Y,p*=Y,x*=Y,y*=Y}}e[t]=h,e[t+1]=p,e[t+2]=x,e[t+3]=y}static multiplyQuaternionsFlat(e,t,r,a,l,d){const u=r[a],h=r[a+1],p=r[a+2],x=r[a+3],y=l[d],S=l[d+1],M=l[d+2],A=l[d+3];return e[t]=u*A+x*y+h*M-p*S,e[t+1]=h*A+x*S+p*y-u*M,e[t+2]=p*A+x*M+u*S-h*y,e[t+3]=x*A-u*y-h*S-p*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,a){return this._x=e,this._y=t,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,a=e._y,l=e._z,d=e._order,u=Math.cos,h=Math.sin,p=u(r/2),x=u(a/2),y=u(l/2),S=h(r/2),M=h(a/2),A=h(l/2);switch(d){case"XYZ":this._x=S*x*y+p*M*A,this._y=p*M*y-S*x*A,this._z=p*x*A+S*M*y,this._w=p*x*y-S*M*A;break;case"YXZ":this._x=S*x*y+p*M*A,this._y=p*M*y-S*x*A,this._z=p*x*A-S*M*y,this._w=p*x*y+S*M*A;break;case"ZXY":this._x=S*x*y-p*M*A,this._y=p*M*y+S*x*A,this._z=p*x*A+S*M*y,this._w=p*x*y-S*M*A;break;case"ZYX":this._x=S*x*y-p*M*A,this._y=p*M*y+S*x*A,this._z=p*x*A-S*M*y,this._w=p*x*y+S*M*A;break;case"YZX":this._x=S*x*y+p*M*A,this._y=p*M*y+S*x*A,this._z=p*x*A-S*M*y,this._w=p*x*y-S*M*A;break;case"XZY":this._x=S*x*y-p*M*A,this._y=p*M*y-S*x*A,this._z=p*x*A+S*M*y,this._w=p*x*y+S*M*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+d)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],a=t[4],l=t[8],d=t[1],u=t[5],h=t[9],p=t[2],x=t[6],y=t[10],S=r+u+y;if(S>0){const M=.5/Math.sqrt(S+1);this._w=.25/M,this._x=(x-h)*M,this._y=(l-p)*M,this._z=(d-a)*M}else if(r>u&&r>y){const M=2*Math.sqrt(1+r-u-y);this._w=(x-h)/M,this._x=.25*M,this._y=(a+d)/M,this._z=(l+p)/M}else if(u>y){const M=2*Math.sqrt(1+u-r-y);this._w=(l-p)/M,this._x=(a+d)/M,this._y=.25*M,this._z=(h+x)/M}else{const M=2*Math.sqrt(1+y-r-u);this._w=(d-a)/M,this._x=(l+p)/M,this._y=(h+x)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ln(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,t/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,a=e._y,l=e._z,d=e._w,u=t._x,h=t._y,p=t._z,x=t._w;return this._x=r*x+d*u+a*p-l*h,this._y=a*x+d*h+l*u-r*p,this._z=l*x+d*p+r*h-a*u,this._w=d*x-r*u-a*h-l*p,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,a=this._y,l=this._z,d=this._w;let u=d*e._w+r*e._x+a*e._y+l*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=d,this._x=r,this._y=a,this._z=l,this;const h=1-u*u;if(h<=Number.EPSILON){const M=1-t;return this._w=M*d+t*this._w,this._x=M*r+t*this._x,this._y=M*a+t*this._y,this._z=M*l+t*this._z,this.normalize(),this}const p=Math.sqrt(h),x=Math.atan2(p,u),y=Math.sin((1-t)*x)/p,S=Math.sin(t*x)/p;return this._w=d*y+this._w*S,this._x=r*y+this._x*S,this._y=a*y+this._y*S,this._z=l*y+this._z*S,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(e=0,t=0,r=0){J.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(om.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(om.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*a,this.y=l[1]*t+l[4]*r+l[7]*a,this.z=l[2]*t+l[5]*r+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=e.elements,d=1/(l[3]*t+l[7]*r+l[11]*a+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*a+l[12])*d,this.y=(l[1]*t+l[5]*r+l[9]*a+l[13])*d,this.z=(l[2]*t+l[6]*r+l[10]*a+l[14])*d,this}applyQuaternion(e){const t=this.x,r=this.y,a=this.z,l=e.x,d=e.y,u=e.z,h=e.w,p=2*(d*a-u*r),x=2*(u*t-l*a),y=2*(l*r-d*t);return this.x=t+h*p+d*y-u*x,this.y=r+h*x+u*p-l*y,this.z=a+h*y+l*x-d*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*a,this.y=l[1]*t+l[5]*r+l[9]*a,this.z=l[2]*t+l[6]*r+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,a=e.y,l=e.z,d=t.x,u=t.y,h=t.z;return this.x=a*h-l*u,this.y=l*d-r*h,this.z=r*u-a*d,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Iu.copy(this).projectOnVector(e),this.sub(Iu)}reflect(e){return this.sub(Iu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Ln(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return t*t+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const a=Math.sin(t)*e;return this.x=a*Math.sin(r),this.y=Math.cos(t)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Iu=new J,om=new Jo;class Qo{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let d=0,u=l.count;d<u;d++)e.isMesh===!0?e.getVertexPosition(d,li):li.fromBufferAttribute(l,d),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),al.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),al.copy(r.boundingBox)),al.applyMatrix4(e.matrixWorld),this.union(al)}const a=e.children;for(let l=0,d=a.length;l<d;l++)this.expandByObject(a[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vo),ll.subVectors(this.max,Vo),Ps.subVectors(e.a,Vo),Ls.subVectors(e.b,Vo),Ns.subVectors(e.c,Vo),gr.subVectors(Ls,Ps),xr.subVectors(Ns,Ls),Gr.subVectors(Ps,Ns);let t=[0,-gr.z,gr.y,0,-xr.z,xr.y,0,-Gr.z,Gr.y,gr.z,0,-gr.x,xr.z,0,-xr.x,Gr.z,0,-Gr.x,-gr.y,gr.x,0,-xr.y,xr.x,0,-Gr.y,Gr.x,0];return!Uu(t,Ps,Ls,Ns,ll)||(t=[1,0,0,0,1,0,0,0,1],!Uu(t,Ps,Ls,Ns,ll))?!1:(cl.crossVectors(gr,xr),t=[cl.x,cl.y,cl.z],Uu(t,Ps,Ls,Ns,ll))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fi=[new J,new J,new J,new J,new J,new J,new J,new J],li=new J,al=new Qo,Ps=new J,Ls=new J,Ns=new J,gr=new J,xr=new J,Gr=new J,Vo=new J,ll=new J,cl=new J,Hr=new J;function Uu(s,e,t,r,a){for(let l=0,d=s.length-3;l<=d;l+=3){Hr.fromArray(s,l);const u=a.x*Math.abs(Hr.x)+a.y*Math.abs(Hr.y)+a.z*Math.abs(Hr.z),h=e.dot(Hr),p=t.dot(Hr),x=r.dot(Hr);if(Math.max(-Math.max(h,p,x),Math.min(h,p,x))>u)return!1}return!0}const P_=new Qo,Go=new J,Fu=new J;class jl{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):P_.setFromPoints(e).getCenter(r);let a=0;for(let l=0,d=e.length;l<d;l++)a=Math.max(a,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Go.subVectors(e,this.center);const t=Go.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),a=(r-this.radius)*.5;this.center.addScaledVector(Go,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Go.copy(e.center).add(Fu)),this.expandByPoint(Go.copy(e.center).sub(Fu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Oi=new J,Ou=new J,ul=new J,vr=new J,zu=new J,dl=new J,Bu=new J;class b0{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Oi.copy(this.origin).addScaledVector(this.direction,t),Oi.distanceToSquared(e))}distanceSqToSegment(e,t,r,a){Ou.copy(e).add(t).multiplyScalar(.5),ul.copy(t).sub(e).normalize(),vr.copy(this.origin).sub(Ou);const l=e.distanceTo(t)*.5,d=-this.direction.dot(ul),u=vr.dot(this.direction),h=-vr.dot(ul),p=vr.lengthSq(),x=Math.abs(1-d*d);let y,S,M,A;if(x>0)if(y=d*h-u,S=d*u-h,A=l*x,y>=0)if(S>=-A)if(S<=A){const C=1/x;y*=C,S*=C,M=y*(y+d*S+2*u)+S*(d*y+S+2*h)+p}else S=l,y=Math.max(0,-(d*S+u)),M=-y*y+S*(S+2*h)+p;else S=-l,y=Math.max(0,-(d*S+u)),M=-y*y+S*(S+2*h)+p;else S<=-A?(y=Math.max(0,-(-d*l+u)),S=y>0?-l:Math.min(Math.max(-l,-h),l),M=-y*y+S*(S+2*h)+p):S<=A?(y=0,S=Math.min(Math.max(-l,-h),l),M=S*(S+2*h)+p):(y=Math.max(0,-(d*l+u)),S=y>0?l:Math.min(Math.max(-l,-h),l),M=-y*y+S*(S+2*h)+p);else S=d>0?-l:l,y=Math.max(0,-(d*S+u)),M=-y*y+S*(S+2*h)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,y),a&&a.copy(Ou).addScaledVector(ul,S),M}intersectSphere(e,t){Oi.subVectors(e.center,this.origin);const r=Oi.dot(this.direction),a=Oi.dot(Oi)-r*r,l=e.radius*e.radius;if(a>l)return null;const d=Math.sqrt(l-a),u=r-d,h=r+d;return h<0?null:u<0?this.at(h,t):this.at(u,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,a,l,d,u,h;const p=1/this.direction.x,x=1/this.direction.y,y=1/this.direction.z,S=this.origin;return p>=0?(r=(e.min.x-S.x)*p,a=(e.max.x-S.x)*p):(r=(e.max.x-S.x)*p,a=(e.min.x-S.x)*p),x>=0?(l=(e.min.y-S.y)*x,d=(e.max.y-S.y)*x):(l=(e.max.y-S.y)*x,d=(e.min.y-S.y)*x),r>d||l>a||((l>r||isNaN(r))&&(r=l),(d<a||isNaN(a))&&(a=d),y>=0?(u=(e.min.z-S.z)*y,h=(e.max.z-S.z)*y):(u=(e.max.z-S.z)*y,h=(e.min.z-S.z)*y),r>h||u>a)||((u>r||r!==r)&&(r=u),(h<a||a!==a)&&(a=h),a<0)?null:this.at(r>=0?r:a,t)}intersectsBox(e){return this.intersectBox(e,Oi)!==null}intersectTriangle(e,t,r,a,l){zu.subVectors(t,e),dl.subVectors(r,e),Bu.crossVectors(zu,dl);let d=this.direction.dot(Bu),u;if(d>0){if(a)return null;u=1}else if(d<0)u=-1,d=-d;else return null;vr.subVectors(this.origin,e);const h=u*this.direction.dot(dl.crossVectors(vr,dl));if(h<0)return null;const p=u*this.direction.dot(zu.cross(vr));if(p<0||h+p>d)return null;const x=-u*vr.dot(Bu);return x<0?null:this.at(x/d,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vt{constructor(e,t,r,a,l,d,u,h,p,x,y,S,M,A,C,v){Vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,d,u,h,p,x,y,S,M,A,C,v)}set(e,t,r,a,l,d,u,h,p,x,y,S,M,A,C,v){const _=this.elements;return _[0]=e,_[4]=t,_[8]=r,_[12]=a,_[1]=l,_[5]=d,_[9]=u,_[13]=h,_[2]=p,_[6]=x,_[10]=y,_[14]=S,_[3]=M,_[7]=A,_[11]=C,_[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Vt().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,a=1/Ds.setFromMatrixColumn(e,0).length(),l=1/Ds.setFromMatrixColumn(e,1).length(),d=1/Ds.setFromMatrixColumn(e,2).length();return t[0]=r[0]*a,t[1]=r[1]*a,t[2]=r[2]*a,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*d,t[9]=r[9]*d,t[10]=r[10]*d,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,a=e.y,l=e.z,d=Math.cos(r),u=Math.sin(r),h=Math.cos(a),p=Math.sin(a),x=Math.cos(l),y=Math.sin(l);if(e.order==="XYZ"){const S=d*x,M=d*y,A=u*x,C=u*y;t[0]=h*x,t[4]=-h*y,t[8]=p,t[1]=M+A*p,t[5]=S-C*p,t[9]=-u*h,t[2]=C-S*p,t[6]=A+M*p,t[10]=d*h}else if(e.order==="YXZ"){const S=h*x,M=h*y,A=p*x,C=p*y;t[0]=S+C*u,t[4]=A*u-M,t[8]=d*p,t[1]=d*y,t[5]=d*x,t[9]=-u,t[2]=M*u-A,t[6]=C+S*u,t[10]=d*h}else if(e.order==="ZXY"){const S=h*x,M=h*y,A=p*x,C=p*y;t[0]=S-C*u,t[4]=-d*y,t[8]=A+M*u,t[1]=M+A*u,t[5]=d*x,t[9]=C-S*u,t[2]=-d*p,t[6]=u,t[10]=d*h}else if(e.order==="ZYX"){const S=d*x,M=d*y,A=u*x,C=u*y;t[0]=h*x,t[4]=A*p-M,t[8]=S*p+C,t[1]=h*y,t[5]=C*p+S,t[9]=M*p-A,t[2]=-p,t[6]=u*h,t[10]=d*h}else if(e.order==="YZX"){const S=d*h,M=d*p,A=u*h,C=u*p;t[0]=h*x,t[4]=C-S*y,t[8]=A*y+M,t[1]=y,t[5]=d*x,t[9]=-u*x,t[2]=-p*x,t[6]=M*y+A,t[10]=S-C*y}else if(e.order==="XZY"){const S=d*h,M=d*p,A=u*h,C=u*p;t[0]=h*x,t[4]=-y,t[8]=p*x,t[1]=S*y+C,t[5]=d*x,t[9]=M*y-A,t[2]=A*y-M,t[6]=u*x,t[10]=C*y+S}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(L_,e,N_)}lookAt(e,t,r){const a=this.elements;return On.subVectors(e,t),On.lengthSq()===0&&(On.z=1),On.normalize(),_r.crossVectors(r,On),_r.lengthSq()===0&&(Math.abs(r.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),_r.crossVectors(r,On)),_r.normalize(),fl.crossVectors(On,_r),a[0]=_r.x,a[4]=fl.x,a[8]=On.x,a[1]=_r.y,a[5]=fl.y,a[9]=On.y,a[2]=_r.z,a[6]=fl.z,a[10]=On.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,d=r[0],u=r[4],h=r[8],p=r[12],x=r[1],y=r[5],S=r[9],M=r[13],A=r[2],C=r[6],v=r[10],_=r[14],N=r[3],U=r[7],T=r[11],Y=r[15],O=a[0],I=a[4],W=a[8],L=a[12],w=a[1],z=a[5],ie=a[9],Q=a[13],de=a[2],pe=a[6],le=a[10],he=a[14],G=a[3],fe=a[7],D=a[11],E=a[15];return l[0]=d*O+u*w+h*de+p*G,l[4]=d*I+u*z+h*pe+p*fe,l[8]=d*W+u*ie+h*le+p*D,l[12]=d*L+u*Q+h*he+p*E,l[1]=x*O+y*w+S*de+M*G,l[5]=x*I+y*z+S*pe+M*fe,l[9]=x*W+y*ie+S*le+M*D,l[13]=x*L+y*Q+S*he+M*E,l[2]=A*O+C*w+v*de+_*G,l[6]=A*I+C*z+v*pe+_*fe,l[10]=A*W+C*ie+v*le+_*D,l[14]=A*L+C*Q+v*he+_*E,l[3]=N*O+U*w+T*de+Y*G,l[7]=N*I+U*z+T*pe+Y*fe,l[11]=N*W+U*ie+T*le+Y*D,l[15]=N*L+U*Q+T*he+Y*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],a=e[8],l=e[12],d=e[1],u=e[5],h=e[9],p=e[13],x=e[2],y=e[6],S=e[10],M=e[14],A=e[3],C=e[7],v=e[11],_=e[15];return A*(+l*h*y-a*p*y-l*u*S+r*p*S+a*u*M-r*h*M)+C*(+t*h*M-t*p*S+l*d*S-a*d*M+a*p*x-l*h*x)+v*(+t*p*y-t*u*M-l*d*y+r*d*M+l*u*x-r*p*x)+_*(-a*u*x-t*h*y+t*u*S+a*d*y-r*d*S+r*h*x)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],d=e[4],u=e[5],h=e[6],p=e[7],x=e[8],y=e[9],S=e[10],M=e[11],A=e[12],C=e[13],v=e[14],_=e[15],N=y*v*p-C*S*p+C*h*M-u*v*M-y*h*_+u*S*_,U=A*S*p-x*v*p-A*h*M+d*v*M+x*h*_-d*S*_,T=x*C*p-A*y*p+A*u*M-d*C*M-x*u*_+d*y*_,Y=A*y*h-x*C*h-A*u*S+d*C*S+x*u*v-d*y*v,O=t*N+r*U+a*T+l*Y;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/O;return e[0]=N*I,e[1]=(C*S*l-y*v*l-C*a*M+r*v*M+y*a*_-r*S*_)*I,e[2]=(u*v*l-C*h*l+C*a*p-r*v*p-u*a*_+r*h*_)*I,e[3]=(y*h*l-u*S*l-y*a*p+r*S*p+u*a*M-r*h*M)*I,e[4]=U*I,e[5]=(x*v*l-A*S*l+A*a*M-t*v*M-x*a*_+t*S*_)*I,e[6]=(A*h*l-d*v*l-A*a*p+t*v*p+d*a*_-t*h*_)*I,e[7]=(d*S*l-x*h*l+x*a*p-t*S*p-d*a*M+t*h*M)*I,e[8]=T*I,e[9]=(A*y*l-x*C*l-A*r*M+t*C*M+x*r*_-t*y*_)*I,e[10]=(d*C*l-A*u*l+A*r*p-t*C*p-d*r*_+t*u*_)*I,e[11]=(x*u*l-d*y*l-x*r*p+t*y*p+d*r*M-t*u*M)*I,e[12]=Y*I,e[13]=(x*C*a-A*y*a+A*r*S-t*C*S-x*r*v+t*y*v)*I,e[14]=(A*u*a-d*C*a-A*r*h+t*C*h+d*r*v-t*u*v)*I,e[15]=(d*y*a-x*u*a+x*r*h-t*y*h-d*r*S+t*u*S)*I,this}scale(e){const t=this.elements,r=e.x,a=e.y,l=e.z;return t[0]*=r,t[4]*=a,t[8]*=l,t[1]*=r,t[5]*=a,t[9]*=l,t[2]*=r,t[6]*=a,t[10]*=l,t[3]*=r,t[7]*=a,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,a))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),a=Math.sin(t),l=1-r,d=e.x,u=e.y,h=e.z,p=l*d,x=l*u;return this.set(p*d+r,p*u-a*h,p*h+a*u,0,p*u+a*h,x*u+r,x*h-a*d,0,p*h-a*u,x*h+a*d,l*h*h+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,a,l,d){return this.set(1,r,l,0,e,1,d,0,t,a,1,0,0,0,0,1),this}compose(e,t,r){const a=this.elements,l=t._x,d=t._y,u=t._z,h=t._w,p=l+l,x=d+d,y=u+u,S=l*p,M=l*x,A=l*y,C=d*x,v=d*y,_=u*y,N=h*p,U=h*x,T=h*y,Y=r.x,O=r.y,I=r.z;return a[0]=(1-(C+_))*Y,a[1]=(M+T)*Y,a[2]=(A-U)*Y,a[3]=0,a[4]=(M-T)*O,a[5]=(1-(S+_))*O,a[6]=(v+N)*O,a[7]=0,a[8]=(A+U)*I,a[9]=(v-N)*I,a[10]=(1-(S+C))*I,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,r){const a=this.elements;let l=Ds.set(a[0],a[1],a[2]).length();const d=Ds.set(a[4],a[5],a[6]).length(),u=Ds.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],ci.copy(this);const p=1/l,x=1/d,y=1/u;return ci.elements[0]*=p,ci.elements[1]*=p,ci.elements[2]*=p,ci.elements[4]*=x,ci.elements[5]*=x,ci.elements[6]*=x,ci.elements[8]*=y,ci.elements[9]*=y,ci.elements[10]*=y,t.setFromRotationMatrix(ci),r.x=l,r.y=d,r.z=u,this}makePerspective(e,t,r,a,l,d,u=Wi){const h=this.elements,p=2*l/(t-e),x=2*l/(r-a),y=(t+e)/(t-e),S=(r+a)/(r-a);let M,A;if(u===Wi)M=-(d+l)/(d-l),A=-2*d*l/(d-l);else if(u===Ol)M=-d/(d-l),A=-d*l/(d-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return h[0]=p,h[4]=0,h[8]=y,h[12]=0,h[1]=0,h[5]=x,h[9]=S,h[13]=0,h[2]=0,h[6]=0,h[10]=M,h[14]=A,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,r,a,l,d,u=Wi){const h=this.elements,p=1/(t-e),x=1/(r-a),y=1/(d-l),S=(t+e)*p,M=(r+a)*x;let A,C;if(u===Wi)A=(d+l)*y,C=-2*y;else if(u===Ol)A=l*y,C=-1*y;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return h[0]=2*p,h[4]=0,h[8]=0,h[12]=-S,h[1]=0,h[5]=2*x,h[9]=0,h[13]=-M,h[2]=0,h[6]=0,h[10]=C,h[14]=-A,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<16;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const Ds=new J,ci=new Vt,L_=new J(0,0,0),N_=new J(1,1,1),_r=new J,fl=new J,On=new J,am=new Vt,lm=new Jo;class Ti{constructor(e=0,t=0,r=0,a=Ti.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,a=this._order){return this._x=e,this._y=t,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const a=e.elements,l=a[0],d=a[4],u=a[8],h=a[1],p=a[5],x=a[9],y=a[2],S=a[6],M=a[10];switch(t){case"XYZ":this._y=Math.asin(Ln(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-x,M),this._z=Math.atan2(-d,l)):(this._x=Math.atan2(S,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Ln(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(u,M),this._z=Math.atan2(h,p)):(this._y=Math.atan2(-y,l),this._z=0);break;case"ZXY":this._x=Math.asin(Ln(S,-1,1)),Math.abs(S)<.9999999?(this._y=Math.atan2(-y,M),this._z=Math.atan2(-d,p)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-Ln(y,-1,1)),Math.abs(y)<.9999999?(this._x=Math.atan2(S,M),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-d,p));break;case"YZX":this._z=Math.asin(Ln(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-x,p),this._y=Math.atan2(-y,l)):(this._x=0,this._y=Math.atan2(u,M));break;case"XZY":this._z=Math.asin(-Ln(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(S,p),this._y=Math.atan2(u,l)):(this._x=Math.atan2(-x,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return am.makeRotationFromQuaternion(e),this.setFromRotationMatrix(am,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return lm.setFromEuler(this),this.setFromQuaternion(lm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ti.DEFAULT_ORDER="XYZ";class C0{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let D_=0;const cm=new J,ks=new Jo,zi=new Vt,hl=new J,Ho=new J,k_=new J,I_=new Jo,um=new J(1,0,0),dm=new J(0,1,0),fm=new J(0,0,1),hm={type:"added"},U_={type:"removed"},Is={type:"childadded",child:null},Vu={type:"childremoved",child:null};class ln extends ro{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:D_++}),this.uuid=Zo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ln.DEFAULT_UP.clone();const e=new J,t=new Ti,r=new Jo,a=new J(1,1,1);function l(){r.setFromEuler(t,!1)}function d(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Vt},normalMatrix:{value:new pt}}),this.matrix=new Vt,this.matrixWorld=new Vt,this.matrixAutoUpdate=ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new C0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(um,e)}rotateY(e){return this.rotateOnAxis(dm,e)}rotateZ(e){return this.rotateOnAxis(fm,e)}translateOnAxis(e,t){return cm.copy(e).applyQuaternion(this.quaternion),this.position.add(cm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(um,e)}translateY(e){return this.translateOnAxis(dm,e)}translateZ(e){return this.translateOnAxis(fm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?hl.copy(e):hl.set(e,t,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Ho.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zi.lookAt(Ho,hl,this.up):zi.lookAt(hl,Ho,this.up),this.quaternion.setFromRotationMatrix(zi),a&&(zi.extractRotation(a.matrixWorld),ks.setFromRotationMatrix(zi),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hm),Is.child=e,this.dispatchEvent(Is),Is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(U_),Vu.child=e,this.dispatchEvent(Vu),Vu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zi.multiply(e.parent.matrixWorld)),e.applyMatrix4(zi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hm),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,a=this.children.length;r<a;r++){const d=this.children[r].getObjectByProperty(e,t);if(d!==void 0)return d}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const a=this.children;for(let l=0,d=a.length;l<d;l++)a[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ho,e,k_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ho,I_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let l=0,d=a.length;l<d;l++)a[l].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(u=>({boxInitialized:u.boxInitialized,boxMin:u.box.min.toArray(),boxMax:u.box.max.toArray(),sphereInitialized:u.sphereInitialized,sphereRadius:u.sphere.radius,sphereCenter:u.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function l(u,h){return u[h.uuid]===void 0&&(u[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const h=u.shapes;if(Array.isArray(h))for(let p=0,x=h.length;p<x;p++){const y=h[p];l(e.shapes,y)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let h=0,p=this.material.length;h<p;h++)u.push(l(e.materials,this.material[h]));a.material=u}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let u=0;u<this.children.length;u++)a.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let u=0;u<this.animations.length;u++){const h=this.animations[u];a.animations.push(l(e.animations,h))}}if(t){const u=d(e.geometries),h=d(e.materials),p=d(e.textures),x=d(e.images),y=d(e.shapes),S=d(e.skeletons),M=d(e.animations),A=d(e.nodes);u.length>0&&(r.geometries=u),h.length>0&&(r.materials=h),p.length>0&&(r.textures=p),x.length>0&&(r.images=x),y.length>0&&(r.shapes=y),S.length>0&&(r.skeletons=S),M.length>0&&(r.animations=M),A.length>0&&(r.nodes=A)}return r.object=a,r;function d(u){const h=[];for(const p in u){const x=u[p];delete x.metadata,h.push(x)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}ln.DEFAULT_UP=new J(0,1,0);ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ui=new J,Bi=new J,Gu=new J,Vi=new J,Us=new J,Fs=new J,pm=new J,Hu=new J,ju=new J,Wu=new J,Xu=new Dt,qu=new Dt,Yu=new Dt;class di{constructor(e=new J,t=new J,r=new J){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,a){a.subVectors(r,t),ui.subVectors(e,t),a.cross(ui);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,t,r,a,l){ui.subVectors(a,t),Bi.subVectors(r,t),Gu.subVectors(e,t);const d=ui.dot(ui),u=ui.dot(Bi),h=ui.dot(Gu),p=Bi.dot(Bi),x=Bi.dot(Gu),y=d*p-u*u;if(y===0)return l.set(0,0,0),null;const S=1/y,M=(p*h-u*x)*S,A=(d*x-u*h)*S;return l.set(1-M-A,A,M)}static containsPoint(e,t,r,a){return this.getBarycoord(e,t,r,a,Vi)===null?!1:Vi.x>=0&&Vi.y>=0&&Vi.x+Vi.y<=1}static getInterpolation(e,t,r,a,l,d,u,h){return this.getBarycoord(e,t,r,a,Vi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,Vi.x),h.addScaledVector(d,Vi.y),h.addScaledVector(u,Vi.z),h)}static getInterpolatedAttribute(e,t,r,a,l,d){return Xu.setScalar(0),qu.setScalar(0),Yu.setScalar(0),Xu.fromBufferAttribute(e,t),qu.fromBufferAttribute(e,r),Yu.fromBufferAttribute(e,a),d.setScalar(0),d.addScaledVector(Xu,l.x),d.addScaledVector(qu,l.y),d.addScaledVector(Yu,l.z),d}static isFrontFacing(e,t,r,a){return ui.subVectors(r,t),Bi.subVectors(e,t),ui.cross(Bi).dot(a)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,a){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,r,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),Bi.subVectors(this.a,this.b),ui.cross(Bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return di.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,a,l){return di.getInterpolation(e,this.a,this.b,this.c,t,r,a,l)}containsPoint(e){return di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,a=this.b,l=this.c;let d,u;Us.subVectors(a,r),Fs.subVectors(l,r),Hu.subVectors(e,r);const h=Us.dot(Hu),p=Fs.dot(Hu);if(h<=0&&p<=0)return t.copy(r);ju.subVectors(e,a);const x=Us.dot(ju),y=Fs.dot(ju);if(x>=0&&y<=x)return t.copy(a);const S=h*y-x*p;if(S<=0&&h>=0&&x<=0)return d=h/(h-x),t.copy(r).addScaledVector(Us,d);Wu.subVectors(e,l);const M=Us.dot(Wu),A=Fs.dot(Wu);if(A>=0&&M<=A)return t.copy(l);const C=M*p-h*A;if(C<=0&&p>=0&&A<=0)return u=p/(p-A),t.copy(r).addScaledVector(Fs,u);const v=x*A-M*y;if(v<=0&&y-x>=0&&M-A>=0)return pm.subVectors(l,a),u=(y-x)/(y-x+(M-A)),t.copy(a).addScaledVector(pm,u);const _=1/(v+C+S);return d=C*_,u=S*_,t.copy(r).addScaledVector(Us,d).addScaledVector(Fs,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const A0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yr={h:0,s:0,l:0},pl={h:0,s:0,l:0};function $u(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class St{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.toWorkingColorSpace(this,t),this}setRGB(e,t,r,a=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=r,Tt.toWorkingColorSpace(this,a),this}setHSL(e,t,r,a=Tt.workingColorSpace){if(e=y_(e,1),t=Ln(t,0,1),r=Ln(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,d=2*r-l;this.r=$u(d,l,e+1/3),this.g=$u(d,l,e),this.b=$u(d,l,e-1/3)}return Tt.toWorkingColorSpace(this,a),this}setStyle(e,t=Qn){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const d=a[1],u=a[2];switch(d){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],d=l.length;if(d===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(d===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qn){const r=A0[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}copyLinearToSRGB(e){return this.r=qs(e.r),this.g=qs(e.g),this.b=qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qn){return Tt.fromWorkingColorSpace(gn.copy(this),e),Math.round(Ln(gn.r*255,0,255))*65536+Math.round(Ln(gn.g*255,0,255))*256+Math.round(Ln(gn.b*255,0,255))}getHexString(e=Qn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.fromWorkingColorSpace(gn.copy(this),t);const r=gn.r,a=gn.g,l=gn.b,d=Math.max(r,a,l),u=Math.min(r,a,l);let h,p;const x=(u+d)/2;if(u===d)h=0,p=0;else{const y=d-u;switch(p=x<=.5?y/(d+u):y/(2-d-u),d){case r:h=(a-l)/y+(a<l?6:0);break;case a:h=(l-r)/y+2;break;case l:h=(r-a)/y+4;break}h/=6}return e.h=h,e.s=p,e.l=x,e}getRGB(e,t=Tt.workingColorSpace){return Tt.fromWorkingColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=Qn){Tt.fromWorkingColorSpace(gn.copy(this),e);const t=gn.r,r=gn.g,a=gn.b;return e!==Qn?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,t,r){return this.getHSL(yr),this.setHSL(yr.h+e,yr.s+t,yr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(yr),e.getHSL(pl);const r=Nu(yr.h,pl.h,t),a=Nu(yr.s,pl.s,t),l=Nu(yr.l,pl.l,t);return this.setHSL(r,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,a=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*a,this.g=l[1]*t+l[4]*r+l[7]*a,this.b=l[2]*t+l[5]*r+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new St;St.NAMES=A0;let F_=0;class so extends ro{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:F_++}),this.uuid=Zo(),this.name="",this.blending=Ws,this.side=br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dd,this.blendDst=fd,this.blendEquation=Kr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new St(0,0,0),this.blendAlpha=0,this.depthFunc=Ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=As,this.stencilZFail=As,this.stencilZPass=As,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(r.blending=this.blending),this.side!==br&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==dd&&(r.blendSrc=this.blendSrc),this.blendDst!==fd&&(r.blendDst=this.blendDst),this.blendEquation!==Kr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Ks&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zp&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==As&&(r.stencilFail=this.stencilFail),this.stencilZFail!==As&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==As&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(l){const d=[];for(const u in l){const h=l[u];delete h.metadata,d.push(h)}return d}if(t){const l=a(e.textures),d=a(e.images);l.length>0&&(r.textures=l),d.length>0&&(r.images=d)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const a=t.length;r=new Array(a);for(let l=0;l!==a;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Bl extends so{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.combine=l0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const qt=new J,ml=new At;class pi{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=Jp,this.updateRanges=[],this.gpuType=ji,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=t.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)ml.fromBufferAttribute(this,t),ml.applyMatrix3(e),this.setXY(t,ml.x,ml.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=Bo(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Pn(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bo(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bo(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bo(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Pn(t,this.array),r=Pn(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,a){return e*=this.itemSize,this.normalized&&(t=Pn(t,this.array),r=Pn(r,this.array),a=Pn(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,t,r,a,l){return e*=this.itemSize,this.normalized&&(t=Pn(t,this.array),r=Pn(r,this.array),a=Pn(a,this.array),l=Pn(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jp&&(e.usage=this.usage),e}}class R0 extends pi{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class P0 extends pi{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class Vn extends pi{constructor(e,t,r){super(new Float32Array(e),t,r)}}let O_=0;const Zn=new Vt,Ku=new ln,Os=new J,zn=new Qo,jo=new Qo,rn=new J;class mi extends ro{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=Zo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(w0(e)?P0:R0)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new pt().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,t,r){return Zn.makeTranslation(e,t,r),this.applyMatrix4(Zn),this}scale(e,t,r){return Zn.makeScale(e,t,r),this.applyMatrix4(Zn),this}lookAt(e){return Ku.lookAt(e),Ku.updateMatrix(),this.applyMatrix4(Ku.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let a=0,l=e.length;a<l;a++){const d=e[a];r.push(d.x,d.y,d.z||0)}this.setAttribute("position",new Vn(r,3))}else{for(let r=0,a=t.count;r<a;r++){const l=e[r];t.setXYZ(r,l.x,l.y,l.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const l=t[r];zn.setFromBufferAttribute(l),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const r=this.boundingSphere.center;if(zn.setFromBufferAttribute(e),t)for(let l=0,d=t.length;l<d;l++){const u=t[l];jo.setFromBufferAttribute(u),this.morphTargetsRelative?(rn.addVectors(zn.min,jo.min),zn.expandByPoint(rn),rn.addVectors(zn.max,jo.max),zn.expandByPoint(rn)):(zn.expandByPoint(jo.min),zn.expandByPoint(jo.max))}zn.getCenter(r);let a=0;for(let l=0,d=e.count;l<d;l++)rn.fromBufferAttribute(e,l),a=Math.max(a,r.distanceToSquared(rn));if(t)for(let l=0,d=t.length;l<d;l++){const u=t[l],h=this.morphTargetsRelative;for(let p=0,x=u.count;p<x;p++)rn.fromBufferAttribute(u,p),h&&(Os.fromBufferAttribute(e,p),rn.add(Os)),a=Math.max(a,r.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,a=t.normal,l=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pi(new Float32Array(4*r.count),4));const d=this.getAttribute("tangent"),u=[],h=[];for(let W=0;W<r.count;W++)u[W]=new J,h[W]=new J;const p=new J,x=new J,y=new J,S=new At,M=new At,A=new At,C=new J,v=new J;function _(W,L,w){p.fromBufferAttribute(r,W),x.fromBufferAttribute(r,L),y.fromBufferAttribute(r,w),S.fromBufferAttribute(l,W),M.fromBufferAttribute(l,L),A.fromBufferAttribute(l,w),x.sub(p),y.sub(p),M.sub(S),A.sub(S);const z=1/(M.x*A.y-A.x*M.y);isFinite(z)&&(C.copy(x).multiplyScalar(A.y).addScaledVector(y,-M.y).multiplyScalar(z),v.copy(y).multiplyScalar(M.x).addScaledVector(x,-A.x).multiplyScalar(z),u[W].add(C),u[L].add(C),u[w].add(C),h[W].add(v),h[L].add(v),h[w].add(v))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let W=0,L=N.length;W<L;++W){const w=N[W],z=w.start,ie=w.count;for(let Q=z,de=z+ie;Q<de;Q+=3)_(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const U=new J,T=new J,Y=new J,O=new J;function I(W){Y.fromBufferAttribute(a,W),O.copy(Y);const L=u[W];U.copy(L),U.sub(Y.multiplyScalar(Y.dot(L))).normalize(),T.crossVectors(O,L);const z=T.dot(h[W])<0?-1:1;d.setXYZW(W,U.x,U.y,U.z,z)}for(let W=0,L=N.length;W<L;++W){const w=N[W],z=w.start,ie=w.count;for(let Q=z,de=z+ie;Q<de;Q+=3)I(e.getX(Q+0)),I(e.getX(Q+1)),I(e.getX(Q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new pi(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let S=0,M=r.count;S<M;S++)r.setXYZ(S,0,0,0);const a=new J,l=new J,d=new J,u=new J,h=new J,p=new J,x=new J,y=new J;if(e)for(let S=0,M=e.count;S<M;S+=3){const A=e.getX(S+0),C=e.getX(S+1),v=e.getX(S+2);a.fromBufferAttribute(t,A),l.fromBufferAttribute(t,C),d.fromBufferAttribute(t,v),x.subVectors(d,l),y.subVectors(a,l),x.cross(y),u.fromBufferAttribute(r,A),h.fromBufferAttribute(r,C),p.fromBufferAttribute(r,v),u.add(x),h.add(x),p.add(x),r.setXYZ(A,u.x,u.y,u.z),r.setXYZ(C,h.x,h.y,h.z),r.setXYZ(v,p.x,p.y,p.z)}else for(let S=0,M=t.count;S<M;S+=3)a.fromBufferAttribute(t,S+0),l.fromBufferAttribute(t,S+1),d.fromBufferAttribute(t,S+2),x.subVectors(d,l),y.subVectors(a,l),x.cross(y),r.setXYZ(S+0,x.x,x.y,x.z),r.setXYZ(S+1,x.x,x.y,x.z),r.setXYZ(S+2,x.x,x.y,x.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(u,h){const p=u.array,x=u.itemSize,y=u.normalized,S=new p.constructor(h.length*x);let M=0,A=0;for(let C=0,v=h.length;C<v;C++){u.isInterleavedBufferAttribute?M=h[C]*u.data.stride+u.offset:M=h[C]*x;for(let _=0;_<x;_++)S[A++]=p[M++]}return new pi(S,x,y)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mi,r=this.index.array,a=this.attributes;for(const u in a){const h=a[u],p=e(h,r);t.setAttribute(u,p)}const l=this.morphAttributes;for(const u in l){const h=[],p=l[u];for(let x=0,y=p.length;x<y;x++){const S=p[x],M=e(S,r);h.push(M)}t.morphAttributes[u]=h}t.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let u=0,h=d.length;u<h;u++){const p=d[u];t.addGroup(p.start,p.count,p.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const p in h)h[p]!==void 0&&(e[p]=h[p]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const h in r){const p=r[h];e.data.attributes[h]=p.toJSON(e.data)}const a={};let l=!1;for(const h in this.morphAttributes){const p=this.morphAttributes[h],x=[];for(let y=0,S=p.length;y<S;y++){const M=p[y];x.push(M.toJSON(e.data))}x.length>0&&(a[h]=x,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const a=e.attributes;for(const p in a){const x=a[p];this.setAttribute(p,x.clone(t))}const l=e.morphAttributes;for(const p in l){const x=[],y=l[p];for(let S=0,M=y.length;S<M;S++)x.push(y[S].clone(t));this.morphAttributes[p]=x}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let p=0,x=d.length;p<x;p++){const y=d[p];this.addGroup(y.start,y.count,y.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const mm=new Vt,jr=new b0,gl=new jl,gm=new J,xl=new J,vl=new J,_l=new J,Zu=new J,yl=new J,xm=new J,Sl=new J;class sn extends ln{constructor(e=new mi,t=new Bl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=a.length;l<d;l++){const u=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=l}}}}getVertexPosition(e,t){const r=this.geometry,a=r.attributes.position,l=r.morphAttributes.position,d=r.morphTargetsRelative;t.fromBufferAttribute(a,e);const u=this.morphTargetInfluences;if(l&&u){yl.set(0,0,0);for(let h=0,p=l.length;h<p;h++){const x=u[h],y=l[h];x!==0&&(Zu.fromBufferAttribute(y,e),d?yl.addScaledVector(Zu,x):yl.addScaledVector(Zu.sub(t),x))}t.add(yl)}return t}raycast(e,t){const r=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),gl.copy(r.boundingSphere),gl.applyMatrix4(l),jr.copy(e.ray).recast(e.near),!(gl.containsPoint(jr.origin)===!1&&(jr.intersectSphere(gl,gm)===null||jr.origin.distanceToSquared(gm)>(e.far-e.near)**2))&&(mm.copy(l).invert(),jr.copy(e.ray).applyMatrix4(mm),!(r.boundingBox!==null&&jr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,jr)))}_computeIntersections(e,t,r){let a;const l=this.geometry,d=this.material,u=l.index,h=l.attributes.position,p=l.attributes.uv,x=l.attributes.uv1,y=l.attributes.normal,S=l.groups,M=l.drawRange;if(u!==null)if(Array.isArray(d))for(let A=0,C=S.length;A<C;A++){const v=S[A],_=d[v.materialIndex],N=Math.max(v.start,M.start),U=Math.min(u.count,Math.min(v.start+v.count,M.start+M.count));for(let T=N,Y=U;T<Y;T+=3){const O=u.getX(T),I=u.getX(T+1),W=u.getX(T+2);a=Ml(this,_,e,r,p,x,y,O,I,W),a&&(a.faceIndex=Math.floor(T/3),a.face.materialIndex=v.materialIndex,t.push(a))}}else{const A=Math.max(0,M.start),C=Math.min(u.count,M.start+M.count);for(let v=A,_=C;v<_;v+=3){const N=u.getX(v),U=u.getX(v+1),T=u.getX(v+2);a=Ml(this,d,e,r,p,x,y,N,U,T),a&&(a.faceIndex=Math.floor(v/3),t.push(a))}}else if(h!==void 0)if(Array.isArray(d))for(let A=0,C=S.length;A<C;A++){const v=S[A],_=d[v.materialIndex],N=Math.max(v.start,M.start),U=Math.min(h.count,Math.min(v.start+v.count,M.start+M.count));for(let T=N,Y=U;T<Y;T+=3){const O=T,I=T+1,W=T+2;a=Ml(this,_,e,r,p,x,y,O,I,W),a&&(a.faceIndex=Math.floor(T/3),a.face.materialIndex=v.materialIndex,t.push(a))}}else{const A=Math.max(0,M.start),C=Math.min(h.count,M.start+M.count);for(let v=A,_=C;v<_;v+=3){const N=v,U=v+1,T=v+2;a=Ml(this,d,e,r,p,x,y,N,U,T),a&&(a.faceIndex=Math.floor(v/3),t.push(a))}}}}function z_(s,e,t,r,a,l,d,u){let h;if(e.side===Nn?h=r.intersectTriangle(d,l,a,!0,u):h=r.intersectTriangle(a,l,d,e.side===br,u),h===null)return null;Sl.copy(u),Sl.applyMatrix4(s.matrixWorld);const p=t.ray.origin.distanceTo(Sl);return p<t.near||p>t.far?null:{distance:p,point:Sl.clone(),object:s}}function Ml(s,e,t,r,a,l,d,u,h,p){s.getVertexPosition(u,xl),s.getVertexPosition(h,vl),s.getVertexPosition(p,_l);const x=z_(s,e,t,r,xl,vl,_l,xm);if(x){const y=new J;di.getBarycoord(xm,xl,vl,_l,y),a&&(x.uv=di.getInterpolatedAttribute(a,u,h,p,y,new At)),l&&(x.uv1=di.getInterpolatedAttribute(l,u,h,p,y,new At)),d&&(x.normal=di.getInterpolatedAttribute(d,u,h,p,y,new J),x.normal.dot(r.direction)>0&&x.normal.multiplyScalar(-1));const S={a:u,b:h,c:p,normal:new J,materialIndex:0};di.getNormal(xl,vl,_l,S.normal),x.face=S,x.barycoord=y}return x}class wi extends mi{constructor(e=1,t=1,r=1,a=1,l=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:a,heightSegments:l,depthSegments:d};const u=this;a=Math.floor(a),l=Math.floor(l),d=Math.floor(d);const h=[],p=[],x=[],y=[];let S=0,M=0;A("z","y","x",-1,-1,r,t,e,d,l,0),A("z","y","x",1,-1,r,t,-e,d,l,1),A("x","z","y",1,1,e,r,t,a,d,2),A("x","z","y",1,-1,e,r,-t,a,d,3),A("x","y","z",1,-1,e,t,r,a,l,4),A("x","y","z",-1,-1,e,t,-r,a,l,5),this.setIndex(h),this.setAttribute("position",new Vn(p,3)),this.setAttribute("normal",new Vn(x,3)),this.setAttribute("uv",new Vn(y,2));function A(C,v,_,N,U,T,Y,O,I,W,L){const w=T/I,z=Y/W,ie=T/2,Q=Y/2,de=O/2,pe=I+1,le=W+1;let he=0,G=0;const fe=new J;for(let D=0;D<le;D++){const E=D*z-Q;for(let H=0;H<pe;H++){const xe=H*w-ie;fe[C]=xe*N,fe[v]=E*U,fe[_]=de,p.push(fe.x,fe.y,fe.z),fe[C]=0,fe[v]=0,fe[_]=O>0?1:-1,x.push(fe.x,fe.y,fe.z),y.push(H/I),y.push(1-D/W),he+=1}}for(let D=0;D<W;D++)for(let E=0;E<I;E++){const H=S+E+pe*D,xe=S+E+pe*(D+1),X=S+(E+1)+pe*(D+1),ee=S+(E+1)+pe*D;h.push(H,xe,ee),h.push(xe,X,ee),G+=6}u.addGroup(M,G,L),M+=G,S+=he}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function to(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const a=s[t][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=a.clone():Array.isArray(a)?e[t][r]=a.slice():e[t][r]=a}}return e}function Sn(s){const e={};for(let t=0;t<s.length;t++){const r=to(s[t]);for(const a in r)e[a]=r[a]}return e}function B_(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function L0(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Tt.workingColorSpace}const V_={clone:to,merge:Sn};var G_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,H_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Cr extends so{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=G_,this.fragmentShader=H_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=to(e.uniforms),this.uniformsGroups=B_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const d=this.uniforms[a].value;d&&d.isTexture?t.uniforms[a]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?t.uniforms[a]={type:"c",value:d.getHex()}:d&&d.isVector2?t.uniforms[a]={type:"v2",value:d.toArray()}:d&&d.isVector3?t.uniforms[a]={type:"v3",value:d.toArray()}:d&&d.isVector4?t.uniforms[a]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?t.uniforms[a]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?t.uniforms[a]={type:"m4",value:d.toArray()}:t.uniforms[a]={value:d}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class N0 extends ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Vt,this.projectionMatrix=new Vt,this.projectionMatrixInverse=new Vt,this.coordinateSystem=Wi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Sr=new J,vm=new At,_m=new At;class Bn extends N0{constructor(e=50,t=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Kd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Lu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Kd*2*Math.atan(Math.tan(Lu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Sr.x,Sr.y).multiplyScalar(-e/Sr.z),Sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Sr.x,Sr.y).multiplyScalar(-e/Sr.z)}getViewSize(e,t){return this.getViewBounds(e,vm,_m),t.subVectors(_m,vm)}setViewOffset(e,t,r,a,l,d){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Lu*.5*this.fov)/this.zoom,r=2*t,a=this.aspect*r,l=-.5*a;const d=this.view;if(this.view!==null&&this.view.enabled){const h=d.fullWidth,p=d.fullHeight;l+=d.offsetX*a/h,t-=d.offsetY*r/p,a*=d.width/h,r*=d.height/p}const u=this.filmOffset;u!==0&&(l+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const zs=-90,Bs=1;class j_ extends ln{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Bn(zs,Bs,e,t);a.layers=this.layers,this.add(a);const l=new Bn(zs,Bs,e,t);l.layers=this.layers,this.add(l);const d=new Bn(zs,Bs,e,t);d.layers=this.layers,this.add(d);const u=new Bn(zs,Bs,e,t);u.layers=this.layers,this.add(u);const h=new Bn(zs,Bs,e,t);h.layers=this.layers,this.add(h);const p=new Bn(zs,Bs,e,t);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,a,l,d,u,h]=t;for(const p of t)this.remove(p);if(e===Wi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Ol)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of t)this.add(p),p.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,d,u,h,p,x]=this.children,y=e.getRenderTarget(),S=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),A=e.xr.enabled;e.xr.enabled=!1;const C=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(t,l),e.setRenderTarget(r,1,a),e.render(t,d),e.setRenderTarget(r,2,a),e.render(t,u),e.setRenderTarget(r,3,a),e.render(t,h),e.setRenderTarget(r,4,a),e.render(t,p),r.texture.generateMipmaps=C,e.setRenderTarget(r,5,a),e.render(t,x),e.setRenderTarget(y,S,M),e.xr.enabled=A,r.texture.needsPMREMUpdate=!0}}class D0 extends Dn{constructor(e,t,r,a,l,d,u,h,p,x){e=e!==void 0?e:[],t=t!==void 0?t:Zs,super(e,t,r,a,l,d,u,h,p,x),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class W_ extends ns{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new D0(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ei}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new wi(5,5,5),l=new Cr({name:"CubemapFromEquirect",uniforms:to(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Nn,blending:Er});l.uniforms.tEquirect.value=t;const d=new sn(a,l),u=t.minFilter;return t.minFilter===Qr&&(t.minFilter=Ei),new j_(1,10,this).update(e,d),t.minFilter=u,d.geometry.dispose(),d.material.dispose(),this}clear(e,t,r,a){const l=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(t,r,a);e.setRenderTarget(l)}}const Ju=new J,X_=new J,q_=new pt;class Yr{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,a){return this.normal.set(e,t,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const a=Ju.subVectors(r,t).cross(X_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(Ju),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:t.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||q_.getNormalMatrix(e),a=this.coplanarPoint(Ju).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wr=new jl,wl=new J;class df{constructor(e=new Yr,t=new Yr,r=new Yr,a=new Yr,l=new Yr,d=new Yr){this.planes=[e,t,r,a,l,d]}set(e,t,r,a,l,d){const u=this.planes;return u[0].copy(e),u[1].copy(t),u[2].copy(r),u[3].copy(a),u[4].copy(l),u[5].copy(d),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Wi){const r=this.planes,a=e.elements,l=a[0],d=a[1],u=a[2],h=a[3],p=a[4],x=a[5],y=a[6],S=a[7],M=a[8],A=a[9],C=a[10],v=a[11],_=a[12],N=a[13],U=a[14],T=a[15];if(r[0].setComponents(h-l,S-p,v-M,T-_).normalize(),r[1].setComponents(h+l,S+p,v+M,T+_).normalize(),r[2].setComponents(h+d,S+x,v+A,T+N).normalize(),r[3].setComponents(h-d,S-x,v-A,T-N).normalize(),r[4].setComponents(h-u,S-y,v-C,T-U).normalize(),t===Wi)r[5].setComponents(h+u,S+y,v+C,T+U).normalize();else if(t===Ol)r[5].setComponents(u,y,C,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wr)}intersectsSprite(e){return Wr.center.set(0,0,0),Wr.radius=.7071067811865476,Wr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wr)}intersectsSphere(e){const t=this.planes,r=e.center,a=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const a=t[r];if(wl.x=a.normal.x>0?e.max.x:e.min.x,wl.y=a.normal.y>0?e.max.y:e.min.y,wl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(wl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function k0(){let s=null,e=!1,t=null,r=null;function a(l,d){t(l,d),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function Y_(s){const e=new WeakMap;function t(u,h){const p=u.array,x=u.usage,y=p.byteLength,S=s.createBuffer();s.bindBuffer(h,S),s.bufferData(h,p,x),u.onUploadCallback();let M;if(p instanceof Float32Array)M=s.FLOAT;else if(p instanceof Uint16Array)u.isFloat16BufferAttribute?M=s.HALF_FLOAT:M=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=s.SHORT;else if(p instanceof Uint32Array)M=s.UNSIGNED_INT;else if(p instanceof Int32Array)M=s.INT;else if(p instanceof Int8Array)M=s.BYTE;else if(p instanceof Uint8Array)M=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:S,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:u.version,size:y}}function r(u,h,p){const x=h.array,y=h.updateRanges;if(s.bindBuffer(p,u),y.length===0)s.bufferSubData(p,0,x);else{y.sort((M,A)=>M.start-A.start);let S=0;for(let M=1;M<y.length;M++){const A=y[S],C=y[M];C.start<=A.start+A.count+1?A.count=Math.max(A.count,C.start+C.count-A.start):(++S,y[S]=C)}y.length=S+1;for(let M=0,A=y.length;M<A;M++){const C=y[M];s.bufferSubData(p,C.start*x.BYTES_PER_ELEMENT,x,C.start,C.count)}h.clearUpdateRanges()}h.onUploadCallback()}function a(u){return u.isInterleavedBufferAttribute&&(u=u.data),e.get(u)}function l(u){u.isInterleavedBufferAttribute&&(u=u.data);const h=e.get(u);h&&(s.deleteBuffer(h.buffer),e.delete(u))}function d(u,h){if(u.isInterleavedBufferAttribute&&(u=u.data),u.isGLBufferAttribute){const x=e.get(u);(!x||x.version<u.version)&&e.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}const p=e.get(u);if(p===void 0)e.set(u,t(u,h));else if(p.version<u.version){if(p.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,u,h),p.version=u.version}}return{get:a,remove:l,update:d}}class Wl extends mi{constructor(e=1,t=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:a};const l=e/2,d=t/2,u=Math.floor(r),h=Math.floor(a),p=u+1,x=h+1,y=e/u,S=t/h,M=[],A=[],C=[],v=[];for(let _=0;_<x;_++){const N=_*S-d;for(let U=0;U<p;U++){const T=U*y-l;A.push(T,-N,0),C.push(0,0,1),v.push(U/u),v.push(1-_/h)}}for(let _=0;_<h;_++)for(let N=0;N<u;N++){const U=N+p*_,T=N+p*(_+1),Y=N+1+p*(_+1),O=N+1+p*_;M.push(U,T,O),M.push(T,Y,O)}this.setIndex(M),this.setAttribute("position",new Vn(A,3)),this.setAttribute("normal",new Vn(C,3)),this.setAttribute("uv",new Vn(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wl(e.width,e.height,e.widthSegments,e.heightSegments)}}var $_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,K_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Z_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,J_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Q_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ey=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ty=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ny=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,iy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ry=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,oy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ay=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ly=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,cy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,uy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,py=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,my=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xy=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,vy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_y=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,My=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ey=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ty="gl_FragColor = linearToOutputTexel( gl_FragColor );",by=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ay=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ry=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Py=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ly=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ny=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ky=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Iy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Uy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Fy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Oy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,By=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Vy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qy=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$y=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ky=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,t1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,n1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,i1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,r1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,s1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,o1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,a1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,l1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,c1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,d1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,f1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,h1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,p1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,m1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,x1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,v1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,y1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,S1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,M1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,w1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,E1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,T1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,b1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,C1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,A1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,R1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,P1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,L1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,N1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,D1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,k1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,I1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,U1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,F1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,O1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,z1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,B1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,V1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,G1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,H1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,j1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,W1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,X1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,q1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Y1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,K1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Z1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Q1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,iS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,rS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,aS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_S=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ES=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,bS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gt={alphahash_fragment:$_,alphahash_pars_fragment:K_,alphamap_fragment:Z_,alphamap_pars_fragment:J_,alphatest_fragment:Q_,alphatest_pars_fragment:ey,aomap_fragment:ty,aomap_pars_fragment:ny,batching_pars_vertex:iy,batching_vertex:ry,begin_vertex:sy,beginnormal_vertex:oy,bsdfs:ay,iridescence_fragment:ly,bumpmap_pars_fragment:cy,clipping_planes_fragment:uy,clipping_planes_pars_fragment:dy,clipping_planes_pars_vertex:fy,clipping_planes_vertex:hy,color_fragment:py,color_pars_fragment:my,color_pars_vertex:gy,color_vertex:xy,common:vy,cube_uv_reflection_fragment:_y,defaultnormal_vertex:yy,displacementmap_pars_vertex:Sy,displacementmap_vertex:My,emissivemap_fragment:wy,emissivemap_pars_fragment:Ey,colorspace_fragment:Ty,colorspace_pars_fragment:by,envmap_fragment:Cy,envmap_common_pars_fragment:Ay,envmap_pars_fragment:Ry,envmap_pars_vertex:Py,envmap_physical_pars_fragment:Vy,envmap_vertex:Ly,fog_vertex:Ny,fog_pars_vertex:Dy,fog_fragment:ky,fog_pars_fragment:Iy,gradientmap_pars_fragment:Uy,lightmap_pars_fragment:Fy,lights_lambert_fragment:Oy,lights_lambert_pars_fragment:zy,lights_pars_begin:By,lights_toon_fragment:Gy,lights_toon_pars_fragment:Hy,lights_phong_fragment:jy,lights_phong_pars_fragment:Wy,lights_physical_fragment:Xy,lights_physical_pars_fragment:qy,lights_fragment_begin:Yy,lights_fragment_maps:$y,lights_fragment_end:Ky,logdepthbuf_fragment:Zy,logdepthbuf_pars_fragment:Jy,logdepthbuf_pars_vertex:Qy,logdepthbuf_vertex:e1,map_fragment:t1,map_pars_fragment:n1,map_particle_fragment:i1,map_particle_pars_fragment:r1,metalnessmap_fragment:s1,metalnessmap_pars_fragment:o1,morphinstance_vertex:a1,morphcolor_vertex:l1,morphnormal_vertex:c1,morphtarget_pars_vertex:u1,morphtarget_vertex:d1,normal_fragment_begin:f1,normal_fragment_maps:h1,normal_pars_fragment:p1,normal_pars_vertex:m1,normal_vertex:g1,normalmap_pars_fragment:x1,clearcoat_normal_fragment_begin:v1,clearcoat_normal_fragment_maps:_1,clearcoat_pars_fragment:y1,iridescence_pars_fragment:S1,opaque_fragment:M1,packing:w1,premultiplied_alpha_fragment:E1,project_vertex:T1,dithering_fragment:b1,dithering_pars_fragment:C1,roughnessmap_fragment:A1,roughnessmap_pars_fragment:R1,shadowmap_pars_fragment:P1,shadowmap_pars_vertex:L1,shadowmap_vertex:N1,shadowmask_pars_fragment:D1,skinbase_vertex:k1,skinning_pars_vertex:I1,skinning_vertex:U1,skinnormal_vertex:F1,specularmap_fragment:O1,specularmap_pars_fragment:z1,tonemapping_fragment:B1,tonemapping_pars_fragment:V1,transmission_fragment:G1,transmission_pars_fragment:H1,uv_pars_fragment:j1,uv_pars_vertex:W1,uv_vertex:X1,worldpos_vertex:q1,background_vert:Y1,background_frag:$1,backgroundCube_vert:K1,backgroundCube_frag:Z1,cube_vert:J1,cube_frag:Q1,depth_vert:eS,depth_frag:tS,distanceRGBA_vert:nS,distanceRGBA_frag:iS,equirect_vert:rS,equirect_frag:sS,linedashed_vert:oS,linedashed_frag:aS,meshbasic_vert:lS,meshbasic_frag:cS,meshlambert_vert:uS,meshlambert_frag:dS,meshmatcap_vert:fS,meshmatcap_frag:hS,meshnormal_vert:pS,meshnormal_frag:mS,meshphong_vert:gS,meshphong_frag:xS,meshphysical_vert:vS,meshphysical_frag:_S,meshtoon_vert:yS,meshtoon_frag:SS,points_vert:MS,points_frag:wS,shadow_vert:ES,shadow_frag:TS,sprite_vert:bS,sprite_frag:CS},De={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},Mi={basic:{uniforms:Sn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:gt.meshbasic_vert,fragmentShader:gt.meshbasic_frag},lambert:{uniforms:Sn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new St(0)}}]),vertexShader:gt.meshlambert_vert,fragmentShader:gt.meshlambert_frag},phong:{uniforms:Sn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30}}]),vertexShader:gt.meshphong_vert,fragmentShader:gt.meshphong_frag},standard:{uniforms:Sn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag},toon:{uniforms:Sn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new St(0)}}]),vertexShader:gt.meshtoon_vert,fragmentShader:gt.meshtoon_frag},matcap:{uniforms:Sn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:gt.meshmatcap_vert,fragmentShader:gt.meshmatcap_frag},points:{uniforms:Sn([De.points,De.fog]),vertexShader:gt.points_vert,fragmentShader:gt.points_frag},dashed:{uniforms:Sn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:gt.linedashed_vert,fragmentShader:gt.linedashed_frag},depth:{uniforms:Sn([De.common,De.displacementmap]),vertexShader:gt.depth_vert,fragmentShader:gt.depth_frag},normal:{uniforms:Sn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:gt.meshnormal_vert,fragmentShader:gt.meshnormal_frag},sprite:{uniforms:Sn([De.sprite,De.fog]),vertexShader:gt.sprite_vert,fragmentShader:gt.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:gt.background_vert,fragmentShader:gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:gt.backgroundCube_vert,fragmentShader:gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:gt.cube_vert,fragmentShader:gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:gt.equirect_vert,fragmentShader:gt.equirect_frag},distanceRGBA:{uniforms:Sn([De.common,De.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:gt.distanceRGBA_vert,fragmentShader:gt.distanceRGBA_frag},shadow:{uniforms:Sn([De.lights,De.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:gt.shadow_vert,fragmentShader:gt.shadow_frag}};Mi.physical={uniforms:Sn([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag};const El={r:0,b:0,g:0},Xr=new Ti,AS=new Vt;function RS(s,e,t,r,a,l,d){const u=new St(0);let h=l===!0?0:1,p,x,y=null,S=0,M=null;function A(N){let U=N.isScene===!0?N.background:null;return U&&U.isTexture&&(U=(N.backgroundBlurriness>0?t:e).get(U)),U}function C(N){let U=!1;const T=A(N);T===null?_(u,h):T&&T.isColor&&(_(T,1),U=!0);const Y=s.xr.getEnvironmentBlendMode();Y==="additive"?r.buffers.color.setClear(0,0,0,1,d):Y==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,d),(s.autoClear||U)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function v(N,U){const T=A(U);T&&(T.isCubeTexture||T.mapping===Gl)?(x===void 0&&(x=new sn(new wi(1,1,1),new Cr({name:"BackgroundCubeMaterial",uniforms:to(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),x.geometry.deleteAttribute("normal"),x.geometry.deleteAttribute("uv"),x.onBeforeRender=function(Y,O,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(x.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(x)),Xr.copy(U.backgroundRotation),Xr.x*=-1,Xr.y*=-1,Xr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Xr.y*=-1,Xr.z*=-1),x.material.uniforms.envMap.value=T,x.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,x.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,x.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,x.material.uniforms.backgroundRotation.value.setFromMatrix4(AS.makeRotationFromEuler(Xr)),x.material.toneMapped=Tt.getTransfer(T.colorSpace)!==Nt,(y!==T||S!==T.version||M!==s.toneMapping)&&(x.material.needsUpdate=!0,y=T,S=T.version,M=s.toneMapping),x.layers.enableAll(),N.unshift(x,x.geometry,x.material,0,0,null)):T&&T.isTexture&&(p===void 0&&(p=new sn(new Wl(2,2),new Cr({name:"BackgroundMaterial",uniforms:to(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:br,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(p)),p.material.uniforms.t2D.value=T,p.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,p.material.toneMapped=Tt.getTransfer(T.colorSpace)!==Nt,T.matrixAutoUpdate===!0&&T.updateMatrix(),p.material.uniforms.uvTransform.value.copy(T.matrix),(y!==T||S!==T.version||M!==s.toneMapping)&&(p.material.needsUpdate=!0,y=T,S=T.version,M=s.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null))}function _(N,U){N.getRGB(El,L0(s)),r.buffers.color.setClear(El.r,El.g,El.b,U,d)}return{getClearColor:function(){return u},setClearColor:function(N,U=1){u.set(N),h=U,_(u,h)},getClearAlpha:function(){return h},setClearAlpha:function(N){h=N,_(u,h)},render:C,addToRenderList:v}}function PS(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=S(null);let l=a,d=!1;function u(w,z,ie,Q,de){let pe=!1;const le=y(Q,ie,z);l!==le&&(l=le,p(l.object)),pe=M(w,Q,ie,de),pe&&A(w,Q,ie,de),de!==null&&e.update(de,s.ELEMENT_ARRAY_BUFFER),(pe||d)&&(d=!1,T(w,z,ie,Q),de!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(de).buffer))}function h(){return s.createVertexArray()}function p(w){return s.bindVertexArray(w)}function x(w){return s.deleteVertexArray(w)}function y(w,z,ie){const Q=ie.wireframe===!0;let de=r[w.id];de===void 0&&(de={},r[w.id]=de);let pe=de[z.id];pe===void 0&&(pe={},de[z.id]=pe);let le=pe[Q];return le===void 0&&(le=S(h()),pe[Q]=le),le}function S(w){const z=[],ie=[],Q=[];for(let de=0;de<t;de++)z[de]=0,ie[de]=0,Q[de]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:ie,attributeDivisors:Q,object:w,attributes:{},index:null}}function M(w,z,ie,Q){const de=l.attributes,pe=z.attributes;let le=0;const he=ie.getAttributes();for(const G in he)if(he[G].location>=0){const D=de[G];let E=pe[G];if(E===void 0&&(G==="instanceMatrix"&&w.instanceMatrix&&(E=w.instanceMatrix),G==="instanceColor"&&w.instanceColor&&(E=w.instanceColor)),D===void 0||D.attribute!==E||E&&D.data!==E.data)return!0;le++}return l.attributesNum!==le||l.index!==Q}function A(w,z,ie,Q){const de={},pe=z.attributes;let le=0;const he=ie.getAttributes();for(const G in he)if(he[G].location>=0){let D=pe[G];D===void 0&&(G==="instanceMatrix"&&w.instanceMatrix&&(D=w.instanceMatrix),G==="instanceColor"&&w.instanceColor&&(D=w.instanceColor));const E={};E.attribute=D,D&&D.data&&(E.data=D.data),de[G]=E,le++}l.attributes=de,l.attributesNum=le,l.index=Q}function C(){const w=l.newAttributes;for(let z=0,ie=w.length;z<ie;z++)w[z]=0}function v(w){_(w,0)}function _(w,z){const ie=l.newAttributes,Q=l.enabledAttributes,de=l.attributeDivisors;ie[w]=1,Q[w]===0&&(s.enableVertexAttribArray(w),Q[w]=1),de[w]!==z&&(s.vertexAttribDivisor(w,z),de[w]=z)}function N(){const w=l.newAttributes,z=l.enabledAttributes;for(let ie=0,Q=z.length;ie<Q;ie++)z[ie]!==w[ie]&&(s.disableVertexAttribArray(ie),z[ie]=0)}function U(w,z,ie,Q,de,pe,le){le===!0?s.vertexAttribIPointer(w,z,ie,de,pe):s.vertexAttribPointer(w,z,ie,Q,de,pe)}function T(w,z,ie,Q){C();const de=Q.attributes,pe=ie.getAttributes(),le=z.defaultAttributeValues;for(const he in pe){const G=pe[he];if(G.location>=0){let fe=de[he];if(fe===void 0&&(he==="instanceMatrix"&&w.instanceMatrix&&(fe=w.instanceMatrix),he==="instanceColor"&&w.instanceColor&&(fe=w.instanceColor)),fe!==void 0){const D=fe.normalized,E=fe.itemSize,H=e.get(fe);if(H===void 0)continue;const xe=H.buffer,X=H.type,ee=H.bytesPerElement,ue=X===s.INT||X===s.UNSIGNED_INT||fe.gpuType===sf;if(fe.isInterleavedBufferAttribute){const re=fe.data,me=re.stride,we=fe.offset;if(re.isInstancedInterleavedBuffer){for(let Pe=0;Pe<G.locationSize;Pe++)_(G.location+Pe,re.meshPerAttribute);w.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Pe=0;Pe<G.locationSize;Pe++)v(G.location+Pe);s.bindBuffer(s.ARRAY_BUFFER,xe);for(let Pe=0;Pe<G.locationSize;Pe++)U(G.location+Pe,E/G.locationSize,X,D,me*ee,(we+E/G.locationSize*Pe)*ee,ue)}else{if(fe.isInstancedBufferAttribute){for(let re=0;re<G.locationSize;re++)_(G.location+re,fe.meshPerAttribute);w.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let re=0;re<G.locationSize;re++)v(G.location+re);s.bindBuffer(s.ARRAY_BUFFER,xe);for(let re=0;re<G.locationSize;re++)U(G.location+re,E/G.locationSize,X,D,E*ee,E/G.locationSize*re*ee,ue)}}else if(le!==void 0){const D=le[he];if(D!==void 0)switch(D.length){case 2:s.vertexAttrib2fv(G.location,D);break;case 3:s.vertexAttrib3fv(G.location,D);break;case 4:s.vertexAttrib4fv(G.location,D);break;default:s.vertexAttrib1fv(G.location,D)}}}}N()}function Y(){W();for(const w in r){const z=r[w];for(const ie in z){const Q=z[ie];for(const de in Q)x(Q[de].object),delete Q[de];delete z[ie]}delete r[w]}}function O(w){if(r[w.id]===void 0)return;const z=r[w.id];for(const ie in z){const Q=z[ie];for(const de in Q)x(Q[de].object),delete Q[de];delete z[ie]}delete r[w.id]}function I(w){for(const z in r){const ie=r[z];if(ie[w.id]===void 0)continue;const Q=ie[w.id];for(const de in Q)x(Q[de].object),delete Q[de];delete ie[w.id]}}function W(){L(),d=!0,l!==a&&(l=a,p(l.object))}function L(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:u,reset:W,resetDefaultState:L,dispose:Y,releaseStatesOfGeometry:O,releaseStatesOfProgram:I,initAttributes:C,enableAttribute:v,disableUnusedAttributes:N}}function LS(s,e,t){let r;function a(p){r=p}function l(p,x){s.drawArrays(r,p,x),t.update(x,r,1)}function d(p,x,y){y!==0&&(s.drawArraysInstanced(r,p,x,y),t.update(x,r,y))}function u(p,x,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,x,0,y);let M=0;for(let A=0;A<y;A++)M+=x[A];t.update(M,r,1)}function h(p,x,y,S){if(y===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let A=0;A<p.length;A++)d(p[A],x[A],S[A]);else{M.multiDrawArraysInstancedWEBGL(r,p,0,x,0,S,0,y);let A=0;for(let C=0;C<y;C++)A+=x[C]*S[C];t.update(A,r,1)}}this.setMode=a,this.render=l,this.renderInstances=d,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function NS(s,e,t,r){let a;function l(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function d(I){return!(I!==fi&&r.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function u(I){const W=I===Ko&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Yi&&r.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==ji&&!W)}function h(I){if(I==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=t.precision!==void 0?t.precision:"highp";const x=h(p);x!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",x,"instead."),p=x);const y=t.logarithmicDepthBuffer===!0,S=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),M=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=s.getParameter(s.MAX_TEXTURE_SIZE),v=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),N=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),U=s.getParameter(s.MAX_VARYING_VECTORS),T=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),Y=A>0,O=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:d,textureTypeReadable:u,precision:p,logarithmicDepthBuffer:y,reverseDepthBuffer:S,maxTextures:M,maxVertexTextures:A,maxTextureSize:C,maxCubemapSize:v,maxAttributes:_,maxVertexUniforms:N,maxVaryings:U,maxFragmentUniforms:T,vertexTextures:Y,maxSamples:O}}function DS(s){const e=this;let t=null,r=0,a=!1,l=!1;const d=new Yr,u=new pt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(y,S){const M=y.length!==0||S||r!==0||a;return a=S,r=y.length,M},this.beginShadows=function(){l=!0,x(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(y,S){t=x(y,S,0)},this.setState=function(y,S,M){const A=y.clippingPlanes,C=y.clipIntersection,v=y.clipShadows,_=s.get(y);if(!a||A===null||A.length===0||l&&!v)l?x(null):p();else{const N=l?0:r,U=N*4;let T=_.clippingState||null;h.value=T,T=x(A,S,U,M);for(let Y=0;Y!==U;++Y)T[Y]=t[Y];_.clippingState=T,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=N}};function p(){h.value!==t&&(h.value=t,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function x(y,S,M,A){const C=y!==null?y.length:0;let v=null;if(C!==0){if(v=h.value,A!==!0||v===null){const _=M+C*4,N=S.matrixWorldInverse;u.getNormalMatrix(N),(v===null||v.length<_)&&(v=new Float32Array(_));for(let U=0,T=M;U!==C;++U,T+=4)d.copy(y[U]).applyMatrix4(N,u),d.normal.toArray(v,T),v[T+3]=d.constant}h.value=v,h.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,v}}function kS(s){let e=new WeakMap;function t(d,u){return u===yd?d.mapping=Zs:u===Sd&&(d.mapping=Js),d}function r(d){if(d&&d.isTexture){const u=d.mapping;if(u===yd||u===Sd)if(e.has(d)){const h=e.get(d).texture;return t(h,d.mapping)}else{const h=d.image;if(h&&h.height>0){const p=new W_(h.height);return p.fromEquirectangularTexture(s,d),e.set(d,p),d.addEventListener("dispose",a),t(p.texture,d.mapping)}else return null}}return d}function a(d){const u=d.target;u.removeEventListener("dispose",a);const h=e.get(u);h!==void 0&&(e.delete(u),h.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}class I0 extends N0{constructor(e=-1,t=1,r=1,a=-1,l=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=a,this.near=l,this.far=d,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,a,l,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=r-e,d=r+e,u=a+t,h=a-t;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,x=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=p*this.view.offsetX,d=l+p*this.view.width,u-=x*this.view.offsetY,h=u-x*this.view.height}this.projectionMatrix.makeOrthographic(l,d,u,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Hs=4,ym=[.125,.215,.35,.446,.526,.582],Zr=20,Qu=new I0,Sm=new St;let ed=null,td=0,nd=0,id=!1;const $r=(1+Math.sqrt(5))/2,Vs=1/$r,Mm=[new J(-$r,Vs,0),new J($r,Vs,0),new J(-Vs,0,$r),new J(Vs,0,$r),new J(0,$r,-Vs),new J(0,$r,Vs),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)];class wm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,a=100){ed=this._renderer.getRenderTarget(),td=this._renderer.getActiveCubeFace(),nd=this._renderer.getActiveMipmapLevel(),id=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,a,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ed,td,nd),this._renderer.xr.enabled=id,e.scissorTest=!1,Tl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Zs||e.mapping===Js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ed=this._renderer.getRenderTarget(),td=this._renderer.getActiveCubeFace(),nd=this._renderer.getActiveMipmapLevel(),id=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Ei,minFilter:Ei,generateMipmaps:!1,type:Ko,format:fi,colorSpace:io,depthBuffer:!1},a=Em(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Em(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=IS(l)),this._blurMaterial=US(l,e,t)}return a}_compileMaterial(e){const t=new sn(this._lodPlanes[0],e);this._renderer.compile(t,Qu)}_sceneToCubeUV(e,t,r,a){const u=new Bn(90,1,t,r),h=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],x=this._renderer,y=x.autoClear,S=x.toneMapping;x.getClearColor(Sm),x.toneMapping=Tr,x.autoClear=!1;const M=new Bl({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1}),A=new sn(new wi,M);let C=!1;const v=e.background;v?v.isColor&&(M.color.copy(v),e.background=null,C=!0):(M.color.copy(Sm),C=!0);for(let _=0;_<6;_++){const N=_%3;N===0?(u.up.set(0,h[_],0),u.lookAt(p[_],0,0)):N===1?(u.up.set(0,0,h[_]),u.lookAt(0,p[_],0)):(u.up.set(0,h[_],0),u.lookAt(0,0,p[_]));const U=this._cubeSize;Tl(a,N*U,_>2?U:0,U,U),x.setRenderTarget(a),C&&x.render(A,u),x.render(e,u)}A.geometry.dispose(),A.material.dispose(),x.toneMapping=S,x.autoClear=y,e.background=v}_textureToCubeUV(e,t){const r=this._renderer,a=e.mapping===Zs||e.mapping===Js;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=bm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tm());const l=a?this._cubemapMaterial:this._equirectMaterial,d=new sn(this._lodPlanes[0],l),u=l.uniforms;u.envMap.value=e;const h=this._cubeSize;Tl(t,0,0,3*h,2*h),r.setRenderTarget(t),r.render(d,Qu)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let l=1;l<a;l++){const d=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),u=Mm[(a-l-1)%Mm.length];this._blur(e,l-1,l,d,u)}t.autoClear=r}_blur(e,t,r,a,l){const d=this._pingPongRenderTarget;this._halfBlur(e,d,t,r,a,"latitudinal",l),this._halfBlur(d,e,r,r,a,"longitudinal",l)}_halfBlur(e,t,r,a,l,d,u){const h=this._renderer,p=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const x=3,y=new sn(this._lodPlanes[a],p),S=p.uniforms,M=this._sizeLods[r]-1,A=isFinite(l)?Math.PI/(2*M):2*Math.PI/(2*Zr-1),C=l/A,v=isFinite(l)?1+Math.floor(x*C):Zr;v>Zr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${Zr}`);const _=[];let N=0;for(let I=0;I<Zr;++I){const W=I/C,L=Math.exp(-W*W/2);_.push(L),I===0?N+=L:I<v&&(N+=2*L)}for(let I=0;I<_.length;I++)_[I]=_[I]/N;S.envMap.value=e.texture,S.samples.value=v,S.weights.value=_,S.latitudinal.value=d==="latitudinal",u&&(S.poleAxis.value=u);const{_lodMax:U}=this;S.dTheta.value=A,S.mipInt.value=U-r;const T=this._sizeLods[a],Y=3*T*(a>U-Hs?a-U+Hs:0),O=4*(this._cubeSize-T);Tl(t,Y,O,3*T,2*T),h.setRenderTarget(t),h.render(y,Qu)}}function IS(s){const e=[],t=[],r=[];let a=s;const l=s-Hs+1+ym.length;for(let d=0;d<l;d++){const u=Math.pow(2,a);t.push(u);let h=1/u;d>s-Hs?h=ym[d-s+Hs-1]:d===0&&(h=0),r.push(h);const p=1/(u-2),x=-p,y=1+p,S=[x,x,y,x,y,y,x,x,y,y,x,y],M=6,A=6,C=3,v=2,_=1,N=new Float32Array(C*A*M),U=new Float32Array(v*A*M),T=new Float32Array(_*A*M);for(let O=0;O<M;O++){const I=O%3*2/3-1,W=O>2?0:-1,L=[I,W,0,I+2/3,W,0,I+2/3,W+1,0,I,W,0,I+2/3,W+1,0,I,W+1,0];N.set(L,C*A*O),U.set(S,v*A*O);const w=[O,O,O,O,O,O];T.set(w,_*A*O)}const Y=new mi;Y.setAttribute("position",new pi(N,C)),Y.setAttribute("uv",new pi(U,v)),Y.setAttribute("faceIndex",new pi(T,_)),e.push(Y),a>Hs&&a--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function Em(s,e,t){const r=new ns(s,e,t);return r.texture.mapping=Gl,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Tl(s,e,t,r,a){s.viewport.set(e,t,r,a),s.scissor.set(e,t,r,a)}function US(s,e,t){const r=new Float32Array(Zr),a=new J(0,1,0);return new Cr({name:"SphericalGaussianBlur",defines:{n:Zr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:ff(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function Tm(){return new Cr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ff(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function bm(){return new Cr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ff(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function ff(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function FS(s){let e=new WeakMap,t=null;function r(u){if(u&&u.isTexture){const h=u.mapping,p=h===yd||h===Sd,x=h===Zs||h===Js;if(p||x){let y=e.get(u);const S=y!==void 0?y.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==S)return t===null&&(t=new wm(s)),y=p?t.fromEquirectangular(u,y):t.fromCubemap(u,y),y.texture.pmremVersion=u.pmremVersion,e.set(u,y),y.texture;if(y!==void 0)return y.texture;{const M=u.image;return p&&M&&M.height>0||x&&M&&a(M)?(t===null&&(t=new wm(s)),y=p?t.fromEquirectangular(u):t.fromCubemap(u),y.texture.pmremVersion=u.pmremVersion,e.set(u,y),u.addEventListener("dispose",l),y.texture):null}}}return u}function a(u){let h=0;const p=6;for(let x=0;x<p;x++)u[x]!==void 0&&h++;return h===p}function l(u){const h=u.target;h.removeEventListener("dispose",l);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function d(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:d}}function OS(s){const e={};function t(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const a=t(r);return a===null&&Xo("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function zS(s,e,t,r){const a={},l=new WeakMap;function d(y){const S=y.target;S.index!==null&&e.remove(S.index);for(const A in S.attributes)e.remove(S.attributes[A]);for(const A in S.morphAttributes){const C=S.morphAttributes[A];for(let v=0,_=C.length;v<_;v++)e.remove(C[v])}S.removeEventListener("dispose",d),delete a[S.id];const M=l.get(S);M&&(e.remove(M),l.delete(S)),r.releaseStatesOfGeometry(S),S.isInstancedBufferGeometry===!0&&delete S._maxInstanceCount,t.memory.geometries--}function u(y,S){return a[S.id]===!0||(S.addEventListener("dispose",d),a[S.id]=!0,t.memory.geometries++),S}function h(y){const S=y.attributes;for(const A in S)e.update(S[A],s.ARRAY_BUFFER);const M=y.morphAttributes;for(const A in M){const C=M[A];for(let v=0,_=C.length;v<_;v++)e.update(C[v],s.ARRAY_BUFFER)}}function p(y){const S=[],M=y.index,A=y.attributes.position;let C=0;if(M!==null){const N=M.array;C=M.version;for(let U=0,T=N.length;U<T;U+=3){const Y=N[U+0],O=N[U+1],I=N[U+2];S.push(Y,O,O,I,I,Y)}}else if(A!==void 0){const N=A.array;C=A.version;for(let U=0,T=N.length/3-1;U<T;U+=3){const Y=U+0,O=U+1,I=U+2;S.push(Y,O,O,I,I,Y)}}else return;const v=new(w0(S)?P0:R0)(S,1);v.version=C;const _=l.get(y);_&&e.remove(_),l.set(y,v)}function x(y){const S=l.get(y);if(S){const M=y.index;M!==null&&S.version<M.version&&p(y)}else p(y);return l.get(y)}return{get:u,update:h,getWireframeAttribute:x}}function BS(s,e,t){let r;function a(S){r=S}let l,d;function u(S){l=S.type,d=S.bytesPerElement}function h(S,M){s.drawElements(r,M,l,S*d),t.update(M,r,1)}function p(S,M,A){A!==0&&(s.drawElementsInstanced(r,M,l,S*d,A),t.update(M,r,A))}function x(S,M,A){if(A===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,M,0,l,S,0,A);let v=0;for(let _=0;_<A;_++)v+=M[_];t.update(v,r,1)}function y(S,M,A,C){if(A===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let _=0;_<S.length;_++)p(S[_]/d,M[_],C[_]);else{v.multiDrawElementsInstancedWEBGL(r,M,0,l,S,0,C,0,A);let _=0;for(let N=0;N<A;N++)_+=M[N]*C[N];t.update(_,r,1)}}this.setMode=a,this.setIndex=u,this.render=h,this.renderInstances=p,this.renderMultiDraw=x,this.renderMultiDrawInstances=y}function VS(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,d,u){switch(t.calls++,d){case s.TRIANGLES:t.triangles+=u*(l/3);break;case s.LINES:t.lines+=u*(l/2);break;case s.LINE_STRIP:t.lines+=u*(l-1);break;case s.LINE_LOOP:t.lines+=u*l;break;case s.POINTS:t.points+=u*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:r}}function GS(s,e,t){const r=new WeakMap,a=new Dt;function l(d,u,h){const p=d.morphTargetInfluences,x=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,y=x!==void 0?x.length:0;let S=r.get(u);if(S===void 0||S.count!==y){let w=function(){W.dispose(),r.delete(u),u.removeEventListener("dispose",w)};var M=w;S!==void 0&&S.texture.dispose();const A=u.morphAttributes.position!==void 0,C=u.morphAttributes.normal!==void 0,v=u.morphAttributes.color!==void 0,_=u.morphAttributes.position||[],N=u.morphAttributes.normal||[],U=u.morphAttributes.color||[];let T=0;A===!0&&(T=1),C===!0&&(T=2),v===!0&&(T=3);let Y=u.attributes.position.count*T,O=1;Y>e.maxTextureSize&&(O=Math.ceil(Y/e.maxTextureSize),Y=e.maxTextureSize);const I=new Float32Array(Y*O*4*y),W=new T0(I,Y,O,y);W.type=ji,W.needsUpdate=!0;const L=T*4;for(let z=0;z<y;z++){const ie=_[z],Q=N[z],de=U[z],pe=Y*O*4*z;for(let le=0;le<ie.count;le++){const he=le*L;A===!0&&(a.fromBufferAttribute(ie,le),I[pe+he+0]=a.x,I[pe+he+1]=a.y,I[pe+he+2]=a.z,I[pe+he+3]=0),C===!0&&(a.fromBufferAttribute(Q,le),I[pe+he+4]=a.x,I[pe+he+5]=a.y,I[pe+he+6]=a.z,I[pe+he+7]=0),v===!0&&(a.fromBufferAttribute(de,le),I[pe+he+8]=a.x,I[pe+he+9]=a.y,I[pe+he+10]=a.z,I[pe+he+11]=de.itemSize===4?a.w:1)}}S={count:y,texture:W,size:new At(Y,O)},r.set(u,S),u.addEventListener("dispose",w)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",d.morphTexture,t);else{let A=0;for(let v=0;v<p.length;v++)A+=p[v];const C=u.morphTargetsRelative?1:1-A;h.getUniforms().setValue(s,"morphTargetBaseInfluence",C),h.getUniforms().setValue(s,"morphTargetInfluences",p)}h.getUniforms().setValue(s,"morphTargetsTexture",S.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",S.size)}return{update:l}}function HS(s,e,t,r){let a=new WeakMap;function l(h){const p=r.render.frame,x=h.geometry,y=e.get(h,x);if(a.get(y)!==p&&(e.update(y),a.set(y,p)),h.isInstancedMesh&&(h.hasEventListener("dispose",u)===!1&&h.addEventListener("dispose",u),a.get(h)!==p&&(t.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,s.ARRAY_BUFFER),a.set(h,p))),h.isSkinnedMesh){const S=h.skeleton;a.get(S)!==p&&(S.update(),a.set(S,p))}return y}function d(){a=new WeakMap}function u(h){const p=h.target;p.removeEventListener("dispose",u),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:l,dispose:d}}class U0 extends Dn{constructor(e,t,r,a,l,d,u,h,p,x=Xs){if(x!==Xs&&x!==eo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&x===Xs&&(r=ts),r===void 0&&x===eo&&(r=Qs),super(null,a,l,d,u,h,x,r,p),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=u!==void 0?u:hi,this.minFilter=h!==void 0?h:hi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const F0=new Dn,Cm=new U0(1,1),O0=new T0,z0=new R_,B0=new D0,Am=[],Rm=[],Pm=new Float32Array(16),Lm=new Float32Array(9),Nm=new Float32Array(4);function oo(s,e,t){const r=s[0];if(r<=0||r>0)return s;const a=e*t;let l=Am[a];if(l===void 0&&(l=new Float32Array(a),Am[a]=l),e!==0){r.toArray(l,0);for(let d=1,u=0;d!==e;++d)u+=t,s[d].toArray(l,u)}return l}function Jt(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function Qt(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function Xl(s,e){let t=Rm[e];t===void 0&&(t=new Int32Array(e),Rm[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function jS(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function WS(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2fv(this.addr,e),Qt(t,e)}}function XS(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Jt(t,e))return;s.uniform3fv(this.addr,e),Qt(t,e)}}function qS(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4fv(this.addr,e),Qt(t,e)}}function YS(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(Jt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(Jt(t,r))return;Nm.set(r),s.uniformMatrix2fv(this.addr,!1,Nm),Qt(t,r)}}function $S(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(Jt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(Jt(t,r))return;Lm.set(r),s.uniformMatrix3fv(this.addr,!1,Lm),Qt(t,r)}}function KS(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(Jt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(Jt(t,r))return;Pm.set(r),s.uniformMatrix4fv(this.addr,!1,Pm),Qt(t,r)}}function ZS(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function JS(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2iv(this.addr,e),Qt(t,e)}}function QS(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;s.uniform3iv(this.addr,e),Qt(t,e)}}function eM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4iv(this.addr,e),Qt(t,e)}}function tM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function nM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2uiv(this.addr,e),Qt(t,e)}}function iM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;s.uniform3uiv(this.addr,e),Qt(t,e)}}function rM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4uiv(this.addr,e),Qt(t,e)}}function sM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let l;this.type===s.SAMPLER_2D_SHADOW?(Cm.compareFunction=M0,l=Cm):l=F0,t.setTexture2D(e||l,a)}function oM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture3D(e||z0,a)}function aM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTextureCube(e||B0,a)}function lM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture2DArray(e||O0,a)}function cM(s){switch(s){case 5126:return jS;case 35664:return WS;case 35665:return XS;case 35666:return qS;case 35674:return YS;case 35675:return $S;case 35676:return KS;case 5124:case 35670:return ZS;case 35667:case 35671:return JS;case 35668:case 35672:return QS;case 35669:case 35673:return eM;case 5125:return tM;case 36294:return nM;case 36295:return iM;case 36296:return rM;case 35678:case 36198:case 36298:case 36306:case 35682:return sM;case 35679:case 36299:case 36307:return oM;case 35680:case 36300:case 36308:case 36293:return aM;case 36289:case 36303:case 36311:case 36292:return lM}}function uM(s,e){s.uniform1fv(this.addr,e)}function dM(s,e){const t=oo(e,this.size,2);s.uniform2fv(this.addr,t)}function fM(s,e){const t=oo(e,this.size,3);s.uniform3fv(this.addr,t)}function hM(s,e){const t=oo(e,this.size,4);s.uniform4fv(this.addr,t)}function pM(s,e){const t=oo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function mM(s,e){const t=oo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function gM(s,e){const t=oo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function xM(s,e){s.uniform1iv(this.addr,e)}function vM(s,e){s.uniform2iv(this.addr,e)}function _M(s,e){s.uniform3iv(this.addr,e)}function yM(s,e){s.uniform4iv(this.addr,e)}function SM(s,e){s.uniform1uiv(this.addr,e)}function MM(s,e){s.uniform2uiv(this.addr,e)}function wM(s,e){s.uniform3uiv(this.addr,e)}function EM(s,e){s.uniform4uiv(this.addr,e)}function TM(s,e,t){const r=this.cache,a=e.length,l=Xl(t,a);Jt(r,l)||(s.uniform1iv(this.addr,l),Qt(r,l));for(let d=0;d!==a;++d)t.setTexture2D(e[d]||F0,l[d])}function bM(s,e,t){const r=this.cache,a=e.length,l=Xl(t,a);Jt(r,l)||(s.uniform1iv(this.addr,l),Qt(r,l));for(let d=0;d!==a;++d)t.setTexture3D(e[d]||z0,l[d])}function CM(s,e,t){const r=this.cache,a=e.length,l=Xl(t,a);Jt(r,l)||(s.uniform1iv(this.addr,l),Qt(r,l));for(let d=0;d!==a;++d)t.setTextureCube(e[d]||B0,l[d])}function AM(s,e,t){const r=this.cache,a=e.length,l=Xl(t,a);Jt(r,l)||(s.uniform1iv(this.addr,l),Qt(r,l));for(let d=0;d!==a;++d)t.setTexture2DArray(e[d]||O0,l[d])}function RM(s){switch(s){case 5126:return uM;case 35664:return dM;case 35665:return fM;case 35666:return hM;case 35674:return pM;case 35675:return mM;case 35676:return gM;case 5124:case 35670:return xM;case 35667:case 35671:return vM;case 35668:case 35672:return _M;case 35669:case 35673:return yM;case 5125:return SM;case 36294:return MM;case 36295:return wM;case 36296:return EM;case 35678:case 36198:case 36298:case 36306:case 35682:return TM;case 35679:case 36299:case 36307:return bM;case 35680:case 36300:case 36308:case 36293:return CM;case 36289:case 36303:case 36311:case 36292:return AM}}class PM{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=cM(t.type)}}class LM{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=RM(t.type)}}class NM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const a=this.seq;for(let l=0,d=a.length;l!==d;++l){const u=a[l];u.setValue(e,t[u.id],r)}}}const rd=/(\w+)(\])?(\[|\.)?/g;function Dm(s,e){s.seq.push(e),s.map[e.id]=e}function DM(s,e,t){const r=s.name,a=r.length;for(rd.lastIndex=0;;){const l=rd.exec(r),d=rd.lastIndex;let u=l[1];const h=l[2]==="]",p=l[3];if(h&&(u=u|0),p===void 0||p==="["&&d+2===a){Dm(t,p===void 0?new PM(u,s,e):new LM(u,s,e));break}else{let y=t.map[u];y===void 0&&(y=new NM(u),Dm(t,y)),t=y}}}class kl{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const l=e.getActiveUniform(t,a),d=e.getUniformLocation(t,l.name);DM(l,d,this)}}setValue(e,t,r,a){const l=this.map[t];l!==void 0&&l.setValue(e,r,a)}setOptional(e,t,r){const a=t[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,t,r,a){for(let l=0,d=t.length;l!==d;++l){const u=t[l],h=r[u.id];h.needsUpdate!==!1&&u.setValue(e,h.value,a)}}static seqWithValue(e,t){const r=[];for(let a=0,l=e.length;a!==l;++a){const d=e[a];d.id in t&&r.push(d)}return r}}function km(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const kM=37297;let IM=0;function UM(s,e){const t=s.split(`
`),r=[],a=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let d=a;d<l;d++){const u=d+1;r.push(`${u===e?">":" "} ${u}: ${t[d]}`)}return r.join(`
`)}const Im=new pt;function FM(s){Tt._getMatrix(Im,Tt.workingColorSpace,s);const e=`mat3( ${Im.elements.map(t=>t.toFixed(4))} )`;switch(Tt.getTransfer(s)){case Hl:return[e,"LinearTransferOETF"];case Nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Um(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),a=s.getShaderInfoLog(e).trim();if(r&&a==="")return"";const l=/ERROR: 0:(\d+)/.exec(a);if(l){const d=parseInt(l[1]);return t.toUpperCase()+`

`+a+`

`+UM(s.getShaderSource(e),d)}else return a}function OM(s,e){const t=FM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function zM(s,e){let t;switch(e){case i_:t="Linear";break;case r_:t="Reinhard";break;case s_:t="Cineon";break;case c0:t="ACESFilmic";break;case a_:t="AgX";break;case l_:t="Neutral";break;case o_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const bl=new J;function BM(){Tt.getLuminanceCoefficients(bl);const s=bl.x.toFixed(4),e=bl.y.toFixed(4),t=bl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function VM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qo).join(`
`)}function GM(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function HM(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const l=s.getActiveAttrib(e,a),d=l.name;let u=1;l.type===s.FLOAT_MAT2&&(u=2),l.type===s.FLOAT_MAT3&&(u=3),l.type===s.FLOAT_MAT4&&(u=4),t[d]={type:l.type,location:s.getAttribLocation(e,d),locationSize:u}}return t}function qo(s){return s!==""}function Fm(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Om(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const jM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zd(s){return s.replace(jM,XM)}const WM=new Map;function XM(s,e){let t=gt[e];if(t===void 0){const r=WM.get(e);if(r!==void 0)t=gt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Zd(t)}const qM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zm(s){return s.replace(qM,YM)}function YM(s,e,t,r){let a="";for(let l=parseInt(e);l<parseInt(t);l++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function Bm(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function $M(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===o0?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===a0?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Gi&&(e="SHADOWMAP_TYPE_VSM"),e}function KM(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Zs:case Js:e="ENVMAP_TYPE_CUBE";break;case Gl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ZM(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Js:e="ENVMAP_MODE_REFRACTION";break}return e}function JM(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case l0:e="ENVMAP_BLENDING_MULTIPLY";break;case t_:e="ENVMAP_BLENDING_MIX";break;case n_:e="ENVMAP_BLENDING_ADD";break}return e}function QM(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function ew(s,e,t,r){const a=s.getContext(),l=t.defines;let d=t.vertexShader,u=t.fragmentShader;const h=$M(t),p=KM(t),x=ZM(t),y=JM(t),S=QM(t),M=VM(t),A=GM(l),C=a.createProgram();let v,_,N=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,A].filter(qo).join(`
`),v.length>0&&(v+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,A].filter(qo).join(`
`),_.length>0&&(_+=`
`)):(v=[Bm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,A,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+x:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qo).join(`
`),_=[Bm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,A,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.envMap?"#define "+x:"",t.envMap?"#define "+y:"",S?"#define CUBEUV_TEXEL_WIDTH "+S.texelWidth:"",S?"#define CUBEUV_TEXEL_HEIGHT "+S.texelHeight:"",S?"#define CUBEUV_MAX_MIP "+S.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Tr?"#define TONE_MAPPING":"",t.toneMapping!==Tr?gt.tonemapping_pars_fragment:"",t.toneMapping!==Tr?zM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",gt.colorspace_pars_fragment,OM("linearToOutputTexel",t.outputColorSpace),BM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qo).join(`
`)),d=Zd(d),d=Fm(d,t),d=Om(d,t),u=Zd(u),u=Fm(u,t),u=Om(u,t),d=zm(d),u=zm(u),t.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,v=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,_=["#define varying in",t.glslVersion===Qp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const U=N+v+d,T=N+_+u,Y=km(a,a.VERTEX_SHADER,U),O=km(a,a.FRAGMENT_SHADER,T);a.attachShader(C,Y),a.attachShader(C,O),t.index0AttributeName!==void 0?a.bindAttribLocation(C,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(C,0,"position"),a.linkProgram(C);function I(z){if(s.debug.checkShaderErrors){const ie=a.getProgramInfoLog(C).trim(),Q=a.getShaderInfoLog(Y).trim(),de=a.getShaderInfoLog(O).trim();let pe=!0,le=!0;if(a.getProgramParameter(C,a.LINK_STATUS)===!1)if(pe=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,C,Y,O);else{const he=Um(a,Y,"vertex"),G=Um(a,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(C,a.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+ie+`
`+he+`
`+G)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(Q===""||de==="")&&(le=!1);le&&(z.diagnostics={runnable:pe,programLog:ie,vertexShader:{log:Q,prefix:v},fragmentShader:{log:de,prefix:_}})}a.deleteShader(Y),a.deleteShader(O),W=new kl(a,C),L=HM(a,C)}let W;this.getUniforms=function(){return W===void 0&&I(this),W};let L;this.getAttributes=function(){return L===void 0&&I(this),L};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=a.getProgramParameter(C,kM)),w},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(C),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=IM++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=Y,this.fragmentShader=O,this}let tw=0;class nw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(t),l=this._getShaderStage(r),d=this._getShaderCacheForMaterial(e);return d.has(a)===!1&&(d.add(a),a.usedTimes++),d.has(l)===!1&&(d.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new iw(e),t.set(e,r)),r}}class iw{constructor(e){this.id=tw++,this.code=e,this.usedTimes=0}}function rw(s,e,t,r,a,l,d){const u=new C0,h=new nw,p=new Set,x=[],y=a.logarithmicDepthBuffer,S=a.vertexTextures;let M=a.precision;const A={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function C(L){return p.add(L),L===0?"uv":`uv${L}`}function v(L,w,z,ie,Q){const de=ie.fog,pe=Q.geometry,le=L.isMeshStandardMaterial?ie.environment:null,he=(L.isMeshStandardMaterial?t:e).get(L.envMap||le),G=he&&he.mapping===Gl?he.image.height:null,fe=A[L.type];L.precision!==null&&(M=a.getMaxPrecision(L.precision),M!==L.precision&&console.warn("THREE.WebGLProgram.getParameters:",L.precision,"not supported, using",M,"instead."));const D=pe.morphAttributes.position||pe.morphAttributes.normal||pe.morphAttributes.color,E=D!==void 0?D.length:0;let H=0;pe.morphAttributes.position!==void 0&&(H=1),pe.morphAttributes.normal!==void 0&&(H=2),pe.morphAttributes.color!==void 0&&(H=3);let xe,X,ee,ue;if(fe){const wt=Mi[fe];xe=wt.vertexShader,X=wt.fragmentShader}else xe=L.vertexShader,X=L.fragmentShader,h.update(L),ee=h.getVertexShaderID(L),ue=h.getFragmentShaderID(L);const re=s.getRenderTarget(),me=s.state.buffers.depth.getReversed(),we=Q.isInstancedMesh===!0,Pe=Q.isBatchedMesh===!0,Ze=!!L.map,He=!!L.matcap,st=!!he,B=!!L.aoMap,Mt=!!L.lightMap,it=!!L.bumpMap,Qe=!!L.normalMap,Be=!!L.displacementMap,Je=!!L.emissiveMap,Le=!!L.metalnessMap,k=!!L.roughnessMap,R=L.anisotropy>0,ne=L.clearcoat>0,_e=L.dispersion>0,ye=L.iridescence>0,ge=L.sheen>0,je=L.transmission>0,Re=R&&!!L.anisotropyMap,Ue=ne&&!!L.clearcoatMap,ft=ne&&!!L.clearcoatNormalMap,Ee=ne&&!!L.clearcoatRoughnessMap,Oe=ye&&!!L.iridescenceMap,et=ye&&!!L.iridescenceThicknessMap,rt=ge&&!!L.sheenColorMap,Ve=ge&&!!L.sheenRoughnessMap,xt=!!L.specularMap,ct=!!L.specularColorMap,Pt=!!L.specularIntensityMap,q=je&&!!L.transmissionMap,Ne=je&&!!L.thicknessMap,ce=!!L.gradientMap,ve=!!L.alphaMap,Ie=L.alphaTest>0,ke=!!L.alphaHash,ut=!!L.extensions;let Ut=Tr;L.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Ut=s.toneMapping);const Yt={shaderID:fe,shaderType:L.type,shaderName:L.name,vertexShader:xe,fragmentShader:X,defines:L.defines,customVertexShaderID:ee,customFragmentShaderID:ue,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:M,batching:Pe,batchingColor:Pe&&Q._colorsTexture!==null,instancing:we,instancingColor:we&&Q.instanceColor!==null,instancingMorph:we&&Q.morphTexture!==null,supportsVertexTextures:S,outputColorSpace:re===null?s.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:io,alphaToCoverage:!!L.alphaToCoverage,map:Ze,matcap:He,envMap:st,envMapMode:st&&he.mapping,envMapCubeUVHeight:G,aoMap:B,lightMap:Mt,bumpMap:it,normalMap:Qe,displacementMap:S&&Be,emissiveMap:Je,normalMapObjectSpace:Qe&&L.normalMapType===f_,normalMapTangentSpace:Qe&&L.normalMapType===S0,metalnessMap:Le,roughnessMap:k,anisotropy:R,anisotropyMap:Re,clearcoat:ne,clearcoatMap:Ue,clearcoatNormalMap:ft,clearcoatRoughnessMap:Ee,dispersion:_e,iridescence:ye,iridescenceMap:Oe,iridescenceThicknessMap:et,sheen:ge,sheenColorMap:rt,sheenRoughnessMap:Ve,specularMap:xt,specularColorMap:ct,specularIntensityMap:Pt,transmission:je,transmissionMap:q,thicknessMap:Ne,gradientMap:ce,opaque:L.transparent===!1&&L.blending===Ws&&L.alphaToCoverage===!1,alphaMap:ve,alphaTest:Ie,alphaHash:ke,combine:L.combine,mapUv:Ze&&C(L.map.channel),aoMapUv:B&&C(L.aoMap.channel),lightMapUv:Mt&&C(L.lightMap.channel),bumpMapUv:it&&C(L.bumpMap.channel),normalMapUv:Qe&&C(L.normalMap.channel),displacementMapUv:Be&&C(L.displacementMap.channel),emissiveMapUv:Je&&C(L.emissiveMap.channel),metalnessMapUv:Le&&C(L.metalnessMap.channel),roughnessMapUv:k&&C(L.roughnessMap.channel),anisotropyMapUv:Re&&C(L.anisotropyMap.channel),clearcoatMapUv:Ue&&C(L.clearcoatMap.channel),clearcoatNormalMapUv:ft&&C(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&C(L.clearcoatRoughnessMap.channel),iridescenceMapUv:Oe&&C(L.iridescenceMap.channel),iridescenceThicknessMapUv:et&&C(L.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&C(L.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&C(L.sheenRoughnessMap.channel),specularMapUv:xt&&C(L.specularMap.channel),specularColorMapUv:ct&&C(L.specularColorMap.channel),specularIntensityMapUv:Pt&&C(L.specularIntensityMap.channel),transmissionMapUv:q&&C(L.transmissionMap.channel),thicknessMapUv:Ne&&C(L.thicknessMap.channel),alphaMapUv:ve&&C(L.alphaMap.channel),vertexTangents:!!pe.attributes.tangent&&(Qe||R),vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!pe.attributes.color&&pe.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!pe.attributes.uv&&(Ze||ve),fog:!!de,useFog:L.fog===!0,fogExp2:!!de&&de.isFogExp2,flatShading:L.flatShading===!0,sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:y,reverseDepthBuffer:me,skinning:Q.isSkinnedMesh===!0,morphTargets:pe.morphAttributes.position!==void 0,morphNormals:pe.morphAttributes.normal!==void 0,morphColors:pe.morphAttributes.color!==void 0,morphTargetsCount:E,morphTextureStride:H,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:L.dithering,shadowMapEnabled:s.shadowMap.enabled&&z.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Ze&&L.map.isVideoTexture===!0&&Tt.getTransfer(L.map.colorSpace)===Nt,decodeVideoTextureEmissive:Je&&L.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(L.emissiveMap.colorSpace)===Nt,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===Hi,flipSided:L.side===Nn,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionClipCullDistance:ut&&L.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ut&&L.extensions.multiDraw===!0||Pe)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()};return Yt.vertexUv1s=p.has(1),Yt.vertexUv2s=p.has(2),Yt.vertexUv3s=p.has(3),p.clear(),Yt}function _(L){const w=[];if(L.shaderID?w.push(L.shaderID):(w.push(L.customVertexShaderID),w.push(L.customFragmentShaderID)),L.defines!==void 0)for(const z in L.defines)w.push(z),w.push(L.defines[z]);return L.isRawShaderMaterial===!1&&(N(w,L),U(w,L),w.push(s.outputColorSpace)),w.push(L.customProgramCacheKey),w.join()}function N(L,w){L.push(w.precision),L.push(w.outputColorSpace),L.push(w.envMapMode),L.push(w.envMapCubeUVHeight),L.push(w.mapUv),L.push(w.alphaMapUv),L.push(w.lightMapUv),L.push(w.aoMapUv),L.push(w.bumpMapUv),L.push(w.normalMapUv),L.push(w.displacementMapUv),L.push(w.emissiveMapUv),L.push(w.metalnessMapUv),L.push(w.roughnessMapUv),L.push(w.anisotropyMapUv),L.push(w.clearcoatMapUv),L.push(w.clearcoatNormalMapUv),L.push(w.clearcoatRoughnessMapUv),L.push(w.iridescenceMapUv),L.push(w.iridescenceThicknessMapUv),L.push(w.sheenColorMapUv),L.push(w.sheenRoughnessMapUv),L.push(w.specularMapUv),L.push(w.specularColorMapUv),L.push(w.specularIntensityMapUv),L.push(w.transmissionMapUv),L.push(w.thicknessMapUv),L.push(w.combine),L.push(w.fogExp2),L.push(w.sizeAttenuation),L.push(w.morphTargetsCount),L.push(w.morphAttributeCount),L.push(w.numDirLights),L.push(w.numPointLights),L.push(w.numSpotLights),L.push(w.numSpotLightMaps),L.push(w.numHemiLights),L.push(w.numRectAreaLights),L.push(w.numDirLightShadows),L.push(w.numPointLightShadows),L.push(w.numSpotLightShadows),L.push(w.numSpotLightShadowsWithMaps),L.push(w.numLightProbes),L.push(w.shadowMapType),L.push(w.toneMapping),L.push(w.numClippingPlanes),L.push(w.numClipIntersection),L.push(w.depthPacking)}function U(L,w){u.disableAll(),w.supportsVertexTextures&&u.enable(0),w.instancing&&u.enable(1),w.instancingColor&&u.enable(2),w.instancingMorph&&u.enable(3),w.matcap&&u.enable(4),w.envMap&&u.enable(5),w.normalMapObjectSpace&&u.enable(6),w.normalMapTangentSpace&&u.enable(7),w.clearcoat&&u.enable(8),w.iridescence&&u.enable(9),w.alphaTest&&u.enable(10),w.vertexColors&&u.enable(11),w.vertexAlphas&&u.enable(12),w.vertexUv1s&&u.enable(13),w.vertexUv2s&&u.enable(14),w.vertexUv3s&&u.enable(15),w.vertexTangents&&u.enable(16),w.anisotropy&&u.enable(17),w.alphaHash&&u.enable(18),w.batching&&u.enable(19),w.dispersion&&u.enable(20),w.batchingColor&&u.enable(21),L.push(u.mask),u.disableAll(),w.fog&&u.enable(0),w.useFog&&u.enable(1),w.flatShading&&u.enable(2),w.logarithmicDepthBuffer&&u.enable(3),w.reverseDepthBuffer&&u.enable(4),w.skinning&&u.enable(5),w.morphTargets&&u.enable(6),w.morphNormals&&u.enable(7),w.morphColors&&u.enable(8),w.premultipliedAlpha&&u.enable(9),w.shadowMapEnabled&&u.enable(10),w.doubleSided&&u.enable(11),w.flipSided&&u.enable(12),w.useDepthPacking&&u.enable(13),w.dithering&&u.enable(14),w.transmission&&u.enable(15),w.sheen&&u.enable(16),w.opaque&&u.enable(17),w.pointsUvs&&u.enable(18),w.decodeVideoTexture&&u.enable(19),w.decodeVideoTextureEmissive&&u.enable(20),w.alphaToCoverage&&u.enable(21),L.push(u.mask)}function T(L){const w=A[L.type];let z;if(w){const ie=Mi[w];z=V_.clone(ie.uniforms)}else z=L.uniforms;return z}function Y(L,w){let z;for(let ie=0,Q=x.length;ie<Q;ie++){const de=x[ie];if(de.cacheKey===w){z=de,++z.usedTimes;break}}return z===void 0&&(z=new ew(s,w,L,l),x.push(z)),z}function O(L){if(--L.usedTimes===0){const w=x.indexOf(L);x[w]=x[x.length-1],x.pop(),L.destroy()}}function I(L){h.remove(L)}function W(){h.dispose()}return{getParameters:v,getProgramCacheKey:_,getUniforms:T,acquireProgram:Y,releaseProgram:O,releaseShaderCache:I,programs:x,dispose:W}}function sw(){let s=new WeakMap;function e(d){return s.has(d)}function t(d){let u=s.get(d);return u===void 0&&(u={},s.set(d,u)),u}function r(d){s.delete(d)}function a(d,u,h){s.get(d)[u]=h}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:a,dispose:l}}function ow(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Vm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Gm(){const s=[];let e=0;const t=[],r=[],a=[];function l(){e=0,t.length=0,r.length=0,a.length=0}function d(y,S,M,A,C,v){let _=s[e];return _===void 0?(_={id:y.id,object:y,geometry:S,material:M,groupOrder:A,renderOrder:y.renderOrder,z:C,group:v},s[e]=_):(_.id=y.id,_.object=y,_.geometry=S,_.material=M,_.groupOrder=A,_.renderOrder=y.renderOrder,_.z=C,_.group=v),e++,_}function u(y,S,M,A,C,v){const _=d(y,S,M,A,C,v);M.transmission>0?r.push(_):M.transparent===!0?a.push(_):t.push(_)}function h(y,S,M,A,C,v){const _=d(y,S,M,A,C,v);M.transmission>0?r.unshift(_):M.transparent===!0?a.unshift(_):t.unshift(_)}function p(y,S){t.length>1&&t.sort(y||ow),r.length>1&&r.sort(S||Vm),a.length>1&&a.sort(S||Vm)}function x(){for(let y=e,S=s.length;y<S;y++){const M=s[y];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:r,transparent:a,init:l,push:u,unshift:h,finish:x,sort:p}}function aw(){let s=new WeakMap;function e(r,a){const l=s.get(r);let d;return l===void 0?(d=new Gm,s.set(r,[d])):a>=l.length?(d=new Gm,l.push(d)):d=l[a],d}function t(){s=new WeakMap}return{get:e,dispose:t}}function lw(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new J,color:new St};break;case"SpotLight":t={position:new J,direction:new J,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new J,color:new St,distance:0,decay:0};break;case"HemisphereLight":t={direction:new J,skyColor:new St,groundColor:new St};break;case"RectAreaLight":t={color:new St,position:new J,halfWidth:new J,halfHeight:new J};break}return s[e.id]=t,t}}}function cw(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let uw=0;function dw(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function fw(s){const e=new lw,t=cw(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new J);const a=new J,l=new Vt,d=new Vt;function u(p){let x=0,y=0,S=0;for(let L=0;L<9;L++)r.probe[L].set(0,0,0);let M=0,A=0,C=0,v=0,_=0,N=0,U=0,T=0,Y=0,O=0,I=0;p.sort(dw);for(let L=0,w=p.length;L<w;L++){const z=p[L],ie=z.color,Q=z.intensity,de=z.distance,pe=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)x+=ie.r*Q,y+=ie.g*Q,S+=ie.b*Q;else if(z.isLightProbe){for(let le=0;le<9;le++)r.probe[le].addScaledVector(z.sh.coefficients[le],Q);I++}else if(z.isDirectionalLight){const le=e.get(z);if(le.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const he=z.shadow,G=t.get(z);G.shadowIntensity=he.intensity,G.shadowBias=he.bias,G.shadowNormalBias=he.normalBias,G.shadowRadius=he.radius,G.shadowMapSize=he.mapSize,r.directionalShadow[M]=G,r.directionalShadowMap[M]=pe,r.directionalShadowMatrix[M]=z.shadow.matrix,N++}r.directional[M]=le,M++}else if(z.isSpotLight){const le=e.get(z);le.position.setFromMatrixPosition(z.matrixWorld),le.color.copy(ie).multiplyScalar(Q),le.distance=de,le.coneCos=Math.cos(z.angle),le.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),le.decay=z.decay,r.spot[C]=le;const he=z.shadow;if(z.map&&(r.spotLightMap[Y]=z.map,Y++,he.updateMatrices(z),z.castShadow&&O++),r.spotLightMatrix[C]=he.matrix,z.castShadow){const G=t.get(z);G.shadowIntensity=he.intensity,G.shadowBias=he.bias,G.shadowNormalBias=he.normalBias,G.shadowRadius=he.radius,G.shadowMapSize=he.mapSize,r.spotShadow[C]=G,r.spotShadowMap[C]=pe,T++}C++}else if(z.isRectAreaLight){const le=e.get(z);le.color.copy(ie).multiplyScalar(Q),le.halfWidth.set(z.width*.5,0,0),le.halfHeight.set(0,z.height*.5,0),r.rectArea[v]=le,v++}else if(z.isPointLight){const le=e.get(z);if(le.color.copy(z.color).multiplyScalar(z.intensity),le.distance=z.distance,le.decay=z.decay,z.castShadow){const he=z.shadow,G=t.get(z);G.shadowIntensity=he.intensity,G.shadowBias=he.bias,G.shadowNormalBias=he.normalBias,G.shadowRadius=he.radius,G.shadowMapSize=he.mapSize,G.shadowCameraNear=he.camera.near,G.shadowCameraFar=he.camera.far,r.pointShadow[A]=G,r.pointShadowMap[A]=pe,r.pointShadowMatrix[A]=z.shadow.matrix,U++}r.point[A]=le,A++}else if(z.isHemisphereLight){const le=e.get(z);le.skyColor.copy(z.color).multiplyScalar(Q),le.groundColor.copy(z.groundColor).multiplyScalar(Q),r.hemi[_]=le,_++}}v>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=De.LTC_FLOAT_1,r.rectAreaLTC2=De.LTC_FLOAT_2):(r.rectAreaLTC1=De.LTC_HALF_1,r.rectAreaLTC2=De.LTC_HALF_2)),r.ambient[0]=x,r.ambient[1]=y,r.ambient[2]=S;const W=r.hash;(W.directionalLength!==M||W.pointLength!==A||W.spotLength!==C||W.rectAreaLength!==v||W.hemiLength!==_||W.numDirectionalShadows!==N||W.numPointShadows!==U||W.numSpotShadows!==T||W.numSpotMaps!==Y||W.numLightProbes!==I)&&(r.directional.length=M,r.spot.length=C,r.rectArea.length=v,r.point.length=A,r.hemi.length=_,r.directionalShadow.length=N,r.directionalShadowMap.length=N,r.pointShadow.length=U,r.pointShadowMap.length=U,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=N,r.pointShadowMatrix.length=U,r.spotLightMatrix.length=T+Y-O,r.spotLightMap.length=Y,r.numSpotLightShadowsWithMaps=O,r.numLightProbes=I,W.directionalLength=M,W.pointLength=A,W.spotLength=C,W.rectAreaLength=v,W.hemiLength=_,W.numDirectionalShadows=N,W.numPointShadows=U,W.numSpotShadows=T,W.numSpotMaps=Y,W.numLightProbes=I,r.version=uw++)}function h(p,x){let y=0,S=0,M=0,A=0,C=0;const v=x.matrixWorldInverse;for(let _=0,N=p.length;_<N;_++){const U=p[_];if(U.isDirectionalLight){const T=r.directional[y];T.direction.setFromMatrixPosition(U.matrixWorld),a.setFromMatrixPosition(U.target.matrixWorld),T.direction.sub(a),T.direction.transformDirection(v),y++}else if(U.isSpotLight){const T=r.spot[M];T.position.setFromMatrixPosition(U.matrixWorld),T.position.applyMatrix4(v),T.direction.setFromMatrixPosition(U.matrixWorld),a.setFromMatrixPosition(U.target.matrixWorld),T.direction.sub(a),T.direction.transformDirection(v),M++}else if(U.isRectAreaLight){const T=r.rectArea[A];T.position.setFromMatrixPosition(U.matrixWorld),T.position.applyMatrix4(v),d.identity(),l.copy(U.matrixWorld),l.premultiply(v),d.extractRotation(l),T.halfWidth.set(U.width*.5,0,0),T.halfHeight.set(0,U.height*.5,0),T.halfWidth.applyMatrix4(d),T.halfHeight.applyMatrix4(d),A++}else if(U.isPointLight){const T=r.point[S];T.position.setFromMatrixPosition(U.matrixWorld),T.position.applyMatrix4(v),S++}else if(U.isHemisphereLight){const T=r.hemi[C];T.direction.setFromMatrixPosition(U.matrixWorld),T.direction.transformDirection(v),C++}}}return{setup:u,setupView:h,state:r}}function Hm(s){const e=new fw(s),t=[],r=[];function a(x){p.camera=x,t.length=0,r.length=0}function l(x){t.push(x)}function d(x){r.push(x)}function u(){e.setup(t)}function h(x){e.setupView(t,x)}const p={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:p,setupLights:u,setupLightsView:h,pushLight:l,pushShadow:d}}function hw(s){let e=new WeakMap;function t(a,l=0){const d=e.get(a);let u;return d===void 0?(u=new Hm(s),e.set(a,[u])):l>=d.length?(u=new Hm(s),d.push(u)):u=d[l],u}function r(){e=new WeakMap}return{get:t,dispose:r}}class pw extends so{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=u_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class mw extends so{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const gw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vw(s,e,t){let r=new df;const a=new At,l=new At,d=new Dt,u=new pw({depthPacking:d_}),h=new mw,p={},x=t.maxTextureSize,y={[br]:Nn,[Nn]:br,[Hi]:Hi},S=new Cr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:gw,fragmentShader:xw}),M=S.clone();M.defines.HORIZONTAL_PASS=1;const A=new mi;A.setAttribute("position",new pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new sn(A,S),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=o0;let _=this.type;this.render=function(O,I,W){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||O.length===0)return;const L=s.getRenderTarget(),w=s.getActiveCubeFace(),z=s.getActiveMipmapLevel(),ie=s.state;ie.setBlending(Er),ie.buffers.color.setClear(1,1,1,1),ie.buffers.depth.setTest(!0),ie.setScissorTest(!1);const Q=_!==Gi&&this.type===Gi,de=_===Gi&&this.type!==Gi;for(let pe=0,le=O.length;pe<le;pe++){const he=O[pe],G=he.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",he,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);const fe=G.getFrameExtents();if(a.multiply(fe),l.copy(G.mapSize),(a.x>x||a.y>x)&&(a.x>x&&(l.x=Math.floor(x/fe.x),a.x=l.x*fe.x,G.mapSize.x=l.x),a.y>x&&(l.y=Math.floor(x/fe.y),a.y=l.y*fe.y,G.mapSize.y=l.y)),G.map===null||Q===!0||de===!0){const E=this.type!==Gi?{minFilter:hi,magFilter:hi}:{};G.map!==null&&G.map.dispose(),G.map=new ns(a.x,a.y,E),G.map.texture.name=he.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const D=G.getViewportCount();for(let E=0;E<D;E++){const H=G.getViewport(E);d.set(l.x*H.x,l.y*H.y,l.x*H.z,l.y*H.w),ie.viewport(d),G.updateMatrices(he,E),r=G.getFrustum(),T(I,W,G.camera,he,this.type)}G.isPointLightShadow!==!0&&this.type===Gi&&N(G,W),G.needsUpdate=!1}_=this.type,v.needsUpdate=!1,s.setRenderTarget(L,w,z)};function N(O,I){const W=e.update(C);S.defines.VSM_SAMPLES!==O.blurSamples&&(S.defines.VSM_SAMPLES=O.blurSamples,M.defines.VSM_SAMPLES=O.blurSamples,S.needsUpdate=!0,M.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new ns(a.x,a.y)),S.uniforms.shadow_pass.value=O.map.texture,S.uniforms.resolution.value=O.mapSize,S.uniforms.radius.value=O.radius,s.setRenderTarget(O.mapPass),s.clear(),s.renderBufferDirect(I,null,W,S,C,null),M.uniforms.shadow_pass.value=O.mapPass.texture,M.uniforms.resolution.value=O.mapSize,M.uniforms.radius.value=O.radius,s.setRenderTarget(O.map),s.clear(),s.renderBufferDirect(I,null,W,M,C,null)}function U(O,I,W,L){let w=null;const z=W.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(z!==void 0)w=z;else if(w=W.isPointLight===!0?h:u,s.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const ie=w.uuid,Q=I.uuid;let de=p[ie];de===void 0&&(de={},p[ie]=de);let pe=de[Q];pe===void 0&&(pe=w.clone(),de[Q]=pe,I.addEventListener("dispose",Y)),w=pe}if(w.visible=I.visible,w.wireframe=I.wireframe,L===Gi?w.side=I.shadowSide!==null?I.shadowSide:I.side:w.side=I.shadowSide!==null?I.shadowSide:y[I.side],w.alphaMap=I.alphaMap,w.alphaTest=I.alphaTest,w.map=I.map,w.clipShadows=I.clipShadows,w.clippingPlanes=I.clippingPlanes,w.clipIntersection=I.clipIntersection,w.displacementMap=I.displacementMap,w.displacementScale=I.displacementScale,w.displacementBias=I.displacementBias,w.wireframeLinewidth=I.wireframeLinewidth,w.linewidth=I.linewidth,W.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const ie=s.properties.get(w);ie.light=W}return w}function T(O,I,W,L,w){if(O.visible===!1)return;if(O.layers.test(I.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&w===Gi)&&(!O.frustumCulled||r.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,O.matrixWorld);const Q=e.update(O),de=O.material;if(Array.isArray(de)){const pe=Q.groups;for(let le=0,he=pe.length;le<he;le++){const G=pe[le],fe=de[G.materialIndex];if(fe&&fe.visible){const D=U(O,fe,L,w);O.onBeforeShadow(s,O,I,W,Q,D,G),s.renderBufferDirect(W,null,Q,D,O,G),O.onAfterShadow(s,O,I,W,Q,D,G)}}}else if(de.visible){const pe=U(O,de,L,w);O.onBeforeShadow(s,O,I,W,Q,pe,null),s.renderBufferDirect(W,null,Q,pe,O,null),O.onAfterShadow(s,O,I,W,Q,pe,null)}}const ie=O.children;for(let Q=0,de=ie.length;Q<de;Q++)T(ie[Q],I,W,L,w)}function Y(O){O.target.removeEventListener("dispose",Y);for(const W in p){const L=p[W],w=O.target.uuid;w in L&&(L[w].dispose(),delete L[w])}}}const _w={[hd]:pd,[md]:vd,[gd]:_d,[Ks]:xd,[pd]:hd,[vd]:md,[_d]:gd,[xd]:Ks};function yw(s,e){function t(){let q=!1;const Ne=new Dt;let ce=null;const ve=new Dt(0,0,0,0);return{setMask:function(Ie){ce!==Ie&&!q&&(s.colorMask(Ie,Ie,Ie,Ie),ce=Ie)},setLocked:function(Ie){q=Ie},setClear:function(Ie,ke,ut,Ut,Yt){Yt===!0&&(Ie*=Ut,ke*=Ut,ut*=Ut),Ne.set(Ie,ke,ut,Ut),ve.equals(Ne)===!1&&(s.clearColor(Ie,ke,ut,Ut),ve.copy(Ne))},reset:function(){q=!1,ce=null,ve.set(-1,0,0,0)}}}function r(){let q=!1,Ne=!1,ce=null,ve=null,Ie=null;return{setReversed:function(ke){if(Ne!==ke){const ut=e.get("EXT_clip_control");Ne?ut.clipControlEXT(ut.LOWER_LEFT_EXT,ut.ZERO_TO_ONE_EXT):ut.clipControlEXT(ut.LOWER_LEFT_EXT,ut.NEGATIVE_ONE_TO_ONE_EXT);const Ut=Ie;Ie=null,this.setClear(Ut)}Ne=ke},getReversed:function(){return Ne},setTest:function(ke){ke?re(s.DEPTH_TEST):me(s.DEPTH_TEST)},setMask:function(ke){ce!==ke&&!q&&(s.depthMask(ke),ce=ke)},setFunc:function(ke){if(Ne&&(ke=_w[ke]),ve!==ke){switch(ke){case hd:s.depthFunc(s.NEVER);break;case pd:s.depthFunc(s.ALWAYS);break;case md:s.depthFunc(s.LESS);break;case Ks:s.depthFunc(s.LEQUAL);break;case gd:s.depthFunc(s.EQUAL);break;case xd:s.depthFunc(s.GEQUAL);break;case vd:s.depthFunc(s.GREATER);break;case _d:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ve=ke}},setLocked:function(ke){q=ke},setClear:function(ke){Ie!==ke&&(Ne&&(ke=1-ke),s.clearDepth(ke),Ie=ke)},reset:function(){q=!1,ce=null,ve=null,Ie=null,Ne=!1}}}function a(){let q=!1,Ne=null,ce=null,ve=null,Ie=null,ke=null,ut=null,Ut=null,Yt=null;return{setTest:function(wt){q||(wt?re(s.STENCIL_TEST):me(s.STENCIL_TEST))},setMask:function(wt){Ne!==wt&&!q&&(s.stencilMask(wt),Ne=wt)},setFunc:function(wt,Mn,xn){(ce!==wt||ve!==Mn||Ie!==xn)&&(s.stencilFunc(wt,Mn,xn),ce=wt,ve=Mn,Ie=xn)},setOp:function(wt,Mn,xn){(ke!==wt||ut!==Mn||Ut!==xn)&&(s.stencilOp(wt,Mn,xn),ke=wt,ut=Mn,Ut=xn)},setLocked:function(wt){q=wt},setClear:function(wt){Yt!==wt&&(s.clearStencil(wt),Yt=wt)},reset:function(){q=!1,Ne=null,ce=null,ve=null,Ie=null,ke=null,ut=null,Ut=null,Yt=null}}}const l=new t,d=new r,u=new a,h=new WeakMap,p=new WeakMap;let x={},y={},S=new WeakMap,M=[],A=null,C=!1,v=null,_=null,N=null,U=null,T=null,Y=null,O=null,I=new St(0,0,0),W=0,L=!1,w=null,z=null,ie=null,Q=null,de=null;const pe=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let le=!1,he=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(he=parseFloat(/^WebGL (\d)/.exec(G)[1]),le=he>=1):G.indexOf("OpenGL ES")!==-1&&(he=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),le=he>=2);let fe=null,D={};const E=s.getParameter(s.SCISSOR_BOX),H=s.getParameter(s.VIEWPORT),xe=new Dt().fromArray(E),X=new Dt().fromArray(H);function ee(q,Ne,ce,ve){const Ie=new Uint8Array(4),ke=s.createTexture();s.bindTexture(q,ke),s.texParameteri(q,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(q,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ut=0;ut<ce;ut++)q===s.TEXTURE_3D||q===s.TEXTURE_2D_ARRAY?s.texImage3D(Ne,0,s.RGBA,1,1,ve,0,s.RGBA,s.UNSIGNED_BYTE,Ie):s.texImage2D(Ne+ut,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ie);return ke}const ue={};ue[s.TEXTURE_2D]=ee(s.TEXTURE_2D,s.TEXTURE_2D,1),ue[s.TEXTURE_CUBE_MAP]=ee(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[s.TEXTURE_2D_ARRAY]=ee(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ue[s.TEXTURE_3D]=ee(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),d.setClear(1),u.setClear(0),re(s.DEPTH_TEST),d.setFunc(Ks),it(!1),Qe(Yp),re(s.CULL_FACE),B(Er);function re(q){x[q]!==!0&&(s.enable(q),x[q]=!0)}function me(q){x[q]!==!1&&(s.disable(q),x[q]=!1)}function we(q,Ne){return y[q]!==Ne?(s.bindFramebuffer(q,Ne),y[q]=Ne,q===s.DRAW_FRAMEBUFFER&&(y[s.FRAMEBUFFER]=Ne),q===s.FRAMEBUFFER&&(y[s.DRAW_FRAMEBUFFER]=Ne),!0):!1}function Pe(q,Ne){let ce=M,ve=!1;if(q){ce=S.get(Ne),ce===void 0&&(ce=[],S.set(Ne,ce));const Ie=q.textures;if(ce.length!==Ie.length||ce[0]!==s.COLOR_ATTACHMENT0){for(let ke=0,ut=Ie.length;ke<ut;ke++)ce[ke]=s.COLOR_ATTACHMENT0+ke;ce.length=Ie.length,ve=!0}}else ce[0]!==s.BACK&&(ce[0]=s.BACK,ve=!0);ve&&s.drawBuffers(ce)}function Ze(q){return A!==q?(s.useProgram(q),A=q,!0):!1}const He={[Kr]:s.FUNC_ADD,[Ov]:s.FUNC_SUBTRACT,[zv]:s.FUNC_REVERSE_SUBTRACT};He[Bv]=s.MIN,He[Vv]=s.MAX;const st={[Gv]:s.ZERO,[Hv]:s.ONE,[jv]:s.SRC_COLOR,[dd]:s.SRC_ALPHA,[Kv]:s.SRC_ALPHA_SATURATE,[Yv]:s.DST_COLOR,[Xv]:s.DST_ALPHA,[Wv]:s.ONE_MINUS_SRC_COLOR,[fd]:s.ONE_MINUS_SRC_ALPHA,[$v]:s.ONE_MINUS_DST_COLOR,[qv]:s.ONE_MINUS_DST_ALPHA,[Zv]:s.CONSTANT_COLOR,[Jv]:s.ONE_MINUS_CONSTANT_COLOR,[Qv]:s.CONSTANT_ALPHA,[e_]:s.ONE_MINUS_CONSTANT_ALPHA};function B(q,Ne,ce,ve,Ie,ke,ut,Ut,Yt,wt){if(q===Er){C===!0&&(me(s.BLEND),C=!1);return}if(C===!1&&(re(s.BLEND),C=!0),q!==Fv){if(q!==v||wt!==L){if((_!==Kr||T!==Kr)&&(s.blendEquation(s.FUNC_ADD),_=Kr,T=Kr),wt)switch(q){case Ws:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ud:s.blendFunc(s.ONE,s.ONE);break;case $p:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Kp:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}else switch(q){case Ws:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ud:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case $p:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Kp:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}N=null,U=null,Y=null,O=null,I.set(0,0,0),W=0,v=q,L=wt}return}Ie=Ie||Ne,ke=ke||ce,ut=ut||ve,(Ne!==_||Ie!==T)&&(s.blendEquationSeparate(He[Ne],He[Ie]),_=Ne,T=Ie),(ce!==N||ve!==U||ke!==Y||ut!==O)&&(s.blendFuncSeparate(st[ce],st[ve],st[ke],st[ut]),N=ce,U=ve,Y=ke,O=ut),(Ut.equals(I)===!1||Yt!==W)&&(s.blendColor(Ut.r,Ut.g,Ut.b,Yt),I.copy(Ut),W=Yt),v=q,L=!1}function Mt(q,Ne){q.side===Hi?me(s.CULL_FACE):re(s.CULL_FACE);let ce=q.side===Nn;Ne&&(ce=!ce),it(ce),q.blending===Ws&&q.transparent===!1?B(Er):B(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),d.setFunc(q.depthFunc),d.setTest(q.depthTest),d.setMask(q.depthWrite),l.setMask(q.colorWrite);const ve=q.stencilWrite;u.setTest(ve),ve&&(u.setMask(q.stencilWriteMask),u.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),u.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),Je(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?re(s.SAMPLE_ALPHA_TO_COVERAGE):me(s.SAMPLE_ALPHA_TO_COVERAGE)}function it(q){w!==q&&(q?s.frontFace(s.CW):s.frontFace(s.CCW),w=q)}function Qe(q){q!==Iv?(re(s.CULL_FACE),q!==z&&(q===Yp?s.cullFace(s.BACK):q===Uv?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):me(s.CULL_FACE),z=q}function Be(q){q!==ie&&(le&&s.lineWidth(q),ie=q)}function Je(q,Ne,ce){q?(re(s.POLYGON_OFFSET_FILL),(Q!==Ne||de!==ce)&&(s.polygonOffset(Ne,ce),Q=Ne,de=ce)):me(s.POLYGON_OFFSET_FILL)}function Le(q){q?re(s.SCISSOR_TEST):me(s.SCISSOR_TEST)}function k(q){q===void 0&&(q=s.TEXTURE0+pe-1),fe!==q&&(s.activeTexture(q),fe=q)}function R(q,Ne,ce){ce===void 0&&(fe===null?ce=s.TEXTURE0+pe-1:ce=fe);let ve=D[ce];ve===void 0&&(ve={type:void 0,texture:void 0},D[ce]=ve),(ve.type!==q||ve.texture!==Ne)&&(fe!==ce&&(s.activeTexture(ce),fe=ce),s.bindTexture(q,Ne||ue[q]),ve.type=q,ve.texture=Ne)}function ne(){const q=D[fe];q!==void 0&&q.type!==void 0&&(s.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function _e(){try{s.compressedTexImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ye(){try{s.compressedTexImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ge(){try{s.texSubImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function je(){try{s.texSubImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Re(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ue(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ft(){try{s.texStorage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ee(){try{s.texStorage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Oe(){try{s.texImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function et(){try{s.texImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function rt(q){xe.equals(q)===!1&&(s.scissor(q.x,q.y,q.z,q.w),xe.copy(q))}function Ve(q){X.equals(q)===!1&&(s.viewport(q.x,q.y,q.z,q.w),X.copy(q))}function xt(q,Ne){let ce=p.get(Ne);ce===void 0&&(ce=new WeakMap,p.set(Ne,ce));let ve=ce.get(q);ve===void 0&&(ve=s.getUniformBlockIndex(Ne,q.name),ce.set(q,ve))}function ct(q,Ne){const ve=p.get(Ne).get(q);h.get(Ne)!==ve&&(s.uniformBlockBinding(Ne,ve,q.__bindingPointIndex),h.set(Ne,ve))}function Pt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),d.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),x={},fe=null,D={},y={},S=new WeakMap,M=[],A=null,C=!1,v=null,_=null,N=null,U=null,T=null,Y=null,O=null,I=new St(0,0,0),W=0,L=!1,w=null,z=null,ie=null,Q=null,de=null,xe.set(0,0,s.canvas.width,s.canvas.height),X.set(0,0,s.canvas.width,s.canvas.height),l.reset(),d.reset(),u.reset()}return{buffers:{color:l,depth:d,stencil:u},enable:re,disable:me,bindFramebuffer:we,drawBuffers:Pe,useProgram:Ze,setBlending:B,setMaterial:Mt,setFlipSided:it,setCullFace:Qe,setLineWidth:Be,setPolygonOffset:Je,setScissorTest:Le,activeTexture:k,bindTexture:R,unbindTexture:ne,compressedTexImage2D:_e,compressedTexImage3D:ye,texImage2D:Oe,texImage3D:et,updateUBOMapping:xt,uniformBlockBinding:ct,texStorage2D:ft,texStorage3D:Ee,texSubImage2D:ge,texSubImage3D:je,compressedTexSubImage2D:Re,compressedTexSubImage3D:Ue,scissor:rt,viewport:Ve,reset:Pt}}function jm(s,e,t,r){const a=Sw(r);switch(t){case p0:return s*e;case g0:return s*e;case x0:return s*e*2;case v0:return s*e/a.components*a.byteLength;case lf:return s*e/a.components*a.byteLength;case _0:return s*e*2/a.components*a.byteLength;case cf:return s*e*2/a.components*a.byteLength;case m0:return s*e*3/a.components*a.byteLength;case fi:return s*e*4/a.components*a.byteLength;case uf:return s*e*4/a.components*a.byteLength;case Rl:case Pl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ll:case Nl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Td:case Cd:return Math.max(s,16)*Math.max(e,8)/4;case Ed:case bd:return Math.max(s,8)*Math.max(e,8)/2;case Ad:case Rd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Pd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ld:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Nd:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Dd:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case kd:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Id:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ud:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Fd:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Od:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case zd:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Bd:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Vd:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Gd:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Hd:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case jd:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Dl:case Wd:case Xd:return Math.ceil(s/4)*Math.ceil(e/4)*16;case y0:case qd:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Yd:case $d:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Sw(s){switch(s){case Yi:case d0:return{byteLength:1,components:1};case $o:case f0:case Ko:return{byteLength:2,components:1};case of:case af:return{byteLength:2,components:4};case ts:case sf:case ji:return{byteLength:4,components:1};case h0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Mw(s,e,t,r,a,l,d){const u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new At,x=new WeakMap;let y;const S=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(k,R){return M?new OffscreenCanvas(k,R):zl("canvas")}function C(k,R,ne){let _e=1;const ye=Le(k);if((ye.width>ne||ye.height>ne)&&(_e=ne/Math.max(ye.width,ye.height)),_e<1)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap||typeof VideoFrame<"u"&&k instanceof VideoFrame){const ge=Math.floor(_e*ye.width),je=Math.floor(_e*ye.height);y===void 0&&(y=A(ge,je));const Re=R?A(ge,je):y;return Re.width=ge,Re.height=je,Re.getContext("2d").drawImage(k,0,0,ge,je),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ye.width+"x"+ye.height+") to ("+ge+"x"+je+")."),Re}else return"data"in k&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ye.width+"x"+ye.height+")."),k;return k}function v(k){return k.generateMipmaps}function _(k){s.generateMipmap(k)}function N(k){return k.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:k.isWebGL3DRenderTarget?s.TEXTURE_3D:k.isWebGLArrayRenderTarget||k.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function U(k,R,ne,_e,ye=!1){if(k!==null){if(s[k]!==void 0)return s[k];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let ge=R;if(R===s.RED&&(ne===s.FLOAT&&(ge=s.R32F),ne===s.HALF_FLOAT&&(ge=s.R16F),ne===s.UNSIGNED_BYTE&&(ge=s.R8)),R===s.RED_INTEGER&&(ne===s.UNSIGNED_BYTE&&(ge=s.R8UI),ne===s.UNSIGNED_SHORT&&(ge=s.R16UI),ne===s.UNSIGNED_INT&&(ge=s.R32UI),ne===s.BYTE&&(ge=s.R8I),ne===s.SHORT&&(ge=s.R16I),ne===s.INT&&(ge=s.R32I)),R===s.RG&&(ne===s.FLOAT&&(ge=s.RG32F),ne===s.HALF_FLOAT&&(ge=s.RG16F),ne===s.UNSIGNED_BYTE&&(ge=s.RG8)),R===s.RG_INTEGER&&(ne===s.UNSIGNED_BYTE&&(ge=s.RG8UI),ne===s.UNSIGNED_SHORT&&(ge=s.RG16UI),ne===s.UNSIGNED_INT&&(ge=s.RG32UI),ne===s.BYTE&&(ge=s.RG8I),ne===s.SHORT&&(ge=s.RG16I),ne===s.INT&&(ge=s.RG32I)),R===s.RGB_INTEGER&&(ne===s.UNSIGNED_BYTE&&(ge=s.RGB8UI),ne===s.UNSIGNED_SHORT&&(ge=s.RGB16UI),ne===s.UNSIGNED_INT&&(ge=s.RGB32UI),ne===s.BYTE&&(ge=s.RGB8I),ne===s.SHORT&&(ge=s.RGB16I),ne===s.INT&&(ge=s.RGB32I)),R===s.RGBA_INTEGER&&(ne===s.UNSIGNED_BYTE&&(ge=s.RGBA8UI),ne===s.UNSIGNED_SHORT&&(ge=s.RGBA16UI),ne===s.UNSIGNED_INT&&(ge=s.RGBA32UI),ne===s.BYTE&&(ge=s.RGBA8I),ne===s.SHORT&&(ge=s.RGBA16I),ne===s.INT&&(ge=s.RGBA32I)),R===s.RGB&&ne===s.UNSIGNED_INT_5_9_9_9_REV&&(ge=s.RGB9_E5),R===s.RGBA){const je=ye?Hl:Tt.getTransfer(_e);ne===s.FLOAT&&(ge=s.RGBA32F),ne===s.HALF_FLOAT&&(ge=s.RGBA16F),ne===s.UNSIGNED_BYTE&&(ge=je===Nt?s.SRGB8_ALPHA8:s.RGBA8),ne===s.UNSIGNED_SHORT_4_4_4_4&&(ge=s.RGBA4),ne===s.UNSIGNED_SHORT_5_5_5_1&&(ge=s.RGB5_A1)}return(ge===s.R16F||ge===s.R32F||ge===s.RG16F||ge===s.RG32F||ge===s.RGBA16F||ge===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ge}function T(k,R){let ne;return k?R===null||R===ts||R===Qs?ne=s.DEPTH24_STENCIL8:R===ji?ne=s.DEPTH32F_STENCIL8:R===$o&&(ne=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===ts||R===Qs?ne=s.DEPTH_COMPONENT24:R===ji?ne=s.DEPTH_COMPONENT32F:R===$o&&(ne=s.DEPTH_COMPONENT16),ne}function Y(k,R){return v(k)===!0||k.isFramebufferTexture&&k.minFilter!==hi&&k.minFilter!==Ei?Math.log2(Math.max(R.width,R.height))+1:k.mipmaps!==void 0&&k.mipmaps.length>0?k.mipmaps.length:k.isCompressedTexture&&Array.isArray(k.image)?R.mipmaps.length:1}function O(k){const R=k.target;R.removeEventListener("dispose",O),W(R),R.isVideoTexture&&x.delete(R)}function I(k){const R=k.target;R.removeEventListener("dispose",I),w(R)}function W(k){const R=r.get(k);if(R.__webglInit===void 0)return;const ne=k.source,_e=S.get(ne);if(_e){const ye=_e[R.__cacheKey];ye.usedTimes--,ye.usedTimes===0&&L(k),Object.keys(_e).length===0&&S.delete(ne)}r.remove(k)}function L(k){const R=r.get(k);s.deleteTexture(R.__webglTexture);const ne=k.source,_e=S.get(ne);delete _e[R.__cacheKey],d.memory.textures--}function w(k){const R=r.get(k);if(k.depthTexture&&(k.depthTexture.dispose(),r.remove(k.depthTexture)),k.isWebGLCubeRenderTarget)for(let _e=0;_e<6;_e++){if(Array.isArray(R.__webglFramebuffer[_e]))for(let ye=0;ye<R.__webglFramebuffer[_e].length;ye++)s.deleteFramebuffer(R.__webglFramebuffer[_e][ye]);else s.deleteFramebuffer(R.__webglFramebuffer[_e]);R.__webglDepthbuffer&&s.deleteRenderbuffer(R.__webglDepthbuffer[_e])}else{if(Array.isArray(R.__webglFramebuffer))for(let _e=0;_e<R.__webglFramebuffer.length;_e++)s.deleteFramebuffer(R.__webglFramebuffer[_e]);else s.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&s.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&s.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let _e=0;_e<R.__webglColorRenderbuffer.length;_e++)R.__webglColorRenderbuffer[_e]&&s.deleteRenderbuffer(R.__webglColorRenderbuffer[_e]);R.__webglDepthRenderbuffer&&s.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const ne=k.textures;for(let _e=0,ye=ne.length;_e<ye;_e++){const ge=r.get(ne[_e]);ge.__webglTexture&&(s.deleteTexture(ge.__webglTexture),d.memory.textures--),r.remove(ne[_e])}r.remove(k)}let z=0;function ie(){z=0}function Q(){const k=z;return k>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+k+" texture units while this GPU supports only "+a.maxTextures),z+=1,k}function de(k){const R=[];return R.push(k.wrapS),R.push(k.wrapT),R.push(k.wrapR||0),R.push(k.magFilter),R.push(k.minFilter),R.push(k.anisotropy),R.push(k.internalFormat),R.push(k.format),R.push(k.type),R.push(k.generateMipmaps),R.push(k.premultiplyAlpha),R.push(k.flipY),R.push(k.unpackAlignment),R.push(k.colorSpace),R.join()}function pe(k,R){const ne=r.get(k);if(k.isVideoTexture&&Be(k),k.isRenderTargetTexture===!1&&k.version>0&&ne.__version!==k.version){const _e=k.image;if(_e===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(_e.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(ne,k,R);return}}t.bindTexture(s.TEXTURE_2D,ne.__webglTexture,s.TEXTURE0+R)}function le(k,R){const ne=r.get(k);if(k.version>0&&ne.__version!==k.version){X(ne,k,R);return}t.bindTexture(s.TEXTURE_2D_ARRAY,ne.__webglTexture,s.TEXTURE0+R)}function he(k,R){const ne=r.get(k);if(k.version>0&&ne.__version!==k.version){X(ne,k,R);return}t.bindTexture(s.TEXTURE_3D,ne.__webglTexture,s.TEXTURE0+R)}function G(k,R){const ne=r.get(k);if(k.version>0&&ne.__version!==k.version){ee(ne,k,R);return}t.bindTexture(s.TEXTURE_CUBE_MAP,ne.__webglTexture,s.TEXTURE0+R)}const fe={[Md]:s.REPEAT,[Jr]:s.CLAMP_TO_EDGE,[wd]:s.MIRRORED_REPEAT},D={[hi]:s.NEAREST,[c_]:s.NEAREST_MIPMAP_NEAREST,[ol]:s.NEAREST_MIPMAP_LINEAR,[Ei]:s.LINEAR,[Pu]:s.LINEAR_MIPMAP_NEAREST,[Qr]:s.LINEAR_MIPMAP_LINEAR},E={[h_]:s.NEVER,[__]:s.ALWAYS,[p_]:s.LESS,[M0]:s.LEQUAL,[m_]:s.EQUAL,[v_]:s.GEQUAL,[g_]:s.GREATER,[x_]:s.NOTEQUAL};function H(k,R){if(R.type===ji&&e.has("OES_texture_float_linear")===!1&&(R.magFilter===Ei||R.magFilter===Pu||R.magFilter===ol||R.magFilter===Qr||R.minFilter===Ei||R.minFilter===Pu||R.minFilter===ol||R.minFilter===Qr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(k,s.TEXTURE_WRAP_S,fe[R.wrapS]),s.texParameteri(k,s.TEXTURE_WRAP_T,fe[R.wrapT]),(k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY)&&s.texParameteri(k,s.TEXTURE_WRAP_R,fe[R.wrapR]),s.texParameteri(k,s.TEXTURE_MAG_FILTER,D[R.magFilter]),s.texParameteri(k,s.TEXTURE_MIN_FILTER,D[R.minFilter]),R.compareFunction&&(s.texParameteri(k,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(k,s.TEXTURE_COMPARE_FUNC,E[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===hi||R.minFilter!==ol&&R.minFilter!==Qr||R.type===ji&&e.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||r.get(R).__currentAnisotropy){const ne=e.get("EXT_texture_filter_anisotropic");s.texParameterf(k,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,a.getMaxAnisotropy())),r.get(R).__currentAnisotropy=R.anisotropy}}}function xe(k,R){let ne=!1;k.__webglInit===void 0&&(k.__webglInit=!0,R.addEventListener("dispose",O));const _e=R.source;let ye=S.get(_e);ye===void 0&&(ye={},S.set(_e,ye));const ge=de(R);if(ge!==k.__cacheKey){ye[ge]===void 0&&(ye[ge]={texture:s.createTexture(),usedTimes:0},d.memory.textures++,ne=!0),ye[ge].usedTimes++;const je=ye[k.__cacheKey];je!==void 0&&(ye[k.__cacheKey].usedTimes--,je.usedTimes===0&&L(R)),k.__cacheKey=ge,k.__webglTexture=ye[ge].texture}return ne}function X(k,R,ne){let _e=s.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(_e=s.TEXTURE_2D_ARRAY),R.isData3DTexture&&(_e=s.TEXTURE_3D);const ye=xe(k,R),ge=R.source;t.bindTexture(_e,k.__webglTexture,s.TEXTURE0+ne);const je=r.get(ge);if(ge.version!==je.__version||ye===!0){t.activeTexture(s.TEXTURE0+ne);const Re=Tt.getPrimaries(Tt.workingColorSpace),Ue=R.colorSpace===wr?null:Tt.getPrimaries(R.colorSpace),ft=R.colorSpace===wr||Re===Ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,R.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,R.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);let Ee=C(R.image,!1,a.maxTextureSize);Ee=Je(R,Ee);const Oe=l.convert(R.format,R.colorSpace),et=l.convert(R.type);let rt=U(R.internalFormat,Oe,et,R.colorSpace,R.isVideoTexture);H(_e,R);let Ve;const xt=R.mipmaps,ct=R.isVideoTexture!==!0,Pt=je.__version===void 0||ye===!0,q=ge.dataReady,Ne=Y(R,Ee);if(R.isDepthTexture)rt=T(R.format===eo,R.type),Pt&&(ct?t.texStorage2D(s.TEXTURE_2D,1,rt,Ee.width,Ee.height):t.texImage2D(s.TEXTURE_2D,0,rt,Ee.width,Ee.height,0,Oe,et,null));else if(R.isDataTexture)if(xt.length>0){ct&&Pt&&t.texStorage2D(s.TEXTURE_2D,Ne,rt,xt[0].width,xt[0].height);for(let ce=0,ve=xt.length;ce<ve;ce++)Ve=xt[ce],ct?q&&t.texSubImage2D(s.TEXTURE_2D,ce,0,0,Ve.width,Ve.height,Oe,et,Ve.data):t.texImage2D(s.TEXTURE_2D,ce,rt,Ve.width,Ve.height,0,Oe,et,Ve.data);R.generateMipmaps=!1}else ct?(Pt&&t.texStorage2D(s.TEXTURE_2D,Ne,rt,Ee.width,Ee.height),q&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ee.width,Ee.height,Oe,et,Ee.data)):t.texImage2D(s.TEXTURE_2D,0,rt,Ee.width,Ee.height,0,Oe,et,Ee.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){ct&&Pt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ne,rt,xt[0].width,xt[0].height,Ee.depth);for(let ce=0,ve=xt.length;ce<ve;ce++)if(Ve=xt[ce],R.format!==fi)if(Oe!==null)if(ct){if(q)if(R.layerUpdates.size>0){const Ie=jm(Ve.width,Ve.height,R.format,R.type);for(const ke of R.layerUpdates){const ut=Ve.data.subarray(ke*Ie/Ve.data.BYTES_PER_ELEMENT,(ke+1)*Ie/Ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ce,0,0,ke,Ve.width,Ve.height,1,Oe,ut)}R.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ce,0,0,0,Ve.width,Ve.height,Ee.depth,Oe,Ve.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ce,rt,Ve.width,Ve.height,Ee.depth,0,Ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ct?q&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ce,0,0,0,Ve.width,Ve.height,Ee.depth,Oe,et,Ve.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ce,rt,Ve.width,Ve.height,Ee.depth,0,Oe,et,Ve.data)}else{ct&&Pt&&t.texStorage2D(s.TEXTURE_2D,Ne,rt,xt[0].width,xt[0].height);for(let ce=0,ve=xt.length;ce<ve;ce++)Ve=xt[ce],R.format!==fi?Oe!==null?ct?q&&t.compressedTexSubImage2D(s.TEXTURE_2D,ce,0,0,Ve.width,Ve.height,Oe,Ve.data):t.compressedTexImage2D(s.TEXTURE_2D,ce,rt,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ct?q&&t.texSubImage2D(s.TEXTURE_2D,ce,0,0,Ve.width,Ve.height,Oe,et,Ve.data):t.texImage2D(s.TEXTURE_2D,ce,rt,Ve.width,Ve.height,0,Oe,et,Ve.data)}else if(R.isDataArrayTexture)if(ct){if(Pt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ne,rt,Ee.width,Ee.height,Ee.depth),q)if(R.layerUpdates.size>0){const ce=jm(Ee.width,Ee.height,R.format,R.type);for(const ve of R.layerUpdates){const Ie=Ee.data.subarray(ve*ce/Ee.data.BYTES_PER_ELEMENT,(ve+1)*ce/Ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ve,Ee.width,Ee.height,1,Oe,et,Ie)}R.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Ee.width,Ee.height,Ee.depth,Oe,et,Ee.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,rt,Ee.width,Ee.height,Ee.depth,0,Oe,et,Ee.data);else if(R.isData3DTexture)ct?(Pt&&t.texStorage3D(s.TEXTURE_3D,Ne,rt,Ee.width,Ee.height,Ee.depth),q&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Ee.width,Ee.height,Ee.depth,Oe,et,Ee.data)):t.texImage3D(s.TEXTURE_3D,0,rt,Ee.width,Ee.height,Ee.depth,0,Oe,et,Ee.data);else if(R.isFramebufferTexture){if(Pt)if(ct)t.texStorage2D(s.TEXTURE_2D,Ne,rt,Ee.width,Ee.height);else{let ce=Ee.width,ve=Ee.height;for(let Ie=0;Ie<Ne;Ie++)t.texImage2D(s.TEXTURE_2D,Ie,rt,ce,ve,0,Oe,et,null),ce>>=1,ve>>=1}}else if(xt.length>0){if(ct&&Pt){const ce=Le(xt[0]);t.texStorage2D(s.TEXTURE_2D,Ne,rt,ce.width,ce.height)}for(let ce=0,ve=xt.length;ce<ve;ce++)Ve=xt[ce],ct?q&&t.texSubImage2D(s.TEXTURE_2D,ce,0,0,Oe,et,Ve):t.texImage2D(s.TEXTURE_2D,ce,rt,Oe,et,Ve);R.generateMipmaps=!1}else if(ct){if(Pt){const ce=Le(Ee);t.texStorage2D(s.TEXTURE_2D,Ne,rt,ce.width,ce.height)}q&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Oe,et,Ee)}else t.texImage2D(s.TEXTURE_2D,0,rt,Oe,et,Ee);v(R)&&_(_e),je.__version=ge.version,R.onUpdate&&R.onUpdate(R)}k.__version=R.version}function ee(k,R,ne){if(R.image.length!==6)return;const _e=xe(k,R),ye=R.source;t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+ne);const ge=r.get(ye);if(ye.version!==ge.__version||_e===!0){t.activeTexture(s.TEXTURE0+ne);const je=Tt.getPrimaries(Tt.workingColorSpace),Re=R.colorSpace===wr?null:Tt.getPrimaries(R.colorSpace),Ue=R.colorSpace===wr||je===Re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,R.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,R.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);const ft=R.isCompressedTexture||R.image[0].isCompressedTexture,Ee=R.image[0]&&R.image[0].isDataTexture,Oe=[];for(let ve=0;ve<6;ve++)!ft&&!Ee?Oe[ve]=C(R.image[ve],!0,a.maxCubemapSize):Oe[ve]=Ee?R.image[ve].image:R.image[ve],Oe[ve]=Je(R,Oe[ve]);const et=Oe[0],rt=l.convert(R.format,R.colorSpace),Ve=l.convert(R.type),xt=U(R.internalFormat,rt,Ve,R.colorSpace),ct=R.isVideoTexture!==!0,Pt=ge.__version===void 0||_e===!0,q=ye.dataReady;let Ne=Y(R,et);H(s.TEXTURE_CUBE_MAP,R);let ce;if(ft){ct&&Pt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ne,xt,et.width,et.height);for(let ve=0;ve<6;ve++){ce=Oe[ve].mipmaps;for(let Ie=0;Ie<ce.length;Ie++){const ke=ce[Ie];R.format!==fi?rt!==null?ct?q&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ie,0,0,ke.width,ke.height,rt,ke.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ie,xt,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ct?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ie,0,0,ke.width,ke.height,rt,Ve,ke.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ie,xt,ke.width,ke.height,0,rt,Ve,ke.data)}}}else{if(ce=R.mipmaps,ct&&Pt){ce.length>0&&Ne++;const ve=Le(Oe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ne,xt,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(Ee){ct?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,Oe[ve].width,Oe[ve].height,rt,Ve,Oe[ve].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,xt,Oe[ve].width,Oe[ve].height,0,rt,Ve,Oe[ve].data);for(let Ie=0;Ie<ce.length;Ie++){const ut=ce[Ie].image[ve].image;ct?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ie+1,0,0,ut.width,ut.height,rt,Ve,ut.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ie+1,xt,ut.width,ut.height,0,rt,Ve,ut.data)}}else{ct?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,rt,Ve,Oe[ve]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,xt,rt,Ve,Oe[ve]);for(let Ie=0;Ie<ce.length;Ie++){const ke=ce[Ie];ct?q&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ie+1,0,0,rt,Ve,ke.image[ve]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Ie+1,xt,rt,Ve,ke.image[ve])}}}v(R)&&_(s.TEXTURE_CUBE_MAP),ge.__version=ye.version,R.onUpdate&&R.onUpdate(R)}k.__version=R.version}function ue(k,R,ne,_e,ye,ge){const je=l.convert(ne.format,ne.colorSpace),Re=l.convert(ne.type),Ue=U(ne.internalFormat,je,Re,ne.colorSpace),ft=r.get(R),Ee=r.get(ne);if(Ee.__renderTarget=R,!ft.__hasExternalTextures){const Oe=Math.max(1,R.width>>ge),et=Math.max(1,R.height>>ge);ye===s.TEXTURE_3D||ye===s.TEXTURE_2D_ARRAY?t.texImage3D(ye,ge,Ue,Oe,et,R.depth,0,je,Re,null):t.texImage2D(ye,ge,Ue,Oe,et,0,je,Re,null)}t.bindFramebuffer(s.FRAMEBUFFER,k),Qe(R)?u.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,_e,ye,Ee.__webglTexture,0,it(R)):(ye===s.TEXTURE_2D||ye>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ye<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,_e,ye,Ee.__webglTexture,ge),t.bindFramebuffer(s.FRAMEBUFFER,null)}function re(k,R,ne){if(s.bindRenderbuffer(s.RENDERBUFFER,k),R.depthBuffer){const _e=R.depthTexture,ye=_e&&_e.isDepthTexture?_e.type:null,ge=T(R.stencilBuffer,ye),je=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=it(R);Qe(R)?u.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Re,ge,R.width,R.height):ne?s.renderbufferStorageMultisample(s.RENDERBUFFER,Re,ge,R.width,R.height):s.renderbufferStorage(s.RENDERBUFFER,ge,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,je,s.RENDERBUFFER,k)}else{const _e=R.textures;for(let ye=0;ye<_e.length;ye++){const ge=_e[ye],je=l.convert(ge.format,ge.colorSpace),Re=l.convert(ge.type),Ue=U(ge.internalFormat,je,Re,ge.colorSpace),ft=it(R);ne&&Qe(R)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ft,Ue,R.width,R.height):Qe(R)?u.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ft,Ue,R.width,R.height):s.renderbufferStorage(s.RENDERBUFFER,Ue,R.width,R.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function me(k,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,k),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const _e=r.get(R.depthTexture);_e.__renderTarget=R,(!_e.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),pe(R.depthTexture,0);const ye=_e.__webglTexture,ge=it(R);if(R.depthTexture.format===Xs)Qe(R)?u.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ye,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ye,0);else if(R.depthTexture.format===eo)Qe(R)?u.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ye,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function we(k){const R=r.get(k),ne=k.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==k.depthTexture){const _e=k.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),_e){const ye=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,_e.removeEventListener("dispose",ye)};_e.addEventListener("dispose",ye),R.__depthDisposeCallback=ye}R.__boundDepthTexture=_e}if(k.depthTexture&&!R.__autoAllocateDepthBuffer){if(ne)throw new Error("target.depthTexture not supported in Cube render targets");me(R.__webglFramebuffer,k)}else if(ne){R.__webglDepthbuffer=[];for(let _e=0;_e<6;_e++)if(t.bindFramebuffer(s.FRAMEBUFFER,R.__webglFramebuffer[_e]),R.__webglDepthbuffer[_e]===void 0)R.__webglDepthbuffer[_e]=s.createRenderbuffer(),re(R.__webglDepthbuffer[_e],k,!1);else{const ye=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=R.__webglDepthbuffer[_e];s.bindRenderbuffer(s.RENDERBUFFER,ge),s.framebufferRenderbuffer(s.FRAMEBUFFER,ye,s.RENDERBUFFER,ge)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=s.createRenderbuffer(),re(R.__webglDepthbuffer,k,!1);else{const _e=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ye=R.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ye),s.framebufferRenderbuffer(s.FRAMEBUFFER,_e,s.RENDERBUFFER,ye)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Pe(k,R,ne){const _e=r.get(k);R!==void 0&&ue(_e.__webglFramebuffer,k,k.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),ne!==void 0&&we(k)}function Ze(k){const R=k.texture,ne=r.get(k),_e=r.get(R);k.addEventListener("dispose",I);const ye=k.textures,ge=k.isWebGLCubeRenderTarget===!0,je=ye.length>1;if(je||(_e.__webglTexture===void 0&&(_e.__webglTexture=s.createTexture()),_e.__version=R.version,d.memory.textures++),ge){ne.__webglFramebuffer=[];for(let Re=0;Re<6;Re++)if(R.mipmaps&&R.mipmaps.length>0){ne.__webglFramebuffer[Re]=[];for(let Ue=0;Ue<R.mipmaps.length;Ue++)ne.__webglFramebuffer[Re][Ue]=s.createFramebuffer()}else ne.__webglFramebuffer[Re]=s.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){ne.__webglFramebuffer=[];for(let Re=0;Re<R.mipmaps.length;Re++)ne.__webglFramebuffer[Re]=s.createFramebuffer()}else ne.__webglFramebuffer=s.createFramebuffer();if(je)for(let Re=0,Ue=ye.length;Re<Ue;Re++){const ft=r.get(ye[Re]);ft.__webglTexture===void 0&&(ft.__webglTexture=s.createTexture(),d.memory.textures++)}if(k.samples>0&&Qe(k)===!1){ne.__webglMultisampledFramebuffer=s.createFramebuffer(),ne.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,ne.__webglMultisampledFramebuffer);for(let Re=0;Re<ye.length;Re++){const Ue=ye[Re];ne.__webglColorRenderbuffer[Re]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,ne.__webglColorRenderbuffer[Re]);const ft=l.convert(Ue.format,Ue.colorSpace),Ee=l.convert(Ue.type),Oe=U(Ue.internalFormat,ft,Ee,Ue.colorSpace,k.isXRRenderTarget===!0),et=it(k);s.renderbufferStorageMultisample(s.RENDERBUFFER,et,Oe,k.width,k.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,ne.__webglColorRenderbuffer[Re])}s.bindRenderbuffer(s.RENDERBUFFER,null),k.depthBuffer&&(ne.__webglDepthRenderbuffer=s.createRenderbuffer(),re(ne.__webglDepthRenderbuffer,k,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ge){t.bindTexture(s.TEXTURE_CUBE_MAP,_e.__webglTexture),H(s.TEXTURE_CUBE_MAP,R);for(let Re=0;Re<6;Re++)if(R.mipmaps&&R.mipmaps.length>0)for(let Ue=0;Ue<R.mipmaps.length;Ue++)ue(ne.__webglFramebuffer[Re][Ue],k,R,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ue);else ue(ne.__webglFramebuffer[Re],k,R,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0);v(R)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(je){for(let Re=0,Ue=ye.length;Re<Ue;Re++){const ft=ye[Re],Ee=r.get(ft);t.bindTexture(s.TEXTURE_2D,Ee.__webglTexture),H(s.TEXTURE_2D,ft),ue(ne.__webglFramebuffer,k,ft,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,0),v(ft)&&_(s.TEXTURE_2D)}t.unbindTexture()}else{let Re=s.TEXTURE_2D;if((k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(Re=k.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Re,_e.__webglTexture),H(Re,R),R.mipmaps&&R.mipmaps.length>0)for(let Ue=0;Ue<R.mipmaps.length;Ue++)ue(ne.__webglFramebuffer[Ue],k,R,s.COLOR_ATTACHMENT0,Re,Ue);else ue(ne.__webglFramebuffer,k,R,s.COLOR_ATTACHMENT0,Re,0);v(R)&&_(Re),t.unbindTexture()}k.depthBuffer&&we(k)}function He(k){const R=k.textures;for(let ne=0,_e=R.length;ne<_e;ne++){const ye=R[ne];if(v(ye)){const ge=N(k),je=r.get(ye).__webglTexture;t.bindTexture(ge,je),_(ge),t.unbindTexture()}}}const st=[],B=[];function Mt(k){if(k.samples>0){if(Qe(k)===!1){const R=k.textures,ne=k.width,_e=k.height;let ye=s.COLOR_BUFFER_BIT;const ge=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,je=r.get(k),Re=R.length>1;if(Re)for(let Ue=0;Ue<R.length;Ue++)t.bindFramebuffer(s.FRAMEBUFFER,je.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,je.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,je.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,je.__webglFramebuffer);for(let Ue=0;Ue<R.length;Ue++){if(k.resolveDepthBuffer&&(k.depthBuffer&&(ye|=s.DEPTH_BUFFER_BIT),k.stencilBuffer&&k.resolveStencilBuffer&&(ye|=s.STENCIL_BUFFER_BIT)),Re){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,je.__webglColorRenderbuffer[Ue]);const ft=r.get(R[Ue]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ft,0)}s.blitFramebuffer(0,0,ne,_e,0,0,ne,_e,ye,s.NEAREST),h===!0&&(st.length=0,B.length=0,st.push(s.COLOR_ATTACHMENT0+Ue),k.depthBuffer&&k.resolveDepthBuffer===!1&&(st.push(ge),B.push(ge),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,B)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,st))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Re)for(let Ue=0;Ue<R.length;Ue++){t.bindFramebuffer(s.FRAMEBUFFER,je.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.RENDERBUFFER,je.__webglColorRenderbuffer[Ue]);const ft=r.get(R[Ue]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,je.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.TEXTURE_2D,ft,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,je.__webglMultisampledFramebuffer)}else if(k.depthBuffer&&k.resolveDepthBuffer===!1&&h){const R=k.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[R])}}}function it(k){return Math.min(a.maxSamples,k.samples)}function Qe(k){const R=r.get(k);return k.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Be(k){const R=d.render.frame;x.get(k)!==R&&(x.set(k,R),k.update())}function Je(k,R){const ne=k.colorSpace,_e=k.format,ye=k.type;return k.isCompressedTexture===!0||k.isVideoTexture===!0||ne!==io&&ne!==wr&&(Tt.getTransfer(ne)===Nt?(_e!==fi||ye!==Yi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ne)),R}function Le(k){return typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement?(p.width=k.naturalWidth||k.width,p.height=k.naturalHeight||k.height):typeof VideoFrame<"u"&&k instanceof VideoFrame?(p.width=k.displayWidth,p.height=k.displayHeight):(p.width=k.width,p.height=k.height),p}this.allocateTextureUnit=Q,this.resetTextureUnits=ie,this.setTexture2D=pe,this.setTexture2DArray=le,this.setTexture3D=he,this.setTextureCube=G,this.rebindTextures=Pe,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Qe}function ww(s,e){function t(r,a=wr){let l;const d=Tt.getTransfer(a);if(r===Yi)return s.UNSIGNED_BYTE;if(r===of)return s.UNSIGNED_SHORT_4_4_4_4;if(r===af)return s.UNSIGNED_SHORT_5_5_5_1;if(r===h0)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===d0)return s.BYTE;if(r===f0)return s.SHORT;if(r===$o)return s.UNSIGNED_SHORT;if(r===sf)return s.INT;if(r===ts)return s.UNSIGNED_INT;if(r===ji)return s.FLOAT;if(r===Ko)return s.HALF_FLOAT;if(r===p0)return s.ALPHA;if(r===m0)return s.RGB;if(r===fi)return s.RGBA;if(r===g0)return s.LUMINANCE;if(r===x0)return s.LUMINANCE_ALPHA;if(r===Xs)return s.DEPTH_COMPONENT;if(r===eo)return s.DEPTH_STENCIL;if(r===v0)return s.RED;if(r===lf)return s.RED_INTEGER;if(r===_0)return s.RG;if(r===cf)return s.RG_INTEGER;if(r===uf)return s.RGBA_INTEGER;if(r===Rl||r===Pl||r===Ll||r===Nl)if(d===Nt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===Rl)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Pl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ll)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Nl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===Rl)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Pl)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ll)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Nl)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ed||r===Td||r===bd||r===Cd)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===Ed)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Td)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===bd)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Cd)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ad||r===Rd||r===Pd)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===Ad||r===Rd)return d===Nt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Pd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Ld||r===Nd||r===Dd||r===kd||r===Id||r===Ud||r===Fd||r===Od||r===zd||r===Bd||r===Vd||r===Gd||r===Hd||r===jd)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===Ld)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Nd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Dd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===kd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Id)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ud)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Fd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Od)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===zd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Bd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Vd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Gd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Hd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===jd)return d===Nt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Dl||r===Wd||r===Xd)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Dl)return d===Nt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Wd)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Xd)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===y0||r===qd||r===Yd||r===$d)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===Dl)return l.COMPRESSED_RED_RGTC1_EXT;if(r===qd)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Yd)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===$d)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Qs?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}class Ew extends Bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class js extends ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Tw={type:"move"};class sd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new js,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new js,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new js,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let a=null,l=null,d=null;const u=this._targetRay,h=this._grip,p=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(p&&e.hand){d=!0;for(const C of e.hand.values()){const v=t.getJointPose(C,r),_=this._getHandJoint(p,C);v!==null&&(_.matrix.fromArray(v.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=v.radius),_.visible=v!==null}const x=p.joints["index-finger-tip"],y=p.joints["thumb-tip"],S=x.position.distanceTo(y.position),M=.02,A=.005;p.inputState.pinching&&S>M+A?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&S<=M-A&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));u!==null&&(a=t.getPose(e.targetRaySpace,r),a===null&&l!==null&&(a=l),a!==null&&(u.matrix.fromArray(a.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,a.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(a.linearVelocity)):u.hasLinearVelocity=!1,a.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(a.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(Tw)))}return u!==null&&(u.visible=a!==null),h!==null&&(h.visible=l!==null),p!==null&&(p.visible=d!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new js;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const bw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Aw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const a=new Dn,l=e.properties.get(a);l.__webglTexture=t.texture,(t.depthNear!=r.depthNear||t.depthFar!=r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new Cr({vertexShader:bw,fragmentShader:Cw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new sn(new Wl(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Rw extends ro{constructor(e,t){super();const r=this;let a=null,l=1,d=null,u="local-floor",h=1,p=null,x=null,y=null,S=null,M=null,A=null;const C=new Aw,v=t.getContextAttributes();let _=null,N=null;const U=[],T=[],Y=new At;let O=null;const I=new Bn;I.viewport=new Dt;const W=new Bn;W.viewport=new Dt;const L=[I,W],w=new Ew;let z=null,ie=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ee=U[X];return ee===void 0&&(ee=new sd,U[X]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(X){let ee=U[X];return ee===void 0&&(ee=new sd,U[X]=ee),ee.getGripSpace()},this.getHand=function(X){let ee=U[X];return ee===void 0&&(ee=new sd,U[X]=ee),ee.getHandSpace()};function Q(X){const ee=T.indexOf(X.inputSource);if(ee===-1)return;const ue=U[ee];ue!==void 0&&(ue.update(X.inputSource,X.frame,p||d),ue.dispatchEvent({type:X.type,data:X.inputSource}))}function de(){a.removeEventListener("select",Q),a.removeEventListener("selectstart",Q),a.removeEventListener("selectend",Q),a.removeEventListener("squeeze",Q),a.removeEventListener("squeezestart",Q),a.removeEventListener("squeezeend",Q),a.removeEventListener("end",de),a.removeEventListener("inputsourceschange",pe);for(let X=0;X<U.length;X++){const ee=T[X];ee!==null&&(T[X]=null,U[X].disconnect(ee))}z=null,ie=null,C.reset(),e.setRenderTarget(_),M=null,S=null,y=null,a=null,N=null,xe.stop(),r.isPresenting=!1,e.setPixelRatio(O),e.setSize(Y.width,Y.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){l=X,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){u=X,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||d},this.setReferenceSpace=function(X){p=X},this.getBaseLayer=function(){return S!==null?S:M},this.getBinding=function(){return y},this.getFrame=function(){return A},this.getSession=function(){return a},this.setSession=async function(X){if(a=X,a!==null){if(_=e.getRenderTarget(),a.addEventListener("select",Q),a.addEventListener("selectstart",Q),a.addEventListener("selectend",Q),a.addEventListener("squeeze",Q),a.addEventListener("squeezestart",Q),a.addEventListener("squeezeend",Q),a.addEventListener("end",de),a.addEventListener("inputsourceschange",pe),v.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(Y),a.renderState.layers===void 0){const ee={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:l};M=new XRWebGLLayer(a,t,ee),a.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),N=new ns(M.framebufferWidth,M.framebufferHeight,{format:fi,type:Yi,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let ee=null,ue=null,re=null;v.depth&&(re=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=v.stencil?eo:Xs,ue=v.stencil?Qs:ts);const me={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:l};y=new XRWebGLBinding(a,t),S=y.createProjectionLayer(me),a.updateRenderState({layers:[S]}),e.setPixelRatio(1),e.setSize(S.textureWidth,S.textureHeight,!1),N=new ns(S.textureWidth,S.textureHeight,{format:fi,type:Yi,depthTexture:new U0(S.textureWidth,S.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:S.ignoreDepthValues===!1})}N.isXRRenderTarget=!0,this.setFoveation(h),p=null,d=await a.requestReferenceSpace(u),xe.setContext(a),xe.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return C.getDepthTexture()};function pe(X){for(let ee=0;ee<X.removed.length;ee++){const ue=X.removed[ee],re=T.indexOf(ue);re>=0&&(T[re]=null,U[re].disconnect(ue))}for(let ee=0;ee<X.added.length;ee++){const ue=X.added[ee];let re=T.indexOf(ue);if(re===-1){for(let we=0;we<U.length;we++)if(we>=T.length){T.push(ue),re=we;break}else if(T[we]===null){T[we]=ue,re=we;break}if(re===-1)break}const me=U[re];me&&me.connect(ue)}}const le=new J,he=new J;function G(X,ee,ue){le.setFromMatrixPosition(ee.matrixWorld),he.setFromMatrixPosition(ue.matrixWorld);const re=le.distanceTo(he),me=ee.projectionMatrix.elements,we=ue.projectionMatrix.elements,Pe=me[14]/(me[10]-1),Ze=me[14]/(me[10]+1),He=(me[9]+1)/me[5],st=(me[9]-1)/me[5],B=(me[8]-1)/me[0],Mt=(we[8]+1)/we[0],it=Pe*B,Qe=Pe*Mt,Be=re/(-B+Mt),Je=Be*-B;if(ee.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Je),X.translateZ(Be),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),me[10]===-1)X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const Le=Pe+Be,k=Ze+Be,R=it-Je,ne=Qe+(re-Je),_e=He*Ze/k*Le,ye=st*Ze/k*Le;X.projectionMatrix.makePerspective(R,ne,_e,ye,Le,k),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function fe(X,ee){ee===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ee.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(a===null)return;let ee=X.near,ue=X.far;C.texture!==null&&(C.depthNear>0&&(ee=C.depthNear),C.depthFar>0&&(ue=C.depthFar)),w.near=W.near=I.near=ee,w.far=W.far=I.far=ue,(z!==w.near||ie!==w.far)&&(a.updateRenderState({depthNear:w.near,depthFar:w.far}),z=w.near,ie=w.far),I.layers.mask=X.layers.mask|2,W.layers.mask=X.layers.mask|4,w.layers.mask=I.layers.mask|W.layers.mask;const re=X.parent,me=w.cameras;fe(w,re);for(let we=0;we<me.length;we++)fe(me[we],re);me.length===2?G(w,I,W):w.projectionMatrix.copy(I.projectionMatrix),D(X,w,re)};function D(X,ee,ue){ue===null?X.matrix.copy(ee.matrixWorld):(X.matrix.copy(ue.matrixWorld),X.matrix.invert(),X.matrix.multiply(ee.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Kd*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(S===null&&M===null))return h},this.setFoveation=function(X){h=X,S!==null&&(S.fixedFoveation=X),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=X)},this.hasDepthSensing=function(){return C.texture!==null},this.getDepthSensingMesh=function(){return C.getMesh(w)};let E=null;function H(X,ee){if(x=ee.getViewerPose(p||d),A=ee,x!==null){const ue=x.views;M!==null&&(e.setRenderTargetFramebuffer(N,M.framebuffer),e.setRenderTarget(N));let re=!1;ue.length!==w.cameras.length&&(w.cameras.length=0,re=!0);for(let we=0;we<ue.length;we++){const Pe=ue[we];let Ze=null;if(M!==null)Ze=M.getViewport(Pe);else{const st=y.getViewSubImage(S,Pe);Ze=st.viewport,we===0&&(e.setRenderTargetTextures(N,st.colorTexture,S.ignoreDepthValues?void 0:st.depthStencilTexture),e.setRenderTarget(N))}let He=L[we];He===void 0&&(He=new Bn,He.layers.enable(we),He.viewport=new Dt,L[we]=He),He.matrix.fromArray(Pe.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Pe.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),we===0&&(w.matrix.copy(He.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),re===!0&&w.cameras.push(He)}const me=a.enabledFeatures;if(me&&me.includes("depth-sensing")){const we=y.getDepthInformation(ue[0]);we&&we.isValid&&we.texture&&C.init(e,we,a.renderState)}}for(let ue=0;ue<U.length;ue++){const re=T[ue],me=U[ue];re!==null&&me!==void 0&&me.update(re,ee,p||d)}E&&E(X,ee),ee.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:ee}),A=null}const xe=new k0;xe.setAnimationLoop(H),this.setAnimationLoop=function(X){E=X},this.dispose=function(){}}}const qr=new Ti,Pw=new Vt;function Lw(s,e){function t(v,_){v.matrixAutoUpdate===!0&&v.updateMatrix(),_.value.copy(v.matrix)}function r(v,_){_.color.getRGB(v.fogColor.value,L0(s)),_.isFog?(v.fogNear.value=_.near,v.fogFar.value=_.far):_.isFogExp2&&(v.fogDensity.value=_.density)}function a(v,_,N,U,T){_.isMeshBasicMaterial||_.isMeshLambertMaterial?l(v,_):_.isMeshToonMaterial?(l(v,_),y(v,_)):_.isMeshPhongMaterial?(l(v,_),x(v,_)):_.isMeshStandardMaterial?(l(v,_),S(v,_),_.isMeshPhysicalMaterial&&M(v,_,T)):_.isMeshMatcapMaterial?(l(v,_),A(v,_)):_.isMeshDepthMaterial?l(v,_):_.isMeshDistanceMaterial?(l(v,_),C(v,_)):_.isMeshNormalMaterial?l(v,_):_.isLineBasicMaterial?(d(v,_),_.isLineDashedMaterial&&u(v,_)):_.isPointsMaterial?h(v,_,N,U):_.isSpriteMaterial?p(v,_):_.isShadowMaterial?(v.color.value.copy(_.color),v.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function l(v,_){v.opacity.value=_.opacity,_.color&&v.diffuse.value.copy(_.color),_.emissive&&v.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(v.map.value=_.map,t(_.map,v.mapTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.bumpMap&&(v.bumpMap.value=_.bumpMap,t(_.bumpMap,v.bumpMapTransform),v.bumpScale.value=_.bumpScale,_.side===Nn&&(v.bumpScale.value*=-1)),_.normalMap&&(v.normalMap.value=_.normalMap,t(_.normalMap,v.normalMapTransform),v.normalScale.value.copy(_.normalScale),_.side===Nn&&v.normalScale.value.negate()),_.displacementMap&&(v.displacementMap.value=_.displacementMap,t(_.displacementMap,v.displacementMapTransform),v.displacementScale.value=_.displacementScale,v.displacementBias.value=_.displacementBias),_.emissiveMap&&(v.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,v.emissiveMapTransform)),_.specularMap&&(v.specularMap.value=_.specularMap,t(_.specularMap,v.specularMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest);const N=e.get(_),U=N.envMap,T=N.envMapRotation;U&&(v.envMap.value=U,qr.copy(T),qr.x*=-1,qr.y*=-1,qr.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),v.envMapRotation.value.setFromMatrix4(Pw.makeRotationFromEuler(qr)),v.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=_.reflectivity,v.ior.value=_.ior,v.refractionRatio.value=_.refractionRatio),_.lightMap&&(v.lightMap.value=_.lightMap,v.lightMapIntensity.value=_.lightMapIntensity,t(_.lightMap,v.lightMapTransform)),_.aoMap&&(v.aoMap.value=_.aoMap,v.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,v.aoMapTransform))}function d(v,_){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,_.map&&(v.map.value=_.map,t(_.map,v.mapTransform))}function u(v,_){v.dashSize.value=_.dashSize,v.totalSize.value=_.dashSize+_.gapSize,v.scale.value=_.scale}function h(v,_,N,U){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,v.size.value=_.size*N,v.scale.value=U*.5,_.map&&(v.map.value=_.map,t(_.map,v.uvTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest)}function p(v,_){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,v.rotation.value=_.rotation,_.map&&(v.map.value=_.map,t(_.map,v.mapTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest)}function x(v,_){v.specular.value.copy(_.specular),v.shininess.value=Math.max(_.shininess,1e-4)}function y(v,_){_.gradientMap&&(v.gradientMap.value=_.gradientMap)}function S(v,_){v.metalness.value=_.metalness,_.metalnessMap&&(v.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,v.metalnessMapTransform)),v.roughness.value=_.roughness,_.roughnessMap&&(v.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,v.roughnessMapTransform)),_.envMap&&(v.envMapIntensity.value=_.envMapIntensity)}function M(v,_,N){v.ior.value=_.ior,_.sheen>0&&(v.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),v.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(v.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,v.sheenColorMapTransform)),_.sheenRoughnessMap&&(v.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,v.sheenRoughnessMapTransform))),_.clearcoat>0&&(v.clearcoat.value=_.clearcoat,v.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(v.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,v.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(v.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Nn&&v.clearcoatNormalScale.value.negate())),_.dispersion>0&&(v.dispersion.value=_.dispersion),_.iridescence>0&&(v.iridescence.value=_.iridescence,v.iridescenceIOR.value=_.iridescenceIOR,v.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(v.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,v.iridescenceMapTransform)),_.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),_.transmission>0&&(v.transmission.value=_.transmission,v.transmissionSamplerMap.value=N.texture,v.transmissionSamplerSize.value.set(N.width,N.height),_.transmissionMap&&(v.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,v.transmissionMapTransform)),v.thickness.value=_.thickness,_.thicknessMap&&(v.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=_.attenuationDistance,v.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(v.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(v.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=_.specularIntensity,v.specularColor.value.copy(_.specularColor),_.specularColorMap&&(v.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,v.specularColorMapTransform)),_.specularIntensityMap&&(v.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,v.specularIntensityMapTransform))}function A(v,_){_.matcap&&(v.matcap.value=_.matcap)}function C(v,_){const N=e.get(_).light;v.referencePosition.value.setFromMatrixPosition(N.matrixWorld),v.nearDistance.value=N.shadow.camera.near,v.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function Nw(s,e,t,r){let a={},l={},d=[];const u=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(N,U){const T=U.program;r.uniformBlockBinding(N,T)}function p(N,U){let T=a[N.id];T===void 0&&(A(N),T=x(N),a[N.id]=T,N.addEventListener("dispose",v));const Y=U.program;r.updateUBOMapping(N,Y);const O=e.render.frame;l[N.id]!==O&&(S(N),l[N.id]=O)}function x(N){const U=y();N.__bindingPointIndex=U;const T=s.createBuffer(),Y=N.__size,O=N.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,Y,O),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,U,T),T}function y(){for(let N=0;N<u;N++)if(d.indexOf(N)===-1)return d.push(N),N;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function S(N){const U=a[N.id],T=N.uniforms,Y=N.__cache;s.bindBuffer(s.UNIFORM_BUFFER,U);for(let O=0,I=T.length;O<I;O++){const W=Array.isArray(T[O])?T[O]:[T[O]];for(let L=0,w=W.length;L<w;L++){const z=W[L];if(M(z,O,L,Y)===!0){const ie=z.__offset,Q=Array.isArray(z.value)?z.value:[z.value];let de=0;for(let pe=0;pe<Q.length;pe++){const le=Q[pe],he=C(le);typeof le=="number"||typeof le=="boolean"?(z.__data[0]=le,s.bufferSubData(s.UNIFORM_BUFFER,ie+de,z.__data)):le.isMatrix3?(z.__data[0]=le.elements[0],z.__data[1]=le.elements[1],z.__data[2]=le.elements[2],z.__data[3]=0,z.__data[4]=le.elements[3],z.__data[5]=le.elements[4],z.__data[6]=le.elements[5],z.__data[7]=0,z.__data[8]=le.elements[6],z.__data[9]=le.elements[7],z.__data[10]=le.elements[8],z.__data[11]=0):(le.toArray(z.__data,de),de+=he.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ie,z.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function M(N,U,T,Y){const O=N.value,I=U+"_"+T;if(Y[I]===void 0)return typeof O=="number"||typeof O=="boolean"?Y[I]=O:Y[I]=O.clone(),!0;{const W=Y[I];if(typeof O=="number"||typeof O=="boolean"){if(W!==O)return Y[I]=O,!0}else if(W.equals(O)===!1)return W.copy(O),!0}return!1}function A(N){const U=N.uniforms;let T=0;const Y=16;for(let I=0,W=U.length;I<W;I++){const L=Array.isArray(U[I])?U[I]:[U[I]];for(let w=0,z=L.length;w<z;w++){const ie=L[w],Q=Array.isArray(ie.value)?ie.value:[ie.value];for(let de=0,pe=Q.length;de<pe;de++){const le=Q[de],he=C(le),G=T%Y,fe=G%he.boundary,D=G+fe;T+=fe,D!==0&&Y-D<he.storage&&(T+=Y-D),ie.__data=new Float32Array(he.storage/Float32Array.BYTES_PER_ELEMENT),ie.__offset=T,T+=he.storage}}}const O=T%Y;return O>0&&(T+=Y-O),N.__size=T,N.__cache={},this}function C(N){const U={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(U.boundary=4,U.storage=4):N.isVector2?(U.boundary=8,U.storage=8):N.isVector3||N.isColor?(U.boundary=16,U.storage=12):N.isVector4?(U.boundary=16,U.storage=16):N.isMatrix3?(U.boundary=48,U.storage=48):N.isMatrix4?(U.boundary=64,U.storage=64):N.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",N),U}function v(N){const U=N.target;U.removeEventListener("dispose",v);const T=d.indexOf(U.__bindingPointIndex);d.splice(T,1),s.deleteBuffer(a[U.id]),delete a[U.id],delete l[U.id]}function _(){for(const N in a)s.deleteBuffer(a[N]);d=[],a={},l={}}return{bind:h,update:p,dispose:_}}class Dw{constructor(e={}){const{canvas:t=S_(),context:r=null,depth:a=!0,stencil:l=!1,alpha:d=!1,antialias:u=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:p=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:y=!1,reverseDepthBuffer:S=!1}=e;this.isWebGLRenderer=!0;let M;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=r.getContextAttributes().alpha}else M=d;const A=new Uint32Array(4),C=new Int32Array(4);let v=null,_=null;const N=[],U=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qn,this.toneMapping=Tr,this.toneMappingExposure=1;const T=this;let Y=!1,O=0,I=0,W=null,L=-1,w=null;const z=new Dt,ie=new Dt;let Q=null;const de=new St(0);let pe=0,le=t.width,he=t.height,G=1,fe=null,D=null;const E=new Dt(0,0,le,he),H=new Dt(0,0,le,he);let xe=!1;const X=new df;let ee=!1,ue=!1;const re=new Vt,me=new Vt,we=new J,Pe=new Dt,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function st(){return W===null?G:1}let B=r;function Mt(P,$){return t.getContext(P,$)}try{const P={alpha:!0,depth:a,stencil:l,antialias:u,premultipliedAlpha:h,preserveDrawingBuffer:p,powerPreference:x,failIfMajorPerformanceCaveat:y};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rf}`),t.addEventListener("webglcontextlost",ve,!1),t.addEventListener("webglcontextrestored",Ie,!1),t.addEventListener("webglcontextcreationerror",ke,!1),B===null){const $="webgl2";if(B=Mt($,P),B===null)throw Mt($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let it,Qe,Be,Je,Le,k,R,ne,_e,ye,ge,je,Re,Ue,ft,Ee,Oe,et,rt,Ve,xt,ct,Pt,q;function Ne(){it=new OS(B),it.init(),ct=new ww(B,it),Qe=new NS(B,it,e,ct),Be=new yw(B,it),Qe.reverseDepthBuffer&&S&&Be.buffers.depth.setReversed(!0),Je=new VS(B),Le=new sw,k=new Mw(B,it,Be,Le,Qe,ct,Je),R=new kS(T),ne=new FS(T),_e=new Y_(B),Pt=new PS(B,_e),ye=new zS(B,_e,Je,Pt),ge=new HS(B,ye,_e,Je),rt=new GS(B,Qe,k),Ee=new DS(Le),je=new rw(T,R,ne,it,Qe,Pt,Ee),Re=new Lw(T,Le),Ue=new aw,ft=new hw(it),et=new RS(T,R,ne,Be,ge,M,h),Oe=new vw(T,ge,Qe),q=new Nw(B,Je,Qe,Be),Ve=new LS(B,it,Je),xt=new BS(B,it,Je),Je.programs=je.programs,T.capabilities=Qe,T.extensions=it,T.properties=Le,T.renderLists=Ue,T.shadowMap=Oe,T.state=Be,T.info=Je}Ne();const ce=new Rw(T,B);this.xr=ce,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const P=it.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=it.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(P){P!==void 0&&(G=P,this.setSize(le,he,!1))},this.getSize=function(P){return P.set(le,he)},this.setSize=function(P,$,oe=!0){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}le=P,he=$,t.width=Math.floor(P*G),t.height=Math.floor($*G),oe===!0&&(t.style.width=P+"px",t.style.height=$+"px"),this.setViewport(0,0,P,$)},this.getDrawingBufferSize=function(P){return P.set(le*G,he*G).floor()},this.setDrawingBufferSize=function(P,$,oe){le=P,he=$,G=oe,t.width=Math.floor(P*oe),t.height=Math.floor($*oe),this.setViewport(0,0,P,$)},this.getCurrentViewport=function(P){return P.copy(z)},this.getViewport=function(P){return P.copy(E)},this.setViewport=function(P,$,oe,ae){P.isVector4?E.set(P.x,P.y,P.z,P.w):E.set(P,$,oe,ae),Be.viewport(z.copy(E).multiplyScalar(G).round())},this.getScissor=function(P){return P.copy(H)},this.setScissor=function(P,$,oe,ae){P.isVector4?H.set(P.x,P.y,P.z,P.w):H.set(P,$,oe,ae),Be.scissor(ie.copy(H).multiplyScalar(G).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(P){Be.setScissorTest(xe=P)},this.setOpaqueSort=function(P){fe=P},this.setTransparentSort=function(P){D=P},this.getClearColor=function(P){return P.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor.apply(et,arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha.apply(et,arguments)},this.clear=function(P=!0,$=!0,oe=!0){let ae=0;if(P){let K=!1;if(W!==null){const Ae=W.texture.format;K=Ae===uf||Ae===cf||Ae===lf}if(K){const Ae=W.texture.type,be=Ae===Yi||Ae===ts||Ae===$o||Ae===Qs||Ae===of||Ae===af,qe=et.getClearColor(),We=et.getClearAlpha(),ot=qe.r,lt=qe.g,Ye=qe.b;be?(A[0]=ot,A[1]=lt,A[2]=Ye,A[3]=We,B.clearBufferuiv(B.COLOR,0,A)):(C[0]=ot,C[1]=lt,C[2]=Ye,C[3]=We,B.clearBufferiv(B.COLOR,0,C))}else ae|=B.COLOR_BUFFER_BIT}$&&(ae|=B.DEPTH_BUFFER_BIT),oe&&(ae|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ve,!1),t.removeEventListener("webglcontextrestored",Ie,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),Ue.dispose(),ft.dispose(),Le.dispose(),R.dispose(),ne.dispose(),ge.dispose(),Pt.dispose(),q.dispose(),je.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",is),ce.removeEventListener("sessionend",$i),bi.stop()};function ve(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),Y=!0}function Ie(){console.log("THREE.WebGLRenderer: Context Restored."),Y=!1;const P=Je.autoReset,$=Oe.enabled,oe=Oe.autoUpdate,ae=Oe.needsUpdate,K=Oe.type;Ne(),Je.autoReset=P,Oe.enabled=$,Oe.autoUpdate=oe,Oe.needsUpdate=ae,Oe.type=K}function ke(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function ut(P){const $=P.target;$.removeEventListener("dispose",ut),Ut($)}function Ut(P){Yt(P),Le.remove(P)}function Yt(P){const $=Le.get(P).programs;$!==void 0&&($.forEach(function(oe){je.releaseProgram(oe)}),P.isShaderMaterial&&je.releaseShaderCache(P))}this.renderBufferDirect=function(P,$,oe,ae,K,Ae){$===null&&($=Ze);const be=K.isMesh&&K.matrixWorld.determinant()<0,qe=na(P,$,oe,ae,K);Be.setMaterial(ae,be);let We=oe.index,ot=1;if(ae.wireframe===!0){if(We=ye.getWireframeAttribute(oe),We===void 0)return;ot=2}const lt=oe.drawRange,Ye=oe.attributes.position;let yt=lt.start*ot,Rt=(lt.start+lt.count)*ot;Ae!==null&&(yt=Math.max(yt,Ae.start*ot),Rt=Math.min(Rt,(Ae.start+Ae.count)*ot)),We!==null?(yt=Math.max(yt,0),Rt=Math.min(Rt,We.count)):Ye!=null&&(yt=Math.max(yt,0),Rt=Math.min(Rt,Ye.count));const _t=Rt-yt;if(_t<0||_t===1/0)return;Pt.setup(K,ae,qe,oe,We);let cn,ht=Ve;if(We!==null&&(cn=_e.get(We),ht=xt,ht.setIndex(cn)),K.isMesh)ae.wireframe===!0?(Be.setLineWidth(ae.wireframeLinewidth*st()),ht.setMode(B.LINES)):ht.setMode(B.TRIANGLES);else if(K.isLine){let Ke=ae.linewidth;Ke===void 0&&(Ke=1),Be.setLineWidth(Ke*st()),K.isLineSegments?ht.setMode(B.LINES):K.isLineLoop?ht.setMode(B.LINE_LOOP):ht.setMode(B.LINE_STRIP)}else K.isPoints?ht.setMode(B.POINTS):K.isSprite&&ht.setMode(B.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)ht.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))ht.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Ke=K._multiDrawStarts,ei=K._multiDrawCounts,bt=K._multiDrawCount,un=We?_e.get(We).bytesPerElement:1,ti=Le.get(ae).currentProgram.getUniforms();for(let $t=0;$t<bt;$t++)ti.setValue(B,"_gl_DrawID",$t),ht.render(Ke[$t]/un,ei[$t])}else if(K.isInstancedMesh)ht.renderInstances(yt,_t,K.count);else if(oe.isInstancedBufferGeometry){const Ke=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,ei=Math.min(oe.instanceCount,Ke);ht.renderInstances(yt,_t,ei)}else ht.render(yt,_t)};function wt(P,$,oe){P.transparent===!0&&P.side===Hi&&P.forceSinglePass===!1?(P.side=Nn,P.needsUpdate=!0,rs(P,$,oe),P.side=br,P.needsUpdate=!0,rs(P,$,oe),P.side=Hi):rs(P,$,oe)}this.compile=function(P,$,oe=null){oe===null&&(oe=P),_=ft.get(oe),_.init($),U.push(_),oe.traverseVisible(function(K){K.isLight&&K.layers.test($.layers)&&(_.pushLight(K),K.castShadow&&_.pushShadow(K))}),P!==oe&&P.traverseVisible(function(K){K.isLight&&K.layers.test($.layers)&&(_.pushLight(K),K.castShadow&&_.pushShadow(K))}),_.setupLights();const ae=new Set;return P.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Ae=K.material;if(Ae)if(Array.isArray(Ae))for(let be=0;be<Ae.length;be++){const qe=Ae[be];wt(qe,oe,K),ae.add(qe)}else wt(Ae,oe,K),ae.add(Ae)}),U.pop(),_=null,ae},this.compileAsync=function(P,$,oe=null){const ae=this.compile(P,$,oe);return new Promise(K=>{function Ae(){if(ae.forEach(function(be){Le.get(be).currentProgram.isReady()&&ae.delete(be)}),ae.size===0){K(P);return}setTimeout(Ae,10)}it.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let Mn=null;function xn(P){Mn&&Mn(P)}function is(){bi.stop()}function $i(){bi.start()}const bi=new k0;bi.setAnimationLoop(xn),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(P){Mn=P,ce.setAnimationLoop(P),P===null?bi.stop():bi.start()},ce.addEventListener("sessionstart",is),ce.addEventListener("sessionend",$i),this.render=function(P,$){if($!==void 0&&$.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Y===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera($),$=ce.getCamera()),P.isScene===!0&&P.onBeforeRender(T,P,$,W),_=ft.get(P,U.length),_.init($),U.push(_),me.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),X.setFromProjectionMatrix(me),ue=this.localClippingEnabled,ee=Ee.init(this.clippingPlanes,ue),v=Ue.get(P,N.length),v.init(),N.push(v),ce.enabled===!0&&ce.isPresenting===!0){const Ae=T.xr.getDepthSensingMesh();Ae!==null&&Ci(Ae,$,-1/0,T.sortObjects)}Ci(P,$,0,T.sortObjects),v.finish(),T.sortObjects===!0&&v.sort(fe,D),He=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,He&&et.addToRenderList(v,P),this.info.render.frame++,ee===!0&&Ee.beginShadows();const oe=_.state.shadowsArray;Oe.render(oe,P,$),ee===!0&&Ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const ae=v.opaque,K=v.transmissive;if(_.setupLights(),$.isArrayCamera){const Ae=$.cameras;if(K.length>0)for(let be=0,qe=Ae.length;be<qe;be++){const We=Ae[be];Rr(ae,K,P,We)}He&&et.render(P);for(let be=0,qe=Ae.length;be<qe;be++){const We=Ae[be];Ar(v,P,We,We.viewport)}}else K.length>0&&Rr(ae,K,P,$),He&&et.render(P),Ar(v,P,$);W!==null&&(k.updateMultisampleRenderTarget(W),k.updateRenderTargetMipmap(W)),P.isScene===!0&&P.onAfterRender(T,P,$),Pt.resetDefaultState(),L=-1,w=null,U.pop(),U.length>0?(_=U[U.length-1],ee===!0&&Ee.setGlobalState(T.clippingPlanes,_.state.camera)):_=null,N.pop(),N.length>0?v=N[N.length-1]:v=null};function Ci(P,$,oe,ae){if(P.visible===!1)return;if(P.layers.test($.layers)){if(P.isGroup)oe=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update($);else if(P.isLight)_.pushLight(P),P.castShadow&&_.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||X.intersectsSprite(P)){ae&&Pe.setFromMatrixPosition(P.matrixWorld).applyMatrix4(me);const be=ge.update(P),qe=P.material;qe.visible&&v.push(P,be,qe,oe,Pe.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||X.intersectsObject(P))){const be=ge.update(P),qe=P.material;if(ae&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Pe.copy(P.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Pe.copy(be.boundingSphere.center)),Pe.applyMatrix4(P.matrixWorld).applyMatrix4(me)),Array.isArray(qe)){const We=be.groups;for(let ot=0,lt=We.length;ot<lt;ot++){const Ye=We[ot],yt=qe[Ye.materialIndex];yt&&yt.visible&&v.push(P,be,yt,oe,Pe.z,Ye)}}else qe.visible&&v.push(P,be,qe,oe,Pe.z,null)}}const Ae=P.children;for(let be=0,qe=Ae.length;be<qe;be++)Ci(Ae[be],$,oe,ae)}function Ar(P,$,oe,ae){const K=P.opaque,Ae=P.transmissive,be=P.transparent;_.setupLightsView(oe),ee===!0&&Ee.setGlobalState(T.clippingPlanes,oe),ae&&Be.viewport(z.copy(ae)),K.length>0&&Ki(K,$,oe),Ae.length>0&&Ki(Ae,$,oe),be.length>0&&Ki(be,$,oe),Be.buffers.depth.setTest(!0),Be.buffers.depth.setMask(!0),Be.buffers.color.setMask(!0),Be.setPolygonOffset(!1)}function Rr(P,$,oe,ae){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[ae.id]===void 0&&(_.state.transmissionRenderTarget[ae.id]=new ns(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?Ko:Yi,minFilter:Qr,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Tt.workingColorSpace}));const Ae=_.state.transmissionRenderTarget[ae.id],be=ae.viewport||z;Ae.setSize(be.z,be.w);const qe=T.getRenderTarget();T.setRenderTarget(Ae),T.getClearColor(de),pe=T.getClearAlpha(),pe<1&&T.setClearColor(16777215,.5),T.clear(),He&&et.render(oe);const We=T.toneMapping;T.toneMapping=Tr;const ot=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),_.setupLightsView(ae),ee===!0&&Ee.setGlobalState(T.clippingPlanes,ae),Ki(P,oe,ae),k.updateMultisampleRenderTarget(Ae),k.updateRenderTargetMipmap(Ae),it.has("WEBGL_multisampled_render_to_texture")===!1){let lt=!1;for(let Ye=0,yt=$.length;Ye<yt;Ye++){const Rt=$[Ye],_t=Rt.object,cn=Rt.geometry,ht=Rt.material,Ke=Rt.group;if(ht.side===Hi&&_t.layers.test(ae.layers)){const ei=ht.side;ht.side=Nn,ht.needsUpdate=!0,ea(_t,oe,ae,cn,ht,Ke),ht.side=ei,ht.needsUpdate=!0,lt=!0}}lt===!0&&(k.updateMultisampleRenderTarget(Ae),k.updateRenderTargetMipmap(Ae))}T.setRenderTarget(qe),T.setClearColor(de,pe),ot!==void 0&&(ae.viewport=ot),T.toneMapping=We}function Ki(P,$,oe){const ae=$.isScene===!0?$.overrideMaterial:null;for(let K=0,Ae=P.length;K<Ae;K++){const be=P[K],qe=be.object,We=be.geometry,ot=ae===null?be.material:ae,lt=be.group;qe.layers.test(oe.layers)&&ea(qe,$,oe,We,ot,lt)}}function ea(P,$,oe,ae,K,Ae){P.onBeforeRender(T,$,oe,ae,K,Ae),P.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),K.onBeforeRender(T,$,oe,ae,P,Ae),K.transparent===!0&&K.side===Hi&&K.forceSinglePass===!1?(K.side=Nn,K.needsUpdate=!0,T.renderBufferDirect(oe,$,ae,K,P,Ae),K.side=br,K.needsUpdate=!0,T.renderBufferDirect(oe,$,ae,K,P,Ae),K.side=Hi):T.renderBufferDirect(oe,$,ae,K,P,Ae),P.onAfterRender(T,$,oe,ae,K,Ae)}function rs(P,$,oe){$.isScene!==!0&&($=Ze);const ae=Le.get(P),K=_.state.lights,Ae=_.state.shadowsArray,be=K.state.version,qe=je.getParameters(P,K.state,Ae,$,oe),We=je.getProgramCacheKey(qe);let ot=ae.programs;ae.environment=P.isMeshStandardMaterial?$.environment:null,ae.fog=$.fog,ae.envMap=(P.isMeshStandardMaterial?ne:R).get(P.envMap||ae.environment),ae.envMapRotation=ae.environment!==null&&P.envMap===null?$.environmentRotation:P.envMapRotation,ot===void 0&&(P.addEventListener("dispose",ut),ot=new Map,ae.programs=ot);let lt=ot.get(We);if(lt!==void 0){if(ae.currentProgram===lt&&ae.lightsStateVersion===be)return gi(P,qe),lt}else qe.uniforms=je.getUniforms(P),P.onBeforeCompile(qe,T),lt=je.acquireProgram(qe,We),ot.set(We,lt),ae.uniforms=qe.uniforms;const Ye=ae.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Ye.clippingPlanes=Ee.uniform),gi(P,qe),ae.needsLights=ql(P),ae.lightsStateVersion=be,ae.needsLights&&(Ye.ambientLightColor.value=K.state.ambient,Ye.lightProbe.value=K.state.probe,Ye.directionalLights.value=K.state.directional,Ye.directionalLightShadows.value=K.state.directionalShadow,Ye.spotLights.value=K.state.spot,Ye.spotLightShadows.value=K.state.spotShadow,Ye.rectAreaLights.value=K.state.rectArea,Ye.ltc_1.value=K.state.rectAreaLTC1,Ye.ltc_2.value=K.state.rectAreaLTC2,Ye.pointLights.value=K.state.point,Ye.pointLightShadows.value=K.state.pointShadow,Ye.hemisphereLights.value=K.state.hemi,Ye.directionalShadowMap.value=K.state.directionalShadowMap,Ye.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ye.spotShadowMap.value=K.state.spotShadowMap,Ye.spotLightMatrix.value=K.state.spotLightMatrix,Ye.spotLightMap.value=K.state.spotLightMap,Ye.pointShadowMap.value=K.state.pointShadowMap,Ye.pointShadowMatrix.value=K.state.pointShadowMatrix),ae.currentProgram=lt,ae.uniformsList=null,lt}function ta(P){if(P.uniformsList===null){const $=P.currentProgram.getUniforms();P.uniformsList=kl.seqWithValue($.seq,P.uniforms)}return P.uniformsList}function gi(P,$){const oe=Le.get(P);oe.outputColorSpace=$.outputColorSpace,oe.batching=$.batching,oe.batchingColor=$.batchingColor,oe.instancing=$.instancing,oe.instancingColor=$.instancingColor,oe.instancingMorph=$.instancingMorph,oe.skinning=$.skinning,oe.morphTargets=$.morphTargets,oe.morphNormals=$.morphNormals,oe.morphColors=$.morphColors,oe.morphTargetsCount=$.morphTargetsCount,oe.numClippingPlanes=$.numClippingPlanes,oe.numIntersection=$.numClipIntersection,oe.vertexAlphas=$.vertexAlphas,oe.vertexTangents=$.vertexTangents,oe.toneMapping=$.toneMapping}function na(P,$,oe,ae,K){$.isScene!==!0&&($=Ze),k.resetTextureUnits();const Ae=$.fog,be=ae.isMeshStandardMaterial?$.environment:null,qe=W===null?T.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:io,We=(ae.isMeshStandardMaterial?ne:R).get(ae.envMap||be),ot=ae.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,lt=!!oe.attributes.tangent&&(!!ae.normalMap||ae.anisotropy>0),Ye=!!oe.morphAttributes.position,yt=!!oe.morphAttributes.normal,Rt=!!oe.morphAttributes.color;let _t=Tr;ae.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(_t=T.toneMapping);const cn=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,ht=cn!==void 0?cn.length:0,Ke=Le.get(ae),ei=_.state.lights;if(ee===!0&&(ue===!0||P!==w)){const vn=P===w&&ae.id===L;Ee.setState(ae,P,vn)}let bt=!1;ae.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==ei.state.version||Ke.outputColorSpace!==qe||K.isBatchedMesh&&Ke.batching===!1||!K.isBatchedMesh&&Ke.batching===!0||K.isBatchedMesh&&Ke.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Ke.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Ke.instancing===!1||!K.isInstancedMesh&&Ke.instancing===!0||K.isSkinnedMesh&&Ke.skinning===!1||!K.isSkinnedMesh&&Ke.skinning===!0||K.isInstancedMesh&&Ke.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ke.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ke.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ke.instancingMorph===!1&&K.morphTexture!==null||Ke.envMap!==We||ae.fog===!0&&Ke.fog!==Ae||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==Ee.numPlanes||Ke.numIntersection!==Ee.numIntersection)||Ke.vertexAlphas!==ot||Ke.vertexTangents!==lt||Ke.morphTargets!==Ye||Ke.morphNormals!==yt||Ke.morphColors!==Rt||Ke.toneMapping!==_t||Ke.morphTargetsCount!==ht)&&(bt=!0):(bt=!0,Ke.__version=ae.version);let un=Ke.currentProgram;bt===!0&&(un=rs(ae,$,K));let ti=!1,$t=!1,xi=!1;const kt=un.getUniforms(),Gn=Ke.uniforms;if(Be.useProgram(un.program)&&(ti=!0,$t=!0,xi=!0),ae.id!==L&&(L=ae.id,$t=!0),ti||w!==P){Be.buffers.depth.getReversed()?(re.copy(P.projectionMatrix),w_(re),E_(re),kt.setValue(B,"projectionMatrix",re)):kt.setValue(B,"projectionMatrix",P.projectionMatrix),kt.setValue(B,"viewMatrix",P.matrixWorldInverse);const Hn=kt.map.cameraPosition;Hn!==void 0&&Hn.setValue(B,we.setFromMatrixPosition(P.matrixWorld)),Qe.logarithmicDepthBuffer&&kt.setValue(B,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(ae.isMeshPhongMaterial||ae.isMeshToonMaterial||ae.isMeshLambertMaterial||ae.isMeshBasicMaterial||ae.isMeshStandardMaterial||ae.isShaderMaterial)&&kt.setValue(B,"isOrthographic",P.isOrthographicCamera===!0),w!==P&&(w=P,$t=!0,xi=!0)}if(K.isSkinnedMesh){kt.setOptional(B,K,"bindMatrix"),kt.setOptional(B,K,"bindMatrixInverse");const vn=K.skeleton;vn&&(vn.boneTexture===null&&vn.computeBoneTexture(),kt.setValue(B,"boneTexture",vn.boneTexture,k))}K.isBatchedMesh&&(kt.setOptional(B,K,"batchingTexture"),kt.setValue(B,"batchingTexture",K._matricesTexture,k),kt.setOptional(B,K,"batchingIdTexture"),kt.setValue(B,"batchingIdTexture",K._indirectTexture,k),kt.setOptional(B,K,"batchingColorTexture"),K._colorsTexture!==null&&kt.setValue(B,"batchingColorTexture",K._colorsTexture,k));const Ai=oe.morphAttributes;if((Ai.position!==void 0||Ai.normal!==void 0||Ai.color!==void 0)&&rt.update(K,oe,un),($t||Ke.receiveShadow!==K.receiveShadow)&&(Ke.receiveShadow=K.receiveShadow,kt.setValue(B,"receiveShadow",K.receiveShadow)),ae.isMeshGouraudMaterial&&ae.envMap!==null&&(Gn.envMap.value=We,Gn.flipEnvMap.value=We.isCubeTexture&&We.isRenderTargetTexture===!1?-1:1),ae.isMeshStandardMaterial&&ae.envMap===null&&$.environment!==null&&(Gn.envMapIntensity.value=$.environmentIntensity),$t&&(kt.setValue(B,"toneMappingExposure",T.toneMappingExposure),Ke.needsLights&&ia(Gn,xi),Ae&&ae.fog===!0&&Re.refreshFogUniforms(Gn,Ae),Re.refreshMaterialUniforms(Gn,ae,G,he,_.state.transmissionRenderTarget[P.id]),kl.upload(B,ta(Ke),Gn,k)),ae.isShaderMaterial&&ae.uniformsNeedUpdate===!0&&(kl.upload(B,ta(Ke),Gn,k),ae.uniformsNeedUpdate=!1),ae.isSpriteMaterial&&kt.setValue(B,"center",K.center),kt.setValue(B,"modelViewMatrix",K.modelViewMatrix),kt.setValue(B,"normalMatrix",K.normalMatrix),kt.setValue(B,"modelMatrix",K.matrixWorld),ae.isShaderMaterial||ae.isRawShaderMaterial){const vn=ae.uniformsGroups;for(let Hn=0,wn=vn.length;Hn<wn;Hn++){const ra=vn[Hn];q.update(ra,un),q.bind(ra,un)}}return un}function ia(P,$){P.ambientLightColor.needsUpdate=$,P.lightProbe.needsUpdate=$,P.directionalLights.needsUpdate=$,P.directionalLightShadows.needsUpdate=$,P.pointLights.needsUpdate=$,P.pointLightShadows.needsUpdate=$,P.spotLights.needsUpdate=$,P.spotLightShadows.needsUpdate=$,P.rectAreaLights.needsUpdate=$,P.hemisphereLights.needsUpdate=$}function ql(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(P,$,oe){Le.get(P.texture).__webglTexture=$,Le.get(P.depthTexture).__webglTexture=oe;const ae=Le.get(P);ae.__hasExternalTextures=!0,ae.__autoAllocateDepthBuffer=oe===void 0,ae.__autoAllocateDepthBuffer||it.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ae.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,$){const oe=Le.get(P);oe.__webglFramebuffer=$,oe.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(P,$=0,oe=0){W=P,O=$,I=oe;let ae=!0,K=null,Ae=!1,be=!1;if(P){const We=Le.get(P);if(We.__useDefaultFramebuffer!==void 0)Be.bindFramebuffer(B.FRAMEBUFFER,null),ae=!1;else if(We.__webglFramebuffer===void 0)k.setupRenderTarget(P);else if(We.__hasExternalTextures)k.rebindTextures(P,Le.get(P.texture).__webglTexture,Le.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const Ye=P.depthTexture;if(We.__boundDepthTexture!==Ye){if(Ye!==null&&Le.has(Ye)&&(P.width!==Ye.image.width||P.height!==Ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(P)}}const ot=P.texture;(ot.isData3DTexture||ot.isDataArrayTexture||ot.isCompressedArrayTexture)&&(be=!0);const lt=Le.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(lt[$])?K=lt[$][oe]:K=lt[$],Ae=!0):P.samples>0&&k.useMultisampledRTT(P)===!1?K=Le.get(P).__webglMultisampledFramebuffer:Array.isArray(lt)?K=lt[oe]:K=lt,z.copy(P.viewport),ie.copy(P.scissor),Q=P.scissorTest}else z.copy(E).multiplyScalar(G).floor(),ie.copy(H).multiplyScalar(G).floor(),Q=xe;if(Be.bindFramebuffer(B.FRAMEBUFFER,K)&&ae&&Be.drawBuffers(P,K),Be.viewport(z),Be.scissor(ie),Be.setScissorTest(Q),Ae){const We=Le.get(P.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+$,We.__webglTexture,oe)}else if(be){const We=Le.get(P.texture),ot=$||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,We.__webglTexture,oe||0,ot)}L=-1},this.readRenderTargetPixels=function(P,$,oe,ae,K,Ae,be){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qe=Le.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&be!==void 0&&(qe=qe[be]),qe){Be.bindFramebuffer(B.FRAMEBUFFER,qe);try{const We=P.texture,ot=We.format,lt=We.type;if(!Qe.textureFormatReadable(ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Qe.textureTypeReadable(lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=P.width-ae&&oe>=0&&oe<=P.height-K&&B.readPixels($,oe,ae,K,ct.convert(ot),ct.convert(lt),Ae)}finally{const We=W!==null?Le.get(W).__webglFramebuffer:null;Be.bindFramebuffer(B.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(P,$,oe,ae,K,Ae,be){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let qe=Le.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&be!==void 0&&(qe=qe[be]),qe){const We=P.texture,ot=We.format,lt=We.type;if(!Qe.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Qe.textureTypeReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if($>=0&&$<=P.width-ae&&oe>=0&&oe<=P.height-K){Be.bindFramebuffer(B.FRAMEBUFFER,qe);const Ye=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Ye),B.bufferData(B.PIXEL_PACK_BUFFER,Ae.byteLength,B.STREAM_READ),B.readPixels($,oe,ae,K,ct.convert(ot),ct.convert(lt),0);const yt=W!==null?Le.get(W).__webglFramebuffer:null;Be.bindFramebuffer(B.FRAMEBUFFER,yt);const Rt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await M_(B,Rt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Ye),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Ae),B.deleteBuffer(Ye),B.deleteSync(Rt),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,$=null,oe=0){P.isTexture!==!0&&(Xo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),$=arguments[0]||null,P=arguments[1]);const ae=Math.pow(2,-oe),K=Math.floor(P.image.width*ae),Ae=Math.floor(P.image.height*ae),be=$!==null?$.x:0,qe=$!==null?$.y:0;k.setTexture2D(P,0),B.copyTexSubImage2D(B.TEXTURE_2D,oe,0,0,be,qe,K,Ae),Be.unbindTexture()},this.copyTextureToTexture=function(P,$,oe=null,ae=null,K=0){P.isTexture!==!0&&(Xo("WebGLRenderer: copyTextureToTexture function signature has changed."),ae=arguments[0]||null,P=arguments[1],$=arguments[2],K=arguments[3]||0,oe=null);let Ae,be,qe,We,ot,lt,Ye,yt,Rt;const _t=P.isCompressedTexture?P.mipmaps[K]:P.image;oe!==null?(Ae=oe.max.x-oe.min.x,be=oe.max.y-oe.min.y,qe=oe.isBox3?oe.max.z-oe.min.z:1,We=oe.min.x,ot=oe.min.y,lt=oe.isBox3?oe.min.z:0):(Ae=_t.width,be=_t.height,qe=_t.depth||1,We=0,ot=0,lt=0),ae!==null?(Ye=ae.x,yt=ae.y,Rt=ae.z):(Ye=0,yt=0,Rt=0);const cn=ct.convert($.format),ht=ct.convert($.type);let Ke;$.isData3DTexture?(k.setTexture3D($,0),Ke=B.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(k.setTexture2DArray($,0),Ke=B.TEXTURE_2D_ARRAY):(k.setTexture2D($,0),Ke=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,$.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,$.unpackAlignment);const ei=B.getParameter(B.UNPACK_ROW_LENGTH),bt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),un=B.getParameter(B.UNPACK_SKIP_PIXELS),ti=B.getParameter(B.UNPACK_SKIP_ROWS),$t=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,_t.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,_t.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,We),B.pixelStorei(B.UNPACK_SKIP_ROWS,ot),B.pixelStorei(B.UNPACK_SKIP_IMAGES,lt);const xi=P.isDataArrayTexture||P.isData3DTexture,kt=$.isDataArrayTexture||$.isData3DTexture;if(P.isRenderTargetTexture||P.isDepthTexture){const Gn=Le.get(P),Ai=Le.get($),vn=Le.get(Gn.__renderTarget),Hn=Le.get(Ai.__renderTarget);Be.bindFramebuffer(B.READ_FRAMEBUFFER,vn.__webglFramebuffer),Be.bindFramebuffer(B.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let wn=0;wn<qe;wn++)xi&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Le.get(P).__webglTexture,K,lt+wn),P.isDepthTexture?(kt&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Le.get($).__webglTexture,K,Rt+wn),B.blitFramebuffer(We,ot,Ae,be,Ye,yt,Ae,be,B.DEPTH_BUFFER_BIT,B.NEAREST)):kt?B.copyTexSubImage3D(Ke,K,Ye,yt,Rt+wn,We,ot,Ae,be):B.copyTexSubImage2D(Ke,K,Ye,yt,Rt+wn,We,ot,Ae,be);Be.bindFramebuffer(B.READ_FRAMEBUFFER,null),Be.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else kt?P.isDataTexture||P.isData3DTexture?B.texSubImage3D(Ke,K,Ye,yt,Rt,Ae,be,qe,cn,ht,_t.data):$.isCompressedArrayTexture?B.compressedTexSubImage3D(Ke,K,Ye,yt,Rt,Ae,be,qe,cn,_t.data):B.texSubImage3D(Ke,K,Ye,yt,Rt,Ae,be,qe,cn,ht,_t):P.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,K,Ye,yt,Ae,be,cn,ht,_t.data):P.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,K,Ye,yt,_t.width,_t.height,cn,_t.data):B.texSubImage2D(B.TEXTURE_2D,K,Ye,yt,Ae,be,cn,ht,_t);B.pixelStorei(B.UNPACK_ROW_LENGTH,ei),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,bt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,un),B.pixelStorei(B.UNPACK_SKIP_ROWS,ti),B.pixelStorei(B.UNPACK_SKIP_IMAGES,$t),K===0&&$.generateMipmaps&&B.generateMipmap(Ke),Be.unbindTexture()},this.copyTextureToTexture3D=function(P,$,oe=null,ae=null,K=0){return P.isTexture!==!0&&(Xo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),oe=arguments[0]||null,ae=arguments[1]||null,P=arguments[2],$=arguments[3],K=arguments[4]||0),Xo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(P,$,oe,ae,K)},this.initRenderTarget=function(P){Le.get(P).__webglFramebuffer===void 0&&k.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?k.setTextureCube(P,0):P.isData3DTexture?k.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?k.setTexture2DArray(P,0):k.setTexture2D(P,0),Be.unbindTexture()},this.resetState=function(){O=0,I=0,W=null,Be.reset(),Pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Tt._getUnpackColorSpace()}}class kw extends ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ti,this.environmentIntensity=1,this.environmentRotation=new Ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class V0 extends so{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new St(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Wm=new Vt,Jd=new b0,Cl=new jl,Al=new J;class Iw extends ln{constructor(e=new mi,t=new V0){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,a=this.matrixWorld,l=e.params.Points.threshold,d=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Cl.copy(r.boundingSphere),Cl.applyMatrix4(a),Cl.radius+=l,e.ray.intersectsSphere(Cl)===!1)return;Wm.copy(a).invert(),Jd.copy(e.ray).applyMatrix4(Wm);const u=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=u*u,p=r.index,y=r.attributes.position;if(p!==null){const S=Math.max(0,d.start),M=Math.min(p.count,d.start+d.count);for(let A=S,C=M;A<C;A++){const v=p.getX(A);Al.fromBufferAttribute(y,v),Xm(Al,v,h,a,e,t,this)}}else{const S=Math.max(0,d.start),M=Math.min(y.count,d.start+d.count);for(let A=S,C=M;A<C;A++)Al.fromBufferAttribute(y,A),Xm(Al,A,h,a,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=a.length;l<d;l++){const u=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=l}}}}}function Xm(s,e,t,r,a,l,d){const u=Jd.distanceSqToPoint(s);if(u<t){const h=new J;Jd.closestPointToPoint(s,h),h.applyMatrix4(r);const p=a.ray.origin.distanceTo(h);if(p<a.near||p>a.far)return;l.push({distance:p,distanceToRay:Math.sqrt(u),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:d})}}class Vl extends mi{constructor(e=1,t=1,r=1,a=32,l=1,d=!1,u=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:a,heightSegments:l,openEnded:d,thetaStart:u,thetaLength:h};const p=this;a=Math.floor(a),l=Math.floor(l);const x=[],y=[],S=[],M=[];let A=0;const C=[],v=r/2;let _=0;N(),d===!1&&(e>0&&U(!0),t>0&&U(!1)),this.setIndex(x),this.setAttribute("position",new Vn(y,3)),this.setAttribute("normal",new Vn(S,3)),this.setAttribute("uv",new Vn(M,2));function N(){const T=new J,Y=new J;let O=0;const I=(t-e)/r;for(let W=0;W<=l;W++){const L=[],w=W/l,z=w*(t-e)+e;for(let ie=0;ie<=a;ie++){const Q=ie/a,de=Q*h+u,pe=Math.sin(de),le=Math.cos(de);Y.x=z*pe,Y.y=-w*r+v,Y.z=z*le,y.push(Y.x,Y.y,Y.z),T.set(pe,I,le).normalize(),S.push(T.x,T.y,T.z),M.push(Q,1-w),L.push(A++)}C.push(L)}for(let W=0;W<a;W++)for(let L=0;L<l;L++){const w=C[L][W],z=C[L+1][W],ie=C[L+1][W+1],Q=C[L][W+1];(e>0||L!==0)&&(x.push(w,z,Q),O+=3),(t>0||L!==l-1)&&(x.push(z,ie,Q),O+=3)}p.addGroup(_,O,0),_+=O}function U(T){const Y=A,O=new At,I=new J;let W=0;const L=T===!0?e:t,w=T===!0?1:-1;for(let ie=1;ie<=a;ie++)y.push(0,v*w,0),S.push(0,w,0),M.push(.5,.5),A++;const z=A;for(let ie=0;ie<=a;ie++){const de=ie/a*h+u,pe=Math.cos(de),le=Math.sin(de);I.x=L*le,I.y=v*w,I.z=L*pe,y.push(I.x,I.y,I.z),S.push(0,w,0),O.x=pe*.5+.5,O.y=le*.5*w+.5,M.push(O.x,O.y),A++}for(let ie=0;ie<a;ie++){const Q=Y+ie,de=z+ie;T===!0?x.push(de,de+1,Q):x.push(de+1,de,Q),W+=3}p.addGroup(_,W,T===!0?1:2),_+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hf extends mi{constructor(e=1,t=.4,r=12,a=48,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:r,tubularSegments:a,arc:l},r=Math.floor(r),a=Math.floor(a);const d=[],u=[],h=[],p=[],x=new J,y=new J,S=new J;for(let M=0;M<=r;M++)for(let A=0;A<=a;A++){const C=A/a*l,v=M/r*Math.PI*2;y.x=(e+t*Math.cos(v))*Math.cos(C),y.y=(e+t*Math.cos(v))*Math.sin(C),y.z=t*Math.sin(v),u.push(y.x,y.y,y.z),x.x=e*Math.cos(C),x.y=e*Math.sin(C),S.subVectors(y,x).normalize(),h.push(S.x,S.y,S.z),p.push(A/a),p.push(M/r)}for(let M=1;M<=r;M++)for(let A=1;A<=a;A++){const C=(a+1)*M+A-1,v=(a+1)*(M-1)+A-1,_=(a+1)*(M-1)+A,N=(a+1)*M+A;d.push(C,v,N),d.push(v,_,N)}this.setIndex(d),this.setAttribute("position",new Vn(u,3)),this.setAttribute("normal",new Vn(h,3)),this.setAttribute("uv",new Vn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hf(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Gs extends so{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new St(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=S0,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class pf extends ln{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new St(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const od=new Vt,qm=new J,Ym=new J;class G0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.map=null,this.mapPass=null,this.matrix=new Vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new df,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;qm.setFromMatrixPosition(e.matrixWorld),t.position.copy(qm),Ym.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ym),t.updateMatrixWorld(),od.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(od),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(od)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const $m=new Vt,Wo=new J,ad=new J;class Uw extends G0{constructor(){super(new Bn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new At(4,2),this._viewportCount=6,this._viewports=[new Dt(2,1,1,1),new Dt(0,1,1,1),new Dt(3,1,1,1),new Dt(1,1,1,1),new Dt(3,0,1,1),new Dt(1,0,1,1)],this._cubeDirections=[new J(1,0,0),new J(-1,0,0),new J(0,0,1),new J(0,0,-1),new J(0,1,0),new J(0,-1,0)],this._cubeUps=[new J(0,1,0),new J(0,1,0),new J(0,1,0),new J(0,1,0),new J(0,0,1),new J(0,0,-1)]}updateMatrices(e,t=0){const r=this.camera,a=this.matrix,l=e.distance||r.far;l!==r.far&&(r.far=l,r.updateProjectionMatrix()),Wo.setFromMatrixPosition(e.matrixWorld),r.position.copy(Wo),ad.copy(r.position),ad.add(this._cubeDirections[t]),r.up.copy(this._cubeUps[t]),r.lookAt(ad),r.updateMatrixWorld(),a.makeTranslation(-Wo.x,-Wo.y,-Wo.z),$m.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix($m)}}class Fw extends pf{constructor(e,t,r=0,a=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=a,this.shadow=new Uw}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ow extends G0{constructor(){super(new I0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Km extends pf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ln.DEFAULT_UP),this.updateMatrix(),this.target=new ln,this.shadow=new Ow}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class zw extends pf{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Bw{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Zm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Zm();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Zm(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rf);const Vw=({tier:s,isOpening:e,onOpenClick:t})=>{const r=mt.useRef(null);return mt.useEffect(()=>{const a=r.current;if(!a)return;const l=a.clientWidth||360,d=a.clientHeight||360,u=new kw,h=new Bn(45,l/d,.1,100);h.position.set(0,1.8,5.2),h.lookAt(0,0,0);const p=new Dw({antialias:!0,alpha:!0,powerPreference:"high-performance"});p.setSize(l,d),p.setPixelRatio(Math.min(window.devicePixelRatio,2)),p.toneMapping=c0,p.toneMappingExposure=1.2,p.shadowMap.enabled=!0,p.shadowMap.type=a0,a.appendChild(p.domElement);const x=new zw(16777215,.6);u.add(x);const y=new Km(16777215,2.2);y.position.set(4,8,5),y.castShadow=!0,u.add(y);const S=new Km(45311,1.2);S.position.set(-5,3,-2),u.add(S);const M=new St(s.accentColor),A=new St(s.boxColor),C=new Fw(M,3.5,8);C.position.set(0,-.4,0),u.add(C);const v=new js;u.add(v);const _=new Vl(1.9,2.1,.18,32),N=new Gs({color:1119778,metalness:.85,roughness:.25}),U=new sn(_,N);U.position.y=-1.2,U.receiveShadow=!0,u.add(U);const T=new hf(1.75,.035,16,64),Y=new Bl({color:M}),O=new sn(T,Y);O.rotation.x=Math.PI/2,O.position.y=-1.1,u.add(O);const I=new wi(1.8,1.3,1.5),W=new Gs({color:A,metalness:.7,roughness:.35}),L=new sn(I,W);L.castShadow=!0,L.receiveShadow=!0,v.add(L);const w=new wi(1.84,.18,1.54),z=new Bl({color:M}),ie=new sn(w,z);v.add(ie);const Q=new wi(.12,1.34,.12),de=new Gs({color:2238e3,metalness:.9,roughness:.2});[[-.9,0,-.75],[.9,0,-.75],[-.9,0,.75],[.9,0,.75]].forEach(([Je,Le,k])=>{const R=new sn(Q,de);R.position.set(Je,Le,k),v.add(R)});const le=new wi(.18,.45,.24),he=new Gs({color:M,metalness:.8,roughness:.2}),G=new sn(le,he);G.position.set(-.95,0,0),v.add(G);const fe=new sn(le,he);fe.position.set(.95,0,0),v.add(fe);const D=new js;D.position.set(0,.65,0);const E=new wi(1.82,.22,1.52),H=new Gs({color:A,metalness:.75,roughness:.3}),xe=new sn(E,H);xe.castShadow=!0,D.add(xe);const X=new Vl(.42,.42,.05,6),ee=new Gs({color:M,metalness:.9,roughness:.15}),ue=new sn(X,ee);ue.position.y=.12,D.add(ue),v.add(D);const re=45,me=new mi,we=new Float32Array(re*3);for(let Je=0;Je<re*3;Je+=3)we[Je]=(Math.random()-.5)*4.5,we[Je+1]=(Math.random()-.5)*3.5,we[Je+2]=(Math.random()-.5)*4.5;me.setAttribute("position",new pi(we,3));const Pe=new V0({color:M,size:.065,transparent:!0,opacity:.75,blending:ud}),Ze=new Iw(me,Pe);u.add(Ze);let He=0,st=0;const B=Je=>{const Le=a.getBoundingClientRect(),k=((Je.clientX-Le.left)/Le.width-.5)*2,R=((Je.clientY-Le.top)/Le.height-.5)*2;He=k*.45,st=R*.25};a.addEventListener("mousemove",B);let Mt,it=new Bw;const Qe=()=>{const Je=it.getElapsedTime();v.rotation.y+=(He-v.rotation.y)*.08,v.rotation.x+=(st-v.rotation.x)*.08,e?(v.position.x=(Math.random()-.5)*.12,v.position.y=(Math.random()-.5)*.12,v.position.z=(Math.random()-.5)*.12,C.intensity=8+Math.random()*4,D.position.y+=.08,D.rotation.x+=.04):(v.position.y=Math.sin(Je*2)*.06,C.intensity=3+Math.sin(Je*4)*.8,O.rotation.z+=.005),Ze.rotation.y=Je*.08,p.render(u,h),Mt=requestAnimationFrame(Qe)};Qe();const Be=()=>{if(!a)return;const Je=a.clientWidth,Le=a.clientHeight;h.aspect=Je/Le,h.updateProjectionMatrix(),p.setSize(Je,Le)};return window.addEventListener("resize",Be),()=>{cancelAnimationFrame(Mt),a.removeEventListener("mousemove",B),window.removeEventListener("resize",Be),a.contains(p.domElement)&&a.removeChild(p.domElement),p.dispose(),I.dispose(),W.dispose(),w.dispose(),z.dispose(),E.dispose(),H.dispose(),_.dispose(),N.dispose(),me.dispose(),Pe.dispose()}},[s,e]),g.jsx("div",{ref:r,onClick:t,className:"relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center cursor-pointer select-none",title:"Click to Open Loot Crate"})},Gw=({tier:s,coins:e,isOpening:t,onOpen:r,onOpenDoodleJump:a})=>{const l=e>=s.cost;return g.jsxs("div",{className:"relative w-full flex flex-col items-center justify-center select-none py-2",children:[g.jsx(Vw,{tier:s,isOpening:t,onOpenClick:()=>{l&&!t&&r()}}),g.jsxs("div",{className:"flex flex-col items-center gap-3 mt-2 z-10 max-w-md w-full px-4",children:[g.jsxs("div",{className:"text-center",children:[g.jsx("div",{className:"flex items-center justify-center gap-2 mb-1",children:g.jsxs("span",{className:"text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full border shadow-sm",style:{borderColor:s.accentColor,color:s.accentColor,backgroundColor:"rgba(0,0,0,0.6)"},children:["Tier ",s.tier," Crate"]})}),g.jsx("h2",{className:"text-2xl sm:text-3xl font-black tracking-wide text-white font-display",children:s.name}),g.jsx("p",{className:"text-zinc-400 text-xs sm:text-sm mt-0.5 line-clamp-1 max-w-sm",children:s.subtitle})]}),l?g.jsxs("button",{onClick:()=>{t||r()},disabled:t,className:"w-full sm:w-80 py-3.5 px-6 rounded-2xl font-black text-base uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-yellow-500/25 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer",children:[g.jsx(no,{className:"w-5 h-5 fill-black"}),g.jsx("span",{children:"Open Crate"}),g.jsxs("span",{className:"flex items-center gap-1 bg-black/15 px-3 py-1 rounded-full text-xs font-black",children:[g.jsx($s,{className:"w-4 h-4 fill-black"}),s.cost.toLocaleString()]})]}):g.jsxs("div",{className:"w-full sm:w-88 flex flex-col items-center gap-2",children:[g.jsxs("button",{disabled:!0,className:"w-full py-3 px-6 rounded-2xl font-bold text-sm uppercase tracking-wider text-zinc-500 bg-zinc-800/80 border border-zinc-700/60 cursor-not-allowed flex items-center justify-center gap-2",children:[g.jsx(iv,{className:"w-4 h-4 text-red-400"}),g.jsxs("span",{children:["Need ",s.cost.toLocaleString()," Coins"]}),g.jsxs("span",{className:"text-xs text-zinc-400",children:["(Have ",e.toLocaleString(),")"]})]}),g.jsxs("button",{onClick:()=>{dt.playClick(),a()},className:"w-full py-2 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 transition-colors flex items-center justify-center gap-1.5 shadow",children:[g.jsx(r0,{className:"w-3.5 h-3.5 fill-emerald-400"}),"Play Doodle Jump to Earn Free Coins"]})]})]})]})},Jm=({className:s="",size:e=24,color:t="currentColor"})=>g.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:[g.jsx("path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}),g.jsx("path",{d:"m3.3 7 8.7 5 8.7-5"}),g.jsx("path",{d:"M12 22V12"}),g.jsx("path",{d:"m7 4.5 10 5.8",strokeDasharray:"2 2"})]}),Hw=({className:s="",size:e=24,color:t="currentColor"})=>g.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:[g.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),g.jsx("line",{x1:"12",y1:"3",x2:"12",y2:"21"}),g.jsx("circle",{cx:"9",cy:"12",r:"1",fill:t}),g.jsx("circle",{cx:"15",cy:"12",r:"1",fill:t}),g.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6",strokeWidth:"3"}),g.jsx("line",{x1:"18",y1:"6",x2:"18.01",y2:"6",strokeWidth:"3"}),g.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18",strokeWidth:"3"}),g.jsx("line",{x1:"18",y1:"18",x2:"18.01",y2:"18",strokeWidth:"3"})]}),jw=({className:s="",size:e=24,color:t="currentColor"})=>g.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:[g.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"3"}),g.jsx("circle",{cx:"12",cy:"12",r:"4"}),g.jsx("path",{d:"M12 8v8M8 12h8"}),g.jsx("path",{d:"M5 7l2 2M19 7l-2 2M5 17l2-2M19 17l-2-2"})]}),Ww=({className:s="",size:e=24,color:t="currentColor"})=>g.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:[g.jsx("path",{d:"M12 2L3 7v10l9 5 9-5V7l-9-5z"}),g.jsx("path",{d:"M12 6l-5 2.8v6.4l5 2.8 5-2.8V8.8L12 6z",strokeWidth:"1.5"}),g.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"6"}),g.jsx("line",{x1:"12",y1:"18",x2:"12",y2:"22"}),g.jsx("circle",{cx:"12",cy:"12",r:"2",fill:t})]}),Xw=({className:s="",size:e=24,color:t="currentColor"})=>g.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:[g.jsx("path",{d:"M2 17l3-11 5 6 4-6 5 6 3-11v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"}),g.jsx("circle",{cx:"12",cy:"16",r:"1.5",fill:t}),g.jsx("circle",{cx:"7",cy:"16",r:"1.5",fill:t}),g.jsx("circle",{cx:"17",cy:"16",r:"1.5",fill:t})]}),qw=({className:s="",size:e=24,color:t="currentColor"})=>g.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:[g.jsx("rect",{x:"7",y:"2",width:"10",height:"20",rx:"5"}),g.jsx("line",{x1:"10",y1:"6",x2:"14",y2:"6"}),g.jsx("line",{x1:"10",y1:"18",x2:"14",y2:"18"}),g.jsx("path",{d:"M12 9v6M10 11l4 2M14 11l-4 2"})]}),Yw=({className:s="",size:e=24,color:t="currentColor"})=>g.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:[g.jsx("path",{d:"M12 2L4 12l8 10 8-10L12 2z"}),g.jsx("path",{d:"M12 2v20",strokeDasharray:"2 2"}),g.jsx("path",{d:"M4 12h16"}),g.jsx("circle",{cx:"12",cy:"12",r:"3",fill:t,fillOpacity:"0.3"})]}),$w=({className:s="",size:e=24,color:t="currentColor"})=>g.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:[g.jsx("circle",{cx:"12",cy:"12",r:"9"}),g.jsx("circle",{cx:"12",cy:"12",r:"3",fill:t}),g.jsx("ellipse",{cx:"12",cy:"12",rx:"9",ry:"3.5",transform:"rotate(30 12 12)"}),g.jsx("ellipse",{cx:"12",cy:"12",rx:"9",ry:"3.5",transform:"rotate(-30 12 12)"})]}),Kw=({className:s="",size:e=24,color:t="currentColor"})=>g.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:[g.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"}),g.jsx("circle",{cx:"12",cy:"12",r:"2",fill:t})]}),Zw=({className:s="",size:e=24,color:t="currentColor"})=>g.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:[g.jsx("circle",{cx:"12",cy:"12",r:"10",strokeDasharray:"3 2"}),g.jsx("circle",{cx:"12",cy:"12",r:"5",strokeWidth:"2.5"}),g.jsx("circle",{cx:"12",cy:"12",r:"2.5",fill:t}),g.jsx("path",{d:"M12 2a10 10 0 0 1 8.66 15M2 12a10 10 0 0 1 15-8.66M12 22a10 10 0 0 1-8.66-15M22 12a10 10 0 0 1-15 8.66",strokeWidth:"1.5"})]}),H0=(s,e={})=>{switch(s){case 1:return g.jsx(Jm,{...e});case 2:return g.jsx(Hw,{...e});case 3:return g.jsx(jw,{...e});case 4:return g.jsx(Ww,{...e});case 5:return g.jsx(Xw,{...e});case 6:return g.jsx(qw,{...e});case 7:return g.jsx(Yw,{...e});case 8:return g.jsx($w,{...e});case 9:return g.jsx(Kw,{...e});case 10:return g.jsx(Zw,{...e});default:return g.jsx(Jm,{...e})}},mf=({silhouette:s,className:e="",size:t=48,color:r="currentColor"})=>{switch(s){case"robot":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",stroke:r,strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("rect",{x:"14",y:"10",width:"20",height:"16",rx:"4",fill:r,fillOpacity:"0.15"}),g.jsx("circle",{cx:"20",cy:"18",r:"2.5",fill:r}),g.jsx("circle",{cx:"28",cy:"18",r:"2.5",fill:r}),g.jsx("line",{x1:"24",y1:"4",x2:"24",y2:"10"}),g.jsx("circle",{cx:"24",cy:"4",r:"2",fill:r}),g.jsx("line",{x1:"18",y1:"22",x2:"30",y2:"22"}),g.jsx("rect",{x:"12",y:"26",width:"24",height:"14",rx:"4",fill:r,fillOpacity:"0.1"}),g.jsx("line",{x1:"8",y1:"30",x2:"12",y2:"30"}),g.jsx("line",{x1:"36",y1:"30",x2:"40",y2:"30"}),g.jsx("line",{x1:"18",y1:"40",x2:"18",y2:"46"}),g.jsx("line",{x1:"30",y1:"40",x2:"30",y2:"46"})]});case"beast":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",stroke:r,strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("path",{d:"M10 12 L16 22 L32 22 L38 12 L36 28 L24 38 L12 28 Z",fill:r,fillOpacity:"0.15"}),g.jsx("circle",{cx:"18",cy:"24",r:"2",fill:r}),g.jsx("circle",{cx:"30",cy:"24",r:"2",fill:r}),g.jsx("path",{d:"M22 30 L24 33 L26 30"}),g.jsx("path",{d:"M8 20 L4 26 L10 28"}),g.jsx("path",{d:"M40 20 L44 26 L38 28"}),g.jsx("line",{x1:"24",y1:"38",x2:"24",y2:"46"})]});case"winged":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",stroke:r,strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("circle",{cx:"24",cy:"12",r:"6",fill:r,fillOpacity:"0.15"}),g.jsx("path",{d:"M20 20 L28 20 L30 36 L18 36 Z",fill:r,fillOpacity:"0.1"}),g.jsx("path",{d:"M18 22 C8 16, 2 24, 6 34 C10 32, 14 30, 18 30",fill:r,fillOpacity:"0.2"}),g.jsx("path",{d:"M30 22 C40 16, 46 24, 42 34 C38 32, 34 30, 30 30",fill:r,fillOpacity:"0.2"}),g.jsx("line",{x1:"20",y1:"36",x2:"18",y2:"46"}),g.jsx("line",{x1:"28",y1:"36",x2:"30",y2:"46"})]});case"hover":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",stroke:r,strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("ellipse",{cx:"24",cy:"20",rx:"16",ry:"8",fill:r,fillOpacity:"0.2"}),g.jsx("ellipse",{cx:"24",cy:"18",rx:"8",ry:"4",fill:r,fillOpacity:"0.4"}),g.jsx("circle",{cx:"24",cy:"18",r:"3",fill:r}),g.jsx("path",{d:"M12 28 C16 34, 32 34, 36 28",strokeDasharray:"3 2"}),g.jsx("line",{x1:"24",y1:"32",x2:"24",y2:"42",strokeDasharray:"2 2"})]});case"elemental":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",stroke:r,strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("path",{d:"M24 4 C14 16, 10 26, 14 36 C18 44, 30 44, 34 36 C38 26, 34 16, 24 4 Z",fill:r,fillOpacity:"0.2"}),g.jsx("path",{d:"M24 16 C20 22, 18 28, 20 34 C22 38, 26 38, 28 34 C30 28, 28 22, 24 16 Z",fill:r,fillOpacity:"0.4"}),g.jsx("circle",{cx:"24",cy:"28",r:"2.5",fill:r})]});case"ninja":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",stroke:r,strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("circle",{cx:"24",cy:"12",r:"7",fill:r,fillOpacity:"0.2"}),g.jsx("path",{d:"M18 12 L30 12",strokeWidth:"3"}),g.jsx("circle",{cx:"21",cy:"11",r:"1.5",fill:r}),g.jsx("circle",{cx:"27",cy:"11",r:"1.5",fill:r}),g.jsx("path",{d:"M16 20 L32 20 L28 36 L20 36 Z",fill:r,fillOpacity:"0.15"}),g.jsx("line",{x1:"32",y1:"16",x2:"42",y2:"8"}),g.jsx("line",{x1:"20",y1:"36",x2:"18",y2:"46"}),g.jsx("line",{x1:"28",y1:"36",x2:"30",y2:"46"})]});default:return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 48 48",fill:"none",stroke:r,strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("circle",{cx:"24",cy:"10",r:"6",fill:r,fillOpacity:"0.2"}),g.jsx("rect",{x:"16",y:"18",width:"16",height:"18",rx:"4",fill:r,fillOpacity:"0.15"}),g.jsx("circle",{cx:"21",cy:"9",r:"1.5",fill:r}),g.jsx("circle",{cx:"27",cy:"9",r:"1.5",fill:r}),g.jsx("line",{x1:"12",y1:"20",x2:"12",y2:"32"}),g.jsx("line",{x1:"36",y1:"20",x2:"36",y2:"32"}),g.jsx("line",{x1:"20",y1:"36",x2:"20",y2:"46"}),g.jsx("line",{x1:"28",y1:"36",x2:"28",y2:"46"})]})}},Qd=({category:s,className:e="",size:t=20,color:r="currentColor"})=>{switch(s){case"hat":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("path",{d:"M2 18h20"}),g.jsx("path",{d:"M5 18V10a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8"}),g.jsx("path",{d:"M5 14h14",strokeWidth:"1.5"})]});case"hair":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("path",{d:"M6 16c-1-3 0-8 3-10 4-3 9-1 10 3 1 3 0 7-1 9"}),g.jsx("path",{d:"M9 10c2-2 5-2 7 0"}),g.jsx("path",{d:"M7 6l2 3"})]});case"glasses":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("circle",{cx:"6",cy:"14",r:"4"}),g.jsx("circle",{cx:"18",cy:"14",r:"4"}),g.jsx("line",{x1:"10",y1:"14",x2:"14",y2:"14"}),g.jsx("line",{x1:"2",y1:"14",x2:"2",y2:"10"}),g.jsx("line",{x1:"22",y1:"14",x2:"22",y2:"10"})]});case"shirt":return g.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:g.jsx("path",{d:"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.5a2 2 0 0 0 2 1.67h1.14v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-9h1.14a2 2 0 0 0 2-1.67l.58-3.5a2 2 0 0 0-1.34-2.23z"})});case"pants":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("path",{d:"M4 4h16v3l-2 13h-4l-2-9-2 9H6L4 7V4z"}),g.jsx("line",{x1:"4",y1:"7",x2:"20",y2:"7"})]});case"shoes":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("path",{d:"M3 17h18v3H3z"}),g.jsx("path",{d:"M3 17l2-7 4-1 3 3h6l3 5"})]});case"gloves":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("path",{d:"M8 20V8a2 2 0 0 1 4 0v4a2 2 0 0 1 4 0v2a2 2 0 0 1 4 0v6a4 4 0 0 1-4 4H10a4 4 0 0 1-2-4z"}),g.jsx("path",{d:"M8 14H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 4 0"})]});case"belt":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("rect",{x:"2",y:"9",width:"20",height:"6",rx:"2"}),g.jsx("rect",{x:"9",y:"8",width:"6",height:"8",rx:"1",strokeWidth:"2.5"}),g.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"16",strokeWidth:"2"})]});case"wearable":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("path",{d:"M12 4C8 2, 2 8, 4 16C6 14, 8 13, 12 14"}),g.jsx("path",{d:"M12 4C16 2, 22 8, 20 16C18 14, 16 13, 12 14"}),g.jsx("circle",{cx:"12",cy:"14",r:"2",fill:r})]});case"item":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("path",{d:"M14.5 4l5.5 5.5-12 12-4-1 1-4 9.5-9.5z"}),g.jsx("path",{d:"M11.5 7L17 12.5"}),g.jsx("path",{d:"M17 3l4 4"})]});case"sfx":return g.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:[g.jsx("path",{d:"M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4",strokeDasharray:"3 3"}),g.jsx("circle",{cx:"12",cy:"12",r:"3",fill:r})]});default:return g.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:e,children:g.jsx("circle",{cx:"12",cy:"12",r:"9"})})}},Jw=({currentTier:s,userCoins:e,unlockedFigures:t,onSelectTier:r})=>{const a=()=>{s>1&&(dt.playTierChange(),r(s-1))},l=()=>{s<10&&(dt.playTierChange(),r(s+1))};return g.jsx("div",{className:"w-full max-w-5xl flex flex-col items-center gap-1 select-none px-4",children:g.jsxs("div",{className:"w-full flex items-center justify-between gap-2",children:[g.jsx("button",{onClick:a,disabled:s<=1,className:"p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed border border-zinc-800 transition-colors text-white",title:"Previous Tier",children:g.jsx(ev,{className:"w-4 h-4"})}),g.jsx("div",{className:"flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 py-1 px-1",children:es.map(d=>{const u=d.tier===s,h=e>=d.cost,x=d.figureIds.filter(y=>(t[y]||[]).length>0).length;return g.jsxs("button",{onClick:()=>{dt.playTierChange(),r(d.tier)},className:`relative flex-shrink-0 flex flex-col items-center justify-between p-2 rounded-xl border transition-all duration-200 min-w-[85px] sm:min-w-[98px] ${u?"border-yellow-400 bg-yellow-400/10 scale-105 shadow-lg shadow-yellow-500/20":"border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-850"}`,style:{borderTopColor:u?d.accentColor:void 0,borderTopWidth:u?"3px":void 0},children:[g.jsxs("div",{className:"w-full flex items-center justify-between",children:[g.jsxs("span",{className:`text-[10px] font-black ${u?"text-yellow-400":"text-zinc-400"}`,children:["T",d.tier]}),h?g.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-400"}):g.jsx(cv,{className:"w-2.5 h-2.5 text-red-400"})]}),g.jsx("div",{className:"my-1",children:H0(d.tier,{size:20,color:u?d.accentColor:"#94a3b8"})}),g.jsx("div",{className:"text-[10px] font-bold text-white truncate max-w-[78px] text-center",children:d.name.split(" ")[0]}),g.jsx("div",{className:"text-[10px] font-extrabold text-amber-400 mt-0.5",children:d.cost>=1e6?`${(d.cost/1e6).toFixed(1)}M`:d.cost>=1e3?`${(d.cost/1e3).toFixed(0)}k`:d.cost}),g.jsxs("div",{className:"text-[9px] text-zinc-400 mt-0.5 flex items-center gap-0.5",children:[x===20&&g.jsx(ld,{className:"w-2.5 h-2.5 text-emerald-400"}),x,"/20"]})]},d.tier)})}),g.jsx("button",{onClick:l,disabled:s>=10,className:"p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed border border-zinc-800 transition-colors text-white",title:"Next Tier",children:g.jsx(i0,{className:"w-4 h-4"})})]})})},j0=({customization:s,size:e="md",interactive:t=!0,onClick:r})=>{var U;const a=Il[s.figureId]||Il.t1_fig_01,l=a.variants[s.figureRarity]||a.variants.common,d=qi[s.figureRarity]||qi.common,u=s.cosmetics.hat?Jn[s.cosmetics.hat]:null,h=s.cosmetics.hair?Jn[s.cosmetics.hair]:null,p=s.cosmetics.glasses?Jn[s.cosmetics.glasses]:null,x=s.cosmetics.shirt?Jn[s.cosmetics.shirt]:null,y=s.cosmetics.pants?Jn[s.cosmetics.pants]:null,S=s.cosmetics.shoes?Jn[s.cosmetics.shoes]:null,M=s.cosmetics.gloves?Jn[s.cosmetics.gloves]:null,A=s.cosmetics.belt?Jn[s.cosmetics.belt]:null,C=s.cosmetics.wearable?Jn[s.cosmetics.wearable]:null,v=s.cosmetics.item?Jn[s.cosmetics.item]:null,_=s.cosmetics.sfx?Jn[s.cosmetics.sfx]:null,N=e==="sm"?120:e==="md"?200:280;return g.jsxs("div",{onClick:t?r:void 0,className:`relative flex flex-col items-center justify-center transition-transform ${t?"cursor-pointer hover:scale-102 active:scale-98":""}`,style:{width:N,height:N+40},title:t?"Click to Customize Avatar":a.name,children:[g.jsx("div",{className:"absolute inset-0 rounded-full filter blur-xl opacity-40 transition-all duration-700 pointer-events-none",style:{background:((U=_==null?void 0:_.styleProps)==null?void 0:U.color)||l.glowColor||d.glowColor,transform:"scale(0.85)"}}),g.jsxs("svg",{viewBox:"0 0 200 240",className:"w-full h-full drop-shadow-2xl overflow-visible",style:{filter:`drop-shadow(0 8px 16px ${d.hexColor}35)`},children:[g.jsxs("defs",{children:[g.jsxs("filter",{id:`glow-${s.figureId}`,x:"-20%",y:"-20%",width:"140%",height:"140%",children:[g.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),g.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]}),g.jsxs("linearGradient",{id:"bodyGrad",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[g.jsx("stop",{offset:"0%",stopColor:l.primaryColor}),g.jsx("stop",{offset:"100%",stopColor:l.accentColor})]}),g.jsxs("linearGradient",{id:"armorShine",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[g.jsx("stop",{offset:"0%",stopColor:"#ffffff",stopOpacity:"0.3"}),g.jsx("stop",{offset:"100%",stopColor:"#000000",stopOpacity:"0.3"})]})]}),C&&g.jsxs("g",{className:"animate-pulse origin-center",children:[C.iconName==="seraphim-wings"&&g.jsx("path",{d:"M 50 110 C 10 70, 0 20, 45 40 C 65 50, 75 90, 80 110 M 150 110 C 190 70, 200 20, 155 40 C 135 50, 125 90, 120 110",fill:C.styleProps.color||"#FFF",opacity:"0.85",filter:`url(#glow-${s.figureId})`}),C.iconName==="dragon-wings"&&g.jsx("path",{d:"M 40 120 C 5 60, -10 30, 40 60 C 60 70, 75 95, 80 120 M 160 120 C 195 60, 210 30, 160 60 C 140 70, 125 95, 120 120",fill:"#880e4f",stroke:"#ff1744",strokeWidth:"2"}),C.iconName==="blade-wings"&&g.jsxs("g",{stroke:"#00e5ff",strokeWidth:"2.5",fill:"none",children:[g.jsx("path",{d:"M 40 110 L 10 70 L 45 80 L 15 50 L 55 60 L 75 95"}),g.jsx("path",{d:"M 160 110 L 190 70 L 155 80 L 185 50 L 145 60 L 125 95"})]}),C.iconName==="jet-turbine"&&g.jsxs("g",{children:[g.jsx("rect",{x:"74",y:"90",width:"16",height:"40",rx:"6",fill:"#546e7a"}),g.jsx("rect",{x:"110",y:"90",width:"16",height:"40",rx:"6",fill:"#546e7a"}),g.jsx("path",{d:"M 77 130 L 82 145 L 87 130 Z M 113 130 L 118 145 L 123 130 Z",fill:"#ff7043"})]}),C.iconName==="box-backpack"&&g.jsx("rect",{x:"74",y:"90",width:"52",height:"45",rx:"4",fill:"#8d6e63",stroke:"#5d4037",strokeWidth:"3"})]}),g.jsx("ellipse",{cx:"100",cy:"225",rx:"45",ry:"12",fill:"rgba(0,0,0,0.5)"}),g.jsxs("g",{className:"animate-avatar-idle origin-bottom",children:[g.jsx("rect",{x:"80",y:"150",width:"16",height:"45",rx:"6",fill:l.primaryColor}),g.jsx("rect",{x:"104",y:"150",width:"16",height:"45",rx:"6",fill:l.primaryColor}),y?g.jsxs("g",{children:[g.jsx("rect",{x:"78",y:"145",width:"20",height:"40",rx:"4",fill:y.styleProps.color||"#37474f",stroke:"#263238",strokeWidth:"1.5"}),g.jsx("rect",{x:"102",y:"145",width:"20",height:"40",rx:"4",fill:y.styleProps.color||"#37474f",stroke:"#263238",strokeWidth:"1.5"})]}):null,S?g.jsxs("g",{children:[g.jsx("rect",{x:"75",y:"185",width:"24",height:"16",rx:"6",fill:S.styleProps.color||"#212121",stroke:"#424242",strokeWidth:"2"}),g.jsx("rect",{x:"101",y:"185",width:"24",height:"16",rx:"6",fill:S.styleProps.color||"#212121",stroke:"#424242",strokeWidth:"2"})]}):g.jsxs("g",{children:[g.jsx("ellipse",{cx:"88",cy:"195",rx:"10",ry:"6",fill:"#37474f"}),g.jsx("ellipse",{cx:"112",cy:"195",rx:"10",ry:"6",fill:"#37474f"})]}),g.jsx("rect",{x:"72",y:"95",width:"56",height:"58",rx:"12",fill:"url(#bodyGrad)",stroke:l.accentColor,strokeWidth:"2"}),g.jsx("rect",{x:"72",y:"95",width:"56",height:"58",rx:"12",fill:"url(#armorShine)"}),x&&g.jsx("rect",{x:"70",y:"93",width:"60",height:"55",rx:"10",fill:x.styleProps.color||"#3949ab",stroke:"#1a237e",strokeWidth:"2"}),A&&g.jsxs("g",{children:[g.jsx("rect",{x:"70",y:"142",width:"60",height:"10",rx:"3",fill:A.styleProps.color||"#4e342e"}),g.jsx("rect",{x:"94",y:"140",width:"12",height:"14",rx:"2",fill:"#ffd700",stroke:"#ffb300",strokeWidth:"1"})]}),g.jsx("rect",{x:"52",y:"100",width:"16",height:"42",rx:"8",fill:l.primaryColor,transform:"rotate(8 60 100)"}),g.jsx("rect",{x:"132",y:"100",width:"16",height:"42",rx:"8",fill:l.primaryColor,transform:"rotate(-8 140 100)"}),M?g.jsxs("g",{children:[g.jsx("ellipse",{cx:"52",cy:"144",rx:"10",ry:"10",fill:M.styleProps.color||"#ffb300"}),g.jsx("ellipse",{cx:"148",cy:"144",rx:"10",ry:"10",fill:M.styleProps.color||"#ffb300"})]}):g.jsxs("g",{children:[g.jsx("circle",{cx:"53",cy:"142",r:"7",fill:l.accentColor}),g.jsx("circle",{cx:"147",cy:"142",r:"7",fill:l.accentColor})]}),v&&g.jsxs("g",{transform:"translate(145, 120)",children:[v.iconName==="neon-katana"&&g.jsx("path",{d:"M 0 0 L 25 -35 L 30 -30 L 5 5 Z M -3 3 L 8 -5",stroke:"#00e5ff",strokeWidth:"3",fill:"#fff"}),v.iconName==="pipe-wrench"&&g.jsx("rect",{x:"0",y:"-30",width:"10",height:"40",rx:"3",fill:"#78909c",stroke:"#37474f",strokeWidth:"2"}),v.iconName==="banhammer"&&g.jsxs("g",{children:[g.jsx("rect",{x:"0",y:"-35",width:"8",height:"45",fill:"#8d6e63"}),g.jsx("rect",{x:"-10",y:"-45",width:"28",height:"18",rx:"4",fill:"#ffd700",stroke:"#ff8f00",strokeWidth:"2"})]}),v.iconName==="crowbar"&&g.jsx("path",{d:"M 0 5 L 20 -30 M 15 -35 L 25 -25",stroke:"#90a4ae",strokeWidth:"4"}),v.iconName==="blood-scythe"&&g.jsxs("g",{children:[g.jsx("rect",{x:"0",y:"-35",width:"8",height:"45",fill:"#3e2723"}),g.jsx("path",{d:"M 4 -35 C 20 -40, 25 -10, 4 -15 Z",fill:"#ff1744",stroke:"#d50000",strokeWidth:"2"})]})]}),g.jsx("rect",{x:"92",y:"80",width:"16",height:"18",rx:"4",fill:l.primaryColor}),g.jsx("circle",{cx:"100",cy:"60",r:"32",fill:"url(#bodyGrad)",stroke:l.accentColor,strokeWidth:"2.5"}),g.jsxs("g",{children:[g.jsx("circle",{cx:"90",cy:"58",r:"5",fill:"#FFFFFF"}),g.jsx("circle",{cx:"91",cy:"58",r:"2.5",fill:d.hexColor}),g.jsx("circle",{cx:"110",cy:"58",r:"5",fill:"#FFFFFF"}),g.jsx("circle",{cx:"109",cy:"58",r:"2.5",fill:d.hexColor}),g.jsx("path",{d:"M 94 72 Q 100 78 106 72",stroke:"#212121",strokeWidth:"2.5",fill:"none",strokeLinecap:"round"})]}),h&&g.jsx("g",{children:h.iconName==="hair-spikes"?g.jsx("path",{d:"M 68 50 L 75 25 L 85 40 L 98 15 L 110 40 L 122 25 L 132 50 Z",fill:h.styleProps.color||"#ff9100",filter:`url(#glow-${s.figureId})`}):h.iconName==="hair-pompadour"?g.jsx("path",{d:"M 66 55 C 65 20, 135 20, 134 55 C 130 35, 70 35, 66 55 Z",fill:h.styleProps.color||"#00b0ff"}):g.jsx("path",{d:"M 70 58 C 70 30, 130 30, 130 58 C 120 40, 80 40, 70 58 Z",fill:h.styleProps.color||"#795548"})}),p&&g.jsx("g",{children:p.iconName==="pixel-shades"?g.jsx("path",{d:"M 75 52 H 125 V 64 H 115 V 60 H 85 V 64 H 75 Z",fill:"#111111",stroke:"#ffffff",strokeWidth:"1.5"}):p.iconName==="omni-visor"?g.jsx("rect",{x:"74",y:"50",width:"52",height:"16",rx:"6",fill:"rgba(0, 229, 255, 0.7)",stroke:"#00e5ff",strokeWidth:"2",filter:`url(#glow-${s.figureId})`}):g.jsxs("g",{stroke:"#ffd700",strokeWidth:"2",fill:"none",children:[g.jsx("circle",{cx:"89",cy:"58",r:"9"}),g.jsx("circle",{cx:"111",cy:"58",r:"9"}),g.jsx("line",{x1:"98",y1:"58",x2:"102",y2:"58"})]})}),u&&g.jsxs("g",{transform:"translate(100, 32)",children:[u.iconName==="crown"&&g.jsx("path",{d:"M -26 0 L -18 -22 L -5 -6 L 0 -26 L 5 -6 L 18 -22 L 26 0 Z",fill:"#bcaaa4",stroke:"#8d6e63",strokeWidth:"2"}),u.iconName==="astral-halo"&&g.jsxs("g",{filter:`url(#glow-${s.figureId})`,children:[g.jsx("ellipse",{cx:"0",cy:"-20",rx:"30",ry:"9",fill:"none",stroke:"#ffd700",strokeWidth:"4"}),g.jsx("circle",{cx:"0",cy:"-20",r:"3",fill:"#fff"})]}),u.iconName==="brimstone-horns"&&g.jsxs("g",{fill:"#ff1744",stroke:"#b71c1c",strokeWidth:"2",children:[g.jsx("path",{d:"M -22 2 C -35 -15, -25 -35, -40 -40 C -30 -30, -18 -15, -15 2 Z"}),g.jsx("path",{d:"M 22 2 C 35 -15, 25 -35, 40 -40 C 30 -30, 18 -15, 15 2 Z"})]}),u.iconName==="beanie"&&g.jsx("path",{d:"M -28 5 C -28 -25, 28 -25, 28 5 Z",fill:"#00b0ff",stroke:"#01579b",strokeWidth:"2"}),u.iconName==="oni-visor"&&g.jsx("path",{d:"M -30 -5 L 30 -5 L 24 -22 L 0 -12 L -24 -22 Z",fill:"#ff9100",stroke:"#ff3d00",strokeWidth:"2"})]})]})]}),g.jsxs("div",{className:"mt-1 flex flex-col items-center",children:[g.jsx("span",{className:"text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full border shadow-sm",style:{borderColor:d.hexColor,color:d.hexColor,backgroundColor:"rgba(0,0,0,0.7)"},children:d.name}),g.jsx("span",{className:"text-white font-bold text-xs tracking-wide mt-0.5 truncate max-w-[170px]",children:a.name}),t&&g.jsxs("span",{className:"text-[10px] text-zinc-400 mt-0.5 flex items-center gap-1 hover:text-yellow-400",children:[g.jsx(Mv,{className:"w-3 h-3"})," Customize"]})]})]})},Qw=({item:s,revealed:e,onInspect:t})=>{const r=qi[s.rarity],a=s.type==="figure"&&s.figure,l=s.type==="cosmetic"&&s.cosmetic,d=a?s.figure.name:l?s.cosmetic.name:"Unknown Item",u=a?s.figure.variants[s.rarity].title:l?s.cosmetic.category.toUpperCase():"";return g.jsxs("div",{onClick:t,className:`relative w-64 md:w-72 h-[22rem] rounded-2xl flex flex-col justify-between p-5 transition-all duration-700 select-none overflow-hidden border-2 shadow-2xl ${e?"opacity-100 scale-100 translate-y-0 cursor-pointer hover:-translate-y-2":"opacity-0 scale-75 translate-y-20 pointer-events-none"}`,style:{borderColor:r.hexColor,background:`radial-gradient(circle at 50% 20%, ${r.hexColor}25 0%, #10141e 75%, #080a10 100%)`,boxShadow:`0 12px 32px -8px ${r.glowColor}, inset 0 0 20px ${r.hexColor}20`},children:[g.jsx("div",{className:"absolute -right-6 -bottom-8 text-8xl font-black opacity-10 pointer-events-none uppercase tracking-tighter",style:{color:r.hexColor},children:r.name[0]}),g.jsxs("div",{className:"flex items-center justify-between z-10",children:[g.jsx("span",{className:"text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border shadow",style:{borderColor:r.hexColor,color:r.hexColor,backgroundColor:"rgba(0,0,0,0.65)"},children:r.name}),g.jsx("span",{className:"text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900/90 px-2.5 py-1 rounded-md border border-zinc-800",children:s.type})]}),g.jsxs("div",{className:"relative flex flex-col items-center justify-center my-auto z-10",children:[g.jsx("div",{className:"absolute w-32 h-32 rounded-full filter blur-2xl opacity-60 animate-pulse pointer-events-none",style:{background:r.hexColor}}),g.jsxs("div",{className:"relative w-28 h-28 p-4 rounded-2xl border transition-transform duration-300 hover:scale-105 flex items-center justify-center",style:{borderColor:`${r.hexColor}50`,backgroundColor:"rgba(10, 15, 25, 0.75)",boxShadow:`0 0 25px ${r.hexColor}40`},children:[a&&g.jsx(mf,{silhouette:s.figure.silhouette,color:r.hexColor,size:54}),l&&g.jsx(Qd,{category:s.cosmetic.category,color:r.hexColor,size:54}),s.rarity==="legendary"&&g.jsx(no,{className:"absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin"})]})]}),g.jsxs("div",{className:"z-10 bg-black/65 backdrop-blur-md rounded-xl p-3 border border-zinc-800/80",children:[g.jsx("div",{className:"text-zinc-400 text-[11px] font-bold truncate tracking-wider uppercase",children:u}),g.jsx("div",{className:"text-white text-base font-black tracking-wide truncate mt-0.5",children:d}),s.isDuplicate?g.jsxs("div",{className:"mt-2 flex items-center justify-between bg-amber-500/15 border border-amber-500/40 rounded-lg px-2.5 py-1 animate-pulse",children:[g.jsxs("span",{className:"text-[11px] font-bold text-amber-400 flex items-center gap-1",children:[g.jsx(s0,{className:"w-3 h-3 animate-spin"})," DUPLICATE"]}),g.jsxs("span",{className:"text-xs font-black text-yellow-300 flex items-center gap-1",children:["+",g.jsx($s,{className:"w-3.5 h-3.5 text-yellow-400 fill-yellow-400"})," ",s.duplicatePayout.toLocaleString()]})]}):g.jsx("div",{className:"mt-2 flex items-center justify-center bg-emerald-500/15 border border-emerald-500/40 rounded-lg py-1",children:g.jsx("span",{className:"text-[11px] font-black text-emerald-400 tracking-wider",children:"NEW UNLOCK"})})]})]})};var gf={};(function s(e,t,r,a){var l=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),d=typeof Path2D=="function"&&typeof DOMMatrix=="function",u=(function(){if(!e.OffscreenCanvas)return!1;try{var D=new OffscreenCanvas(1,1),E=D.getContext("2d");E.fillRect(0,0,1,1);var H=D.transferToImageBitmap();E.createPattern(H,"no-repeat")}catch{return!1}return!0})();function h(){}function p(D){var E=t.exports.Promise,H=E!==void 0?E:e.Promise;return typeof H=="function"?new H(D):(D(h,h),null)}var x=(function(D,E){return{transform:function(H){if(D)return H;if(E.has(H))return E.get(H);var xe=new OffscreenCanvas(H.width,H.height),X=xe.getContext("2d");return X.drawImage(H,0,0),E.set(H,xe),xe},clear:function(){E.clear()}}})(u,new Map),y=(function(){var D=Math.floor(16.666666666666668),E,H,xe={},X=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(E=function(ee){var ue=Math.random();return xe[ue]=requestAnimationFrame(function re(me){X===me||X+D-1<me?(X=me,delete xe[ue],ee()):xe[ue]=requestAnimationFrame(re)}),ue},H=function(ee){xe[ee]&&cancelAnimationFrame(xe[ee])}):(E=function(ee){return setTimeout(ee,D)},H=function(ee){return clearTimeout(ee)}),{frame:E,cancel:H}})(),S=(function(){var D,E,H={};function xe(X){function ee(ue,re){X.postMessage({options:ue||{},callback:re})}X.init=function(re){var me=re.transferControlToOffscreen();X.postMessage({canvas:me},[me])},X.fire=function(re,me,we){if(E)return ee(re,null),E;var Pe=Math.random().toString(36).slice(2);return E=p(function(Ze){function He(st){st.data.callback===Pe&&(delete H[Pe],X.removeEventListener("message",He),E=null,x.clear(),we(),Ze())}X.addEventListener("message",He),ee(re,Pe),H[Pe]=He.bind(null,{data:{callback:Pe}})}),E},X.reset=function(){X.postMessage({reset:!0});for(var re in H)H[re](),delete H[re]}}return function(){if(D)return D;if(!r&&l){var X=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{D=new Worker(URL.createObjectURL(new Blob([X])))}catch(ee){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",ee),null}xe(D)}return D}})(),M={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function A(D,E){return E?E(D):D}function C(D){return D!=null}function v(D,E,H){return A(D&&C(D[E])?D[E]:M[E],H)}function _(D){return D<0?0:Math.floor(D)}function N(D,E){return Math.floor(Math.random()*(E-D))+D}function U(D){return parseInt(D,16)}function T(D){return D.map(Y)}function Y(D){var E=String(D).replace(/[^0-9a-f]/gi,"");return E.length<6&&(E=E[0]+E[0]+E[1]+E[1]+E[2]+E[2]),{r:U(E.substring(0,2)),g:U(E.substring(2,4)),b:U(E.substring(4,6))}}function O(D){var E=v(D,"origin",Object);return E.x=v(E,"x",Number),E.y=v(E,"y",Number),E}function I(D){D.width=document.documentElement.clientWidth,D.height=document.documentElement.clientHeight}function W(D){var E=D.getBoundingClientRect();D.width=E.width,D.height=E.height}function L(D){var E=document.createElement("canvas");return E.style.position="fixed",E.style.top="0px",E.style.left="0px",E.style.pointerEvents="none",E.style.zIndex=D,E}function w(D,E,H,xe,X,ee,ue,re,me){D.save(),D.translate(E,H),D.rotate(ee),D.scale(xe,X),D.arc(0,0,1,ue,re,me),D.restore()}function z(D){var E=D.angle*(Math.PI/180),H=D.spread*(Math.PI/180);return{x:D.x,y:D.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:D.startVelocity*.5+Math.random()*D.startVelocity,angle2D:-E+(.5*H-Math.random()*H),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:D.color,shape:D.shape,tick:0,totalTicks:D.ticks,decay:D.decay,drift:D.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:D.gravity*3,ovalScalar:.6,scalar:D.scalar,flat:D.flat}}function ie(D,E){E.x+=Math.cos(E.angle2D)*E.velocity+E.drift,E.y+=Math.sin(E.angle2D)*E.velocity+E.gravity,E.velocity*=E.decay,E.flat?(E.wobble=0,E.wobbleX=E.x+10*E.scalar,E.wobbleY=E.y+10*E.scalar,E.tiltSin=0,E.tiltCos=0,E.random=1):(E.wobble+=E.wobbleSpeed,E.wobbleX=E.x+10*E.scalar*Math.cos(E.wobble),E.wobbleY=E.y+10*E.scalar*Math.sin(E.wobble),E.tiltAngle+=.1,E.tiltSin=Math.sin(E.tiltAngle),E.tiltCos=Math.cos(E.tiltAngle),E.random=Math.random()+2);var H=E.tick++/E.totalTicks,xe=E.x+E.random*E.tiltCos,X=E.y+E.random*E.tiltSin,ee=E.wobbleX+E.random*E.tiltCos,ue=E.wobbleY+E.random*E.tiltSin;if(D.fillStyle="rgba("+E.color.r+", "+E.color.g+", "+E.color.b+", "+(1-H)+")",D.beginPath(),d&&E.shape.type==="path"&&typeof E.shape.path=="string"&&Array.isArray(E.shape.matrix))D.fill(he(E.shape.path,E.shape.matrix,E.x,E.y,Math.abs(ee-xe)*.1,Math.abs(ue-X)*.1,Math.PI/10*E.wobble));else if(E.shape.type==="bitmap"){var re=Math.PI/10*E.wobble,me=Math.abs(ee-xe)*.1,we=Math.abs(ue-X)*.1,Pe=E.shape.bitmap.width*E.scalar,Ze=E.shape.bitmap.height*E.scalar,He=new DOMMatrix([Math.cos(re)*me,Math.sin(re)*me,-Math.sin(re)*we,Math.cos(re)*we,E.x,E.y]);He.multiplySelf(new DOMMatrix(E.shape.matrix));var st=D.createPattern(x.transform(E.shape.bitmap),"no-repeat");st.setTransform(He),D.globalAlpha=1-H,D.fillStyle=st,D.fillRect(E.x-Pe/2,E.y-Ze/2,Pe,Ze),D.globalAlpha=1}else if(E.shape==="circle")D.ellipse?D.ellipse(E.x,E.y,Math.abs(ee-xe)*E.ovalScalar,Math.abs(ue-X)*E.ovalScalar,Math.PI/10*E.wobble,0,2*Math.PI):w(D,E.x,E.y,Math.abs(ee-xe)*E.ovalScalar,Math.abs(ue-X)*E.ovalScalar,Math.PI/10*E.wobble,0,2*Math.PI);else if(E.shape==="star")for(var B=Math.PI/2*3,Mt=4*E.scalar,it=8*E.scalar,Qe=E.x,Be=E.y,Je=5,Le=Math.PI/Je;Je--;)Qe=E.x+Math.cos(B)*it,Be=E.y+Math.sin(B)*it,D.lineTo(Qe,Be),B+=Le,Qe=E.x+Math.cos(B)*Mt,Be=E.y+Math.sin(B)*Mt,D.lineTo(Qe,Be),B+=Le;else D.moveTo(Math.floor(E.x),Math.floor(E.y)),D.lineTo(Math.floor(E.wobbleX),Math.floor(X)),D.lineTo(Math.floor(ee),Math.floor(ue)),D.lineTo(Math.floor(xe),Math.floor(E.wobbleY));return D.closePath(),D.fill(),E.tick<E.totalTicks}function Q(D,E,H,xe,X){var ee=E.slice(),ue=D.getContext("2d"),re,me,we=p(function(Pe){function Ze(){re=me=null,ue.clearRect(0,0,xe.width,xe.height),x.clear(),X(),Pe()}function He(){r&&!(xe.width===a.width&&xe.height===a.height)&&(xe.width=D.width=a.width,xe.height=D.height=a.height),!xe.width&&!xe.height&&(H(D),xe.width=D.width,xe.height=D.height),ue.clearRect(0,0,xe.width,xe.height),ee=ee.filter(function(st){return ie(ue,st)}),ee.length?re=y.frame(He):Ze()}re=y.frame(He),me=Ze});return{addFettis:function(Pe){return ee=ee.concat(Pe),we},canvas:D,promise:we,reset:function(){re&&y.cancel(re),me&&me()}}}function de(D,E){var H=!D,xe=!!v(E||{},"resize"),X=!1,ee=v(E,"disableForReducedMotion",Boolean),ue=l&&!!v(E||{},"useWorker"),re=ue?S():null,me=H?I:W,we=D&&re?!!D.__confetti_initialized:!1,Pe=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Ze;function He(B,Mt,it){for(var Qe=v(B,"particleCount",_),Be=v(B,"angle",Number),Je=v(B,"spread",Number),Le=v(B,"startVelocity",Number),k=v(B,"decay",Number),R=v(B,"gravity",Number),ne=v(B,"drift",Number),_e=v(B,"colors",T),ye=v(B,"ticks",Number),ge=v(B,"shapes"),je=v(B,"scalar"),Re=!!v(B,"flat"),Ue=O(B),ft=Qe,Ee=[],Oe=D.width*Ue.x,et=D.height*Ue.y;ft--;)Ee.push(z({x:Oe,y:et,angle:Be,spread:Je,startVelocity:Le,color:_e[ft%_e.length],shape:ge[N(0,ge.length)],ticks:ye,decay:k,gravity:R,drift:ne,scalar:je,flat:Re}));return Ze?Ze.addFettis(Ee):(Ze=Q(D,Ee,me,Mt,it),Ze.promise)}function st(B){var Mt=ee||v(B,"disableForReducedMotion",Boolean),it=v(B,"zIndex",Number);if(Mt&&Pe)return p(function(Le){Le()});H&&Ze?D=Ze.canvas:H&&!D&&(D=L(it),document.body.appendChild(D)),xe&&!we&&me(D);var Qe={width:D.width,height:D.height};re&&!we&&re.init(D),we=!0,re&&(D.__confetti_initialized=!0);function Be(){if(re){var Le={getBoundingClientRect:function(){if(!H)return D.getBoundingClientRect()}};me(Le),re.postMessage({resize:{width:Le.width,height:Le.height}});return}Qe.width=Qe.height=null}function Je(){Ze=null,xe&&(X=!1,e.removeEventListener("resize",Be)),H&&D&&(document.body.contains(D)&&document.body.removeChild(D),D=null,we=!1)}return xe&&!X&&(X=!0,e.addEventListener("resize",Be,!1)),re?re.fire(B,Qe,Je):He(B,Qe,Je)}return st.reset=function(){re&&re.reset(),Ze&&Ze.reset()},st}var pe;function le(){return pe||(pe=de(null,{useWorker:!0,resize:!0})),pe}function he(D,E,H,xe,X,ee,ue){var re=new Path2D(D),me=new Path2D;me.addPath(re,new DOMMatrix(E));var we=new Path2D;return we.addPath(me,new DOMMatrix([Math.cos(ue)*X,Math.sin(ue)*X,-Math.sin(ue)*ee,Math.cos(ue)*ee,H,xe])),we}function G(D){if(!d)throw new Error("path confetti are not supported in this browser");var E,H;typeof D=="string"?E=D:(E=D.path,H=D.matrix);var xe=new Path2D(E),X=document.createElement("canvas"),ee=X.getContext("2d");if(!H){for(var ue=1e3,re=ue,me=ue,we=0,Pe=0,Ze,He,st=0;st<ue;st+=2)for(var B=0;B<ue;B+=2)ee.isPointInPath(xe,st,B,"nonzero")&&(re=Math.min(re,st),me=Math.min(me,B),we=Math.max(we,st),Pe=Math.max(Pe,B));Ze=we-re,He=Pe-me;var Mt=10,it=Math.min(Mt/Ze,Mt/He);H=[it,0,0,it,-Math.round(Ze/2+re)*it,-Math.round(He/2+me)*it]}return{type:"path",path:E,matrix:H}}function fe(D){var E,H=1,xe="#000000",X='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof D=="string"?E=D:(E=D.text,H="scalar"in D?D.scalar:H,X="fontFamily"in D?D.fontFamily:X,xe="color"in D?D.color:xe);var ee=10*H,ue=""+ee+"px "+X,re=new OffscreenCanvas(ee,ee),me=re.getContext("2d");me.font=ue;var we=me.measureText(E),Pe=Math.ceil(we.actualBoundingBoxRight+we.actualBoundingBoxLeft),Ze=Math.ceil(we.actualBoundingBoxAscent+we.actualBoundingBoxDescent),He=2,st=we.actualBoundingBoxLeft+He,B=we.actualBoundingBoxAscent+He;Pe+=He+He,Ze+=He+He,re=new OffscreenCanvas(Pe,Ze),me=re.getContext("2d"),me.font=ue,me.fillStyle=xe,me.fillText(E,st,B);var Mt=1/H;return{type:"bitmap",bitmap:re.transferToImageBitmap(),matrix:[Mt,0,0,Mt,-Pe*Mt/2,-Ze*Mt/2]}}t.exports=function(){return le().apply(this,arguments)},t.exports.reset=function(){le().reset()},t.exports.create=de,t.exports.shapeFromPath=G,t.exports.shapeFromText=fe})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),gf,!1);const eE=gf.exports;gf.exports.create;const tE=({items:s,onFinish:e})=>{const[t,r]=mt.useState("windup"),[a,l]=mt.useState([!1,!1,!1,!1]),d=s.reduce((u,h)=>u+(h.isDuplicate?h.duplicatePayout:0),0);return mt.useEffect(()=>{dt.playWindup(1.2);const u=setTimeout(()=>{r("blast"),dt.playExplosion()},1200),h=setTimeout(()=>{r("ascend"),s.forEach((y,S)=>{dt.playAscendWhoosh(S,y.rarity)})},1500),p=setTimeout(()=>{r("land"),s.forEach((y,S)=>{const M=S*220;dt.playCardLand(y.rarity,M),setTimeout(()=>{l(A=>{const C=[...A];return C[S]=!0,C})},M+80)})},2400),x=setTimeout(()=>{r("reveal"),s.some(S=>["rare","mythic","legendary"].includes(S.rarity))&&eE({particleCount:90,spread:80,origin:{y:.6},colors:["#00B0FF","#FF9100","#FF1744","#FFD700"]}),d>0&&dt.playDuplicateCoin(d)},3600);return()=>{clearTimeout(u),clearTimeout(h),clearTimeout(p),clearTimeout(x)}},[s,d]),g.jsxs("div",{className:"fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-6 bg-black/90 backdrop-blur-xl select-none overflow-y-auto no-scrollbar animate-fade-in",children:[g.jsx("div",{className:`absolute inset-0 pointer-events-none transition-transform duration-75 ${t==="blast"?"scale-105 translate-y-2":""}`}),(t==="blast"||t==="ascend")&&g.jsx("div",{className:"absolute inset-0 flex justify-around items-end pointer-events-none pb-24",children:s.map((u,h)=>{const p=qi[u.rarity];return g.jsxs("div",{className:"relative flex flex-col items-center",style:{animation:`shootUp 0.9s cubic-bezier(0.1, 0.9, 0.2, 1) ${h*.08}s forwards`},children:[g.jsx("div",{className:"w-16 h-[80vh] rounded-t-full opacity-80 filter blur-md",style:{background:`linear-gradient(to top, ${p.hexColor}, transparent)`,boxShadow:`0 0 40px ${p.hexColor}`}}),g.jsx("div",{className:"w-16 h-16 rounded-full border-2 shadow-2xl flex items-center justify-center font-black",style:{borderColor:"#FFFFFF",backgroundColor:p.hexColor,boxShadow:`0 0 35px ${p.hexColor}`,color:"#000"},children:g.jsx(no,{className:"w-8 h-8 fill-black"})})]},h)})}),g.jsxs("div",{className:"w-full max-w-6xl flex items-center justify-between z-20 pt-1",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("span",{className:"text-lg sm:text-xl font-black tracking-widest text-white uppercase font-display",children:"Loot Unboxing"}),g.jsx("span",{className:"text-[11px] uppercase px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold border border-zinc-700",children:t.toUpperCase()})]}),d>0&&t==="reveal"&&g.jsxs("div",{className:"flex items-center gap-2 bg-amber-500/20 border border-amber-500/50 px-3.5 py-1 rounded-full animate-bounce",children:[g.jsx($s,{className:"w-4 h-4 text-yellow-400 fill-yellow-400"}),g.jsxs("span",{className:"text-xs sm:text-sm font-black text-yellow-300",children:["+",d.toLocaleString()," Coins Cashed"]})]})]}),g.jsx("div",{className:"w-full max-w-6xl my-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center justify-center z-20 py-4",children:s.map((u,h)=>g.jsx("div",{className:"flex justify-center",children:g.jsx(Qw,{item:u,revealed:a[h]})},h))}),g.jsx("div",{className:"w-full max-w-md flex flex-col items-center gap-2 z-30 pb-2",children:t==="reveal"?g.jsxs("button",{onClick:()=>{dt.playClick(),e()},className:"w-full py-3.5 px-8 rounded-xl font-black text-sm uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-yellow-500/30 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2",children:[g.jsx(sv,{className:"w-5 h-5"}),"Claim & Continue",g.jsx(i0,{className:"w-5 h-5 ml-1"})]}):g.jsxs("div",{className:"text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 animate-pulse py-2",children:[g.jsx("div",{className:"w-2 h-2 rounded-full bg-yellow-400 animate-ping"}),"Cracking Crate Locks..."]})})]})},nE=({customization:s,unlockedFigures:e,unlockedCosmetics:t,onUpdateCustomization:r,onClose:a})=>{const[l,d]=mt.useState("figure"),[u,h]=mt.useState("hat"),[p,x]=mt.useState({...s}),y=(C,v)=>{dt.playClick();const _={...p,figureId:C,figureRarity:v};x(_),r(_)},S=(C,v)=>{dt.playClick();const _=p.cosmetics[v]===C,N={...p,cosmetics:{...p.cosmetics,[v]:_?null:C}};x(N),r(N)},M=Object.keys(e).filter(C=>(e[C]||[]).length>0),A=Yo.filter(C=>C.category===u&&t.includes(C.id));return g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-fade-in",children:g.jsxs("div",{className:"relative w-full max-w-4xl h-[85vh] bg-zinc-950 border-2 border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col",children:[g.jsxs("div",{className:"flex items-center justify-between px-6 py-3.5 bg-zinc-900/90 border-b border-zinc-800",children:[g.jsxs("div",{className:"flex items-center gap-2.5",children:[g.jsx(cd,{className:"w-5 h-5 text-yellow-400"}),g.jsxs("div",{children:[g.jsx("h3",{className:"text-sm sm:text-base font-black text-white uppercase tracking-wider font-display",children:"Avatar Dressing Room"}),g.jsx("p",{className:"text-[11px] text-zinc-400",children:"Swap your base figure & equip collected cosmetics"})]})]}),g.jsx("button",{onClick:()=>{dt.playClick(),a()},className:"p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors",children:g.jsx(nf,{className:"w-5 h-5"})})]}),g.jsxs("div",{className:"flex-1 flex flex-col md:flex-row overflow-hidden",children:[g.jsxs("div",{className:"w-full md:w-72 bg-zinc-900/50 p-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800",children:[g.jsx("div",{className:"relative p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-inner flex flex-col items-center",children:g.jsx(j0,{customization:p,size:"md",interactive:!1})}),g.jsx("button",{onClick:()=>{dt.playClick();const v={...p,cosmetics:{hat:null,hair:null,glasses:null,shirt:null,pants:null,shoes:null,gloves:null,belt:null,wearable:null,item:null,sfx:null}};x(v),r(v)},className:"mt-3 text-[11px] font-bold text-zinc-400 hover:text-red-400 transition-colors uppercase tracking-wider",children:"Clear All Cosmetics"})]}),g.jsxs("div",{className:"flex-1 flex flex-col overflow-hidden bg-zinc-950",children:[g.jsxs("div",{className:"flex border-b border-zinc-800 px-4 pt-2.5 gap-2",children:[g.jsxs("button",{onClick:()=>{dt.playClick(),d("figure")},className:`flex items-center gap-1.5 px-4 py-2 rounded-t-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all ${l==="figure"?"bg-zinc-800 text-yellow-400 border-t-2 border-yellow-400":"text-zinc-400 hover:text-white hover:bg-zinc-900"}`,children:[g.jsx(Av,{className:"w-4 h-4"})," Base Figure (",M.length,")"]}),g.jsxs("button",{onClick:()=>{dt.playClick(),d("cosmetics")},className:`flex items-center gap-1.5 px-4 py-2 rounded-t-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all ${l==="cosmetics"?"bg-zinc-800 text-yellow-400 border-t-2 border-yellow-400":"text-zinc-400 hover:text-white hover:bg-zinc-900"}`,children:[g.jsx(cd,{className:"w-4 h-4"})," Cosmetics (",t.length,")"]})]}),l==="figure"&&g.jsx("div",{className:"flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 gap-3",children:M.map(C=>{const v=Il[C];if(!v)return null;const _=e[C]||[];return g.jsxs("div",{className:"p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between",children:[g.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[g.jsx(mf,{silhouette:v.silhouette,size:28,color:"#fbbf24"}),g.jsxs("div",{className:"overflow-hidden",children:[g.jsxs("span",{className:"text-[10px] text-zinc-400 font-bold block",children:["Tier ",v.tier]}),g.jsx("h4",{className:"text-xs font-black text-white truncate",children:v.name})]})]}),g.jsx("div",{className:"flex items-center gap-1 mt-2",children:_.map(N=>{const U=qi[N],T=p.figureId===C&&p.figureRarity===N;return g.jsxs("button",{onClick:()=>y(C,N),className:`flex-1 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border flex items-center justify-center gap-0.5 transition-all ${T?"border-white bg-white text-black font-extrabold shadow-md":"border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500"}`,style:{color:T?"#000":U.hexColor},title:U.name,children:[T&&g.jsx(ld,{className:"w-2 h-2"}),U.name[0]]},N)})})]},C)})}),l==="cosmetics"&&g.jsxs("div",{className:"flex-1 flex flex-col overflow-hidden",children:[g.jsx("div",{className:"flex overflow-x-auto no-scrollbar gap-1.5 p-2.5 border-b border-zinc-800 bg-zinc-900/40",children:Vx.map(C=>{const v=u===C.id,_=Yo.filter(N=>N.category===C.id&&t.includes(N.id)).length;return g.jsxs("button",{onClick:()=>{dt.playClick(),h(C.id)},className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${v?"bg-yellow-400 text-black shadow-md":"bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700"}`,children:[g.jsx(Qd,{category:C.id,size:14,color:v?"#000":"currentColor"}),g.jsx("span",{children:C.label}),g.jsxs("span",{className:"text-[10px] opacity-75 font-black",children:["(",_,")"]})]},C.id)})}),g.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:A.length===0?g.jsxs("div",{className:"h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500",children:[g.jsx(no,{className:"w-8 h-8 mb-2 opacity-30"}),g.jsx("p",{className:"text-xs sm:text-sm font-bold text-zinc-400",children:"No cosmetics unlocked in this slot yet"}),g.jsx("p",{className:"text-[11px] text-zinc-500 mt-1 max-w-xs",children:"Open more lootboxes to unbox rare cosmetics for your avatar."})]}):g.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-3",children:A.map(C=>{const v=qi[C.rarity],_=p.cosmetics[u]===C.id;return g.jsxs("div",{onClick:()=>S(C.id,u),className:`p-3 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${_?"bg-yellow-400/10 border-yellow-400 shadow-lg shadow-yellow-500/20 scale-102":"bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850"}`,children:[g.jsxs("div",{className:"flex items-center justify-between",children:[g.jsx("span",{className:"text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border",style:{borderColor:v.hexColor,color:v.hexColor,backgroundColor:"rgba(0,0,0,0.5)"},children:v.name}),_&&g.jsx("span",{className:"p-0.5 rounded-full bg-yellow-400 text-black",children:g.jsx(ld,{className:"w-3 h-3 stroke-[3]"})})]}),g.jsx("div",{className:"my-2.5 flex items-center justify-center",children:g.jsx(Qd,{category:C.category,size:32,color:v.hexColor})}),g.jsxs("div",{children:[g.jsx("div",{className:"text-xs font-black text-white truncate",children:C.name}),g.jsx("p",{className:"text-[10px] text-zinc-400 line-clamp-1 mt-0.5",children:C.description})]})]},C.id)})})})]})]})]}),g.jsx("div",{className:"p-3 bg-zinc-900/90 border-t border-zinc-800 flex justify-end",children:g.jsx("button",{onClick:()=>{dt.playClick(),a()},className:"py-2 px-5 rounded-xl font-black text-xs uppercase tracking-wider bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95",children:"Apply & Done"})})]})})},iE=({unlockedFigures:s,onClose:e})=>{const[t,r]=mt.useState(1);let a=1e3,l=0;Object.values(s).forEach(y=>{l+=y.length});const d=Ys[t]||[],u=d.length*5;let h=0;d.forEach(y=>{const S=s[y.id]||[];h+=S.length});const p=(l/a*100).toFixed(1),x=(h/u*100).toFixed(0);return g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-fade-in",children:g.jsxs("div",{className:"relative w-full max-w-4xl h-[85vh] bg-zinc-950 border-2 border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col",children:[g.jsxs("div",{className:"flex items-center justify-between px-6 py-3.5 bg-zinc-900/90 border-b border-zinc-800",children:[g.jsxs("div",{className:"flex items-center gap-2.5",children:[g.jsx(Fl,{className:"w-5 h-5 text-yellow-400"}),g.jsxs("div",{children:[g.jsx("h3",{className:"text-sm sm:text-base font-black text-white uppercase tracking-wider font-display",children:"Figures Codex (200 Figures / 1,000 Variants)"}),g.jsx("p",{className:"text-[11px] text-zinc-400",children:"Collect all 5 rarity variants (Common, Uncommon, Rare, Mythic, Legendary) for every figure"})]})]}),g.jsx("button",{onClick:()=>{dt.playClick(),e()},className:"p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors",children:g.jsx(nf,{className:"w-5 h-5"})})]}),g.jsxs("div",{className:"bg-zinc-900 px-6 py-2.5 border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2.5",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx(Fl,{className:"w-4 h-4 text-yellow-400"}),g.jsx("span",{className:"text-xs font-bold text-zinc-300",children:"Codex Completion:"}),g.jsxs("span",{className:"text-xs sm:text-sm font-black text-yellow-400",children:[l," / ",a," (",p,"%)"]})]}),g.jsx("div",{className:"w-full sm:w-64 bg-zinc-800 h-2 rounded-full overflow-hidden",children:g.jsx("div",{className:"bg-gradient-to-r from-amber-400 to-yellow-400 h-full rounded-full transition-all duration-500",style:{width:`${p}%`}})})]}),g.jsx("div",{className:"flex overflow-x-auto no-scrollbar gap-1.5 p-2.5 border-b border-zinc-800 bg-zinc-900/40",children:es.map(y=>{const S=t===y.tier;return g.jsxs("button",{onClick:()=>{dt.playClick(),r(y.tier)},className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${S?"bg-yellow-400 text-black shadow-md scale-102":"bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700"}`,children:[H0(y.tier,{size:14,color:S?"#000":"currentColor"}),g.jsxs("span",{children:["T",y.tier]}),g.jsx("span",{className:"truncate max-w-[70px]",children:y.name.split(" ")[0]})]},y.tier)})}),g.jsxs("div",{className:"px-6 py-2 bg-zinc-900/60 flex items-center justify-between text-xs border-b border-zinc-800",children:[g.jsxs("span",{className:"text-zinc-300 font-bold",children:["Tier ",t,": ",h," / ",u," variants unlocked (",x,"%)"]}),g.jsx("span",{className:"text-zinc-500 text-[11px]",children:"20 Figures in pool"})]}),g.jsx("div",{className:"flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",children:d.map(y=>{const S=s[y.id]||[],M=S.length>0;return g.jsxs("div",{className:`p-3 rounded-2xl border flex flex-col justify-between transition-all ${M?"bg-zinc-900/80 border-zinc-700":"bg-zinc-950/40 border-zinc-850 opacity-40"}`,children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center justify-between text-[11px] text-zinc-400 font-bold mb-1.5",children:[g.jsxs("span",{children:["#",y.id.split("_")[2]]}),g.jsx(mf,{silhouette:y.silhouette,size:20,color:M?"#fbbf24":"#64748b"})]}),g.jsx("h4",{className:"text-xs sm:text-sm font-black text-white truncate",children:y.name}),g.jsx("p",{className:"text-[10px] text-zinc-400 line-clamp-2 mt-0.5",children:y.description})]}),g.jsx("div",{className:"flex items-center gap-1 mt-2.5 pt-2 border-t border-zinc-800",children:e0.map(A=>{const C=S.includes(A),v=qi[A];return g.jsx("div",{className:`flex-1 py-0.5 rounded text-center text-[9px] font-black uppercase tracking-wider border transition-all ${C?"shadow-sm font-extrabold":"opacity-20 border-zinc-800 bg-zinc-900 text-zinc-600"}`,style:{borderColor:C?v.hexColor:void 0,backgroundColor:C?`${v.hexColor}25`:void 0,color:C?v.hexColor:void 0},title:`${y.variants[A].title} (${v.name})`,children:v.name[0]},A)})})]},y.id)})}),g.jsxs("div",{className:"p-3 bg-zinc-900/90 border-t border-zinc-800 flex justify-between items-center",children:[g.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-zinc-400",children:[g.jsx(no,{className:"w-3.5 h-3.5 text-yellow-400"}),g.jsx("span",{className:"text-[11px]",children:"Duplicates automatically cash out for bonus coins."})]}),g.jsx("button",{onClick:()=>{dt.playClick(),e()},className:"py-1.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-white transition-colors",children:"Close"})]})]})})},rE=({onClose:s,onAwardCoins:e,highScore:t})=>{const r=mt.useRef(null),[a,l]=mt.useState(!1),[d,u]=mt.useState(0),[h,p]=mt.useState(0),x=mt.useRef({player:{x:180,y:400,width:32,height:38,vx:0,vy:0,facing:"right"},cameraY:0,score:0,coins:0,platforms:[],keys:{left:!1,right:!1},isRunning:!0}),y=mt.useCallback((A,C)=>{x.current.isRunning=!1,dt.playGameOver(),l(!0),e(C,A)},[e]),S=mt.useCallback(()=>{const A=x.current;A.player={x:180,y:450,width:32,height:38,vx:0,vy:-10,facing:"right"},A.cameraY=0,A.score=0,A.coins=0,A.isRunning=!0,u(0),p(0),l(!1);const C=[{x:160,y:550,width:80,height:14,type:"standard"},{x:80,y:460,width:80,height:14,type:"standard",hasCoin:!0},{x:240,y:370,width:80,height:14,type:"standard"},{x:120,y:280,width:80,height:14,type:"spring"},{x:200,y:190,width:80,height:14,type:"moving",vx:1.5,hasCoin:!0},{x:90,y:100,width:80,height:14,type:"fragile"},{x:220,y:10,width:80,height:14,type:"standard"}];A.platforms=C},[]);mt.useEffect(()=>{S();const A=N=>{(N.key==="ArrowLeft"||N.key==="a"||N.key==="A")&&(x.current.keys.left=!0,x.current.player.facing="left"),(N.key==="ArrowRight"||N.key==="d"||N.key==="D")&&(x.current.keys.right=!0,x.current.player.facing="right")},C=N=>{(N.key==="ArrowLeft"||N.key==="a"||N.key==="A")&&(x.current.keys.left=!1),(N.key==="ArrowRight"||N.key==="d"||N.key==="D")&&(x.current.keys.right=!1)};window.addEventListener("keydown",A),window.addEventListener("keyup",C);let v;const _=()=>{const N=x.current,U=r.current;if(!U||!N.isRunning)return;const T=U.getContext("2d");if(!T)return;const Y=U.width,O=U.height,I=N.player;if(N.keys.left?I.vx=-6.5:N.keys.right?I.vx=6.5:I.vx*=.85,I.x+=I.vx,I.x<-I.width&&(I.x=Y),I.x>Y&&(I.x=-I.width),I.vy+=.38,I.y+=I.vy,I.y<O/2){const w=O/2-I.y;I.y=O/2,N.cameraY+=w,N.score+=Math.floor(w),u(N.score),N.platforms.forEach(z=>{z.y+=w})}I.vy>0&&N.platforms.forEach(w=>{if(w.broken)return;const z=I.y+I.height,ie=z-I.vy;I.x+I.width-6>w.x&&I.x+6<w.x+w.width&&ie<=w.y+6&&z>=w.y&&(w.type==="spring"?(I.vy=-18,dt.playSpringJump()):w.type==="fragile"?(w.broken=!0,I.vy=-8,dt.playJumpBoing()):(I.vy=-11.5,dt.playJumpBoing()))}),N.platforms.forEach(w=>{if(w.hasCoin&&!w.broken){const z=w.x+w.width/2,ie=w.y-14;Math.hypot(I.x+I.width/2-z,I.y+I.height/2-ie)<28&&(w.hasCoin=!1,N.coins+=5,p(N.coins),dt.playCoinPickup())}}),N.platforms.forEach(w=>{w.type==="moving"&&w.vx&&(w.x+=w.vx,(w.x<10||w.x+w.width>Y-10)&&(w.vx*=-1))}),N.platforms=N.platforms.filter(w=>w.y<O+50);const W=N.platforms.reduce((w,z)=>Math.min(w,z.y),O);if(W>70){const w=Math.random()*(Y-90)+10,z=Math.random(),ie=z<.6?"standard":z<.78?"moving":z<.9?"spring":"fragile";N.platforms.push({x:w,y:W-(60+Math.random()*40),width:75,height:14,type:ie,vx:ie==="moving"?Math.random()<.5?2:-2:void 0,hasCoin:Math.random()<.35})}if(I.y>O+50){const w=Math.floor(N.score/25),z=Math.max(10,w+N.coins);y(N.score,z);return}T.fillStyle="#0f172a",T.fillRect(0,0,Y,O),T.strokeStyle="#1e293b",T.lineWidth=1;const L=24;for(let w=0;w<Y;w+=L)T.beginPath(),T.moveTo(w,0),T.lineTo(w,O),T.stroke();for(let w=0;w<O;w+=L)T.beginPath(),T.moveTo(0,w),T.lineTo(Y,w),T.stroke();N.platforms.forEach(w=>{w.broken||(T.save(),w.type==="spring"?(T.fillStyle="#9333ea",T.beginPath(),T.roundRect(w.x,w.y,w.width,w.height,4),T.fill(),T.strokeStyle="#c084fc",T.lineWidth=1.5,T.stroke(),T.strokeStyle="#f3e8ff",T.lineWidth=2,T.beginPath(),T.arc(w.x+w.width/2,w.y-6,6,0,Math.PI,!0),T.stroke()):w.type==="moving"?(T.fillStyle="#0284c7",T.beginPath(),T.roundRect(w.x,w.y,w.width,w.height,4),T.fill(),T.strokeStyle="#38bdf8",T.lineWidth=1.5,T.stroke()):w.type==="fragile"?(T.fillStyle="#78350f",T.beginPath(),T.roundRect(w.x,w.y,w.width,w.height,4),T.fill(),T.strokeStyle="#d97706",T.lineWidth=2,T.beginPath(),T.moveTo(w.x+10,w.y+2),T.lineTo(w.x+40,w.y+12),T.lineTo(w.x+70,w.y+3),T.stroke()):(T.fillStyle="#059669",T.beginPath(),T.roundRect(w.x,w.y,w.width,w.height,4),T.fill(),T.strokeStyle="#34d399",T.lineWidth=1.5,T.stroke()),w.hasCoin&&(T.fillStyle="#fbbf24",T.beginPath(),T.arc(w.x+w.width/2,w.y-12,7,0,Math.PI*2),T.fill(),T.strokeStyle="#f59e0b",T.lineWidth=1.5,T.stroke()),T.restore())}),T.save(),T.translate(I.x+I.width/2,I.y+I.height/2),I.facing==="left"&&T.scale(-1,1),T.fillStyle="#334155",T.beginPath(),T.roundRect(-I.width/2,-I.height/2,I.width,I.height,8),T.fill(),T.strokeStyle="#00e5ff",T.lineWidth=2,T.stroke(),T.fillStyle="#00e5ff",T.fillRect(2,-8,10,5),T.fillStyle="#fbbf24",T.fillRect(-10,I.height/2-4,8,5),T.fillRect(2,I.height/2-4,8,5),T.restore(),v=requestAnimationFrame(_)};return v=requestAnimationFrame(_),()=>{window.removeEventListener("keydown",A),window.removeEventListener("keyup",C),cancelAnimationFrame(v)}},[S,y]);const M=Math.max(10,Math.floor(d/25)+h);return g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-fade-in",children:g.jsxs("div",{className:"relative w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center",children:[g.jsxs("div",{className:"w-full flex items-center justify-between px-5 py-3.5 bg-slate-950/90 border-b border-slate-800",children:[g.jsxs("div",{className:"flex items-center gap-2.5",children:[g.jsx(Ul,{className:"w-5 h-5 text-emerald-400"}),g.jsxs("div",{children:[g.jsx("h3",{className:"text-xs sm:text-sm font-black text-white uppercase tracking-wider font-display",children:"Scrappy Jump Arcade"}),g.jsx("p",{className:"text-[10px] text-zinc-400",children:"Earn coins to unlock crates"})]})]}),g.jsx("button",{onClick:()=>{dt.playClick(),s()},className:"p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors",children:g.jsx(nf,{className:"w-4 h-4"})})]}),g.jsxs("div",{className:"w-full flex items-center justify-around py-2 px-4 bg-slate-900/90 border-b border-slate-800 text-xs font-bold",children:[g.jsxs("div",{className:"text-zinc-400 flex items-center gap-1",children:["Height: ",g.jsx("span",{className:"text-white font-black",children:d})]}),g.jsxs("div",{className:"text-amber-400 flex items-center gap-1",children:[g.jsx($s,{className:"w-3.5 h-3.5 fill-yellow-400"}),g.jsxs("span",{className:"text-yellow-300 font-black",children:["+",M," Coins"]})]}),g.jsxs("div",{className:"text-zinc-400 flex items-center gap-1",children:[g.jsx(Fl,{className:"w-3 h-3 text-yellow-500"}),g.jsxs("span",{children:["Best: ",t]})]})]}),g.jsxs("div",{className:"relative w-full flex items-center justify-center bg-slate-950",children:[g.jsx("canvas",{ref:r,width:380,height:500,className:"w-full max-w-[380px] h-[500px] block"}),a&&g.jsxs("div",{className:"absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center animate-fade-in",children:[g.jsx("div",{className:"w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-2",children:g.jsx(Ul,{className:"w-6 h-6 text-red-400"})}),g.jsx("h2",{className:"text-xl font-black text-white uppercase tracking-wider",children:"Run Concluded"}),g.jsx("p",{className:"text-[11px] text-zinc-400 mt-0.5",children:"Fell into the scrap reclamation chute."}),g.jsxs("div",{className:"w-full bg-slate-900 border border-slate-800 rounded-2xl p-3.5 my-4 flex flex-col gap-1.5",children:[g.jsxs("div",{className:"flex justify-between items-center text-xs",children:[g.jsx("span",{className:"text-zinc-400",children:"Score Reached:"}),g.jsx("span",{className:"text-white font-black",children:d})]}),g.jsxs("div",{className:"flex justify-between items-center text-xs",children:[g.jsx("span",{className:"text-zinc-400",children:"Coins Collected:"}),g.jsxs("span",{className:"text-amber-400 font-bold",children:["+",h]})]}),g.jsxs("div",{className:"border-t border-slate-800 pt-1.5 flex justify-between items-center text-sm font-black",children:[g.jsx("span",{className:"text-emerald-400",children:"Total Coins Earned:"}),g.jsxs("span",{className:"text-yellow-400 flex items-center gap-1",children:[g.jsx($s,{className:"w-3.5 h-3.5 fill-yellow-400"})," +",M]})]})]}),g.jsxs("div",{className:"w-full flex flex-col gap-2",children:[g.jsxs("button",{onClick:()=>{dt.playClick(),S()},className:"w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center gap-1.5 transition-transform hover:scale-102 active:scale-98 shadow-md",children:[g.jsx(s0,{className:"w-3.5 h-3.5"})," Play Again"]}),g.jsx("button",{onClick:()=>{dt.playClick(),s()},className:"w-full py-2 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-zinc-300 transition-colors",children:"Return to Lootboxes"})]})]})]}),g.jsxs("div",{className:"w-full p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3",children:[g.jsxs("button",{onMouseDown:()=>x.current.keys.left=!0,onMouseUp:()=>x.current.keys.left=!1,onTouchStart:()=>x.current.keys.left=!0,onTouchEnd:()=>x.current.keys.left=!1,className:"flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-black text-sm transition-colors select-none flex items-center justify-center gap-1",children:[g.jsx($x,{className:"w-4 h-4"})," Left"]}),g.jsx("span",{className:"text-[10px] text-zinc-500 font-semibold uppercase tracking-wider",children:"A / D Keys"}),g.jsxs("button",{onMouseDown:()=>x.current.keys.right=!0,onMouseUp:()=>x.current.keys.right=!1,onTouchStart:()=>x.current.keys.right=!0,onTouchEnd:()=>x.current.keys.right=!1,className:"flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-black text-sm transition-colors select-none flex items-center justify-center gap-1",children:["Right ",g.jsx(Zx,{className:"w-4 h-4"})]})]})]})})},sE=()=>{const[s,e]=mt.useState(()=>Ux()),[t,r]=mt.useState(!1),[a,l]=mt.useState(null),[d,u]=mt.useState(!1),[h,p]=mt.useState(!1),[x,y]=mt.useState(!1);mt.useEffect(()=>{Fx(s)},[s]),mt.useEffect(()=>{dt.setMuted(s.soundMuted)},[s.soundMuted]);const S=es.find(T=>T.tier===s.currentTier)||es[0],M=mt.useCallback(()=>{e(T=>{const Y=!T.soundMuted;return dt.setMuted(Y),{...T,soundMuted:Y}})},[]),A=mt.useCallback(T=>{e(Y=>({...Y,currentTier:T}))},[]),C=mt.useCallback(()=>{if(s.coins<S.cost||t)return;e(Y=>({...Y,coins:Y.coins-S.cost})),r(!0);const T=Hx(s.currentTier,s);l(T)},[s,S,t]),v=mt.useCallback(()=>{a&&(e(T=>{let Y=T.coins;const O={...T.unlockedFigures},I=[...T.unlockedCosmetics];let W=T.stats.duplicatesCashed;const L={...T.stats.rarityCounts};return a.forEach(w=>{if(L[w.rarity]=(L[w.rarity]||0)+1,w.isDuplicate)Y+=w.duplicatePayout,W+=1;else if(w.type==="figure"&&w.figure){const z=O[w.figure.id]||[];z.includes(w.rarity)||(O[w.figure.id]=[...z,w.rarity])}else w.type==="cosmetic"&&w.cosmetic&&(I.includes(w.cosmetic.id)||I.push(w.cosmetic.id))}),{...T,coins:Y,unlockedFigures:O,unlockedCosmetics:I,stats:{...T.stats,cratesOpened:T.stats.cratesOpened+1,duplicatesCashed:W,totalCoinsEarned:T.stats.totalCoinsEarned+(Y-T.coins),rarityCounts:L}}}),r(!1),l(null))},[a]),_=mt.useCallback(T=>{e(Y=>({...Y,avatar:T}))},[]),N=mt.useCallback((T,Y)=>{e(O=>({...O,coins:O.coins+T,stats:{...O.stats,totalCoinsEarned:O.stats.totalCoinsEarned+T,doodleJumpTotalCoins:O.stats.doodleJumpTotalCoins+T,doodleJumpBestScore:Math.max(O.stats.doodleJumpBestScore,Y)}}))},[]),U=mt.useCallback(()=>{const T=Ox();e(T)},[]);return g.jsxs("div",{className:"relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden transition-all duration-1000",style:{background:S.bgGradient},children:[g.jsxs("div",{className:"absolute inset-0 pointer-events-none overflow-hidden",children:[g.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full filter blur-[120px] opacity-20 transition-all duration-1000",style:{backgroundColor:S.glowColor}}),S.tier>=4&&g.jsx("div",{className:"absolute inset-0 opacity-10 bg-[radial-gradient(#00ffff_1px,transparent_1px)] [background-size:24px_24px]"}),S.tier>=7&&g.jsx("div",{className:"absolute inset-0 opacity-15 bg-[radial-gradient(#ff0055_1.5px,transparent_1.5px)] [background-size:32px_32px]"})]}),g.jsx(kv,{coins:s.coins,soundMuted:s.soundMuted,onToggleSound:M,onOpenDoodleJump:()=>y(!0),onOpenWardrobe:()=>u(!0),onOpenCodex:()=>p(!0),onResetSave:U}),g.jsxs("main",{className:"relative flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 py-2 z-10 gap-4",children:[g.jsxs("aside",{className:"w-full lg:w-68 flex flex-col items-center bg-zinc-950/60 backdrop-blur-md border border-zinc-800/80 rounded-3xl p-4 shadow-2xl",children:[g.jsxs("div",{className:"w-full flex items-center justify-between pb-2 mb-1 border-b border-zinc-800 text-xs font-bold text-zinc-400",children:[g.jsx("span",{className:"uppercase tracking-wider",children:"Your Avatar"}),g.jsx("span",{className:"text-[10px] bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 px-2 py-0.5 rounded-full font-black",children:"Player"})]}),g.jsx(j0,{customization:s.avatar,size:"md",interactive:!0,onClick:()=>{dt.playClick(),u(!0)}}),g.jsxs("button",{onClick:()=>{dt.playClick(),u(!0)},className:"w-full mt-3 py-2 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-all hover:scale-102 flex items-center justify-center gap-2",children:[g.jsx(cd,{className:"w-3.5 h-3.5 text-yellow-400"}),g.jsx("span",{children:"Fitting Room"})]})]}),g.jsx("section",{className:"flex-1 w-full flex flex-col items-center justify-center my-auto",children:g.jsx(Gw,{tier:S,coins:s.coins,isOpening:t,onOpen:C,onOpenDoodleJump:()=>y(!0)})}),g.jsxs("aside",{className:"hidden xl:flex w-68 flex-col gap-2.5 bg-zinc-950/60 backdrop-blur-md border border-zinc-800/80 rounded-3xl p-4 shadow-2xl text-xs",children:[g.jsxs("div",{className:"flex items-center justify-between pb-2 border-b border-zinc-800 font-bold text-zinc-400 uppercase tracking-wider",children:[g.jsx("span",{children:"Career Record"}),g.jsx(Tv,{className:"w-3.5 h-3.5 text-yellow-400 fill-yellow-400"})]}),g.jsxs("div",{className:"flex justify-between items-center py-0.5",children:[g.jsx("span",{className:"text-zinc-400",children:"Crates Opened:"}),g.jsx("span",{className:"text-white font-black",children:s.stats.cratesOpened})]}),g.jsxs("div",{className:"flex justify-between items-center py-0.5",children:[g.jsx("span",{className:"text-zinc-400",children:"Duplicates Sold:"}),g.jsx("span",{className:"text-amber-400 font-black",children:s.stats.duplicatesCashed})]}),g.jsxs("div",{className:"flex justify-between items-center py-0.5",children:[g.jsx("span",{className:"text-zinc-400",children:"Doodle Jump Best:"}),g.jsxs("span",{className:"text-emerald-400 font-black",children:[s.stats.doodleJumpBestScore," pts"]})]}),g.jsxs("div",{className:"border-t border-zinc-800 pt-2 flex flex-col gap-1.5",children:[g.jsx("div",{className:"text-[10px] font-bold text-zinc-400 uppercase tracking-wider",children:"Rarities Unboxed:"}),g.jsxs("div",{className:"grid grid-cols-5 gap-1 text-center font-black text-[10px]",children:[g.jsxs("div",{className:"p-1 rounded bg-zinc-800/80 text-zinc-400",title:"Common",children:["C: ",s.stats.rarityCounts.common||0]}),g.jsxs("div",{className:"p-1 rounded bg-blue-950/80 text-blue-400",title:"Uncommon",children:["U: ",s.stats.rarityCounts.uncommon||0]}),g.jsxs("div",{className:"p-1 rounded bg-amber-950/80 text-amber-400",title:"Rare",children:["R: ",s.stats.rarityCounts.rare||0]}),g.jsxs("div",{className:"p-1 rounded bg-red-950/80 text-red-400",title:"Mythic",children:["M: ",s.stats.rarityCounts.mythic||0]}),g.jsxs("div",{className:"p-1 rounded bg-yellow-950/80 text-yellow-300",title:"Legendary",children:["L: ",s.stats.rarityCounts.legendary||0]})]})]}),g.jsxs("button",{onClick:()=>{dt.playClick(),y(!0)},className:"w-full mt-1.5 py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 font-black text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5",children:[g.jsx(Ul,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Play Doodle Jump"})]})]})]}),g.jsx("footer",{className:"w-full z-20 pb-3 pt-1 flex justify-center",children:g.jsx(Jw,{currentTier:s.currentTier,userCoins:s.coins,unlockedFigures:s.unlockedFigures,onSelectTier:A})}),t&&a&&g.jsx(tE,{items:a,tierCost:S.cost,onFinish:v}),d&&g.jsx(nE,{customization:s.avatar,unlockedFigures:s.unlockedFigures,unlockedCosmetics:s.unlockedCosmetics,onUpdateCustomization:_,onClose:()=>u(!1)}),h&&g.jsx(iE,{unlockedFigures:s.unlockedFigures,onClose:()=>p(!1)}),x&&g.jsx(rE,{onClose:()=>y(!1),onAwardCoins:N,highScore:s.stats.doodleJumpBestScore})]})};Ix.createRoot(document.getElementById("root")).render(g.jsx(Ax.StrictMode,{children:g.jsx(sE,{})}));
