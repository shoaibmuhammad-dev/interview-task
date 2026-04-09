import HomePage from "@/components/home/HomePage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home Page",
  description: "Home page",
};

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/");
  } else {
    redirect("/login");
  }

  return <HomePage />;
}
