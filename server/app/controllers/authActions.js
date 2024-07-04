const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmail(req.body.email);
    if (!user) {
      res.sendStatus(422);
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
