import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Catalog {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    price: number;

    @Column()
    author: string;
  
    @Column()
    genre: string;

    @Column({
        type: "varchar",
        length: 1000,
    })
    description: string;

    @Column()
    image: string;
  
}
