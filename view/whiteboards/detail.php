<section id="whiteboardDetail">
<header><h2><?php echo $whiteboard["title"];?></h2></header>
<h5><?php echo "created on ".$whiteboard["date_added"]; ?></h3>
<button type="button" id="addUserbtn" class="btn btn-sm btn-success">Add user</button>
<div class='selectoverlay hidden'>
	<button type='button' class='btn btn-xs btn-danger closebtn'>close</button>	
	<form>
		<ul>
		<?php foreach ($users as $user) {
			echo "<li><input class=\"userinput\" type=\"checkbox\" name=\"user\" value=\"{$user['username']}\">{$user['username']}</li>";
		} ?>
		</ul>
	</form>

</div>

</section>
