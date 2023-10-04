import { Request, Response } from "express";

import { prisma } from "../utils/index";

// const user = {
//   name: "mario",
//   surname: "rossi",
// };

const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const createUser = async (req: Request, res: Response) => {
  const { firstname, lastname } = req.body;
  const user = await prisma.user.create({
    data: {
      firstname: firstname,
      lastname: lastname,
    },
  });
  res.json(user);
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { firstname, lastname } = req.body;
  const updateUser = await prisma.user.update({
    where: {
      id: +id,
    },
    data: {
      firstname: firstname,
      lastname: lastname,
    },
  });

  res.json(updateUser);
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: {
      id: +id,
    },
  });
  res.json(deletedUser);
};

const uploadImage = async (req: Request, res: Response) => {
  const id = req.params.id;
  const image = req.file?.filename;
  await prisma.user.update({
    where: {
      id: +id,
    },
    data: {
      image: image,
    },
  });
  res.status(201).json({message: 'image uploaded'})
};

export { getUsers, createUser, deleteUser, updateUser, uploadImage };
