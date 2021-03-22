#How to start the project

##Install dependencies :
 (in main folder)
 - npm install
 - git clone https://github.com/AutoCoderr/PHjs.git PHjs
 
##Start the project !

 - docker-compose up -d
 - *Wait for building*
 - docker-compose exec server node bin/console.js migration:migrate
