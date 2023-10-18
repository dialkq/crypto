$(document).ready(function () {
    const rawToken = localStorage.getItem("webDataLogin");
    const data = JSON.parse(rawToken);

    $('#industrySelect').select2({
        ajax: {
            url: 'https://vietexpert-api.d.logique.co.id/api/admin/industry',
            method: 'GET',
            dataType: 'json',
            delay: 250,
            headers: {
                'Authorization': `Bearer ${data.token}`
            },
            data: function (params) {
                return {
                    lt: 10, // Limit
                    of: 0,  // Offset
                    sb: 'id', // Sort by
                    ob: 'ASC', // Order by
                    q: params.term // Search term
                };
            },
            processResults: function (data) {
                return {
                    results: data.data.data.map(item => {
                        return { id: item.id, text: item.name };
                    })
                };
            },
            cache: true
        },
        
    });
});
