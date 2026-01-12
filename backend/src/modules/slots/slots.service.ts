import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Slot, SlotDocument } from '../../common/entities/slot.entity';

@Injectable()
export class SlotsService {
  constructor(
    @InjectModel(Slot.name)
    private slotModel: Model<SlotDocument>,
  ) {}

  async findByDate(date: string): Promise<Slot[]> {
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const results = await this.slotModel
      .find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .sort({ startTime: 1 })
      .exec();
    
    return results.map((doc) => ({
      ...doc.toObject(),
      id: doc._id.toString(),
    })) as any;
  }

  async remove(id: string): Promise<void> {
    await this.slotModel.findByIdAndDelete(id).exec();
  }
}
