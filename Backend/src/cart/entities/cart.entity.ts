import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
   id: number

   @Column()
   total: number

   @Column()
   quantity: number
  
}
