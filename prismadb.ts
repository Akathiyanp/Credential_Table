"use server";
import { prisma } from "./prismaClient";

const sendCredentialTable = async () => {
  const count = await prisma.credentialTable.count();

  await prisma.credentialTable.createMany({
    data: [
      {
        id: "1",
        name: "rishi",
        type: "AWS",
        appId: "a01",
        clientId: "001",
        secret: "hidden_value",
        action: "view",
      },
      {
        id: "2",
        name: "bala",
        type: "S3",
        appId: "a02",
        clientId: "002",
        secret: "hidden_value",
        action: "view",
      },
      {
        id: "3",
        name: "ram",
        type: "Azure",
        appId: "a03",
        clientId: "003",
        secret: "hidden_value",
        action: "view",
      },
      {
        id: "4",
        name: "arun",
        type: "Google",
        appId: "a04",
        clientId: "004",
        secret: "hidden_value",
        action: "view",
      },
      {
        id: "5",
        name: "priya",
        type: "AWS",
        appId: "a05",
        clientId: "005",
        secret: "hidden_value",
        action: "view",
      },
      {
        id: "6",
        name: "kumar",
        type: "Azure",
        appId: "a06",
        clientId: "006",
        secret: "hidden_value",
        action: "view",
      },
      {
        id: "7",
        name: "neha",
        type: "Google",
        appId: "a07",
        clientId: "007",
        secret: "hidden_value",
        action: "view",
      },
    ],
  });
};

// sendCredentialTable();

export async function getCredentialTables() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await prisma.credentialTable.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCredentialTable(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await prisma.credentialTable.findUnique({
    where: { id: id },
  });
}

export async function addCredentialTable(
  id: string,
  name: string,
  type: string,
  appId: string,
  clientId: string,
  secret: string,
  action: string
) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await prisma.credentialTable.create({
    data: { name, type, appId, clientId, secret, action },
  });
}

export async function updateCredentialTable(
  id: string,
  name: string,
  type: string,
  appId: string,
  clientId: string,
  secret: string,
  action: string
) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await prisma.credentialTable.update({
    where: { id: id },
    data: { name, type, appId, clientId, secret, action },
  });
}

export async function deleteCredentialTable(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await prisma.credentialTable.delete({
    where: { id: id },
  });
}

export async function addCredential(body: {
  name: string;
  type: string;
  appId: string;
  clientId: string;
  secret: string;
  action?: string;
}) {
  const credential = await prisma.credentialTable.create({
    data: {
      name: body.name,
      type: body.type,
      appId: body.appId,
      clientId: body.clientId,
      secret: body.secret,
      action: body.action ?? "",
    },
  });
}

export async function deleteCredential(id: string) {
  try {
    await prisma.credentialTable.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error deleting credential from database:", error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCredential(id: string, data: any) {
  return await prisma.credentialTable.update({
    where: { id },
    data: data,
  });
}
