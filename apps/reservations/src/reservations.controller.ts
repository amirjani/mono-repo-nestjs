import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationDocument } from './models/reservation.schema';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll(): Promise<ReservationDocument[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') _id: string): Promise<ReservationDocument> {
    return this.reservationsService.findOne(_id);
  }

  @Patch(':id')
  update(
    @Param('id') _id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.update(_id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string): Promise<ReservationDocument> {
    return this.reservationsService.remove(_id);
  }
}
