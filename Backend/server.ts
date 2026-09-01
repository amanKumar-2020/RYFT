import app from "./src/app";
import config from "./src/config/config";

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
