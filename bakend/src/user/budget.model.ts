import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserModel } from './user.model';

@Entity()
export class BudgetModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  limit: number;

  @ManyToOne(() => UserModel, (user) => user.budgets)
  user: UserModel;
}
