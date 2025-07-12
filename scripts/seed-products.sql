-- Insert 100 luxury perfume products with specific IDs for easy testing
INSERT INTO products (id, name, description, price, category, scent_notes, rating, stock, images, featured) VALUES
('product-1', 'Midnight Elegance', 'A sophisticated blend of jasmine and sandalwood that captures the essence of evening glamour', 189.00, 'Floral', ARRAY['Jasmine', 'Sandalwood', 'Vanilla', 'Musk'], 4.8, 25, ARRAY['/placeholder.svg?height=400&width=300&text=Midnight+Elegance'], true),
('product-2', 'Golden Dawn', 'Citrus notes with warm amber undertones, perfect for the confident modern woman', 225.00, 'Fresh', ARRAY['Bergamot', 'Amber', 'Cedar', 'Orange Blossom'], 4.9, 18, ARRAY['/placeholder.svg?height=400&width=300&text=Golden+Dawn'], true),
('product-3', 'Rose Mystique', 'Delicate rose petals with mysterious depth and complexity', 195.00, 'Floral', ARRAY['Rose', 'Patchouli', 'Vanilla', 'Pink Pepper'], 4.7, 32, ARRAY['/placeholder.svg?height=400&width=300&text=Rose+Mystique'], false),
('product-4', 'Ocean Breeze', 'Fresh aquatic scent with marine minerals and sea salt', 165.00, 'Fresh', ARRAY['Sea Salt', 'Aquatic Notes', 'Driftwood', 'Ambergris'], 4.6, 45, ARRAY['/placeholder.svg?height=400&width=300&text=Ocean+Breeze'], false),
('product-5', 'Velvet Dreams', 'Rich vanilla and exotic spices create an intoxicating evening fragrance', 210.00, 'Oriental', ARRAY['Vanilla', 'Cinnamon', 'Cardamom', 'Tonka Bean'], 4.8, 22, ARRAY['/placeholder.svg?height=400&width=300&text=Velvet+Dreams'], true),
('product-6', 'Sapphire Nights', 'Deep and mysterious with notes of black currant and smoky incense', 245.00, 'Oriental', ARRAY['Black Currant', 'Incense', 'Leather', 'Oud'], 4.9, 15, ARRAY['/placeholder.svg?height=400&width=300&text=Sapphire+Nights'], false),
('product-7', 'Cherry Blossom', 'Delicate and feminine with soft floral notes', 175.00, 'Floral', ARRAY['Cherry Blossom', 'Peony', 'White Musk', 'Lily'], 4.5, 38, ARRAY['/placeholder.svg?height=400&width=300&text=Cherry+Blossom'], false),
('product-8', 'Amber Sunset', 'Warm and inviting with golden amber and honey', 198.00, 'Oriental', ARRAY['Amber', 'Honey', 'Sandalwood', 'Benzoin'], 4.7, 28, ARRAY['/placeholder.svg?height=400&width=300&text=Amber+Sunset'], false),
('product-9', 'White Tea', 'Clean and refreshing with green tea and white flowers', 155.00, 'Fresh', ARRAY['White Tea', 'Jasmine', 'Ginger', 'Citrus'], 4.4, 42, ARRAY['/placeholder.svg?height=400&width=300&text=White+Tea'], false),
('product-10', 'Black Orchid', 'Exotic and luxurious with rare black orchid and truffle', 285.00, 'Oriental', ARRAY['Black Orchid', 'Truffle', 'Ylang-Ylang', 'Patchouli'], 4.9, 12, ARRAY['/placeholder.svg?height=400&width=300&text=Black+Orchid'], true),
('product-11', 'Lavender Fields', 'Calming lavender with hints of bergamot and cedar', 145.00, 'Fresh', ARRAY['Lavender', 'Bergamot', 'Cedar', 'White Musk'], 4.3, 55, ARRAY['/placeholder.svg?height=400&width=300&text=Lavender+Fields'], false),
('product-12', 'Royal Oud', 'Majestic oud with rose and saffron for ultimate luxury', 350.00, 'Oriental', ARRAY['Oud', 'Rose', 'Saffron', 'Amber'], 4.9, 8, ARRAY['/placeholder.svg?height=400&width=300&text=Royal+Oud'], true),
('product-13', 'Citrus Burst', 'Energizing blend of grapefruit, lemon, and lime', 135.00, 'Fresh', ARRAY['Grapefruit', 'Lemon', 'Lime', 'Mint'], 4.2, 60, ARRAY['/placeholder.svg?height=400&width=300&text=Citrus+Burst'], false),
('product-14', 'Moonlight Serenade', 'Romantic evening scent with tuberose and jasmine', 220.00, 'Floral', ARRAY['Tuberose', 'Jasmine', 'Ylang-Ylang', 'Sandalwood'], 4.8, 20, ARRAY['/placeholder.svg?height=400&width=300&text=Moonlight+Serenade'], false),
('product-15', 'Spiced Vanilla', 'Warm vanilla enhanced with exotic spices', 180.00, 'Oriental', ARRAY['Vanilla', 'Cinnamon', 'Nutmeg', 'Clove'], 4.6, 35, ARRAY['/placeholder.svg?height=400&width=300&text=Spiced+Vanilla'], false),
('product-16', 'Garden Party', 'Fresh floral bouquet perfect for daytime wear', 160.00, 'Floral', ARRAY['Peony', 'Lily of the Valley', 'Green Leaves', 'Musk'], 4.4, 40, ARRAY['/placeholder.svg?height=400&width=300&text=Garden+Party'], false),
('product-17', 'Smoky Leather', 'Bold and masculine with leather and tobacco notes', 240.00, 'Woody', ARRAY['Leather', 'Tobacco', 'Cedar', 'Vetiver'], 4.7, 25, ARRAY['/placeholder.svg?height=400&width=300&text=Smoky+Leather'], false),
('product-18', 'Tropical Paradise', 'Exotic blend of coconut, pineapple, and frangipani', 170.00, 'Fresh', ARRAY['Coconut', 'Pineapple', 'Frangipani', 'Vanilla'], 4.5, 30, ARRAY['/placeholder.svg?height=400&width=300&text=Tropical+Paradise'], false),
('product-19', 'Mystic Woods', 'Deep forest scent with pine, moss, and earth', 190.00, 'Woody', ARRAY['Pine', 'Moss', 'Earth', 'Cedar'], 4.6, 28, ARRAY['/placeholder.svg?height=400&width=300&text=Mystic+Woods'], false),
('product-20', 'Diamond Dust', 'Sparkling and effervescent with aldehydes and florals', 260.00, 'Floral', ARRAY['Aldehydes', 'Rose', 'Iris', 'Musk'], 4.8, 15, ARRAY['/placeholder.svg?height=400&width=300&text=Diamond+Dust'], true);

-- Add 80 more products to reach 100 total
INSERT INTO products (id, name, description, price, category, scent_notes, rating, stock, images, featured) 
SELECT 
  'product-' || generate_series(21, 100),
  'Luxury Fragrance ' || generate_series(21, 100),
  'An exquisite blend of premium ingredients creating a unique olfactory experience.',
  (random() * 200 + 100)::numeric(10,2),
  (ARRAY['Floral', 'Fresh', 'Oriental', 'Woody'])[floor(random() * 4 + 1)],
  ARRAY['Rose', 'Sandalwood', 'Vanilla', 'Bergamot', 'Musk', 'Cedar'][1:floor(random() * 4 + 2)],
  (random() * 1.5 + 3.5)::numeric(3,2),
  floor(random() * 50 + 10)::integer,
  ARRAY['/placeholder.svg?height=400&width=300&text=Product+' || generate_series(21, 100)],
  (random() < 0.1);
