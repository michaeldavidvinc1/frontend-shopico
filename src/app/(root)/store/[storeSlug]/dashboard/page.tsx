import React from 'react'

const DashboardSeller = ({params}: { params: { storeSlug: string } }) => {
  return (
    <div>
      Dashboard Seller {params.storeSlug}
    </div>
  )
}

export default DashboardSeller
