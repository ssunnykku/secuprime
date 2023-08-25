import custService from '../services/cust.service.js';
import Joi from 'joi';

//validation
const guestValidator = Joi.object({
  guest_hp: Joi.string().trim().required(),
  guest_addr: Joi.string().trim().required(),
  guest_mail: Joi.string().trim().email().required(),
});

class custController {
  //* 1. cust, cust_detail 전체 목록 조회
  static async getData(req, res, next) {
    try {
      const data = await custService.getList();

      res.render('index', { data });
    } catch (error) {
      console.error(error);
    }
  }

  //* 2. cust, cust_detail 특정 데이터 조회
  static async getCustomerDetail(req, res, next) {
    try {
      const guest_code = req.params.guest_code;
      const updatedData = await custService.findGuestCode({ guest_code });

      const data = updatedData[0];

      return res.render('update', { data });
    } catch (error) {
      console.error(error);
    }
  }
  //* 3. "STEP_02 "에서 제시된 데이터 파싱 후 파싱한 Data DB에 저장
  static async updateDb(req, res, next) {
    try {
      const updatedDb = await custService.updateData();
      return res.status(201).redirect('/');
    } catch (error) {
      console.error(error);
    }
  }

  //* 4. 특정 데이터 수정
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
  //* 5. 특정 데이터 삭제
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
