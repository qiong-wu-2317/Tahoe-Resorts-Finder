import { db } from "../../db/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const fetchInsurancePlans = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "insurance_corp"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      base_premium: Number(doc.data().base_premium) || 0,
      coverage_deductible: Number(doc.data().coverage_deductible) || 0,
    }));
  } catch (error) {
    console.error("Error fetching insurance plans:", error);
    return { success: false, message: error.message };
  }
};

export default fetchInsurancePlans;
