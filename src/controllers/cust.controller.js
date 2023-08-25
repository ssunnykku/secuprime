import custService from '../services/cust.service.js';
import Joi from 'joi';

//validation
const guestValidator = Joi.object({
  guest_hp: Joi.string().trim().required(),
  guest_addr: Joi.string().trim().required(),
  guest_mail: Joi.string().trim().email().required(),
});

class custController {
  static async getData(req, res, next) {
    try {
      const data = await custService.getList();

      res.render('index', { data });
    } catch (error) {
      console.error(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const guest_code = req.params.guest_code;
      const updatedData = await custService.editData({ guest_code });

      const data = updatedData[0];
      // res.send(data);

      return res.render('update', { data });
      // return res.status(200).send(data);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateDb(req, res, next) {
    try {
      const updatedDb = await custService.updateData();
      return res.status(201).redirect('/');
    } catch (error) {
      console.error(error);
    }
  }

  static async editInfo(req, res, next) {
    try {
      const guest_code = req.params.guest_code;
      const { guest_hp, guest_addr, guest_mail } = await req.body;
      const data = await custService.updateInfo({
        guest_code,
        guest_hp,
        guest_addr,
        guest_mail,
      });
      return res.status(200).send(data);
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteData(req, res, next) {
    try {
      const guest_code = req.params.guest_code;
      const data = await custService.deleteCustInfo({ guest_code });

      res.json(data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default custController;
