import CategoryListContainer from './_components/CategoryListContainer'

export default function layout({ children }) {
  return (
    <div className='flex'>
      <CategoryListContainer />
      <div className='w-full'>
        {children}
      </div>
    </div>
  )
}
