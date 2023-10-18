$(document).ready(function () {
  const rawToken = localStorage.getItem("webDataLogin");
  const data = JSON.parse(rawToken);

  // // FUNGSI SEARCH INPUT
  // const searchInput = document.getElementById('searchInput');
  new Tabulator("#corporate-table", {
    ajaxURL: 'https://vietexpert-api.d.logique.co.id/api/admin/corporate',
    ajaxConfig: {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${data.token}`
      },
    },
    height: "auto",
    layout: "fitColumns",
    columns: [
      { title: "ID", field: "id"},
      { title: "Membership Type", field: "membership_type" },
      { title: "Company Name", field: "company_name" },
      { title: "Registration Date", field: "registration_date" },
    ],
    pagination: true,
    paginationSize: 20,
    paginationMode: "remote",
    ajaxURLGenerator: function (url, config, params) {
      const { page, size } = params;
      // const searchValue = searchInput.value;

      return url + `?of=${Number(page) - 1}&sb=id&ob=ASC&lt=${size}`;
    },
    ajaxResponse: function (url, params, response) {
      console.log("ss", response);
      // table.replaceData(response.data.data); // Mengganti data di tabel dengan data baru
      // table.redraw(true);
      return {
        data: response.data.data,
        last_page: response.data.total_page
      };
    }
  });  
});
