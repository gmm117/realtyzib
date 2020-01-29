/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _assets_index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_index_css__WEBPACK_IMPORTED_MODULE_0__);


function initialize() {
  var searchbtn = document.getElementById("search_btn");

  if (searchbtn) {
    searchbtn.addEventListener("click", searchBtnClick);
  }
}

function searchBtnClick(e) {
  deleteAllRow();
  LoadRealty();
}

function deleteAllRow() {
  var tbody = document.getElementById('result_body');
  var totCnt = tbody.childElementCount;

  for (var i = 0; i < totCnt; i++) {
    tbody.deleteRow(0); // 하단부터 삭제
  }
}

function addRow(seq, children) {
  var arrChild = Array.from(children.children);
  var tbody = document.getElementById('result_body');
  var tr = document.createElement("tr");
  var result;
  var td1 = document.createElement("td");
  td1.innerText = seq;
  var td2 = document.createElement("td");
  result = arrChild.filter(function (e) {
    return e.nodeName === "아파트";
  });

  if (result.length > 0) {
    td2.innerText = result[0].innerHTML.trim();
  }

  var td3 = document.createElement("td");
  result = arrChild.filter(function (e) {
    return e.nodeName === "거래금액";
  });

  if (result.length > 0) {
    td3.innerText = result[0].innerHTML.trim();
  }

  var td4 = document.createElement("td");
  result = arrChild.filter(function (e) {
    return e.nodeName === "건축년도";
  });

  if (result.length > 0) {
    td4.innerText = result[0].innerHTML.trim();
  }

  var td5 = document.createElement("td");
  result = arrChild.filter(function (e) {
    return e.nodeName === "전용면적";
  });

  if (result.length > 0) {
    td5.innerText = result[0].innerHTML.trim();
  }

  var td6 = document.createElement("td");
  result = arrChild.filter(function (e) {
    return e.nodeName === "층";
  });

  if (result.length > 0) {
    td6.innerText = result[0].innerHTML.trim() + '층';
  }

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tbody.appendChild(tr);
}

function LoadRealty() {
  var get = 'POST CALL METHOD CALL';
  var xhr = new XMLHttpRequest();
  var parser, xmlDoc, children;
  var seq = 0;
  xhr.open("POST", "/api/call");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function (result) {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(this.responseText, "text/xml");
      children = xmlDoc.getElementsByTagName('body')[0].firstElementChild;

      for (var i = 0; i < children.childElementCount; i++) {
        addRow(++seq, children.children[i]);
      }
    }
  };

  xhr.send(JSON.stringify({
    "serviceKey": "o9cN%2F0w8po32sX1zOEKmo%2BsF%2BQijO6CcaLZmCAcVj45SuyHOPoCCrYbIbjE33hcAN5%2B649xyJV7%2B7ZH8T8PFTA%3D%3D",
    "pageNo": "1",
    "numOfRows": "1000",
    "LAWD_CD": "11710",
    "DEAL_YMD": "201512"
  }));
}

initialize();
LoadRealty();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);