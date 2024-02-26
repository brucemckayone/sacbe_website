import { RoomOptionType } from "@/app/(customer)/facilitator-training/bookingSelection";
import collectionHelper from "@/utils/firebase/collectionHelper";
import adminInit from "../firebase/admin_init";
import stripe from "../stripe/init/stripe";

export async function handleRoomPurchase(
  roomType: string,
  duration?: number,
  subscriptionId?: string
) {
  console.log("handling room purchase", roomType, duration, subscriptionId);
  if (duration && subscriptionId) {
    // Calculate the timestamp 7 months from now
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + duration);
    const cancelAtTimestamp = Math.floor(currentDate.getTime() / 1000);

    // Update the subscription to cancel at the calculated timestamp
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at: cancelAtTimestamp,
    });
  }

  const helper = new collectionHelper(
    adminInit().firestore().collection("FacilitatorTraining")
  );
  const doc = await helper.getDoc(roomType);
  const stock = doc.data!.stock;
  if (stock > 0) await helper.updateDoc(roomType, { stock: stock - 1 });
}

export async function fetchRoomStock() {
  const helper = new collectionHelper(
    adminInit().firestore().collection("FacilitatorTraining")
  );
  const docs = await helper.getAllDocs();

  const rooms: (RoomOptionType | undefined)[] = docs.data!.map((doc) => {
    return {
      id: doc.id,
      name: doc.name,
      price: doc.price,
      isAvailable: doc.stock > 0,
      stock: doc.stock,
      uuid: doc.uuid,
      deposit: doc.deposit,
      features: doc.features,
      test_id: doc.test_id,
    } as RoomOptionType;
  });
  return rooms;
}
