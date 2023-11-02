/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExpressFile } from "@fit-friends/libs/types";
import { AVATAR_SIZE_ERROR, AVATAR_TYPE_ERROR, IMAGE_TYPES, MAX_AVATAR_SIZE } from "@fit-friends/libs/validation";
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class AvatarValidatePipe  implements PipeTransform {

    transform(avatar: ExpressFile, metadata: ArgumentMetadata) {        
        if (avatar && avatar.size > MAX_AVATAR_SIZE) {
            throw new BadRequestException(AVATAR_SIZE_ERROR);
          }
      
          if (avatar && !IMAGE_TYPES.includes(avatar.mimetype)) {
            throw new BadRequestException(AVATAR_TYPE_ERROR);
          }

        return avatar;
    }
}