const transactionQueries = require("../../queries/transaction");

module.exports = {
  async createTransaction(req, res) {
    let title = req.body.title;
    let user_id = req.body.user_id;
    let desc = req.body.desc;
    let amount = req.body.amount;
    let status = req.body.status;

    try {
      let data = {
        title: title,
        user_id: user_id,
        desc: desc,
        amount: amount,
        status: status,
      }

      let transactionData = await transactionQueries.addTransactionData(data)
      return res.status(200).send({ code: 200, status: "success", data:transactionData });
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async getTransactionByUserId(req,res){
    let user_id = req.body.user_id;

    try{
        let transactionData = await transactionQueries.getTransactionByUserID(user_id)
        return res.status(200).send({ code: 200, status: "success", data:transactionData });
    }catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }

  },

  async deleteTransactionById(req,res){
    let id = req.body.id;

    try{
        let deletedData = await transactionQueries.deleteTransactionById(id)
        return res.status(200).send({ code: 200, status: "success", data:deletedData });
   
    }catch (err) {
        console.log(err);
        return res
          .status(422)
          .send({ code: 422, status: "failed", msg: err.message });
      }
  }
};
