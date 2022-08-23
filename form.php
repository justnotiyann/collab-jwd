<?php
    session_start();
    include "koneksi.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous"> 
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>    
    <link rel="stylesheet" href="style.css">
    <title>Form</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container">
            <a class="navbar-brand" style="color:#fff ;" href="#">
        <!-- <img src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top"> -->
        Books <strong>Store</strong>
            </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mt-2 ms-auto">
                <form method="post">
                    <li class="login-form">
                        <input type="email" name="email" placeholder="email" required>
                        <input type="password" name="password" placeholder="password" required>
                        <input class="submit-btn" type="submit" name="login" value="Login">
                    </li>
                </form>
                    <?php 
                        if (isset($_POST['login'])) {
                            $email = $_POST['email'];
                            $password = $_POST['password'];
                            $query = mysqli_query($koneksi,"SELECT * FROM data_user WHERE email = '$email' AND password = '$password'");
                            $cek = mysqli_num_rows($query);
                            if ($cek==1) {
                                $_SESSION['email']=$email;
                                header("location:../homepage.php");
                            }
                            else { 
                                echo "<script type='text/javascript'>
                                    swal({
                                        title: 'Gagal!',
                                        text: 'Email atau Password salah!',
                                        icon: 'error',
                                    })
                                </script>";
                            }
                        }
                    ?>     
            </ul>
        </div>
        </div>
    </nav>
    <form method="post">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 ">
                    <h1 style="margin-top: 170px;">Selamat Datang di <strong style="color: #74c4c1;">Books Store</strong></h1>
                </div>
                <div class="col-lg-5">
                    <h3 style="margin: 20px 0px 0px 20px;">Belum Punya Akun?</h3>
                        <div class="card register-form">
                                <h1 style="font-size: 20px; text-align: center;">Silahkan Isi Data diri anda</h1><br>
                                <label>Nama</label><br>
                                <input type="text" name="nama" placeholder="Masukan Nama" required> <br>
                                <label>Email</label> <br>
                                <input type="email" name="email" placeholder="Masukan Email" required> <br>
                                <label>Password</label><br>
                                <input type="password" name="password" placeholder="Masukan Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Harus berisi setidaknya satu angka dan satu huruf besar dan kecil, dan setidaknya 8 karakter atau lebih" required> <br>
                                <div class="gender">
                                    <label for="gender">Jenis Kelamin</label><br>
                                    <input type="radio" name="gender" value="L" required>Pria <nbsp%></nbsp>
                                    <input type="radio" name="gender" value="P" required>Wanita<br><br>
                                </div>
                                <label for="alamat">Alamat</label>
                                <textarea rows="3" name="alamat" placeholder="Masukan Alamat" style="margin-bottom:20px ;" required></textarea>
                                <input class="submit-btn" type="submit" name="daftar" value="Daftar">
                    </div>
                </div>
            </div>
        </div>
    </form>
    <?php 
        if (isset($_POST['daftar'])) {
        include "koneksi.php";
        $nama=$_POST['nama'];
        $email=$_POST['email'];
        $password=$_POST['password'];
        $gender=$_POST['gender'];
        $alamat=$_POST['alamat'];
        $q1 = mysqli_query($koneksi, "SELECT * FROM data_user WHERE email='$email'");
        $cek=mysqli_num_rows($q1);
            if ($cek==0 ) {
                $aksi="insert into data_user(nama,email,password,gender,alamat) values ('$nama','$email','$password','$gender','$alamat')";
                $hasil=mysqli_query($koneksi,$aksi);
                if ($hasil) {
                    echo "<script type='text/javascript'>
                    swal({
                        title: 'Berhasi!',
                        text: 'Akun sudah dibuat, Silahkan login!',
                        icon: 'success',
                    })
                    </script>";
                exit;
                } 
                else {
                echo "Gagal simpan data";
                }
            } else {
                echo "<script type='text/javascript'>
                swal({
                    title: 'Gagal!',
                    text: 'Email sudah terdaftar!',
                    icon: 'error',
                })
                </script>";
            }
        }
    ?>
</body>
</html>