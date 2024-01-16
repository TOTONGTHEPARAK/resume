<?php
session_start();

// ตรวจสอบว่ามีตัวแปรเซสชัน "cart" หรือไม่
if (!isset($_SESSION["cart"])) {
    $_SESSION["cart"] = array(); // ถ้ายังไม่มี ให้สร้างอาร์เรย์ว่าง
}

// ตรวจสอบว่ามีการส่งค่า menu_No มาจากหน้าแสดงรายการเมนูหรือไม่
if (isset($_GET["menu_No"])) {
    $menu_No = $_GET["menu_No"];
    // เพิ่ม menu_No ลงในรถเข็น (อาร์เรย์เซสชัน "cart")
    $_SESSION["cart"][] = $menu_No;
}


// เชื่อมต่อกับฐานข้อมูล
include "connect.php";

// สร้างคำสั่ง SQL เพื่อดึงข้อมูลเมนูจากฐานข้อมูล
if (empty($_SESSION["cart"])) {
    $sql = "SELECT * FROM menu WHERE 1=0"; 
} else {
    $sql = "SELECT * FROM menu WHERE menu_No IN (" . implode(",", $_SESSION["cart"]) . ")";
}

$stmt = $pdo->prepare($sql);
$stmt->execute();

// นับจำนวนแต่ละชนิดของสินค้าในรถเข็น
$cartItemCount = array_count_values($_SESSION["cart"]);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Shopping Cart</title>
    <link rel="stylesheet" href="cart-style.css">
</head>
<body>
    <div class="wrapper">
        <div class="topnav">
            <a href="frist.php" style="color:#FBB813">Shop</a>
            <a href="showquery.php">Query</a>
            <a href="cart.php">Cart</a>
        </div>
        <img src="./image/topcart.png" height="300">
        <div class="content">
        
            <?php if (!empty($cartItemCount)): ?>
                <table>
                    <tr>
                        <th>Menu No</th>
                        <th>Menu Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                    <?php while ($row = $stmt->fetch()): ?>
                        <tr>
                            <td><?= $row["menu_No"] ?></td>
                            <td><?= $row["menu_Name"] ?></td>
                            <td><?= $row["price"] * $cartItemCount[$row["menu_No"]] ?></td>
                            <td><?= $cartItemCount[$row["menu_No"]] ?></td>
                            <td>
                                <a href="remove_from_cart.php?menu_No=<?= $row["menu_No"] ?>">ลบ</a>&nbsp;
                                <a href="add_from_cart.php?menu_No=<?= $row["menu_No"] ?>">เพิ่ม</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </table>
                <a href="add_to_sql.php" ><input type="submit" class="confirm-button" value="ยืนยันการซื้อสินค้า"></a>

            <?php else: ?>
                <p>Your cart is empty.</p>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>