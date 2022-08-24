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
