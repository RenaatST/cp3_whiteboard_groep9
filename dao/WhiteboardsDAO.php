<?php
require_once __DIR__ . '/DAO.php';
class WhiteboardsDAO extends DAO {
	

	function getWhiteboards(){

        $sql = "SELECT whiteboard.id, whiteboard.title, users.username, users.email, users.profile_image, users.role_id
        FROM whiteboard
        LEFT JOIN users ON whiteboard.creator_id = users.id
        ORDER BY date ASC 
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

    function addWhiteboard($title) {

        $sql = "INSERT INTO whiteboard (title, creator_id) VALUES (:title, :creator_id)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":title",$title);
        $stmt->bindValue(":creator_id",$_SESSION["user"]["id"]);
        $stmt->execute();


    }




}