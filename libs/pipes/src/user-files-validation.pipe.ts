/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ExpressFile } from '@fit-friends/libs/types';

const MIME_TYPES = ["image/jpeg", "image/png"];
const MAX_AVATAR_SIZE = 1024 * 1024;

interface IUserFiles {
  avatar?: ExpressFile;
  bgImage: ExpressFile;
}

@Injectable()
export class UserFilesValidationPipe implements PipeTransform {
  constructor(private isUpdate: boolean = false) {}

  transform(files: IUserFiles, metadata: ArgumentMetadata) {
    const avatar = files.avatar ? files.avatar[0] : null;
    const bgImage = files.bgImage ? files.bgImage[0] : null;

    if (!this.isUpdate && !bgImage) {
      throw new BadRequestException('Background image is required');
    }

    if (avatar && avatar.size > MAX_AVATAR_SIZE) {
      throw new BadRequestException(`Max avatar size ${MAX_AVATAR_SIZE}`);
    }

    return { avatar, bgImage };
  }
}
