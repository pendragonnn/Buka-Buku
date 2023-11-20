import { PrismaClient } from '@prisma/client';
import nextConnect from 'next-connect';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';

const handler = nextConnect();

handler.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401);

  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = user.userId;
  next();
});

handler.put(async (req, res) => {
  try {
    const { bookId } = req.query;
    const { title, author, publisher, year, pages } = req.body;
    const book = await prisma.book.update({
      where: { id: Number(bookId) },
      data: {
        title,
        author,
        publisher,
        year,
        pages,
      },
    });
    res.json({ book });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Something went wrong' });
  }
});

handler.delete(async (req, res) => {
  try {
    const { bookId } = req.query;
    const book = await prisma.book.delete({
      where: { id: Number(bookId) },
    });
    res.json({ book });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Something went wrong' });
  }
});

export default handler;
