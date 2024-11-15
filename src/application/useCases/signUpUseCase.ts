"use server";
import "server-only";

export async function signUp(prevState: any, formData: FormData) {
  const email = formData.get("email");
  console.log("email", email);
}
