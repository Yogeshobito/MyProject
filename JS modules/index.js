$(document).ready(function () {
    var chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Data from selected CSV file'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Values'
            }
        },
        series: []
    };

    $('#fileInput').change(function () {
        var input = this;
        var reader = new FileReader();
        reader.onload = function () {
            var data = reader.result;
            var lines = data.split('\n');
            var series = { data: [] };
            $.each(lines, function (lineNo, line) {
                var items = line.split(',');
                if (lineNo === 0) {
                    series.name = items[1];
                } else {
                    series.data.push([items[0], parseFloat(items[1])]);
                }
            });
            chartOptions.series = [];
            chartOptions.series.push(series);
            var chart = new Highcharts.Chart('container', chartOptions);
        };
        reader.readAsText(input.files[0]);
    });
});

function readCSVFile() {
    var files = document.querySelector('#file').files;

    if (files.length > 0) {
        var file = files[0];

        var reader = new FileReader();

        
        reader.readAsText(file);
        reader.onload = function (event) {
            var csvdata = event.target.result;
            var rowData = csvdata.split('\n');
            var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];
            tbodyEl.innerHTML = "";
            for (var row = 1; row < rowData.length; row++) {
                var newRow = tbodyEl.insertRow();
                rowColData = rowData[row].split(',');
                for (var col = 0; col < rowColData.length; col++) {
                    var newCell = newRow.insertCell();
                    newCell.innerHTML = rowColData[col];

                }

            }
        };

    } else {
        alert("Please select a file.");
    }

}
































