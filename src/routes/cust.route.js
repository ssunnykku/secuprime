import { Router } from 'express';
import custController from '../controllers/cust.controller.js';

const custRouter = Router();

custRouter.get('/', custController.getData);

custRouter.get('/:guest_code', custController.edit);
// STEP_04 웹 페이지에 버튼 생성 ( 동작 : DB에 기존 Data 삭제 후 신규 파싱 Data 저장 )
custRouter.post('/update', custController.updateDb);

// STEP_06 각 로우에 대한 수정, 삭제 UI 및 동작 구성 ( UI 형태는 상관없음 )
custRouter.put('/:guest_code', custController.editInfo);
custRouter.delete('/:guest_code', custController.deleteData);

export default custRouter;
