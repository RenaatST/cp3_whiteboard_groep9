<section id="content">
	<header><h1>All images</h1></header>
	<?php
	foreach ($images as $image) {
		echo "<a href=\"index.php?page=detail&amp;id={$image['id']}\">
			<img src=\"uploads/{$image['name']}_th_{$image['user_id']}.{$image['extension']}\" /></a>";
		
	}
	?>
    <!-- Lijst van images
    
    <a href="index.php?page=detail&amp;id=321"><img src="uploads/tweede_th.jpg" /></a>
	-->


    <!-- of melding indien er nog geen zijn -->
    <?php 
    if(empty($images)){
    	echo "<p>No pictures uploaded</p>";
    }
    ?>
    
</section>