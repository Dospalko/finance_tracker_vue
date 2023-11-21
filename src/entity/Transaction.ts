// Transaction.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column({ nullable: true })
  description!: string;

  @Column()
  date!: Date;

  @ManyToOne(() => User, user => user.transactions, { eager: false })
  user!: User; // Ensure this matches the property name in the User entity
}
