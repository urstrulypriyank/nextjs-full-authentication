import { useRouter, useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = useSearchParams();
  console.log(params);
  return NextResponse.json({
    message: "works",
    success: true,
  });
}
