<?php
if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $query = mysqli_query($koneksi, "SELECT * FROM data_user WHERE email = '$email' AND password = '$password'");
    $cek = mysqli_num_rows($query);
    if ($cek == 1) {
        $_SESSION['email'] = $email;
        header("location:../homepage.php");
    } else {
        echo "<script type='text/javascript'>
                                    swal({
                                        title: 'Gagal!',
                                        text: 'Email atau Password salah!',
                                        icon: 'error',
                                    })
                                </script>";
    }
}
