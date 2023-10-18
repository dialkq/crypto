$(document).ready(function () {
    const rawToken = localStorage.getItem("webDataLogin");
    const data = JSON.parse(rawToken);

    const dataTable = $('#corporate-table').DataTable({
        "processing": true,
        "serverSide": true,
        "pageLength": 10, // Jumlah data per halaman
        ajax: {
            url: 'https://vietexpert-api.d.logique.co.id/api/admin/corporate',
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${data.token}`
            },
            dataSrc: function (response) {
                // return response.data.data;
                var json = response.data.data;
                json.recordsTotal = response.data.total_page;
                json.recordsFiltered = response.data.total;
                console.log("ini json total", json.recordsTotal),
                console.log("ini json filtered", json.recordsFiltered)
                return json;
            },
            data: function (d) {
                d.search = $('#searchInput').val(); // Mengambil nilai dari input pencarian
                d.lt = d.length; // Jumlah data per halaman
                d.of = d.start / d.lt; // Nomor halaman
                d.sb = 'id'; // Kolom untuk pengurutan
                d.ob = 'ASC'; // Urutan pengurutan (ASC atau DESC)
            },
        },
        columns: [
            { title: "ID", data: "id" },
            { title: "Membership Type", data: "membership_type" },
            { title: "Company Name", data: "company_name" },
            { title: "Registration Date", data: "registration_date" }
        ],
        paging: true,
        lengthChange: false,
        searching: false,
        info: false,
        pagingType: 'full_numbers',
    });
    // Menambahkan event listener untuk input pencarian
    // Event listener untuk input pencarian
    $('#searchInput').on('keyup', function () {
        dataTable.ajax.reload(); // Memuat ulang data tabel menggunakan AJAX
    });
});
