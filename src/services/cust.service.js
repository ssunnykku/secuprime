import axios from 'axios';
import sql from '../config/db.config.js';

class custService {
  static async getList() {
    try {
      const getDataQuery =
        'SELECT * from cust LEFT JOIN cust_detail ON cust.guest_code = cust_detail.guest_code';

      const [data] = await sql.promise().query(getDataQuery);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async editData({ guest_code }) {
    try {
      const getDataQuery =
        'SELECT * from cust LEFT JOIN cust_detail ON cust.guest_code = cust_detail.guest_code WHERE cust_detail.guest_code = ?';

      const [data] = await sql.promise().query(getDataQuery, [guest_code]);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateData() {
    try {
      const getData = await axios
        .get('http://secuprime.com/recruit/202308_testdata.php')
        .then((res) => res.data.data[0]);
      // STEP_04 웹 페이지에 버튼 생성 ( 동작 : DB에 기존 Data 삭제 후 신규 파싱 Data 저장 )
      await sql.promise().query('DELETE FROM cust_detail');
      await sql.promise().query('DELETE FROM cust');

      const cust = getData['cust'];
      const cust_detail = getData['cust_detail'];

      cust.forEach((element) => {
        const CustQuery =
          'INSERT INTO cust (guest_code, guest_name, guest_birth) VALUES (?, ?, ?)';
        const updateCust = sql
          .promise()
          .query(
            CustQuery,
            [
              element['guest_code'],
              element['guest_name'],
              element['guest_birth'],
            ],
            (error, rows, fields) => {
              if (error) throw error;
            }
          );
      });

      cust_detail.forEach((element) => {
        const CustDetailQuery =
          'INSERT INTO cust_detail (guest_code, guest_hp, guest_addr, guest_mail) VALUES (?, ?, ?, ?)';
        const updateCustDetail = sql
          .promise()
          .query(
            CustDetailQuery,
            [
              element['guest_code'],
              element['guest_hp'],
              element['guest_addr'],
              element['guest_mail'],
            ],
            (error, rows, fields) => {
              if (error) throw error;
            }
          );
      });
      return 'DB 업데이트 완료';
    } catch (error) {
      console.error(error);
    }
  }

  static async updateInfo({ guest_code, guest_hp, guest_addr, guest_mail }) {
    try {
      const custDetailQuery = `UPDATE cust_detail SET guest_hp=?, guest_addr=?, guest_mail=? WHERE guest_code=?`;
      const custDetailParams = [guest_hp, guest_addr, guest_mail, guest_code];
      const [data] = await sql
        .promise()
        .query(custDetailQuery, custDetailParams);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteCustInfo({ guest_code }) {
    try {
      const custDetailQuery = 'DELETE FROM cust_detail WHERE guest_code = ?';
      const custQuery = 'DELETE FROM cust WHERE guest_code = ?';

      await sql.promise().query(custDetailQuery, [guest_code]);
      await sql.promise().query(custQuery, [guest_code]);

      return { success: true, message: 'Data deleted successfully.' };
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  }
}

export default custService;
