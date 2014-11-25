<section id="content">
    <header><h1>Add Image</h1></header>
    <form action="index.php?page=add" method="post" class="form-horizontal" enctype="multipart/form-data">
        <div class="form-group<?php if(!empty($errors['image'])) echo ' has-error'; ?>">
            <label class="col-sm-2 control-label" for="addImageImage">Image:</label>
            <div class="col-sm-10">
                <input type="file" name="image" id="addImageImage" class="form-control" value="<?php if(!empty($_POST['image'])) echo $_POST['image'];?>" />
                <span class="error-message"<?php if(empty($errors['image'])) echo 'style="display: none;"';?>><?php
                if(empty($errors['image'])) echo 'Please select an image';
                else echo $errors['image'];
                ?></span>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10"><input type="submit" value="Add Image" class="btn btn-default"></div>
        </div>
    </form>
</section>
<script src="js/add.js"></script>