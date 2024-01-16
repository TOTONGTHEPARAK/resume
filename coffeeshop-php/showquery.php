<?php
include "connect.php";
?>
<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="query.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai&family=Lato:ital,wght@1,300&family=Open+Sans:wght@300&family=Prompt:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <div class="wrapper">
        <div class="topnav">
            <a href="#"><img src="./image/logo.png" height="30px"></a>
            <a class="linkbutt" style="color:#FBB813;" href="frist.php">Shop</a>
            <a class="linkbutt" href="logout.php">logout</a>
            <a class="linkbutt" href="showquery.php">Query</a>
            <a class="cartbutt" href="cart.php"><i class="fa-solid fa-cart-shopping fa-xl " style="color: #00EDA2;"></i></a>
        </div>
    </div>

    <?php
    $stmt = $pdo->prepare("SELECT menu.menu_Name,COUNT(menu.menu_Name) AS menuCount FROM menu, makings WHERE makings.menu_No = menu.menu_No GROUP BY menu_Name ORDER BY menuCount DESC LIMIT 3;");
    $stmt->execute();

    $stmt2 = $pdo->prepare("SELECT menu.menu_Name, bill.bill_Id, bill.bill_result, bill.bill_Date FROM bill, makings, menu WHERE bill.bill_Date BETWEEN '2023-00-00 16:00:00' AND '2024-00-00 22:00:00' AND bill.bill_Id = makings.bill_Id AND makings.menu_No = menu.menu_No");
    $stmt2->execute();

    $i = 0;
    $name = [];
    $result = [];
    ?>

    <div class="q1">จงแสดง 3 อันดับสินค้าที่ขายดีที่สุด</div>
    <?php while ($row = $stmt->fetch()): ?>
        <?php
        $name[$i] = $row["menu_Name"];
        $result[$i] = $row["menuCount"];
        $i++;
        ?>
    <?php endwhile; ?>
    <?php
    echo "
    <table border='1' width='auto'>
        <tr>
            <th>ชื่อเมนู</th>
            <th>จำนวน</th>
        </tr>";
    for ($j = 0; $j < $i; $j++) {
        echo "<tr><td>" . $name[$j] . "</td><td>" . $result[$j] . "</td></tr>";
    }
    echo "
        </table>
    ";
    ?>

    <div class="q1">จงแสดงรายการที่ขายในช่วงเวลา 16.00-22.00 น.</div>
    <?php $l = 0; ?>
    <?php while ($row = $stmt2->fetch()): ?>
        <?php
        $name2[$l] = $row["menu_Name"];
        $billid[$l] = $row["bill_Id"];
        $billresult[$l] = $row["bill_result"];
        $billtime[$l] = $row["bill_Date"];
        $l++;
        ?>
    <?php endwhile; ?>
    <?php
    echo "
    <table border='1' width='auto'>
        <tr>
            <th>ชื่อเมนู</th>
            <th>ID</th>
            <th>รวม</th>
            <th>เวลา</th>
        </tr>";
    for ($m = 0; $m < $l; $m++) {
        echo "<tr><td>" . $name2[$m] . "</td><td>" . $billid[$m] . "</td><td>" . $billresult[$m] . "</td><td>" . $billtime[$m] . "</td></tr>";
    }
    echo "
        </table>
    ";
    ?>

    <div class="q1">จงแสดงจำนวนยอดขายทั้งหมดของเดือน</div>
    <form method="POST" action="">
        <label for="month">เลือกเดือน:</label>
        <select name="month" id="month">
            <option value="01">มกราคม</option>
            <option value="02">กุมภาพันธ์</option>
            <option value="03">มีนาคม</option>
            <option value="04">เมษายน</option>
            <option value="05">พฤษภาคม</option>
            <option value="06">มิถุนายน</option>
            <option value="07">กรกฎาคม</option>
            <option value="08">สิงหาคม</option>
            <option value="09">กันยายน</option>
            <option value="10">ตุลาคม</option>
            <option value="11">พฤจิกายน</option>
            <option value="12">ธันวาคม</option>
        </select>
        <input type="submit" value="ค้นหา">
    </form>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // รับค่าเดือนที่ผู้ใช้เลือก
        $selectedMonth = $_POST['month'];

        // สร้างคำสั่ง SQL เพื่อดึงข้อมูลบิลในเดือนที่ระบุ
        $stmt3 = $pdo->prepare("SELECT Month(bill_Date), SUM(bill.bill_result) AS totalSales
                               FROM bill 
                               WHERE bill.bill_Date LIKE '2023-$selectedMonth%'");
        $stmt3->execute();

        // ดึงข้อมูลผลลัพธ์
        $result = $stmt3->fetch(PDO::FETCH_ASSOC);
    }
    ?>

    <?php
    $month = $selectedMonth;
    $summonth = isset($result['totalSales']) ? $result['totalSales'] : 0;
    echo "
    <table border='1' width='auto'>
        <tr>
            <th>เดือน</th>
            <th>ยอดขายรวม</th>
        </tr>";
    echo "<tr><td>" . $month . "</td><td>" . $summonth . "</td></tr>";
    echo "
        </table>
        <br><br><br>
        </body>
    </html>";
    ?>
