$(document).ready(function () {
    // ?NOTIFY CUSTOM
    const notify = new Notyf({
        duration: 5000,
        position: {
            x: "center",
            y: "top"
        }
    });

    $("#form").submit(function (e) {
        e.preventDefault();
        
        const rawData = localStorage.getItem("webDataLogin");
        const data = JSON.parse(rawData);

        const company_name = $("input[name='company_name']").val();
        const industry_id = $("select[name='industry_id']").val();
        const first_name = $("input[name='first_name']").val();
        const last_name = $("input[name='last_name']").val();
        const email = $("input[name='email']").val();

        const formData = {
            company_name,
            industry_id: Number(industry_id),
            first_name,
            last_name,
            email,
        };

        // FUNGSI CREATE ELEMENT FOR ERROR MESSAGE
        function displayError(message) {
            const errorContainer = $('#errorContainer');
            const errorParagraph = $('<p>').text(message).addClass('error-message');
            errorContainer.empty().append(errorParagraph);
        }

        $.ajax({
            url: "https://vietexpert-api.d.logique.co.id/api/admin/corporate/store",
            type: "POST",
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(formData),
            dataType: "json",
            success: function (data) {
                if (data.status) {
                    notify.success({
                        message: 'Succes sending form',
                    })
                
                    const modal = document.getElementById("myForm");
                    modal.style.display = "none";
                }
            },
            error: function (error) {
                displayError(error.responseJSON.message);
            }
        });
    });

    document.getElementById('registerSubmit').addEventListener('click', function () {
        var button = this;
        button.textContent = 'Loading';
        button.disabled = false;

        setTimeout(function () {
            button.textContent = 'Register';
            button.disabled = false;
        }, 1000); // Simulated 3-second delay, replace with your actual logic
    });

});
