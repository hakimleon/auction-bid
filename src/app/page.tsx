import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db/db";
import { bidsTable  } from "@/db/schema";
import { revalidatePath, unstable_noStore } from "next/cache";

export default async function Home() {
  unstable_noStore();

  const bidses = await db.select({name: bidsTable.bid }).from(bidsTable);
  return (
    <main className="container mx-auto py-12">
      <pre>{JSON.stringify(bidses, null, 2)}</pre>
      <form
        action={async (formData: FormData) => {
          "use server";

             const bid = formData.get('bid') as string
          await db.insert(bidsTable).values({id: crypto.randomUUID(), bid: bid});
          revalidatePath('/');
        }}
      >
        <Input name="bid" type="number" placeholder="Bid" className="text-black " />
        <Button type="submit">Place Bid</Button>
      </form>
    </main>
  );
}
