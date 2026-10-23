import { diskSource, firstAvailable, r2Source, serveVideo, type R2BucketLike, type VideoSource } from '@/lib/media/video-source';

// /v/<id>.(mp4|webm): vídeos com suporte a Range, lidos do R2 (binding VIDEOS, bucket cemo-videos). Fora do Workers
// (next start local, e2e) cai para media/videos no disco. Ver src/lib/media/video-source.ts.
export const dynamic = 'force-dynamic';

async function source(): Promise<VideoSource> {
  const { join } = await import('node:path');
  const disk = diskSource(join(process.cwd(), 'media/videos'));
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext({ async: true });
    const bucket = (env as { VIDEOS?: R2BucketLike }).VIDEOS;
    if (bucket) return firstAvailable(r2Source(bucket), disk);
  } catch {
    // fora do Workers
  }
  return disk;
}

export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }): Promise<Response> {
  const { file } = await params;
  return serveVideo(request, file, await source());
}
