import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Package,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

const listingFilters = [
  { id: "all", label: "Everything" },
  { id: "product", label: "Products" },
  { id: "service", label: "Services" },
];

function createSampleListings(creator) {
  const niche = creator.niches?.[0] || "creative";

  return [
    {
      id: "sample-guide",
      type: "product",
      title: `${niche} field guide`,
      description: `A practical digital guide with ${creator.displayName}'s tips, tools, and personal recommendations.`,
      price: 850,
      delivery: "Digital download",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85",
      imageAlt: "An open book and notebook for the digital field guide",
      isSample: true,
    },
    {
      id: "sample-session",
      type: "service",
      title: "One-on-one session",
      description: `Get focused advice and personal feedback directly from ${creator.displayName}.`,
      price: 3500,
      delivery: "45 minutes · online",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
      imageAlt: "People in a one-on-one consultation around a table",
      isSample: true,
    },
    {
      id: "sample-workshop",
      type: "service",
      title: "Small-group workshop",
      description: "Learn together in a relaxed, hands-on session with time for questions.",
      price: 2000,
      delivery: "60 minutes · online",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=85",
      imageAlt: "A group gathered for a collaborative workshop",
      isSample: true,
    },
  ];
}

function ListingType({ type }) {
  const Icon = type === "product" ? Package : BriefcaseBusiness;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold capitalize text-slate-800 shadow-sm">
      <Icon size={14} />
      {type}
    </span>
  );
}

function CreatorShop({ creator }) {
  const [listings, setListings] = useState(() => createSampleListings(creator));
  const [activeFilter, setActiveFilter] = useState("all");
  const [composerOpen, setComposerOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [interestShown, setInterestShown] = useState(false);
  const [type, setType] = useState("product");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [delivery, setDelivery] = useState("");
  const [draftImage, setDraftImage] = useState(null);
  const objectUrls = useRef(new Set());

  useEffect(
    () => () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  const visibleListings =
    activeFilter === "all"
      ? listings
      : listings.filter((listing) => listing.type === activeFilter);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    objectUrls.current.add(url);
    setDraftImage({ url, name: file.name });
  };

  const handleAddListing = (event) => {
    event.preventDefault();
    setListings((current) => [
      {
        id: `local-${Date.now()}`,
        type,
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        delivery: delivery.trim() || (type === "product" ? "Product" : "By arrangement"),
        image: draftImage?.url || creator.coverImage || creator.profileImage,
        imageAlt: title.trim(),
        isSample: false,
      },
      ...current,
    ]);
    setActiveFilter("all");
    setType("product");
    setTitle("");
    setDescription("");
    setPrice("");
    setDelivery("");
    setDraftImage(null);
    setComposerOpen(false);
  };

  const closeListing = () => {
    setSelectedListing(null);
    setInterestShown(false);
  };

  return (
    <section
      className="mx-auto w-[min(100%-40px,1000px)] py-5 sm:py-8"
      aria-labelledby="creator-shop-title"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-800">
              <ShoppingBag size={15} />
              Creator shop
            </p>
            <h2
              id="creator-shop-title"
              className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
            >
              Products &amp; services
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Discover guides, sessions, and other things from{" "}
              {creator.displayName}.
            </p>
          </div>
          {!creator.canFollow && (
            <button
              type="button"
              onClick={() => setComposerOpen(true)}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 font-bold text-white transition hover:bg-slate-700"
            >
              <Plus size={17} />
              Add a listing
            </button>
          )}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-blue-50 p-4">
          <Sparkles size={17} className="mt-0.5 shrink-0 text-blue-800" />
          <p className="text-xs leading-5 text-blue-950">
            Showcase preview only. Listings added here are temporary, and
            checkout or booking is not connected.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="Filter shop listings">
          {listingFilters.map((filter) => (
            <button
              type="button"
              key={filter.id}
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`min-h-10 rounded-full px-4 text-sm font-bold transition ${
                activeFilter === filter.id
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          {listings.length} {listings.length === 1 ? "listing" : "listings"}
        </p>
      </div>

      {visibleListings.length ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleListings.map((listing) => (
            <article
              key={listing.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={listing.image}
                  alt={listing.imageAlt || listing.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                <div className="absolute left-3 top-3">
                  <ListingType type={listing.type} />
                </div>
                {listing.isSample && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Sample
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-extrabold text-slate-950">
                  {listing.title}
                </h3>
                <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">
                  {listing.description}
                </p>
                <p className="mt-3 text-xs font-semibold text-slate-500">
                  {listing.delivery}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <p className="text-lg font-extrabold text-slate-900">
                    KSh {listing.price.toLocaleString()}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedListing(listing);
                      setInterestShown(false);
                    }}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-300 px-3 text-sm font-bold text-slate-800 transition hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700"
                  >
                    View details
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-bold text-slate-800">No listings in this category yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Choose another filter to see more offers.
          </p>
        </div>
      )}

      {composerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="listing-composer-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-blue-800">
                  Creator studio · preview
                </p>
                <h3
                  id="listing-composer-title"
                  className="mt-1 text-xl font-extrabold text-slate-950"
                >
                  Add a product or service
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                aria-label="Close listing form"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleAddListing}>
              <label className="block text-sm font-semibold text-slate-700">
                Listing type
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm"
                >
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                </select>
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Name
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={100}
                  required
                  placeholder="What are you offering?"
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Description
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  maxLength={400}
                  required
                  rows={3}
                  placeholder="Tell fans what they’ll get..."
                  className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 p-3 text-sm"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Price (KSh)
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                    placeholder="2500"
                    className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Delivery or format
                  <input
                    value={delivery}
                    onChange={(event) => setDelivery(event.target.value)}
                    maxLength={80}
                    placeholder={type === "product" ? "Digital download" : "45 minutes · online"}
                    className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm"
                  />
                </label>
              </div>

              <label className="block text-sm font-semibold text-slate-700">
                Cover image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1.5 block w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-semibold"
                />
              </label>
              {draftImage && (
                <p className="truncate rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  Cover selected: {draftImage.name}
                </p>
              )}

              <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
                This adds a temporary local listing preview only. It will not be
                published or saved.
              </p>

              <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setComposerOpen(false)}
                  className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-11 rounded-lg bg-blue-800 px-4 text-sm font-bold text-white hover:bg-blue-900"
                >
                  Add preview listing
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="listing-detail-title"
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="relative aspect-[16/9] bg-slate-100">
              <img
                src={selectedListing.image}
                alt={selectedListing.imageAlt || selectedListing.title}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={closeListing}
                aria-label="Close listing details"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-700 shadow"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <ListingType type={selectedListing.type} />
                <p className="text-xl font-extrabold text-slate-950">
                  KSh {selectedListing.price.toLocaleString()}
                </p>
              </div>
              <h3
                id="listing-detail-title"
                className="mt-3 text-2xl font-extrabold text-slate-950"
              >
                {selectedListing.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {selectedListing.description}
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-500">
                {selectedListing.delivery}
              </p>
              {interestShown && (
                <p className="mt-4 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-900">
                  This is only a frontend preview. No request was sent.
                </p>
              )}
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeListing}
                  className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
                {creator.canFollow && (
                  <button
                    type="button"
                    onClick={() => setInterestShown(true)}
                    className="min-h-11 rounded-lg bg-pink-600 px-4 text-sm font-bold text-white hover:bg-pink-700"
                  >
                    I’m interested
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

export default CreatorShop;
