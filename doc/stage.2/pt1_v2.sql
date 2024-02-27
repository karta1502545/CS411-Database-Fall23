-- User(userID: int [PK],
--      username: varchar(255),
--      password: varchar(100),
--      email: varchar(255))

-- # post
-- Do we need to separate Location into 3 tables?
-- (nation, province, city)
-- Feeling(feelingID: int [PK],
--         content: text,
--         userID: int [FK to User.userID],
--         feelingDate: DATETIME)

-- # like
-- Resonates(userID: int [PK] [FK to User.userID],
--           feelingID: int [PK] [FK to Feeling.feelingID],
--           type: int)

-- # tag
-- Emotion(emotionID: int [PK],
--         content: text)

-- FeelingIncludeEmotion(
--   feelingID: int [PK] [FK to Feeling.feelingID],
--   emotionID: int [PK] [FK to Emotion.emotionID])

-- Location(LocationID: int [PK],
--          nation: varchar(255),
--          province: varchar(255),
--          city: varchar(255))

-- FeelingHasLocation(
--   feelingID: int [PK] [FK to Feeling.feelingID],
--   locationID: int [PK] [FK to Location.LocationID])

-- EMOMeter(EMOID: int [PK],
--          userID: int [FK to User.userID],
--          EMOValue: int,
--          EMODate: DATETIME)

-- Comments(commentID: INT [PK],
--     	 userID: INT [PK] [FK to User.userID],
--     	 feelingID: INT [PK] [FK to Feeling.feelingID],
--     	 content: TEXT,
--     	 commentDate: DATETIME)

-- Table-Name(Column1:Domain [PK], Column2:Domain [FK to table.column], Column3:Domain,...)

-- CREATE DATABASE `workable-test-db`;

-- USE `pt1-test`;

DROP TABLE IF EXISTS User;
CREATE TABLE User(
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE);

INSERT INTO User(username, password, email) values 
("chunyil1", 123456, "chunyil1@illinois.edu"),
("chunyil2", 123456, "chunyil2@illinois.edu"),
("chunyil3", 123456, "chunyil3@illinois.edu"),
("andy", 123456, "andylee1@illinois.edu");

-- DELETE FROM User
-- WHERE username = "chunyil1";

-- UPDATE User
-- SET username = "corn"
-- WHERE username = "andylee1";

SELECT * FROM User;

DROP TABLE IF EXISTS Feeling;
CREATE TABLE Feeling(
    feelingID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    content TEXT NOT NULL,
    feelingDate DATETIME NOT NULL,
    FOREIGN KEY (userID) REFERENCES User(userID)
        on delete cascade);

INSERT INTO Feeling(userID, content, feelingDate) values 
(1, "I feel so overwhelming and would like someone have a drink with me...", NOW()),
(2, "Oh my god! what a big moon. It looks like a light bulb on the sky!", NOW()),
(3, "I was got rejected by several companies again...", NOW()+1),
(4, "Sad! I was failed on the first exam...", NOW()+1);

SELECT * FROM Feeling;

DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments(
    commentID INT AUTO_INCREMENT,
    userID INT NOT NULL,
    feelingID INT NOT NULL,
    content TEXT NOT NULL,
    commentDate DATETIME NOT NULL,
    PRIMARY KEY(commentID, userID, feelingID),
    FOREIGN KEY (userID) REFERENCES User(userID)
        on delete cascade,
    FOREIGN KEY (feelingID) REFERENCES Feeling(feelingID)
        on delete cascade);

INSERT INTO Comments(userID, feelingID, content, commentDate) values 
(1, 1, "Feel sorry for that.", NOW()-4),
(2, 1, "Hope you can get well soon!", NOW()-3),
(3, 1, "Pain passed and you will grow stronger!", NOW()-2),
(4, 1, "God bless your liver.", NOW()-1);

DROP TABLE IF EXISTS EMOMeter;
CREATE TABLE EMOMeter(
    EMOID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    EMOValue INT,
    EMODate DATETIME,
    FOREIGN KEY (userID) REFERENCES User(userID)
        on delete cascade);

INSERT INTO EMOMeter(userID, EMOValue, EMODate) values 
(1, 10, NOW() - INTERVAL 2 day),
(2, 7, NOW() - INTERVAL 1 day),
(1, 3, NOW() - INTERVAL 10 day),
(4, 10, NOW() - INTERVAL 2 hour);

# get avg emovalue for each user
-- SELECT u.username, AVG(e.EMOValue)
-- FROM EMOMeter e
-- JOIN User u ON (u.userID = e.userID)
-- GROUP BY u.userID;

DROP TABLE IF EXISTS Emotion;
CREATE TABLE Emotion(
    emotionID INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT);

INSERT INTO Emotion(content) values 
("peace"),
("lamo"),
("midterm"),
("suck"),
("monday blue");

DROP TABLE IF EXISTS FeelingIncludeEmotion;
CREATE TABLE FeelingIncludeEmotion(
    feelingID INT NOT NULL,
    emotionID INT NOT NULL,
    PRIMARY KEY (feelingID, emotionID),
    FOREIGN KEY (feelingID) REFERENCES Feeling(feelingID)
        on delete cascade,
    FOREIGN KEY (emotionID) REFERENCES Emotion(emotionID)
        on delete cascade);

-- SELECT * FROM Feeling;
-- SELECT * FROM Emotion;

INSERT INTO FeelingIncludeEmotion(feelingID, emotionID) values 
(1, 1),
(1, 2),
(1, 3),
(2, 3),
(3, 4);

# get hashtags of feeling 1
-- SELECT e.content AS hashtag
-- FROM Emotion e JOIN FeelingIncludeEmotion FIE ON (e.emotionID = FIE.emotionID)
-- JOIN Feeling f ON (FIE.feelingID = f.feelingID)
-- WHERE f.feelingID = 1

DROP TABLE IF EXISTS Location;
CREATE TABLE Location(
    LocationID INT AUTO_INCREMENT PRIMARY KEY,
    nation varchar(255),
    province varchar(255),
    city varchar(255));

INSERT INTO Location(nation, province, city) values 
("United States", "Illinois", "Champaign"),
("United States", "Illinois", "Urbana"),
("United States", "Illinois", "Chicago"),
("Taiwan", "Taipei", "Banqiao");

DROP TABLE IF EXISTS FeelingHasLocation;
CREATE TABLE FeelingHasLocation(
    feelingID INT NOT NULL UNIQUE,
    locationID INT NOT NULL,
    PRIMARY KEY (feelingID, locationID),
    FOREIGN KEY (feelingID) REFERENCES Feeling(feelingID)
        on delete cascade,
    FOREIGN KEY (locationID) REFERENCES Location(locationID)
        on delete cascade);

SELECT * FROM FeelingHasLocation;
INSERT INTO FeelingHasLocation(feelingID, locationID) values 
(1, 1),
(2, 2),
(3, 4),
(4, 3);

-- select out all feelings posted on same province
SELECT u.username, f.content, l.nation, l.province, l.city
FROM Feeling f JOIN FeelingHasLocation FHL ON (f.feelingID = FHL.feelingID)
               JOIN Location l ON (l.locationID = FHL.locationID)
               JOIN User u ON (u.userID = f.userID)
WHERE l.province = "Illinois"
ORDER BY f.feelingId

-- NOTE: We do not have this table.
-- DROP TABLE IF EXISTS Resonation;
-- CREATE TABLE Resonation(
--     type INT AUTO_INCREMENT PRIMARY KEY,
--     resonation varchar(255) UNIQUE);

-- INSERT INTO Resonation(resonation) values 
-- ("sad"),
-- ("down"),
-- ("gloomy"),
-- ("depressed");

-- SELECT * FROM Resonation;

DROP TABLE IF EXISTS Resonates;
CREATE TABLE Resonates(
    userID INT NOT NULL,
    feelingID INT NOT NULL,
    type INT,
    PRIMARY KEY (feelingID, userID),
    FOREIGN KEY (feelingID) REFERENCES Feeling(feelingID)
        on delete cascade,
    FOREIGN KEY (userID) REFERENCES User(userID)
        on delete cascade);

INSERT INTO Resonates(userID, feelingID, type) values 
(1, 1, 1),
(2, 1, 1),
(3, 1, 1),
(4, 1, 1);

SELECT EXISTS(SELECT * from Resonates WHERE userID = 1 AND feelingID = 2) AS isLiked

-- SELECT * FROM Resonates;

# check how many resonations feeling 1 has
-- SELECT COUNT(*) AS numOfResonation
-- FROM Resonates
-- WHERE feelingID = 1

# delete a user to see if the feeling and resonation is also been deleted
-- DELETE FROM User
-- WHERE username = "chunyil1";