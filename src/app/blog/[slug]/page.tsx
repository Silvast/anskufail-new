import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Define the WordPress post interface
interface WordPressPost {
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
}

// Function to fetch all posts (for generating static paths)
async function getAllPosts() {
  const res = await fetch(
    "https://public-api.wordpress.com/wp/v2/sites/anskufail.wordpress.com/posts",
    { next: { revalidate: 3600 } }
  );
  
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return res.json();
}

// Function to fetch a post by slug
async function getPostBySlug(slug: string) {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/anskufail.wordpress.com/posts?slug=${slug}&_embed`,
    { next: { revalidate: 3600 } }
  );
  
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  
  const posts = await res.json();
  return posts.length > 0 ? posts[0] : null;
}

// Format the published date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export async function generateStaticParams() {
  const posts: WordPressPost[] = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
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
              <h1 className="text-3xl sm:text-4xl font-bold mb-6">{post.title.rendered}</h1>
              
              {post._embedded && post._embedded["wp:featuredmedia"] && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title.rendered}
                    width={1000}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              <div 
                className="text-lg text-gray-600 italic mb-6 border-b pb-6"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            </header>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </article>
        </div>
      </div>
    </div>
  );
} 