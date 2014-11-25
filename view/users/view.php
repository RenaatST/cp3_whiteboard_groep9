<section id="content">
	<header><h1><?php echo $user["email"] ?></h1></header>

    <!-- Lijst van images van deze user -->
    <?php
    if(!empty($images)){
    foreach ($images as $image) {
    	echo "<a href=\"index.php?page=detail&amp;id={$image["id"]}\"><img src=\"uploads/{$image["name"]}_th_{$image["user_id"]}.{$image["extension"]}\" /></a>";
    }
}
else{
	echo "<p>No pictures uploaded</p>";
}
    ?>
    
    

    <!-- of melding als deze nog geen images heeft -->
    

</section>