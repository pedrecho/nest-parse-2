import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
  role: string;
}

export const userRoles = ['USER', 'ADMIN'] as const;
export type UserRoles = [typeof userRoles];

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Default(userRoles[0])
  @Column(DataType.ENUM(...userRoles))
  role: UserRoles;
}
