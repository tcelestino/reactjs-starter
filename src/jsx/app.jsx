var MyApp = {};

(function () {
  'use strict';
  var OPTIONS;

  var App = React.createClass({
    render: function () {
      return (
        <header className="head">
          <h1>React.js Starter</h1>
        </header>
      );
    }
  });

  function app (options) {
    OPTIONS = options;

    var container = document.querySelector('.main');
    React.render(<App options={options} />, container);
  }

  MyApp.init = app;

}());