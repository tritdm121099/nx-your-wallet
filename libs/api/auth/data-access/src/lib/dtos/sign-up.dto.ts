import { IsNotEmpty, IsString } from "class-validator";
import { SignInDto } from "./sign-in.dto";
import { Transform } from "class-transformer";

export class SignUpDto extends SignInDto {
  @IsString()
  @IsNotEmpty()
  confirm!: string;

  @IsString()
  @Transform(({value}) => value.trim())
  @IsNotEmpty()
  name!: string;
}