import mongoose from "mongoose";

interface ITodo {
  title: string
}

const todoSchema = new mongoose.Schema<ITodo>({
  title: {
    type: String,
    required: true
  }
},
  {
    versionKey: false,
    timestamps: true
  })

const Todo = mongoose.model("todo", todoSchema)

export default Todo