"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookDetailsReducer = exports.bookListReducer = void 0;

var _bookConstants = require("../constants/bookConstants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bookListReducer = function bookListReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    books: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _bookConstants.BOOK_LIST_REQUEST:
      return {
        loading: true,
        books: []
      };

    case _bookConstants.BOOK_LIST_SUCCESS:
      return {
        loading: false,
        books: action.payload
      };

    case _bookConstants.BOOK_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.bookListReducer = bookListReducer;

var bookDetailsReducer = function bookDetailsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    book: {
      reviews: []
    }
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _bookConstants.BOOK_DETAILS_REQUEST:
      return _objectSpread({
        loading: true
      }, state);

    case _bookConstants.BOOK_DETAILS_SUCCESS:
      return {
        loading: false,
        book: action.payload
      };

    case _bookConstants.BOOK_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.bookDetailsReducer = bookDetailsReducer;