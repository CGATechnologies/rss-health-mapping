import facilityTypeCount from './chart-facility-type-count';
import facProgress from './chart-progress';

export default class DashboardController {
  constructor(dataSources, ona) {

    const self = this;

    self.dataLoaded = false;

    self.resizeEvent = function (e) {
      window.resize(e);
    };

    dataSources.getAllHrisData()
      // Process data in the 'then' callback below
      .then(function (dataResponse) {
        self.response = dataResponse;

        // dataLoaded to show stuff on page
        self.dataLoaded = true;
        self.items = self.response.data;
        self.staffCount = self.items.map((fac) => parseInt(fac.StaffCount))
          .reduce((a, b) => a + b);
        self.facilityCount = self.items.length;

        // convert fTypeCode to name from code
        self.items.forEach(function (o) {
          if (o.fTypeCode === "11") {
            o.fTypeCode = "Teaching Hospital";
          } else if (o.fTypeCode === "12") {
            o.fTypeCode = "State Hospital";
          } else if (o.fTypeCode === "13") {
            o.fTypeCode = "County Hospital";
          } else if (o.fTypeCode === "14") {
            o.fTypeCode = "PHCC";
          } else if (o.fTypeCode === "15") {
            o.fTypeCode = "PHCU";
          } else if (o.fTypeCode === "16") {
            o.fTypeCode = "Private Clinic";
          } else if (o.fTypeCode === "17") {
            o.fTypeCode = "Specialised Hospital/Clinic";
          } else if (o.fTypeCode === "21") {
            o.fTypeCode = "Health Training Institution";
          } else if (o.fTypeCode === "31") {
            o.fTypeCode = "Ministry Building";
          } else if (o.fTypeCode === "91") {
            o.fTypeCode = "Ministry of Health";
          } else if (o.fTypeCode === "92") {
            o.fTypeCode = "State Ministry of Health";
          } else if (o.fTypeCode === "93") {
            o.fTypeCode = "County Health Department";
          } else if (o.fTypeCode === "94") {
            o.fTypeCode = "Payam Health Department";
          } else if (o.fTypeCode === "96") {
            o.fTypeCode = "Other";
          }
        });

        self.facType = self.items.map(o => o.fTypeCode);

        // parse strings to ints for staff and role counts
        self.items.forEach(function (o) {
          o.StaffCount = +o.StaffCount;
          o.RoleCount = +o.RoleCount;
        });

        self.hrisFacFilter = self.items.filter(function (d) {
          return d.StaffCount > 0;
        });
        self.hrisFacProportion = (self.hrisFacFilter.length / self.items.length);
        // console.log('yo', self.hrisFacProportion);



        // staff average by facility type
        self.staffAvgByFacilityType = d3.nest()
          .key(function (d) { return d.fTypeCode; })
          .sortKeys(d3.ascending)
          .rollup(function (v) {
            return (d3.mean(v, function (d)
            { return d.StaffCount; }));
          })
          .map(self.hrisFacFilter);

        // staff count by facility type
        self.staffCountByFacilityType = d3.nest()
          .key(function (d) { return d.fTypeCode; })
          .sortKeys(d3.ascending)
          .rollup(function (v) {
            return (d3.sum(v, function (d)
            { return d.StaffCount; }));
          })
          .map(self.hrisFacFilter);

        // console.log(self.staffCountByFacilityType);

        // count of facilities by type
        self.facTypeCount = self.facType.reduce((r, a) => {
          r[ a ] = (r[ a ] || 0) + 1;
          return r;
        }, {});
        self.facTypeChartData = d3.entries(self.facTypeCount);

        // Chart: Count of Facilities by Type
        self.chartFacTypeCountOptions = facilityTypeCount.facilityTypeCount.options;
        self.chartFacTypeCountData = [ {
          key: "Cumulative Return",
          values: self.facTypeChartData
        }];
        // console.log(self.facTypeChartData);
      });

    dataSources.getHrisRecentTimestamp()
      .then(function (hrisStamp) {
        self.hrisUpdate = Date.parse(hrisStamp.data);
        let updateDate = new Date(hrisStamp.data);
        let now = new Date();
        let oneDay = 1000 * 60 * 60 * 24;
        self.hrisDaysSinceUpdate = Math.ceil((now.getTime() - updateDate.getTime()) / oneDay);
      });

    // get ona metadata
    ona.getFacilitySurveyMetaData()
      .then(function (facSurvey) {

        self.facSurveyMetaData = facSurvey.data;
        // get number of submissions from each survey
        self.facSurveyCount = self.facSurveyMetaData.filter(k => k.formid === "179398")[ 0 ].submissions;
        self.chdSurveyCount = self.facSurveyMetaData.filter(k => k.formid === "179432")[ 0 ].submissions;
        self.donorSurveyCount = self.facSurveyMetaData.filter(k => k.formid === "157221")[ 0 ].submissions;
        self.ngoSurveyCount = self.facSurveyMetaData.filter(k => k.formid === "183415")[ 0 ].submissions;

        // facProgress.facProgress();

        //Facility Survey Progress Chart
        const colors = {
          'green': '#A5FFD6',
          'orange': '#FF9F1C',
          'amber': '#E76F51',
          'blue': '#35A7FF'
        };

        const radius = 50;
        const border = 5;
        const padding = 15;
        const startPercent = 0;
        let endFacPercent = self.facSurveyCount / 1200;
        let endCHDPercent = self.chdSurveyCount / 138;
        let endNGOPercent = self.ngoSurveyCount / 100;
        let endDonorPercent = self.donorSurveyCount / 15;
        const twoPi = Math.PI * 2;
        const formatPercent = d3.format('.0%');
        const boxSize = (radius + padding) * 2;

        let countFac = Math.abs((endFacPercent - startPercent) / 0.01);
        let stepFac = endFacPercent < startPercent ? -0.01 : 0.01;
        let countNGO = Math.abs((endNGOPercent - startPercent) / 0.01);
        let stepNGO = endNGOPercent < startPercent ? -0.01 : 0.01;
        let countCHD = Math.abs((endCHDPercent - startPercent) / 0.01);
        let stepCHD = endCHDPercent < startPercent ? -0.01 : 0.01;
        let countDonor = Math.abs((endDonorPercent - startPercent) / 0.01);
        let stepDonor = endDonorPercent < startPercent ? -0.01 : 0.01;

        const arc = d3.svg.arc()
          .startAngle(0)
          .innerRadius(radius)
          .outerRadius(radius - border);

        const parentFac = d3.select('div#fac-survey-progress');
        const parentNGO = d3.select('div#NGO-survey-progress');
        const parentCHD = d3.select('div#CHD-survey-progress');
        const parentDonor = d3.select('div#donor-survey-progress');

        const svgFac = parentFac.append('svg')
          .attr('width', boxSize)
          .attr('height', boxSize);
        const svgNGO = parentNGO.append('svg')
          .attr('width', boxSize)
          .attr('height', boxSize);
        const svgCHD = parentCHD.append('svg')
          .attr('width', boxSize)
          .attr('height', boxSize);
        const svgDonor = parentDonor.append('svg')
          .attr('width', boxSize)
          .attr('height', boxSize);

        const defsFac = svgFac.append('defs');
        const defsCHD = svgCHD.append('defs');
        const defsNGO = svgNGO.append('defs');
        const defsDonor = svgDonor.append('defs');

        const filterFac = defsFac.append('filter')
          .attr('id', 'blur');
        const filterCHD = defsCHD.append('filter')
          .attr('id', 'blur');
        const filterNGO = defsNGO.append('filter')
          .attr('id', 'blur');
        const filterDonor = defsDonor.append('filter')
          .attr('id', 'blur');

        filterFac.append('feGaussianBlur')
          .attr('in', 'SourceGraphic')
          .attr('stdDeviation', '7');
        filterDonor.append('feGaussianBlur')
          .attr('in', 'SourceGraphic')
          .attr('stdDeviation', '7');
        filterCHD.append('feGaussianBlur')
          .attr('in', 'SourceGraphic')
          .attr('stdDeviation', '7');
        filterNGO.append('feGaussianBlur')
          .attr('in', 'SourceGraphic')
          .attr('stdDeviation', '7');

        const gFac = svgFac.append('g')
          .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');
        const gNGO = svgNGO.append('g')
          .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');
        const gCHD = svgCHD.append('g')
          .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');
        const gDonor = svgDonor.append('g')
          .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

        const meterFac = gFac.append('g')
          .attr('class', 'progress-meter');
        const meterNGO = gNGO.append('g')
          .attr('class', 'progress-meter');
        const meterCHD = gCHD.append('g')
          .attr('class', 'progress-meter');
        const meterDonor = gDonor.append('g')
          .attr('class', 'progress-meter');

        meterFac.append('path')
          .attr('class', 'background')
          .attr('fill', '#ccc')
          .attr('fill-opacity', 0.5)
          .attr('d', arc.endAngle(twoPi));
        meterNGO.append('path')
          .attr('class', 'background')
          .attr('fill', '#ccc')
          .attr('fill-opacity', 0.5)
          .attr('d', arc.endAngle(twoPi));
        meterCHD.append('path')
          .attr('class', 'background')
          .attr('fill', '#ccc')
          .attr('fill-opacity', 0.5)
          .attr('d', arc.endAngle(twoPi));
        meterDonor.append('path')
          .attr('class', 'background')
          .attr('fill', '#ccc')
          .attr('fill-opacity', 0.5)
          .attr('d', arc.endAngle(twoPi));

        const foregroundFac = meterFac.append('path')
          .attr('class', 'foreground')
          .attr('fill', colors.green)
          .attr('fill-opacity', 1)
          .attr('stroke', colors.green)
          .attr('stroke-width', 5)
          .attr('stroke-opacity', 1)
          .attr('filter', 'url(#blur)');
        const foregroundCHD = meterCHD.append('path')
          .attr('class', 'foreground')
          .attr('fill', colors.orange)
          .attr('fill-opacity', 1)
          .attr('stroke', colors.orange)
          .attr('stroke-width', 5)
          .attr('stroke-opacity', 1)
          .attr('filter', 'url(#blur)');
        const foregroundNGO = meterNGO.append('path')
          .attr('class', 'foreground')
          .attr('fill', colors.amber)
          .attr('fill-opacity', 1)
          .attr('stroke', colors.amber)
          .attr('stroke-width', 5)
          .attr('stroke-opacity', 1)
          .attr('filter', 'url(#blur)');
        const foregroundDonor = meterDonor.append('path')
          .attr('class', 'foreground')
          .attr('fill', colors.blue)
          .attr('fill-opacity', 1)
          .attr('stroke', colors.blue)
          .attr('stroke-width', 5)
          .attr('stroke-opacity', 1)
          .attr('filter', 'url(#blur)');

        const frontFac = meterFac.append('path')
          .attr('class', 'foreground')
          .attr('fill', colors.green)
          .attr('fill-opacity', 1);
        const frontCHD = meterCHD.append('path')
          .attr('class', 'foreground')
          .attr('fill', colors.orange)
          .attr('fill-opacity', 1);
        const frontNGO = meterNGO.append('path')
          .attr('class', 'foreground')
          .attr('fill', colors.amber)
          .attr('fill-opacity', 1);
        const frontDonor = meterDonor.append('path')
          .attr('class', 'foreground')
          .attr('fill', colors.blue)
          .attr('fill-opacity', 1);


        const numberTextFac = meterFac.append('text')
          .attr('fill', '#000000')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em');
        const numberTextCHD = meterCHD.append('text')
          .attr('fill', '#000000')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em');
        const numberTextNGO = meterNGO.append('text')
          .attr('fill', '#000000')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em');
        const numberTextDonor = meterDonor.append('text')
          .attr('fill', '#000000')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em');

        function updateProgress(progress) {
          foregroundFac.attr('d', arc.endAngle(twoPi * progress));
          frontFac.attr('d', arc.endAngle(twoPi * progress));
          numberTextFac.text(formatPercent(progress));
          foregroundCHD.attr('d', arc.endAngle(twoPi * progress));
          frontCHD.attr('d', arc.endAngle(twoPi * progress));
          numberTextCHD.text(formatPercent(progress));
          foregroundNGO.attr('d', arc.endAngle(twoPi * progress));
          frontNGO.attr('d', arc.endAngle(twoPi * progress));
          numberTextNGO.text(formatPercent(progress));
          foregroundDonor.attr('d', arc.endAngle(twoPi * progress));
          frontDonor.attr('d', arc.endAngle(twoPi * progress));
          numberTextDonor.text(formatPercent(progress));
        }

        let progress = startPercent;

        (function loops() {
          updateProgress(progress);

          if (countFac > 0) {
            countFac--;
            progress += stepFac;
            setTimeout(loops, 10);
          }
          if (countCHD > 0) {
            countCHD--;
            progress += stepCHD;
            setTimeout(loops, 10);
          }
          if (countNGO > 0) {
            countNGO--;
            progress += stepNGO;
            setTimeout(loops, 10);
          }
          if (countDonor > 0) {
            countDonor--;
            progress += stepDonor;
            setTimeout(loops, 10);
          }
        })();

      });
  }
}

DashboardController.$inject = [ 'dataSources', 'ona' ];