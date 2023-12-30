import { roomsSchema } from "./rooms/schema";
import { waitlistSchema } from "./waitlist/schema";

export const trainingSchema = {
  waitlist: waitlistSchema,
  rooms: roomsSchema,
};
