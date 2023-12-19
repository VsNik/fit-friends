/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExpressFile } from '@fit-friends/libs/types';
import { IMAGE_TYPES, MAX_AVATAR_SIZE, OtherError, AVATAR_SIZE_ERROR } from '@fit-friends/libs/validation';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AvatarValidatePipe implements PipeTransform {
  transform(avatar: ExpressFile, metadata: ArgumentMetadata) {
    if (avatar && avatar.size > MAX_AVATAR_SIZE) {
      throw new BadRequestException(AVATAR_SIZE_ERROR);
    }

    if (avatar && !IMAGE_TYPES.includes(avatar.mimetype)) {
      throw new BadRequestException(OtherError.AvatarType);
    }

    return avatar;
  }
}
