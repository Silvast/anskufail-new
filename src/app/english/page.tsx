import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";

// Types
type WordPressMedia = {
  source_url: string;
  alt_text?: string;
  media_details?: {
    sizes: {
      full: {
        source_url: string;
      }
    }
  }
};

type WordPressPage = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: WordPressMedia[];
  };
};

// Constants
const API_URL = "https://public-api.wordpress.com/wp/v2/sites/anskufail.wordpress.com/pages/198";
const FALLBACK_IMAGE = "/images/profile.jpg";
const CACHE_REVALIDATION = 3600; // 1 hour

// Data fetching
async function getEnglishPage(): Promise<WordPressPage> {
  try {
    const res = await fetch(
      `${API_URL}?_embed`,
      { next: { revalidate: CACHE_REVALIDATION } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch English page: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching English page:", error);
    notFound();
  }
}

// Extract featured image helper
function getFeaturedImage(page: WordPressPage): string {
  return page._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.full?.source_url ||
    page._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    FALLBACK_IMAGE;
}

// Loading component
function EnglishPageLoading() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="animate-pulse space-y-8">
          {/* Card with title and content */}
          <div className="bg-white rounded-xl shadow-md p-8">
            {/* Profile and Title Section */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-40 h-40 bg-gray-200 rounded-full mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-2/3 max-w-md"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3 mt-4"></div>
            </div>

            {/* Content placeholders */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mt-6"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// English page content component
async function EnglishPageContent() {
  const page = await getEnglishPage();
  const featuredImageUrl = getFeaturedImage(page);

  return (
    <>
      {/* Main Content Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-12">
        {/* Profile and Title Section */}
        <div className="flex flex-col items-center mb-10">
          {/* <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-lg border-4 border-white mb-6 ring-2 ring-gray-100">
            <Image
              src={featuredImageUrl}
              alt="Profile picture"
              width={500}
              height={500}
              className="w-full h-full object-cover"
              priority
            />
          </div> */}

          <h1 className="text-3xl md:text-4xl font-bold text-center">
            About Anne-Mari Silvast
          </h1>

          <div className="flex items-center gap-4 mt-4 text-gray-600">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span>IT Professional</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Helsinki</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="prose prose-lg max-w-none about-content mx-auto"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </div>
    </>
  );
}

export default function EnglishPage() {
  return (
    <div className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Suspense fallback={<EnglishPageLoading />}>
          <EnglishPageContent />
        </Suspense>
      </div>
    </div>
  );
} 