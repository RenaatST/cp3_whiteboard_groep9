<div>
  <section id="content">
    <section class="row">
    	<div class="col-sm-2">
    		<a class="btn btn-default btn-block btn-nav btn-prev" href="index.php?page=detail&amp;id=<?php echo $previous ?>">previous</a>
    	</div>
     <div class="col-sm-8 text-center">
      <img src="uploads/<?php echo $image['name'];?>_<?php echo $user["id"] ?>.<?php echo $image['extension'];?>" 
      alt="" width="400" height="400"/>

      <dl>
        <dt>Uploaded By</dt>
        <dd><?php echo $user["email"] ?></dd>
        <dt>Rating</dt>
        <dd><?php echo $image["rating"]; ?></dd>
      </dl>
      <form method="post" class="form-inline" id="voteForm" action="index.php?page=detail&amp;id=<?php echo $image['id']?>">
        <select class="form-control" name="action">
          <option value="down">Vote Down</option>
          <option value="up">Vote Up</option>
        </select>
        <button type="submit" class="btn btn-default">Vote</button>
      </form>
    </div>
    <div class="col-sm-2">
     <a class="btn btn-default btn-block btn-nav btn-next" href="index.php?page=detail&amp;id=<?php echo $next ?>">next</a>
   </div>
 </section>
 <section class="row text-center">
  
  <!-- Lijst van alle images -->

  <?php foreach ($images as $image) {
    echo "<a href=\"index.php?page=detail&amp;id={$image['id']}\">
    <img src=\"uploads/{$image['name']}_th_{$image['user_id']}.{$image['extension']}\" /></a>";
    
  }
  ?>
</section>
</section>
<script src="js/view.js"></script>
</div>
