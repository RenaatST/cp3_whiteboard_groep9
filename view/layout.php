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
    <nav class="navbar navbar-default" role="navigation">
            <div class="container">
            <?php if(!empty($_SESSION["user"])) { ?>
                <ul class="nav navbar-nav navbar-left">
                        <li><a href="index.php">Home</a></li>    
                        <li><a href="index.php?page=useroverview">User overview</a></li>
                </ul>
            <?php } ?>
                <div class="nav navbar-right">
                    <!-- TOON LOGIN FORM & REGISTER LINK ENKEL INDIEN NIET INGELOGD -->
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
                    <!-- TOON LOGOUT ENKEL INDIEN WEL INGELOGD -->
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

