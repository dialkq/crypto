const rawToken = localStorage.getItem("webDataLogin");
const data = JSON.parse(rawToken);

const grid = new gridjs.Grid({
    columns: ["ID", "Membership Type", "Company Name", "Registration Date",
        {
            name: "Action",
        }
    ],
    pagination: {
        limit: 10,
        server: {
            url: (prev, page, limit) => `${prev}?lt=${limit}&of=${page}&sb=id`
        }
    },

    server: {
        url: 'https://vietexpert-api.d.logique.co.id/api/admin/corporate',
        method: 'GET',
        then: data => data.data.data.map(result => [result.id, result.membership_type, result.company_name, result.registration_date,]),
        // then: data => {console.log("TAMPILKAN DATA", data)},
        headers: {
            'Authorization': `Bearer ${data.token}`
        },
        total: data => data.data.total,
    },
}).render(document.getElementById("corporate-table"));

document.getElementById('searchInput').addEventListener('keyup', function () {
    grid.forceRender();
});