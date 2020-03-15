import express from "express"
import cors from "cors"

import fs from "fs"
import path from "path"


const app = express()

app.use(cors())

app.use(express.static(path.resolve(__dirname, "public")))

const data: Watch[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "data.json"), "utf8")
).map((watch: Watch): Watch => {
  watch.images = watch.images.map((img: string): string => encodeURI(img))

  return watch
})

app.get("/", (req, res) => {
  res.send(data)
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server started on port ${port}`))

interface Watch {
  title: string;
  description: string;
  details: string[];
  images: string[];
  price: string
}