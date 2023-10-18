// Mendapatkan referensi ke form
const submitForm = document.getElementById("resetPassword");
// Menambahkan event listener untuk saat form di-submit
submitForm.addEventListener("submit", async (event)=>{
    event.preventDefault(); // Mencegah form dari refresh halaman
    // Mendapatkan nilai email dari input
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    // Konfigurasi request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email
        })
    };
    try {
        // Lakukan POST request ke URL API dengan async/await
        const response = await fetch("https://vietexpert-api.d.logique.co.id/api/admin/auth/forget", requestOptions);
        const data = await response.json();
        // Periksa apakah status true atau false
        if (data.status) {
            // Tampilkan popup jika email adalah "admin@mail.com"
            alert("your request is succses");
            window.location.href = "succsesLandingPage.html";
        } else // Tampilkan popup jika email tidak terdaftar
        alert("Email tidak terdaftar");
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menghubungi server");
    }
});

//# sourceMappingURL=forgotPassword.f129bab6.js.map
