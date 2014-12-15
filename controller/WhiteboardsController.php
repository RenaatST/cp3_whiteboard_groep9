<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'ImageDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'WhiteboardsDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';

require_once WWW_ROOT . 'php-image-resize' . DS . 'ImageResize.php';

class WhiteboardsController extends Controller {

	private $imageDAO;
	private $userDAO;
	private $whiteboardsDAO;

	function __construct() {
		$this->imageDAO = new ImageDAO();
		$this->userDAO = new UserDAO();
		$this->whiteboardsDAO = new WhiteboardsDAO();
	}

	public function index() {
		if(!empty($_SESSION["user"])) {
			$userwhiteboards = $this->whiteboardsDAO->getWhiteboardsByUserId($_SESSION["user"]["id"]);
			$this->set("userwhiteboards", $userwhiteboards);

			$boardsIParticipateIn = $this->whiteboardsDAO->overviewBoardsIParticipateIn($_SESSION["user"]["id"]);
			$this->set("boardsIParticipateIn", $boardsIParticipateIn);
		}


		if(!empty($_GET["action"]) && $_GET ["action"] == "delete") {
			$this->whiteboardsDAO->deleteWhiteboard($_GET["boardid"]);
			$this->redirect('index.php?page=home');
		}

	}

	public function addBoard() {
		if(!empty($_SESSION["user"])) {
			if(!empty($_POST)) {
				if($this->_handleAddPost()) {
					$this->whiteboardsDAO->addWhiteboard($_POST['whiteboardName']);
					$_SESSION["info"] = "whiteboard added";
					$this->redirect("index.php");
				}
				else {
					$_SESSION["error"] = "did not add board";
					$this->redirect("index.php");	
				}

			}
		}
	}


	public function canvas() {
		if(!empty($_GET["action"])) {
			//add a note
			if($_GET["action"] == "addNote") {
				$this->whiteboardsDAO->addNote($_POST["text"],
				$_GET["boardid"],
				$_POST["xpos"], 
				$_POST["ypos"]);	
			}

			//update a note
			if($_GET["action"] == "update") {
				if($_POST["item"] == "note") {
					$this->whiteboardsDAO->updateNote(
					$_POST["id"],
					$_POST["xpos"], 
					$_POST["ypos"],
					$_POST["text"]);
				}

				if($_POST["item"] == "video") {
					
				}

				if($_POST["item"] == "image") {
					
				}
				
			}
			
		}
		else {
			$this->set("whiteboard", $this->whiteboardsDAO->getBoardById($_GET["boardid"]));
			$randx = rand(100,1000);
			$randy = rand(100,400);

			if(!empty($_POST) && !empty($_POST['btnnote'])){
				$this->whiteboardsDAO->addNote("note","note",$_GET["boardid"], $randx, $randy);
			}

			if(!empty($_POST) && !empty($_POST['btnvideo'])){
				$this->whiteboardsDAO->addVideo("video","video", "video" ,$_GET["boardid"]);
			}

			///////////////////////// ADD IMAGE ///////////////////////////
			

			if(!empty($_SESSION["user"])) {
				if(!empty($_POST) && strtolower($_POST["submitimage"]) == "submit"){
					if(!empty($_FILES["imageInput1"])){
						$type = $_FILES['imageInput1']['type'];
						if(($type == "image/gif")
							|| ($type == "image/jpeg")
							|| ($type == "image/jpg")
							|| ($type == "image/JPG")
							|| ($type == "image/png")){


							$filename = $_FILES['imageInput1']['name'];
						$path = WWW_ROOT . 'uploads' . DS . $filename;
						move_uploaded_file($_FILES['imageInput1']['tmp_name'], $path);

						$this->whiteboardsDAO->addImage($filename,$filename,$_GET["boardid"], $randx, $randy);
						$this->redirect("index.php?page=canvaspage&boardid=" . $_GET["boardid"]);

					}


				}
			}

			///////////////////////// ADD VIDEO ///////////////////////////

			if(!empty($_SESSION["user"])) {
	        	if(!empty($_POST) && strtolower($_POST["submitimage"]) == "submit"){
					if(!empty($_FILES["imageInput1"])){
						$type = $_FILES['imageInput1']['type'];
		                if(($type == "image/gif") || ($type == "video/mp4")){

		                    $filename = $_FILES['imageInput1']['name'];
		                    $path = WWW_ROOT . 'uploads' . DS . $filename;
		                    move_uploaded_file($_FILES['imageInput1']['tmp_name'], $path);

							$this->whiteboardsDAO->addVideo($filename,$filename, '1' ,$_GET["boardid"], $randx, $randy);
							$this->redirect("index.php?page=canvaspage&boardid=" . $_GET["boardid"]);

						}


					}
				}
			}
		}


		$images = $this->whiteboardsDAO->getImagesByBoardId($_GET["boardid"]);
		$this->set("images", $images);

		$notes = $this->whiteboardsDAO->getNotesByBoardId($_GET["boardid"]);
		$this->set("notes", $notes);

		}
			
	}

public function detail() {


	$this->set("whiteboard", $this->whiteboardsDAO->getBoardById($_GET["id"]));
	$this->set("users", $this->userDAO->selectAll());

	$useratboard = $this->whiteboardsDAO->getUserForBoard($_SESSION["user"]["id"], $_GET["id"]);
	$this->set("useratboard", $useratboard);

	$participatingUsers = $this->whiteboardsDAO->participatingUserByBoard($_GET["id"], $_SESSION['user']['id']);
	$this->set('participatingUsers', $participatingUsers);


	$searchedusers = array();
	$searchItem = "";
	if(!empty($_POST) && !empty($_POST['searchname'])){
		$searchedusers = $this->userDAO->searchUsers($_POST['searchname'], $_SESSION['user']['id']);
		$searchItem = $_POST['searchname'];

	}

	$this->set('searchItem', $searchItem);
	$this->set('searchedusers', $searchedusers);




	if(!empty($_GET["action"]) && $_GET ["action"] == "addusertoboard" && !empty($_SESSION["user"])) {
		$this->whiteboardsDAO->addParticipant($_GET["userid"], $_GET["id"]);
		$this->redirect("index.php?page=boarddetail&id=" . $_GET["id"]);
	}

}

public function data() {
		$notes = $this->whiteboardsDAO->getNotesByBoardId($_GET["boardid"]);
		//$video = ;
		//$images = ;

		$result = array(
			"notes" => $notes
		);

		header('Content-Type: application/json');
		echo json_encode($result);
		die();
}

private function _handleAddPost() {
	$errors = array();
	if(empty($_POST["whiteboardName"])){
		$errors["whiteboardName"] = "please give the whiteboard a name";
	}

	if(empty($errors)) {
		return true;
	}
	else {
		return false;
	}
}
}