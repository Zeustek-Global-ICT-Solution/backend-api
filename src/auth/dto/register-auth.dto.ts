import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'field is required' })
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'password Type is required' })
  @MinLength(8, {
    message: 'Password is too short',
  })
  password: string;
}
