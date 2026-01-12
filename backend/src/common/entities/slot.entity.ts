import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SlotDocument = Slot & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Slot {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Availability' })
  availabilityId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  startTime: string;

  @Prop({ type: String, required: true })
  endTime: string;

  @Prop({ type: String, default: null })
  clientId: string | null;

  @Prop({
    type: String,
    enum: ['open', 'booked'],
    default: 'open',
  })
  status: 'open' | 'booked';

  createdAt?: Date;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
