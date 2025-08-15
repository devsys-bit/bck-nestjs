import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto, PaginateTaskDto } from './task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Listado con paginación y filtrado de eliminados
  async findAll(query: PaginateQuery): Promise<Paginated<Task>> {
    const qb = this.taskRepository.createQueryBuilder('task').where('task.deleted_at IS NULL');
    return paginate(query, qb, PaginateTaskDto.config);
  }

  // Buscar una tarea por ID (solo activas)
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id }, withDeleted: false });
    if (!task) {
      throw new NotFoundException(`Task con ID ${id} no encontrada`);
    }
    return task;
  }

  // Crear nueva tarea (datos opcionales)
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  // Actualización parcial
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  // Eliminación lógica
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.taskRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task con ID ${id} no encontrada`);
    }
    return { message: `Task con ID ${id} eliminada correctamente` };
  }

  // Restaurar una tarea eliminada
  async restore(id: number): Promise<{ message: string }> {
    const result = await this.taskRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task con ID ${id} no encontrada o no estaba eliminada`);
    }
    return { message: `Task con ID ${id} restaurada correctamente` };
  }
}
