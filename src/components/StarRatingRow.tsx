import StarIcon from './StarIcon'

interface Props {
  numStars: number
}

const StarRatingRow: React.FunctionComponent<Props> = ({ numStars }: Props) => {
  const numEmptyStars = 5 - numStars

  return (
    <div className="flex items-center space-x-1">
      {[...Array(numStars)].map((_, i) => (
        <StarIcon color="gold" key={i} />
      ))}
      {[...Array(numEmptyStars)].map((_, i) => (
        <StarIcon color="transparent" key={i} />
      ))}
    </div>
  )
}

export default StarRatingRow
