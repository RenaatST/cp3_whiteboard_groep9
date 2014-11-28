<section id="content">
	<header><h1>Welkom op het profiel van: <?php echo "{$user["username"]}"; ?></h1></header>

    <!-- Lijst van images van deze user -->
    <h2>Al de whiteboards van mister:</h2>
    <?php 

        foreach ($boardsbyuser as $boardbyuser) {
                echo "<li>{$boardbyuser["title"]}</li>";
        }

    ?>

    
    
    

</section>