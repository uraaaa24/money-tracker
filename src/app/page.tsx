import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {

  // NOTE: これを使ってバックエンドに認証情報を渡す
  const data = await auth()
  const token = await data.getToken({ template: process.env.CLERK_JWT_TEMPLATE_NAME })

  console.log(data)
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  console.log(token)


  return (
    <div>
      Hello World!
      <Button variant="default">Default</Button>
    </div>
  )
}
