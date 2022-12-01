function randomData(groups, points) {
  var data = [];
  for (i = 0; i < groups; i++) {
    data.push({});
  }

  for (j = 0; j < points; j++) {
    data[i].values.push({});
  }

  return data;
}
