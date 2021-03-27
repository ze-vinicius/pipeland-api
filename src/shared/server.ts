import { app } from "./app";
import { router } from "./infra/http/routes";

const PORT = 3333;

app.use(router);

app.listen(PORT, () => {
  console.log(`🛸 Server started on port ${3333}`);
});
