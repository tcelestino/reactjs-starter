var MyApp = {};

(function () {
  'use strict';
  var OPTIONS;

  var Component = React.createClass({displayName: "Component",
    render: function () {
      return (
        React.createElement("div", {className: "component"}, 
          React.createElement("h1", null, "React.js Starter")
        )
      );
    }
  });

  function App (options) {
    OPTIONS = options;

    var container = document.querySelector('.main');
    React.render(React.createElement(Component, {options: options}), container);
  }

  MyApp.init = App;

}());