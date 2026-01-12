import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AvailabilityDocument = Availability & Document;

@Schema({ timestamps: true })
export class Availability {
  @Prop({ type: Types.ObjectId, required: true })
  trainerId: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  startTime: string;

  @Prop({ type: String, required: true })
  endTime: string;

  @Prop({ type: String, required: true })
  sessionName: string;

  @Prop({ type: Boolean, default: false })
  isRecurring: boolean;

  @Prop({ type: [String], default: [] })
  recurringDates: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
