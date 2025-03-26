import { db } from "../../db/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

const deleteInsurancePlan = async (planId) => {
  try {
    await deleteDoc(doc(db, "insurance_corp", planId));
    return { success: true, message: "Insurance plan deleted successfully" };
  } catch (error) {
    console.error("Error deleting insurance plan:", error);
    return { success: false, message: error.message };
  }
};

export default deleteInsurancePlan;
