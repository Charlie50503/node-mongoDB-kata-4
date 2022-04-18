import http from "http";
import dotenv from "dotenv"
import mongoose from "mongoose"
import headers from "./headers/headers";
import { errorHandle, successHandle } from "./handle/handle";
import Todo from "./models/todo";
dotenv.config({
  path: "config.env"
})
const requestListener = (async (req: http.IncomingMessage, res: http.ServerResponse) => {
  if (req.url === "/todos" && req.method === "OPTIONS") {
    res.writeHead(200, headers)
    res.write(JSON.stringify({
      "status": "success",
    }))
    res.end()
    return
  }
  let body: string = ""
  req.on("data", (chunk) => {
    body += chunk
  })
  await new Promise((resolve) => {
    req.on("end", resolve)
  })

  if (req.url === "/todos") {

    switch (req.method) {
      case "GET":
        successHandle(req, res)
        break;
      case "POST":
        try {
          const { title } = JSON.parse(body)
          if (!title) errorHandle(req, res, "格式錯誤")
          const postResult = await Todo.create({ title })
          if (postResult) successHandle(req, res)
          if (!postResult) errorHandle(req, res, "格式錯誤")
        } catch (error) {
          errorHandle(req, res, "格式錯誤")
        }
        break;
      case "DELETE":
        try {
          const deleteResult = await Todo.deleteMany({})
          if (!deleteResult) errorHandle(req, res, "格式錯誤")
          if (deleteResult) successHandle(req, res)
        } catch (error) {
          errorHandle(req, res, "格式錯誤")
        }
        break;
      default:
        errorHandle(req, res, "路由錯誤")
        break;
    }
    return
  }
  if (req.url?.startsWith("/todos/")) {
    const id = req.url.split("/").pop()

    switch (req.method) {
      case "PATCH":
        try {
          const { title } = JSON.parse(body)
          if (!title) errorHandle(req, res, "格式錯誤")
          const patchResult = await Todo.findByIdAndUpdate(id, { title })
          if (patchResult) successHandle(req, res)
          if (!patchResult) errorHandle(req, res, "無此id")
        } catch (error) {
          errorHandle(req, res, "格式錯誤")
        }
        break;
      case "DELETE":
        try {
          const deleteResult = await Todo.findByIdAndDelete(id)
          if (!deleteResult) errorHandle(req, res, "無此id")
          if (deleteResult) successHandle(req, res)
        } catch (error) {
          errorHandle(req, res, "格式錯誤")
        }
        break;
      default:
        errorHandle(req, res, "路由錯誤")
        break;
    }
    return
  }

  errorHandle(req, res, "路由錯誤")
})

const server = http.createServer(requestListener)
const { PORT, DATABASE, DATABASE_PASSWORD } = process.env
server.listen(PORT)
const url = DATABASE?.replace("<password>", DATABASE_PASSWORD as string) as string
mongoose.connect(url)