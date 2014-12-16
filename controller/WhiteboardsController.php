<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'WhiteboardsDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';

require_once WWW_ROOT . 'php-image-resize' . DS . 'ImageResize.php';

class WhiteboardsController extends Controller {

	
	private $userDAO;
	private $whiteboardsDAO;

	function __construct() {
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

			//add video
			if($_GET["action"] == "addvideo") {
				$errors = [];
				if(!empty($_FILES)) {
					$allowedExts = array("mp4", "wma");
					$extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
					if ((($_FILES["file"]["type"] == "video/mp4")
						&& ($_FILES["file"]["size"] < 2000000)
						&& in_array($extension, $allowedExts))) {

						if ($_FILES["file"]["error"] > 0)
						{
							//$_SESSION["error"] =  "Return Code: " . $_FILES["file"]["error"] . "<br />";
						}
						else
						{
							if (file_exists("uploads/" . $_FILES["file"]["name"]))
							{
								//$_SESSION["error"] = $_FILES["file"]["name"] . " already exists. ";
							}
							else
							{
								move_uploaded_file($_FILES["file"]["tmp_name"],
									"uploads/" . $_FILES["file"]["name"]);
								$this->whiteboardsDAO->addVideo($_GET["boardid"] , $_FILES["file"]["name"]);
								//$_SESSION["info"] = "Upload of ".$_FILES["file"]["name"]." was succesful";
								$this->redirect("index.php");
							}
						}
					}
					else
					{
						//$_SESSION["error"] = "Invalid file";
					}

				}	
			}


			if($_GET["action"] == "addimage") {
				$allowedExts = array("jpg", "jpeg", "gif", "png");
				$extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

				if (($_FILES["file"]["type"] == "image/pjpeg")
					|| ($_FILES["file"]["type"] == "image/gif")
					|| ($_FILES["file"]["type"] == "image/jpeg"))
				{
					if ($_FILES["file"]["error"] > 0)
					{
						//echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
					}
					else
					{
						if (file_exists("upload/" . $_FILES["file"]["name"]))
						{
							//echo $_FILES["file"]["name"] . " already exists. ";
						}
						else
						{
							move_uploaded_file($_FILES["file"]["tmp_name"],
								"uploads/" . $_FILES["file"]["name"]);
							$this->whiteboardsDAO->addImage($_FILES["file"]["name"],$_GET["boardid"] );
							//echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
						}
					}
				}
				else
				{
					//echo "Invalid file";
				}	
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
						$this->whiteboardsDAO->updateVideo(
							$_POST["id"],
							$_POST["xpos"], 
							$_POST["ypos"]);
					}

					if($_POST["item"] == "image") {
						$this->whiteboardsDAO->updateImage(
							$_POST["id"],
							$_POST["xpos"], 
							$_POST["ypos"]);
					}

				}
		}
			else {
				$this->set("whiteboard", $this->whiteboardsDAO->getBoardById($_GET["boardid"]));
				$randx = rand(100,1000);
				$randy = rand(100,400);

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

	if(!empty($_GET["action"]) && $_GET["action"] == "addusertoboard" && !empty($_SESSION["user"])) {
		$this->whiteboardsDAO->addParticipant($_GET["userid"], $_GET["id"]);
		$this->redirect("index.php?page=boarddetail&id=" . $_GET["id"]);
	}

		}

		public function data() {
			$notes = $this->whiteboardsDAO->getNotesByBoardId($_GET["boardid"]);
			$videos = $this->whiteboardsDAO->getVideosByBoardId($_GET["boardid"]);
			$images = $this->whiteboardsDAO->getImagesByBoardId($_GET["boardid"]);

			$result = array(
				"notes" => $notes,
				"videos" => $videos,
				"images" => $images
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
