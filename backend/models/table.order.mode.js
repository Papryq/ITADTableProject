import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  orderLockStatus: {
    type: Boolean,
    default: false
  },
  orderSystemCount: {
    type: Number,
    required: false,
  },
  orderNotebookCount: {
    type: Number,
    required: false,
  },
  orderDateExpiresAt: {
    type: Date,
    required: false,
  },
  orderStatus: {
    type: Boolean,
    default: false,
  },
  orderSystemStatus: {
    type: Boolean,
    default: false,
  },
  orderNotebookStatus: {
    type: Boolean,
    default: false,
  },
  orderPrio: {
    type: Boolean,
    default: false,
  },
  orderOperator: {
    type: String,
    default: "None",
  },
});

export const Order = mongoose.model("Order", orderSchema);
