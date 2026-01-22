import jwt from "jsonwebtoken";
 
export const generateJsonWebToken = (user) => {
console.log("user data", user);
 return jwt.sign(
    {id : user._id , role : user.role},
    process.env.JWT_SECRET,
    {expiresIn : "7d"}
 );
}