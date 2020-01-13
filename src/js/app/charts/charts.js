google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart(teste) {
      console.log('teste :', teste);
      var data = google.visualization.arrayToDataTable([
        ['Degree', 'Students'],
        ['Ensino Fundamental',11],
        ['1° ano do ensino médio', 2],
        ['2° ano ensino médio',  2],
        ['3° ano do ensino médio', 2],
        ['Cursinho',    7]
      ]);

    //   $scope.x =   [
    //     {c: [
    //         {v: "Mushrooms"},
    //         {v: 3},
    //     ]},

    //     {c: [
    //         {v: "Olives"},
    //         {v: 31}
    //     ]},

    //     {c: [
    //         {v: "Zucchini"},
    //         {v: 1},
    //     ]},

    //     {c: [
    //         {v: "Pepperoni"},
    //         {v: 2},
    //     ]}
    // ];

      var options = {
        title: 'My Daily Activities',
        is3D: true,
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
      chart.draw(data, options);
    }