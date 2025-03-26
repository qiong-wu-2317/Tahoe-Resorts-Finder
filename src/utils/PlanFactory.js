// utils/PlanFactory.js
import { premiumCalculator } from "./premiumCalculator";

function createCalculatedPlan(plan, userIncome, userAge) {
  const { basePremium, discount, finalPremium, originalPremium } =
    premiumCalculator({
      plan,
      userIncome,
      userAge,
    });

  return {
    ...plan,
    originalPremium,
    basePremium,
    discount,
    finalPremium,
  };
}
export { createCalculatedPlan };
