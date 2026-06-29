// import { decode } from "next-auth/jwt";
// import { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import fs from "fs";

// export const config = {
//   api: {
//     bodyParser: false, // عشان FormData يشتغل
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const tokenCookie = req.cookies["next-auth.session-token"];
//   const decoded = await decode({ token: tokenCookie!, secret: process.env.NEXTAUTH_SECRET! });

//   if (!decoded?.token) return res.status(401).json({ message: "Unauthenticated" });

//   const form = new formidable.IncomingForm();
//   form.uploadDir = "./public/uploads/slides";
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, files) => {
//     if (err) return res.status(500).json({ message: "Upload error" });
//     // احفظ البيانات في DB زي ما عايزة
//     res.status(200).json({ message: "Slide uploaded" });
//   });
// }

// import formidable from "formidable";
// import { NextApiRequest, NextApiResponse } from "next";

// export const config = { api: { bodyParser: false } };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = "./public/uploads/slides";
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, files) => {
//     if (err) return res.status(500).json({ message: "Upload error" });
//     console.log("Fields:", fields);
//     console.log("Files:", files);
//     res.status(200).json({ message: "Slide uploaded" });
//   });
// }

import { IncomingForm, File } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // مهم عشان FormData
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const uploadDir = path.join(process.cwd(), "/public/uploads/slides");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = new IncomingForm({
    uploadDir,        // مكان الحفظ
    keepExtensions: true,  // احتفاظ بالامتداد الأصلي
    maxFileSize: 20 * 1024 * 1024, // 20MB مثلا
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Upload error" });
    }

    console.log("Fields:", fields);
    console.log("Files:", files);

    res.status(200).json({ message: "Slide uploaded" });
  });
}

