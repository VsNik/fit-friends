import React from "react";
import { Image } from "../image/image";

interface AvatarProps {
    src?: string;
    width: number;
    height: number;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
    const {src, width, height, className} = props;

    const avatar = src ?? '/assets/img/default_avatar.png';

    return (
        <Image src={avatar} width={width} height={height} className={className} />
    )
}