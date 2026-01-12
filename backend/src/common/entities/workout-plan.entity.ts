import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WorkoutPlanDocument = WorkoutPlan & Document;

@Schema({ _id: false })
export class Exercise {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  sets: string;

  @Prop({ type: String, default: '' })
  reps: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);

@Schema({ _id: false })
export class WorkoutDay {
  @Prop({ type: Number, required: true })
  dayNumber: number;

  @Prop({ type: String, required: true })
  muscleGroup: string;

  @Prop({ type: [ExerciseSchema], default: [] })
  exercises: Exercise[];
}

export const WorkoutDaySchema = SchemaFactory.createForClass(WorkoutDay);

@Schema({ timestamps: true })
export class WorkoutPlan {
  @Prop({ type: Types.ObjectId, required: true })
  trainerId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  duration: number; // Number of days

  @Prop({ type: [WorkoutDaySchema], default: [] })
  days: WorkoutDay[];

  @Prop({ type: String, default: '' })
  notes: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const WorkoutPlanSchema = SchemaFactory.createForClass(WorkoutPlan);

