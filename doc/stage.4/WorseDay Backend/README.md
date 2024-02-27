### Environment Setup

1. create .env file in "WorseDay Backend" directory
```zsh
touch .env
```
```yaml
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB=yourDBName
MYSQL_HOST=ip address
```
2. install python and virtual environment
```zsh
python --version
python -m venv env
virtualenv env
# enter virtual environment
source env/bin/activate
# leave the virtual environment
# $ deactivate
```

3. install python 
```zsh
pip3 install flask

brew install mysql # (macOS)
pip3 install flask_mysqldb

pip3 install python-dotenv
```

4. run the backend
```zsh
# if it successfully run, you should see the following message
(env)username@yourcomputername WorseDay Backend % python3 app.py
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 878-058-891
```
### API Explanation

POST /auth/signin
payload:{username, password}
Check if username and password is correct, if it is correct, return success code 200

GET /post/like?userID=xxx?feelingID=yyy
Get if a user liked a post

POST /post/like
payload:{userID, feelingID, typeOfLike}
A user press a like button on a post (Add a like on Resonates table)

DELETE /post/like?userID=xxx?feelingID=yyy
A user withdraw a like

GET /post/<postID>
Get a post

PUT /post/<postID>
payload:{content}
Edit a post's content

DELETE /post/<postID>
Delete a post

GET /post/user/<userID>
Get all posts from a user

GET /post
Get all posts (from all users)

POST /post
payload:{userID, content}
A user add a post
