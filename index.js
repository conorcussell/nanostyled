/**
 * React is imported so that React.createElement can be called
 */
import React from 'react';

/**
 * nanostyled is a function which takes tag and styleProps, not sure what type they are yet...
 */
const nanostyled = (tag, styleProps) => {
  /**
   * Component is a function which takes a props argument, this will be used as a
   * React component so props will be an Object
   */
  let Component = props => {
    /**
     * the styleProps argument from line 9 is an Object
     * the properties css and filteredProps are declared using object destructuring
     */
    let { css, filteredProps } = Object.keys(styleProps).reduce(
      /**
       * the callback function passed to Array.prototype.reduce takes 3 arguments,
       * the accumulator which in this case is an object named 'memo', the
       * current value 'key', and an index. The index isn't actually used here
       * so could be removed.
       *
       * We only care about the arguments memo, key and how they relate to the
       * initial value which is an object defined on line TODO
       */
      (memo, key, index) => {
        /**
         * the style variable is assigned the value which a ternary expression
         * returns.
         *
         * if the current property on the styleProps object is not found on the
         * props object, that prop wasn't passed to the component, and the value in
         * the styleProps object is assigned
         *
         * if it has been passed as a prop, the style variable is assigned to the
         * value of that property on the props object
         */
        let style = props[key] === undefined ? styleProps[key] : props[key];
        /**
         * if style is not falsy, push that value into the css array on memo
         */
        if (style) memo.css.push(style);
        /**
         * delete the property from filteredProps as it was a styleProp
         */
        delete memo.filteredProps[key];
        /**
         * return the memo object
         * {
         *   css: ['ma1', 'pa2'],
         *   filteredProps: {
         *     onClick: () => {}
         *   }
         * }
         */
        return memo;
      },
      {
        /**
         * initialValue is an object with two properties
         *
         * css, this is an array with the className prop which was passed to the component
         *
         * Array.prototype.filter(Boolean) removes any falsy values, which allows you
         * to override the default props by passing falsy values
         */
        css: [props.className].filter(Boolean),
        /**
         * the props object is assigned to filteredProps, in the
         * are the left over props which were passed to the component
         * which aren't for styling - things like onClick etc
         */
        filteredProps: Object.assign({}, props)
      }
    );

    /**
     * declare a variable passedProps using Object.assign to add two properties
     * to the filteredProps object
     *
     * these properties are:
     *
     * className, this is assigned to a string which is returned by joining the css array
     * this array is the custom className and any styleProps and is
     * declared as a property on memo on line 70
     */
    let passedProps = Object.assign(filteredProps, {
      className: css.join(' '),
      tag: undefined
    });
    /**
     * call React.createElement, either with the tag prop, or the tag the
     * component was initialised with and passedProps
     * tag is obviously a string
     */
    return React.createElement(props.tag || tag, passedProps);
  };

  /**
   * set the components displayName, this stops it displaying as unknown in React
   * devtools
   */
  Component.displayName = `nanostyled-${tag}`;
  /**
   * return the component
   */
  return Component;
};

export default nanostyled;
