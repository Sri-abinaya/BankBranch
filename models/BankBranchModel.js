import mongoose from 'mongoose'
 
   
var csvSchema = new mongoose.Schema({  
    ifsc:{  
        type:String  
    },  
    bank_id:{  
        type:String  
    },  
    branch:{  
        type:String  
    },  
    address:{  
        type:String
    },  
    city:{  
        type:String  
    },  
    district:{  
        type:String  
    },  
    state:{  
        type:String  
    },  
    bank_name:{  
        type:String  
    } 
});  
   
export default mongoose.model('BankBranchModel',csvSchema);  