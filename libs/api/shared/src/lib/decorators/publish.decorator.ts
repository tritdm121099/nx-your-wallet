import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'yw:publish';
export const Publish = () => SetMetadata(IS_PUBLIC_KEY, true);