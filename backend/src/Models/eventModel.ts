import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  location: string|string;
  date: Date|string;
  region: string;
  userId:any
  chapter: string;
  attendees: mongoose.Types.Array<Schema.Types.ObjectId>;
  createdAt: Date|string;
  updatedAt: Date|string;
} 

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  region: { type: String, required: true },
  chapter: { type: String, required: true },
  userId:{type:mongoose.Types.ObjectId,ref:'User'},
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;
