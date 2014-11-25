<section>
	<header><h1>Users Overview</h1></header>
	<?php 
	if(empty($users)){
		echo "<p>No users in database</p>";
	}
	else{
		foreach ($users as $user) {
			echo "<li><a href=\"index.php?page=user-detail&amp;id={$user["id"]}\">{$user["email"]}</a> - 23 image(s)</li>";
		}
	}
	

	?>
</section>