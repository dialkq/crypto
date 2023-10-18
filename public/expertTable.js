$(document).ready(function () {
  const rawToken = localStorage.getItem("webDataLogin");
  const data = JSON.parse(rawToken);

  // Fungsi formatter untuk kolom kedua terakhir
  function editButtonFormatter(cell, formatterParams, onRendered) {
    return '<i class="fa fa-pencil edit-icon" aria-hidden="true"></i>';
  }

  // Fungsi formatter untuk kolom terakhir
  function deleteButtonFormatter(cell, formatterParams, onRendered) {
    return '<i class="fa fa-trash delete-icon text-sm" aria-hidden="true" style="color: #FF2626;"></i>';
  }
  

  new Tabulator("#expert-table", {
    ajaxURL: 'https://vietexpert-api.d.logique.co.id/api/admin/expert-profile',
    ajaxConfig: {
      method: "GET", //set request type to Position
      headers: {
        'Authorization': `Bearer ${data.token}`
      },
    },
    height: "auto",
    layout: "fitColumns",
    columns: [
      { title: "ID", field: "id" },
      {
        title: "Individual Name", formatter: function (cell, formatterParams, onRendered) {
          var data = cell.getRow().getData();
          var fullName = data.first_name + " " + data.last_name;
          return fullName;
        }
      },
      { title: "Email", field: "email" },
      { title: "Registration Date", field: "registration_date", },
      {
        title: "",
        formatter: editButtonFormatter,
        headerSort: false,
        width: 40,
        cellClick: function (e, cell) {
          // Ambil data baris yang akan diedit
          var rowData = cell.getRow().getData();
          var rowId = rowData.id;

          // Tampilkan log atau lakukan fungsi edit sesuai kebutuhan
          console.log("Edit baris dengan ID: ", rowId);
          // Implementasikan logika atau fungsi edit yang sesuai di sini
        },
      },
      {
        title: "",
        formatter: deleteButtonFormatter,
        headerSort: false,
        width: 60,
        cellClick: function (e, cell) {
          // Tindakan hapus saat ikon di klik
          if (confirm("Apakah Anda yakin ingin menghapus baris ini?")) {
            // Lakukan tindakan hapus di sini
            var rowData = cell.getRow().getData();
            console.log("Hapus baris dengan ID: ", rowData.id);
          }
        },
      },
    ],
    pagination: true, //enable pagination
    paginationSize: 20,
    paginationMode: "remote", //enable remote pagination
    ajaxURLGenerator: function (url, config, params) {
      const { page, size } = params;
      return url + `?of=${Number(page) - 1}&sb=id&ob=ASC&lt=${size}`;
    },
    ajaxResponse: function (url, params, response) {
      console.log("ss", response);
      return {
        data: response.data.data,
        last_page: response.data.total_page
      };
    }
  });
});