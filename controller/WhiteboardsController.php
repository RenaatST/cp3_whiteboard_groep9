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
		$whiteboards = $this->whiteboardsDAO->getWhiteboards();
		$this->set('whiteboards', $whiteboards);

		if(!empty($_SESSION["user"])){
			$mywhiteboards = $this->whiteboardsDAO->getMyWhiteboards($_SESSION["user"]['id']);
			$this->set('mywhiteboards', $mywhiteboards);
		}

			

		$arrErrorsWhiteboard = array();

		if(!empty($_POST)){
			if(empty($_POST['firstname'])) {
				$arrErrorsWhiteboard['firstname'] = 'firstname invullen';
			}

			if(empty($arrErrorsWhiteboard)){
				$this->whiteboardsDAO->addWhiteboard($_POST['firstname'], 1);
				$this->redirect("index.php?page=home");            
			}
			else {
				$this->set('arrErrorsWhiteboard', $arrErrorsWhiteboard);
			}		
		}
	}
}