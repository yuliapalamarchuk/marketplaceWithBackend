import { ApiProperty } from "@nestjs/swagger";

export class CreateCatalogDto {
    @ApiProperty({
        description: 'Название книги'
    })
    title: string

    @ApiProperty({
        description: 'Цена'
    })
    explaniation: number

    @ApiProperty({
        description: 'Автор книги'
    })
    definition: string

    @ApiProperty({
        description: 'Описание'
    })
    description: string

    @ApiProperty({
        description: 'Жанр'
    })
    representation: string

    @ApiProperty({
        description: 'ID',
        minimum: 1
    })
    categoryId: number
}
