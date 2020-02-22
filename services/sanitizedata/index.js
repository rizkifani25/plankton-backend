exports.sanitizeData = data => {
  let datas = {};
  Object.keys(data).map(key => {
    try {
      datas[key] = JSON.parse(data[key]);
    } catch (e) {
      datas[key] = data[key];
    }
  });
  return datas;
};
