<?php
require_once __DIR__ . '/DAO.php';
class WhiteboardsDAO extends DAO {
	

	function getWhiteboards(){

        $sql = "SELECT whiteboard.id, whiteboard.title, users.username, users.email, users.profile_image, users.role_id
                FROM whiteboard
                LEFT JOIN users ON whiteboard.creator_id = users.id
                ORDER BY date_added ASC 
				";
        $stmt = $this->pdo->prepare($sql);
        if($stmt->execute())
        {
            $whiteboards = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($whiteboards)){
                return $whiteboards;
            }
        }
        return array();
    }

    function getBoardById($id) {
        $sql = "SELECT * FROM `whiteboard` WHERE `id` = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }



    function getWhiteboardsByUserId($user_id){

        $sql = "SELECT wb.id, wb.title, users.username, users.email, users.profile_image, users.role_id
        FROM whiteboard as wb
        LEFT JOIN users ON wb.creator_id = users.id
        WHERE users.id = $user_id
        ";
        $stmt = $this->pdo->prepare($sql);
        if($stmt->execute())
        {
            $whiteboardsById = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($whiteboardsById)){
                return $whiteboardsById;
            }
        }
        return array();
    }

    function getUserForBoard($user_id, $board_id){

        $sql = "SELECT *  FROM `boardusers` WHERE `user_id` = :user_id AND `board_id` = :board_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":user_id",$user_id);
        $stmt->bindValue(":board_id",$board_id);
        if($stmt->execute())
        {
            $useratboard = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($useratboard)){
                return $useratboard;
            }
        }
        return array();
    }

    function addWhiteboard($title) {
 
         $sql = "INSERT INTO whiteboard (title, creator_id) VALUES (:title, :creator_id)";
         $stmt = $this->pdo->prepare($sql);
         $stmt->bindValue(":title",$title);
         $stmt->bindValue(":creator_id",$_SESSION["user"]["id"]);
         $stmt->execute();
    }

    function addNote($title, $text, $whiteboard_id, $xPos, $yPos) {

        $sql = "INSERT INTO postits (title, text, whiteboard_id, xPos, yPos) VALUES (:title, :text, :whiteboard_id, :xPos, :yPos)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":title",$title);
        $stmt->bindValue(":text",$text);
        $stmt->bindValue(":whiteboard_id",$whiteboard_id);
        $stmt->bindValue(":xPos",$xPos);
        $stmt->bindValue(":yPos",$yPos);
        $stmt->execute();
    }

    function addVideo($title, $description, $video_id, $whiteboard_id) {

        $sql = "INSERT INTO videos (title, description, video_id whiteboard_id) VALUES (:title, :description, :video_id :whiteboard_id)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":title",$title);
        $stmt->bindValue(":description",$description);
        $stmt->bindValue(":video_id",$video_id);
        $stmt->bindValue(":whiteboard_id",$whiteboard_id);
        $stmt->execute();
    }

    function addImage($title, $image, $whiteboard_id, $xPos, $yPos) {

        $sql = "INSERT INTO images (title, image, whiteboard_id, xPos, yPos) VALUES (:title, :image, :whiteboard_id, :xPos, :yPos)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":title",$title);
        $stmt->bindValue(":image",$image);
        $stmt->bindValue(":whiteboard_id",$whiteboard_id);
        $stmt->bindValue(":xPos",$xPos);
        $stmt->bindValue(":yPos",$yPos);
        $stmt->execute();
    }

    function addParticipant($user_id, $board_id) {

        $sql = "INSERT INTO `whiteboard`.`boardusers` (`id`, `user_id`, `board_id`) VALUES (NULL, $user_id, $board_id)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":user_id",$user_id);
        $stmt->bindValue(":board_id",$board_id);
        $stmt->execute();
    }


    public function participatingUserByBoard($board, $user_id) {
        $sql = "SELECT  boardusers.id, boardusers.user_id, users.username, users.email, users.profile_image, users.role_id
                FROM boardusers
                LEFT JOIN users ON boardusers.user_id = users.id
                WHERE boardusers.board_id = $board AND boardusers.user_id != $user_id
                GROUP BY user_id
                ORDER BY boardusers.creation_date DESC";
        $stmt = $this->pdo->prepare($sql);
        if($stmt->execute())
        {
            $particpatingUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($particpatingUsers)){



                return $particpatingUsers;
            }
        }
        return array();
    }

    public function overviewBoardsIParticipateIn($user_id) {
        $sql = "SELECT  boardusers.id, boardusers.user_id, whiteboard.title, whiteboard.date_added, whiteboard.creator_id
                FROM boardusers
                LEFT JOIN whiteboard ON boardusers.board_id = whiteboard.id
                WHERE boardusers.user_id = $user_id
                GROUP BY board_id
                ORDER BY boardusers.creation_date DESC";
        $stmt = $this->pdo->prepare($sql);
        if($stmt->execute())
        {
            $particpatingBoards = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($particpatingBoards)){
                return $particpatingBoards;
            }
        }
        return array();
    }

    function getImagesByBoardId($whiteboard_id){

        $sql = "SELECT * FROM images WHERE whiteboard_id = $whiteboard_id";
        $stmt = $this->pdo->prepare($sql);
        if($stmt->execute())
        {
            $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($images)){
                return $images;
            }
        }
        return array();
    }

    function getNotesByBoardId($whiteboard_id){

        $sql = "SELECT * FROM postits WHERE whiteboard_id = $whiteboard_id";
        $stmt = $this->pdo->prepare($sql);
        if($stmt->execute())
        {
            $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($notes)){
                return $notes;
            }
        }
        return array();
    }

    function deleteWhiteboard($board_id) {

        $sql = "DELETE FROM `whiteboard` WHERE `id` = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id",$board_id);
        $stmt->execute();


    }
}