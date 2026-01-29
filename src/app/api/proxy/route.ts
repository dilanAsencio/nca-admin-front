import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

// Usamos la URL completa provista por variable de entorno o fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

/**
 * Proxy genérico para todas las peticiones.
 */
export async function POST(request: NextRequest) {
  return handleProxy(request, "POST");
}

export async function GET(request: NextRequest) {
  return handleProxy(request, "GET");
}

export async function PUT(request: NextRequest) {
  return handleProxy(request, "PUT");
}

export async function DELETE(request: NextRequest) {
  return handleProxy(request, "DELETE");
}

export async function PATCH(request: NextRequest) {
  return handleProxy(request, "PATCH");
}

async function handleProxy(request: NextRequest, method: string) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint");
    if (!endpoint)
      return NextResponse.json({ error: "Endpoint required" }, { status: 400 });

    const contentType = searchParams.get("contentType");
    const microservice = searchParams.get("microservice") || "academicManagement";
    const token = request.headers.get("authorization");

    // Extrae todos los parámetros de paginación
    const page = searchParams.get("page");
    const size = searchParams.get("size");
    const search = searchParams.get("search");
    const isActive = searchParams.get("isActive");
    const status = searchParams.get("status");
    const sortParams = searchParams.getAll("sort");

    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (size) queryParams.append("size", size);
    if (search) queryParams.append("search", search);
    if (isActive) queryParams.append("isActive", isActive);
    if (status) queryParams.append("status", status);
    sortParams.forEach((s) => queryParams.append("sort", s));
    let fullEndpoint = endpoint;

    queryParams.toString() && (fullEndpoint = `${endpoint.includes("?") ? `${endpoint}&${queryParams.toString()}` : `${endpoint}?${queryParams.toString()}`}`);

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
      // baseURL ya está configurado en la instancia 'api'
      url: fullEndpoint,
      method,
      data: body,
      headers: {
        ...(token ? { Authorization: token } : {}),
        // Si el cliente envía X-Tenant-ID, úsalo. Si no, usa el default.
        "X-Tenant-ID": request.headers.get("x-tenant-id") || process.env.TENANT_ID || "demo-colegio",
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
