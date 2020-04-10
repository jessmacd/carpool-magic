# carpool-magic

Carpool planning made easy!

This works together with the backend application, carpool. Install both for a fully functional, easy to use way to plan out your carpool trips.

#### Installation Instructions:
1. git clone  https://github.com/jessmacd/carpool-magic.git
2. Create a copy of the .env.example file as .env, and set the REACT_APP_CARPOOL_BACKEND_URL variable to your backend host name, for example:
 - REACT_APP_CARPOOL_BACKEND_URL=http://carpool.test:3000/api/
3. Then you can either launch it as a docker container:
 - cd carpool-magic
 - docker-compose up 
4. -OR- if you have node installed locally:
 - cd carpool-magic
 - npm install
 - npm start
