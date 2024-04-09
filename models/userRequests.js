import mongoose from 'mongoose';

const userRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "worker"
    },
    serviceId: String,
    requiredServices: [String],
    additionalServices: [String],
//     addressId:{
//   type: Schema.Type.ObjectId,
//   ref: "Address"
//     } ,
    propertyImage: String,
    propertyArea: String,
    propertySpaceType: String,
    status: {
        type:Number,
        enum: [0,1,2,3,4],  // 1 for created,2 for accepted,3 for denied, for proposal created
        default: 1
      },
      proposalId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Proposal"
      },
      date: {
        type: Date,
        default: Date.now
    },
    action: {
        type: String
    }
    }, { timestamps: true });

const UserRequestModel = mongoose.model('UserRequest', userRequestSchema);

export default UserRequestModel;
