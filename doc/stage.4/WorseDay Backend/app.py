from flask import Flask, request
from flask_mysqldb import MySQL
import json
from flask import jsonify
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

# app.config['MYSQL_HOST'] = "34.31.251.103"
# app.config["MYSQL_USER"] = "root"
# app.config["MYSQL_PASSWORD"] = "test1234"
# app.config["MYSQL_DB"] = "workable-test-db"

app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST")
app.config["MYSQL_USER"] = os.getenv("MYSQL_USER")
app.config["MYSQL_PASSWORD"] = os.getenv("MYSQL_PASSWORD")
app.config["MYSQL_DB"] = os.getenv("MYSQL_DB")

mysql = MySQL(app)

@app.route('/auth/signin', methods=['POST'])
def signIn():
    if request.method == 'POST':
        try:
            username = request.json['username']
            password = request.json['password']
            conn = mysql.connection
            cursor = conn.cursor()
            # cursor.execute(f"SELECT EXISTS(SELECT * from User u WHERE u.username = \"{username}\" AND u.password = \"{password}\")")
            cursor.callproc('signIn', [username, password])
            data = cursor.fetchall()[0][0]
            if data == 1:
                return jsonify({"message": "Signin successfully"}), 200
            else:
                return jsonify({"message": "Username or password are wrong"}), 401
        except Exception as e:
            print(e)
            return jsonify({"error": "An error occurred while trying to signin"}), 500
# not RESTful. Should Modify later
@app.route('/auth/userid/<username>', methods=['GET'])
def getIDByName(username):
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute(f" \
            SELECT u.userID \
            FROM User u \
            WHERE u.username = \"{username}\"")
        row_headers=[x[0] for x in cursor.description]
        data = cursor.fetchall()
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cursor.close()
        return json.dumps(json_data, default=str)

# trigger have to be implemented
@app.route('/post/like', methods=['GET', 'POST', 'DELETE'])
def likePost():
    if request.method == 'GET':
        try:
            userID = request.args.get('userID')
            feelingID = request.args.get('feelingID')
            conn = mysql.connection
            cursor = conn.cursor()
            # cursor.execute(f"SELECT EXISTS(SELECT * from Resonates WHERE userID = {userID} AND feelingID = {feelingID}) AS isLiked")
            cursor.callproc('isLiked', [userID, feelingID])
            row_headers=[x[0] for x in cursor.description]
            data = cursor.fetchall()
            json_data=[]
            for result in data:
                json_data.append(dict(zip(row_headers,result)))
            cursor.close()
            return json.dumps(json_data, default=str)
        except Exception as e:
            print(e)
            return jsonify({"error": "An error occurred while trying to like the post"}), 500
    elif request.method == 'POST':
        try:
            userID = request.json['userID']
            feelingID = request.json['feelingID']
            typeOfLike = request.json['typeOfLike']
            conn = mysql.connection
            cursor = conn.cursor()
            cursor.execute(f"INSERT INTO Resonates(userID, feelingID, type) values ({userID}, {feelingID}, {typeOfLike})")
            conn.commit()
            cursor.close()

            return jsonify({"message": "Like added successfully"}), 200
        except Exception as e:
            print(e)
            return jsonify({"error": "An error occurred while trying to like the post"}), 500
    elif request.method == "DELETE":
        try:
            userID = request.args.get('userID')
            feelingID = request.args.get('feelingID')
            conn = mysql.connection
            cursor = conn.cursor()
            cursor.execute(f"DELETE FROM Resonates WHERE feelingID = {feelingID} AND userID = {userID}")
            conn.commit()
            cursor.close()

            return jsonify({"message": "Withdraw like successfully"}), 200
        except Exception as e:
            print(e)
            return jsonify({"error": "An error occurred while trying to withdraw like"}), 500
        

@app.route('/post/<postID>', methods=['GET', 'PUT', 'DELETE'])
def postByPostId(postID):
    if request.method == 'GET':
        print("=====================================")
        cursor = mysql.connection.cursor()
        cursor.callproc('GetFeelingDetails_v3', [postID])
        row_headers=[x[0] for x in cursor.description]
        data = cursor.fetchall()
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cursor.close()
        return json.dumps(json_data, default=str)
    elif request.method == 'PUT':
        content = request.json['content']
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute(f"UPDATE Feeling SET content = \"{content}\" WHERE feelingID = {postID}")
        conn.commit()
        cursor.close()
        return jsonify({"message": "Post updated successfully"}), 200
    elif request.method == 'DELETE':
        try:
            conn = mysql.connection
            cursor = conn.cursor()
            cursor.execute(f"DELETE FROM Feeling WHERE feelingID = {postID}")
            conn.commit()
            cursor.close()

            if cursor.rowcount == 0:
                return jsonify({"message": "Post not found"}), 404

            return jsonify({"message": "Post deleted successfully"}), 200
        except Exception as e:
            print(e)
            return jsonify({"error": "An error occurred while trying to delete the post"}), 500

@app.route('/post/user/<userID>', methods=['GET'])
def postByUserId(userID):
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute(f" \
            SELECT a.numOfLike, a.feelingID, a.username, a.content, a.feelingDate, e.content as hashtag \
            FROM (SELECT COUNT(r.type) AS numOfLike, f.feelingID, u.username, f.content, f.feelingDate \
            FROM Feeling f\
            JOIN User u ON (f.userID = u.userID) \
            LEFT JOIN Resonates r ON (f.feelingID = r.feelingID) \
            WHERE f.userID = {userID} AND LOWER(a.content) NOT LIKE '%fuck%' \
            GROUP BY f.feelingID \
            ORDER BY feelingDate DESC) as a LEFT JOIN (FeelingIncludeEmotion fie NATURAL JOIN Emotion e) ON (a.feelingID = fie.feelingID)"
        )
        row_headers=[x[0] for x in cursor.description]
        data = cursor.fetchall()
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cursor.close()
        return json.dumps(json_data, default=str)
    elif request.method == 'POST':
        return
@app.route('/post/username/<username>', methods=['GET'])
# Demo: search
def postByUserName(username):
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute(f" \
            SELECT a.numOfLike, a.feelingID, a.username, a.content, a.feelingDate, e.content as hashtag \
            FROM (SELECT COUNT(r.type) AS numOfLike, f.feelingID, u.username, f.content, f.feelingDate \
            FROM Feeling f\
            JOIN User u ON (f.userID = u.userID) \
            LEFT JOIN Resonates r ON (f.feelingID = r.feelingID) \
            WHERE u.username like \"{username}\" AND LOWER(f.content) NOT LIKE '%fuck%'\
            GROUP BY f.feelingID \
            ORDER BY feelingDate DESC) as a LEFT JOIN (FeelingIncludeEmotion fie NATURAL JOIN Emotion e) ON (a.feelingID = fie.feelingID)"
        )
        row_headers=[x[0] for x in cursor.description]
        data = cursor.fetchall()
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cursor.close()
        return json.dumps(json_data, default=str)
    elif request.method == 'POST':
        return
@app.route('/post/tag/<tag>', methods=['GET'])
# Demo: search
def postByTag(tag):
    look_up = ['down', 'blue', 'bummed out', 'upset', 'low', 'gloomy', 'in a funk', 'disheartened', 'unhappy', 'fed up']
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute(f" \
            SELECT COUNT(r.type) AS numOfLike, f.feelingID, u.username, f.content, f.feelingDate, \"{look_up[int(tag)-1]}\" as hashtag \
            FROM Feeling f\
            JOIN User u ON (f.userID = u.userID) \
            LEFT JOIN Resonates r ON (f.feelingID = r.feelingID) \
            LEFT JOIN FeelingIncludeEmotion t ON (f.feelingID = t.feelingID) \
            WHERE t.emotionID = {tag} AND LOWER(f.content) NOT LIKE '%fuck%'\
            GROUP BY f.feelingID \
            ORDER BY feelingDate DESC LIMIT 20")
        row_headers=[x[0] for x in cursor.description]
        data = cursor.fetchall()
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cursor.close()
        return json.dumps(json_data, default=str)
    elif request.method == 'POST':
        return
@app.route('/post', methods=['GET', 'POST'])
def post():
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute(f" \
            SELECT a.numOfLike, a.feelingID, a.username, a.content, a.feelingDate, e.content as hashtag\
            FROM (SELECT COUNT(r.type) AS numOfLike, f.feelingID, u.username, f.content, f.feelingDate \
            FROM Feeling f\
            JOIN User u ON (f.userID = u.userID)\
            LEFT JOIN Resonates r ON (f.feelingID = r.feelingID) \
            WHERE LOWER(a.content) NOT LIKE '%fuck%' \
            GROUP BY f.feelingID \
            ORDER BY feelingDate DESC) as a LEFT JOIN (FeelingIncludeEmotion fie NATURAL JOIN Emotion e) ON (a.feelingID = fie.feelingID)"
            )
        row_headers=[x[0] for x in cursor.description]
        data = cursor.fetchall()
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cursor.close()
        return json.dumps(json_data, default=str)
    else:
        try:
            userID = request.json['userID']
            content = request.json['content']
            hashtag = request.json['hashtag']
            conn = mysql.connection
            cursor = conn.cursor()
            cursor.execute(f" \
                INSERT INTO Feeling(userID, content, feelingDate) values ({userID}, \"{content}\", NOW())")
            if hashtag != -1:
                cursor.execute("SELECT LAST_INSERT_ID()")
                feeling_id = cursor.fetchone()[0]
                cursor.execute(f" \
                    INSERT INTO FeelingIncludeEmotion (feelingID, emotionID) VALUES ({feeling_id}, {hashtag});")
            conn.commit()
            
            return {'status': 'success'}, 200
        except Exception as e:
            print(e)
            return {'status': 'error', 'message': str(e)}, 500

if __name__ == "__main__":
    app.run(debug=True)
    
