import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import './styles.css';
// Define the WordPress post interface
type WordPressPost = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: [{
      source_url: string;
    }];
  };
};

// Types for the Next.js page props
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Constants
const API_BASE_URL = "https://public-api.wordpress.com/wp/v2/sites/anskufail.wordpress.com";
const CACHE_REVALIDATION = 3600; // 1 hour

// Function to fetch all posts (for generating static paths)
async function getAllPosts(): Promise<WordPressPost[]> {
  const res = await fetch(
    `${API_BASE_URL}/posts`,
    { next: { revalidate: CACHE_REVALIDATION } }
  );
  
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return res.json();
}

// Function to fetch a post by slug
async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const res = await fetch(
    `${API_BASE_URL}/posts?slug=${slug}&_embed`,
    { cache: 'no-store' } // Disable caching to always fetch fresh data
  );
  
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  
  const posts = await res.json();
  return posts.length > 0 ? posts[0] : null;
}

// Format the published date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Simple HTML entity decoder built into the component
function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ');
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  // Await the params object before accessing its properties
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  // Decode the HTML entities in the title
  const title = decodeHtml(post.title.rendered);
  
  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all posts
            </Link>
          </div>
          
          <article>
            <header className="mb-8">
              <time className="text-sm text-gray-500 block mb-3">{formatDate(post.date)}</time>
              <h1 className="text-3xl sm:text-4xl font-bold mb-6">{title}</h1>
              
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={title}
                    width={1000}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </header>
            
            <div 
              className="prose prose-lg max-w-none prose-img:my-8 prose-headings:mt-8 prose-headings:mb-4 prose-p:my-5 prose-li:my-2 text-lg post-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}