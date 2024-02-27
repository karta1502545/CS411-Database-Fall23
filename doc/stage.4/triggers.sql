DROP TRIGGER IF EXISTS MakeSadPostSad;

DELIMITER //
CREATE TRIGGER MakeSadPostSad
AFTER INSERT
ON FeelingIncludeEmotion
FOR EACH ROW
BEGIN
    IF NEW.emotionID = 1 OR NEW.emotionID = 3 OR NEW.emotionID = 9 THEN
        UPDATE Feeling f
        SET f.content = CONCAT(f.content, ' (╥﹏╥)')
        WHERE f.feelingID = NEW.feelingID;
    END IF;
    IF NEW.emotionID = 4 OR NEW.emotionID = 10 THEN
        UPDATE Feeling f
        SET f.content = CONCAT(f.content, ' ( ｡ •̀ ᴖ •́ ｡)')
        WHERE f.feelingID = NEW.feelingID;
    END IF;
    IF NEW.emotionID = 2 OR NEW.emotionID = 5 OR NEW.emotionID = 6 OR NEW.emotionID = 7 OR NEW.emotionID = 8 THEN
        UPDATE Feeling f
        SET f.content = CONCAT(f.content, ' (╯_╰)')
        WHERE f.feelingID = NEW.feelingID;
    END IF;
END;
//
DELIMITER ;


/*
DROP TRIGGER IF EXISTS update_feeling_before_insert;

DELIMITER //
CREATE TRIGGER update_feeling_before_insert
AFTER INSERT
ON Feeling
FOR EACH ROW
BEGIN
    -- Check if there's an existing row with the same userID and content
    IF EXISTS (SELECT 1 FROM Feeling f WHERE f.userID = NEW.userID AND f.content = NEW.content AND f.feelingID <> NEW.feelingID) THEN
        -- Delete the old duplicate row
        DELETE FROM Feeling f WHERE f.userID = NEW.userID AND f.content = NEW.content AND f.feelingID <> NEW.feelingID;
        -- SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Existing entry updated, new insertion prevented';
    END IF;
END;
//
DELIMITER ;*/