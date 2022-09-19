const mongoose = require("mongoose");

const estimate = new mongoose.Schema({
  estimate_id: {
    type: Number,
    unique: true,
  },
  worker_id: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
    unique: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  isTry: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// 마지막에 DB 저장된 estimate_id 조회. 새로운 평가를 생성할 때 id를 알아내기 위해 사용
estimate.statics.getLatestEstimationId = async function () {
    return await this.find({}).sort({ estimate_id: -1 }).limit(1);
}

// 전체 평가 조회
estimate.statics.getEstimationAll = async () => {
    return await this.find({});
}

// worker_id로 평가 조회
estimate.statics.getEstimationByWorker = async (worker_id) => {
    return await this.find({worker_id: worker_id});
}

// order_id로 평가 조회
estimate.statics.getEstimationByOrder = async (order_id) => {
    return await this.find({order_id: order_id});
}

// estimate_id로 평가 조회 (try 가능여부 판별할 때 사용됨)
estimate.statics.getEstimationById = async (estimate_id) => {
    return await this.find({estimate_id: estimate_id});
}

// 평가 저장
estimate.methods.saveEstimation = async (obj, idx) => {
    const newEstimation = new this({
      estimate_id: idx,
      order_id: obj.order_id,
      client_id: obj.client_id,
      worker_id: worker_id,
      score: obj.score,
    });
    return await newEstimation.save();
}

// 평가 삭제. try 성공한 경우 삭제함
estimate.statics.removeEstimation = async (estimate_id) => {
    return await this.findByIdAndRemove(estimate_id);
}

module.exports = mongoose.model("Estimate", estimate);