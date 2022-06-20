const Footer: React.FunctionComponent = () => {
  return (
    <div className="p-3 flex justify-end border-t border-gray-200">
      <p className="text-gray-500 text-sm">
        Powered by{' '}
        <a
          href="https://algolia.com"
          target="_blank"
          className="font-semibold hover:text-gray-700"
        >
          Algolia
        </a>
      </p>
    </div>
  )
}

export default Footer
