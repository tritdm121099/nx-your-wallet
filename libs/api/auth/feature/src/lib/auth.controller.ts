import { Controller, Post, Body, Get } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  
  @Post("sign-up")
  signUp(@Body() userData: any) {
    // Logic for signing up a user
    return { message: "User signed up successfully", userData };
  }

  @Post("sign-in")
  signIn(@Body() credentials: any) {
    // Logic for signing in a user
    return { message: "User signed in successfully", credentials };
  }

  @Get("")
  refreshToken() {
    return true;
  }
}
