import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Catalog } from './entities/catalog.entity';

@ApiTags('Catalog')
@ApiBearerAuth()
@Controller('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @ApiResponse({status: 201, description: 'ОК', type: Catalog})
  @ApiResponse({status: 401, description: 'Ошибка'})
  
  @Post()
  create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(createCatalogDto);
  }

  @Get()
  findAll() {
    return this.catalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(+id, updateCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogService.remove(+id);
  }
}
