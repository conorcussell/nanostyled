'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

const nanostyled = (tag, styleProps) => {
  let Component = props => {
    let { css, filteredProps } = Object.keys(styleProps).reduce(
      (memo, key, index) => {
        let style = props[key] === undefined ? styleProps[key] : props[key];
        if (style) memo.css.push(style);
        delete memo.filteredProps[key];
        return memo;
      },
      {
        css: [props.className].filter(Boolean),
        filteredProps: Object.assign({}, props),
      }
    );

    let passedProps = Object.assign(filteredProps, {
      className: css.join(' '),
      tag: undefined,
    });
    return React.createElement(props.tag || tag, passedProps);
  };

  Component.displayName = `nanostyled-${tag}`;
  return Component;
};

const chemical = (styleProps) => (tweaks = {}) => {
  let styles = Object.assign({}, styleProps, tweaks);
  return Object.keys(styles).reduce((memo, key) => {
    memo.push(styles[key]);
    return memo
  }, []).join(' ');
};

exports.default = nanostyled;
exports.chemical = chemical;
