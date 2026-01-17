import { Request,Response } from "express";
import bcrypt from "bcryptjs";
import jwt, {SignOptions} from "jsonwebtoken";
import { User } from "../models/User";
import { bad,created,ok,unauthorized } from "../utils/response";

//create token

function signtoken(userId:string): string {
 const secret = process.env.JWT_SECRET;

  // ✅ ensure secret is string
  if (!secret) {
    throw new Error("JWT_SECRET missing in .env");
  }

  // ✅ FIX expiresIn type properly
  const expiresInEnv = process.env.JWT_EXPIRES_IN || 60 * 60 * 24 * 7;;

   const options: SignOptions = {
    // expiresIn: Number(expiresInEnv) ?? "7d" ,
     expiresIn: Number(expiresInEnv) || 60 * 60 * 24 * 7,
  };   

 return jwt.sign({userId}, secret, options);
}

//register

export async function register(req:Request,res:Response) {

    try {
        const{name,email,password} = req.body;
        if(!name || !email ||!password) return bad(res,"all fields required");
        if(String(password).length <6) return bad(res,"pswd must be 6 length");

        const ex = await User.findOne({email:String(email).toLowerCase()});

        if(ex) return bad(res,"email already register");

        const hashed = await bcrypt.hash(String(password),10);

        const user = await User.create ({
            name:String(name),
            email:String(email).toLowerCase(),
            password:hashed
        });

        const token = signtoken(user._id.toString());
        return created(res,"registersuccessfully",{token, user:{id:user._id,name:user.name,email:user.email}});

    } catch(err) {
        console.error(err);
    }
    
}

//login
export async function login(req:Request,res:Response) {

    try {
        const{email,password} = req.body;
        if(!email ||!password) return bad(res,"all fields required");
        const user = await User.findOne({email:String(email).toLowerCase()});
        if(!user) return unauthorized(res,"invalid email");

       const match = await bcrypt.compare(String(password),user.password);
       if(!match) return unauthorized(res,"invalid email or password");
        
        const token = signtoken(user._id.toString());
        return ok(res,"login successfully",{token, user:{id:user._id,name:user.name,email:user.email}});

    } catch(err) {
        console.error(err);
    }
    
}