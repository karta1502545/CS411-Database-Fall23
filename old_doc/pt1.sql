-- User(userID: int [PK],
--     username: varchar(255),
--     password: varchar(100),
--     email: varchar(255))

-- # like
-- Resonates(resonatesID: int [PK],
--          userID: int [FK to User.userID],
--          feelingID: int [FK to Feeling.feelingID],
--          type: int [FK to Resonation.type])

-- # tag
-- Emotion(emotionID: int [PK],
--        feelingID: int [FK to Feeling.feelingID],
--        content: text)

-- # post
-- Feeling(feelingID: int [PK],
--        userID: int [FK to User.userID],
--        content: text,
--        feelingDate: DATETIME)

-- Location(LocationID: int [PK],
--        feelingID: int [FK to Feeling.feelingID],
--        nation: varchar(255),
--        province: varchar(255),
--        city: varchar(255))

-- EMOMeter(EMOID: int [PK],
--        userID: int [FK to User.userID],
--        EMOValue: int,
--        EMODate: DATETIME)

-- Resonation(type: int [PK],
--           resonation: varchar(255))

-- Comments(commentID: INT [PK],
--     userID: INT [FK to User.userID],
--     feelingID: INT [FK to Feeling.feelingID],
--     content: TEXT,
--     commentDate: DATETIME)

-- Table-Name(Column1:Domain [PK], Column2:Domain [FK to table.column], Column3:Domain,...)

-- CREATE DATABASE `pt1-test`;

USE `pt1-test`;

DROP TABLE IF EXISTS User;
CREATE TABLE User(
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(255));

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
    commentID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    feelingID INT NOT NULL,
    content TEXT NOT NULL,
    commentDate DATETIME NOT NULL,
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
    feelingID INT NOT NULL,
    content TEXT,
    FOREIGN KEY (feelingID) REFERENCES Feeling(feelingID)
        on delete cascade);

INSERT INTO Emotion(feelingID, content) values 
(1, "peace"),
(2, "lamo"),
(1, "midterm"),
(3, "suck"),
(4, "monday blue");

# get hashtags of feeling 1
-- SELECT e.content AS hashtag
-- FROM Emotion e JOIN Feeling f ON (e.feelingID = f.feelingID)
-- WHERE e.feelingID = 1

DROP TABLE IF EXISTS Location;
CREATE TABLE Location(
    feelingID INT NOT NULL,
    nation varchar(255),
    province varchar(255),
    city varchar(255),
    PRIMARY KEY (feelingID),
    FOREIGN KEY (feelingID) REFERENCES Feeling(feelingID)
        on delete cascade);

INSERT INTO Location(feelingID, nation, province, city) values 
(1, "United States", "Illinois", "Champaign"),
(2, "United States", "Illinois", "Urbana"),
(3, "United States", "Illinois", "Chicago"),
(4, "Taiwan", "Taipei", "Banqiao");

-- select out all feelings posted on same province
-- SELECT u.username, f.content, l.nation, l.province, l.city
-- FROM Feeling f JOIN Location l ON (f.feelingID = l.feelingID)
--                JOIN User u ON (u.userID = f.userID)
-- WHERE l.province = "Illinois"
-- ORDER BY f.feelingId


DROP TABLE IF EXISTS Resonation;
CREATE TABLE Resonation(
    type INT AUTO_INCREMENT PRIMARY KEY,
    resonation varchar(255) UNIQUE);

INSERT INTO Resonation(resonation) values 
("sad"),
("down"),
("gloomy"),
("depressed");

SELECT * FROM Resonation;

DROP TABLE IF EXISTS Resonates;
CREATE TABLE Resonates(
    userID INT NOT NULL,
    feelingID INT NOT NULL,
    type INT,
    FOREIGN KEY (feelingID) REFERENCES Feeling(feelingID)
        on delete cascade,
    FOREIGN KEY (userID) REFERENCES User(userID)
        on delete cascade,
    PRIMARY KEY (feelingID, userID),
    FOREIGN KEY (type) REFERENCES Resonation(type));

INSERT INTO Resonates(userID, feelingID, type) values 
(1, 1, 1),
(2, 1, 1),
(3, 1, 1),
(4, 1, 1);

-- SELECT * FROM Resonates;

# check how many resonations feeling 1 has
-- SELECT COUNT(*) AS numOfResonation
-- FROM Resonates
-- WHERE feelingID = 1

# delete a user to see if the feeling and resonation is also been deleted
-- DELETE FROM User
-- WHERE username = "chunyil1";