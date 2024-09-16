"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/use-sound";
exports.ids = ["vendor-chunks/use-sound"];
exports.modules = {

/***/ "(ssr)/./node_modules/use-sound/dist/use-sound.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/use-sound/dist/use-sound.esm.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   useSound: () => (/* binding */ useSound)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction _extends() {\n  return _extends = Object.assign ? Object.assign.bind() : function (n) {\n    for (var e = 1; e < arguments.length; e++) {\n      var t = arguments[e];\n      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);\n    }\n    return n;\n  }, _extends.apply(null, arguments);\n}\nfunction _objectWithoutPropertiesLoose(r, e) {\n  if (null == r) return {};\n  var t = {};\n  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {\n    if (e.indexOf(n) >= 0) continue;\n    t[n] = r[n];\n  }\n  return t;\n}\n\nfunction useOnMount(callback) {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(callback, []);\n}\n\nvar _excluded = [\"id\", \"volume\", \"playbackRate\", \"soundEnabled\", \"interrupt\", \"onload\"];\nfunction useSound(src, _temp) {\n  var _ref = _temp === void 0 ? {} : _temp,\n    _ref$volume = _ref.volume,\n    volume = _ref$volume === void 0 ? 1 : _ref$volume,\n    _ref$playbackRate = _ref.playbackRate,\n    playbackRate = _ref$playbackRate === void 0 ? 1 : _ref$playbackRate,\n    _ref$soundEnabled = _ref.soundEnabled,\n    soundEnabled = _ref$soundEnabled === void 0 ? true : _ref$soundEnabled,\n    _ref$interrupt = _ref.interrupt,\n    interrupt = _ref$interrupt === void 0 ? false : _ref$interrupt,\n    onload = _ref.onload,\n    delegated = _objectWithoutPropertiesLoose(_ref, _excluded);\n  var HowlConstructor = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(null);\n  var isMounted = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(false);\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),\n    duration = _React$useState[0],\n    setDuration = _React$useState[1];\n  var _React$useState2 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),\n    sound = _React$useState2[0],\n    setSound = _React$useState2[1];\n  var handleLoad = function handleLoad() {\n    if (typeof onload === 'function') {\n      // @ts-ignore\n      onload.call(this);\n    }\n    if (isMounted.current) {\n      // @ts-ignore\n      setDuration(this.duration() * 1000);\n    }\n    // @ts-ignore\n    setSound(this);\n  };\n  // We want to lazy-load Howler, since sounds can't play on load anyway.\n  useOnMount(function () {\n    __webpack_require__.e(/*! import() */ \"vendor-chunks/howler\").then(__webpack_require__.t.bind(__webpack_require__, /*! howler */ \"(ssr)/./node_modules/howler/dist/howler.js\", 23)).then(function (mod) {\n      if (!isMounted.current) {\n        var _mod$Howl;\n        // Depending on the module system used, `mod` might hold\n        // the export directly, or it might be under `default`.\n        HowlConstructor.current = (_mod$Howl = mod.Howl) !== null && _mod$Howl !== void 0 ? _mod$Howl : mod[\"default\"].Howl;\n        isMounted.current = true;\n        new HowlConstructor.current(_extends({\n          src: Array.isArray(src) ? src : [src],\n          volume: volume,\n          rate: playbackRate,\n          onload: handleLoad\n        }, delegated));\n      }\n    });\n    return function () {\n      isMounted.current = false;\n    };\n  });\n  // When the `src` changes, we have to do a whole thing where we recreate\n  // the Howl instance. This is because Howler doesn't expose a way to\n  // tweak the sound\n  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {\n    if (HowlConstructor.current && sound) {\n      setSound(new HowlConstructor.current(_extends({\n        src: Array.isArray(src) ? src : [src],\n        volume: volume,\n        onload: handleLoad\n      }, delegated)));\n    }\n    // The linter wants to run this effect whenever ANYTHING changes,\n    // but very specifically I only want to recreate the Howl instance\n    // when the `src` changes. Other changes should have no effect.\n    // Passing array to the useEffect dependencies list will result in\n    // ifinite loop so we need to stringify it, for more details check\n    // https://github.com/facebook/react/issues/14476#issuecomment-471199055\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [JSON.stringify(src)]);\n  // Whenever volume/playbackRate are changed, change those properties\n  // on the sound instance.\n  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {\n    if (sound) {\n      sound.volume(volume);\n      sound.rate(playbackRate);\n    }\n    // A weird bug means that including the `sound` here can trigger an\n    // error on unmount, where the state loses track of the sprites??\n    // No idea, but anyway I don't need to re-run this if only the `sound`\n    // changes.\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [volume, playbackRate]);\n  var play = react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(function (options) {\n    if (typeof options === 'undefined') {\n      options = {};\n    }\n    if (!sound || !soundEnabled && !options.forceSoundEnabled) {\n      return;\n    }\n    if (interrupt) {\n      sound.stop();\n    }\n    if (options.playbackRate) {\n      sound.rate(options.playbackRate);\n    }\n    sound.play(options.id);\n  }, [sound, soundEnabled, interrupt]);\n  var stop = react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(function (id) {\n    if (!sound) {\n      return;\n    }\n    sound.stop(id);\n  }, [sound]);\n  var pause = react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(function (id) {\n    if (!sound) {\n      return;\n    }\n    sound.pause(id);\n  }, [sound]);\n  var returnedValue = [play, {\n    sound: sound,\n    stop: stop,\n    pause: pause,\n    duration: duration\n  }];\n  return returnedValue;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSound);\n\n//# sourceMappingURL=use-sound.esm.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLXNvdW5kL2Rpc3QvdXNlLXNvdW5kLmVzbS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWtEOztBQUVsRDtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLGdEQUFTO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtREFBcUI7QUFDN0Msa0JBQWtCLG1EQUFxQjtBQUN2Qyx3QkFBd0IscURBQXVCO0FBQy9DO0FBQ0E7QUFDQSx5QkFBeUIscURBQXVCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxtTEFBZ0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRSxzREFBd0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFLHNEQUF3QjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsYUFBYSx3REFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsYUFBYSx3REFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsY0FBYyx3REFBMEI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBLGlFQUFlLFFBQVEsRUFBQztBQUNKO0FBQ3BCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGljdG8tZ3Vlc3MvLi9ub2RlX21vZHVsZXMvdXNlLXNvdW5kL2Rpc3QvdXNlLXNvdW5kLmVzbS5qcz9hZWUzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdF9fZGVmYXVsdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICByZXR1cm4gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAobikge1xuICAgIGZvciAodmFyIGUgPSAxOyBlIDwgYXJndW1lbnRzLmxlbmd0aDsgZSsrKSB7XG4gICAgICB2YXIgdCA9IGFyZ3VtZW50c1tlXTtcbiAgICAgIGZvciAodmFyIHIgaW4gdCkgKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsIHIpICYmIChuW3JdID0gdFtyXSk7XG4gICAgfVxuICAgIHJldHVybiBuO1xuICB9LCBfZXh0ZW5kcy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufVxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UociwgZSkge1xuICBpZiAobnVsbCA9PSByKSByZXR1cm4ge307XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIG4gaW4gcikgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwociwgbikpIHtcbiAgICBpZiAoZS5pbmRleE9mKG4pID49IDApIGNvbnRpbnVlO1xuICAgIHRbbl0gPSByW25dO1xuICB9XG4gIHJldHVybiB0O1xufVxuXG5mdW5jdGlvbiB1c2VPbk1vdW50KGNhbGxiYWNrKSB7XG4gIHVzZUVmZmVjdChjYWxsYmFjaywgW10pO1xufVxuXG52YXIgX2V4Y2x1ZGVkID0gW1wiaWRcIiwgXCJ2b2x1bWVcIiwgXCJwbGF5YmFja1JhdGVcIiwgXCJzb3VuZEVuYWJsZWRcIiwgXCJpbnRlcnJ1cHRcIiwgXCJvbmxvYWRcIl07XG5mdW5jdGlvbiB1c2VTb3VuZChzcmMsIF90ZW1wKSB7XG4gIHZhciBfcmVmID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXAsXG4gICAgX3JlZiR2b2x1bWUgPSBfcmVmLnZvbHVtZSxcbiAgICB2b2x1bWUgPSBfcmVmJHZvbHVtZSA9PT0gdm9pZCAwID8gMSA6IF9yZWYkdm9sdW1lLFxuICAgIF9yZWYkcGxheWJhY2tSYXRlID0gX3JlZi5wbGF5YmFja1JhdGUsXG4gICAgcGxheWJhY2tSYXRlID0gX3JlZiRwbGF5YmFja1JhdGUgPT09IHZvaWQgMCA/IDEgOiBfcmVmJHBsYXliYWNrUmF0ZSxcbiAgICBfcmVmJHNvdW5kRW5hYmxlZCA9IF9yZWYuc291bmRFbmFibGVkLFxuICAgIHNvdW5kRW5hYmxlZCA9IF9yZWYkc291bmRFbmFibGVkID09PSB2b2lkIDAgPyB0cnVlIDogX3JlZiRzb3VuZEVuYWJsZWQsXG4gICAgX3JlZiRpbnRlcnJ1cHQgPSBfcmVmLmludGVycnVwdCxcbiAgICBpbnRlcnJ1cHQgPSBfcmVmJGludGVycnVwdCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJGludGVycnVwdCxcbiAgICBvbmxvYWQgPSBfcmVmLm9ubG9hZCxcbiAgICBkZWxlZ2F0ZWQgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfcmVmLCBfZXhjbHVkZWQpO1xuICB2YXIgSG93bENvbnN0cnVjdG9yID0gUmVhY3RfX2RlZmF1bHQudXNlUmVmKG51bGwpO1xuICB2YXIgaXNNb3VudGVkID0gUmVhY3RfX2RlZmF1bHQudXNlUmVmKGZhbHNlKTtcbiAgdmFyIF9SZWFjdCR1c2VTdGF0ZSA9IFJlYWN0X19kZWZhdWx0LnVzZVN0YXRlKG51bGwpLFxuICAgIGR1cmF0aW9uID0gX1JlYWN0JHVzZVN0YXRlWzBdLFxuICAgIHNldER1cmF0aW9uID0gX1JlYWN0JHVzZVN0YXRlWzFdO1xuICB2YXIgX1JlYWN0JHVzZVN0YXRlMiA9IFJlYWN0X19kZWZhdWx0LnVzZVN0YXRlKG51bGwpLFxuICAgIHNvdW5kID0gX1JlYWN0JHVzZVN0YXRlMlswXSxcbiAgICBzZXRTb3VuZCA9IF9SZWFjdCR1c2VTdGF0ZTJbMV07XG4gIHZhciBoYW5kbGVMb2FkID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICBpZiAodHlwZW9mIG9ubG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgb25sb2FkLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIGlmIChpc01vdW50ZWQuY3VycmVudCkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgc2V0RHVyYXRpb24odGhpcy5kdXJhdGlvbigpICogMTAwMCk7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBzZXRTb3VuZCh0aGlzKTtcbiAgfTtcbiAgLy8gV2Ugd2FudCB0byBsYXp5LWxvYWQgSG93bGVyLCBzaW5jZSBzb3VuZHMgY2FuJ3QgcGxheSBvbiBsb2FkIGFueXdheS5cbiAgdXNlT25Nb3VudChmdW5jdGlvbiAoKSB7XG4gICAgaW1wb3J0KCdob3dsZXInKS50aGVuKGZ1bmN0aW9uIChtb2QpIHtcbiAgICAgIGlmICghaXNNb3VudGVkLmN1cnJlbnQpIHtcbiAgICAgICAgdmFyIF9tb2QkSG93bDtcbiAgICAgICAgLy8gRGVwZW5kaW5nIG9uIHRoZSBtb2R1bGUgc3lzdGVtIHVzZWQsIGBtb2RgIG1pZ2h0IGhvbGRcbiAgICAgICAgLy8gdGhlIGV4cG9ydCBkaXJlY3RseSwgb3IgaXQgbWlnaHQgYmUgdW5kZXIgYGRlZmF1bHRgLlxuICAgICAgICBIb3dsQ29uc3RydWN0b3IuY3VycmVudCA9IChfbW9kJEhvd2wgPSBtb2QuSG93bCkgIT09IG51bGwgJiYgX21vZCRIb3dsICE9PSB2b2lkIDAgPyBfbW9kJEhvd2wgOiBtb2RbXCJkZWZhdWx0XCJdLkhvd2w7XG4gICAgICAgIGlzTW91bnRlZC5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgbmV3IEhvd2xDb25zdHJ1Y3Rvci5jdXJyZW50KF9leHRlbmRzKHtcbiAgICAgICAgICBzcmM6IEFycmF5LmlzQXJyYXkoc3JjKSA/IHNyYyA6IFtzcmNdLFxuICAgICAgICAgIHZvbHVtZTogdm9sdW1lLFxuICAgICAgICAgIHJhdGU6IHBsYXliYWNrUmF0ZSxcbiAgICAgICAgICBvbmxvYWQ6IGhhbmRsZUxvYWRcbiAgICAgICAgfSwgZGVsZWdhdGVkKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlzTW91bnRlZC5jdXJyZW50ID0gZmFsc2U7XG4gICAgfTtcbiAgfSk7XG4gIC8vIFdoZW4gdGhlIGBzcmNgIGNoYW5nZXMsIHdlIGhhdmUgdG8gZG8gYSB3aG9sZSB0aGluZyB3aGVyZSB3ZSByZWNyZWF0ZVxuICAvLyB0aGUgSG93bCBpbnN0YW5jZS4gVGhpcyBpcyBiZWNhdXNlIEhvd2xlciBkb2Vzbid0IGV4cG9zZSBhIHdheSB0b1xuICAvLyB0d2VhayB0aGUgc291bmRcbiAgUmVhY3RfX2RlZmF1bHQudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoSG93bENvbnN0cnVjdG9yLmN1cnJlbnQgJiYgc291bmQpIHtcbiAgICAgIHNldFNvdW5kKG5ldyBIb3dsQ29uc3RydWN0b3IuY3VycmVudChfZXh0ZW5kcyh7XG4gICAgICAgIHNyYzogQXJyYXkuaXNBcnJheShzcmMpID8gc3JjIDogW3NyY10sXG4gICAgICAgIHZvbHVtZTogdm9sdW1lLFxuICAgICAgICBvbmxvYWQ6IGhhbmRsZUxvYWRcbiAgICAgIH0sIGRlbGVnYXRlZCkpKTtcbiAgICB9XG4gICAgLy8gVGhlIGxpbnRlciB3YW50cyB0byBydW4gdGhpcyBlZmZlY3Qgd2hlbmV2ZXIgQU5ZVEhJTkcgY2hhbmdlcyxcbiAgICAvLyBidXQgdmVyeSBzcGVjaWZpY2FsbHkgSSBvbmx5IHdhbnQgdG8gcmVjcmVhdGUgdGhlIEhvd2wgaW5zdGFuY2VcbiAgICAvLyB3aGVuIHRoZSBgc3JjYCBjaGFuZ2VzLiBPdGhlciBjaGFuZ2VzIHNob3VsZCBoYXZlIG5vIGVmZmVjdC5cbiAgICAvLyBQYXNzaW5nIGFycmF5IHRvIHRoZSB1c2VFZmZlY3QgZGVwZW5kZW5jaWVzIGxpc3Qgd2lsbCByZXN1bHQgaW5cbiAgICAvLyBpZmluaXRlIGxvb3Agc28gd2UgbmVlZCB0byBzdHJpbmdpZnkgaXQsIGZvciBtb3JlIGRldGFpbHMgY2hlY2tcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzE0NDc2I2lzc3VlY29tbWVudC00NzExOTkwNTVcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIH0sIFtKU09OLnN0cmluZ2lmeShzcmMpXSk7XG4gIC8vIFdoZW5ldmVyIHZvbHVtZS9wbGF5YmFja1JhdGUgYXJlIGNoYW5nZWQsIGNoYW5nZSB0aG9zZSBwcm9wZXJ0aWVzXG4gIC8vIG9uIHRoZSBzb3VuZCBpbnN0YW5jZS5cbiAgUmVhY3RfX2RlZmF1bHQudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoc291bmQpIHtcbiAgICAgIHNvdW5kLnZvbHVtZSh2b2x1bWUpO1xuICAgICAgc291bmQucmF0ZShwbGF5YmFja1JhdGUpO1xuICAgIH1cbiAgICAvLyBBIHdlaXJkIGJ1ZyBtZWFucyB0aGF0IGluY2x1ZGluZyB0aGUgYHNvdW5kYCBoZXJlIGNhbiB0cmlnZ2VyIGFuXG4gICAgLy8gZXJyb3Igb24gdW5tb3VudCwgd2hlcmUgdGhlIHN0YXRlIGxvc2VzIHRyYWNrIG9mIHRoZSBzcHJpdGVzPz9cbiAgICAvLyBObyBpZGVhLCBidXQgYW55d2F5IEkgZG9uJ3QgbmVlZCB0byByZS1ydW4gdGhpcyBpZiBvbmx5IHRoZSBgc291bmRgXG4gICAgLy8gY2hhbmdlcy5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIH0sIFt2b2x1bWUsIHBsYXliYWNrUmF0ZV0pO1xuICB2YXIgcGxheSA9IFJlYWN0X19kZWZhdWx0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBpZiAoIXNvdW5kIHx8ICFzb3VuZEVuYWJsZWQgJiYgIW9wdGlvbnMuZm9yY2VTb3VuZEVuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGludGVycnVwdCkge1xuICAgICAgc291bmQuc3RvcCgpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5wbGF5YmFja1JhdGUpIHtcbiAgICAgIHNvdW5kLnJhdGUob3B0aW9ucy5wbGF5YmFja1JhdGUpO1xuICAgIH1cbiAgICBzb3VuZC5wbGF5KG9wdGlvbnMuaWQpO1xuICB9LCBbc291bmQsIHNvdW5kRW5hYmxlZCwgaW50ZXJydXB0XSk7XG4gIHZhciBzdG9wID0gUmVhY3RfX2RlZmF1bHQudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGlkKSB7XG4gICAgaWYgKCFzb3VuZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzb3VuZC5zdG9wKGlkKTtcbiAgfSwgW3NvdW5kXSk7XG4gIHZhciBwYXVzZSA9IFJlYWN0X19kZWZhdWx0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChpZCkge1xuICAgIGlmICghc291bmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc291bmQucGF1c2UoaWQpO1xuICB9LCBbc291bmRdKTtcbiAgdmFyIHJldHVybmVkVmFsdWUgPSBbcGxheSwge1xuICAgIHNvdW5kOiBzb3VuZCxcbiAgICBzdG9wOiBzdG9wLFxuICAgIHBhdXNlOiBwYXVzZSxcbiAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgfV07XG4gIHJldHVybiByZXR1cm5lZFZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VTb3VuZDtcbmV4cG9ydCB7IHVzZVNvdW5kIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2Utc291bmQuZXNtLmpzLm1hcFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-sound/dist/use-sound.esm.js\n");

/***/ })

};
;