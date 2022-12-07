const { csv, select, scaleLinear, extent, axisLeft, axisBottom } = d3;

const csvUrl = [
  'visual/ppcc1.csv', // File name
].join('');

// console.log(csvUrl);
const parseRow = (d) => {
  d.pc1 = +d.pc1;
  d.pc2 = +d.pc2;
  return d;
};
const xValue = (d) => d.pc1;
const yValue = (d) => d.pc2;
const speciesValue = (d) => d.labels;

const margin = {
  top: 20,
  right: 40,
  bottom: 50,
  left: 50,
};
const radius = 4;

const width = window.innerWidth / 2;
const height = window.innerHeight / 2;
const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const main = async () => {
  const data = await csv(csvUrl, parseRow);

  const x = scaleLinear()
    .domain(extent(data, xValue))
    .range([margin.left, width - margin.right]);

  const y = scaleLinear()
    .domain(extent(data, yValue))
    .range([height - margin.bottom, margin.top]);

  const marker = (d) => {
    switch (d) {
      case '0':
        return 'blue';
      case '1':
        return 'red';
      case '2':
        return 'black';
      case '3':
        return 'green';
      case '4':
        return 'yellow';
      case '5':
        return 'orange';
    }
  };

  const marks = data.map((d) => ({
    x: x(xValue(d)),
    y: y(yValue(d)),
    species: speciesValue(d),
    color: marker(speciesValue(d)),
    p_x: xValue(d), // inverted?
    p_y: yValue(d),
  }));

  // How I can easily change shapes according to data?? (best way)
  /// ?????
  svg
    .selectAll('circle')
    .data(marks)
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('fill', (d) => d.color)
    .attr('r', radius)
    .append('title')
    .text((d) => `x:${d.p_x};\ny: ${d.p_y};\nlabels:${d.labels};`);

  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(axisLeft(y));

  svg
    .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(axisBottom(x));
};
main();
