<section id="whiteboardDetail">
<header><h2><?php echo $whiteboard["title"];?></h2></header>
<h5><?php echo "created on ".$whiteboard["date_added"]; ?></h3>

<?php if($whiteboard["creator_id"] == $_SESSION["user"]["id"] || !empty($useratboard)): ?>

<!--<button type='button' id='addUserbtn' class='btn btn-sm btn-success'>Add user</button>-->
<a href='index.php?page=canvaspage&boardid=<?php echo $_GET['id']; ?>'>Ga naar je whiteboard</a></br></br>


<div class="left">
        <h4>Voeg personen toe aan jouw whiteboard: </h4>
        
        <?php if(empty($users)): ?>
		<?php else: ?>
			<ul>
				<?php foreach ($users as $user): ?>
				<?php if($user["id"] == $_SESSION["user"]["id"]): ?>

				<?php else: ?>
					<span><?php echo $user['username']; ?>  </span><a href='index.php?page=boarddetail&id=<?php echo $_GET["id"]; ?>&action=addusertoboard&userid=<?php echo $user['id']; ?>'>voeg deze persoon toe</a></br>
				<?php endif; ?>
				<?php endforeach; ?>

			</ul>
		<?php endif; ?>  

       
</div>

<?php endif; ?>

<div class="right">
	<h4>Deelnemende gebruikers</h4>

        <?php if(empty($participatingUsers)): ?>
		<?php else: ?>
			<ul>
				<?php foreach ($participatingUsers as $participatingUser): ?>
					<li><?php echo $participatingUser["username"]; ?></li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>  

</div>

</section>
