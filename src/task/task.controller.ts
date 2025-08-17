import { Controller, Get, Param, Post, Body, Patch, Delete } from "@nestjs/common";
import { Paginate, PaginateQuery } from "nestjs-paginate";
import { ApiTags } from "@nestjs/swagger";
import { SwaggerTaskDto, CreateTaskDto, UpdateTaskDto } from "./task.dto";
import { TaskService } from "./task.service";

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @SwaggerTaskDto.swaggerQuery()
  findAll(@Paginate() query: PaginateQuery) {
    return this.taskService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.taskService.restore(+id);
  }
}
