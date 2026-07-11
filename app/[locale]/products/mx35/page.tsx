import { redirect } from "next/navigation"; export default async function Legacy({params}:{params:Promise<{locale:string}>}){const{locale}=await params;redirect(`/${locale}/products/hl-35`)}
