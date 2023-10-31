/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ExpressFile } from '@fit-friends/libs/types';

const IMAGE_TYPES = ["image/jpeg", "image/png"];
const CERTIFICATE_EXT = 'application/pdf';
const MAX_AVATAR_SIZE = 1024 * 1024;

const CERTIFICATE_REQUIRED_ERROR = 'Certificate file is required.';
const CERTIFICATE_TYPE_ERROR = 'Certificate must be a document with "pdf" format.'
const AVATAR_TYPE_ERROR = 'Avatar must be a file with extension: "jpg / png."';
const AVATAR_SIZE_ERROR =`Max avatar size ${MAX_AVATAR_SIZE}.`;

interface IUserFiles {
  avatar?: ExpressFile;
  certificate: ExpressFile;
}

@Injectable()
export class UserFilesValidationPipe implements PipeTransform {
  constructor(private isUpdate: boolean = false) {}

  transform(files: IUserFiles, metadata: ArgumentMetadata) {
    const avatar = files.avatar ? files.avatar[0] : null;
    const certificate = files.certificate ? files.certificate[0] : null;

    if (!this.isUpdate && !certificate) {
      throw new BadRequestException(CERTIFICATE_REQUIRED_ERROR);
    }

    if (avatar && avatar.size > MAX_AVATAR_SIZE) {
      throw new BadRequestException(AVATAR_SIZE_ERROR);
    }

    if (avatar && !IMAGE_TYPES.includes(avatar.mimetype)) {
      throw new BadRequestException(AVATAR_TYPE_ERROR);
    }

    if (certificate && certificate.mimetype !== CERTIFICATE_EXT) {
      throw new BadRequestException(CERTIFICATE_TYPE_ERROR);
    }

    return {avatar, certificate}
  }
}
