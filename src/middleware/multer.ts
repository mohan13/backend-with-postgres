import multer from "multer";

import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    const allowedFileTypes = [
      "images/jpg",
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error("This filetype is not accepted"));
      return;
    }
    cb(null, "./public/images");
  },

  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
