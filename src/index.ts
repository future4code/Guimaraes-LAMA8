import { app } from "./app";
import { showRouter } from "./routes/showRouter";
import { userRouter } from "./routes/userRouter";

app.use("/user", userRouter);
app.use("/show", showRouter)