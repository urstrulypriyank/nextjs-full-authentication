import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
const getTokenData = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || 0;
    const token_value = jwt.verify(token, process.env.JWT_SECRET);
    return token_value._id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getTokenData;
