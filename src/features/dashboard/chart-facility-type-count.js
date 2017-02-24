export default {
  facilityTypeCount: {
    options: {
      chart: {
        type: 'discreteBarChart',
        height: 250,
        margin: {
          top: 10,
          right: 30,
          bottom: 120,
          left: 50
        },
        color: [ '#FF6021', '#FFA021', '#1F6AA4', '#17AF6E' ],
        x: function (d) { return d.key; },
        y: function (d) { return d.value; },
        showValues: true,
        valueFormat: function (d) {
          return d3.format('d')(d);
        },
        transitionDuration: 100,
        xAxis: {
          axisLabel: 'X Axis',
          rotateLabels: -45
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: 30
        },
        // tooltip: {
        //   contentGenerator: function (e) {
        //     const series = e.series[ 0 ];
        //     if (series.value === null) return;
        //     const rows = `
        //     <tr>
        //       <td class="key">Number of facilities: </td>
        //       <td class="value">${e.value}</td>
        //     </tr>
        //     `;
        //     const header = `
        //       <thead>
        //         <tr>
        //           <td className="legend-color-guide">
        //             <div style="background-color: ${series.color};"></div>
        //           </td>
        //           <td>
        //             <strong>${e.key}</strong>
        //           </td>
        //         </tr>
        //       </thead>
        //     `;
        //     return `
        //     <table>
        //       ${header}
        //       <tbody>
        //         ${rows}
        //       </tbody>
        //     </table>
        //     `;
        //   }
        // },

      }
    }
  }
};