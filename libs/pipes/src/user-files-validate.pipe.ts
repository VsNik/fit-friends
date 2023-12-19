/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ExpressFile } from '@fit-friends/libs/types';
import { IMAGE_TYPES, CERTIFICATE_TYPE, MAX_AVATAR_SIZE, CertificateError, OtherError, AVATAR_SIZE_ERROR } from '@fit-friends/libs/validation';

interface IUserFiles {
  avatar?: ExpressFile;
  certificate: ExpressFile;
}

@Injectable()
export class UserFilesValidatePipe implements PipeTransform {
  constructor(private isUpdate: boolean = false) {}

  transform(files: IUserFiles, metadata: ArgumentMetadata) {
    const avatar = files?.avatar ? files.avatar[0] : null;
    const certificate = files?.certificate ? files.certificate[0] : null;

    if (avatar && avatar.size > MAX_AVATAR_SIZE) {
      throw new BadRequestException(AVATAR_SIZE_ERROR);
    }

    if (avatar && !IMAGE_TYPES.includes(avatar.mimetype)) {
      throw new BadRequestException(OtherError.AvatarType);
    }

    if (!this.isUpdate && !certificate) {
      throw new BadRequestException(CertificateError.Required);
    }

    if (certificate && certificate.mimetype !== CERTIFICATE_TYPE) {
      throw new BadRequestException(CertificateError.Type);
    }

    return { avatar, certificate };
  }
}
