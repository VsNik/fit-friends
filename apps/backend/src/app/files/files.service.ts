import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { path } from 'app-root-path';
import { extension } from 'mime-types';
import { ensureDir, writeFile, remove } from 'fs-extra';
import dayjs from 'dayjs';
import { randomUUID } from 'crypto';
import { ExpressFile, UploadType } from '@fit-friends/libs/types';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  async upload(file: ExpressFile, type = UploadType.Avatar): Promise<string> {
    if (!file) {
      return;
    }

    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const uploadDirectory = this.configService.get('UPLOAD_DIR');
    const subDirectory = `${type}/${year}/${month}`;

    const uuid = randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${uuid}.${fileExtension}`;

    const uploadDirectoryPath = `${path}/${uploadDirectory}/${subDirectory}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, Buffer.from(file.buffer));

    return `${this.getUploadDir()}/${subDirectory}/${hashName}`;
  }

  async delete(path: string): Promise<void> {
    const filePath = path.replace(this.getUploadDir(), '');
    await remove(`${this.configService.get('UPLOAD_DIR')}/${filePath}`);
  }

  private getUploadDir(): string {
    return `${this.configService.get('SERVER_HOST')}${this.configService.get('SERVE_ROOT')}`;
  }
}
