<section id="canvaspagina">
	<div class="canvaszelf">
		<nav id="whiteboardnav">
			<h4><?php echo ucwords($whiteboard["title"]);?></h4>
			<form action="" method="post">
                <input type="submit" value="Add Image" name="btnimage" class="btn btn-sm btn-success" />
            </form>

            <form action="" method="post">
                <input type="submit" value="Add Video" name="btnvideo" class="btn btn-sm btn-success" />
            </form>

            <form action="" method="post">
                <input type="submit" value="Add Note" name="btnnote" class="btn btn-sm btn-success" />
            </form>
		</nav>

		<?php
                if(empty($images)){
                }
                else{
                    foreach ($images as $image) {
                        /*echo "<div id='image{$image["id"]}' class='images' style='left:{$image["xPos"]}px;top:{$image["yPos"]}px;'>&nbsp;</div>";*/
                        echo "<form method='post' action=''><div class='form-group image-input' style='left:{$image["xPos"]}px;top:{$image["yPos"]}px;'><input type='file' id='imageInput1' name='imageInput1' class='form-control' /></div></form>";

                    }
                }
        ?>


        

        <?php
                if(empty($notes)){
                }
                else{
                    foreach ($notes as $note) {
                        echo "<form class='note' action='' method=''><textarea rows='4' cols='50' maxlength='259' style='left:{$note["xPos"]}px;top:{$note["yPos"]}px;'></textarea></form>";

                    }
                }
        ?>

        




	</div>
</section>