import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshDto {
    @ApiProperty({
        description: 'Токен обновления',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkZTYwOTJhLWY5YjctNGMyNi1iYWJlLWVkODhmOTQ1YjllMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4OTczMjA0LCJleHAiOjE2OTg5NzY4MDR9.2d9TdvA_Lc_lHa2oNSiYLbVLhZbEalUTbmKcSVWDqYc'
    })
    @IsString()
    @IsNotEmpty()
    readonly refreshToken: string;
}