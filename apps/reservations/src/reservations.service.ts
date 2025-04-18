import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument } from './models/reservation.schema';
import { UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENTS_SERVICE } from '@app/common';
import { map, firstValueFrom } from 'rxjs';

interface PaymentResponse {
  id: string;
}

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(user: UserDto, createReservationDto: CreateReservationDto) {
    return await firstValueFrom(
      this.paymentsService
        .send<PaymentResponse>('create_charge', {
          ...createReservationDto.charge,
          email: user.email,
        })
        .pipe(
          map(async (response) => {
            return await this.reservationsRepository.create({
              ...createReservationDto,
              timestamp: new Date(),
              userId: user._id,
              invoiceId: response.id,
            });
          }),
        ),
    );
  }

  async findAll(): Promise<ReservationDocument[]> {
    return this.reservationsRepository.find({});
  }

  async findOne(_id: string): Promise<ReservationDocument> {
    return this.reservationsRepository.findOne({ _id });
  }

  async update(
    _id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string): Promise<ReservationDocument> {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
