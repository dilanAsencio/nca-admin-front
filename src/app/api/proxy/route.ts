import { NextResponse } from "next/server";
import axios from "axios";

/**
 * Creates an axios instance with the base URL and headers.
 */
const api = axios.create({
  baseURL: process.env.API_URL_SERVER || 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
    'X-Tenant-ID': process.env.TENANT_ID || 'demo-colegio'
  },
});

/**
 * Proxies a request to the given endpoint, using the provided method and data.
 * If an authHeader is provided, it is added to the request headers.
 *
 * @param {string} method - The HTTP method to use for the request.
 * @param {string} endpoint - The endpoint to proxy the request to.
 * @param {any} [body] - The data to send with the request.
 * @param {string} [authHeader] - The authorization header to add to the request.
 *
 * @returns {Promise<NextResponse>} The proxied response.
 */
async function handleProxy(method: string, endpoint: string, body?: any, authHeader?: string) {
  try {
    const config: any = {
      url: endpoint,
      method,
      data: body,
      headers: {
        "Content-Type": "application/json",
        "X-Tenant-ID": process.env.TENANT_ID,
      },
    };
    if (authHeader) {
      config.headers['Authorization'] = authHeader;
    }
    const response = await api.request(config);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, details: error.response?.data },
      { status: error.response?.status || 500 }
    );
  }
}

/**
 * Proxies a GET request to the given endpoint.
 * If an authHeader is provided, it is added to the request headers.
 *
 * @param {Request} request - The request object.
 *
 * @returns {Promise<NextResponse>} The proxied response.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  if (!endpoint) return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
  const authHeader = request.headers.get("authorization")?.toString();
  return handleProxy("get", endpoint, undefined, authHeader);
}

/**
 * Proxies a POST request to the given endpoint.
 * If an authHeader is provided, it is added to the request headers.
 * The request body is parsed as JSON if it exists.
 *
 * @param {Request} request - The request object.
 *
 * @returns {Promise<NextResponse>} The proxied response.
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  if (!endpoint) return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
  const authHeader = request.headers.get("authorization")?.toString();
  
  let body = undefined;
  try {
    // Solo intenta parsear si hay contenido
    const text = await request.text();
    body = text ? JSON.parse(text) : undefined;
  } catch (err) {
    body = undefined;
  }

  return handleProxy("post", endpoint, body, authHeader);
}

/**
 * Proxies a PUT request to the given endpoint.
 * If an authHeader is provided, it is added to the request headers.
 * The request body is parsed as JSON if it exists.
 *
 * @param {Request} request - The request object.
 *
 * @returns {Promise<NextResponse>} The proxied response.
 */
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  if (!endpoint) return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
  const authHeader = request.headers.get("authorization")?.toString();
  
  let body = undefined;
  try {
    // Solo intenta parsear si hay contenido
    const text = await request.text();
    body = text ? JSON.parse(text) : undefined;
  } catch (err) {
    body = undefined;
  }

  return handleProxy("put", endpoint, body, authHeader);
}

/**
 * Proxies a DELETE request to the given endpoint.
 * If an authHeader is provided, it is added to the request headers.
 *
 * @param {Request} request - The request object.
 *
 * @returns {Promise<NextResponse>} The proxied response.
 */
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  if (!endpoint) return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
  const authHeader = request.headers.get("authorization")?.toString();
  return handleProxy("delete", endpoint, undefined, authHeader);
}

/**
 * Proxies a PATCH request to the given endpoint.
 * If an authHeader is provided, it is added to the request headers.
 * The request body is parsed as JSON if it exists.
 *
 * @param {Request} request - The request object.
 *
 * @returns {Promise<NextResponse>} The proxied response.
 */
export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  if (!endpoint) return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
  const authHeader = request.headers.get("authorization")?.toString();
  
  let body = undefined;
  try {
    // Solo intenta parsear si hay contenido
    const text = await request.text();
    body = text ? JSON.parse(text) : undefined;
  } catch (err) {
    body = undefined;
  }
  
  return handleProxy("patch", endpoint, body, authHeader);
}