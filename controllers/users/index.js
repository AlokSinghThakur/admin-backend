const userQueries = require("../../queries/users");
const util = require("../../utils/otp");
const jwt = require("jsonwebtoken");
const roles = require("../../services/roles");

module.exports = {
  async createUser(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let gender = req.body.gender;
    let dob = req.body.dob;
    let status = req.body.status;
    if (!email) {
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: "Email is required" });
    }

    try {
      if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        let data = {
          name: name,
          email: email,
          gender: gender,
          dob: dob,
          status: status,
        };
        let userExist = await userQueries.getUserByEmail(email);
        if (userExist && userExist != null) {
          res
            .status(422)
            .send({ code: 422, status: "failed", msg: "User Already exist" });
        }

        let userdata = await userQueries.addUser(data);
        let user = await userQueries.getUserByEmail(email);
        let mailsent = await util.sendInBlue(user, name);
        // console.log("data",user.id)

        return res
          .status(200)
          .send({ code: 200, status: "success", data: userdata });
      } else {
        res
          .status(422)
          .send({
            code: 422,
            status: "failed",
            msg: "please Provide email in correct formate",
          });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async getUser(req, res) {
    try {
      let userDetails = await userQueries.getUserData();
      return res
        .status(200)
        .send({ code: 200, status: "success", data: userDetails });
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async loginByUser(req, res) {
    let email = req.body.email;
    try {
      let userExist = await userQueries.getUserByEmail(email);
      if (userExist && userExist != null) {
        let token = await createToken(userDetails.id, roles.User);
        return res
          .status(200)
          .send({
            code: 200,
            status: "success",
            accessToken: token,
            data: userDetails,
          });
      } else {
        return res
          .status(422)
          .send({ code: 422, status: "failed", msg: "not a user" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async loginByAdmin(req, res) {
    let email = req.body.email;
    try {
      let userExist = await userQueries.getAdminByEmail(email);
      if (userExist && userExist != null) {
        let token = await createToken(userDetails.id, roles.Admin);
        return res
          .status(200)
          .send({
            code: 200,
            status: "success",
            accessToken: token,
            data: userDetails,
          });
      } else {
        return res
          .status(422)
          .send({ code: 422, status: "failed", msg: "not a user" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async loginByPowerUser(req, res) {
    let email = req.body.email;
    try {
      let userExist = await userQueries.getPowerUserByEmail(email);
      if (userExist && userExist != null) {
        let token = await createToken(userDetails.id, roles.PowerUser);
        return res
          .status(200)
          .send({
            code: 200,
            status: "success",
            accessToken: token,
            data: userDetails,
          });
      } else {
        return res
          .status(422)
          .send({ code: 422, status: "failed", msg: "not a user" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async loginBySupport(req, res) {
    let email = req.body.email;
    try {
      let userExist = await userQueries.getSupportByEmail(email);
      if (userExist && userExist != null) {
        let token = await createToken(userDetails.id, roles.Support);
        return res
          .status(200)
          .send({
            code: 200,
            status: "success",
            accessToken: token,
            data: userDetails,
          });
      } else {
        return res
          .status(422)
          .send({ code: 422, status: "failed", msg: "not a user" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async getUserById(req, res) {
    let user_id = req.user.id;
    try {
      let userDetails = await userQueries.getUserDataByid(user_id);
      return res
        .status(200)
        .send({ code: 200, status: "success", data: userDetails });
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async getAminById(req, res) {
    let user_id = req.user.id;
    try {
      let userDetails = await userQueries.getAdminDataByid(user_id);
      return res
        .status(200)
        .send({ code: 200, status: "success", data: userDetails });
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async getPowerUserByid(req, res) {
    let user_id = req.user.id;
    try {
      let userDetails = await userQueries.getPowerUserDataByid(user_id);
      return res
        .status(200)
        .send({ code: 200, status: "success", data: userDetails });
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async getSupportByid(req, res) {
    let user_id = req.user.id;
    try {
      let userDetails = await userQueries.getSupportDataByid(user_id);
      return res
        .status(200)
        .send({ code: 200, status: "success", data: userDetails });
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },

  async changePassword(req, res) {
    let password = req.body.password;
    let user_id = req.params.user;

    try {
      console.log(password, user_id);
      let changePassword = await userQueries.changePassword(password, user_id);
    
      return res.cookie("authToken","",{
        httpOnly:true
       })
        .status(200)
        .send({ code: 200, status: "success", msg: "password changed" });
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .send({ code: 422, status: "failed", msg: err.message });
    }
  },
};

/* function for genrating token */
async function createToken(id, roles) {
  let payload = {
    id: id,
    roles: roles,
  };
  return await jwt.sign(payload, process.env.JWT_Key, { expiresIn: "500h" });
}
