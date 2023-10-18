document.addEventListener("DOMContentLoaded", function () {
    // Kode yang ingin Anda jalankan saat dokumen siap
    // Ambil tombol dan teks span menggunakan DOM
    const loginButton = document.getElementById("loginBtn");
    const buttonText = document.getElementById("btnText");

    // Tambahkan event listener untuk mendengarkan klik pada tombol
    loginButton.addEventListener("click", function () {
        buttonText.innerText = "Loading...";
    });

    // Check if the user is already logged in
    const webDataLogin = localStorage.getItem("webDataLogin");
    if (webDataLogin) {
        const dataLogin = JSON.parse(webDataLogin);
        if (dataLogin.token) {
            window.location.href = "menu.html";
        }
    }

    document.getElementById("loginForm").
        addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent form submission
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            try {
                const response = await fetch("https://vietexpert-api.d.logique.co.id/api/admin/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });
                const data = await response.json();
                if (data.data.token) {
                    // localStorage.setItem("token", data.data.token);
                    // localStorage.setItem("name", data.data.name);
                    const dataLogin = {
                        token: data.data.token,
                        name: data.data.name
                    }
                    const jsonDataLogin = JSON.stringify(dataLogin);
                    localStorage.setItem("webDataLogin", jsonDataLogin);
                    // Redirect to a secure page or perform other actions
                    window.open("corporateMember.html", "_blank");
                } else {
                    // Handle login failure
                    alert("Login failed. Please check your credentials.");
                }
            } catch (error) {
                console.error("Login error:", error);
            }
        });

    const passwordInput = document.querySelector("#password")
    const eye = document.querySelector("#eye")

    eye.addEventListener("click", function () {
        this.classList.toggle("fa-eye-slash")
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
        passwordInput.setAttribute("type", type)
    })

    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
    });
});