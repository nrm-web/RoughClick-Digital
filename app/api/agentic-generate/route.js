import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth/session';
import { slugify, calculateReadTime } from '@/lib/db';

/**
 * Built-in Agentic Heuristic Generator
 * Generates an authoritative, agency-grade article when external LLM API key is not configured
 */
function generateHeuristicArticle({ topic, category, focusKeyword, targetAudience, tone }) {
  const kw = focusKeyword || topic;
  const safeSlug = slugify(topic || kw || 'digital-strategy-perspective');
  
  const title = topic.length <= 60 ? topic : `${topic.slice(0, 57)}...`;
  const seoTitle = `${title} | RoughClick Digital`;
  const seoDescription = `Discover how ${kw} drives measurable business outcomes. In-depth analysis on web performance, conversion architecture, and digital presence for ${targetAudience || 'modern enterprises'}.`;
  
  const excerpt = `In today's competitive landscape, ${kw} is more than a technical tactic—it is a strategic growth multiplier. Here is our agency blueprint on architecting sustainable competitive advantage.`;

  const content = `
### The Strategic Imperative of ${kw}

In modern digital marketing and technical execution, businesses frequently struggle to bridge the gap between high-level brand ambition and measurable customer acquisition. When analyzing ${topic.toLowerCase()}, the underlying issue is rarely a lack of creative ideas—it is the execution discipline and architectural foundation behind it.

For ${targetAudience || 'forward-thinking organizations'}, treating ${kw} as a periodic checklist item guarantees diminishing returns. Instead, industry leaders engineer their digital ecosystem with deliberate precision, aligning technical performance, brand positioning, and conversion friction.

### Core Architectural Pillars

To build sustainable authority, we structure our implementation around three non-negotiable principles:

1. **Velocity and Technical Stability**: Latency directly degrades trust. Whether on mobile cellular connections or gigabit desktop networks, clean code architecture ensures instant asset delivery and zero cumulative layout shifts.
2. **Contextual Authority and Discoverability**: Algorithms and decision-makers both reward relevance. Optimizing for ${kw} requires semantic depth, structured data markup, and verifiable entity authority across all business profiles.
3. **Frictionless Conversion Pathways**: Traffic without conversion is vanity. Every digital touchpoint must intuitively guide the user from passive interest to qualified inquiry via high-intent call-to-actions.

### Real-World Agency Takeaways

> **Key Insight**: Digital presence is an integrated ecosystem. Your website, social channels, and local business profiles are not isolated silos; they are interconnected nodes of a single unified reputation.

Here is the strategic checklist we implement for clients:
- **Audit your baseline metrics**: Measure Core Web Vitals, time-to-first-byte, and mobile responsiveness before launching campaigns.
- **Enforce schema integrity**: Implement structured JSON-LD data to help search engines accurately interpret your services.
- **Maintain profile consistency**: Ensure company credentials, offerings, and direct messaging channels are identical across web and map directories.

### Summary & Forward Outlook

As digital ecosystems evolve, the advantage belongs to companies that combine creative brand storytelling with relentless technical precision. Investing in ${kw} today establishes the foundation for long-term category leadership.
  `.trim();

  const tags = [
    focusKeyword || 'Digital Strategy',
    category || 'Website Services',
    'Performance',
    'Conversion'
  ].filter(Boolean);

  return {
    title,
    slug: safeSlug,
    seoTitle,
    seoDescription,
    excerpt,
    category: category || 'Website Services',
    tags,
    readTime: calculateReadTime(content),
    author: 'RoughClick Editorial',
    content,
    featured: false,
    status: 'draft'
  };
}

export async function POST(request) {
  // Session check
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { topic, category, focusKeyword, targetAudience, tone, apiKey } = body;

    if (!topic || !topic.trim()) {
      return NextResponse.json({ error: 'Topic or keyword prompt is required' }, { status: 400 });
    }

    const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY;

    // If Gemini API Key is available, invoke Gemini AI
    if (effectiveApiKey) {
      try {
        const prompt = `
You are an elite Digital Marketing Agency Content Director and Technical SEO Strategist at RoughClick Digital.
Create an in-depth, authoritative, executive-level B2B perspective article based on the following:
- Topic: "${topic}"
- Category: "${category || 'Website Services'}"
- Focus Keyword: "${focusKeyword || topic}"
- Target Audience: "${targetAudience || 'B2B Founders & Marketing Leaders'}"
- Tone: "${tone || 'Authoritative, analytical, performance-driven'}"

Return ONLY valid JSON (no markdown wrapping, no code fences) with the exact keys:
{
  "title": "Compelling SEO headline under 60 characters",
  "slug": "url-friendly-slug-under-50-chars",
  "seoTitle": "Meta title under 60 chars with brand suffix | RoughClick Digital",
  "seoDescription": "Meta description between 140 and 155 characters with clear value proposition and call to learn",
  "excerpt": "Punchy 2-sentence executive summary highlighting the business stakes and core takeaway",
  "category": "${category || 'Website Services'}",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "content": "Full article markdown body with H3 headings, bold text, bullet points, blockquote insights, and actionable agency takeaways. Minimum 400 words."
}
        `;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${effectiveApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (responseText) {
            const parsed = JSON.parse(responseText);
            return NextResponse.json({
              success: true,
              article: {
                ...parsed,
                slug: slugify(parsed.slug || parsed.title),
                readTime: calculateReadTime(parsed.content || ''),
                author: 'RoughClick Editorial',
                featured: false,
                status: 'draft'
              }
            });
          }
        }
      } catch (geminiErr) {
        console.warn('[Agentic API] Gemini call failed, falling back to heuristic engine:', geminiErr);
      }
    }

    // Fallback to high-caliber heuristic engine
    const heuristicArticle = generateHeuristicArticle({
      topic,
      category,
      focusKeyword,
      targetAudience,
      tone
    });

    return NextResponse.json({
      success: true,
      article: heuristicArticle,
      note: effectiveApiKey ? 'Generated via Engine' : 'Generated via Agentic Heuristic Mode (Add Gemini API key in settings for custom AI generation)'
    });
  } catch (err) {
    console.error('[Agentic API] Error generating article:', err);
    return NextResponse.json({ error: 'Failed to generate agentic article' }, { status: 500 });
  }
}
