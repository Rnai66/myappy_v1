import Listing from "../models/Listing.js";

// Create listing
export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      seller: req.user._id
    });
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all listings
export const getListings = async (req, res) => {
  const listings = await Listing.find().populate("seller", "name email");
  res.json(listings);
};

// Get single listing
export const getListingById = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("seller", "name email");
  if (!listing) return res.status(404).json({ message: "Listing not found" });
  res.json(listing);
};

// Update listing
export const updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: "Listing not found" });

  if (listing.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  Object.assign(listing, req.body);
  await listing.save();
  res.json(listing);
};

// Delete listing
export const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ message: "Listing not found" });

  if (listing.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await listing.deleteOne();
  res.json({ message: "Listing removed" });
};
