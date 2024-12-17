import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "rooms",
  modelName: "Rooms",
})
class Rooms extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
  })
  declare roomDescription: string;

  @Column({
    type: DataType.STRING,
  })
  declare roomType: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare price_per_night: number;

  @Column({
    type: DataType.ENUM("Rs.", "Deram", "USD"),
    defaultValue: "USD",
  })
  declare currency: string;

  @Column({
    type: DataType.JSON,
  })
  declare availability: {
    start_date: string;
    end_date: string;
    is_available: boolean;
  };

  @Column({
    type: DataType.JSON, // JSON field to store object
  })
  declare location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  declare amenities: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  declare roomImages: string[];
}

export default Rooms;
