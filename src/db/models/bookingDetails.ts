import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "bookingDetails",
  modelName: "BookingDetails",
  timestamps: true,
})
class BookingDetails extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
}
export default BookingDetails;
