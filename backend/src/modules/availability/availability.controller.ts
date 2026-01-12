import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
    @Query('trainerId') trainerId: string = 'default-trainer', // In production, get from auth token
  ) {
    return this.availabilityService.create(createAvailabilityDto, trainerId);
  }

  @Get(':date')
  async findByDate(@Param('date') date: string) {
    return this.availabilityService.findByDate(date);
  }

  @Get()
  async findAll(@Query('trainerId') trainerId?: string) {
    return this.availabilityService.findAll(trainerId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.availabilityService.remove(id);
  }
}

