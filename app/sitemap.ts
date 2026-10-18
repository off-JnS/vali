import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/produkte/", "/ueber-uns/", "/impressum/", "/datenschutz/"].map((path) => ({
    url: new URL(path, site.url).toString(),
  }));
}
