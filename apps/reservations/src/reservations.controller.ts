import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationDocument } from './models/reservation.schema';
import { JwtAuthGuard, CurrentUser, UserDto } from '@app/common';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(
    @CurrentUser() user: UserDto,
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.create(user, createReservationDto);
  }

  @Get()
  async findAll(): Promise<ReservationDocument[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') _id: string): Promise<ReservationDocument> {
    return this.reservationsService.findOne(_id);
  }

  @Patch(':id')
  async update(
    @Param('id') _id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.update(_id, updateReservationDto);
  }

  @Delete(':id')
  async remove(@Param('id') _id: string): Promise<ReservationDocument> {
    return this.reservationsService.remove(_id);
  }
}
