import { Router } from 'express';
import custController from '../controllers/cust.controller.js';

const custRouter = Router();

//* 1. cust, cust_detail 전체 목록 조회
custRouter.get('/', custController.getData);

//* 2. cust, cust_detail 특정 데이터 조회
custRouter.get('/:guest_code', custController.getCustomerDetail);

//* 3. "STEP_02 "에서 제시된 데이터 파싱 후 파싱한 Data DB에 저장
custRouter.post('/update', custController.updateDb);

//* 4. 특정 데이터 수정
custRouter.put('/:guest_code', custController.editInfo);

//* 5. 특정 데이터 삭제
custRouter.delete('/:guest_code', custController.deleteData);

export default custRouter;
