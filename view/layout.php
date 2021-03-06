<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Gallery</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-theme.min.css" rel="stylesheet">
    <link href="css/screen.css" rel="stylesheet">
</head>
<body>

    <!-- MODAL VIDEO -->
    <div class="modal fade bs-example-modal-sm" id="videomodal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
        <form class="form-main" id="videosubmit" action="index.php?page=canvaspage&boardid=<?php $_GET["boardid"]?>&action=addVideo" method="post" enctype="multipart/form-data">
            <label for="file"><span>Filename:</span></label>
            <input type="file" name="file" id="file" /> 
            <input type="submit" name="submit" value="Submit" />
        </form> 
    </div>
  </div>
</div>


<!-- MODAL VIDEO -->
    <div class="modal fade bs-example-modal-sm" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
        <form class="form-main" id="imagesubmit" action="index.php?page=canvaspage&boardid=<?php $_GET["boardid"]?>&action=addimage" method="post" enctype="multipart/form-data">
            <label for="file"><span>Filename:</span></label>
            <input type="file" name="file" id="file" /> 
            <input type="submit" name="submit" value="Submit" />
        </form> 
    </div>
  </div>
</div>
<nav class="navbar navbar-default" role="navigation">
    <div class="container">
        <?php if(!empty($_SESSION["user"])) { ?>
        <ul class="nav navbar-nav navbar-left">
            <li><a href="index.php">Home</a></li>    
            <li><a href="index.php?page=useroverview">User overview</a></li>
        </ul>
        <?php } ?>
        <div class="nav navbar-right">
            <?php 
            if(empty($_SESSION["user"])){
                ?>
                <form class="navbar-form navbar-left" role="login" action="index.php?page=login" method="post">
                    <input type="email" name="email" placeholder="email" class="form-control" />
                    <input type="password" name="password" placeholder="password" class="form-control" />
                    <input type="submit" value="Login" class="btn btn-default" />
                </form>
                <?php
            }
            if(empty($_SESSION["user"])){
                ?>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="index.php?page=register">Register</a></li>
                </ul>
                <?php
            }   
            if(!empty($_SESSION["user"])){
                ?>
                <p class="navbar-text navbar-right">Signed in as <?php echo $_SESSION['user']['email'];?> - <a href="index.php?page=logout" class="navbar-link">Logout</a></p>
                <?php
            }
            ?>
        </div>
    </div>
</nav>
<div class="container">
  <?php if(!empty($_SESSION['info'])): ?><div class="alert alert-success"><?php echo $_SESSION['info'];?></div><?php endif; ?>
  <?php if(!empty($_SESSION['error'])): ?><div class="alert alert-danger"><?php echo $_SESSION['error'];?></div><?php endif; ?>
  <?php echo $content; ?>
</div>
<script src="js/jquery.1.11.0.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/handlebars.min.js"></script>
<script src="js/script.dist.js"></script>
</body>
</html>

