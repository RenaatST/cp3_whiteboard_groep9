<section>
	<header><h1>Whiteboards Overview</h1></header>

	<form action="" method="post" >
		Whitboardname:<br>
		<input type="text" name="firstname" id="firstname" value="Whiteboard X">
	<br><br>
		<input type="submit" id="submit" name="submit" value="submit">
	</form>
	<br><br>
	<?php
	if(empty($whiteboards)){
		echo "<p>No whiteboards yet</p>";
	}
	else{
		foreach ($whiteboards as $whiteboard) {
			echo "<li>{$whiteboard["title"]} - Created by: {$whiteboard["username"]} </li>";
		}
	}
	

	?>
</section>