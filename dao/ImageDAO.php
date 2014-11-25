<?php
require_once __DIR__ . '/DAO.php';
class ImageDAO extends DAO {
	
	public function selectAll() {
		$sql = "SELECT * FROM `images` ORDER BY ID DESC";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function selectByUserId($id) {
		$sql = "SELECT * FROM `images` WHERE `user_id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function selectById($id) {
		$sql = "SELECT * FROM `images` WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectUserById($id) {
		$sql = "SELECT * FROM `images` WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function insert($data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "INSERT INTO `images` (`user_id` , `name`, `extension`, `rating`) VALUES (:user_id,:name, :extension,:rating)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':user_id', $_SESSION["user"]["id"]);
			$stmt->bindValue(':name', $data['name']);
			$stmt->bindValue(':extension', $data['extension']);
			$stmt->bindValue(':rating', 0);
			if($stmt->execute()) {
				$insertedId = $this->pdo->lastInsertId();
				return $this->selectById($insertedId);
			}
		}
		return false;
	}

	public function update($id, $data) {
			$sql = "UPDATE `images` SET `rating` = :rating WHERE `id` = :id";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':rating', $data['rating']);
			$stmt->bindValue(':id', $id);
			if($stmt->execute()) {
				return $this->selectById($id);
			}
			return false;
	}

		public function getValidationErrors($data) {
			$errors = array();
			if(empty($data['name'])) {
				$errors['name'] = 'Please enter the name';
			}
			if(empty($data['extension'])) {
				$errors['extension'] = 'Please enter the extension of the file';
			}
			return $errors;
		}

	}