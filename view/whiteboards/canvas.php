<section id="canvaspagina">
    <nav id="whiteboardnav">
        <h4><?php echo ucwords($whiteboard["title"]);?></h4>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#imagemodal">add Image</button>
        <button id="addnote" name="btnnote" class="btn btn-sm btn-success">Add note</button>    
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#videomodal">add Video</button>

        </form> 
    </nav>
   
    <div class="canvaszelf" id="cnvszelf">

<script type="text/template" id="postit-template">
    <div class="postits">
    {{#each notes}}
        <div class="drag-drop postit" style="left:{{xPos}}px; top:{{yPos}}px;" data-id="{{id}}" data-set="{{whiteboard_id}}" data-item="note">
            <span class="deletebtn" data-id="{{id}}"></span>
            <p contenteditable="true">{{text}}</p>
        </div>
    {{/each}}
    </div>
</script>




<script type="text/template" id="video-template">
    {{#each videos}}
    <div class="videos">
        <div class="drag-drop video" style="left:{{xpos}}px; top:{{ypos}}px;" data-id="{{id}}" data-set="{{whiteboard_id}}" data-item="video">
            <span class="deletebtn" data-id="{{id}}"></span>
            <video width="400px" controls>
                <source src="uploads/{{name}}" type="video/mp4">
            </video>
        </div>
    {{/each}}
    </div>
</script>



    <script type="text/template" id="image-template">
    <div class="images">
    {{#each images}}
        <div class="drag-drop image" style="left:{{xPos}}px; top:{{yPos}}px;" data-id="{{id}}" data-set="{{whiteboard_id}}" data-item="image">
            <span class="deletebtn" data-id="{{id}}"></span>
            <img src="uploads/{{title}}" draggable="false" alt="whiteboardimg">
        </div>
        </div>
    {{/each}}
</script>
</section>
