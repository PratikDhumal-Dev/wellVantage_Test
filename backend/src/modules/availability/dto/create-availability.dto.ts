import { IsString, IsBoolean, IsOptional, IsArray, IsDateString } from 'class-validator';

export class CreateAvailabilityDto {
  @IsDateString()
  date: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  sessionName: string;

  @IsBoolean()
  isRecurring: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  recurringDates?: string[];
}

