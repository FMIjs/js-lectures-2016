1. Check if monogdb is installed and if it's not install it.
2. Read online about the frameworks, modules (and tool) that we are going to use today: express, node.bcrypt.js, node-jsonwebtoken, bodyParser, mongo, mongoose (postman).
3. Create an express server and configure a router to handle calls for route '/api'. Our api will have three paths:
    * /register - receives email, password and role (0 - admin, 1 - client), checks db to see if email exists and if it doesn't hash the password using bcrypt and saves it to db (use mongoose pre method on schema object) 
    * /login - receives email and password, gets user from db and compares passwords. If passwords match it generates a jwt and returns it to the client.  
    * /users - returns all users as JSON if user is admin and if not 401 - Unauthorized;

    Use middleware to check if jwt exists and if user has the necessary permissions to continue.
4. All other calls to server should return 404 - Not found.