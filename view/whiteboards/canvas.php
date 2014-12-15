<section id="canvaspagina">
    <nav id="whiteboardnav">
        <h4><?php echo ucwords($whiteboard["title"]);?></h4>
        <button id="addimg" name="btnimage" class="btn btn-sm btn-success">Add image</button>
        <button id="addvideo" name="btnvideo" class="btn btn-sm btn-success">Add video</button>
        <button id="addnote" name="btnnote" class="btn btn-sm btn-success">Add note</button>    
        <form method='post' action=''  enctype="multipart/form-data">
            <div class='form-group-canvas image-input' style='left:{$image["xPos"]}px;top:{$image["yPos"]}px;'>
                <input type='file' id='imageInput1' name='imageInput1' class='form-control' />
                <input type="submit" name="submitimage" value="submit" />
            </div>
        </form> 
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
</section>
