
import { supabase } from "@/integrations/supabase/client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path');
  
  if (!path) {
    return new Response('Path parameter is required', { status: 400 });
  }
  
  try {
    // Extract bucket name from path (assuming format: bucketName/filePath)
    const bucketName = 'past-questions'; // Set explicit bucket name
    
    console.log(`Attempting to download file from bucket: ${bucketName}, path: ${path}`);
    
    // Get file from Supabase storage
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .download(path);
    
    if (error) {
      console.error('Supabase storage error:', error);
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!data) {
      return new Response('File not found', { status: 404 });
    }
    
    // Return file with appropriate content type
    const fileName = path.split('/').pop() || 'file';
    const contentType = getContentType(fileName);
    
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    return new Response('Server error', { status: 500 });
  }
}

// Helper function to determine content type based on file extension
function getContentType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf': return 'application/pdf';
    case 'doc': return 'application/msword';
    case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'xls': return 'application/vnd.ms-excel';
    case 'xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'png': return 'image/png';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    default: return 'application/octet-stream';
  }
}
