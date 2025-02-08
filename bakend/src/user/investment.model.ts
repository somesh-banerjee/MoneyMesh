import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserModel } from './user.model';

@Entity()
export class InvestmentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  amount: number;

  @Column()
  type: string;

  @ManyToOne(() => UserModel, (user) => user.investments)
  user: UserModel;
}
