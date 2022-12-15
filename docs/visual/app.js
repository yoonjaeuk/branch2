var w = 250,
  h = 250;
var graphData = [50, 30, 12, 5, 3];
var colorData = ['red', 'orange', 'yellow', 'blue', 'purple'];
var pie = d3.pie();
var arc = d3.arc().innerRadius(40).outerRadius(100);

var svg = d3
  .select('.one-graph')
  .append('svg')
  .attr('width', w)
  .attr('height', h)
  .attr('id', 'graphWrap');

var g = svg
  .selectAll('.pie')
  .data(pie(graphData))
  .enter()
  .append('g')
  .attr('class', 'pie')
  .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

// path 태그로 차트에 색을 넣기
g.append('path')
  // .attr("d", arc) // 미리 색을 칠해놓음
  .style('fill', function (d, i) {
    return colorData[i];
  }) // 애니메이션이 싫을경우 arc 를 활성화시키고 아래내용을 주석
  .transition()
  .duration(400)
  .delay(function (d, i) {
    // 그릴 원 그래프의 시간을 어긋나게 표시
    return i * 400;
  })
  .attrTween('d', function (d, i) {
    // 보간 처리
    var interpolate = d3.interpolate(
      { startAngle: d.startAngle, endAngle: d.startAngle }, // 각 부분의 시작 각도
      { startAngle: d.startAngle, endAngle: d.endAngle }, // 각 부분의 종료 각도
    );
    return function (t) {
      return arc(interpolate(t)); // 시간에 따라 처리
    };
  });

// text 태그로 배열 값 넣기
g.append('text')
  .attr('transform', function (d) {
    return 'translate(' + arc.centroid(d) + ')';
  })
  .attr('dy', '.35em')
  .style('text-anchor', 'middle')
  .text(function (d, i) {
    return graphData[i] + '%';
  });

// text 정 중앙에 텍스트 넣기
svg
  .append('text')
  .attr('class', 'total')
  .attr('transform', 'translate(' + (w / 2 - 35) + ', ' + (h / 2 + 5) + ')')
  .text('합계:' + d3.sum(graphData));
