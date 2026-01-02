import express, {} from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors';
import { successResponse } from "./utils/response";
import { errorHandler } from "./middlewares/error.handler";
import bookRouter from "./routes/book.route";
import categoryRouter from "./routes/category.route";
import userRouter from "./routes/user.route";
import borrowRouter from "./routes/borrow.route";
import borrowItemRouter from "./routes/borrowItem.route";
import authRouter from "./routes/auth.route";
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from "./utils/swagger";
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.set('query panser', 'extended');
app.use(express.static("public"));
app.use((req, _res, next) => {
    console.log(`${req.method}: ${req.path}`);
    req.startTime = Date.now();
    next();
});
app.get('/', (_req, res) => {
    successResponse(res, "selamat datang di API perpustakaan", { hari: 3,
        status: 'server Hidup',
    });
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api/book', bookRouter);
app.use('/api/category', categoryRouter);
app.use('/api/user', userRouter);
app.use('/api/borrow', borrowRouter);
app.use('/api/borrowItem', borrowItemRouter);
app.use('/api/auth', authRouter);
app.get(/.*/, (req, _res) => {
    throw new Error(`Route ${req.originalUrl} tidak ada di API e-commrece`);
});
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map