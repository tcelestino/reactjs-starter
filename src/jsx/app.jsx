var MyApp = {};

(function () {
  'use strict';
  var App = React.createClass({
    render: function () {
      return (
        <header className="head">
          <h1>React.js Starter</h1>
        </header>
      );
    }
  });

  function app (opt) {
    var defaults = {
      targetId: '.main'
    };

    var options = _.assign(defaults, opt);
    var container = document.querySelector(options.targetId);

    React.render(<App options={options} />, container);
  }

  MyApp.init = app;

}());
