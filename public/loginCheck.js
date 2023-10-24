function checkLoginAndRedirect() {
    const rawToken = localStorage.getItem("webDataLogin");
    const data = JSON.parse(rawToken);
  
    if (!data) {
      // Jika pengguna belum login, arahkan ke halaman login
      location.href = 'login-form.html';
    } else {
      // Jika pengguna telah login, biarkan mereka tetap di halaman ini
      // Anda dapat menambahkan logika lain di sini jika diperlukan
    }
  }
  
  // Panggil fungsi ini pada setiap elemen yang memerlukan pengecekan login
  document.querySelectorAll('.login-check').forEach((element) => {
    element.addEventListener('click', function(event) {
      checkLoginAndRedirect();
    });
  });

