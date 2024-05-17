import mongoose from "mongoose";

export interface Auth extends mongoose.Document {
  wallet: string;
  nonce: string;
}

const AuthSchema = new mongoose.Schema<Auth>({
  wallet: {
    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  nonce: {
    type: String,
    required: [true, "Please provide the pet owner's name"],
    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
});

export default mongoose.models.Auth || mongoose.model<Auth>("Auth", AuthSchema);
