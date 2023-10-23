const TIME_ERROR = '[parseTime] Bad time string';
const IS_NAN_ERROR = '[parseTime] Can\'t parse value count. Result is NaN.';

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

export function getUploadPath(path = '') {
  const uploadPath = `${process.env.SERVER_HOST}${process.env.SERVE_ROOT}`;
  return path ? `${uploadPath}/${path}` : uploadPath;
}

export function getRandomInt(min: number, max: number): number {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
}
