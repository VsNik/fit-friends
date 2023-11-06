import { resolve } from 'path';
import { readdir } from 'fs-extra';
import { UploadType } from '@fit-friends/libs/types';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { MAX_LIMIT } from '@fit-friends/libs/types';

const TIME_ERROR = '[parseTime] Bad time string';
const IS_NAN_ERROR = "[parseTime] Can't parse value count. Result is NaN.";

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`${TIME_ERROR}: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(IS_NAN_ERROR);
  }

  return { value, unit };
}

export async function getRandomBg(bgType: UploadType.BgTraining | UploadType.BgUser) {
  const uploadDir = `${resolve(__dirname, process.env.STATIC_DIR)}/${bgType}`;
  const imageList = await readdir(uploadDir);
  const index = getRandomInt(1, imageList.length);
  return `${process.env.SERVER_HOST}${process.env.STATIC_ROOT}/${bgType}/${imageList[index - 1]}`;
}

export function getUploadPath(path = '') {
  const uploadPath = `${process.env.SERVER_HOST}${process.env.SERVE_ROOT}`;
  return path ? `${uploadPath}/${path}` : uploadPath;
}

export function getRandomInt(min: number, max: number): number {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
}

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function getLimit(limit: number) {
  return limit > MAX_LIMIT ? MAX_LIMIT : limit;
}
