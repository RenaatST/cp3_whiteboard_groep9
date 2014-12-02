<section id="whiteboardDetail">
<header><h2><?php echo $whiteboard["title"];?></h2></header>
<h5><?php echo "created on ".$whiteboard["date_added"]; ?></h5>
<button type="button" id="addUserbtn" class="btn btn-sm btn-success"><a href="#modal">Add user</a></button>
<div id="modal" class='selectoverlay hidden'>
	<div>
		<a href="#close" title="Close" class="close">X</a>
		<form>
			<ul>
			<?php foreach ($users as $user) {
				echo "<li><input class=\"userinput\" type=\"checkbox\" name=\"user\" value=\"{$user['username']}\">{$user['username']}</li>";
			} ?>
			</ul>
		</form>
	</div>
</div>

</section>
