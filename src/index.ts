import { app } from "./app";
import { showRouter } from "./routes/showRouter";
import { bandRouter } from "./routes/bandRouter";

import { userRouter } from "./routes/userRouter";

app.use("/user", userRouter);

wsapp.use("/show", showRouter)

app.use("/band", bandRouter);


