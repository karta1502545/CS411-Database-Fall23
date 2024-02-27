# Stage Two

The relational schema is in 3NF. We made it such that every non-key attribute is fully dependent on its tables primary key. Additionally, no attribute depends on another attribute that depends on the primary key. Therefore, it is already in 3NF and we don't have to convert it.

To check the correctness of our tables to be 3NF, we have the following records:

1. User
userID -> username, email, password (userID is a superkey)
username -> UserID (UserID is a key)

2. EMOMeter
EMOID -> userID, EMOValue, EMODate (EMOID is a superkey)

3. Resonates
userID, feelingID -> type ( (userID, feelingID) is a superkey)

4. Feeling
feelingID -> content, feelingDate, userID (feelingID is a superkey)

5. Location
LocationID -> nation, province, city (LocationID is a superkey)

6. Emotion
emotionID -> content (emotionID is a superkey)

7. Comments
commentID, userID, feelingID -> content, commentDate ((commentID, userID, feelingID) is a superkey)

8. FeelingHasLocation
No FD

9. FeelingIncludeEmotion
No FD