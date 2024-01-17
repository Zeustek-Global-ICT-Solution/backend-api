import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
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
