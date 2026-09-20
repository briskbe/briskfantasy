import { requireCmsSession } from "@/lib/cms/auth";
import { CmsShell } from "@/components/cms/cms-shell";

export const dynamic = "force-dynamic";

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const session = await requireCmsSession();
  return <CmsShell user={{ name: session.user.name, email: session.user.email }}>{children}</CmsShell>;
}
