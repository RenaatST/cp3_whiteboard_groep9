<section id="canvaspagina">
    <nav id="whiteboardnav">
        <h4><?php echo ucwords($whiteboard["title"]);?></h4>
        <button id="addimg" name="btnimage" class="btn btn-sm btn-success">Add image</button>
        <button id="addvideo" name="btnvideo" class="btn btn-sm btn-success">Add video</button>
        <button id="addnote" name="btnnote" class="btn btn-sm btn-success">Add note</button>    
    </nav>
    <div class="canvaszelf" id="cnvszelf">

<script type="text/template" id="postit-template">
    {{#each notes}}
        <div class="drag-drop postit" style="left:{{xPos}}px; top:{{yPos}}px;" data-id="{{id}}" data-set="{{whiteboard_id}}" data-item="note">
            <span class="deletebtn" data-id="{{id}}"></span>
            <p contenteditable="true">{{text}}</p>
        </div>
    {{/each}}
</script>

<script type="text/template" id="image-template">
    {{#each images}}
        <div class="drag-drop image" style="left:{{xPos}}px; top:{{yPos}}px;" data-id="{{id}}" data-set="{{whiteboard_id}}" data-item="image">
            <span class="deletebtn" data-id="{{id}}"></span>
            <img src="{{}}">;   
        </div>
    {{/each}}
</script>



  
    
    <?php
        /*
                if(empty($images)){
                }
                else{
                    foreach ($images as $image) {
                        //echo "<div id='image{$image["id"]}' class='images' style='left:{$image["xPos"]}px;top:{$image["yPos"]}px;'>&nbsp;</div>";
                        echo "<img src='uploads/{$image["title"]}' style='left:{$image["xPos"]}px;top:{$image["yPos"]}px;'/>";
                    }
                }
                */
                ?>
                <?php
        /*
                if(empty($notes)){
                }
                else{
                    foreach ($notes as $note) {
                        echo "<form class='note' action='' method='' style='left:{$note["xPos"]}px;top:{$note["yPos"]}px;'>
                            <textarea rows='4' cols='50' maxlength='259'></textarea>
                        </form>";

                    }
                }
                */
                ?>
            </div>
        </section>