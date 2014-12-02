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
                        echo "<div id='image'>&nbsp;</div>";
                    }
                }
        ?>



	</div>
</section>