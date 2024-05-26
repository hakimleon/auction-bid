import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignIn } from "@/components/ui/sign-in";
import { SignOut } from "@/components/ui/sign-out";
import { db } from "@/db/db";
import { revalidatePath, unstable_noStore } from "next/cache";
import { auth } from "./auth";
import { ItemsTable } from "@/db/schema";

export default async function Home() {
  const session = await auth();
   const items = await db.select().from(ItemsTable);
  if (!session) return null;
  return (
    <main className="container mx-auto py-12">
      {session ? <SignOut /> : <SignIn />}
      {session?.user?.name}

      <form
        action={async (formData: FormData) => {
          "use server";
          if (session?.user?.id !== undefined) {
            await db.insert(ItemsTable).values({
              name: formData.get("name") as string,
              userId: session?.user?.id,
            });
          }
          revalidatePath("/");
        }}
      >
        <Input
          name="name"
          type="text"
          placeholder="Name your item..."
          className="text-black "
        />
        <Button type="submit">Post Item</Button>

        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </form>
    </main>
  );
}
