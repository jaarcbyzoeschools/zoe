import React, { useEffect, useState } from 'react'
import { Card } from '@components/common/Card'
import { Alert } from '@components/common/Alert'
import { Spinner } from '@components/common/Spinner'
import { Badge } from '@components/common/Badge'
import { Button } from '@components/common/Button'
import { apiClient } from '@services/api'
import { formatDate } from '@utils/format'
import { Clock, MapPin, User, RefreshCw, Lightbulb } from 'lucide-react'

interface TimeSlot {
  id: string
  day: string
  subject: string
  time: string
  teacher: string
  room: string
}

interface TimetableData {
  timeSlots: TimeSlot[]
  startDate: string
  endDate: string
}

const StudentTimetable: React.FC = () => {
  const [data, setData] = useState<TimetableData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTimetable()
  }, [])

  const loadTimetable = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.get<TimetableData>('/api/dashboard/timetable')

      if (response.success && response.data) {
        setData(response.data)
      } else {
        setError(response.message || 'Failed to load timetable')
      }
    } catch (err: any) {
      setError(err.message || 'Error loading timetable')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Spinner fullScreen message="Loading your timetable..." />
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Timetable</h1>
          <p className="text-sm text-gray-600 mt-2">Your class schedule for this term</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={loadTimetable}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Refresh
        </Button>
      </div>

      {/* ERROR STATE */}
      {error && (
        <Alert type="error" message={error} dismissible={false} />
      )}

      {/* TERM PERIOD INFO */}
      {data && (
        <Card padding="md" variant="elevated">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Term Period: </span>
            {formatDate(new Date(data.startDate))} - {formatDate(new Date(data.endDate))}
          </p>
        </Card>
      )}

      {/* TIMETABLE */}
      {data && data.timeSlots.length > 0 ? (
        <div className="space-y-3">
          {data.timeSlots.map((slot) => (
            <Card
              key={slot.id}
              padding="md"
              variant="default"
              className="hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* SUBJECT & DAY */}
                  <div className="flex items-center gap-3 mb-3">
                    <Badge label={slot.day} variant="primary" size="sm" />
                    <h3 className="text-sm font-semibold text-gray-900">
                      {slot.subject}
                    </h3>
                  </div>

                  {/* DETAILS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>Room {slot.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4 text-purple-600" />
                      <span>{slot.teacher}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : !error ? (
        <Card padding="lg" variant="elevated" className="text-center">
          <p className="text-sm text-gray-600">No timetable available yet</p>
          <p className="text-xs text-gray-500 mt-2">Check back later for your class schedule</p>
        </Card>
      ) : null}

      {/* HELPFUL TIP */}
      {data && data.timeSlots.length > 0 && (
        <Card padding="md" variant="default" className="bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-blue-900 font-semibold mb-1">Helpful Tip</p>
              <p className="text-xs text-blue-800">
                Save this timetable or take a screenshot for quick reference. Make sure to arrive 5 minutes early for each class.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default StudentTimetable