<section id="content">
    <header><h1>De whiteboards van <?php echo"{$user["username"]}"?>:</h1></header>
    <?php 
        foreach ($boardsbyuser as $boardbyuser) {
                echo "<a href='index.php?page=boarddetail&id={$boardbyuser["id"]}'>{$boardbyuser["title"]}</a><br>";
        }
    ?>
</section>