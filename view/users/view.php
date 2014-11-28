<section id="content">
	<header><h1>All users!</h1></header>

    <!-- Lijst van images van deze user -->

    <?php 

        if(empty($users)){
            echo "<p>you're alone!</p>";
        }else{
            foreach ($users as $user) {
                echo "<a href='index.php?page=detailuser&userid={$user["id"]}'>{$user["username"]}</a>  -- {$user["email"]}<br>";

            }
        }

    ?>

    
    
    

</section>