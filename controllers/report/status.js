const statusList = [
  { code: 100, label: "Reported" },
  { code: 101, label: "On Validation" },
  { code: 102, label: "In Progress" },
  { code: 200, label: "Done" },
  { code: 400, label: "Rejected" },
  { code: 1000, label: "Others" }
];

exports.getStatus = (req, res) => {
  res.status(200).send({ data: statusList });
};

exports.findStatus = code => {
  let result = statusList.filter(item => item.code === code);
  if (result.length > 0) {
    return result[0];
  }
  return statusList[statusList.length - 1];
};
