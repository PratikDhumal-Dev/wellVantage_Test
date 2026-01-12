import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WorkoutPlansService } from './workout-plans.service';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';

@Controller('workout-plans')
export class WorkoutPlansController {
  constructor(private readonly workoutPlansService: WorkoutPlansService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createDto: CreateWorkoutPlanDto) {
    // In a real app, get trainerId from auth token
    const trainerId = 'default-trainer-id'; // TODO: Get from auth
    return this.workoutPlansService.create(trainerId, createDto);
  }

  @Get()
  async findAll() {
    // In a real app, filter by trainerId from auth token
    return this.workoutPlansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.workoutPlansService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateDto: Partial<CreateWorkoutPlanDto>) {
    return this.workoutPlansService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.workoutPlansService.delete(id);
    return { message: 'Workout plan deleted successfully' };
  }
}

