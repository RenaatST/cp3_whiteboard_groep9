<section>
    <header><h1>Users Overview</h1></header>
    <ul>
    <?php 
    if(empty($users)){
        echo "<p>No users in database</p>";
    }
    else{
        foreach ($users as $user) {
            echo "<li><a href='index.php?page=userdetail&userid={$user["id"]}'>{$user["username"]}</a>  -- {$user["email"]}</li>";
        }
    }
    ?>
    </ul>
</section>