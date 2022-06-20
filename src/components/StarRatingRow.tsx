import { useRef, useState } from 'react'
import StarIcon from './StarIcon'

const StarRatingRow = ({
  precision = 1,
  totalStars = 5,
  emptyIcon = StarIcon,
  filledIcon = StarIcon,
}) => {
  const [activeStar, setActiveStar] = useState(-1)
  const [hoverActiveStar, setHoverActiveStar] = useState(-1)
  const [isHovered, setIsHovered] = useState(false)
  const ratingContainerRef = useRef<HTMLDivElement | null>(null)

  const calculateRating = () => {
    if (!ratingContainerRef.current) {
      return 0
    }

    const { width, left } = ratingContainerRef.current.getBoundingClientRect()
    const numberInStars = 0.1 * totalStars
    const nearestNumber =
      Math.round((numberInStars + precision / 2) / precision) * precision

    return Number(nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0))
  }

  const EmptyIcon = emptyIcon
  const FilledIcon = filledIcon

  return (
    <div className="inline-flex relative text-left" ref={ratingContainerRef}>
      {[...new Array(totalStars)].map((el, index) => {
        const activeState = calculateRating()
        const showEmptyIcon = activeState === -1 || activeState < index + 1
        const isActiveRating = activeState !== 1
        const isRatingWithPrecision = activeState % 1 !== 0
        const isRatingEqualToIndex = Math.ceil(activeState) === index + 1
        const showRatingWithPrecision =
          isActiveRating && isRatingWithPrecision && isRatingEqualToIndex

        return (
          <div className="relative" key={index}>
            <div
              className="overflow-hidden absolute"
              style={{
                width: showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%',
              }}
            >
              <FilledIcon />
            </div>

            <div
              style={{
                color: showEmptyIcon ? 'gray' : 'inherit',
              }}
            >
              {showEmptyIcon ? <EmptyIcon /> : <FilledIcon />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StarRatingRow
