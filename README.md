API_DSY
===

Run the node app:
  node server.js

Browse through your browser to:
---
  * http://localhost:8899/
  * http://localhost:8899/api/
  * http://localhost:8899/api/{_KEY_}/{_WORKSPACE_}/{_FUNCTION_}/{_params_}
  * http://localhost:8899/page/{_any_}
  * http://localhost:8899/login


Database config & libs directory:
---
* libs/
  * db/
    * --> config.js       //-- MongoDB configurations
    * --> connection.js   //-- Connect to MongoDB Server
    * --> models.js       //-- Schema configurations
  * routes/
    * --> reshandle.js    //-- request routing and responds handle
* public/
  * api/
    * --> index.html      //-- routing dir/file when user browse to: http://localhost:8899/api
  * page/
    * --> { place any page directory & html }
* server.js           //-- the main of node app
  
