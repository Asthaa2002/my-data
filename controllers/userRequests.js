import userRequestSchema from "../models/userRequests.js";
// import { partnerSchema } from ''; 
import ShortUniqueId from 'short-unique-id';


export  const createNewRequest= async(req, res)=> {
    try {
       
        const {   userId,  requiredServices, workerId, additionalServices,  propertyImage, propertyArea, propertySpaceType } = req.body;
        const uid = new ShortUniqueId({ length: 10 });
        // const unId = uid();
        const uuid = uid.rnd();
       
        const newUserRequest = new userRequestSchema({
            userId, 
            serviceId: `SERVICE_${uuid}`.toUpperCase(),
            workerId,
            requiredServices,
            additionalServices,
            propertyImage,
            propertyArea,
            propertySpaceType,
            status: 1, // Assuming status 1 represents 'Created' status
           
        });

        // Save the new user request entry
        await newUserRequest.save();

        // Send success response
        return res.status(201).json({message: "user request created successfully",newUserRequest})

    } catch (error) {
        console.error("Error creating user request details:", error);
        return res.status(500).send({ error: "An error occurred." });
    }
}


export const updateRequestStatus = async (req, res) => {
    const { requestId } = req.params;
    const { action } = req.body; // Extract action from request body

    try {
        const foundRequest = await userRequestSchema.findById(requestId);
        if (!foundRequest) {
            return res.status(404).send({ error: "User request not found." });
        }

        // Check if action is valid (either "accept" or "deny")
        if (action === "accept") {
            foundRequest.status = 2; // Update status to 2 for accept
        } else if (action === "deny") {
            foundRequest.status = 3; // Update status to 3 for deny
        } else {
            return res.status(400).send({ error: "Invalid action. Please specify 'accept' or 'deny'." });
        }
        if (proposalId) {
            foundRequest.status = 4; // Update status to 4 for proposal created
        }

        await foundRequest.save();
        return res.status(200).send({ msg: `User request status updated successfully. New status: ${foundRequest.status}` });

    } catch (error) {
        console.error("Error updating user request status:", error);
        return res.status(500).send({ error: "An error occurred." });
    }
};



export const getAcceptedRequests = async (req, res) => {
    try {
        const {requestId} = req.params;
        
        const foundRequest = await userRequestSchema.findById(requestId);
        if (!foundRequest) {
            return res.status(404).send({ error: "User request not found." });
        }
        const acceptedRequests = await userRequestSchema.find({ status: 2});

        
        return res.status(200).json({message: "accepted requests", acceptedRequests});

    } catch (error) {
        console.error("Error fetching accepted user requests:", error);
        return res.status(500).send({ error: "An error occurred." });
    }
};

export const getRequestDetails = async (req, res) => {
    try {
        
        const { requestId } = req.params;

      
        const userRequest = await userRequestSchema.findById(requestId).populate('userId').populate('workerId');
        if (!userRequest) {
            return res.status(404).send({ error: "User request not found." });
        }
        const userDetails = userRequest.userId;
        const workerDetails = userRequest.workerId;
        return res.status(200).send({ 
            userRequestDetails: userRequest,
            userDetails,
            workerDetails
        });

    } catch (error) {
        console.error("Error fetching user request details:", error);
        return res.status(500).send({ error: "An error occurred." });
    }
};

