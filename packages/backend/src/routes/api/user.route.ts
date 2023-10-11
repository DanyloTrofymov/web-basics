import { Router } from 'express';
import { isAdmin } from '../../middlewares/isAdmin.middleware';
import userController from '../../controllers/user.controller';
import tryCatchMiddleware from '../../middlewares/tryCatch.middleware';
import { isExists } from '../../middlewares/isExists.middleware';
import { User } from '../../entities/User.entity';
import { userSchema } from '../../utils/validationSchemas.util';
import { validateBodyMiddleware } from '../../middlewares/bodyValidator.middleware';
import { authenticate } from '../../middlewares/auth.middleware';

const userRouter: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
/* router.post('/register', async (_: Request, res: Response) => {
  res.send('Add registration logic there');
}); */
userRouter.post(
  '/signup',
  validateBodyMiddleware(userSchema),
  tryCatchMiddleware(userController.signup.bind(userController))
);
userRouter.post(
  '/login',
  validateBodyMiddleware(userSchema),
  tryCatchMiddleware(userController.login.bind(userController))
);
userRouter.patch(
  '/:id',
  authenticate,
  isExists(User),
  validateBodyMiddleware(userSchema),
  tryCatchMiddleware(userController.updateUser.bind(userController))
);
userRouter.patch(
  '/change-password/:id',
  authenticate,
  isExists(User),
  validateBodyMiddleware(userSchema),
  tryCatchMiddleware(userController.changePassword.bind(userController))
);
userRouter.delete(
  '/:id',
  authenticate,
  isExists(User),
  tryCatchMiddleware(userController.deleteUser.bind(userController))
);
userRouter.get(
  '/confirm/:token',
  tryCatchMiddleware(userController.emailConfirmation.bind(userController))
);
userRouter.post(
  '/forgot-password',
  validateBodyMiddleware(userSchema),
  tryCatchMiddleware(userController.forgotPassword.bind(userController))
);
userRouter.post(
  '/forgot-password/:token',
  validateBodyMiddleware(userSchema),
  tryCatchMiddleware(userController.restorePassword.bind(userController))
);
userRouter.get(
  '/',
  authenticate,
  isAdmin,
  tryCatchMiddleware(userController.getAllUsers.bind(userController))
);
userRouter.get(
  '/count',
  authenticate,
  tryCatchMiddleware(userController.getCount.bind(userController))
);
userRouter.get('/', tryCatchMiddleware(userController.getUser.bind(userController)));
export default userRouter;
