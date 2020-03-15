"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "public")));
const data = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, "data.json"), "utf8")).map((watch) => {
    watch.images = watch.images.map((img) => encodeURI(img));
    return watch;
});
app.get("/", (req, res) => {
    res.send(data);
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
//# sourceMappingURL=main.js.map