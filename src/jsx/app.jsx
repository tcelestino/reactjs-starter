var MyApp = {};

(function () {
  'use strict';
  var OPTIONS;

  var Component = React.createClass({
    render: function () {
      return (
        <div className="component">
          <h1>React.js Starter</h1>
        </div>
      );
    }
  });

  function App (options) {
    OPTIONS = options;

    var container = document.querySelector('.main');
    React.render(<Component options={options} />, container);
  }

  MyApp.init = App;

}());