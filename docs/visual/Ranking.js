var svg = d3.select('#renderer').append('svg');
//console.log(svg);

var d;

var L_weight_d = 10;
var L_weight_s = 10;
var L_weight_n = 10;
var L_weight_m = 10;
var L_weight_b = 10;
var L_weight_l = 10;

var group1 = svg.append('g');
var groupSparkLine1 = svg.append('g');

var color_r = '#cd2e6e'; //스파클 라인 색

function L_listen(c1, c2, c3, c4, c5) {
  group1.remove();
  group1 = svg.append('g');
  group1.attr('transform', 'translate(0,0)');
  groupSparkLine1.remove();
  groupSparkLine1 = svg.append('g');
  groupSparkLine1.attr('transform', 'translate(460,10)');

  L_weight_d = c1;
  L_weight_s = c2 - c1;
  L_weight_n = c3 - c2;
  L_weight_m = c4 - c3;
  L_weight_b = c5 - c4;
  L_weight_l = 30 - c5;

  rankSort(
    L_weight_d,
    L_weight_s,
    L_weight_n,
    L_weight_m,
    L_weight_b,
    L_weight_l,
  );
  rankOrigin = makeRank();
  update(
    d,
    group1,
    L_weight_d,
    L_weight_s,
    L_weight_n,
    L_weight_m,
    L_weight_b,
    L_weight_l,
  );
  drawCompareLine();
  drawSparkLine(
    groupSparkLine1,
    d,
    L_weight_d,
    L_weight_s,
    L_weight_n,
    L_weight_m,
    L_weight_b,
    L_weight_l,
    color_r,
  );
}
