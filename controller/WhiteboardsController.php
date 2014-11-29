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


	public function detail() {
		$this->set("whiteboard", $this->whiteboardsDAO->getBoardById($_GET["id"]));
	}


	public function _handleAddPost() {
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