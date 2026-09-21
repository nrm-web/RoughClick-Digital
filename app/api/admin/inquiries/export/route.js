import { NextResponse } from 'next/server';
import { getInquiries } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function escapeCsvField(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET() {
  try {
    const inquiries = await getInquiries();

    const headers = [
      'Inquiry ID',
      'Date (Local)',
      'Timestamp (ISO)',
      'Client Name',
      'Email Address',
      'Phone Number',
      'Company / Business',
      'Service Interested In',
      'Message',
      'Source'
    ];

    const rows = inquiries.map((inq) => {
      const localDate = inq.createdAt
        ? new Date(inq.createdAt).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })
        : '';

      return [
        escapeCsvField(inq.id || ''),
        escapeCsvField(localDate),
        escapeCsvField(inq.createdAt || ''),
        escapeCsvField(inq.name || ''),
        escapeCsvField(inq.email || ''),
        escapeCsvField(inq.phone || ''),
        escapeCsvField(inq.company || ''),
        escapeCsvField(inq.service || ''),
        escapeCsvField(inq.message || ''),
        escapeCsvField(inq.source || 'Website Contact')
      ].join(',');
    });

    // Prepend UTF-8 BOM for Microsoft Excel / Google Sheets compatibility
    const csvContent = '\uFEFF' + [headers.map(escapeCsvField).join(','), ...rows].join('\r\n');

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `roughclick-inquiries-${timestamp}.csv`;

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
  } catch (error) {
    console.error('[Export Inquiries API] Error generating CSV:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate CSV export' },
      { status: 500 }
    );
  }
}
