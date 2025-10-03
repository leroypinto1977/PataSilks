import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(500),
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
        },
      ],
    }),
    defineField({
      name: "price",
      title: "Price (in INR)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price (in INR)",
      type: "number",
      description: "Original price before discount (optional)",
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Important for SEO and accessibility",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fabric",
      title: "Fabric Type",
      type: "string",
      options: {
        list: [
          { title: "Pure Silk", value: "pure-silk" },
          { title: "Kanjivaram Silk", value: "kanjivaram-silk" },
          { title: "Banarasi Silk", value: "banarasi-silk" },
          { title: "Tussar Silk", value: "tussar-silk" },
          { title: "Chiffon", value: "chiffon" },
          { title: "Georgette", value: "georgette" },
          { title: "Cotton Silk", value: "cotton-silk" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Primary Color",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "S (32-34 inches)", value: "S" },
          { title: "M (36-38 inches)", value: "M" },
          { title: "L (40-42 inches)", value: "L" },
          { title: "XL (44-46 inches)", value: "XL" },
          { title: "XXL (48-50 inches)", value: "XXL" },
        ],
      },
    }),
    defineField({
      name: "occasion",
      title: "Occasion",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Wedding", value: "wedding" },
          { title: "Festival", value: "festival" },
          { title: "Party", value: "party" },
          { title: "Formal", value: "formal" },
          { title: "Casual", value: "casual" },
          { title: "Traditional", value: "traditional" },
        ],
      },
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Handwoven", value: "handwoven" },
          { title: "Pure Silk", value: "pure-silk" },
          { title: "Premium Quality", value: "premium-quality" },
          { title: "Traditional Craft", value: "traditional-craft" },
          { title: "Eco-Friendly", value: "eco-friendly" },
          { title: "Limited Edition", value: "limited-edition" },
        ],
      },
    }),
    defineField({
      name: "careInstructions",
      title: "Care Instructions",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Dry Clean Only", value: "dry-clean-only" },
          { title: "Hand Wash", value: "hand-wash" },
          { title: "Machine Wash Gentle", value: "machine-wash-gentle" },
          { title: "Iron on Low Heat", value: "iron-low-heat" },
          { title: "Store in Cotton Cloth", value: "store-cotton-cloth" },
        ],
      },
    }),
    defineField({
      name: "stockCount",
      title: "Stock Count",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "weight",
      title: "Weight (in grams)",
      type: "number",
      description: "Approximate weight of the product",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        {
          name: "length",
          title: "Length (in meters)",
          type: "number",
        },
        {
          name: "width",
          title: "Width (in meters)",
          type: "number",
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "newArrival",
      title: "New Arrival",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0",
      subtitle: "price",
    },
    prepare(selection) {
      const { title, media, subtitle } = selection;
      return {
        title,
        media,
        subtitle: `₹${subtitle}`,
      };
    },
  },
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Name Z-A",
      name: "nameDesc",
      by: [{ field: "name", direction: "desc" }],
    },
    {
      title: "Price Low-High",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
    {
      title: "Price High-Low",
      name: "priceDesc",
      by: [{ field: "price", direction: "desc" }],
    },
    {
      title: "Newest First",
      name: "newest",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
});
