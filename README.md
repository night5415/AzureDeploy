#Express-Handlebars-Less-Jasmine-NodeUnit Project Template
This is a project template for using the Express web framework with Handlebar views and Less stylesheets.
Browser unit testing is implemented by Karma and Jasmine. Server unit testing is implemented with NodeUnit.

##Features

+ Production mode
    - Minifies Less files to single file
    - Minifies JavaScript files to a single file using r.js and almond.js
    - Caches Handlebars files in memory
+ Development mode
    - Just hit refresh while editing JavaScript, Less, or Handlebars to see changes in the browser
    - uses Require.js AMD loader

##Directory Structure

    +-- bin
    |   +-- www             //node start point
    |
    +-- build           //container for files generated during execution, will be hosted by express
    |   +-- coverage        //jasmine coverage reports
    |   +-- javascript      //minified javascript
    |   +-- stylesheets     //compiled less
    |
    +-- public          //public folder, will be hosted by express, will be hosted by express
    |   +-- javascript      //browser javascript code
    |   +-- stylesheets     //LESS and CSS
    |
    +-- routes          //url routing
    |
    +-- test            //test cases
    |   +--browser          //karma-jasmine tests
    |   +--server           //NodeUnit tests
    |
    +-- views           //Handlebars templates
    |   +-- layouts         //layout templates
    |   +-- partials        //partial templates
    |
    +--app.js           //main application

##Commands
These commands are for Windows, they will need to be modified for Linux/Mac.

####Install
    npm install

####Run in production mode
    set NODE_ENV=production && set PORT=80 && node bin\www
PORT is optional, defaults to 3000:

    set NODE_ENV=production && node bin\www

####Run in development mode on port 3000
    set NODE_ENV=development && node bin\www

####Run Jasmine tests
    node node_modules\karma\bin\karma start

####Run NodeUnit tests
    node node_modules\nodeunit\bin\nodeunit test\server
