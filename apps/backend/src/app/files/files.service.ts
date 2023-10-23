import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { path } from 'app-root-path';
import { extension } from 'mime-types';
import { ensureDir, writeFile, remove, readdir } from 'fs-extra';
import dayjs from 'dayjs';
import { randomUUID } from 'crypto';
import { ExpressFile, UploadType } from '@fit-friends/libs/types';
import { getRandomInt, getUploadPath } from '@fit-friends/libs/utils';

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

    return getUploadPath(`/${subDirectory}/${hashName}`);
  }

  async getRandomBgTraining() {
    const uploadDir = `${path}/${this.configService.get('UPLOAD_DIR')}/${UploadType.BgTraining}`;
    const imageList = await readdir(uploadDir);
    const index = getRandomInt(1, imageList.length);
    return getUploadPath(`${UploadType.BgTraining}/${imageList[index - 1]}`);
  }

  async delete(path: string): Promise<void> {
    const filePath = path.replace(getUploadPath(), '');
    await remove(`${this.configService.get('UPLOAD_DIR')}/${filePath}`);
  }
}
