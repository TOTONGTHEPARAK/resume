<?php include "../connect.php" ?>
<?php
    $stmt = $pdo->prepare("SELECT * FROM menu ");
    $stmt->execute();  
?>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>

<?php while ($row = $stmt->fetch()) : ?>
    <div style="padding: 15px; text-align: center">
        <form action="update-sql.php" method="post">
            <img src='../image/<?=$row["menu_Name"]?>.jpg' width='100'><br>
                <input type="text" name="menu_Name" value="<?=$row["menu_Name"]?>" hidden><br>
                Price: <input type="number" name="price" value="<?=$row["price"]?>"><br>
            <input type="submit" value="แก้ไข">
        </form>
    </div> 
<?php endwhile; ?>
</body>
</html>