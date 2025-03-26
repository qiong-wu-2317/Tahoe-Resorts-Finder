import { db } from "../../db/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const updateInsurancePlan = async (updatedPlan) => {
  try {
    const planRef = doc(db, "insurance_corp", updatedPlan.id);
    const formattedPlan = {
      ...updatedPlan,
      base_premium: Number(updatedPlan.base_premium) || 0,
      coverage_deductible: Number(updatedPlan.coverage_deductible) || 0,
    };
    await updateDoc(planRef, formattedPlan);
    return { success: true, message: "Insurance plan updated successfully" };
  } catch (error) {
    console.error("Error updating insurance plan:", error);
    return { success: false, message: error.message };
  }
};

export default updateInsurancePlan;
