<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'ImageDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';

require_once WWW_ROOT . 'php-image-resize' . DS . 'ImageResize.php';

class ImagesController extends Controller {

	private $imageDAO;
	private $userDAO;

	function __construct() {
		$this->imageDAO = new ImageDAO();
		$this->userDAO = new UserDAO();
	}

	public function index() {
		
			$this->set("images",$this->imageDAO->selectAll());
		
	}

	public function view() {
		if(!empty($_GET["id"])){
			$image = $this->imageDAO->selectById($_GET["id"]);
			$this->set("image",$image);	
			$user = $this->imageDAO->selectById($_GET["id"]);
			$this->set("user",$this->userDAO->selectById($user["user_id"]));
			$this->set("images",$this->imageDAO->selectAll());	
		}
		else {
			$this->redirect("index.php");
		}

		if(!empty($_POST)){
			if(!empty($_POST["action"])) {
			switch ($_POST["action"]) {
				case 'down':
				$rate = $this->imageDAO->selectById($image["id"]);
				$rate["rating"]-=1;
				$this->imageDAO->update($image["id"],$rate);
				break;
				case 'up':
				$rate = $this->imageDAO->selectById($image["id"]);
					$rate["rating"]+=1;
				$this->imageDAO->update($image["id"],$rate);
				break;
			}
			}	
		}
		

		if(!empty($_GET["id"])) {
			$images = $this->imageDAO->selectAll();
			$ids = array();
			foreach ($images as $img) {
				$ids[]= $img["id"];
			}

			$current = array_search($image["id"], $ids);
			$next=$current+1;
			$previous=$current-1;

			if($next == count($ids)) {
				$next = 0;
			}
			if($previous < 0) {
				$previous = count($ids)-1;
			}

			$this->set("previous",$ids[$previous]);
			$this->set("next",$ids[$next]);
		}
		else {
			$this->redirect("index.php");
		}
		
	}

	public function add(){
		if(empty($_SESSION["user"])){
			$_SESSION["error"] = "You need to be logged in for this";
			$this->redirect("index.php?page=register");
		}
		else {
			$errors = array();
			$size = array();
			$breedte;

			if(!empty($_FILES["image"])){
			//begin if
				if(!empty($_FILES["image"]["error"])){
					$errors["image"] = "the file could not be uploaded";
				}
				if(empty($errors["image"])) {
					$size = getimagesize($_FILES["image"]["tmp_name"]);
					if(empty($size)){
						$errors["image"] = "this file is not an image";
					}
				}
				if(empty($errors["image"])) {
					$breedte = $size[0];
					if($size[1] != $breedte) {
						$errors["image"] = "the image must be square";	
					}
				}
				if(empty($errors["image"])) {

					$name = preg_replace("/\\.[^.\\s]{3,4}$/", "", $_FILES["image"]["name"]);
				$extension = explode($name.".", $_FILES["image"]["name"])[1]; //cat.jpg exploden op cat
				
				$imageresize = new Eventviva\ImageResize($_FILES["image"]["tmp_name"]);
				$imageresize->resizeToHeight(400);
				$imageresize->save(WWW_ROOT."uploads".DS.$name."_".$_SESSION["user"]["id"].".".$extension);//upload/cat.jpg
				$imageresize->resizeToHeight(100);
				$imageresize->save(WWW_ROOT."uploads".DS.$name."_th_".$_SESSION["user"]["id"].".".$extension);//upload/cat_th_user_id.jpg

				$this->imageDAO->insert(array(
					"extension"=>$extension,
					"name"=>$name
					));

				$_SESSION["info"] = "the image was uploaded";
				$this->redirect("index.php");
			}

		}//end first if

		if(!empty($errors)){
			$_SESSION["error"] = "the image could not be uploaded";
		}

		$this->set('errors', $errors);
	}
	}

	private function _handlePostRate($car) {
		$data = array_merge($_POST,array(
			"created"=>date("Y-m-d H:i:s"),
			"user_id"=>$_SESSION["user"]["id"],
			"car_id"=>$car["id"]
			));
		$comment = $this->ratingDAO->insert($data);
		if(!empty($comment)){
			$_SESSION["info"] = "thank you for your comment";
			$this->redirect("index.php?page=car-detail&id=".$car["id"]);
		}
		else {
			$_SESSION["error"] ="could not add comment";
			$this->set("errors",$this->ratingDAO->getValidationErrors($data));
		}
	}

}