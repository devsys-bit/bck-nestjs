import { Entity, PrimaryGeneratedColumn, Index, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ length: 50, default: '' })
  title: string;

  @Column({ length: 100, default: '' })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;
}
