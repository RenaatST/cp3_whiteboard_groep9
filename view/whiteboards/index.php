<section>	
	<?php 

		if(!empty($_SESSION["user"])){?>
			<header><h1>Add whiteboard</h1></header>
			<form action="index.php?page=addBoard" method="post" >
			<input type="text" name="whiteboardName" id="whiteboardName" placeholder="Whiteboard name">
			<br><br>
			<input type="submit" id="submit" name="submit" value="submit">
			</form>
			<br><br>
			<?php 
			if(empty($userwhiteboards)){
			echo "<p>No whiteboards yet</p>";
			}else{
				echo "<h2>My whiteboards:</h2>";
				foreach ($userwhiteboards as $whiteboard) {
					echo "<a href=\"index.php?page=boarddetail&id={$whiteboard["id"]}\">{$whiteboard["title"]}</a> -- 
					<a href='index.php?action=delete&boardid={$whiteboard["id"]}'>Delete</a><br>";
				}
			}
		}
		else {
			echo "Log in to see your whiteboards or to make one";
		}
	?>

</section>