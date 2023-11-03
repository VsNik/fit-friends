import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SuccessRdo {
  @ApiProperty({
    description: 'Удачно / не удачно',
    example: true,
  })
  @Expose()
  success: boolean;
}
