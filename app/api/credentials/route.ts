
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { deleteCredentialTable } from '@/prismadb';


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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Credential ID is required' },
        { status: 400 }
      );
    }

    
    await deleteCredentialTable(id);

    return NextResponse.json(
      { message: 'Credential deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting credential:', error);
    return NextResponse.json(
      { error: 'Failed to delete credential' },
      { status: 500 }
    );
  }
}


