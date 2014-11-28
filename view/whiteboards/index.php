<section>
	<header><h1>Whiteboards</h1></header>
	<?php 

		if(!empty($_SESSION["user"])){
			echo '<form action="" method="post" >
			Whitboardname:<br>
			<input type="text" name="firstname" id="firstname" value="Whiteboard X">
		<br><br>
			<input type="submit" id="submit" name="submit" value="submit">
		</form>
		<br><br>';

		if(empty($whiteboards)){
		echo "<p>No whiteboards yet</p>";
		}
		else{
			foreach ($whiteboards as $whiteboard) {
				echo "<li>{$whiteboard["title"]} - Created by: {$whiteboard["username"]} </li>";
			}
		}


		}
		
	
	

	?>


	<h2>My whiteboards:</h2>

	<?php 

	if(!empty($_SESSION["user"])){
		
		if(empty($mywhiteboards)){
		echo "<p>No whiteboards yet, wanna make one?</p>";
		}
		else{
			foreach ($mywhiteboards as $mywhiteboard) {
				echo "<li>{$mywhiteboard["title"]} - Date created: {$mywhiteboard["date_added"]} </li>";
			}
		}

	}
		
		
	
	

	?>


</section>