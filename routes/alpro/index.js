export const alproTypes = [
  { label: "ODP", icon: "", code: 101, descrisi: ["1", "2", "3"] }
];
export const alproDescription = [{}];

router.get("/:id", (res, req) => {
  const { param } = req.query;
  param.code = 1;
});
