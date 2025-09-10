import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const pages = [
  { url: "/page1", title: "Cranberry Punch", palette: "p1" },
  { url: "/page2", title: "Velvet Night", palette: "p2" },
  { url: "/page3", title: "Azure Orchid", palette: "p3" },
  { url: "/page4", title: "Golden Horizon", palette: "p4" },
  { url: "/page5", title: "Midnight Matcha", palette: "p5" },
];

pages.forEach((page) => {
  app.get(page.url, (req, res) => {
    res.render(`page${page.url.slice(-1)}`, {
      title: page.title,
      palette: page.palette,
    });
  });
});

app.get("/", (req, res) => res.redirect("/page1"));

app.listen(PORT, () => {
  console.log(` Сервер запущенна порту:${PORT}`);
});
