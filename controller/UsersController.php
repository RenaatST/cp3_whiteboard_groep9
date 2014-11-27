<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'ImageDAO.php';

require_once WWW_ROOT . 'phpass' . DS . 'Phpass.php';

class UsersController extends Controller {

	private $userDAO;
	private $imageDAO;

	function __construct() {
		$this->userDAO = new UserDAO();
		$this->imageDAO = new ImageDAO();
	}

	public function index() {
		$this->set("users",$this->userDAO->selectAll());
		$this->set("images",$this->imageDAO->selectAll());
	}

	public function view() {
		if(!empty($_GET["id"])){
			$image = $this->imageDAO->selectByUserId($_GET["id"]);
			$this->set("user",$this->userDAO->selectById($_GET["id"]));	
			$this->set("images",$image);
		}
		else {
			$this->redirect("index.php");
	}
}

	public function register() {
		$errors = array();
		if(!empty($_POST)){
			if(empty($_POST["username"])){
				$errors["username"] = "please fill in an username";
			}
			if(empty($_POST["email"])){
				$errors["email"] = "please fill in an email";
			}
			if(empty($_POST["password"])) {
				$errors["password"] = "please fill in a password";
			}
			if($_POST["password"] != $_POST["confirm_password"] || $_POST["password"] == "") {
				$errors["confirm_password"] = "passwords are diffrent";
			}

			if(empty($errors)) {
				$hasher = new \Phpass\Hash;
				$user = $this->userDAO->insert(array(
					"username"=>$_POST["username"],
					"password"=>$hasher->hashPassword($_POST["password"]),
					"email"=>$_POST["email"],
					"profile_image"=>"test",
					"role_id"=> 0
					));
				if(!empty($user)) {
					$_SESSION["info"] = "registration was succesful";
					$this->redirect("index.php");
				}
			}
			$_SESSION["errors"]="registration not succesful";
			$this->set("errors",$errors);
		}

	}
	

	public function login(){
		$errors = array ();
		if(!empty($_POST)) {
			if(empty($_POST["email"])) {
				$errors["email"] = "please fill in an email";
			}
			if(empty($_POST["password"])) {
				$errors["password"] = "please fill in a password";
			}

			if(empty($errors)) {
				$user = $this->userDAO->selectByEmail($_POST["email"]);

				if(!empty($user)) {
					$hasher = new \Phpass\Hash;
					if($hasher->checkPassword($_POST["password"],$user["password"])){
						$_SESSION["user"] = $user;
					}
					else{ 
						$_SESSION["error"] = "password is incorrect";
					}
				}
				else{
					$_SESSION["error"]= "Username is incorrect";
				}
			}
			else {
				$_SESSION["error"] = "could not log in";
			}
		}
		$this->redirect("index.php");
		
	}

	public function logout(){
		unset($_SESSION["user"]);
		$this->redirect("index.php");
		
	}

}