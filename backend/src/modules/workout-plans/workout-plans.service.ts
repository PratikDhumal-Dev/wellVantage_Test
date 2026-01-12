import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkoutPlan, WorkoutPlanDocument } from '../../common/entities/workout-plan.entity';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';

@Injectable()
export class WorkoutPlansService {
  constructor(
    @InjectModel(WorkoutPlan.name)
    private workoutPlanModel: Model<WorkoutPlanDocument>,
  ) {}

  async create(trainerId: string, createDto: CreateWorkoutPlanDto): Promise<WorkoutPlan> {
    const workoutPlan = new this.workoutPlanModel({
      ...createDto,
      trainerId,
    });
    return workoutPlan.save();
  }

  async findAll(trainerId?: string): Promise<WorkoutPlan[]> {
    const query = trainerId ? { trainerId } : {};
    return this.workoutPlanModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<WorkoutPlan | null> {
    return this.workoutPlanModel.findById(id).exec();
  }

  async update(id: string, updateDto: Partial<CreateWorkoutPlanDto>): Promise<WorkoutPlan | null> {
    return this.workoutPlanModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.workoutPlanModel.findByIdAndDelete(id).exec();
  }
}

