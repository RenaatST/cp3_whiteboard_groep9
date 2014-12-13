<section id="canvaspagina">
    <nav id="whiteboardnav">
            <h4><?php echo ucwords($whiteboard["title"]);?></h4>
                <button id="addimg" name="btnimage" class="btn btn-sm btn-success">Add image</button>
                <button id="addvideo" name="btnvideo" class="btn btn-sm btn-success">Add video</button>
                <button id="addnote" name="btnnote" class="btn btn-sm btn-success">Add note</button>    
        </nav>
	<div class="canvaszelf" id="cnvszelf">


        <form method='post' action=''  enctype="multipart/form-data">
            <div class='form-group-canvas image-input' style='left:{$image["xPos"]}px;top:{$image["yPos"]}px;'>
                <input type='file' id='imageInput1' name='imageInput1' class='form-control' />
                <input type="submit" name="submitimage" value="submit" />
            </div>
        </form>


		

		<?php
                if(empty($images)){
                }
                else{
                    foreach ($images as $image) {
                        //echo "<div id='image{$image["id"]}' class='images' style='left:{$image["xPos"]}px;top:{$image["yPos"]}px;'>&nbsp;</div>";
                        echo "<img src='uploads/{$image["title"]}' style='left:{$image["xPos"]}px;top:{$image["yPos"]}px;'/>";
                    }
                }
        ?>
        <?php
                if(empty($notes)){
                }
                else{
                    foreach ($notes as $note) {
                        echo "<form class='note' action='' method='' style='left:{$note["xPos"]}px;top:{$note["yPos"]}px;'>
                            <textarea rows='4' cols='50' maxlength='259'></textarea>
                        </form>";

                    }
                }
        ?>
	</div>
</section>