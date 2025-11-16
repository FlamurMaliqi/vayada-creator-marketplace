'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AuthenticatedNavigation, Footer, ProfileWarningBanner } from '@/components/layout'
import { useSidebar } from '@/components/layout/AuthenticatedNavigation'
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters'
import { HotelCard } from '@/components/marketplace/HotelCard'
import { CreatorCard } from '@/components/marketplace/CreatorCard'
import { Button } from '@/components/ui'
// Removed API imports - using mock data only for frontend design
import { ROUTES } from '@/lib/constants/routes'
import type { Hotel, Creator } from '@/lib/types'

type ViewType = 'all' | 'hotels' | 'creators'

export default function MarketplacePage() {
  const { isCollapsed } = useSidebar()
  const [viewType, setViewType] = useState<ViewType>('all')
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    niche: '',
  })

  useEffect(() => {
    loadData()
  }, [filters, viewType])

  const loadData = async () => {
    setLoading(true)
    // Use mock data directly for frontend design
    setTimeout(() => {
      if (viewType === 'all' || viewType === 'hotels') {
        setHotels(getMockHotels())
      }
      
      if (viewType === 'all' || viewType === 'creators') {
        setCreators(getMockCreators())
      }
      setLoading(false)
    }, 300)
  }

  const filteredHotels = hotels.filter((hotel) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      hotel.name.toLowerCase().includes(query) ||
      hotel.location.toLowerCase().includes(query) ||
      hotel.description.toLowerCase().includes(query)
    )
  })

  const filteredCreators = creators.filter((creator) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      creator.name.toLowerCase().includes(query) ||
      creator.location.toLowerCase().includes(query) ||
      creator.niche.some((n) => n.toLowerCase().includes(query))
    )
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <AuthenticatedNavigation />
      <div className={`transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-64'} pt-16`}>
        <div className="pt-16">
          <ProfileWarningBanner />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
              Marketplace
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Discover hotels and creators for authentic partnerships
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="mb-6 flex gap-2 bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-sm border border-gray-200/50 w-fit">
          <button
            onClick={() => setViewType('all')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
              viewType === 'all'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setViewType('hotels')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
              viewType === 'hotels'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            Hotels
          </button>
          <button
            onClick={() => setViewType('creators')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
              viewType === 'creators'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            Creators
          </button>
        </div>

        {/* Filters */}
        <MarketplaceFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFiltersChange={setFilters}
          viewType={viewType}
        />

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-100"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600 absolute top-0 left-0"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Hotels Section */}
            {(viewType === 'all' || viewType === 'hotels') && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Hotels {filteredHotels.length > 0 && <span className="text-primary-600">({filteredHotels.length})</span>}
                  </h2>
                </div>
                {filteredHotels.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHotels.map((hotel) => (
                      <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50">
                    <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}

            {/* Creators Section */}
            {(viewType === 'all' || viewType === 'creators') && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Creators & Influencers {filteredCreators.length > 0 && <span className="text-primary-600">({filteredCreators.length})</span>}
                  </h2>
                </div>
                {filteredCreators.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCreators.map((creator) => (
                      <CreatorCard key={creator.id} creator={creator} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50">
                    <p className="text-gray-500 text-lg">No creators found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

// Mock data for development
function getMockHotels(): Hotel[] {
  return [
    {
      id: '1',
      name: 'Sunset Beach Resort',
      location: 'Bali, Indonesia',
      description: 'Luxury beachfront resort with stunning ocean views and world-class amenities.',
      images: ['/hotel1.jpg'],
      amenities: ['Pool', 'Spa', 'Beach Access', 'Restaurant'],
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Mountain View Lodge',
      location: 'Swiss Alps, Switzerland',
      description: 'Cozy alpine lodge perfect for adventure seekers and nature lovers.',
      images: ['/hotel2.jpg'],
      amenities: ['Ski Access', 'Fireplace', 'Restaurant', 'Spa'],
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Urban Boutique Hotel',
      location: 'Tokyo, Japan',
      description: 'Modern boutique hotel in the heart of Tokyo with minimalist design.',
      images: ['/hotel3.jpg'],
      amenities: ['City View', 'Restaurant', 'Gym', 'Concierge'],
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Desert Oasis Resort',
      location: 'Dubai, UAE',
      description: 'Luxurious desert resort with traditional architecture and modern comforts.',
      images: ['/hotel4.jpg'],
      amenities: ['Pool', 'Spa', 'Camel Rides', 'Fine Dining'],
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      name: 'Coastal Retreat',
      location: 'Santorini, Greece',
      description: 'Stunning cliffside hotel with breathtaking sunset views over the Aegean Sea.',
      images: ['/hotel5.jpg'],
      amenities: ['Infinity Pool', 'Spa', 'Beach Access', 'Wine Cellar'],
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      name: 'Jungle Eco-Lodge',
      location: 'Costa Rica',
      description: 'Sustainable eco-lodge surrounded by tropical rainforest and wildlife.',
      images: ['/hotel6.jpg'],
      amenities: ['Eco Tours', 'Wildlife Viewing', 'Organic Restaurant', 'Yoga Deck'],
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

function getMockCreators(): Creator[] {
  return [
    {
      id: '1',
      name: 'Sarah Travels',
      niche: ['Luxury Travel', 'Beach Destinations'],
      platforms: [
        { name: 'Instagram', handle: '@sarahtravels', followers: 125000, engagementRate: 4.2 },
        { name: 'YouTube', handle: '@sarahtravels', followers: 45000, engagementRate: 6.8 },
      ],
      audienceSize: 170000,
      location: 'Bali, Indonesia',
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Adventure Mike',
      niche: ['Adventure Travel', 'Mountain Sports'],
      platforms: [
        { name: 'Instagram', handle: '@adventuremike', followers: 89000, engagementRate: 5.1 },
        { name: 'TikTok', handle: '@adventuremike', followers: 120000, engagementRate: 8.5 },
      ],
      audienceSize: 209000,
      location: 'Swiss Alps, Switzerland',
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Tokyo Explorer',
      niche: ['City Travel', 'Food & Culture'],
      platforms: [
        { name: 'Instagram', handle: '@tokyoexplorer', followers: 156000, engagementRate: 4.8 },
        { name: 'Blog', handle: 'tokyoexplorer.com', followers: 25000, engagementRate: 3.2 },
      ],
      audienceSize: 181000,
      location: 'Tokyo, Japan',
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Luxury Wanderer',
      niche: ['Luxury Travel', 'Resorts'],
      platforms: [
        { name: 'Instagram', handle: '@luxurywanderer', followers: 245000, engagementRate: 3.9 },
        { name: 'YouTube', handle: '@luxurywanderer', followers: 98000, engagementRate: 5.5 },
      ],
      audienceSize: 343000,
      location: 'Dubai, UAE',
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      name: 'Island Dreams',
      niche: ['Beach Destinations', 'Romantic Travel'],
      platforms: [
        { name: 'Instagram', handle: '@islanddreams', followers: 198000, engagementRate: 4.5 },
        { name: 'Pinterest', handle: '@islanddreams', followers: 67000, engagementRate: 2.8 },
      ],
      audienceSize: 265000,
      location: 'Santorini, Greece',
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      name: 'Eco Explorer',
      niche: ['Eco Travel', 'Adventure Travel'],
      platforms: [
        { name: 'Instagram', handle: '@ecoexplorer', followers: 112000, engagementRate: 5.8 },
        { name: 'Blog', handle: 'ecoexplorer.com', followers: 32000, engagementRate: 4.1 },
      ],
      audienceSize: 144000,
      location: 'Costa Rica',
      status: 'verified',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

