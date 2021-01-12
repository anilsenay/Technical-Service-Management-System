var router = require("express").Router();

router.use("/api/cases", require("./case"));
router.use("/api/customers", require("./customer"));
router.use("/api/customerDevices", require("./customerDevice"));
router.use("/api/employees", require("./employee"));
router.use("/api/login", require("./login"));
router.use("/api/orders", require("./order"));
router.use("/api/parts", require("./part"));
router.use("/api/payments", require("./payment"));
router.use("/api/repairments", require("./repairment"));
router.use("/api/storage", require("./storage"));

// Views
router.use("/api/getSmartStats", require("./views/getSmartStats"));
router.use("/api/getTechnicianStats", require("./views/getTechnicianStats"));
router.use(
  "/api/getPendingRepairments",
  require("./views/getPendingRepairments")
);
router.use(
  "/api/getDetailedRepairments",
  require("./views/getDetailedRepairment")
);
router.use("/api/getDetailedOrders", require("./views/getDetailedOrder"));
router.use(
  "/api/employeesWithRepairmentCount",
  require("./views/employeesWithRepairmentCount")
);
router.use(
  "/api/getAvgDurationPerEmployee",
  require("./views/getAvgDurationPerEmployee")
);
router.use(
  "/api/getMostFrequentRepairedModel",
  require("./views/getMostFrequentRepairedModel")
);
router.use(
  "/api/numberOfChangedPartsDistinctModel",
  require("./views/numberOfChangedPartsDistinctModel")
);
router.use(
  "/api/sameDeviceRepairmentsMoreThanThree",
  require("./views/sameDeviceRepairmentsMoreThanThree")
);

module.exports = router;
