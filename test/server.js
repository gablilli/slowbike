import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: "https://gabrielelilli1105.wixstudio.com",
    changeOrigin: true,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Reverse proxy attivo su http://localhost:${PORT}`);
});
