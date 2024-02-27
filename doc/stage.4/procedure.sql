-- Active: 1698355113977@@34.31.251.103@3306@pt1-test
DROP PROCEDURE GetFeelingDetails_v3;
CREATE DEFINER=`root`@`%` PROCEDURE `GetFeelingDetails_v3`(IN postID INT)
BEGIN

    DECLARE feelingID INT;
    DECLARE numOfLike INT;
    DECLARE username VARCHAR(255);
    DECLARE content TEXT;
    DECLARE feelingDate DATETIME;
    DECLARE tag TEXT;
    DECLARE done INT DEFAULT 0;
    DECLARE cursor_feeling CURSOR FOR 
        SELECT f.feelingID, 
               COUNT(r.type) AS numOfLike,
               u.username,
               f.content,
               f.feelingDate,
               e.content as tag
        FROM Feeling f
        JOIN User u ON (f.userID = u.userID)
        JOIN FeelingIncludeEmotion FIE ON (f.feelingID = FIE.feelingID)
        LEFT JOIN Emotion e ON (e.emotionID = FIE.emotionID)
        LEFT JOIN Resonates r ON (f.feelingID = r.feelingID)
        WHERE f.feelingID = postID
        GROUP BY f.feelingID
        ORDER BY f.feelingDate DESC;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    DROP TEMPORARY TABLE IF EXISTS FeelingStats;
    CREATE TEMPORARY TABLE FeelingStats (
        feelingID INT,
        numOfLike INT,
        username VARCHAR(255),
        content TEXT,
        feelingDate DATETIME,
        tag TEXT
    );
    OPEN cursor_feeling;
    FETCH cursor_feeling INTO feelingID, numOfLike, username, content, feelingDate, tag;
    WHILE done = 0 DO
        
        IF LOWER(content) NOT LIKE '%fuck%' THEN
            INSERT INTO FeelingStats (feelingID, numOfLike, username, content, feelingDate, tag)
            VALUES (feelingID, numOfLike, username, content, feelingDate, tag);
        END IF;
        FETCH cursor_feeling INTO feelingID, numOfLike, username, content, feelingDate, tag;
    END WHILE;
    CLOSE cursor_feeling;
    SELECT * FROM FeelingStats;
    DROP TEMPORARY TABLE IF EXISTS FeelingStats;
END