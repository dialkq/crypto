function checkLogin() {
    const rawToken = localStorage.getItem("webDataLogin");
    const data = JSON.parse(rawToken);
  
    if (!data) {
      // Jika pengguna belum login, arahkan mereka ke halaman stock.html
      location.href = 'stock.html';
    } 
    // Jika pengguna telah login, biarkan mereka tetap di halaman ini
  }
  
  // Panggil fungsi ini saat halaman dimuat
  window.onload = checkLogin;