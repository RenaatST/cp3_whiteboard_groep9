<section>
<?php 
	if(empty($_SESSION["user"])) {
		echo "<p>Please log in</p>";
	}
	else {
?>
	<header><h1>Whiteboards Overview</h1></header>

	<form action="index.php?page=addBoard" method="post" >
		Whitboardname:<br>
		<input type="text" name="whiteboardName" id="whiteboardName" value="Whiteboard X">
	<br><br>
		<input type="submit" id="submit" name="submit" value="submit">
	</form>
	<br><br>
	<?php
	if(empty($userwhiteboards)){
		echo "<p>No whiteboards yet</p>";
	}
	else{
		foreach ($userwhiteboards as $whiteboard) {
			echo "<li>{$whiteboard["title"]} - Created by: {$whiteboard["username"]} </li>";
		}
	}
	}

	?>
</section>