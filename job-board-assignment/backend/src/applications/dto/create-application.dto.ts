import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(4000)
  resumeText: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(4000)
  coverLetter: string;
}


