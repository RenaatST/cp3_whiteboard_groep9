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

    function getMyWhiteboards($user_id){

        $sql = "SELECT whiteboard.id, whiteboard.date_added, whiteboard.title, users.username, users.email, users.profile_image, users.role_id
                FROM whiteboard
                LEFT JOIN users ON whiteboard.creator_id = users.id
                WHERE users.id = $user_id
                ";
        $stmt = $this->pdo->prepare($sql);
        if($stmt->execute())
        {
            $mywhiteboards = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($mywhiteboards)){
                return $mywhiteboards;
            }
        }
        return array();
    }

    function addWhiteboard($title, $creator_id) {

        $sql = "INSERT INTO whiteboard (title, creator_id) VALUES (:title, :creator_id)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":title",$title);
        $stmt->bindValue(":creator_id",$creator_id);
        $stmt->execute();


    }
	



}