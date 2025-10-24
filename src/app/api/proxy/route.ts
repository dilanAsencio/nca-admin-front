import { NextResponse } from "next/server";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL_SERVER || "http://localhost:8080",
});

/**
 * Proxy genérico para todas las peticiones.
 */
export async function POST(request: Request) {
  return handleProxy(request, "POST");
}

export async function GET(request: Request) {
  return handleProxy(request, "GET");
}

export async function PUT(request: Request) {
  return handleProxy(request, "PUT");
}

export async function DELETE(request: Request) {
  return handleProxy(request, "DELETE");
}

export async function PATCH(request: Request) {
  return handleProxy(request, "PATCH");
}

async function handleProxy(request: Request, method: string) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint");
    const contentType = searchParams.get("contentType");
    const token = request.headers.get("authorization");

    if (!endpoint)
      return NextResponse.json({ error: "Endpoint required" }, { status: 400 });

    let body: any = undefined;

    if (contentType?.includes("multipart/form-data")) {
      // ✅ No parseamos el FormData, lo reenviamos como stream
      body = await request.formData();
    } else if (method !== "GET" && method !== "DELETE") {
      try {
        const text = await request.text();
        body = text ? JSON.parse(text) : undefined;
      } catch {
        body = undefined;
      }
    }

    const response = await api.request({
      url: endpoint,
      method,
      data: body,
      headers: {
        ...(token ? { Authorization: token } : {}),
        "X-Tenant-ID": process.env.TENANT_ID || "demo-colegio",
        ...(contentType ? { "Content-Type": contentType } : {}),
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: error.message, details: error.response?.data },
      { status: error.response?.status || 500 }
    );
  }
}
