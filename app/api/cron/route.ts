export async function GET() {
  const deployHookUrl =
    "https://api.vercel.com/v1/integrations/deploy/prj_MNNVBOgWRXsBFr2VCGVWBBenSw6L/wRulWQrcOc";

  const res = await fetch(deployHookUrl, { method: "POST" });

  if (res.ok) {
    return new Response("Triggered Vercel deploy", { status: 200 });
  }

  return new Response("Failed to trigger deploy", { status: 500 });
}
