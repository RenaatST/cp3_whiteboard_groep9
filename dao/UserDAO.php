<?php
require_once WWW_ROOT . 'dao' . DS . 'DAO.php';

class UserDAO extends DAO {

	public function selectAll() {
		$sql = "SELECT * FROM `users`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function selectAllWithImageCount() {
		//gebruik query om alle users & hun aantal images per user op te halen
		$sql = "SELECT `user_id`, max(images.`id`) as aantal FROM `images` INNER JOIN `users` ON `user_id` = images.`user_id`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);

	}

	public function selectById($id) {
		$sql = "SELECT * FROM `users` WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByEmail($email) {
		$sql = "SELECT * FROM `users` WHERE `email` = :email";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':email', $email);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}
		public function selectByUsername($username) {
		$sql = "SELECT * FROM `users` WHERE `username` = :username";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':username', $username);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function insert($data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "INSERT INTO `users` ( `username`, `password`, `email`, `profile_image`, `role_id`) VALUES (:username , :password, :email, :profile_image, :role_id)";
	        $stmt = $this->pdo->prepare($sql);
	        $stmt->bindValue(':username', $data['username']);
	        $stmt->bindValue(':password', $data['password']);
	        $stmt->bindValue(':email', $data['email']);
	        $stmt->bindValue(':profile_image', $data['profile_image']);
	        $stmt->bindValue(':role_id', $data['role_id']);
			if($stmt->execute()) {
				$insertedId = $this->pdo->lastInsertId();
				return $this->selectById($insertedId);
			}
		}
		return false;
	}

	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['email'])) {
			$errors['email'] = "Please fill in the email";
		}
		if(empty($data['password'])) {
	        $errors['password'] = 'please enter a password';
	    }
	    if(!isset($data['role_id'])) {
	        $errors['role_id'] = 'please enter a role_id';
	    }
		return $errors;
	}
}