<section id="content">
    <header><h1>Register</h1></header>
    <form action="index.php?page=register" method="POST" class="form-horizontal">

    <div class="form-group<?php if(!empty($errors['username'])) echo ' has-error'; ?>">
            <label class="col-sm-2 control-label" for="registerusername">username:</label>
            <div class="col-sm-10">
                <input type="username" name="username" id="registerusername" class="form-control" value="<?php if(!empty($_POST['username'])) echo $_POST['email'];?>" />
                <?php if(!empty($errors['username'])) echo '<span class="error-message">' . $errors['username'] . '</span>'; ?>
            </div>
        </div>

        <div class="form-group<?php if(!empty($errors['email'])) echo ' has-error'; ?>">
            <label class="col-sm-2 control-label" for="registerEmail">Email:</label>
            <div class="col-sm-10">
                <input type="email" name="email" id="registerEmail" class="form-control" value="<?php if(!empty($_POST['email'])) echo $_POST['email'];?>" />
                <?php if(!empty($errors['email'])) echo '<span class="error-message">' . $errors['email'] . '</span>'; ?>
            </div>
        </div>

        <div class="form-group<?php if(!empty($errors['password'])) echo ' has-error'; ?>">
            <label class="col-sm-2 control-label" for="registerPassword">Password:</label>
            <div class="col-sm-10">
                <input type="password" name="password" id="registerPassword" class="form-control" />
                <?php if(!empty($errors['password'])) echo '<span class="error-message">' . $errors['password'] . '</span>'; ?>
            </div>
        </div>

        <div class="form-group<?php if(!empty($errors['confirm_password'])) echo ' has-error'; ?>">
            <label class="col-sm-2 control-label" for="registerConfirmPassword">Confirm Password:</label>
            <div class="col-sm-10">
                <input type="password" name="confirm_password" id="registerConfirmPassword" class="form-control" />
                <?php if(!empty($errors['confirm_password'])) echo '<span class="error-message">' . $errors['confirm_password'] . '</span>'; ?>
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10"><input type="submit" value="register" class="btn btn-default"></div>
        </div>
    </form>
    
</section>
