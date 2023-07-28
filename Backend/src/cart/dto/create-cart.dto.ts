import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
    @ApiProperty({
        description: 'ID',
        minimum: 1
    })
    categoryId: number

    @ApiProperty({
        description: 'Количество'
    })
    description: number

    @ApiProperty({
        description: 'Итоговая сумма'
    })
    title: number
}
