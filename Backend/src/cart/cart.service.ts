import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
    constructor(
    @InjectRepository(Cart)
    private repository: Repository<Cart>
  ) {}


   create(data: CreateCartDto) {
    try {
      let cart = this.repository.save(new Cart)
      return cart;
    } catch (err) {
      console.log(err);
    }
  }
  
  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({id})
  }

  update(id: number, data: UpdateCartDto) {
    return this.repository.save({...data, id})
  }

 async remove(id: number) {
    await this.repository.delete(id)
  }
}
