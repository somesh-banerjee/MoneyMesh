import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserModel } from './user.model';

@Entity()
export class ExpenseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  amount: number;

  @Column()
  category: string;

  @Column('date')
  date: string;

  @ManyToOne(() => UserModel, (user) => user.expenses)
  user: UserModel;
}
