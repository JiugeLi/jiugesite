import { NextResponse } from 'next/server';
import axios from 'axios';
import { load } from 'cheerio';
import { URL } from 'url';

function resolveUrl(href: string, baseUrl: string) {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }
  if (href.startsWith('//')) {
    return 'https:' + href;
  }
  if (href.startsWith('/')) {
    return baseUrl + href;
  }
  return baseUrl + '/' + href;
}

async function fetchLogo(websiteUrl: string) {
  try {
    const url = new URL(websiteUrl);
    const baseUrl = `${url.protocol}//${url.host}`;

    const response = await axios.get(websiteUrl, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const html = response.data;
    const $ = load(html);

    let logoUrl = $('link[rel="apple-touch-icon"]').attr('href');
    if (logoUrl) return resolveUrl(logoUrl, baseUrl);

    logoUrl = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');
    if (logoUrl) return resolveUrl(logoUrl, baseUrl);

    const faviconUrl = `${baseUrl}/favicon.ico`;
    try {
      await axios.head(faviconUrl, { timeout: 3000 });
      return faviconUrl;
    } catch (err) {}

    return `https://www.google.com/s2/favicons?domain=${url.host}&sz=64`;
  } catch (error) {
    try {
      const url = new URL(websiteUrl);
      return `https://www.google.com/s2/favicons?domain=${url.host}&sz=64`;
    } catch (err) {
      return null;
    }
  }
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return new NextResponse('URL is required', { status: 400 });

    const logoUrl = await fetchLogo(url);
    return NextResponse.json({ logoUrl });
  } catch (error) {
    console.error('[FETCH_LOGO]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
