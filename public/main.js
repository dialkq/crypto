document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen yang diperlukan
    const modal = document.getElementById("myForm");
    const addBtn = document.getElementById("addNewBtn");
    const closeBtn = document.getElementById("cancelBtn");

     // Fungsi untuk membuka modal
     addBtn.onclick = () => {
        modal.style.display = "block";
    };
    // Ketika cancel diklik
    closeBtn.addEventListener("click", () => {
        // Sembunyikan div dengan mengubah properti "display"
        modal.style.display = "none";
    });
   

    // GET DATA LOCAL STORAGE
    const rawData = localStorage.getItem("webDataLogin");
    const data = JSON.parse(rawData);
    
    // TAMPILKAN NAMA
    const nameParagraph = document.getElementById("showName");
    nameParagraph.textContent = data.name;
    console.log("NAMA NIH", data.name);

    // Fungsi untuk menghapus data di local storage
    const clearLocalStorage = () => {
        localStorage.clear();
    };

    // FUNGSI LOGOUT
    const token = data.token
    const handleLogoutClick = async () => {
        try {
            const response = await fetch('https://vietexpert-api.d.logique.co.id/api/admin/auth/logout', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.status === true) {
                // Hapus data di local storage jika status true
                clearLocalStorage();
                // Redirect ke halaman loginForm.html
                window.location.href = 'login-form.html';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // Event listener untuk menangkap klik pada elemen dengan id "logoutBtn"
    document.getElementById('logoutBtn').addEventListener('click', handleLogoutClick);
})