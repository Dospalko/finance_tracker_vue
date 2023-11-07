import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number; // The '!' tells TypeScript this will be assigned by TypeORM

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number; // Definite assignment assertion

  @Column()
  description!: string; // Definite assignment assertion

  @Column()
  date!: Date; // Definite assignment assertion

  @ManyToOne(() => User, user => user.transactions)
  user!: User; // Definite assignment assertion for the relation
}
