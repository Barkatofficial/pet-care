import CategoryListContainer from './_components/CategoryListContainer'

export default function layout({ children }) {
  return (
    <div className='flex md:gap-4 pt-4 pb-8'>
      <CategoryListContainer />
      <div className='w-full'>
        {children}
      </div>
    </div>
  )
}
