const Footer: React.FunctionComponent = () => {
  return (
    <div className="flex justify-end p-3 border-t border-gray-200">
      <p className="text-sm text-gray-500">
        Powered by{' '}
        <a
          rel="noreferrer"
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
