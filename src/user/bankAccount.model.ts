import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserModel } from './user.model';

@Entity()
export class BankAccountModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  balance: number;

  @Column()
  currency: string;

  @ManyToOne(() => UserModel, (user) => user.bankAccounts)
  user: UserModel;
}
