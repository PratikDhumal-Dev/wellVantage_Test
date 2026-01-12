import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ExerciseDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  sets?: string;

  @IsString()
  @IsOptional()
  reps?: string;
}

export class WorkoutDayDto {
  @IsNumber()
  @Min(1)
  dayNumber: number;

  @IsString()
  muscleGroup: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  exercises: ExerciseDto[];
}

export class CreateWorkoutPlanDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutDayDto)
  days: WorkoutDayDto[];

  @IsString()
  @IsOptional()
  notes?: string;
}

