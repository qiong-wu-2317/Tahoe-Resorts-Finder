// utils/MediCalPlanSingleton.js
const mediCalPlanSingleton = (() => {
  const plan = {
    id: "medi-cal",
    insurer: "Medi-Cal",
    tier: "Special",
    base_premium: 0,
    discount: 0,
    finalPremium: 0,
    coverage_deductible: 0,
    hospital_coverage: "All Hospitals",
    special: true,
  };

  return {
    getPlan: () => plan,
  };
})();

export default mediCalPlanSingleton;
