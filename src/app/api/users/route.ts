import { NextResponse } from "next/server";
import { prisma } from "../../../../config/prisma";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const user = await prisma.user.findUnique({ where: { id: id as string } });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user!", error: error },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const exits = await prisma.user.findFirst({ where: { email: email } });
    if (exits) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 409 }
      );
    }
    const user = await prisma.user.create({
      data: { name, email, password },
    });

    return NextResponse.json(
      { message: "User created successfully!", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create user!", error: error },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { _id, name, email, password } = body;

    const exits = await prisma.user.findFirst({ where: { email: email } });
    if (exits && exits.id !== _id) {
      return NextResponse.json(
        { message: "User with this email already exists!" },
        { status: 409 }
      );
    }
    const user = await prisma.user.update({
      where: { id: _id },
      data: { name, email, password },
    });
    return NextResponse.json({ message: "User updated successfully!", user });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update user!",
      error: error,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { _id } = body;
    const user = await prisma.user.delete({ where: { id: _id } });
    return NextResponse.json({ message: "User deleted successfully!", user });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete", error: error });
  }
};
