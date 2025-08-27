import qs from "qs";
import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiUrl } from "@/utils/getStrapiUrl";

const Base_URL = getStrapiUrl();

/* -------------------- HOME PAGE -------------------- */
const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            CtaButtons: {
              fields: ["text", "href", "isExternal"],
            },
          },
        },
        "blocks.pimpinan-opd": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        "blocks.contact": {
          fields: ["name", "number", "email", "map"],
        },
      },
    },
  },
});

export async function getHomePage() {
  const path = "/api/home";
  const url = new URL(path, Base_URL);
  url.search = homePageQuery;
  return await fetchAPI(url.href, { method: "GET" });
}

/* -------------------- POSTS -------------------- */
const postsQuery = qs.stringify({
  populate: {
    image: {
      fields: ["url", "alternativeText", "formats"],
    },
    category: {
      fields: ["name", "slug"],
    },
  },
  sort: ["publishat:desc"], // latest first
  pagination: {
    pageSize: 100, // <-- fetch up to 100 posts
  },
});


export async function getPosts() {
  const path = "/api/posts";
  const url = new URL(path, Base_URL);
  url.search = postsQuery;
  return await fetchAPI(url.href, { method: "GET" });
}

/* -------------------- CATEGORIES -------------------- */
const categoriesQuery = qs.stringify({
  fields: ["name", "slug"],
  sort: ["name:asc"],
});

export async function getCategories() {
  const path = "/api/categories";
  const url = new URL(path, Base_URL);
  url.search = categoriesQuery;
  return await fetchAPI(url.href, { method: "GET" });
}

/* -------------------- PAGES BY SLUG -------------------- */
const pageBySlugQuery = (slug: string) =>
  qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              CtaButtons: {
                fields: ["text", "href", "isExternal"],
              },
            },
          },
          "blocks.pimpinan-opd": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
        },
      },
    },
  });

export async function getPageBySlug(slug: string) {
  const path = "/api/pages";
  const url = new URL(path, Base_URL);
  url.search = pageBySlugQuery(slug);
  return await fetchAPI(url.href, { method: "GET" });
}

/* -------------------- GLOBAL SETTINGS -------------------- */
const globalSettingsQuery = qs.stringify({
  populate: {
    header: {
      populate: {
        logo: {
          populate: {
            image: { fields: ["url", "alternativeText"] },
            image2: { fields: ["url", "alternativeText"] },
          },
        },
        navigation: {
          populate: {
            children: {
              populate: {
                ctachild: {
                  populate: true, // <-- include 3rd level
                },
              },
            },
          },
        },
      },
    },
    footer: {
      populate: {
        logo: {
          populate: {
            image: { fields: ["url", "alternativeText"] },
            image2: { fields: ["url", "alternativeText"] },
          },
        },
        navigation: {
          populate: {
            children: {
              populate: {
                ctachild: {
                  populate: true, // <-- also here for footer if needed
                },
              },
            },
          },
        },
      },
    },
  },
});


export async function getGlobalSettings() {
  const path = "/api/global";
  const url = new URL(path, Base_URL);
  url.search = globalSettingsQuery;
  return fetchAPI(url.href, { method: "GET" });
}

// Add this to your @/Data/loaders.ts file

/* -------------------- POST BY SLUG -------------------- */
const postBySlugQuery = (slug: string) =>
  qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: {
        fields: ["url", "alternativeText", "formats"],
      },
      category: {
        fields: ["name", "slug"],
      },
      pdf: {
        fields: ["url", "name", "alternativeText"],
      },
      pdfs: {
        fields: ["url", "name", "alternativeText"],
      },
    },
  });

export async function getPostBySlug(slug: string) {
  const path = "/api/posts";
  const url = new URL(path, Base_URL);
  url.search = postBySlugQuery(slug);
  const response = await fetchAPI(url.href, { method: "GET" });
  
  // Return the first post if found, otherwise null
  return response.data && response.data.length > 0 ? response.data[0] : null;
}
