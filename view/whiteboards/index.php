<section>	
	<?php 

		if(!empty($_SESSION["user"])){?>
			<header><h1>Whiteboards</h1></header>
			<form action="" method="post" >
				Whitboardname:<br>
			<input type="text" name="firstname" id="firstname" value="Whiteboard X">
			<br><br>
			<input type="submit" id="submit" name="submit" value="submit">
			</form>
			<br><br>
			<?php 
			if(empty($userwhiteboards)){
			echo "<p>No whiteboards yet</p>";
			}else{
				foreach ($userwhiteboards as $whiteboard) {
					echo "<a href=\"index.php?page=boarddetail&id={$whiteboard["id"]}\"><li>{$whiteboard["title"]} - Created by: {$whiteboard["username"]} </li></a>";
				}
			}
		}
		else {
			echo "Log in to see your whiteboards or to make one";
		}
	?>

</section>