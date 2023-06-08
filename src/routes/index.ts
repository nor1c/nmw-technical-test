import { Router, Request, Response } from 'express';
import UseRoutes from '../modules/users/user.routes';

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Express + TypeScript Server" });
});

router.use('/users', new UseRoutes().routes())

export default router;
