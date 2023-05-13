import { Request, Response } from 'express';
import userService from '../services/userService';
import { createToken } from '../utils/jwtToken';

export default class LoginController {
  _service: userService;

  constructor(service: userService) {
    this._service = service;
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this._service.login(email, password);
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }
    if (user) {
      const token = createToken(user);
      return res.status(200).json({ token });
    }
  };

  getRole = async (req: Request, res: Response) => {
    const { payload } = req.body.user;
    const { email } = payload;

    const role = await this._service.getRole(email);
    return res.status(200).json({ role });
  };
}
