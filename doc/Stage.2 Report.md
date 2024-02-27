# Stage 2

## ER/UML diagram
### 10/31 Update
- **Fix 3-way weak relationships issue.**
- **Fix having weak relationships Resonates, Shares, Comments, only but no weak entities connected issue.**
- **Fix Weak entities Location, Emotion, EMOMeter issue by setting them into Entities.**
- **Fix Location missing PK issue.**

[ER/UML diagram](stage.2/project_ERD.drawio.pdf)

## Normalized
### 10/31 Update
- **Fix User is not in 3NF because email->password.**

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
## Relational Schema
### 10/31 Update
- **Reconstruct according to New ER/UML diagram**
[Relational Schema SQL](stage.2/pt1_v2.sql)
[Relational Schema PDF](stage.2/Relational_Schema.pdf)
[Relational Schema Plaintext](stage.2/Relational_Schema.txt)

## Assumptions of the ER/UML diagram
### 10/31 Update
- **Add this content**
1. **User Entity**:
   - Each `User` has a unique `userID`.
   - Every `User` has a `username`, `password`, and `email`.
   - A single `User` can have multiple emotions recorded in the `EMOmeter`, share multiple `Feelings`, and write multiple `Comments`.

2. **Feeling Entity**:
   - Each `Feeling` has a unique `feelingID`.
   - Every `Feeling` has associated content and a `feelingDate`.
   - A `Feeling` is specifically related to one `Location` and one `Emotion`, but can be shared or resonated with by multiple users.

3. **EMOmeter Entity**:
   - Each `EMOmeter` entry has a unique `EMOID` and is associated with a specific date (`EMODate`).
   - An `EMOmeter` entry has an `EMOValue` which probably indicates the emotional value or intensity.

4. **Location Entity**:
   - Every `Location` has a unique `locationID`.
   - A `Location` can be defined by `nation`, `province`, and `city`.
   - Multiple `Feelings` can originate from or be associated with the same `Location`.

5. **Emotion Entity**:
   - Each `Emotion` has a unique `emotionID` and associated content.
   - A single `Emotion` type can be included in multiple `Feelings`.

6. **Comment Entity**:
   - Each `Comment` has a unique `commentID`.
   - Every `Comment` has content and an associated `commentDate`.
   - A `Comment` is linked to a specific `User` and a specific `Feeling`.

7. **Shares and Resonates Relationships**:
   - A `User` can share or resonate with multiple `Feelings`, but each shared or resonated `Feeling` is distinct for a `User`.
   
8. **One-to-One Relationships**:
   - The relationships between `Feeling` and `Location`, `Feeling` and `Emotion`, and `Comment` and `Feeling` are all one-to-one, meaning a specific instance of one entity relates to only one instance of the other.

9. **No Multi-valued Attributes**:
   - From the diagram, there don't appear to be any multi-valued attributes; all attributes are single-valued.

10. **No Inheritance or Specialization**:
   - The diagram does not depict any inheritance or specialization relationships among the entities.

## Description of each relationship and its cardinalition
### 10/31 Update
- **Add this content**
1. **User to EMOmeter**:
   - A `User` can have zero to many `EMOmeter` records.
   - Each `EMOmeter` record belongs to one `User`.

2. **User to Feeling (Shares)**:
   - A `User` can share zero to many `Feelings`.
   - Each shared `Feeling` is associated with one `User`.

3. **User to Feeling (Resonates)**:
   - A `User` can resonate with zero to many `Feelings`.
   - Each resonated `Feeling` can be associated with multiple users.

4. **User to Comment**:
   - A `User` can write zero to many `Comments`.
   - Each `Comment` is written by one `User`.

5. **Feeling to Comment**:
   - A `Feeling` can have zero to many associated `Comments`.
   - Each `Comment` is associated with one `Feeling`.

6. **Feeling to Location**:
   - Each `Feeling` is associated with one `Location`.
   - A `Location` can be associated with zero to many `Feelings`.

7. **Feeling to Emotion**:
   - Each `Feeling` includes one `Emotion`.
   - An `Emotion` can be included in zero to many `Feelings`.
