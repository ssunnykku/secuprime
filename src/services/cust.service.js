import axios from 'axios';
import pool from '../config/db.config.js';

class custService {
  //* 1. cust, cust_detail 전체 목록 조회
  static async getList() {
    try {
      const getDataQuery =
        'SELECT * from cust LEFT JOIN cust_detail ON cust.guest_code = cust_detail.guest_code';

      const [data] = await pool.query(getDataQuery);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  //* 2. cust, cust_detail 특정 데이터 조회
  static async findGuestCode({ guest_code }) {
    try {
      const getDataQuery =
        'SELECT * from cust LEFT JOIN cust_detail ON cust.guest_code = cust_detail.guest_code WHERE cust_detail.guest_code = ?';

      const [data] = await pool.query(getDataQuery, [guest_code]);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //* 3. "STEP_02 "에서 제시된 데이터 파싱 후 파싱한 Data DB에 저장
  static async updateData() {
    const conn = await pool.getConnection();
    try {
      // 트랜잭션 적용

      await conn.beginTransaction();

      // date 파싱
      const getData = await axios
        .get('http://secuprime.com/recruit/202308_testdata.php')
        .then((res) => res.data.data[0]);

      await conn.query('DELETE FROM cust_detail');
      await conn.query('DELETE FROM cust');

      //  각 테이블에 data 저장
      const cust = getData['cust'];
      const cust_detail = getData['cust_detail'];

      for (let element of cust) {
        const CustQuery =
          'INSERT INTO cust (guest_code, guest_name, guest_birth) VALUES (?, ?, ?)';
        await conn.query(CustQuery, [
          element['guest_code'],
          element['guest_name'],
          element['guest_birth'],
        ]);
      }

      for (let element of cust_detail) {
        const CustDetailQuery =
          'INSERT INTO cust_detail (guest_code, guest_hp, guest_addr, guest_mail) VALUES (?, ?, ?, ?)';
        await conn.query(CustDetailQuery, [
          element['guest_code'],
          element['guest_hp'],
          element['guest_addr'],
          element['guest_mail'],
        ]);
      }

      await conn.commit(); // 트랜잭션 커밋
      return;
    } catch (error) {
      if (conn) await conn.rollback();
      console.error(error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  //* 4. 특정 데이터 수정
  static async updateInfo({ guest_code, guest_hp, guest_addr, guest_mail }) {
    try {
      const custDetailQuery = `UPDATE cust_detail SET guest_hp=?, guest_addr=?, guest_mail=? WHERE guest_code=?`;
      const custDetailParams = [guest_hp, guest_addr, guest_mail, guest_code];
      const [data] = await pool.query(custDetailQuery, custDetailParams);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  //* 5. 특정 데이터 삭제
  static async deleteCustInfo({ guest_code }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const custDetailQuery = 'DELETE FROM cust_detail WHERE guest_code = ?';
      const custQuery = 'DELETE FROM cust WHERE guest_code = ?';

      await conn.query(custDetailQuery, [guest_code]);
      await conn.query(custQuery, [guest_code]);

      await conn.commit();

      return { success: true, message: 'Data deleted successfully.' };
    } catch (error) {
      await conn.rollback();
      console.error(error);
      throw new Error('Server Error');
    } finally {
      conn.release();
    }
  }
}

export default custService;
