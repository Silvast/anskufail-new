import Link from "next/link";
import Image from "next/image";

// Define the WordPress post interface
interface WordPressPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
    }[];
  };
}

// Function to fetch WordPress posts
async function getPosts() {
  const res = await fetch(
    "https://public-api.wordpress.com/wp/v2/sites/anskufail.wordpress.com/posts?_embed",
    { next: { revalidate: 3600 } } // Revalidate every hour
  );
  
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return res.json();
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

// Remove HTML tags from rendered content
function stripHtml(html: string) {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

export default async function BlogPage() {
  const posts: WordPressPost[] = await getPosts();
  
  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
          
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600">No blog posts found.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {posts.map((post) => (
                <article key={post.id} className="border-b pb-10">
                  <div className="mb-4">
                    <time className="text-sm text-gray-500">{formatDate(post.date)}</time>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                      {post.title.rendered}
                    </Link>
                  </h2>
                  <div 
                    className="text-gray-600 mb-6"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 