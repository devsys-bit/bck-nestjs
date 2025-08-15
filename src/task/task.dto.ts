import { applyDecorators } from "@nestjs/common";
import { ApiPropertyOptional, PartialType, ApiQuery } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, IsBoolean } from "class-validator";
import { PaginateConfig, FilterOperator } from "nestjs-paginate";
import { Task } from "./task.entity";

export class CreateTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class PaginateTaskDto{
  static readonly config: PaginateConfig<Task> = {
    sortableColumns: ['id', 'title', 'completed', 'created_at', 'updated_at'],
    searchableColumns: ['title', 'description', 'created_at', 'updated_at'],
    filterableColumns: {
      id: [FilterOperator.IN],
      title: [FilterOperator.SW, FilterOperator.ILIKE],
      description: [FilterOperator.SW, FilterOperator.ILIKE],
      completed: [FilterOperator.EQ],
      created_at: [FilterOperator.GTE, FilterOperator.LTE, FilterOperator.SW],
      updated_at: [FilterOperator.GTE, FilterOperator.LTE, FilterOperator.SW],
    },
    defaultSortBy: [['id', 'DESC']],
  };
}

export class SwaggerTaskDto{
  static swaggerQuery() {
    return applyDecorators(
      ApiQuery({ name: 'page', required: false, type: Number, description: 'Ej: 1' }),
      ApiQuery({ name: 'limit', required: false, type: Number, description: 'Ej: 10' }),
      ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Ej: id:DESC' }),
      ApiQuery({ name: 'search', required: false, type: String, description: 'Ej: tarea urgente' }),
      ApiQuery({ name: 'filter.id', required: false, type: String, description: 'Ej: $in:1,2,3' }),
      ApiQuery({ name: 'filter.title', required: false, type: String, description: 'Ej: $sw:a' }),
      ApiQuery({ name: 'filter.description', required: false, type: String, description: 'Ej: $sw:imp' }),
      ApiQuery({ name: 'filter.completed', required: false, type: Number, description: 'Ej: $eq:1 o $eq:0' }),
      ApiQuery({ name: 'filter.created_at', required: false, type: String, description: 'Ej: $gte ó $lte ó $sw:2025-01-01' }),
      ApiQuery({ name: 'filter.updated_at', required: false, type: String, description: 'Ej: $gte ó $lte ó $sw:2025-08-01' }),
    );
  }
}