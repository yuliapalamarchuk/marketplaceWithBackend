import { Injectable } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from './entities/catalog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog)
    private repository: Repository<Catalog>
  ) {}

  create(data: CreateCatalogDto) {
    return this.repository.save(data)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({id})
  }

  update(id: number, data: UpdateCatalogDto) {
    return this.repository.save({...data, id})
  }

  async remove(id: number) {
    await this.repository.delete(id)
  }
}
