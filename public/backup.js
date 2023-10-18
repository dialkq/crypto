const rawToken = localStorage.getItem("webDataLogin");
const data = JSON.parse(rawToken);

const grid = new gridjs.Grid({
    columns: ["ID", "Membership Type", "Company Name", "Registration Date"],
    server: {
        url: 'https://vietexpert-api.d.logique.co.id/api/admin/corporate',
        method: 'GET',
        // then: data => data.data.data.map(record => [record.id, record.membership_type, record.company_name, record.registration_date]),
        then: data => {console.log("TAMPILKAN DATA", data)},
        headers: {
            'Authorization': `Bearer ${data.token}`
        },
        // body: data => {
        //     return {
        //         // search: document.getElementById('searchInput').value,
        //         lt: data.data.limit,
        //         of: data.data.total_page,
        //         sb: 'id',
        //         ob: 'ASC'
        //     }
        // },
        // total: data => data.data.total,
    },
    search: {
        enabled: false,
    },
    pagination: {
        enabled: true,
        limit: 10
    },
}).render(document.getElementById("corporate-table"));

// document.getElementById('searchInput').addEventListener('keyup', function () {
//     grid.forceRender();
// });
