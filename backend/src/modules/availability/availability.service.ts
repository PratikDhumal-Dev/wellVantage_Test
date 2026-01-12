import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Availability, AvailabilityDocument } from '../../common/entities/availability.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Slot, SlotDocument } from '../../common/entities/slot.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectModel(Availability.name)
    private availabilityModel: Model<AvailabilityDocument>,
    @InjectModel(Slot.name)
    private slotModel: Model<SlotDocument>,
  ) {}

  async create(createAvailabilityDto: CreateAvailabilityDto, trainerId: string): Promise<Availability[]> {
    const { date, startTime, endTime, sessionName, isRecurring, recurringDates } = createAvailabilityDto;
    
    const datesToCreate = isRecurring && recurringDates && recurringDates.length > 0
      ? recurringDates
      : [date];

    const createdAvailabilities: Availability[] = [];

    for (const dateStr of datesToCreate) {
      const availability = new this.availabilityModel({
        trainerId,
        date: new Date(dateStr),
        startTime,
        endTime,
        sessionName,
        isRecurring,
        recurringDates: isRecurring ? recurringDates : [],
      });

      const savedAvailability = await availability.save();

      // Create a slot for this availability
      const slot = new this.slotModel({
        availabilityId: savedAvailability._id,
        date: new Date(dateStr),
        startTime,
        endTime,
        status: 'open',
      });

      await slot.save();
      const availabilityObj = savedAvailability.toObject();
      createdAvailabilities.push({
        ...availabilityObj,
        id: availabilityObj._id.toString(),
      } as any);
    }

    return createdAvailabilities;
  }

  async findByDate(date: string): Promise<Availability[]> {
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const results = await this.availabilityModel
      .find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .exec();
    
    return results.map((doc) => ({
      ...doc.toObject(),
      id: doc._id.toString(),
    })) as any;
  }

  async findAll(trainerId?: string): Promise<Availability[]> {
    const query = trainerId ? { trainerId } : {};
    const results = await this.availabilityModel
      .find(query)
      .sort({ date: 1, startTime: 1 })
      .exec();
    
    return results.map((doc) => ({
      ...doc.toObject(),
      id: doc._id.toString(),
    })) as any;
  }

  async remove(id: string): Promise<void> {
    // Also delete associated slots
    await this.slotModel.deleteMany({ availabilityId: id }).exec();
    await this.availabilityModel.findByIdAndDelete(id).exec();
  }
}
