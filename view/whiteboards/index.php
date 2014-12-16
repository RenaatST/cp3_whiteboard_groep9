<section>	
	<?php if(!empty($_SESSION["user"])): ?>
			<header><h1>Add whiteboard</h1></header>
			<form action="index.php?page=addBoard" method="post" >
			<input type="text" name="whiteboardName" id="whiteboardName" placeholder="Whiteboard name">
			<br><br>
			<input type="submit" id="submit" name="submit" value="submit">
			</form>
			<br><br>

	

	<div class="left">
		<h2>My whiteboards:</h2>
		<?php if(empty($userwhiteboards)): ?>
				</br><p>No whiteboards yet</p>
		<?php else: ?>
			<?php foreach ($userwhiteboards as $whiteboard): ?>
					</br><a href="index.php?page=boarddetail&id=<?php echo $whiteboard['id']; ?>"><?php echo $whiteboard['title']; ?></a> -- <a href='index.php?action=delete&boardid=<?php echo $whiteboard['id']; ?>'>Delete</a><br>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>
	<div class="right">
		<h2>Whiteboards where I participate:</h2>
		<?php if(empty($boardsIParticipateIn)): ?>
				</br><p>No whiteboards you participate in yet</p>
		<?php else: ?>

			<?php foreach ($boardsIParticipateIn as $boardIParticipateIn): ?>
					</br><a href="index.php?page=boarddetail&id=<?php echo $boardIParticipateIn['board_id']; ?>"><?php echo $boardIParticipateIn['title']; ?></a><br>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>

	<?php else: ?>
		
		<h1>Login to start use whiteboards</h1>

	<?php endif; ?>
</section>