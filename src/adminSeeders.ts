import User from "./db/models/userModel";
import bcrypt from "bcrypt";

const adminSeeder = async (): Promise<void> => {
  try {
    const [data] = await User.findAll({
      where: {
        email: "mohan_admin@gmail.com",
      },
    });

    if (!data) {
      await User.create({
        email: "mohan_admin@gmail.com",
        password: bcrypt.hashSync("mohan@admin", 8),
        username: "Mohan Admin",
        role: "admin",
      });
      console.log("Admin credentials seeded successfully !");
    } else {
      console.log("Admin credentials already seeded !");
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export default adminSeeder;
