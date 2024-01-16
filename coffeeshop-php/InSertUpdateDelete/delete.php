<?php include "../connect.php" ?>
<html>
<head>
    <meta charset="UTF-8">
    <?php
    $stmt = $pdo->prepare("SELECT * FROM menu ");
    $stmt->execute();
    ?>
    <script>
        function confirmDelete(menu_Name) { // ฟังก์ชนจะถูกเรียกถ้าผู้ใช ั คลิกที่ ้ link ลบ
            var ans = confirm("ต้องการลบ" + menu_Name); // แสดงกล่องถามผู้ใช ้
            if (ans==true) // ถ้าผู้ใชกด ้ OK จะเข ้าเงื่อนไขนี้
            document.location = "delete-sql.php?menu_Name=" + menu_Name; // สงรหัสส ่ นค ้าไปให ้ไฟล์ ิ delete.php
        }
    </script>
</head>
<body>
<?php while ($row = $stmt->fetch()) : ?>
    <div style="padding: 15px; text-align: center">
        <img src='../image/<?=$row["menu_Name"]?>.jpg' width='100'><br>
        Name: <?=$row ["menu_Name"]?><br>
        Price: <?=$row ["price"]?><br>
        <?php
            echo "<a href='#' onclick='confirmDelete(`" . $row["menu_Name"] . "`)'>ลบ</a>"
        ?>
    </div>
    
<?php endwhile; ?>
</body>
</html>