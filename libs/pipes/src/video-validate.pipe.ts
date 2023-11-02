/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExpressFile } from "@fit-friends/libs/types";
import { TRAINING_VIDEO_FORMAT, TRAINING_VIDEO_NOT_EMPTY, VIDEO_TYPE } from "@fit-friends/libs/validation";
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import  * as path from 'node:path';

@Injectable()
export class VideoValidatePipe implements PipeTransform {
    constructor(private isUpdate: boolean = false) {}
    
    transform(video: ExpressFile, metadata: ArgumentMetadata) {
        if (!this.isUpdate && !video) {
            throw new BadRequestException(TRAINING_VIDEO_NOT_EMPTY);
        }

        const fileExtension = video && path.extname(video.originalname);
        if (video && !VIDEO_TYPE.includes(fileExtension)) {
            throw new BadRequestException(TRAINING_VIDEO_FORMAT);
        }

        return video;
    }
}
