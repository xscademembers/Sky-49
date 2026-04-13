/**
 * Cloudflare Pages Function — POST /api/contacts
 * Local development: use Express (`npm run server`) via Astro proxy.
 */

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  wantsBrochure?: boolean;
}

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  const { request } = context;
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body.firstName || !body.phone || !body.interest) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log('[sky49] contact lead', {
    ...body,
    source: 'cloudflare-pages',
    at: new Date().toISOString(),
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
