import qs from "qs";
import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiUrl } from "@/utils/getStrapiUrl";

const Base_URL = getStrapiUrl();

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        } ,
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
},
);

export async function getHomePage() {
    const path = "/api/home";
    const url = new URL(path, Base_URL);
    url.search = homePageQuery;

    return await fetchAPI(url.href, { method: "GET" });
}

const pageBySlugQuery = (slug: string) => qs.stringify(
  {
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
            },
          },
          "blocks.pimpinan-opd": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
        }
      }
    },
  }
);

export async function getPageBySlug(slug: string) {
  const path = "/api/pages";
  const url = new URL(path, Base_URL);
  url.search = pageBySlugQuery(slug);
  return await fetchAPI(url.href, { method: "GET" });
}

const globalSettingsQuery = qs.stringify(
  {
  populate: {
    header: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: {
          populate: {
            children: {
              populate: true,
            },
          },
        },
      },
    },
    footer: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: {
          populate: {
            children: {
              populate: true,
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