export default class progressCharts {
  constructor() {

  }
  facilitySurvey() {

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
    let endPercent = self.facSurveyCount / 1200;
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

    // filter.append('feGaussianBlur')
    //   .attr('in', 'SourceGraphic')
    //   .attr('stdDeviation', '7');

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
  }
}
