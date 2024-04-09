import express from "express";
import {updateRequestStatus, createNewRequest, getRequestDetails} from '../controllers/userRequests.js'

const router = express.Router()

router.post('/create_user_request', createNewRequest)
router.put('/user_request/:requestId', updateRequestStatus)
router.get('/user-request/:requestId',getRequestDetails)

export default router