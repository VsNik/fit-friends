import React from "react";
import { Image } from "../image/image";
import { DEFAULT_AVATAR } from "../../../constants/common";

interface AvatarProps {
    src?: string;
    width: number;
    height: number;
    className?: string;
    dataTestId?: string;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
    const {src, width, height, className, dataTestId} = props;

    const avatar = src || DEFAULT_AVATAR;

    return (
        <Image src={avatar} width={width} height={height} className={className} dataTestid={dataTestId} />
    )
}