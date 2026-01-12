import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvailabilityModule } from './modules/availability/availability.module';
import { SlotsModule } from './modules/slots/slots.module';
import { WorkoutPlansModule } from './modules/workout-plans/workout-plans.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        'mongodb://localhost:27017/wellvantage',
      {
        // Connection options
      },
    ),
    AvailabilityModule,
    SlotsModule,
    WorkoutPlansModule,
  ],
})
export class AppModule {}
