<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';


require_once WWW_ROOT . 'phpass' . DS . 'Phpass.php';

class UsersController extends Controller {

	private $userDAO;


	function __construct() {
		$this->userDAO = new UserDAO();

	}

	public function index() {
		$this->set("users",$this->userDAO->selectAll());

	}

	public function view() {
		$users = $this->userDAO->selectAll();
		$this->set('users', $users);

		
		$searchedusers = array();
        $searchItem = "";
        if(!empty($_POST) && !empty($_POST['searchname'])){
            $searchedusers = $this->userDAO->searchUsers($_POST['searchname'], $_SESSION['user']['id']);
            $searchItem = $_POST['searchname'];
            
        }
        
            $this->set('searchItem', $searchItem);
        	$this->set('searchedusers', $searchedusers);

	}

	public function viewDetail()
	{
		$user = $this->userDAO->selectById($_GET["userid"]);
		$this->set('user', $user);

		$boardsbyuser = $this->userDAO->boardsByUser($_GET["userid"]);
		$this->set('boardsbyuser', $boardsbyuser);


	}

	public function register() {
		$errors = array();
		if(!empty($_POST)){

			//controles als alle velden zijn ingevuld en als er al geen users bestaan met die username of email.
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
			$existing = $this->userDAO->selectByEmail($_POST['email']);
			if(!empty($existing)) {
				$errors['email'] = 'Email address is already in use';
			}
			$existingusername = $this->userDAO->selectByUsername($_POST['username']);
			if(!empty($existingusername)) {
				$errors["username"] = "username is already in use";
			}


			//als er geen errors zijn mag je de user inserten in de database.
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
		}
	$_SESSION["errors"]="registration not succesful";
	$this->set("errors",$errors);
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
					$_SESSION["info"] = "login was succesful";
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
	$_SESSION["info"] = "logout was succesful";
	$this->redirect("index.php");

}

}