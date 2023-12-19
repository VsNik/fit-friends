/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExpressFile } from "@fit-friends/libs/types";
import { VIDEO_TYPE, TrainingError } from "@fit-friends/libs/validation";
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import  * as path from 'node:path';

@Injectable()
export class VideoValidatePipe implements PipeTransform {
    constructor(private isUpdate: boolean = false) {}
    
    transform(video: ExpressFile, metadata: ArgumentMetadata) {
        if (!this.isUpdate && !video) {
            throw new BadRequestException(TrainingError.VideoRequired);
        }

        const fileExtension = video && path.extname(video.originalname);
        if (video && !VIDEO_TYPE.includes(fileExtension)) {
            throw new BadRequestException(TrainingError.VideoType);
        }

        return video;
    }
}
