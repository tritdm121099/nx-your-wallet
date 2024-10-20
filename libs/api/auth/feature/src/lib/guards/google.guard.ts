import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EStrategies } from "@yw/api/auth/data-access";

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(EStrategies.GOOGLE) {}