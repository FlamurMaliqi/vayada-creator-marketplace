import Link from 'next/link'
import { Collaboration, Hotel, Creator, CollaborationStatus, UserType } from '@/lib/types'
import { Button } from '@/components/ui'
import { 
  MapPinIcon, 
  CheckBadgeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'
import { formatNumber } from '@/lib/utils'

interface CollaborationCardProps {
  collaboration: Collaboration & {
    hotel?: Hotel
    creator?: Creator
  }
  onStatusUpdate?: (id: string, status: CollaborationStatus) => void
  currentUserType?: UserType
}

const statusConfig: Record<CollaborationStatus, { label: string; color: string; icon: any }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
  accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-800', icon: CheckCircleIcon },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircleIcon },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
  cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-800', icon: XCircleIcon },
}

export function CollaborationCard({ 
  collaboration, 
  onStatusUpdate,
  currentUserType 
}: CollaborationCardProps) {
  const statusInfo = statusConfig[collaboration.status]
  const StatusIcon = statusInfo.icon

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 flex flex-col">
      {/* Header with Status and Date */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
            <StatusIcon className="w-4 h-4" />
            <span>{statusInfo.label}</span>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{formatDate(collaboration.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-4 flex-1">
        {/* Show the "other party" based on user type */}
        {currentUserType === 'hotel' && collaboration.creator && (
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-xl">
              {collaboration.creator.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-lg truncate">
                  {collaboration.creator.name}
                </h3>
                {collaboration.creator.status === 'verified' && (
                  <CheckBadgeIcon className="w-5 h-5 text-primary-600 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span className="truncate">{collaboration.creator.location}</span>
              </div>
              {collaboration.creator.platforms && collaboration.creator.platforms.length > 0 && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Reach: </span>
                  {formatNumber(
                    collaboration.creator.platforms.reduce(
                      (sum, p) => sum + p.followers,
                      0
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {currentUserType === 'creator' && collaboration.hotel && (
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-xl">
              {collaboration.hotel.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-lg truncate">
                  {collaboration.hotel.name}
                </h3>
                {collaboration.hotel.status === 'verified' && (
                  <CheckBadgeIcon className="w-5 h-5 text-primary-600 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span className="truncate">{collaboration.hotel.location}</span>
              </div>
              {collaboration.hotel.description && (
                <div className="text-sm text-gray-600 line-clamp-2">
                  {collaboration.hotel.description}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons - Always visible for pending requests */}
      {onStatusUpdate && collaboration.status === 'pending' && (
        <div className="px-6 pb-6 pt-4 border-t border-gray-100">
          <div className="flex gap-3">
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => onStatusUpdate(collaboration.id, 'accepted')}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              size="md"
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
              onClick={() => onStatusUpdate(collaboration.id, 'rejected')}
            >
              Decline
            </Button>
          </div>
          <Link 
            href={currentUserType === 'hotel' 
              ? `/creators/${collaboration.creatorId}`
              : `/hotels/${collaboration.hotelId}`
            }
            className="block mt-3"
          >
            <Button variant="outline" size="sm" className="w-full">
              View Profile
            </Button>
          </Link>
        </div>
      )}

      {/* Actions for accepted status */}
      {collaboration.status === 'accepted' && onStatusUpdate && (
        <div className="px-6 pb-6 pt-4 border-t border-gray-100">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => onStatusUpdate(collaboration.id, 'completed')}
          >
            Mark as Completed
          </Button>
          <Link 
            href={currentUserType === 'hotel' 
              ? `/creators/${collaboration.creatorId}`
              : `/hotels/${collaboration.hotelId}`
            }
            className="block mt-3"
          >
            <Button variant="outline" size="sm" className="w-full">
              View Profile
            </Button>
          </Link>
        </div>
      )}

      {/* View profile for other statuses */}
      {(collaboration.status === 'rejected' || collaboration.status === 'completed' || collaboration.status === 'cancelled') && (
        <div className="px-6 pb-6 pt-4 border-t border-gray-100">
          <Link 
            href={currentUserType === 'hotel' 
              ? `/creators/${collaboration.creatorId}`
              : `/hotels/${collaboration.hotelId}`
            }
          >
            <Button variant="outline" size="md" className="w-full">
              View Profile
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

