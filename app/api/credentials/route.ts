
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const credential = await prisma.credentialTable.create({
    data: {
      name: body.name,
      type: body.type,
      appId: body.appId,
      clientId: body.clientId,
      secret: body.secret,
      action: body.action ?? '', 
    },
  });
  return new Response(JSON.stringify(credential), { status: 201 });
}