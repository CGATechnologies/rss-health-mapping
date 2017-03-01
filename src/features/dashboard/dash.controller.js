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

        //build progress charts
        const colors = {
          'pink': '#E1499A',
          'yellow': '#f0ff08',
          'green': '#47e495'
        };

        const radius = 50;
        const border = 5;
        const padding = 15;
        const startPercent = 0;
        const endPercent = self.facSurveyCount / 1200;
        const twoPi = Math.PI * 2;
        const formatPercent = d3.format('.0%');
        const boxSize = (radius + padding) * 2;

        let count = Math.abs((endPercent - startPercent) / 0.01);
        let step = endPercent < startPercent ? -0.01 : 0.01;

        const arc = d3.svg.arc()
          .startAngle(0)
          .innerRadius(radius)
          .outerRadius(radius - border);

        const parent = d3.select('div#fac-survey-progress');

        const svg = parent.append('svg')
          .attr('width', boxSize)
          .attr('height', boxSize);

        const defs = svg.append('defs');

        const filter = defs.append('filter')
          .attr('id', 'blur');

        filter.append('feGaussianBlur')
          .attr('in', 'SourceGraphic')
          .attr('stdDeviation', '7');

        const g = svg.append('g')
          .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

        const meter = g.append('g')
          .attr('class', 'progress-meter');

        meter.append('path')
          .attr('class', 'background')
          .attr('fill', '#ccc')
          .attr('fill-opacity', 0.5)
          .attr('d', arc.endAngle(twoPi));

        const foreground = meter.append('path')
          .attr('class', 'foreground')
          .attr('fill', colors.green)
          .attr('fill-opacity', 1)
          .attr('stroke', colors.green)
          .attr('stroke-width', 5)
          .attr('stroke-opacity', 1)
          .attr('filter', 'url(#blur)');

        const front = meter.append('path')
          .attr('class', 'foreground')
          .attr('fill', colors.green)
          .attr('fill-opacity', 1);

        const numberText = meter.append('text')
          .attr('fill', '#000000')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em');

        function updateProgress(progress) {
          foreground.attr('d', arc.endAngle(twoPi * progress));
          front.attr('d', arc.endAngle(twoPi * progress));
          numberText.text(formatPercent(progress));
        }

        let progress = startPercent;

        (function loops() {
          updateProgress(progress);

          if (count > 0) {
            count--;
            progress += step;
            setTimeout(loops, 10);
          }
        })();

      });
  }
}

DashboardController.$inject = [ 'dataSources', 'ona' ];