import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'userId' }) // Add this
  user: User;

  @Column() // Add this
  userId: number;
}
