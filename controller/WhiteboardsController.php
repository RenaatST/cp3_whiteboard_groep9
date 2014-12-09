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
		$this->set("whiteboard", $this->whiteboardsDAO->getBoardById($_GET["boardid"]));
		$randx = rand(100,1000);
		$randy = rand(100,400);

		if(!empty($_POST) && !empty($_POST['btnnote'])){
            $this->whiteboardsDAO->addNote("note","note",$_GET["boardid"], $randx, $randy);
        }

        if(!empty($_POST) && !empty($_POST['btnvideo'])){
            $this->whiteboardsDAO->addVideo("video","video", "video" ,$_GET["boardid"]);
        }

        

        if(!empty($_POST) && !empty($_POST['btnimage'])){
            $this->whiteboardsDAO->addImage("image","image",$_GET["boardid"], $randx, $randy);
        }


        $images = $this->whiteboardsDAO->getImagesByBoardId($_GET["boardid"]);
		$this->set("images", $images);

		$notes = $this->whiteboardsDAO->getNotesByBoardId($_GET["boardid"]);
		$this->set("notes", $notes);




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