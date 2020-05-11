Just some notes:
1. for front end, if you need to access any backend components, remember to also
cd into api and run "npm install, start ..." to initiate the backend as well

2. The default local backend host is set to be **9999** for now. You can change it
in **/api/bin/www line 15**

3. For frontend to communicate with express backend, use some routes like
fetch("http://localhost:9999/firebase/listings")
