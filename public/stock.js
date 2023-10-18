var ctx = document.getElementById('myChart').getContext('2d');
var chart; // Deklarasi variabel chart

// Fungsi untuk memanggil API dan memperbarui chart
function updateChart(url) {
    $.ajax({
        url: url,
        dataType: 'json',
        success: function(response) {
            var timeSeries = response["Time Series (Digital Currency Daily)"];

            const labels = [];
            const dataNumbers = [];

            // Melakukan mapping pada setiap entri dalam objek
            for (var date in timeSeries) {
                // Mengkonversi tanggal menjadi format bulan dan tahun dengan day.js
                var formattedDate = dayjs(date, "YYYY-MM-DD").format("YYYY-MM-DD");

                // Mengkonversi nilai close menjadi number
                var closeNumber = Number(timeSeries[date]["4b. close (USD)"]);

                // Menambahkan formattedDate dan closeNumber ke array labels dan dataNumbers
                labels.push(formattedDate);
                dataNumbers.push(closeNumber);
            }

            const data = {
              labels: labels,
              datasets: [{
                data: dataNumbers,
                fill: false,
                borderColor: 'rgb(22, 163, 74)',
                tension: 0.1
              }]
            };

            // Jika chart sudah ada, hancurkan dulu sebelum membuat yang baru
            if (chart) {
                chart.destroy();
            }

            chart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    });
}

// Event listener untuk elemen select
document.getElementById('cryptocurrentcies').addEventListener('change', function() {
    var selectedOption = this.value;

    if (selectedOption === 'btc') {
        updateChart('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=IDR&apikey=EVCEA44X2N5Y1PRV');
    } else if (selectedOption === 'doge') {
        updateChart('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=DOGE&market=USD&apikey=EVCEA44X2N5Y1PRV');
    } else if (selectedOption === 'eth') {
        updateChart('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=ETC&market=USD&apikey=EVCEA44X2N5Y1PRV');
    }
});

// Memanggil fungsi updateChart dengan URL API untuk BTC saat halaman dimuat
updateChart('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=IDR&apikey=EVCEA44X2N5Y1PRV');
