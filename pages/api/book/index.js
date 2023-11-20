// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import nextConnect from 'next-connect';
const prisma = new PrismaClient();
import multer from 'multer';
import jwt from 'jsonwebtoken';

const handler = nextConnect();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + '-' + fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
});

handler.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401);

  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = user.userId;
  next();
});

handler.use(upload.single('image'));

handler.post(async (req, res) => {
  console.log('req.file', req.file);
  const { title, author, publisher, year, pages } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        year: parseInt(year),
        pages: parseInt(pages),
        image: req.file.filename, // add the path to the uploaded image to the book data
      },
    });
    res.json({ book });
  } catch (err) {
    console.log('err', err);
    res.status(400).json({ message: 'Book already exists' });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
