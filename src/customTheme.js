Object.defineProperty(exports, '__esModule', {
  value: true
});

let _colors = require('material-ui/styles/colors');

let _colorManipulator = require('material-ui/utils/colorManipulator');

let _spacing = require('material-ui/styles/spacing');

let _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
exports.default = {
  spacing: _spacing2.default,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: _colors.cyan500, //#00BCD4
    primary2Color: _colors.cyan700, //#0097A7
    primary3Color: _colors.grey400, //#BDBDBD
    accent1Color: _colors.pinkA200, //#FF4081
    accent2Color: _colors.grey100, //#F5F5F5
    accent3Color: _colors.grey500, //#9E9E9E
    textColor: _colors.darkBlack,
    secondaryTextColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.54),
    alternateTextColor: _colors.white, //#ffffff
    canvasColor: _colors.white, //#ffffff
    borderColor: _colors.grey300, //#E0E0E0
    disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
    pickerHeaderColor: _colors.cyan500, //#00BCD4
    clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
    shadowColor: _colors.fullBlack,
    successColor: _colors.green500, //#4CAF50
    failColor: _colors.red500, // #F44336
  }
}; /**
    * NB: If you update this file, please also update `docs/src/app/customization/Themes.js`
    */
