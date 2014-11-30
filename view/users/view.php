<section>
    
    <div class="left">
        <header><h1>Users Overview</h1></header>

        <ul>
            <?php 
                if(empty($users)){
                    echo "<p>No users in database</p>";
                }
                else{
                    foreach ($users as $user) {
                        if($user["username"] == $_SESSION["user"]["username"]){
                            echo "<li><a href='index.php?page=userdetail&userid={$user["id"]}'>{$user["username"]}</a>  -- {$user["email"]} ** ME **</li>";
                        }else{
                            echo "<li><a href='index.php?page=userdetail&userid={$user["id"]}'>{$user["username"]}</a>  -- {$user["email"]}</li>";
                        }
                    }
                }
            ?>
        </ul>

    </div>
    <div class="right">
        <h2>Zoek een persoon: </h2><br>
        <form action="" method="post">
            <input type="text" name="searchname" id="searchname" placeholder=
                <?php 
                    if(!empty($searchItem)){
                        echo "{$searchItem}";
                    }else{
                        echo "username";

                    }

                ?>
            >
            <input type="submit" id="zoek" name="zoek" value="zoek">
        </form>        
        

        <?php 
        if(!empty($searchedusers)){
            echo "<h3>Zoekresultaten:</h3><br><ul>";

            foreach ($searchedusers as $searcheduser) {
                echo "<li>{$searcheduser['username']}</li>";
            }

            echo "</ul";
        }
        ?>
    </div>
    
    

    

</section>