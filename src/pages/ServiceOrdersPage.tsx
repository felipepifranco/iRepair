import NewServiceForm from './../components/NewServiceForm'
import Header from './../components/Header'


export const ServiceOrdersPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Header />
      <NewServiceForm />
    </div>
  )
}

