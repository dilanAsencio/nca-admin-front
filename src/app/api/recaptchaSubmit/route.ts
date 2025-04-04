import axios from "axios";
import { NextResponse } from "next/server";

const secretKey = process.env.RECAPTCHA_SECRET_KEY || "RECAPTCHA_SECRET_KEY";

export async function POST(req: Request) {
  // verifica si la peticion es post POST
  if (req.method !== "POST") {
    return new NextResponse(
      JSON.stringify({ message: "Only POST requests allowed" }),
      { status: 405 }
    );
  }
  if (!secretKey) {
    return NextResponse.json({
      success: false,
      error: "The secret key ReCaptcha not found",
    });
  }

  let response;
  try {
    const data = await req.json();
    const { token } = data;

    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);

    if (!token) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Token not found." }),
        {
          status: 405,
        }
      );
    }
    response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }

  if (response && response.data.success) {
    return new NextResponse(
      JSON.stringify({ success: true, message: "Success" }),
      {
        status: 200,
      }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Failed to verify" }),
      {
        status: 405,
      }
    );
  }
}
