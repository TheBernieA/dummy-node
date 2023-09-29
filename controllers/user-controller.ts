import { Request, Response } from "express";


const user = {
  name: "mario",
  surname: "rossi",
};

const getUsers = async (req: Request, res: Response) => {
  res.json(user);
};



export { getUsers };
