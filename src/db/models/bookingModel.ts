import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "bookings",
  modelName: "Bookings",
})
class Bookings extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare check_in: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare check_out: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  declare guests: {
    adults: number;
    children: number;
    infants: number;
  };
  @Column({
    type: DataType.ENUM("confirmed", "pending", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  })
  declare bookingStatus: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare totalAmount: number;
}

export default Bookings;
